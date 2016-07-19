'use strict';

var DeployPluginBase = require('ember-cli-deploy-plugin');
var path = require('path');
var fs = require('fs');
var version = require('./lib/version');

module.exports = {
  name: 'ember-cli-deploy-version',

  createDeployPlugin: function(options) {
    //extending the base plugin that provides some nice functionalities like logging
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,
      /*
      Default configuration is the name. The name is (so far) the project's version number
      as found in package.json concatenated with a git commit hash
      */
      defaultConfig:{
        versionNum: process.env.version,
        commitMessage:process.env.commitMessage,
        versionCommit: true,
        pushVersion: true
      },
      config: function(context){
        ['versionCommit','pushVersion'].forEach(this.applyDefaultConfigProperty.bind(this));
      },
      //end of configs

      willDeploy:function(context){
        /*reading config variables*/
        var versionNum = this.readConfig("versionNum");
        var commitMessage = this.readConfig('commitMessage');
        var versionCommit = this.readConfig('versionCommit');
        if(versionNum){
          if(versionCommit){
            if(commitMessage){ // if there is a custom commit message
              return version.setVersion(versionNum, commitMessage);
            }
            else{
              this.log("committing with default msg");
              return version.setVersion(versionNum, "Release %s");
            }
          }
          //end of if(versionCommit)
          else{
            this.log("NOTICE: Changing version without committing",{ color: 'yellow' })
            return version.setVersionNoCommit(versionNum);
          }
          this.log('calling npm version with the following param:' +versionNum);
        }
        //end of if(versionNUm)
        else{
          throw "ERROR: Please set version variable. Example: $ version= 1.0.0 ember deploy ";
        }
      },

      upload:function(context){
        var doPush = this.readConfig("pushVersion");
        if(doPush){
          this.log("pushing tag");
          return version.pushVersion();
        }
        else{
          this.log("GIT TAG is NOT pushed - make sure to manually check and update the tags so that they are consistent.", { color: 'yellow' });
        }
      }

      //FINISHED npm versioning

    });
    return new DeployPlugin();
  }
};
