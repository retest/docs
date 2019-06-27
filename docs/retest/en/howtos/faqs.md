# Frequently Asked Questions

### Java Not Recognized

I get the following error (under Windows):

`'java' is not recognized as an internal or external command, operable program or batch file.`

*Solution:* The error occurs because the `java` command (which is required by retest) is not within your path. 
Please make sure you have Java installed and the `JAVA_HOME` variable is set. 
You can have a look at [this tutorial](https://java.com/en/download/help/windows_manual_download.xml).

### Missing Menu Items

If you start ReTest and immediately get an exception, followed by a GUI without menu items, then this is very likely caused by Java 9. We currently only support Java 6, 7 or 8.

