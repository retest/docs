# Configuration

We use [*Convention over Configuration*](https://en.wikipedia.org/wiki/Convention_over_configuration) to configure the behavior of ***recheck***. Thus unless your setup does not fit to the default mechanism, you should not have to configure anything.

Tools we use for code development, and thus are configured as the default:

- [git](https://git-scm.com)
- [Maven](https://maven.apache.org/)
- [JUnit5](https://junit.org/junit5/)

Tools we do not (actively) use, but support:

- [Gradle](https://gradle.org/)
- [JUnit4](https://junit.org/junit4/)
- [TestNG](https://testng.org)[^1]

!!! tip
    If you feel that the tools you are using are not supported or lack support, you are welcome to implement or improve the support for the respective tool and [create a pull request](https://github.com/retest/recheck/pulls) or [create an issue](https://github.com/retest/recheck/issues).

## RecheckOptions

The [`RecheckOptions`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/RecheckOptions.java) are used to configure the behavior of `Recheck`. They use the [Builder Pattern](https://en.wikipedia.org/wiki/Builder_pattern) and cannot be changed, once they are created.

```java
RecheckOptions options = RecheckOptions.builder()
    // Do your configuration here
    .build()
```

### Usage

The options can be easily passed to the [`RecheckImpl`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/RecheckImpl.java).

```java
Recheckoptions opts = RecheckOptions.builder()
    // Do your configuration here
    .build();
Recheck re = new RecheckImpl( opts );
```

!!! note
    All available `Recheck`-Instances should honor and support the all available options within `RecheckOptions`.

### Options

Below is a list of the available options you may configure with corresponding methods on `RecheckOptionsBuilder`. Please refer to the detailed sections below.

| Option                | Default                                                                                                                                                                 | Description                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `namingStrategy`      | [`ClassAndMethodBasedNamingStrategy`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/persistence/ClassAndMethodBasedNamingStrategy.java) | Defines the name for the phase of the [lifecycle](../introduction/usage.md).           |
| `projectLayout`       | [`MavenProjectLayout`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/persistence/MavenProjectLayout.java)                               | Defines where the files are located.                                                   |
| `suiteName`           | `null`                                                                                                                                                                  | Overwrite the name for the suite.<br>If `null`, `NamingStrategy#getSuiteName` is used. |
| `reportUploadEnabled` | `false`                                                                                                                                                                 | Upload reports to [***rehub***](https://retest.de/rehub/).                             |
| `ignore`              | `recheck.ignore`                                                                                                                                                        | Set the filter used for reporting the differences after a test phase.                  |

### Example

```java
RecheckOptions.builder()
        .namingStrategy( new ClassAndMethodBasedShortNamingStrategy() )
        .projectLayout( new GradleProjectLayout() )
        .suiteName( "my-custom-suite-name" )
        .enableReportUpload()
        .addIgnore( "MyCustomIgnore.filter" )
        .build();
```

### Locating Files

Per default, we assume a Maven project with JUnit. The files are located under the following folders:

1. Golden Masters: `src/test/resources/retest/recheck/`
2. Reports: `target/test-classes/retest/recheck/`

You may change the location of files using a custom [`ProjectLayout`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/persistence/ProjectLayout.java) or define the name using a custom [`NamingStrategy`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/persistence/NamingStrategy.java) as described in the [lifecycle](../introduction/usage.md).

#### Upload Reports to rehub

When executing your tests on a CI, you may not be able to access the created files. Thus we offer a way to [upload](../../recheck-web/tutorial/upload-test-reports-to-rehub.md) your reports to ***rehub*** so that you can update your Golden Masters.

### Using Filters

If you want to use your own created filter, you may specify the full name (e.g. `"MyCustomIgnore.filter"`) of the file which can be located as described in the [filter](filter.md) documentation. 

Per default, we load the [`recheck.ignore`](filter.md) files. Note that there are several methods to add/update filters:

1. `RecheckOptionsBuilder#addIgnore( String )`: Will append a filter.
2. `RecheckOptionsBuilder#setIgnore( String )`: Will overwrite the filter.
3. `RecheckOptions#ignoreNothing()`: Will remove all filters.

## Properties

Some properties can be set via [system properties](https://docs.oracle.com/javase/8/docs/api/java/lang/System.html#setProperty-java.lang.String-java.lang.String-).

```properties
####################################################################################################
# FORMAT                                                                                           #
####################################################################################################

# Description.
# Possible values.
key=${DEFAULT_VALUE}

####################################################################################################
# PROJECT                                                                                          #
####################################################################################################

# If set, recheck will use this path as the project root (containing e.g. the .retest folder).
# Any valid absolute path.
de.retest.recheck.project.root=null
```

[^1]: Note that JUnit and TestNG is supported by default through `ClassAndMethodBasedNamingStrategy`.
