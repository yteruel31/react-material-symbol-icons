# Contributing to react-material-symbol-icons

## Contribute workflow

* Decide what you want contribute
* After finalizing issue details work on code, please follow commit convention
* Submit a PR if everything is fine
* Get a code review and fix all issues noticed by maintainer
* Your PR is merged, you are awesome!

## How should I write my commits?

If you want that your changes appear in the changelog,
you need to follow [Conventional Commit messages](https://www.conventionalcommits.org/).

In this project, we use these prefixes:

**Patch version**

* `fix:` which represents bug fixes, correlates to a [SemVer](https://semver.org/)
  patch.
* Other prefixes that you can use:
    * `refactor:` any code related change that is not a fix nor a feature
    * `docs:` changing existing or creating new documentation (i.e. README, stories, docs for usage of a lib or cli
      usage)
    * `build:` all changes regarding the build of the software
    * `deps:` all changes regarding dependencies or the addition of new dependencies
    * `test:` all changes regarding tests (adding new tests or changing existing ones)
    * `chore:` all changes to the repository that do not fit into any of the above categories

**Minor version**

* `feat:` which represents a new feature, and correlates to a SemVer minor.
* `feat!:`, or `fix!:`, `refactor!:`, etc., which represent a breaking change
  (indicated by the `!`) and will result in a SemVer minor.

## Setup the project

The following steps will get you up and running to contribute to react-material-symbol-icons library:

1. Clone the repo

```sh
git clone https://github.com/yteruel31/react-material-symbol-icons.git
cd react-material-symbol-icons
```

2. Setup all the dependencies and packages by running `yarn install`. This command will install dependencies.

> If you run into any issues during this step, kindly reach out me @yteruel31

## Development

To improve our development process, we've set up tooling and systems.

### Tooling

* [yarn](https://yarnpkg.com/getting-started/install)
* [Storybook](https://storybook.js.org/)

### Commands

`yarn install`: bootstraps the entire project, symlinks all dependencies for cross-component development and builds all
components.

`yarn run storybook`: starts storybook server and loads stories in files that end with `.story.tsx`.

`yarn run generate:keys`: generate icon keys typed file from material-symbols package

## Deploy a new package version

For deploying a new package version, we use [Release-please](https://github.com/googleapis/release-please).

This library permit us to deploy and generate Changelog automatically.

It does so by parsing your
git history, looking for [Conventional Commit messages](https://www.conventionalcommits.org/),
and creating release PRs.

### Release PR

Rather than continuously releasing what's landed to `main` branch, release-please maintains Release PRs.

These Release PRs are kept up-to-date as additional work is merged. When you're
ready to tag a release, **simply merge the release PR**.

When the Release PR is merged, release-please takes the following steps:

1. Updates changelog file, along with other language specific files (for example `package.json`).
2. Tags the commit with the version number
3. Creates a GitHub Release based on the tag
