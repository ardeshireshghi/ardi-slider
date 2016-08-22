// grab our packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint');

// configure the jshint task
module.exports = function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
};
