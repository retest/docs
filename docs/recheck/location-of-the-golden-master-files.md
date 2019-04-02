# Location of the Golden Master files

When calling `Recheck#capTest()`, recheck either creates a diff using the existing Golden Master or—if it is the first time a test is being executed—it creates the Golden Master itself and fails the test. 

Note that it is important to fail the test if no Golden Master can be found. As mentioned before, this always happens the first time a test gets executed, but it can also happen for a variety of other reasons. For instance, when someone forgets to add the Golden Master to the version control system or if a test or a folder is renamed. If this is the case, then you definitely want the test to fail.

If you want to configure where recheck puts the Golden Master files, you can do so via a piece of code. The reason for this is that we usually don't want a fixed name, but a name per test or per suite. To determine where to put the Golden Master, `RecheckImpl` uses the given [`FileNamerStrategy`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/FileNamerStrategy.java), which in turn yields a `FileNamer`. The default `FileNamerStrategy` is the [`MavenConformFileNamerStrategy`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/MavenConformFileNamerStrategy.java). 

Alternatively, you can use the [`GradleConformFileNamerStrategy`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/GradleConformFileNamerStrategy.java) (or implement your own `FileNamerStrategy`) and pass is to `RecheckImpl` via `RecheckOptions`:

```java
RecheckOptions options = RecheckOptions.builder()
		.fileNamerStrategy( new GradleConformFileNamerStrategy() )
		.build();
Recheck re = new RecheckImpl( options );
```
