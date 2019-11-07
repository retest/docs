# Contributing

Thank you for taking interest in contributing to our repositories. You are invited to change or improve any part of the documentation or other open source products with features, bug fixes or issues. 

*Please check back regularly as we potentially make changes without notice.*

### Contributor License Agreement

We require all contributors who submit pull requests to have read and accepted the [CLA](https://github.com/retest/clabot-config/blob/master/Contributor-License-Agreement.md). To do so, please refer to our [clabot-config](https://github.com/retest/clabot-config). If you create a pull request and you have not yet agreed to the CLA, you will be asked to do so.

## Submission Guidelines

Before submitting an issue or pull request, please make sure that no similar issues or pull request have been exist are either open or have been closed. For that, simply perform a search with some keywords related to your problem and quickly go through the issues and pull requests.

If prompted, please try to stick to the issue or pull request template provided. This is to ensure descriptive issues, avoid duplicates and simplify the process on our side. However, please feel not forced to answer or provide every bit of detail. You are very welcome to ask a maintainer for help by submitting a work in progress issues or pull request. For the latter, please consider creating a draft pull request instead.

### Creating an Issue

We want to resolve all bugs as quickly as possible. To do that, however, we need to reproduce and confirm it. In order to reproduce bugs, we ask you to create a minimal reproduction scenario. Please stick to the given template.

Similarly, we want to understand your ideas and requested features. Therefore, please provide a clear and concise problem that you are trying to solve, ideally providing a solution. This solution does not have to be perfect and written in code; we are able to help and guide towards an optimal solution.

Unfortunately, we are unable to investigate/fix errors without a minimum reproduction scenario, so if we do hear back from you we might close the issue.

### Creating a Pull Request

You are invited to create a pull request. Please note that not all features will make it into the master. If you are unsure or want some help, please consider opening an issue before, so that your idea can be discussed before.

1. **Development**: Please fork the project and make the changes in a separate branch. We prefer the `feature/${branch-name}` model. Please try to add descriptive commit messages.
2. **Build**: Make sure that you can build your branch. We have integrated Travis to perform the build step; refer to the Travis [documentation](https://docs.travis-ci.com/) on how to get started.
3. **Pull Request**: Create a pull request for `retest/${repository}:master`. Several checks will run and your pull request will be built automatically; if there are any errors, please try to fix them or allow edits by maintainers. If we suggest changes, discuss or perform them, and lastly, rebase and push your branch.

Note that your pull request will be rebased automatically onto the master. If you see unexpected changes, you will either have to pull (with rebase) the changes or force push your changes.

After your pull request is merged, you can safely delete your branch and pull the changes from the main (upstream) repository.