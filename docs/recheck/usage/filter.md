# Filter

In principal, ***recheck*** creates a difference for every change that occurred and writes it into the report. Then it is up to the UI (***review*** or ***recheck.cli***) to hide ignored differences. This is pretty much inline with how Git works&mdash;the diff is there, it just doesn't show up when ignored.

The advantages of this approach are as follows:

- It is inspection / revision save – every change is documented.
- *Hidden* changes (technical changes that are usually invisible to the user) are treated as any other change and are presented as such.
- You can change the rules of what to ignore and instantly see the impact.

### What Are Filters?

Filters can be used to reduce the noise mentioned above within a report. They can accept two different arguments:

1. **Element**: Filter based on the criteria of the element. This can be used to specify an element of interest or ignore an always changing element.
2. **Difference**: Filter based on the difference, with the element giving additional context information.

Multiple filters are additive. If one filter returns `true`, the result is taken and not further evaluated. Similarly, all filters must return `false` to ignore a particular difference.

!!! note
    The filter as such does not define what happens with the output. It just matches a element or a difference. Please note the context in which you use a filter and what the output is used for.

## Location

By default, filters are used as text files, so that they are reusable within different products and stages. The name of the file corresponds with the appropriate name used within ***recheck***. There are several locations where the filter files can be placed, so that they may be referenced within the [`RecheckOptions`](configuration.md).

### Plain Filters

1. Project filters in `${PROJECT_ROOT}/.retest/filter`.
2. User directory in `${USER_HOME}/.retest/filter`. *Must be created manually*.
3. Provided filters from ***recheck***. We [ship](https://github.com/retest/recheck/tree/master/src/main/resources/filter) some filters.

!!! tip
    You may overwrite filters by using the same name. They are searched top-down. That is, project filters overwrite user filters, which in turn overwrite the provided filters.

### Ignore Filters

Ignores are a special kind of filters which (by default) are loaded automatically. They define that `true` ignores (i.e. hides) the specified difference, while `false` continues to use it. Furthermore, they have specific names and may be placed in either of the following locations:

1. Globally: `${PROJECT_ROOT}/.retest/`. *Will be created on first run*.
2. For each Golden Master (i.e. suite). *Must be created manually*.

Using the default setup, that would be:

```
${PROJECT_ROOT}
+-- .retest/
|   +-- recheck.ignore (level 1)
+-- src/test/resources/retest/recheck/
    +-- ${SUITE_NAME}
        +-- recheck.ignore (level 2)
```

## Usage

Filters must be specified by name and given to the `RecheckOptions` as described [here](configuration.md). That is, to make them usable within different products such that no information is lost. So, if you configure a filter within `RecheckOptions` (see below), you may want to use the same filter within ***review*** too, that differences during test and review remain the same.

### RecheckOptions

```java
RecheckOptions.builder() 
    .addIgnore( "my-custom-filter.filter" ) 
    .build();
```

```text
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

This is a filter file which supports dynamic rules in JavaScript, using the [Oracle Nashorn JavaScript engine](https://en.wikipedia.org/wiki/Nashorn_(JavaScript_engine))[^1]. This allows users to specify ignore rules very flexibly by using the below method:

```ts
matches( element : Element, diff ?: AttributeDifference ) : bool;
```

??? info "Method description"
    Keep in mind that this method is only expressed in TypeScript syntax for better readability. We do not support TypeScript at the moment.

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

```text
# This is a comment. It is annotated with a '#' and encompass the full line

foo # Comment lines must start with a '#' and do not have leading whitespaces

# ^ You may define empty lines
```

### Expressions

A filter is built up using one or multiple expressions. They may be chained using a comma with a whitespace `, `. Note that the order of the expressions is important, which is lazily executed from left to right and stops once an expression does not match anymore.

We currently support these expressions (chained expresions are included ):

```text
$element
$attribute
$element, $attribute
```  

### Matching Elements

Elements are identified by one special attribute `$key`, so called *identifying attributes*. If you directly match an element with no additional exprssions (e.g. attributes), all of its child elements are ignored too.

```text
# Match the element where its attribute $key fully matches the $value
matcher: $key=$value
```

| `$key`     | `$value` (Example)       | Notes                                                                                  |
| ---------- | ------------------------ | -------------------------------------------------------------------------------------- |
| `xpath`    | `html[1]/body[1]/div[1]` | Note that this does only supports absolute XPaths.<br>*This is the default mechanism.* |
| `retestid` | `div-b4f23`              | A unique, stable ID for an element, that is generated by ***recheck***.                |
| `type`     | `button`                 |                                                                                        |
| `id`       | `myId`                   | Supplied by ***recheck-web***                                                          |

### Matching Attributes

You can filter specific attributes that occur in differences by their respective name.

!!! note
    An extension specifies which *attributes* (as well as *identifying attributes*) it creates for an element. Their name is displayed in the corresponding difference. Please refer to extensions' documentation for that information.

#### By Value

If you are searching for a specific name, you may define the `attribute` expression. The value specified must match fully in order to let the filter return `true`.

```text
# Match the attribute outline only on the elements of type input
matcher: type=input, attribute: outline

# Match the attribute outline on all elements, thus removing this difference completely
attribute=outline
```

#### By Regular Expression

Similarly, you can also use [Java's regex mechanism](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html) and ignore attributes by a given pattern.

```text
# Match the attribute border-.*-color (e.g. border-bottom-color) on the elements of type input
matcher: type=input, attribute-regex: border-.*-color

# Match the attribute border-.*-color (e.g. border-bottom-color) on all elements
attribute-regex=border-.*-color
```

### Ignore Pixel Differences

Minor visual differences (e.g. between different browser types or browser versions) can make traditional, pixel-based approaches fail, which means more manual maintenance effort. In ***recheck***, one can easily ignore pixel differences that are unimportant from a user's point of view:

```text
pixel-diff=5
pixel-diff=5.5
```

This would ignore every pixel difference (position- or size change) up to 5 pixels. You can either specify an integer or a float.

[^1]: We are aware that this will be removed from a future JDK release and will provide an alternative until then.
