# ember-cli-deploy-json-config

> An ember-cli-deploy plugin that implements npm version to update your deployment version.


This plugin uses the environment variable "version" to easily change a project's version number.  This plugin allows user to incorporate all the functionalities of npm version with ember-cli-deploy. For more information on npm version please refer to the [NPM Documentation][4].

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][1].

## Quick Start

- Install this plugin

```bash
$ ember install ember-cli-deploy-version
```

- Run the pipeline

```bash
$ verion=1.0.0 commitMessage="release version %s for reasons" ember deploy
```

## Installation
Run the following command in your terminal:

```bash
ember install ember-cli-deploy-version
```

## ember-cli-deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please refer to the [Plugin Documentation][1].

- `configure`
- `willDeploy`
- `upload`

These hooks are flexible. Feel free to make changes to this plugin's index.js if different hooks are preferred.

## Configuration Options

For detailed information on how configuration of plugins works, please refer to the [Plugin Documentation][1].

### version and commitMessage

set the environment variables from the command line. *Version is not optional, deploy pipeline will abort if it is not set.*


Example:

```bash
$ version=1.0.0 commitMessage="Updated to version %s for reasons" ember deploy
```

- Version can also be set to "from-git". If so it will try to read the most recent git tag and use it as the npm version.

- Other valid inputs for version include: patch, minor, major, prepatch, preminor, premajor, prerelease. This will increment the corresponding component of the semver string.

- If there is no commitMessage environment variable, there is a default message:  "Release %s"

- '%s' is a placeholder for the version number that the project has been changed to.

Example:

```bash
$ version=patch ember deploy
```

The above command will update version 1.0.0 to 1.0.1 with the default commit message "Release 1.0.1".

### commitTag

A boolean value. Set to true by default: this plugin will make a version commit and git tag for the new npm version.

### pushTag

A boolean value. Set to true by default: this plugin will push to the git tag to the git repo.
To prevent this behavior and manually update the git tag you can set the config variable to false:

```
ENV["version"] = {
      pushVersion: false
    }
```

#### Notes about this config option:

- if commitTag is not true, pushTag will be futile. You must commit to push.
- pushTag will error out in your ember deploy pipeline if you are not sshed into your git repo.


## Prerequisites

The following properties are expected to be present on the deployment `context` object:

- `distDir`                     (provided by [ember-cli-deploy-build][2])
- `project.root`                (provided by [ember-cli-deploy][3])


[1]: http://ember-cli.github.io/ember-cli-deploy/plugins "Plugin Documentation"
[2]: https://github.com/ember-cli-deploy/ember-cli-deploy-build "ember-cli-deploy-build"
[3]: https://github.com/ember-cli/ember-cli-deploy "ember-cli-deploy"
[4]: https://github.com/ember-cli-deploy/ember-cli-deploy-gzip "NPM Documentation"
