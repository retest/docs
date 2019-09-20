# Ways of Using recheck-web

There are several ways to use recheck-web. If you only want to use recheck-web's capabilities to do difference testing with _explicit_ checks, then you don't have to switch your `WebDriver` at all; simply add `Recheck re = new RecheckImpl()` to your test.

If you want to leverage "Unbreakable Selenium", you have to use `UnbreakableDriver` as a driver wrapper and switch to `RecheckWebImpl`.

If you want to trigger checks after each GUI action implicitly, you can use `AutocheckingRecheckDriver` and omit using a `Recheck` instance.

Just like in `Recheck` where you can [change the `NamingStrategy`](https://docs.retest.de/recheck/location-of-the-golden-master-files-and-test-reports/), you can also change it in `Recheck-Web`. The default strategy is the [`CounterCheckNamingStrategy`](https://github.com/retest/recheck-web/blob/master/src/main/java/de/retest/web/selenium/CounterCheckNamingStrategy.java). You can also use the [`ActionbasedCheckNamingStrategy`](https://github.com/retest/recheck-web/blob/master/src/main/java/de/retest/web/selenium/ActionbasedCheckNamingStrategy.java) (or implement your own [`AutocheckingCheckNamingStrategy`](https://github.com/retest/recheck-web/blob/master/src/main/java/de/retest/web/selenium/AutocheckingCheckNamingStrategy.java)) and pass is to RecheckWebImpl via RecheckWebOptions:

```
RecheckWebOptions options = RecheckWebOptions.builder()
				.checkNamingStrategy( new ActionbasedCheckNamingStrategy() )
				.build();
Recheck re = new RecheckWebImpl( options );
```

`RecheckDriver` combines all recheck-web features. Use this class if you automatically want to incorporate new features without changing your recheck-web driver implementation manually.

To summarize:

| `WebDriver` | Checks | `Recheck` |
|---|---|---|
| Ordinary driver (e.g. `ChromeDriver`) | Explicit | `RecheckImpl` |
| `UnbreakableDriver` | Explicit | `RecheckWebImpl` |
| `AutocheckingRecheckDriver` | Implicit | Integrated (i.e. not needed) |
| `RecheckDriver` | Implicit | Integrated (i.e. not needed) |

For further information you can check out the Javadoc of the corresponding classes and refer to our [integration tests](https://github.com/retest/recheck-web/tree/master/src/test/java/de/retest/web/it), which demonstrate the usage.
