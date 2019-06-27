# Setup the recheck.ignore

recheck shows you all differences of all attributes. And it does so by comparing the attributes semantically, rather than comparing screenshots. This approach is similar to version control systems like [Git](https://git-scm.com). Without configuration, Git also shows you all differences, including log files, binaries and many other temporary files, which you typically don’t want to version control. Luckily, Git allows to easily ignore those differences using `.gitignore`.

recheck works in a very comparable manner. You can simply ignore all of those volatile and non-relevant differences. Conveniently, recheck created a `.retest` folder upon execution of the first recheck test case in the project root. In there you can find an example `recheck.ignore` file. To ignore all those volatile elements and make the given test pass, you simply need to edit this plain text file. Putting the following content into the file should e.g. make the [example test](explicit-checks.md) pass:

```
attribute=ping
attribute=jsdata
attribute-regex=data-.*
attribute=class
attribute=outline
attribute=transform
```

Note that Google is constantly changing its site, so you might need to add some more attributes. But as you can see, this is not difficult, and even wild-card ignore of attributes (using the [Java Pattern mechanism](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html)) is possible. The default `recheck.ignore` file contains examples on how to e.g. ignore whole sub-trees of the DOM or certain attributes of specific elements. More information can also be found in the [recheck documentation](https://retest.github.io/docs/recheck/how-ignore-works-in-recheck/). This mechanism is very powerful and e.g. allows you to ignore the font of a text, but not the text itself. The semantic ignore mechanism is one of the core features of recheck, and we will explore it in more depth later.

Depending on what you specify in the ignore file, different testing scenarios can be realized. The general mechanism of recheck allows you to perform functional testing, cross-browser and cross-device testing, as well as visual regression testing. For these testing purposes, be careful with what you ignore. For pure functional testing, many CSS attributes can easily be ignored.

The next step would be to utilize the generated report file and apply actual differences to [maintain the Golden Master](../../recheck.cli/tutorial/maintain-golden-master.md).
