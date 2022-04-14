# Setting Up a Project Using Maven

This tutorial assumes you have [Java](https://www.java.com/) and [Maven](https://maven.apache.org/) readily installed on your system. You can verify that by opening a terminal / CMD and running

```
java -version
mvn --version
```


The output should contain no error and show a Java version of 8 or above. Now you can create a new folder (e.g. `recheck-web-tutorial`) and a simple `pom.xml` file with the following content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
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
			<version>4.13</version>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>de.retest</groupId>
			<artifactId>recheck-web</artifactId>
			<version>1.11.0</version>
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

Extract the archive to your hard drive. Note that for the ChromeDriver to work, you need the major version to match your Chrome version installed on your system. Now we should be all set up to create [your first test](../tutorial/explicit-checks.md).

## Using ReTest in connection with Spring
If you plan to use Spring alongside with ReTest in the same project, you should know the following:

Since Java version 11 `javax.xml.bind` is replaced by `jakarta.xml.bind`. ReTest already uses the newer version, meaningly `jakarta.xml.bind`, while
Spring is still using `javax.xml.bind`. To avoid any errors, it is necessary to add the following dependencies to your `pom.xml` file.

```xml
<!-- START workaround old jaxb package name -->
<dependency>
	<!-- provide xml api with jakarta package name -->
	<groupId>jakarta.xml.bind</groupId>
	<artifactId>jakarta.xml.bind-api</artifactId>
	<version>[3,3.99)</version><!--$NO-MVN-MAN-VER$ -->
	<!-- depends on com.sun.activation:jakarta.activation > 2.0 (package jakarta.activation) -->
</dependency>
<dependency>
	<!-- version with old package name exist, so we need to enforce a lower version bound -->
	<groupId>com.sun.activation</groupId>
	<artifactId>jakarta.activation</artifactId>
	<version>[2,2.99)</version><!--$NO-MVN-MAN-VER$ -->
</dependency>
<dependency>
	<!-- provide xml api with javax package name -->
	<groupId>javax.xml.bind</groupId>
	<artifactId>jaxb-api</artifactId>
	<version>[2.3,2.99)</version><!--$NO-MVN-MAN-VER$ -->
	<!-- depends on javax.activation:javax.activation-api (package javax.activation) -->
</dependency>
<!-- END workaround old jaxb package name -->

<dependency>
	<!-- workaround for legacy mail dependency in spring-boot-starter-oauth2-client -->
	<!-- only needed if spring-boot-starter-oauth2-client < v2.4.12 or < v2.5.5 is used -->
	<groupId>com.sun.mail</groupId>
	<artifactId>jakarta.mail</artifactId>
	<version>2.0.1</version><!--$NO-MVN-MAN-VER$ -->
	<scope>test</scope>
</dependency>
```

Furthermore, Spring defines selenium version 3 in its POM file while ReCheck (version >= 1.13) is using selenium version 4.
The respective dependencies must therefore be overwritten in your `pom.xml` file by adding the following block.

```xml
<dependencyManagement>
	<dependencies>
		<!-- START workaround selenium 4 -->
		<!-- recheck >= 1.13 uses selenium 4, spring defines selenium 3 in parent-pom, so we need to overwrite it. -->
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-java</artifactId>
			<version>[4,4.99)</version>
		</dependency>
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-api</artifactId>
			<version>[4,4.99)</version>
		</dependency>
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-chrome-driver</artifactId>
			<version>[4,4.99)</version>
		</dependency>
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-devtools-v85</artifactId>
			<version>4.1.2</version>
		</dependency>
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-devtools-v97</artifactId>
			<version>[4,4.99)</version>
		</dependency>
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-devtools-v98</artifactId>
			<version>[4,4.99)</version>
		</dependency>
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-devtools-v99</artifactId>
			<version>[4,4.99)</version>
		</dependency>
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-edge-driver</artifactId>
			<version>[4,4.99)</version>
		</dependency>
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-firefox-driver</artifactId>
			<version>[4,4.99)</version>
		</dependency>
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-ie-driver</artifactId>
			<version>4.1.2</version>
		</dependency>
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-opera-driver</artifactId>
			<version>[4,4.99)</version>
		</dependency>
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-remote-driver</artifactId>
			<version>[4,4.99)</version>
		</dependency>
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-safari-driver</artifactId>
			<version>[4,4.99)</version>
		</dependency>
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-support</artifactId>
			<version>[4,4.99)</version>
		</dependency>
		<!-- END workaround selenium 4 -->
	</dependencies>
</dependencyManagement>
```
