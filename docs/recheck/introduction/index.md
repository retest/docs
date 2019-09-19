# Introduction

***recheck*** is an API which implements *Difference Testing* to check objects across multiple versions and collect differences.

It therefore defines a domain model specific to ***recheck*** so that it can do Difference Testing. That means, however, that there needs to be a conversion from the passed object to the domain model. While ***recheck***  itself cannot convert those objects, there is the possibility to use available extensions or expand recheck via own extensions as described under [installation](installation.md).

## Difference Testing

The idea of *Difference Testing* is derived from the idea of *Golden Master Testing* (a.k.a. [Characterization Testing](https://en.wikipedia.org/wiki/Characterization_test)). Based on these practices, it describes the complete state of the object under test, where the complete state is determined by the extension of a particular technology used. By observing said state, it essentially differs from the classical approach to software testing by removing the need for assertions and eliminating the use of specifications. That's because *observing* does not mean *verification*; Difference Testing accepts every output it encounters, saves it and compares upon re-execution.

Difference Testing is basically described with four steps:

1. Define a Golden Master based upon an evaluated version of the SUT.
2. Convert and save the SUT as a Golden Master by initially executing the test.
3. Compare to a newer version of the SUT by re-executing the test.
4. If a failure happens: Verify the encountered differences (by a human).

### Advantages

* There is no need to define individual assertions as the state is captured completely.
* Changed elements can still be found by identifying them with other attributes.
* Always changing elements can be ignored.
* The automation and collection of differences allows for a *One-Click-Maintenance*.

### Disadvantages

* Since an algorithm cannot decide the correctness of a change, human verification is necessary.
* Bugs can pass through multiple versions as long as no changes occur.
