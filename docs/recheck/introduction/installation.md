# Installation

!!! abstract 
	You only should only need to define the dependency if you plan to extend ***recheck*** yourself. You may use an already implemented extension.

## Extensions

***recheck*** is usually used with extensions that provide the capability for converting the objects of a specific technology into the domain model of ***recheck***.

Available extensions:

* [***recheck-web***](https://github.com/retest/recheck-web): *Testing websites and web applications based on [Selenium](https://www.seleniumhq.org/)*.
* *More to come*

!!! tip
	If you are developing an extension for ***recheck***, we would be happy if you [contact us](https://retest.de/contact-us/) or add your extension with a short description here.

## Extending recheck

You can add ***recheck*** as an external dependency to your project. It is available in [maven](https://mvnrepository.com/artifact/de.retest/recheck) or via the [release-page](https://github.com/retest/recheck/releases) which allows you to include it into your favorite build tool.

For the current version, please refer to the [release-page](https://github.com/retest/recheck/releases).

### Maven

```xml
<dependency>
	<groupId>de.retest</groupId>
	<artifactId>recheck</artifactId>
	<version>${recheck-version}</version>
</dependency>
```

### Gradle

```gradle
compile 'de.retest:recheck:${recheck-version}'
```
