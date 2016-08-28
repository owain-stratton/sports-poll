'use strict';
var gulp          = require('gulp'),
    browserify    = require('browserify'),
    source        = require('vinyl-source-stream'),
    maps          = require('gulp-sourcemaps'),
    uglify        = require('gulp-uglify'),
    rename        = require('gulp-rename'),
    sass          = require('gulp-sass');

var packageJson    = require('./package.json');
var dependencies   = Object.keys(packageJson && packageJson.dependencies || {});

// TASKS
// browserify compile vendor scripts
gulp.task('vendors', function() {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(gulp.dest(__dirname + '/src/scripts/libs'))
});

// browserify compile app scripts
gulp.task('app', function() {
  return browserify('src/app/app.js')
    .external(dependencies)
    .bundle()
    .pipe(source('app.bundle.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest(__dirname + '/src/scripts'))
});

// compile css from sass
gulp.task('compileSass', function() {
  return gulp.src('src/styles/scss/app.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest(__dirname + '/src/styles/css'))
});

// watch files for changes
gulp.task('watch', function() {
  gulp.watch('package.json', ['vendors']);
  gulp.watch('src/app/**', ['app']);
  gulp.watch('src/styles/scss/*.scss', ['compileSass']);
});

// minify js scripts

// minify compiled css

// build dist folder for completion

gulp.task('serve', ['watch', 'compileSass', 'app', 'vendors']);
