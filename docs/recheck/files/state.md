# Golden Master

The `RecheckAdapter` which is provided by an [extension](../introduction/installation.md) is responsible for the conversion of the object to ***recheck***'s data model. The conversion process extracts all noteworthy attributes and its children, which are saved as *elements* into a *state*. A state may contain multiple elements, if the adapter decides to split up the object (e.g. if it is made of several parts). An example for recheck-web would be that a `WebDriver` may hold multiple open tabs and each tab would be converted into an element.

When checking via `Recheck#check`, a state is generated and (if present) compared with another state. If this state is not present, the checked state is assumed the Golden Master. The difference found between these states are saved into a [report](report.md).

### State vs Golden Master

The *Golden Master* is a special form of the state. While, technically, there is no difference, we distinguish between a state and a Golden Master to refer to the state of the object that has been approved by the tester (i.e. the state that is tested against). 

When doing a comparison the expected state refers to the Golden Master (which is saved on disk) and the actual state refers to the current version of the object under test (which is saved in RAM).

### Location

Per default, Golden Masters are located in `src/test/resources/retest/recheck/` and can be changed with some [configuration](../usage/configuration.md). Currently they are saved as a `${state-name}.recheck` folder with a XML file and metadata such as screenshots.

## Data

In addition to the elements, we capture some more data to make it easier for the human to identify and verify changes to the Golden Master. Because of this, the data is entirely optional and may or may not be present. Moreover, if present, the data will always be updated upon applying to reflect the new Golden Master.

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
