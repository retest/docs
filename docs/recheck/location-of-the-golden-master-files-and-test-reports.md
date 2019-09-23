# Location of the Golden Master files and test reports

When calling `Recheck#capTest()`, recheck either creates a diff in form of a test report (see below) using the existing Golden Master or—if it is the first time a test is being executed—it creates the Golden Master itself and fails the test. 

Note that it is important to fail the test if no Golden Master can be found. As mentioned before, this always happens the first time a test gets executed, but it can also happen for a variety of other reasons. For instance, when someone forgets to add the Golden Master to the version control system or if a test or a folder is renamed. If this is the case, then you definitely want the test to fail.

All Golden Masters are created under `src/test/resources/retest/recheck/` and test reports inside `target/test-classes/retest/recheck/` by default. To determine where to put the Golden Master, `RecheckImpl` uses the given [`ProjectLayout`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/persistence/ProjectLayout.java) with the [`MavenProjectLayout`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/persistence/MavenProjectLayout.java) as default. To name the tests and suites, the default for [`NamingStrategy`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/persistence/NamingStrategy.java) is [`ClassAndMethodBasedNamingStrategy`](https://github.com/retest/recheck/blob/release/v1.5.0/src/main/java/de/retest/recheck/persistence/ClassAndMethodBasedNamingStrategy.java).

## Changing the path and NamingStrategy

If you want to configure where recheck puts the Golden Master files, you can do so via a piece of code. The reason for this is that we usually don't want a fixed name, but a name per test or per suite. 

You can use the [`ClassAndMethodBasedShortNamingStrategy`](https://github.com/retest/recheck/blob/release/v1.5.0/src/main/java/de/retest/recheck/persistence/ClassAndMethodBasedShortNamingStrategy.java) (or implement your own `NamingStrategy`) and pass is to `RecheckImpl` via `RecheckOptions`. Same goes for the `ProjectLayout` (for example the [`GradleProjectLayout`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/persistence/GradleProjectLayout.java)):

```java
RecheckOptions options = RecheckOptions.builder()
		.namingStrategy( new ClassAndMethodBasedShortNamingStrategy() )
		.projectLayout( new GradleProjectLayout() )
		.build();
Recheck re = new RecheckImpl( options );
```

Another option for a `ProjectLayout` is [`SeparatePathsProjectLayout`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/persistence/SeparatePathsProjectLayout.java) and [`ExplicitMutableNamingStrategy`](https://github.com/retest/recheck/blob/release/v1.5.0/src/main/java/de/retest/recheck/persistence/ExplicitMutableNamingStrategy.java) for a `NamingStrategy`.

Alternatively, if you only want to rename the method part for your test report, you can do so by adding the argument to `re.startTest( "testName" );`

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
		re.startTest();
	
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

In case there are differences, this would result in a test report `MyRecheckWebTest.report` (a test report with a single suite) that contains a test for `someTest()` and two checks ("1st-page" and "2nd-page").

So for every test class, you get a separate test report that is represented as a tree of test methods and their corresponding checks. Additionally, we provide an aggregated `tests.report` that includes *all* test classes.
