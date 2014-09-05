var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat'); //TODO:add concat of all js files
var handlebars = require('gulp-handlebars');
var declare = require('gulp-declare');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var cssMin = require('gulp-css');

gulp.task('cssMinify', function () {
  return gulp.src('src/*.css')
    .pipe(cssMin())
    .pipe(gulp.dest('dist/css/'));
});

// Static server
gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('build', ['templates', 'scripts', 'sass']);

gulp.task('sass', function () {
  gulp.src('*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', ['templates'], function () {
  gulp.src('src/*.js')
    .pipe(concat('all.min.js'))
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});


gulp.task('templates', function () {
  gulp.src('src/templates/*.hbs')
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'FizzBuzz.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dist/js/'));
});
// use default task to launch BrowserSync and watch JS files
gulp.task('default', ['browser-sync'], function () {

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch("src/*.js", ['scripts', reload]);
  gulp.watch("src/templates/*.hbs", ['templates', reload]);
  gulp.watch("*.scss", ['sass', reload]);
  gulp.watch("src/*.css", ['cssMinify', reload]);
});
