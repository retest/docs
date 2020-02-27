# Run your first test

## Prerequisites

1. [Create](https://login.retest.de/auth/realms/customer/account) a free retest account
2. Have Java 8 or higher installed
    * [Install it from here](https://www.java.com/en/download/help/download_options.xml)
3. Install Eclipse or IntelliJ editor
4. Download and extract review from [here](https://assets.retest.org/releases/review.html)
5. Install [ChromeDriver](https://chromedriver.chromium.org/getting-started) on your machine and make sure it's is in the PATH.
    * [Install on Mac](https://www.kenst.com/2015/03/installing-chromedriver-on-mac-osx/)
    * [Install on Windows](https://www.youtube.com/watch?v=dz59GsdvUF8)

!!! tip
    On Mac, place the chromedriver executable in /usr/local/bin folder so Eclipse and IntelliJ can find it.

6. Install Maven. You can download the Maven binary Zip file from here
    * Follow the installation instructions from [here](https://maven.apache.org/install.html) to add it to the PATH

## Run the existing demo app

1. Get the code:
    * Option 1: git clone https://github.com/retest/tutorial-recheck-java-basic
    * Option 2: Download it as a Zip file and unzip it.
2. Import the folder as a Maven file in Eclipse or IntelliJ.
3. Run the test
    * If you are not logged in locally, your browser will open and ask for your retest account
    * In Eclipse:
        Right click on the Project (or anywhere in the code) > Run As > JUnit Test
    * In Command line, run the following Maven command:
    * `mvn -Dtest=BasicDemo test`
4. After you run one set of tests, you now have the Golden Master. Run the same test but with this URL: https://demo.retest.org/changed.html. This version of the demo app has some visual bugs so you can see how it all works.
5. Start review and start exploring your report
    * If you are not logged in locally, your browser will open and ask for your retest account
    * Because reports are automatically managed you should be able to see it immediately

## Troubleshooting Common Issues
