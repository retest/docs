Making your Test "unbreakable"
==============================

As shown [here](postpone-test-breakage.md), recheck can easily postpone that a test brakes. But it can even go one step further and make the test almost "unbreakable".

If you have a look at one the Golden Master files (e.g. `/src/test/resources/retest/recheck/com.mycompany.MyUnbreakableTest/check_order.00.recheck/retest.xml`), you can see that every element has an attribute called `retestId`. You can regard this `retestId` to be a virtual and constant identifying attribute. We call it virtual, because it never actually shows up on the GUI—and therefore it is never affected by GUI changes, making it constant. recheck uses the `RetestIdProvider` configured in the `RecheckOptions` that are passed to the `RecheckDriver` to generate that `retestId`. It can be any value, as long as it is unique within the Golden Master. When you update your test after such a breaking change, you can now refer to the `retestId` instead of other volatile identifying attributes, such as the HTML ID or name, XPath or the like.
Now we can adapt the above test as suggested by the log output to be similar to the following (use the values of your log output):

```
@Test
public void check_order() throws Exception {
	driver.startTest();
	String url = Paths.get( "src/test/resources/formPage.html" ).toUri().toURL().toString();
	driver.get(url);

	driver.findElement(By.retestId("input")).sendKeys("Max");
	driver.findElement(By.retestId("input-e3f18")).sendKeys("16");
	driver.findElement(By.retestId("form")).submit();

	driver.capTest();
}
```

Make sure to also import the correct `By` (i.e. import `de.retest.web.selenium.By`). When we execute this test, it passes. Now we can remove the `attribute=.*` again from our `recheck.ignore` file to make the test fail as expected—because there actually was a difference.

