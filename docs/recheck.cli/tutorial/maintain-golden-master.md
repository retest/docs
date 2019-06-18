Maintaining the Golden Master
=============================

After you correctly [installed and setup the recheck.cli](../setup/setup.md), you can use it to apply changes and maintain the Golden Master.

To easily generate changes to check for, open a browser and go to [Scratchpad.io](http://scratchpad.io), a site that lets you edit HTML and CSS in realtime. Opening the page will forward you to a unique URL (e.g. [http://scratchpad.io/recheck-45678](http://scratchpad.io/recheck-45678)). Now based on a [previous test](../../recheck-web/tutorial/explicit-checks.md), we can replace the method name "google" with "scratchpad" and adjust the URL to load your newly created unique URL. The method body should then look similar to this:

```java
  @Test
  public void scratchpad() throws Exception {
    re.startTest();
    driver.get("http://scratchpad.io/recheck-45678");
    re.check(driver, "open");

    re.capTest();
  }
```

You can run your test calling `mvn test` (assuming you correctly [set up maven](../../recheck-web/setup/maven.md)). As expected, it will fail the first time since recheck cannot find a Golden Master for the test scratchpad. But it will create one under `src/test/resources/...`. Running this test the second time will also fail, as the site contains a volatile URL. We will later see how you can treat that in a more sophisticated way, but for now we want to use our newly installed recheck.cli. In your CMD, go to the root folder of the project. Then type `recheck` to see all available commands. It will output something like:

```text
C:\Users\retest\Desktop\recheck-web-tutorial>recheck
Usage: recheck [--help] [--version] [COMMAND]
Command-line interface for recheck.
      --help      Display this help message.
      --version   Display version info.
Commands:
  version     Display version info.
  diff        Display given differences.
  commit      Accept given differences.
  ignore      Ignore given differences.
  completion  Generate and display auto completion script.
  help        Displays help information about the specified command
```

Now we want to automatically ignore all irrelevant changes. To do that, simply type something like (using your name and setup) `recheck ignore --all target\test-classes\retest\recheck\com.mycompany.MyFirstTest.report` (more on reports below). This will automatically add the following line to your `recheck.ignore` file:

```text
matcher: xpath=HTML[1]/BODY[1]/DIV[1]/P[3]/IFRAME[1], attribute: src
```

This makes recheck ignore just one attribute of one element, a Twitter API-related IFrame. Re-running your test should show a successful build and a passing test. Next, let’s use your regular browser to go to the URL you open in your test (e.g. http://scratchpad.io/recheck-45678) and edit the displayed content. For instance, replace `<h1>Welcome to <span>scratchpad.io</span></h1><br>` on the left-hand side of the website with `<h1>Welcome to <span>recheck</span></h1><br>`. Doing so and re-running the test should result in the following output:

```text
The following differences have been found in 'com.mycompany.MyFirstTest'(with 1 check(s)):
Test 'scratchpad' has 7 differences in 1 states:
open resulted in:
        textnode [scratchpad.io] at 'HTML[1]/BODY[1]/DIV[3]/DIV[2]/DIV[1]/DIV[3]/DIV[23]/textnode[2]':
                text: expected="scratchpad.io", actual="recheck"
        DIV at 'HTML[1]/BODY[1]/DIV[3]/DIV[2]/DIV[1]/DIV[5]/DIV[1]':
                left: expected="210.125px", actual="173.75px"
                right: expected="252.813px", actual="289.188px"
                style: expected="left: 210.125px; top: 286px; width: 6.0625px; height: 13px;", actual="left: 173.75px; top: 286px; width: 6.0625px; height: 13px;"
        TEXTAREA at 'HTML[1]/BODY[1]/DIV[3]/TEXTAREA[1]':
                left: expected="255.25px", actual="218.875px"
                right: expected="148.297px", actual="184.672px"
                style: expected="top: 285px; height: 13px; width: 6.0625px; left: 255.25px;", actual="top: 285px; height: 13px; width: 6.0625px; left: 218.875px;"
        at de.retest.recheck.RecheckImpl.capTest(RecheckImpl.java:137)
```

Now we can see that Scratchpad is generating and adapting a style attribute. Interesting enough, since all relevant style information is rendered and thus represented by individual CSS attributes, we can just add `style` to the ignored attributes. Re-running the test again gives us the expected differences in text and, as a result of that change, also in left and right.

Suppose this is an intended change and we want to update our Golden Master. For that, we can open a CMD in the project folder and run a command similar to this:

```text
recheck commit --all \target\test-classes\retest\recheck\com.mycompany.MyFirstTest.report
```

The result of that call should be something like:

```text
Updated SUT state file C:\Users\retest\Desktop\recheck-web-tutorial\src\test\resources\retest\recheck\com.mycompany.MyFirstTest\scratchpad.open.recheck
```

If there were more than one Golden Master, all of them would be updated. If you had your Golden Master files in a version control system, they would show as changed, and you would need to also commit the changes within e.g. Git. We can rerun the test (e.g. `mvn test`) and see whether our update worked—now the test should check whether the site contains “welcome to recheck” in order to pass.

To further show the functionality of the recheck.cli, let’s adapt the content of the Scratchpad again. Open your browser and change the welcome message to recheck-web. Again, re-running the test should again show the difference and produce a test report under `target/test-classes/retest/recheck/`. You can use recheck.cli to display the contents of that file by running:

```text
recheck diff target\test-classes\retest\recheck\com.mycompany.MyFirstTest.report
```

Doing so should result in an output similar to the following:

```text
Checking test report in path 'C:\Users\retest\Desktop\recheck-web-tutorial\target\test-classes\retest\recheck\com.mycompany.MyFirstTest.report'.
Reading JS ignore rules file from C:\Users\retest\Desktop\recheck-web-tutorial\.retest\recheck.ignore.js.
Specified JS ignore file has no 'shouldIgnoreAttributeDifference' function.
Specified JS ignore file has no 'shouldIgnoreElement' function.

Test 'scratchpad' has 5 differences in 1 states:
open resulted in:
        textnode [recheck] at 'HTML[1]/BODY[1]/DIV[3]/DIV[2]/DIV[1]/DIV[3]/DIV[23]/textnode[2]':
                text: expected="recheck", actual="scratchpad.io"
        DIV at 'HTML[1]/BODY[1]/DIV[3]/DIV[2]/DIV[1]/DIV[5]/DIV[1]':
                left: expected="173.75px", actual="210.125px"
                right: expected="289.188px", actual="252.813px"
        TEXTAREA at 'HTML[1]/BODY[1]/DIV[3]/TEXTAREA[1]':
                left: expected="218.875px", actual="255.25px"
                right: expected="184.672px", actual="148.297px"
```

As you can see, this command reproduces the failure message of the failing test. However, if you now update your `recheck.ignore` file, this command shows you whether recheck picked up the desired ignores without the need to actually re-run your test.
