# Setting RecheckOptions

There are a few different options you can set for your test using the RecheckOptionsBuilder. For example: [Setting the location and name of your Golden Masters and test reports](https://docs.retest.de/recheck/location-of-the-golden-master-files-and-test-reports/).

If you completed our [recheck-web tutorial](https://docs.retest.de/recheck-web/tutorial/explicit-checks/), you already know how to [enable uploading your test reports to rehub](https://docs.retest.de/recheck-web/tutorial/upload-test-reports-to-rehub/).

## Setting Filters

If you want to use your own created filter, you first have to move the file to your project folder into `.retest/filter/`. Then you can pass it to `RecheckImpl` via `RecheckOptions` (the `.filter` extension in the file name is needed):

```java
RecheckOptions options = RecheckOptions.builder()
		.setIgnore( "filterName.filter" )
		.build();
Recheck re = new RecheckImpl( options );
```

To append a filter to the default filters, you can use `addIgnore( "filterName.filter" )` but note that you cannot use this once a filter is overwritten via `setIgnore( "filterName.filter" )`. If you don't want to use any filter at all, you might as well call `ignoreNothing()`.

You can also use a filter globally for multiple projects by creating a `.retest/filter/` folder in your user directory. Filters that you drop there can be reused in every project. Note that in the case of a name clash, more specific filters overwrite more general filters. That is, project overwrites user home, which overwrites default filters.

