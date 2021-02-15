# Run your first test

## Prerequisites

<!-- 1. [Create](https://login.retest.de/auth/realms/customer/account) a free retest account. -->
2. Have Java 8 or higher installed.
    * [Install it from here](https://adoptopenjdk.net/)
3. Install Eclipse or IntelliJ editor.
4. Download and extract review from [here](https://assets.retest.org/releases/review.html).
5. Install [ChromeDriver](https://chromedriver.chromium.org/getting-started) on your machine and make sure it's is in the PATH.
    * [Install on Mac](https://www.kenst.com/2015/03/installing-chromedriver-on-mac-osx/)
    * [Install on Windows](https://www.youtube.com/watch?v=dz59GsdvUF8)

!!! tip
    On Mac and Linux, place the chromedriver executable in /usr/local/bin folder so Eclipse and IntelliJ can find it.

6. Install Maven. You can download the Maven binary Zip file from here
    * Follow the installation instructions from [here](https://maven.apache.org/install.html) to add it to the PATH.

## Run the existing demo app

1. Get the code:
    * Option 1: Create a new maven project in your IDE and use the `de.retest:recheck-web-archetype` archetype as project prototype.
    * Option 2:
        * Run `mvn archetype:generate -Dfilter=de.retest:` and follow the interactive mode.
        * Then import the created folder in your IDE as maven project
    * You more information in the [recheck-web-archetype github project](https://github.com/retest/recheck-web-archetype#usage).
2. Run the test
    <!-- * If you are not logged in locally, your browser will open and ask for your retest account -->
    * In Eclipse:
        Right click on the Project (or anywhere in the code) > Run As > JUnit Test
    * In Command line, run the following Maven command:
    * `mvn test`
3. After you run one set of tests, you now have verified that the Golden Master is correct. Run the same test but change `loginFormUrl` in `src/test/java/my/test/util/DemoApp.java` to: [https://assets.retest.org/demos/app/demo-app.html](https://assets.retest.org/demos/app/demo-app.html).

    ```java
    static public String loginFormUrl() throws MalformedURLException {
            return "https://assets.retest.org/demos/app/demo-app.html";
    }
    ```
    This version of the demo app has some visual bugs so you can see how it all works.

4. Start review and start exploring your report
    * You find it in your project folder under this path `./target/test-classes/retest/recheck/tests.report`.

    <!-- * If you are not logged in locally, your browser will open and ask for your retest account
    * Because reports are automatically managed you should be able to see it immediately -->
