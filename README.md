# ember-cli-deploy-json-config

This plugin uses the environment variables to change a project's version number.
The purpose of this plugin is to incorporate the functionalities of npm version in the ember-cli-deploy pipeline.
For more information on npm version please refer to the [NPM Documentation][4].

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information please refer to the [Plugin Documentation][1].

## Quick Start

- Install this plugin

```bash
$ ember install ember-cli-deploy-version
```
**If you are running the command below in a git repo, it must be clean or the pipeline will abort**

- Run the pipeline

```bash
$ version=1.0.0 commitMessage="released version %s for reasons" ember deploy
```

## ember-cli-deploy Hooks Implemented

- `configure`
- `willDeploy`
- `upload`

These hooks are flexible. Feel free to make changes to this plugin's index.js if different hooks are preferred.
For detailed information on hooks are and how they work, please refer to the [Pipeline Documentation][5].

## Configuration Options

For detailed information on how configuration of plugins works, please refer to the [Plugin Documentation][1].

### version and commitMessage

Both version and commitMessage are environment variables set from the command line.
**Version is not optional, deploy pipeline will abort if it is not set.**


Example:

```bash
$ version=1.0.0 commitMessage="Updated to version %s for reasons" ember deploy
```

- Version can also be set to "from-git". If so it will try to read the most recent git tag and use it as the npm version.

- Other valid inputs for version include: patch, minor, major, prepatch, preminor, premajor, prerelease. This will increment the corresponding component of the semver string.

- If there is no commitMessage environment variable, there is a default message:  "Released %s"

- '%s' is a placeholder for the version number that the project has been changed to.

Example:

```bash
$ version=patch ember deploy
```

The above command will update version 1.0.0 to 1.0.1 with the default commit message "Released 1.0.1".

### commitTag

A boolean value. Set to true by default. *If you are in a git repo*, it will create a commit and tag for the new version. You can turn off this default behavior by setting it to false - however you must also set the pushTag configuration variable to false.

### pushTag

A boolean value. Set to true by default: this plugin will push to the new version (package.json and the tag) to the git repo.
To prevent this behavior and manually update the versions you can set the config variable to false:

```
ENV["version"] = {
      pushVersion: false
    }
```

#### Important notes about pushTag:

- if commitTag is not true, pushTag will be futile.
- pushTag will abort your ember deploy pipeline if you are not sshed into your git repo.


## Prerequisites

The following properties are expected to be present on the deployment `context` object:

- `distDir`                     (provided by [ember-cli-deploy-build][2])
- `project.root`                (provided by [ember-cli-deploy][3])


[1]: http://ember-cli-deploy.com/docs/v0.6.x/plugins-overview/ "Plugin Documentation"
[2]: https://github.com/ember-cli-deploy/ember-cli-deploy-build "ember-cli-deploy-build"
[3]: https://github.com/ember-cli/ember-cli-deploy "ember-cli-deploy"
[4]: https://github.com/ember-cli-deploy/ember-cli-deploy-gzip "NPM Documentation"
[5]: http://ember-cli-deploy.com/docs/v0.6.x/pipeline-overview/ "Pipeline Documentation"
