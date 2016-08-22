var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

var jsDestFile = 'slider.min.js';

// configure which files to watch and what tasks to use on file changes
module.exports = function() {
  gulp.src('./src/js/**/*')
    .pipe(uglify())
    .pipe(rename(jsDestFile))
    .pipe(gulp.dest('dist/js'));
};
