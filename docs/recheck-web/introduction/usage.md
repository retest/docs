# Usage

In its core, ***recheck-web*** extends ***recheck*** and adds the capability to check for:

1. [WebDriver](#webdriver): *Check the complete page rendered by the browser*.
2. [WebElement](#webelement): *Check individual page sections with isolated elements*.

For a basic introduction on how ***recheck*** works, please visit the [Usage](../../recheck/introduction/usage.md) page.  

However, ***recheck-web*** also provides some additional features building upon the above capabilities. 

## Best Practices

1. Use a fresh driver and ***recheck*** instance for each test. This is best done within the `@BeforeEach` method or similar methods available through your test framework.
2. Use the appropriate [test extension](../../recheck/introduction/usage.md) for your test framework to handle the lifecycle and use unique suite, test and check names within each [lifecycle](../../recheck/introduction/usage.md#lifecycle) step, unless you want to [reuse Golden Masters](../../recheck/introduction/usage.md#reuse-golden-master-files).
3. Stabilize your page before checking to minimize differences.
    1. Ensure the driver has a fixed window size using `driver.manage().window().setSize( size )`.
    2. Wait for animations to be done by checking the respective elements and attributes with `ExpectedConditions`. This may be done best within a page object constructor.
    3. Click away any banners or popups (e.g. cookie-banners, subscribe-banners) as this will interfere with scrolling and screenshot creation.
4. Create an initial Golden Master with a `WebDriver` after the page is loaded and stabilized and before any elements are executed to allow for more [advanced features](#unbreakable-tests) to work. This is not necessary when using [implicit checking](#implicit-checking) as this is done for you.

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

## Page Objects

With the basic types from above, it is possible to check page objects or any arbitrary objects. Just let those objects implement either `WrapsElement` or `WrapsDriver` to check for object.

!!! note
	***recheck-web*** will not check any `@FindBy`, only the return value of those interfaces are checked. This can be achieved by implementing `WrapsElement` and returning the respective `@FindBy`.

!!! warning
	Due to the way `WrapsElement` and `WrapsDriver` works, ***recheck-web*** will evaluate `WrapsElement` before `WrapsDriver`. Thus it is recommended to only implement one of those interfaces.
   
```java
// LoginForm.java
public class LoginForm implements WrapsElement {

	@FindBy( id = "login-form" )
	private WebElement form;

	public LoginForm( final WebDriver driver ) {
		PageFactory.initElements( driver, this );
	}

	@Override
	public WebElement getWrappedElement() {
		return form;
	}
}
```

```java
// LoginPage.java
public class LoginPage implements WrapsDriver {

	private final WebDriver driver;

	private final LoginForm form;

	@FindBy( id = "header" )
	private WebElement header;

	public LoginPage( final WebDriver driver ) {
		this.driver = driver;
		this.form = new LoginForm( driver );
		PageFactory.initElements( driver, this );
	}

	public LoginForm getForm() {
		return form;
	}

	@Override
	public WebDriver getWrappedDriver() {
		return driver;
	}
}
```

```java
// LoginTest.java
@Test
void testLoginPage() {
	// Assuming driver and re is already initialized before
	LoginPage page = new LoginPage( driver );
	LoginForm form = page.getForm();

	re.check( page, "login-page" );
	re.check( form, "login-form" );
}
```

This can be used for complex page layouts to test only relevant sections by using elements, or when applicable, return the driver instead to check the whole page.

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

Note that the unbreakable feature only works, if a Golden Master has been created before (i.e. a full test has been run at least once). Consequently, changes to an element during runtime (e.g. with JavaScript) is not supported. It is therefore recommended to always do a initial check using a `WebDriver` before querying any elements, so that they can be found from the initial Golden Master.

```java hl_lines="3 4 13"
@BeforeEach
void setUp() {
	re = new RecheckWebImpl(); // Take care that you take the specialized 'RecheckWebImpl' 
	driver = new UnbreakableDriver( new ChromeDriver() ); // Wrap your driver in a UnbreakableDriver to enable nearly unbreakable tests
}

@Test
void login_with_invalid_credentials_should_produce_error_message_and_clear_inputs() throws Exception {
	driver.get( "https://example.com" ); // Go to your login page

	// Wait for page to be loaded by using WebDriverWait or similar to stabilize your page

	re.check( driver, "initial" ); // Make sure a Golden Master is present for unbreakable elements

	// Continue with your test

	final WebElement user = driver.findElement( By.id( "user" ) ); // Find the user input element
	// ...
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