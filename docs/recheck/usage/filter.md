# Filter

In principle, ***recheck*** creates a difference for every change that occurred and writes it into the report. Then it is up to the UI (***review*** or ***recheck.cli***) to hide ignored differences. This is pretty much in line with how Git works&mdash;the diff is there, it just doesn't show up when ignored.

The advantages of this approach are as follows:

- It is inspection / revision safe – every change is documented.
- *Hidden* changes (technical changes that are usually invisible to the user) are treated as any other change and are presented as such.
- You can change the rules of what to ignore and instantly see the impact.

### What Are Filters?

Filters can be used for different purposes, most notably to reduce the noise mentioned above within a [report](../files/report.md).

They can accept different arguments, which all are accessible using the below [syntax](#syntax):

1. **Element**: Filter applies to _all attributes_ of an element and all of its child elements. This may look at specific attributes, children or parent element to determine if the filter applies. The element in question can be identified by a wide range of identifying attributes, which are specified by the [extensions](../introduction/installation).
2. **Attribute**: Filter applies to a single attribute, either globally or for a specific element and all of its child elements.
3. **Difference**: Filter applies to a difference where the attribute and the value can be retrieved.

Multiple filters are additive. If one filter returns `true`, the result is taken and not further evaluated. Similarly, all filters must return `false` to ignore a particular difference.

!!! note
    The filter as such does not define what happens with the output. It just matches a element or a difference. Please note the context in which you use a filter and what the output is used for.

## Location

By default, filters are simple text files, so that they are reusable within different products and stages. The name of the file corresponds with the appropriate name used within ***recheck***. There are several locations where the filter files can be placed, so that they may be referenced within the [`RecheckOptions`](configuration.md).

### Plain Filters

1. Project filters in `${PROJECT_ROOT}/.retest/filter`.
2. User directory in `${USER_HOME}/.retest/filter`. *Must be created manually*.
3. Provided filters from ***recheck***. We [ship](https://github.com/retest/recheck/tree/master/src/main/resources/filter) some categorized filters. 
 
!!! Note
    We are currently experimenting with sensible defaults and may change the provided filters without notice. If you feel that they filter too much or too less within their respective category, please let us know, so that we can change these.

!!! tip
    You may overwrite filters by using the same name. They are searched top-down. That is, project filters overwrite user filters, which in turn overwrite the provided filters. This allows you to easily overwrite the provided filters so that you can add your customizations.

### Ignore Filters

An ignore filter `recheck.ignore` is a special kind of filter which (by default) is loaded automatically. It defines that `true` ignores (i.e. hides) the specified difference, while `false` continues to use it. In contrast to plain filters, multiple ignore filters do not overwrite each other, despite having the same name. Rather, they are additive and each location contributes to the final ignore filter used by recheck. The following locations are searched:

1. Globally: `${USER_HOME}/.retest/`. *Must be created manually*.
2. For each Project: `${PROJECT_ROOT}/.retest/`. *Will be created on first execution*.
3. For each Golden Master individually (i.e. suite). *Must be created manually*.

After using ***recheck.cli*** or ***review*** to update the ignore filter, only the ignore file for the project will be updated to additionally contain the new ignored differences and all ignores from the global and suite ignore file.

Using the default setup, that would be:

```
${USER_HOME}
+-- .retest/
    +-- recheck.ignore
    
${PROJECT_ROOT}
+-- .retest/
|   +-- recheck.ignore
+-- src/test/resources/retest/recheck/
    +-- ${SUITE_NAME}
        +-- recheck.ignore
```

## Usage

Filters must be specified by name and given to the `RecheckOptions` as described [here](configuration.md). That is, to make them usable within different products such that no information is lost. So, if you configure a filter within `RecheckOptions` (see below), you may want to use the same filter within ***review*** too, such that differences during test and review remain the same.

### RecheckOptions

```java
RecheckOptions.builder() 
    .addIgnore( "my-custom-filter.filter" ) 
    .build();
```

```properties
# my-custom-filter.filter

# Define your rules here:
matcher: id=foo
```

If you do not specify an ignore like above, `Recheck` will load the default ignore files.

### Ignore

#### recheck.ignore

This is a filter file which supports rules with the syntax below. They are normal text files and can be opened by any text editor.

This file will be updated through the UI (***review*** or ***recheck.cli***) if you ignore any elements or differences. We try our best keep your custom-defined rules and respect the existing formatting.

#### recheck.ignore.js

This is a filter file which supports dynamic rules in JavaScript, using [Mozilla's Rhino engine](https://github.com/mozilla/rhino/). This allows users to specify ignore rules very flexibly by using the following method:

```js
matches( element, diff );
```

??? info "Method description"
    **Arguments**:

    - `element` [(`Element`)](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/ui/descriptors/Element.java): The element on which the difference occurred.  
    - `diff` [(`AttributeDifference`)](https://github.com/retest/recheck/blob/master/src/main/java/de/retest/recheck/ui/diff/IdentifyingAttributesDifference.java): The difference, may be null.

    **Returns**:

    - `bool`: Whether the difference should be ignored.

    **Example**:

    An implementation can be found at [recheck-web](https://github.com/retest/recheck-web/blob/master/.retest/recheck.ignore.js).

## Syntax

You may define filters in a file with the `.filter` extension that is located in one of the two locations above. Since filters are additive, evaluated top to bottom, each line represents a separate filter. Thus, a file may represent a group of filters that can be combined to one topic (e.g. color differences).

!!! warning
    If a filter (i.e. line) does not represent a valid syntax or comment, an error will be logged and the line is ignored.

### Comments

```properties
# This is a comment. It starts with a '#' and encompasses the full line

foo # Comment lines must start with a '#' and do not have leading whitespaces

# ^ You may define empty lines
```

### Expressions

Each line represents a filter, which itself can be made up by one or more expressions. Those expressions are separated with a comma and a whitespace `, `.

#### Scope

Each expression applies to a specific scope. By default, a global scope is assumed (i.e. the [`report`](../files/report.md) or [`state`](../files/state.md)) to which the resulting filter is applied. By chaining multiple expression within a single line, the following expression acts only upon the scope of the previous expression, while the last expression ultimately decides which final scope the filter applies.

A filter executes its expressions lazily (left to right) and aborts as soon as the scope is empty. Consequently, it will only match, if the last scope analyzed is not empty. Thus, an expression is only evaluated, if the applying scope is not empty

##### State

Consider the element structure as represented by the [state](../files/state.md#data): A collection of elements, where each element contains attributes which are assigned to values. For that the following scopes can be defined:

1. State (i.e. collection of elements): *This is the global scope*.
2. Element: Select an element, e.g. type `button`.
3. Attribute: Select an attribute, e.g. `background-color`.
4. Value: Select the value, e.g. `rgb(125, 125, 125)`.

In words: The above example selects all `button` elements with the attribute `background-color=rgb(125, 125, 125)`.

##### Report

Although the structure of a [report](../files/report.md#structure) is quite different, ultimately, the scope is fairly similar to the scope of a state.

1. Report (i.e. collection of element differences): *This is the global scope*.
2. Element: Select an element, e.g. type `button`. *The element difference is not exposed directly*.
3. Attribute Difference: Select an attribute, e.g. `background-color`, 
4. Value: Depending on the filter, this will select either the *expected* or *actual* value, e.g. `rgb(125, 125, 125)`.

In words: The above example selects all `button` elements with the attribute difference `background-color: actual=rgb(125, 125, 125)`.

!!! tip
    When chaining multiple expressions, scopes may be omitted. For example, omitting the element scope for the above example would result in a selection of *all* elements with the respective background color.

#### Examples

We currently support these individual expressions. Please refer to the more in detail descriptions below:

```properties
# Import filters
$import

# Match any element
$element
# Match any attribute
$attribute
# Match any value
$value

# Match inserted changes (for elements)
$inserted
# Match deleted changes (for elements)
$deleted

# Match some pixel fluctuations (for attributes)
$pixel-diff
# Match some pixel fluctuations (for attributes)
$color-diff
```

You may chain them in the following way for elements:
```properties
# Match an attribute for a specific element
$element, $attribute
# Match a specific value of an elements' attribute
$element, $attribute, $value
# Match some pixel fluctuations for an elements' attribute
$element, $attribute, $pixel-diff
# Match some color fluctuations for an elements' attribute
$element, $attribute, $color-diff
# Match a specific value for all attributes of an element
$element, $value
# Match some pixel fluctuations for all attributes of an element
$element, $pixel-diff
# Match the element only if it is inserted
$element, $inserted
# Match the element only if it is removed
$element, $deleted
```

You may chain them in the following way for attributes:
```properties
# Match a specific value of an attribute for all elements
$attribute, $value
# Match some pixel fluctuation of an attribute for all elements
$attribute, $pixel-diff
# Match some color fluctuation of an attribute for all elements
$attribute, $color-diff
```  

!!! tip
    By combining element, attribute and value matching, you are able to match certain differences very specifically.

### Matching Elements

Elements are identified by one special attribute `$key`, so called *identifying attributes*. 

```properties
# Match the element and its children where its attribute $key fully matches the $value.
matcher: $key=$value
```
This attribute can be any HTML attribute of the element. Fairly typical examples are given below, but it can really be any attribute. This is especially helpful if you define your own non-standard attributes, by which you want to identify the elements to ignore. 

| `$key`     | `$value` (Example)                   | Description                                                                                                 |
| ---------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `retestid` | `div-b4f23`                          | A unique, stable ID for an element, that is generated by ***recheck***.<br>*This is the default mechanism.* |
| `xpath`    | `html[1]/body[1]/div[1]`             | Note that this does only supports absolute XPaths.                                                          |
| `id`       | `myId`                               | HTML `id` attribute (supplied by ***recheck-web***)                                                         |
| `class`    | `my-class` or `my-class other-class` | HTML `class` attribute (supplied by ***recheck-web***)                                                      |
| `type`     | `button`                             | HTML tag name (supplied by ***recheck-web***)[^1]                                                           |

#### Matching inserted or deleted elements

If you are not interested in inserted or deleted elements, but still want to get notified if the attributes of the specified elements change, you can ignore those changes. This is useful for lists similar where you do not care if an element is inserted, but do care if the font or color changes.

```properties
# Globally ignore insertions or deletions
change=inserted
change=deleted

# Ignore only insertions deletions within the element
matcher: $key=$value, change=inserted
matcher: $key=$value, change=deleted
```

### Matching Attributes

You can filter specific attributes that occur in differences by their respective name.

!!! note
    An extension specifies which *attributes* (as well as *identifying attributes*) it creates for an element. Their name is displayed in the corresponding difference. Please refer to extensions' documentation for that information.

#### By Attribute

If you are searching for a specific attribute, you may define the `attribute` expression. The value specified must match fully in order to let the filter return `true`.

```properties
# Match the attribute outline only on the elements of type input
matcher: type=input, attribute=outline

# Match the attribute outline on all elements, thus removing this difference completely
attribute=outline
```

#### By Regular Expression

Similarly, you can also use [Java's regex mechanism](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html) and ignore attributes by a given pattern.

```properties
# Match the attribute border-.*-color (e.g. border-bottom-color) on the elements of type input
matcher: type=input, attribute-regex=border-.*-color

# Match the attribute border-.*-color (e.g. border-bottom-color) on all elements
attribute-regex=border-.*-color
```

### Matching Values

If you want to ignore a specific value while still being notified about any other changes, you can specify a `value-regex`. This is helpful if you want to ensure that the value has a specific patter (e.g. date format) but do not care about the concrete value (because it is changing each day).

```properties
# Match all attributes that look like a date format (dd.MM.yyyy)
value-regex=\d\d.\d\d.\d\d\d\d
```

### Matching Pixel Differences

Minor visual differences (e.g. between different browser types or browser versions) can make traditional, pixel-based approaches fail, which means more manual maintenance effort. In ***recheck***, one can easily ignore pixel differences that are unimportant from a user's point of view:

```properties
pixel-diff=5px
pixel-diff=5.5px
```

This would ignore every pixel difference (position- or size change) up to 5 pixels. You can either specify an integer or a float.

### Matching Color Differences

Similarly to the pixel differences, it is possible to ignore small color differences. This is most useful to ignore small differences for color animations.

```properties
color-diff=5%
```

Each color component (red, green, blue) is reviews in isolation. Changing only the red component from `255` to `127` would result in a color difference of 50%.

### Importing Filters

To avoid having huge filter or ignore files and to avoid redundancy, you can create smaller, specialized filters which you can import.

The import is specified by the filter name (i.e. the file name), which will look at the global scope of all filters to find the most specific one. For example using the below example, will search all available [locations](#location) for the file name and choose the most specific filter to load. This way, the importing filter will always pick up any changes made to the imported filter. 

```properties
# Import other filters based on the name
import: content.filter
```
!!! warning
    Be careful not to use cyclic imports where `a.filter` imports `b.filter` and vice versa (same goes for longer cyclic chains).
    
    Secondly, only import filters from the same or a broader scope (e.g. filters within the user home should only import filters present in the user home or provided locations). If need be, you can always overwrite these filters within the project directory and the importing filter will use the project filter if available.

[^1]: While the HTML tag name is mapped to `type` and part of the identifying attributes, the actual HTML `type` is put into the ordinary attributes that define an element's state.
