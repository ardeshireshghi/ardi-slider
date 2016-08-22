var gulp = require('gulp');
var karmaServer = require('karma').Server;

module.exports = function (done) {
  new karmaServer({
      configFile: __dirname + '/../../karma.conf.js',
      singleRun: true
  }, done).start();
};
