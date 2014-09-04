var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');//TODO:add concat of all js files

var handlebars = require('gulp-handlebars');//required for handlebars
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');

var watch = require('gulp-watch');//TODO:figure how to add gulp watch


gulp.task('scripts', ['templates'],function(){
	gulp.src('src/*.js')
	.pipe(concat('all.min.js'))
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

gulp.task('build', ['templates', 'scripts']);