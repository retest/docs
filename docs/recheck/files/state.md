# Golden Master

The `RecheckAdapter` which is provided by an [extension](../introduction/installation.md) is responsible for the conversion of the object to ***recheck***'s data model. The conversion process extracts all noteworthy attributes and its children, which are saved as *elements* into a *state*. A state may contain multiple elements, if the adapter decides to split up the object (e.g. if it is made of several parts). An example for recheck-web would be that a `WebDriver` may hold multiple open tabs and each tab would be converted into an element.

When checking via `Recheck#check`, a state is generated and (if present) compared with another state. If this state is not present, the checked state is assumed the Golden Master. The difference found between these states are saved into a [report](report.md).

### State vs Golden Master

The *Golden Master* is a special form of the state. While, technically, there is no difference, we distinguish between a state and a Golden Master to refer to the state of the object that has been approved by the tester (i.e. the state that is tested against). 

When doing a comparison the expected state refers to the Golden Master (which is saved on disk) and the actual state refers to the current version of the object under test (which is saved in RAM).

### Location

Per default, Golden Masters are located in `src/test/resources/retest/recheck/` and can be changed with some [configuration](../usage/configuration.md). Currently they are saved as a `${state-name}.recheck` folder with a XML file and metadata such as screenshots.

## Data

Additionally to all captured elements and their attributes, ***recheck*** captures some more data (i.e. [screenshots](#screenshots), [metadata](#metadata)) to make it easier for the user to identify and verify changes to the Golden Master.

### Elements & Attributes

An element is one of the key objects within a report. It is contains multiple attributes which represent its state and can be used for identification. Each attribute saved will contribute to the difference checking and it is up to the report processor to [filter](../usage/filter.md) unwanted attributes.

!!! tip
    The more attributes an element contains, the easier it is to solve the [element identification problem](../../recheck-web/element-identification-problem.md).

#### Optimizations

An extension can consider to do the following optimizations to save on disk space:

1. Prevent default values: Do not save attributes which are considered *default* as specified by the [`DefaultValueFinder`](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/ui/DefaultValueFinder.java). It is up to the extension to decide which attributes are considered *default* based on the object or element being tested. Usually, there is a list of global defaults and then each object (e.g. Browser) or element (e.g. Button) defines their own default attributes on top of that.
1. Use value inheritance (if supported by the underlaying technology): Consider not to save attributes which are inherited from the parent. For example, the font of a text is specified in the `<body>` element and therefore is not added to each text element (as long as it is equal to the parent). 

The extension must carefully choose the balance of default values and inheritance, as those systems cancel each other out. Taking the above example, a `<body>` element specifies a non-default font. However, a child element then reverts the font back to the default (thus overwriting the attribute of the parent). As a consequence, the extension then considers this value *default* and removes it, leaving inheritance to falsely inherit the `<body>` font.

Secondly, default values cannot be reverse engineered as there might be multiple default values for a specific attribute. Thus [filtering](../usage/filter.md) may be limited, if the filter needs to know the saved value (e.g. to calculate deltas).

#### Virtual Identifier

Elements can be identified with any attribute. However, since most attributes cannot be used as a unique identifier or because these attributes change regularly (e.g. random generated `id`), it proves to be difficult to identify an element without it breaking. 

To solve this, ***recheck*** generates a constant, virtual identifier, called `retestId`. This is a special attribute and is therefore not affected by the standard attribute algorithms (optimization, differences, maintenance), and can be considered *hidden*. As such, while a generator, initially, can take the elements' attributes into account, subsequent changes to these attributes will not change the persisted identifier within a Golden Master. Simply speaking, the identifier is only generated once and never modified to ensure that it stays the same for the same element.

!!! note
    The virtual identifier generation can be [configured](./../usage/configuration.md#options) via the `RecheckOptions`.

##### Generation

A virtual identifier is generated for each element within a state and must be unique within that state. This rule does not apply for different states or Golden Masters.

Generators are indeterministic and thus are allowed to return a different identifier for the same element. Specifically, this does neither guarantee that elements with the same identifier are equal, nor that the same element should expect the same identifier. This is especially the case if the virtual identifier is not tied to any attributes of the element (i.e. may be randomly generated).

#### Type

An element must have a type to identify the possible attributes it has. This usually corresponds to the same type of object (e.g. `<button>`) or respective sub-element (e.g. `text`).

#### XPath

The XPath describes the tree path within a Golden Master. However, depending on the extension and the object used to create the Golden Master, the XPath can also refer to the originally tested object (e.g. an element within a website).

!!! warning
    The XPath generated for the elements only partially supports the [XPath specification](https://www.w3.org/TR/xpath/all/) at the moment.

### Screenshots

The Golden Master may contain screenshots of the object under test. However, these are not required for comparison and are only created for debugging purposes. 

!!! tip
    Screenshots may slow down your test execution. An extension, which is responsible for capturing the screenshots, may allow to adapt (e.g. resolution) or disable screenshots to improve performance. For more details, please refer to the respective configuration page of the extension.

### Metadata

We capture some metadata that is related to the Golden Master, which is supposed to make it easier for you to identify how and where the Golden Master was created. Please note that the discovered metadata differences are not part of the final difference count. This metadata will not capture any sensitive data and is not analyzed but for strict difference reporting.

| Key            | Value (Example)                          |
| -------------- | ---------------------------------------- |
| `machine.name` | WORK_PC                                  |
| `os.arch`      | amd64                                    |
| `os.name`      | Windows 10                               |
| `os.version`   | 10.0                                     |
| `time.date`    | 2019-12-03                               |
| `time.time`    | 16:07:37.551                             |
| `time.offset`  | +01:00                                   |
| `time.zone`    | Europe/Berlin                            |
| `vcs.branch`   | master                                   |
| `vcs.commit`   | 617bc4f26995bedce222b6ca8181291f68fc91e0 |
| `vcs.name`     | git                                      |

Further metadata will follow over time.

Additionally, ***recheck-web*** captures the following metadata. Note, that it will overwrite the above metadata if the same keys are specified.

| Key               | Value (Example)   |
| ----------------- | ----------------- |
| `check.type`      | driver            |
| `browser.name`    | chrome            |
| `browser.version` | 78.0.3904.108     |
| `driver.type`     | UnbreakableDriver |
| `window.width`    | 1200              |
| `window.height`   | 800               |
| `os.name`         | XP                |
| `os.version`      | 10.0              |
