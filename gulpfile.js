var gulp = require('./gulp')([
    'sass',
    'jshint',
    'minify-js',
    'watch',
    'test'
]);

gulp.task('build', ['jshint', 'minify-js', 'sass']);
gulp.task('default', ['build', 'watch']);
