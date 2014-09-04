var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');//TODO:add concat of all js files

var handlebars = require('gulp-handlebars');//required for handlebars
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var watch = require('gulp-watch');//TODO:figure how to add gulp watch
var sass        = require('gulp-sass');

// use default task to launch BrowserSync and watch JS files
gulp.task('default', ['browser-sync'], function () {

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("src/*.js", ['scripts', browserSync.reload]);
     gulp.watch("src/templates/*.hbs", ['templates', browserSync.reload]);
       gulp.watch("*.scss", ['sass', browserSync.reload]);
});

// Static server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('scripts', ['templates'],function(){
	gulp.src('src/*.js')
  .pipe(concat('all.min.js'))
    .pipe(browserify())
	.pipe(uglify())
	.pipe(gulp.dest('dist/js/'));
});

gulp.task('templates', function(){
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

gulp.task('build', ['templates', 'scripts', 'sass']);


 gulp.task('watch', ['connect', 'serve'], function () {
     gulp.watch([
         'src/templates/*.hbs',
        'src/*.js'
     ]).on('change', function (file) {
         server.changed(file.path);
     });

     gulp.watch('*.scss');
    gulp.watch('app/templates/**/*.hbs', ['templates']);

 });


 gulp.task('sass', function () {
    gulp.src('*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});