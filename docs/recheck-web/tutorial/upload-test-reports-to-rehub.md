# Upload Test Reports to rehub

## Set Up Local Build

Test reports can be easily uploaded to [***rehub***](https://retest.de/rehub/). For this our existing test case has to be adjusted only slightly. It is possible to upload test reports when we execute the test locally or in a CI/CD environment. For the latter, you can follow [this description](travis-execute-ci.md) in order to execute your test with Travis CI.

Remember to set the property for the ChromeDriver executable when you want to execute the test locally (and remove it when you push). If you don't want to change this every time you execute your test locally, you can simply add the `chromedriver.exe` to your [path](https://java.com/en/download/help/path.xml).

To upload reports you will need a [retest account](https://sso.prod.cloud.retest.org/auth/realms/customer/account) to gain access to ***rehub***. After the initial registration, you will receive a 14-day trial.

The first step is to modify the `setUp()` method in our existing test case to enable the upload to ***rehub***. There are two ways to achieve this:

- Set the `REHUB_REPORT_UPLOAD_ENABLED` system property (you have to do this _before_ `RecheckImpl` is created)

```java
@Before
void setUp() {
    System.setProperty( Properties.REHUB_REPORT_UPLOAD_ENABLED, "true" );
    re = new RecheckImpl();
    // ...
}
```

- Set the rehub flag via `RecheckOptions`

```java
@Before
void setUp() {
    RecheckOptions options = RecheckOptions.builder().enableReportUpload().build();
    re = new RecheckImpl( options );
    // ...
}
```

If we execute the test locally and the configuration was successful, your browser will pop up and you will be prompted to login. Afterwards, you can find your test reports on [***rehub*** dashboard](https://garkbit.prod.cloud.retest.org/dashboard).

### Enable rehub Globally

If you have multiple tests and don't want to adapt all of them to upload to rehub, it is easier to set the system property via the mechanism that triggers your tests. Suppose you use Maven and the Surefire or Failsafe plugin for test execution, you can adapt the plugin configuration as follows to enable rehub globally:

```xml
<configuration>
    <systemPropertyVariables>
        <de.retest.recheck.rehub.reportUploadEnabled>true</de.retest.recheck.rehub.reportUploadEnabled>
    </systemPropertyVariables>
</configuration>
```

## Setup Travis CI

After the existing test case has been modified, we may also configure our CI/CD environment. First, set the `RECHECK_API_KEY` environment variable as shown in the [Travis CI documentation](https://docs.travis-ci.com/user/environment-variables/#defining-variables-in-repository-settings).

We need the `RECHECK_API_KEY` that is generated when the modified test is executed, which you should find in the log. Alternatively, you can invoke `Rehub#getRecheckApiKey()` locally and the print the returned string to see your personal token.

![Travis CI environment variable](travis-ci-environment-variables.png)

 >Keep your RECHECK_API_KEY token secret!<br/> 
 >Anyone with access to your token can add test reports to ***rehub***.<br/>
 >For Travis CI, make sure the `Display value in build log` toggle is off.

When we have completed all settings and executed the test in our CI/CD environment, we should receive the message `Successfully uploaded report to rehub` in the Travis CI build log. Now that the test has been executed in the CI/CD environment and the test report has been uploaded to rehub, we can maintain the report in different ways.

## Access Your Reports

All your reports can be accessed online. Open [***rehub***](https://garkbit.prod.cloud.retest.org/dashboard), enter your account details, and view/download your reports.

Reports can be opened either with [***review***](https://retest.de/review/) or [***recheck.cli***](https://github.com/retest/recheck.cli/). With review, it is also possible to load reports directly from ***rehub***.
