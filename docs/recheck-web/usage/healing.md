# Automatic Code Healing

!!! tip
    Code healing is an early feature and might not work for every use case. We would love to hear feedback and suggestions from you as we further improve this feature.

The main problem using Selenium is to find the elements you want to interact with. Let it be a button you can click, input field to type text in or other elements on the page. You need to find an identification attribute that finds the element you are looking for&mdash;and *only* the specific element. If you have control over the website, this can be quite simple by specifying an `id` using `By.id( "your id" )`. But in case you do not have control of the site (e.g. your `id` is randomly generated) this often requires either complex XPath queries or CSS selectors. As both approaches only identify the element by a single attribute, resulting tests are brittle and break easily, if the specified attribute changes.

Since ***recheck-web*** builds on top of Selenium Java and implements [Difference Testing](../../recheck/introduction/index.md), it is able to find elements based on all available attributes, thus preventing test breakage. However, accepting the breaking change still results in the test breaking, thus only postponing the test breakage. Introducing: Code healing.[^1] Accepting any breaking change will now try to adjust the used identifier `By.id( "your id" )` to the new value `By.id( "your changed id" )`.

## Unbreakable Tests

***recheck-web*** implements [*Difference Testing*](https://docs.retest.de/recheck/introduction/) where it converts the state of a website or web application into a [*Golden Master*](https://docs.retest.de/recheck/files/state/), capturing all HTML and CSS attributes of all elements. It therefore has much more context available than just the single identifying attribute. With this context, it can track changes and perform the following steps to achieve essentially unbreakable tests:

1. Look in the persisted Golden Master, identify the old element and all its available attributes. 
2. Use these attributes to find the new element in the current state.
3. Use the found element to continue with the test.

Transitioning from your basic Selenium test to a truly unbreakable test is quite easy. Take a look at the below login form.

![Basic Login form for a web application.](form.png)

```html
<form>
    <div class="form-group">
        <label for="user">Username</label>
        <input type="text" class="form-control" id="user" placeholder="Username">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Password">
    </div>
    <input id="login" type="submit" class="btn btn-primary" value="Login">
</form>
```

We execute the following ***recheck-web*** Test with JUnit 5 twice, so that the Golden Masters are created. The first execution creates an initial Golden Master which is compared with the second execution. For a guide on how to transition from your standard Selenium Test to a ***recheck-web*** test, please refer to the [documentation](https://docs.retest.de/recheck-web/introduction/usage/).

```java
@ExtendWith( RecheckExtension.class )
public class FormTest {

	WebDriver driver;

	@BeforeEach
	void setUp() {
		final ChromeOptions options = new ChromeOptions();
		// Set headless=true to avoid minimal pixel changes or unexpected input 
		options.setHeadless( true );

		final ChromeDriver driver = new ChromeDriver( options );
		// Set window=1280x800 to ensure repeatability
		driver.manage().window().setSize( new Dimension( 1280, 800 ) );

		// Wrap in a RecheckDriver to enable unbreakable and auto checking
		this.driver = new RecheckDriver( driver );
	}

	@AfterEach
	void tearDown() {
		// Close the driver after a test
		driver.quit();
	}

	@Test
	void form_should_fill_in_user_and_password_and_redirect_to_dashboard() throws Exception {
		// 00 Navigate to the web application
		driver.get( getClass().getResource( "form.html" ).toExternalForm() );

		// 01 Find the user input by the id and type the username
		driver.findElement( By.id( "user" ) ).sendKeys( "admin" );
		// 02 Find the password input by the id and type the secret password
		driver.findElement( By.id( "password" ) ).sendKeys( "secret" );

		// 03 Find login by id and click
		driver.findElement( By.id( "login" ) ).submit();
	}
}
```

This test will create four Golden Masters, each for the respective action:

1. Load the web application.
2. Type user "admin".
3. Type password "secret".
4. Click Login.

However, we do not yet use the unbreakable feature. We just prepared the test in case any changes occur that would break a standard Selenium test.

Assume that we are improving the login for the next versions of the web application. The modifications should not alter the look and the user should still see the same GUI as shown above. Thus we only change some invisible attributes&mdash;do you spot them all?

```html
<form>
    <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username" placeholder="Username">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Password">
    </div>
    <button id="btn-login" type="submit" class="btn btn-primary">Login</button>
</form>
```

Using standard Selenium, these changes would be quite critical as we changed some `ids` which we use in the test. This essentially breaks the test (despite the fact that the user would not notice the difference). Luckily enough, we use the unbreakable feature. Instead of throwing a `NoSuchElementException`, the test still passes and is able to log into the web application. It notes the following differences:

1. Upon encountering the broken element, ***recheck*** will print a warning stating what changed and what needs to be done in order to fix it. Note that the `retestId` is a stable attribute, generated by ***recheck***; it will never change.

    ```plaintext
    *************** recheck warning ***************
    The HTML id attribute used for element identification changed from 'user' to 'username'.
    retest identified the element based on the persisted Golden Master.
    If you apply these changes to the Golden Master , your test de.retest.web.FormTest will break.
    Use `By.id("username")` or `By.retestId("user")` to update your test FormTest.java:47.
    ```
2. The output containing the difference states that the warnings have been encountered. Note the change for the second input element, representing the input `user`. Accepting this change will break the `FormTest.java:47`, thus you should either manually perform the update or use the automatic code healing from ***review***. Although we changed the `id` for the button "Login", it is not noted as breaking change, since this is not relevant for the first check, typing in the username. It is only note in the last step where the button is actually pressed.

    ```plaintext
    4 check(s) in 'de.retest.web.FormTest' found the following difference(s):
    Test 'form_should_fill_in_user_and_password_and_redirect_to_dashboard' has 10 difference(s) in 4 state(s):
    00 resulted in:
        input (user) at 'html[1]/body[1]/div[1]/div[1]/form[1]/div[1]/input[1]':
            id:
              expected="user",
                actual="username", breaks="FormTest.java:47"
        input (login) at 'html[1]/body[1]/div[1]/div[1]/form[1]/input[1]':
            id:
              expected="login",
                actual="btn-login"
    02 resulted in:
        input (user) at 'html[1]/body[1]/div[1]/div[1]/form[1]/div[1]/input[1]':
            id:
            expected="user",
                actual="username"
        input (login) at 'html[1]/body[1]/div[1]/div[1]/form[1]/input[1]':
            id:
              expected="login",
                actual="btn-login", breaks="FormTest.java:52"
    ```
   
Still, we are not truly unbreakable. Applying these changes will update the Golden Master and thus still break the test, since ***recheck*** is not able to find the old `id` anymore. Thus we only postponed the test breakage. 

We could go ahead and ignore the shown differences, making our test green again, but ultimately it would break.

### Code Healing

Code healing is available since ***recheck-web*** 1.9.0 together with ***review*** 1.9.0 while using at least a standard license. Simply open a report that contains warnings and you will see a similar output as below. Note the selected line displays a warning icon, indicating that this is a breaking change. More information can be read at the [feature article for review](../../review/usage/healing.md).

![Opened `FormTest.report` with ***review***](../../review/usage/review-healing.png)

After accepting all differences, the breaking changes are collected per file and each affected file is healed by searching for the appropriate line and replacing the value `By.id( "user" )` to `By.id( "username" )`.

```diff
        driver.get( getClass().getResource( "form.html" ).toExternalForm() );

        // Find the user input by the id and type the username
-       driver.findElement( By.id( "user" ) ).sendKeys( "admin" );
+       driver.findElement( By.id( "username" ) ).sendKeys( "admin" );
        // Find the password input by the id and type the secret password
        driver.findElement( By.id( "password" ) ).sendKeys( "secret" );

        // Find submit by tag and click
-       driver.findElement( By.id( "login" ) ).submit();
+       driver.findElement( By.id( "btn-login" ) ).submit();
    }
}
```

With this feature, you can once again focus on improving your web application, while ***recheck-web*** will keep your tests from breaking. If there are breaking changes, ***review*** will keep your tests up to date, eliminating the manual work completely.

[^1]: Code healing is only available through ***review*** using at least a standard license.

