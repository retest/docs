# Usage

The basic entrance point is [`Recheck`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/Recheck.java) with its implementation [`RecheckImpl`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/RecheckImpl.java).

## Methods

The essential methods are called `check`. Upon first execution, the object is converted to a Golden Master and save it, identified by the name passed. Subsequent executions convert the object to the domain model and compares it against the existing Golden Master.

!!! failure
	If there is no extension present that can handle the passed object, an exception is thrown. As described in [installation](installation.md), you need to have an extension available that is able to do the conversion.

## Lifecycle

To [locate](../location-of-the-golden-master-files-and-test-reports.md) the Golden Master (if present) Recheck uses a lifecycle so that differences can be identified. The lifecycle of `Recheck` can be described with three phases, where the earlier stages surround one or more of the following stage:

1. Report: This is independent of the actual `Recheck`-Instance. It will simply collect all generated reports into one. This phase is usually bound to the JVM.
2. Suite: Defined by the `Recheck`-Instance (e.g. a test class within JUnit). It is started by creating a new instance and ended by `re.cap()` which will create the report containing all the differences encountered.
3. Test: Defined by a test execution (e.g. a test method in JUnit). It is started by `re.startTest()` and ended by `re.capTest()` which will produce an `AssertionError` if there are differences or if the Golden Master could not be found (e.g. initial execution).

Within the Test-Phase you can execute multiple checks. The created Golden Masters are then associated with the running Suite- and Test-Phase.

!!! warning
	You should make sure to call the methods in their respective order. While `Recheck` will try its best to keep the lifecycle intact, it may still produce unexpected results or even errors.

### Modifying the lifecycle

A phase of the lifecycle is identified by a name that is either identified using the [`NamingStrategy`](https://github.com/retest/recheck/tree/master/src/main/java/de/retest/recheck/persistence/NamingStrategy.java) or you can overwrite it by passing a `String` into the respective starting methods. If nothing is specified, `Recheck` will try to automatically identify a name. If this fails, a custom name must be specified.

This naming-mechanism basically allows you to *share* Golden Masters. This can be used to test different setups for your object. A common use case would check if an operation was undone successfully (see example below).

```java
re.startTest( "custom-name" );

// By defining the name, a golden master with the corresponding name will be created
re.check( object, "initial" );

// Perform an operation that changes the object
object.do();

// Verify the changed operation
re.check( object, "modified" );

// Undo the operation
object.undo();

// Instead of creating a new golden master, the exisiting is used and compared against
re.check( object, "initial" );

re.capTest();
```

An advanced use case would check different platforms, operating systems, languages, etc., and verify that those is the same. Ideally this would not happen within a single Test-Phase (depending on your test-framework), but encompass multiple Test-Phases or even Suite-Phases.

!!! tip
	You may use the [filtering](../how-ignore-works.md) mechanism to ignore differences that you expect to manipulate the definition of *"same"*. That would mean for language to ignore the text as it has changed expectedly.

## Integration with test framework

### JUnit 4

The following example uses JUnit 4 as test frame work.
```java
public class ExampleRecheckTest {

	private static Recheck re;

	@BeforeClass
	public static void setUpOnce() {
		// Create your instance once
		re = new RecheckImpl();
	}

	@AfterClass
	public static void tearDownOnce() {
		// Save the report
		re.cap();
	}

	@Test
	public void check_simple_string() {
		re.startTest();

		// Create your object to check. An appropriate adapter must be present
		final var object = ...;

		// Create a golden master or check against, does not throw
		re.check( object, "check-name" );

		// Will fail if there are differences to the golden master
		re.capTest();
	}
}
```

### JUnit 5

The following example uses JUnit 5 as test framework.
```java
public class ExampleRecheckTest {

	static Recheck re;

	@BeforeAll
	static void setUpOnce() {
		// Create your instance once
		re = new RecheckImpl();
	}

	@AfterAll
	static void tearDownOnce() {
		// Save the report
		re.cap();
	}

	@Test
	void check_simple_string() {
		re.startTest();

		// Create your object to check. An appropriate adapter must be present
		final var object = ...;

		// Create a golden master or check against, does not throw
		re.check( object, "check-name" );

		// Will fail if there are differences to the golden master
		re.capTest();
	}
}
```