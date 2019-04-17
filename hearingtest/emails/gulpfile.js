var gulp = require('gulp');
var EmailBuilder = require('gulp-email-builder');
var browserSync = require('browser-sync').create();
var mail = require('gulp-mail');

var options = { encodeSpecialChars: true }
var builder = EmailBuilder(options);

var paths = {
  html: './*.html'
};

var smtpInfo = {
  auth: {
    user: '767fe3d76445f0',
    pass: '9799ca274d0330'
  },
  host: 'mailtrap.io',
  port: 2525
}

gulp.task('mail', function() {
  return gulp.src('./templates/lead.html')
    .pipe(mail({
      subject: 'Test Email',
      to: [
        'freshbrewedweb@gmail.com'
      ],
      from: 'Audicus <info@audicus.com>',
      smtp: smtpInfo
    }))
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('emailBuilder', function() {
  return gulp.src(['./*.html'])
    .pipe(builder.build())
    .pipe(gulp.dest('./templates/'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['emailBuilder'], function() {

    browserSync.init({
        server: "./templates/"
    });
    gulp.watch(paths.html, ['emailBuilder']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
