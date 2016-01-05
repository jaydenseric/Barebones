/* eslint-env node */

var concat = require('gulp-concat'),
    cssnano = require('cssnano'),
    cssnext = require('postcss-cssnext'),
    gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

var globs = {
  js: [
    'polyfills/**/*.js',
    'library/**/*.js',
    'components/**/*.js',
    'app/**/*.js'
  ],
  css: [
    'polyfills/**/*.css',
    'library/**/*.css',
    'components/**/*.css'
  ]
};

gulp.task('js', function () {
  return gulp
    .src(globs.js)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('bundle'));
});

gulp.task('css', function () {
  return gulp
    .src(globs.css)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.css'))
    .pipe(postcss([
      cssnext({
        autoprefixer: {
          browsers: ['IE >= 9']
        }
      }),
      cssnano()
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('bundle'));
});

gulp.task('build', gulp.parallel('js', 'css'));

gulp.task('watch', function () {
  gulp.watch(globs.js, gulp.series('js'));
  gulp.watch(globs.css, gulp.series('css'));
});

gulp.task('default', gulp.series('build', 'watch'));
