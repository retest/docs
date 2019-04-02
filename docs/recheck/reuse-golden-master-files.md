# Reuse Golden Master files

Consider the following [recheck-web](https://github.com/retest/recheck-web) test:

```java
// open and visit a URL
driver.get( url );
// check the 1st page
re.check( driver, "1st-page" );

// find and click on a link to visit the following page
driver.findElement( By.id( "someLink" ) ).click();
// check the 2nd page
re.check( driver, "2nd-page" );

// naviagte back to the 1st page
driver.navigate().back();
// reuse the Golden Master file from above
re.check( driver, "1st-page" );
```

It uses the [Selenium WebDriver API](https://seleniumhq.org/projects/webdriver/) and navigates through a web site and checks various pages with recheck-web. As can be seen, the test starts by visiting a particular URL and checking the 1st page. It then clicks on a link and checks the resulting 2nd page. Afterwards, it navigates back to the 1st page, but rather than creating a new state, respectively, a new Golden Master file, it uses the `stepName` parameter from the 1st check ("1st-page") to tell recheck that both states should be equal and to reuse the already existing Golden Master. This ensures the equality of two states and saves disk memory.
