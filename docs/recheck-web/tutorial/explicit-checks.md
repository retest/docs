# Using Explicit Checks

With recheck, you have multiple options of how to use it. You can use a `RecheckDriver`, which would make recheck completely transparent to use. For a more obvious and spelled-out usage as pure checking library, you can call the `check` methods explicitly.

A very basic test with Selenium and explicit calls to `check` could look like this:

```
package com.mycompany;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.*;
import de.retest.recheck.*;
import de.retest.recheck.persistence.*;

public class MyFirstTest {

  private WebDriver driver;
  private Recheck re;

  @Before
  public void setUp() {
    re = new RecheckImpl();
    System.setProperty("webdriver.chrome.driver", "C:\\pathto\\chromedriver.exe");
    ChromeOptions options = new ChromeOptions();
    options.addArguments("--headless");
    options.addArguments("--window-size=1280,720");
    driver = new ChromeDriver(options);
  }

  @Test
  public void google() throws Exception {
    re.startTest();

    driver.get("http://google.com");
    re.check(driver, "open");

    re.capTest();
  }

  @After
  public void tearDown() {
    driver.quit();
    re.cap();
  }
}
```

The `@Before` annotated method creates both the `Recheck` instance to use, as well as the `ChromeDriver`. The `@Test` annotated method first tells recheck to start the test (calling `startTest`), then load the Google start page into Chrome. Then it will recheck the current version of the page against a previous, expected version (called _Golden Master_) by invoking `check` and giving it a semantic and unique identifier.

During a typical, more elaborate test, you would call `check` multiple times, each time with a unique identifier. Since differences are not that uncommon, we do not want our test to fail immediately. So the calls to the `check` method will gather all differences, but not immediately make the test fail. To make the test fail in case of differences, the `capTest` method is called at the end of the test. Should you forget to do so, then a message in the log will tell you. After the test finishes, the `@After` method shuts down Chrome by calling quit on the driver and makes recheck create a summary report file of all encountered changes by calling `cap`.

When you [set up Maven correctly](../setup/maven.md), then you can now [execute that test case locally](mvn-execute-locally.md).
