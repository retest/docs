This our wiki page for Google Summer of Code (GSoC) applicants. Please feel free to ask us question any time.

# Mentors

* [Jeremias Rößler](https://github.com/roesslerj)
* [Martin Vietz](https://github.com/martin-v)

# Ideas list

## Multiple language SDKs

_Proposal tag:_ `sdks`

Currently, recheck and recheck-web only offer a Java SDK. We want to provide multiple SDKs for major programming languages and integrate our solution(s) in various testing frameworks. In order to do so, it is necessary to come up with a concept, how we can reuse as much code as possible by, e.g., providing a cross-platform protocol other languages may use. (It is probably helpful to have a look at existing solutions that offer SDKs for multiple languages such as [Selenium](https://github.com/SeleniumHQ/selenium).)

Besides the concept itself, we would like to have another language prototypicaly being implemented to see how things work out. Here, we thought about Python or JavaScript with support a corresponding testing framework.

## Improved serialization

_Proposal tag:_ `serialization`

At the moment, some test artifacts are serialized via JAXB as XML and then stored within Git. Since XML is quite verbose, these files quickly become quite large. We also provide a ZIP persistence, but this doesn't integrate out of the box with Git.

We thought about an alternative, less verbose persistence formats such as JSON and a more memory-efficient object hierarchy for these files in order to improve the overall serialization performance and user experience.

## recheck-mobile

_Proposal tag:_ `mobile`

With recheck-web we already implemented recheck for a specific GUI technology, that is, web GUIs. We would like to see a prototypical implementation for mobile (preferably Android) to see how well our approach works here.

## Selenium IDE integration

_Proposal tag:_ `side`

The new [Selenium IDE](https://github.com/SeleniumHQ/selenium-ide) is here and already offers a great set of features. With its new plugin mechanism, it appears to be straightforward to implemented additional features on top of it.

We would like to create a plugin for a) integrating recheck-web checks as well as b) using recheck-based (e.g. retest ID) locators.

## Your own idea

_Proposal tag:_ `own`

Nothing you like? We are open for your own ideas, be it something based on [existing issues](https://github.com/retest/recheck/issues) or something entirely new.

# Application instructions

With the GSoC, we want to give you the opportunity to dig deep into the recheck universe and become part of our great team.

A single mentor will at most take care of two students. This way, we can ensure that you get the best support possible from your mentor. At the same time, we expect you to work independently and responsibly.

Convince us that you are the right candidate and change the way people think about software testing together with us.

In order to prepare for your internship, please note the following things.

## Remember the GSoC Timeline

Besides deadlines for your proposal and your evaluation, bear in mind that GSoC is about making a lasting contribution to an open source project. That is, you are supposed to code for almost 3 months (May 27 – August 26). Make sure you are able and willing to do this.

## Write a good proposal

Your proposal gives us the chance to get to know you. The more we know about you, the better we can assess if we can have a great time together this summer. Make sure that you at least provide the following information:

* What is your name?
* Where do you live (and in which time zone)?
* What are you studying?
* What did you do in the past?
* What is your experience when it comes to software testing?
* Have you ever contributed to an open source project?
* How can we contact you (e.g. mail)?
* Do you have twitter, a blog, or a website?
* Why recheck?
* Which task (please include the proposal tag) did you chose and why?
* What can we expect from you? What do expect from us?
* Which deliverables would you like to submit? What would be your schedule?

## Submit early and have a look at our comments

You are supposed to apply via https://summerofcode.withgoogle.com/ using your Google account. If you submit early, you have the opportunity to receive comments from your possible mentor, which allows you to update your proposal.

## Get familiar with our technologies

We mostly do Java, although a few projects may include other programming languages such as Python or JavaScript. We use Git on GitHub and we prefer pull requests and code reviews at an early stage of development. Other tools are, e.g., Maven and Travis. If you get familiar with this stack, contributing will be simple and easy.
