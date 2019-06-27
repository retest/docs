# Execute the Test with Maven

When you [set up Maven correctly](../setup/maven.md) and [created a test case](explicit-checks.md), you should be able to execute this test with `mvn test`. You should see the following error message the first time you run this test:

```
java.lang.AssertionError: 'com.mycompany.MyFirstTest':
No recheck file found. First time test was run? Created recheck file now, don't forget to commit...
        at de.retest.recheck.RecheckImpl.capTest(RecheckImpl.java:137)
        at com.mycompany.MyFirstTest.google(MyFirstTest.java:30)
        at ... some more stack trace ...
```

recheck works by comparing the current state of the software (i.e. the website) against a baseline called Golden Master from an earlier state of the software. If no such Golden Master can be found, recheck throws an error. This is the expected and desired behavior—e.g. imagine you forget to commit your Golden Master into your version control system, or a path changes and the Golden Master cannot be found anymore. In that case you would want your test to fail—not pass.

The test has to fail the first time it is executed. But during that first execution, recheck created the Golden Master e.g. at `src\test\resources\retest\recheck\com.mycompany.MyFirstTest\google.open.recheck`. In that folder you can now find an XML file containing every non-default attribute of every DOM element after rendering the website, together with a screenshot of the website. Now if you run your test again, all of those elements and attributes of the Golden Master are compared against the current DOM elements. Any non-ignored difference of any element makes the test fail. Doing so (again with `mvn test`) probably creates an output similar to this:

```
java.lang.AssertionError:
A detailed report will be created at 'target\test-classes\retest\recheck\com.mycompany.MyFirstTest.report'. You can review the details by using our GUI from https://retest.de/review/.

The following differences have been found in 'com.mycompany.MyFirstTest'(with 1 check(s)):
Test 'google' has 37 differences in 1 states:
open resulted in:
        A [About Google] at 'HTML[1]/BODY[1]/DIV[1]/DIV[3]/DIV[1]/DIV[1]/A[1]':
                ping: expected="some gibberish"
        ... many more differences ...
```

Of course, you wouldn't want your test to fail that way. Luckily, recheck has a very easy way to setup and use an [ignore mechanism](setup-recheck.ignore.md).

