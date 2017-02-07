const gulp = require('gulp');
const mocha = require('gulp-mocha');
let notifierReporter = require('mocha-notifier-reporter');

gulp.task('mocha', function () {
  return gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha({
      //reporter: 'list'
      reporter: notifierReporter.decorate('Spec')
    }));
});

gulp.task('watch', function () {
  gulp.watch(['algorithms/**/*.js', 'test/**/*.js', 'structures/**/*.js'], ['mocha']);
});
