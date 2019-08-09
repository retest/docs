# Upload Test Reports to rehub

## Setup Local Build

Test reports can be easily uploaded to [***rehub***](https://retest.de/rehub/). For this our existing test case has to be adjusted only slightly. It is possible to upload test reports when we execute the test locally or in a CI/CD environment. For the configuration of the CI/CD environment follow [***this description***](travis-execute-ci.md), in order to execute your test with Travis.

To upload reports you will need an [***retest account***](https://sso.prod.cloud.retest.org/auth/realms/customer/account) to gain access to rehub. After the initial registration you will receive a 14-day trial.

The first step is to modify the `setUp()` method in our existing test case to enable the upload to rehub. There are two ways to achieve this:

- Set the `REHUB_REPORT_UPLOAD_ENABLED` system property

```java
@Before
void setUp() {
    driver = new ChromeDriver();
    re = new RecheckImpl();
    System.setProperty( de.retest.recheck.Properties.REHUB_REPORT_UPLOAD_ENABLED, "true" );
}
```

- Modify the `RecheckImpl` constructor

```java
@Before
void setUp() {
    driver = new ChromeDriver();
    re = new RecheckImpl( RecheckOptions.builder().reportUploadEnabled( true ).build() );
}
```

If we execute the test locally and the configuration was successful, your browser will pop up and you will be prompted to login. Afterwards you can find your test reports on [***rehub***](https://garkbit.prod.cloud.retest.org/dashboard).

## Setup Travis CI

After the existing test case has been modified, we may also configure our CI/CD environment. First, set the `RECHECK_API_KEY` environment variable as shown in the [documentation](https://docs.travis-ci.com/user/environment-variables/#defining-variables-in-repository-settings).

We need the `RECHECK_API_KEY` that is generated when the modified test is executed. We can read it from the log.

![Travis-CI environment variable](travis-ci-environment-variables.png)

 >Keep your RECHECK_API_KEY token secret  <br/> 
 >Anyone with access to your token can add test reports to ***rehub***. <br/>
 >For Travis-CI, make sure the `Display value in build log` toggle is off.

When we have completed all settings and executed the test in our CI/CD environment, we should receive the message `Sucessfully uploaded report to rehub` in the Travis CI Job Log. Now that the test has been executed in the CI/CD environment and the test report has been uploaded to rehub, we can maintain the report in different ways.

## Access your reports

All your reports can be accessed online. Open [***rehub***](https://garkbit.prod.cloud.retest.org/dashboard), enter your account details and view/download your reports.

Reports can be opened with either [***review***](https://retest.de/review/) or the open-source [***CLI***](https://github.com/retest/recheck.cli/).

With review it is also possible to load reports directly from ***rehub***.
