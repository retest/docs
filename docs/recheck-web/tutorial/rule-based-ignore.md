# Rule-Based Ignore

[Here](setup-recheck.ignore.md) we introduced you to two simple ignore mechanisms, one that ignores differences based on identifying attributes like `xpath`, `tag`, `id` or `retestId`, and another that globally ignores irrelevant attributes like `jsdata` and `data-.*`.

Now we want to introduce a third mechanism that allows you to ignore differences based on rules implemented in code. As you may already have noticed, the generated `.retest` folder contains three files. One that is the already familiar `recheck.ignore`. Another one is named `recheck.ignore.js`, and as the name suggests, it is a JavaScript file. If you open it, you will find documentation that suggests implementing two (or only one) methods:

```
function matches(element) {}
function matches(element, diff) {}
```

These methods will be called both from the GUI as well as from the CLI, ignoring any differences to an element for which any of the two methods returns `true`. Now in the [example test case](explicit-checks.md) [executed on Travis](travis-execute-ci.md), we had our test executed in a CI environment. One of the differences that was reported was a `font` change between two equivalent `font types`. Other reported changes were minimal differences in `opacity` or `outline`. A third use case for rule-based ignore is if a `href` or `source` attribute differs due to different test systems and, thus, test URLs differ too. It is important to note that we now have all the power of a programming language to permanently ignore any change we like.
An example implementation to ignore equivalent classes of fonts could look like so:

```
var fontFamilies = [ [ "system-ui", "Arial" ], [ "-apple-system", "sans-serif" ] ];

function matches(element, diff) {
	if (diff.key == "font-family") {
		for (var i = 0; i < fontFamilies.length; i++) {
			if (contains(fontFamilies[i], diff.expected)) {
				return contains(fontFamilies[i], diff.actual);
			}
		}
	}
	return false;
}
```

Likewise, a simple implementation to ignore a difference in opacity that is less than, say 10, could look like so:

```
function matches(element, diff) {
	if (diff.key == "opacity") {
		return (Math.abs(diff.expected - diff.actual) <= 10);
	}
	return false;
}
```

And an implementation to ignore irrelevant differences in URL can be implemented like that:

```
var baseUrl = /http[s]?:\/\/[\w.:\d\-]*/;

function matches(element, diff) {
	if (diff.expected != null && diff.actual != null) {
		cleanExpected = diff.expected.replace(baseUrl, '');
		cleanActual = diff.actual.replace(baseUrl, '');
		return cleanExpected === cleanActual;
	}
	return false;
}
```

Of course, the three can easily be combined into a single script—a task which we will leave as an exercise for the reader.

After adjusting our `recheck.ignore.js` file as seen above and committing and pushing the changes to GitHub, our Travis build may has no or at least less differences. In order to make the build pass, there might be some more adjustments to do. The easiest way to get there is with [review](https://retest.de/review/) or [recheck.cli](https://github.com/retest/recheck.cli/).

