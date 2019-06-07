# Location of the Golden Master files and test reports

When calling `Recheck#capTest()`, recheck either creates a diff in form of a test report (see below) using the existing Golden Master or—if it is the first time a test is being executed—it creates the Golden Master itself and fails the test. 

Note that it is important to fail the test if no Golden Master can be found. As mentioned before, this always happens the first time a test gets executed, but it can also happen for a variety of other reasons. For instance, when someone forgets to add the Golden Master to the version control system or if a test or a folder is renamed. If this is the case, then you definitely want the test to fail.

If you want to configure where recheck puts the Golden Master files, you can do so via a piece of code. The reason for this is that we usually don't want a fixed name, but a name per test or per suite. To determine where to put the Golden Master, `RecheckImpl` uses the given [`FileNamerStrategy`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/FileNamerStrategy.java), which in turn yields a `FileNamer`. The default `FileNamerStrategy` is the [`MavenConformFileNamerStrategy`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/MavenConformFileNamerStrategy.java). It creates Golden Masters under `src/test/resources/retest/recheck/` and test reports inside `target/test-classes/retest/recheck/`.

Alternatively, you can use the [`GradleConformFileNamerStrategy`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/GradleConformFileNamerStrategy.java) (or implement your own `FileNamerStrategy`) and pass is to `RecheckImpl` via `RecheckOptions`:

```java
RecheckOptions options = RecheckOptions.builder()
		.fileNamerStrategy( new GradleConformFileNamerStrategy() )
		.build();
Recheck re = new RecheckImpl( options );
```

When it comes to test reports, recheck uses the very same `FileNamerStrategy` to create reports for each test suite, which usually denotes a test class. For this we use the following mapping:

| recheck class | Test entity |
|---|---|
| `SuiteReplayResult`| Test class |
| `TestReplayResult`| Test method |
| `ActionReplayResult` | Check |

Suppose the following [recheck-web](https://github.com/retest/recheck-web) test:

```java
class MyRecheckWebTest {

	WebDriver driver;
	Recheck re;

	@BeforeEach
	void setUp() {
		driver = new ChromeDriver();
		re = new RecheckImpl();
	}

	@Test
	void someTest() throws Exception {
		driver.get( "https://example.com/" );

		re.check( driver, "1st-page" );

		driver.findElement( By.id( "someLink" ) ).click();
		re.check( driver, "2nd-page" );

		re.capTest();
	}

	@AfterEach
	void tearDown() {
		driver.quit();
		re.cap();
	}

}
```

In case there are differences, this would result in a test report `MyRecheckWebTest.report` (a test report with a single `SuiteReplayResult`) that contains a `TestReplayResult` for `someTest()` and two `ActionReplayResult`s for both checks ("1st-page" and "2nd-page").

So for every test class, you get a separate test report that is represented as a tree of test methods and their corresponding checks. Additionally, we provide an aggregated `test.report` that includes *all* test classes.
