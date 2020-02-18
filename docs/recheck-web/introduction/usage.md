# Usage

In its core, ***recheck-web*** extends ***recheck*** and adds the capability to check for:

1. [WebDriver](#webdriver): *Check the complete page rendered by the browser*.
2. [WebElement](#webelement): *Check individual page sections with isolated elements*.

For a basic introduction on how ***recheck*** works, please visit the [Usage](../../recheck/introduction/usage.md) page.  

However, ***recheck-web*** provides some additional features besides that, which build upon the above checking. 

## WebDriver

The most basic way to check the page is to check a `WebDriver` or any element that implements `WrapsDriver`.

!!! note
	The deepest `WebDriver` must be an instance of a `RemoteWebDriver` (i.e. `JavascripExecutor`) which all common Selenium Drivers are (ChromeDriver, FirefoxDriver, ...).

```java
WebDriver driver = // ...
Recheck re = // ...

// ...
re.check( driver, "complete-page" );
// ...
```

## WebElement

To check isolated elements out of the context of the complete page, you can check a `WebElement` or any object that implements `WrapsElement`.

!!! note
	The deepest `WebElement` must be an instance of a `RemoteWebElement` which all elements of a common Selenium Drivers are (ChromeDriver, FirefoxDriver, ...).

```java
WebDriver driver = // ...
Recheck re = // ...

// ...
re.check( driver.findElement( By.id( "#section" ) ), "individual-section" );
// ...
```

## Explicit checking

Migrating from your standard Selenium test, using explicit checking is the most straightforward way. Instead of the standard assertions, you explicitly call `Recheck#check` which then does the assertions for you.

Consider the below standard Selenium test (using JUnit5). The test that tries to enter the login form and login to a web application using invalid credentials. The web application is supposed to produce an error message saying that an invalid password has been entered and as a result should clear the user and password fields.

```java
class LoginTest {

	WebDriver driver;

	@BeforeEach
	void setUp() {
		driver = new ChromeDriver(); // Create your driver
	}

	@AfterEach
	void tearDown() {
		driver.quit(); // Close your driver after the test
	}

	@Test
	void login_with_invalid_credentials_should_produce_error_message_and_clear_inputs() throws Exception {
		driver.get( "https://example.com" ); // Go to your login page

		final WebElement user = driver.findElement( By.id( "user" ) ); // Find the user input element
		user.sendKeys( "admin" ); // Type the user 'admin'

		final WebElement password = driver.findElement( By.id( "user" ) ); // Find the password input element
		user.sendKeys( "invalid" ); // Type an invalid password

		final WebElement login = driver.findElement( By.id( "login" ) ); // Find the login button
		login.click(); // Press the button to initiate the login process

		// Wait for login to happen by using WebDriverWait or similar to stabilize your page

		final WebElement error = driver.findElement( By.id( "error" ) ); // Find the error text next to the login button
		assertEquals( "Invalid user or password!", error.getText() ); // Check if the text contains error message

		assertEquals( "", user.getAttribute( "value" ) ); // Check if the user has been cleared
		assertEquals( "", password.getAttribute( "value" ) ); // Check if the password has been cleared
	}
}
```

Transforming this test using ***recheck*** and the [***recheck-junit-jupiter-extension***](https://github.com/retest/recheck-junit-jupiter-extension) is fairly easy, following the basic [***recheck*** usage](../../recheck/introduction/usage.md). Just create and configure your `Recheck` instance and replace all your assertions with the `Recheck#check` method by passing in your `WebDriver` and naming the check respectively. For the most deterministic results, ensure that your website is as stable as possible, before doing your checks.

```java hl_lines="1 4 9 24"
@ExtendWith( RecheckExtension.class ) // Add the extension that will perform the lifecycle
class LoginTest {

	Recheck re;
	WebDriver driver;

	@BeforeEach
	void setUp() {
		re = new RecheckImpl(); // Create the recheck instance
		driver = new ChromeDriver(); // Create your driver
	}

	@AfterEach
	void tearDown() {
		driver.quit(); // Close your driver after the test
	}

	@Test
	void login_with_invalid_credentials_should_produce_error_message_and_clear_inputs() throws Exception {
		// ...

		// Wait for login to happen by using WebDriverWait or similar to stabilize your page

		re.check( driver, "invalid-login" ); // Check your complete page, previously done by assertions
	}
}
```

!!! warning
	Do not forget to call the [lifecycle](../../recheck/introduction/usage.md) or let a test extension do it for you.

## Unbreakable tests

However, these tests are still brittle and break easily. If any of the identifiers change, specified as `By.id( "user" )` or similar, Selenium is not able to find the element and your whole test breaks with a `NoSuchElementFoundException`. In most of the cases, the identifier is irrelevant for the user as, for example, the `id` is never shown. For more information, please visit [this page](../postpone-test-breakage.md).

```diff
-   <input type="text" id="user">
+   <input type="text" id="input-user">
```

To make your test nearly unbreakable, use the `UnbreakableDriver` provided by ***recheck-web***.

```java hl_lines="3 4"
@BeforeEach
void setUp() {
	re = new RecheckWebImpl(); // Take care that you take the specialized 'RecheckWebImpl' 
	driver = new UnbreakableDriver( new ChromeDriver() ); // Wrap your driver in a UnbreakableDriver to enable nearly unbreakable tests
}
```

!!! warning
	Be sure to use a `Recheck**Web**Impl` with a `UnbreakableDriver`. The standard `RecheckImpl` is not capable of making your tests unbreakable.

!!! note
	In order for this feature to work, a Golden Master must have been created before in order to find the element in question.

## Implicit checking

The above example&mdash;by design&mdash;has a major flaw: while it checks the end result to see if the login has been denied due to a wrong password, you don't know what happens up until your actual check.

You could go ahead and do an explicit check after each action, but this is where *implicit* checking comes in handy. It does the same, but without writing code. Just perform the action and ***recheck-web*** will perform the checking in the background. This removes not only the need for assertions, but moreover does the checking transparently.

Consider the example above where an invalid login is performed with the following actions: 

1. Type user "admin".
2. Type password "invalid".
3. Click login.

This will create three checks after each action has been executed.

```java hl_lines="1 8"
@ExtendWith( RecheckExtension.class ) // Add the extension that will perform the lifecycle
class LoginTest {

	WebDriver driver;

	@BeforeEach
	void setUp() {
		driver = new AutocheckingRecheckDriver( new ChromeDriver() ); // Wrap your driver in a AutocheckingRecheckDriver to enable implicit checking
	}

	@AfterEach
	void tearDown() {
		driver.quit(); // Close your driver after the test
	}

	@Test
	void login_with_invalid_credentials_should_produce_error_message_and_clear_inputs() throws Exception {
		driver.get( "https://example.com" ); // Go to your login page

		final WebElement user = driver.findElement( By.id( "user" ) ); // Find the user input element
		user.sendKeys( "admin" ); // Type the user 'admin', this will perform a check

		final WebElement password = driver.findElement( By.id( "user" ) ); // Find the password input element
		user.sendKeys( "invalid" ); // Type an invalid password, this will perform a check

		final WebElement login = driver.findElement( By.id( "login" ) ); // Find the login button
		login.click(); // Press the button to initiate the login process, this will perform a check
	}
}
```

!!! warning
	Do not forget to call the [lifecycle](../../recheck/introduction/usage.md) or let a test extension do it for you. For that, you may need to change the field `driver` to the respective wrapped driver.

!!! warning
	Do not mix implicit and explicit checking as this will produce unexpected results. Thus be sure to remove the `Recheck` instance from your test code.

## RecheckDriver

`RecheckDriver` combines all the above mentioned ***recheck-web*** features:

1. No assertions.
2. Unbreakable tests.
3. Implicit checking.

Use this class if you automatically want to incorporate new features without changing your existing test class.

```java hl_lines="1 8"
@ExtendWith( RecheckExtension.class ) // Add the extension that will perform the lifecycle
class LoginTest {

	WebDriver driver;

	@BeforeEach
	void setUp() {
		driver = new RecheckDriver( new ChromeDriver() ); // Wrap your driver in a RecheckDriver to enable all recheck-web features
	}

	@AfterEach
	void tearDown() {
		driver.quit(); // Close your driver after the test
	}

	@Test
	void login_with_invalid_credentials_should_produce_error_message_and_clear_inputs() throws Exception {
		driver.get( "https://example.com" ); // Go to your login page

		final WebElement user = driver.findElement( By.id( "user" ) ); // Find the user input element
		user.sendKeys( "admin" ); // Type the user 'admin'

		final WebElement password = driver.findElement( By.id( "user" ) ); // Find the password input element
		user.sendKeys( "invalid" ); // Type an invalid password

		final WebElement login = driver.findElement( By.id( "login" ) ); // Find the login button
		login.click(); // Press the button to initiate the login process
	}
}
```

!!! warning
	Do not forget to call the [lifecycle](../../recheck/introduction/usage.md) or let a test extension do it for you. For that, you may need to change the field `driver` to the respective wrapped driver.

!!! warning
	Do not mix implicit and explicit checking as this will produce unexpected results. Thus be sure to remove the `Recheck` instance from your test code.


To summarize:

| `WebDriver`                           | Checks   | `Recheck`                    |
| ------------------------------------- | -------- | ---------------------------- |
| Ordinary driver (e.g. `ChromeDriver`) | Explicit | `RecheckImpl`                |
| `UnbreakableDriver`                   | Explicit | `RecheckWebImpl`             |
| `AutocheckingRecheckDriver`           | Implicit | Integrated (i.e. not needed) |
| `RecheckDriver`                       | Implicit | Integrated (i.e. not needed) |

For further information you can check out the Javadoc of the corresponding classes and refer to our [integration tests](https://github.com/retest/recheck-web/tree/master/src/test/java/de/retest/web/it), which demonstrate the usage.
