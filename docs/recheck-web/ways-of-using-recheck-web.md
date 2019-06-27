# Ways of Using recheck-web

There are several ways to use recheck-web. If you only want to use recheck-web's capabilities to do difference testing with _explicit_ checks, then you don't have to switch your `WebDriver` at all; simply add `Recheck re = new RecheckImpl()` to your test. If you want to leverage "Unbreakable Selenium", you have to use `UnbreakableDriver` as a driver wrapper and switch to `RecheckWebImpl`. Finally, if you want to trigger checks after each GUI action implicitly, you can use `AutocheckingRecheckDriver` and omit using a `Recheck` instance.

For further information you can check out the Javadoc of the corresponding classes and refer to our [integration tests](https://github.com/retest/recheck-web/tree/master/src/test/java/de/retest/web/it), which demonstrate the usage.
