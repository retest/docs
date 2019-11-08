# Using review to Maintain the Golden Master

## Setup

You can download the most recent version from [our website](https://assets.retest.org/releases/review.html). Afterwards, you can simply open the executable review application and your browser should pop up, redirecting you to the *rehub* login to connect your account.

## Open Reports

If you click on `open` in *review* and you don't see your reports from *rehub*, but can only search for local reports, you're probably not logged in in *rehub*. To login you can open the menu in the top left corner and click on `Open Account...`. If you've logged in there, reopen *review* and your reports should appear. You can always search for reports locally if you downloaded them.

## Maintaining the Golden Master

After opening a test report with an existing Golden Master you can view all differences between the actual version and the GM. Yellow means there are changes you didn't accept or ignore yet and green means there are no differences. You can ignore specific differences and hide already accepted/ignored ones in the top left via check marks.

The differences are sorted by tests in suites. You can either accept/ignore all of them at once or go through them individually and accept the changes. This will update the Golden Master and/or the recheck.ignore file automatically and there should nothing be left you have to do.