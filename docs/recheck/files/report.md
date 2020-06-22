# Test Report

A *report* is the result of the comparison of two [states](state.md) with one or multiple steps and contains all differences between these two states. It is a static artifact and can be viewed without the corresponding Golden Master. However, in order to approve changes, a Golden Master must be present.

A report can be viewed with either user interface [***review***](../../review/installation.md) or [***recheck.cli***](https://github.com/retest/recheck.cli).

!!! warning
    The report is bound to the ***recheck*** version used during comparison. We currently offer no compatibility support between versions. If you need a report in a newer version, simply execute the test again with the new ***recheck*** version.

## Structure

A report is structured to comply with the [lifecycle](../introduction/usage.md) of `Recheck`.

```text
Report
+-- Suite (1..n)
    +-- Test (1..n)
        +-- Check (1..n)
            +-- Difference (0..n)
```

## Location

Per default, reports are located under `target/test-classes/retest/recheck/`, which can be changed with some [configuration](../usage/configuration.md).

!!! tip
    If you execute your tests on a remote system such as a CI server, you can enable the [***recheck***'s report upload](../../recheck-web/tutorial/upload-test-reports-to-rehub.md). This will upload your report to [***rehub***](https://rehub.retest.de), so that it can be accessed and downloaded to view it.

## Differences

There are several types of differences that can be encountered. Note that the example output is based of the [***recheck.cli***](https://github.com/retest/recheck.cli).

### Attribute Differences

An *attribute difference* indicates that an element's attribute has changed. This is the most common difference and may include every attribute that is extracted through a extension. For example, this could include `text` changes or changes from/to the default value of the respective attribute.

```text
p (recheck) at 'html[1]/body[1]/header[1]/nav[1]/div[1]':
    text:
      expected="recheck",
        actual="Recheck"
    font-weight:
      expected="(default or absent)",
        actual="700"
```

### Element Differences

An *inserted difference* indicates that a new element has been added.

```text
p (recheck) at 'html[1]/body[1]/header[1]/nav[1]/div[1]':
    was inserted
```

A *deleted difference* indicates that an element has been removed.

```text
p (recheck) at 'html[1]/body[1]/header[1]/nav[1]/div[1]':
    was deleted
```

### Metadata Difference

A *metadata difference* indicates changes in the metadata of a state. This is most likely due to the state being created on a different system or at a different time. These differences have no effect on the report and will be applied automatically. For a list of metadata, please refer to the [state](state.md) page.

```text
os.name:
  expected="Windows 10",
    actual="Ubuntu"
```

## Filtering

We capture every difference that occurs. This is to retain the changes history. However, too many changes can be overwhelming, so you can apply [filters](../usage/filter.md) to ignore them. A filter is used for all captured differences, both element and metadata differences.

!!! tip
    Easily import some [provided filters](https://github.com/retest/recheck/tree/master/src/main/resources/filter) for your `recheck.ignore`, for example: `import: metadata.filter` to ignore some volatile metadata.

!!! note
    Filtering does not get rid of the differences, we still capture them. However, filtered difference do not cause tests to fail and will be ignored by the user interfaces.

## Maintaining Differences

!!! warning
    A Golden Master must be present to approve changes from a report. If the Golden Master cannot be found (as indicated by the user interface), please make sure that the report is within the same project root as the Golden Master.

Differences can be maintained in two ways. Please refer to the respective documentation for the user interface on how to do so.

1. *Accept*: The difference is expected or can be explained by changes done to the object under test. This will update the Golden Master with the new value(s).
2. *Ignore*: If the element or attribute is dynamic or you do not care about these differences, they can be ignored and will be saved in the projects `recheck.ignore`.
