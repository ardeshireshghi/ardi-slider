var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require("gulp-rename");

var stylesheetsSourcePath = './src/sass';
var stylesheetsDestFile = 'slider.min.css';

module.exports = function () {
  return gulp.src(stylesheetsSourcePath.concat('/main.scss'))
    .pipe(sass({
      includePaths: [
      	stylesheetsSourcePath
      ],
      sourcemap: true
    }))
    .on('error', function(err){
    	console.error('Error during building stylesheets', err);
    })
    .pipe(minifyCss())
    .pipe(rename(stylesheetsDestFile))
    .pipe(gulp.dest('./dist/css'))

};
