var concat = require('gulp-concat')
var cssnano = require('cssnano')
var cssnext = require('postcss-cssnext')
var gulp = require('gulp')
var postcss = require('gulp-postcss')
var reporter = require('postcss-reporter')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')

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
}

function handle (error) {
  console.error(error.toString())
  this.emit('end')
}

gulp.task('js', function () {
  return gulp
    .src(globs.js)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(uglify({ mangle: false }))
    .on('error', handle)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('bundle'))
})

gulp.task('css', function () {
  return gulp
    .src(globs.css)
    .pipe(sourcemaps.init())
    .pipe(postcss([
      cssnext(),
      cssnano(),
      reporter({ clearMessages: true })
    ]))
    .on('error', handle)
    .pipe(concat('bundle.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('bundle'))
})

gulp.task('build', gulp.parallel('js', 'css'))

gulp.task('watch', function () {
  gulp.watch(globs.js, gulp.registry().get('js'))
  gulp.watch(globs.css, gulp.registry().get('css'))
})

gulp.task('default', gulp.series('build', 'watch'))
