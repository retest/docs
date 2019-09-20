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
Recheck re = new RecheckImpl( RecheckOptions.builder()
    // Do your configuration here
    .build() );
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

[^1]: Note that JUnit and TestNG is supported by default through `ClassAndMethodBasedNamingStrategy`.
