var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');

gulp.task('webserver', function () {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      port:8008,
      open: true
    }));
});

gulp.task('sass', function () {
  gulp.src('./styles/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./styles'));
});