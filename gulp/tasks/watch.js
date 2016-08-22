var gulp = require('gulp');

// configure which files to watch and what tasks to use on file changes
module.exports = function() {
  gulp.watch('./src/js/**/*', ['jshint', 'test', 'minify-js']);
  gulp.watch('./src/sass/**/*.scss', ['sass']);
};
