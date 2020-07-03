# Automatic Code Healing

!!! tip
    Code healing is an early feature and might not work for every use case. We would love to hear feedback and suggestions from you as we further improve this feature.

!!! warning
    This feature is only available with the standard license. If you do not own such a license, please write an email to sales@retest.de.

Using ***recheck-web*** allows tests to be almost [unbreakable](../../recheck-web/usage/healing.md). With ***review*** you can make them truly unbreakable since it will try to automatically healing any accepted breaking change.

Breaking changes, as indicated by ***recheck-web***, are displayed via a warning as seen below in the selected line. 

![Opened `FormTest.report` with ***review***](review-healing.png)

When you accept breaking changes, they are saved until you press "Apply changes". Once you do, the breaking changes are collected per file and each affected file is healed by searching for the appropriate line and replacing the corresponding identifier.

## Exceptions

The following conditions will not trigger code healing:

1. Your license does not suffice. In this case you need to write an email to sales@retest.de.
3. The breaking change has not been accepted.
4. The breaking change has been ignored. As the value in the Golden Master has not been updated, it is not necessary to heal the identifier.
5. The test to be healed has been removed.
6. The line to be healed has been removed or changed. This may be caused by refactoring or manual changes affecting the identifier.
7. The identifier is too complex to be analyzed and healed. Currently only inline identifiers are supported.
