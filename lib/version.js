/*
Wrapper for version variable in index.js

*/
var fs = require("fs");
var run = require("./run");

//version, commitMessage
//versionCommit, pushVersion

function setVersion(versionNum, commitMessage) {
  return run("npm", ["version", versionNum, "-m", commitMessage]);
}

function setVersionNoCommit(versionNum) {
  return run("npm", ["--no-git-tag-version", "version", versionNum]);
}

function pushVersion() {
  return run("git", ["push", "--tags"]); //  "postversion": "git push --tags"
}

function pushCommit() {
  return run("git", ["push"]);
}
//should probably include documentation that I added the scripts into package.json
exports.setVersion = setVersion;
exports.pushVersion = pushVersion;
exports.setVersionNoCommit = setVersionNoCommit;
