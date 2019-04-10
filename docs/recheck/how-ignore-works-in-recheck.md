# How ignore works

## Ignore during diffing

In principal, we create a diff for everything that differs and put that into the result file. Then it is up to the UI (GUI or CLI) to hide ignored differences. This is pretty much inline with how Git works – the diff is there, it just doesn't show up when ignored.

The advantages of this approach are as follows:

- You can change the rules of what to ignore and instantly see the impact.
- It is inspection / revision save – every change is documented. This is a concern for a small amount of customers / users.
- "Hidden" changes (technical changes that are usually invisible to the user) are treated as any other change and are presented as such. This allows to use such technical differences also in the matching algorithm.
- It makes the diffing algorithm easier to implement.

## Ignore during matching

When creating a diff, recheck first matches every element of the Golden Master (expected) to every element of the current state (actual). Then the diff is created for those "matched" elements. This way, it doesn't matter if the order or placement changes.

But if there are irrelevant attributes that differ, they can confuse the matching algorithm. E.g. for many web pages, the ID attribute is a great identifier. But with some frameworks, the ID attribute is generated randomly.  When additional, "real" changes come on top, this can sometimes confuse the matching algorithm. So in those cases, you want to ignore the ID attribute during matching. However, these attributes are usually ignored globally. So for those cases, we have a simple [system property](https://docs.oracle.com/javase/tutorial/essential/environment/sysprop.html) that can be set: `de.retest.recheck.ignore.attributes` contains a list of _globally_ ignored attributes.

## Ignore differences by using the `recheck.ignore` file

We currently support three different mechanisms to ignore elements, attributes or differences. It's also possible to ignore a specific attribute for an element. If a parent element is being ignored, all child elements will be ignored as well.

When recheck runs for the first time, an empty `recheck.ignore` file is created in the project folder. This file can be edited in three different ways:

* By hand via your favorite editor
* With the [recheck.cli](https://github.com/retest/recheck.cli)
* With our GUI [review](https://retest.de/review/)

### Ignore by XPath (default)

During extraction of the golden master, we generate an [XPath](https://en.wikipedia.org/wiki/XPath) for each element in the website. A typical ignore with this methods looks like this:

```
matcher: xpath=HTML[1]/BODY[1]/DIV[3], attribute: outline
matcher: xpath=HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]
```

For the first line, the `div` element found under `HTML[1]/BODY[1]/DIV[3]` the `outline` attribute is being ignored. The second line ignores the `div` element in `HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]` and all child elements. If you want to ignore elements that appear and disappear, using XPath is also the recommended approach.

### Ignore by ID or tag type

It is also possible to ignore an HTML element by its `id` attribute or its `tag`:

```
matcher: id=title, attribute: font
matcher: id=banner
matcher: type=a
```

Please note that it is also possible to ignore a specific attribute of an element as shown in the first example where the `font` attribute of all `title` element is ignored. As with the first mechanism, one can also completely ignore an element with all it's children, which is shown in the second example.

### Ignore by retest ID

Also during creation of the golden master, we generate a stable id for all elements. We call this the `retestID` and it can also be used for ignoring:

```
matcher: retestid=div-b4f23, attribute: outline
matcher: retestid=a-d7728
```

There is nothing really special when compared to the previously shown mechanisms. All learnings still apply here.

### Ignore attributes globally

You can also ignore attributes globally:

```
attribute=class
```

This will ignore the `class` attribute for _all elements_. You can also use [Java's regex mechanism](https://docs.oracle.com/javase/10/docs/api/java/util/regex/Pattern.html) and ignore attributes by a given pattern:

```
matcher: type:input, attribute-regex: border-.*-color
attribute-regex= .*
```

E.g., this will ignore all border colors and _all attributes of all elements_ respectively. 
The latter can be sensible if you want to use the "unbreakable" mechanism of recheck, but without actually checking for diffs...

## Ignore differences using the `recheck.ignore.js` file

We also added a mechanism to specify "ignore rules" in JavaScript, using the [Oracle Nashorn JavaScript engine](https://en.wikipedia.org/wiki/Nashorn_(JavaScript_engine)). This allows users to specify ignore rules very flexibly, by implementing either of the following methods: 

```
shouldIgnoreElement(element) {}
shouldIgnoreAttributeDifference(element, diff) {}
```

As the name suggests, `shouldIgnoreElement` specifies whether an element and all its children should be ignored completely.

Using `shouldIgnoreAttributeDifference` allows to specify whether a given difference should be ignored. This gives the flexibility to e.g. ignore all pixel differences smaller than 5px, to ignore the domain in URLs or to ignore switching between equivalent font-families, like "Times New Roman" and "Times Roman". Implementations of these examples can be found in [recheck-web](https://github.com/retest/recheck-web/blob/master/.retest/recheck.ignore.js).
