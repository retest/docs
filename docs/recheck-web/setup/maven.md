# Setting up a Project Using Maven

This tutorial assumes you have [Java](https://www.java.com/) and [Maven](https://maven.apache.org/) readily installed on your system. You can verify that by opening a terminal / CMD and running

```
java -version
mvn --version
```

The output should contain no error and show a Java version of 8 or above. Now you can create a new folder (e.g. `recheck-web-tutorial`) and a simple `pom.xml` file with the following content:

```
<project>
	<modelVersion>4.0.0</modelVersion>
	<groupId>com.mycompany</groupId>
	<artifactId>recheck-web-tutorial</artifactId>
	<version>0.1-SNAPSHOT</version>

	<properties>
		<maven.compiler.source>1.8</maven.compiler.source>
		<maven.compiler.target>1.8</maven.compiler.target>
	</properties>

	<dependencies>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.12</version>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>de.retest</groupId>
			<artifactId>recheck-web</artifactId>
			<version>1.0.1</version>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-java</artifactId>
			<version>3.141.59</version>
			<scope>test</scope>
		</dependency>
	</dependencies>
</project>
```

With this, you can now turn to your favorite IDE (e.g. `mvn eclipse:eclipse`) and create your first test class. Before a Selenium test can be executed correctly, you first need to download a driver/browser executable according to your liking and operating system, e.g. [Chrome](http://chromedriver.storage.googleapis.com/index.html).

Extract the archive to your hard drive. Note that for the ChromeDriver to work, you need the major version to match your Chrome Version installed on your system. Now we should be all set up to create [your first test](../postpone-test-breakage.md).
