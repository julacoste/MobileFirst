var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var prefix = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();


gulp.task('dev', function() {
	return gulp.src('less/style.less')
	.pipe(less())
	.pipe(gulp.dest('css'))
});

gulp.task('styles', function() {
	return gulp.src('less/*.less')
    // return gulp.src('less/*.less')
	.pipe(less())
	.pipe(cleanCSS())
	.pipe(prefix("> 1%", "last 2 versions"," Firefox ESR"," Opera 12.1"))
	.pipe(rename({
      suffix: '.min'
    }))
	.pipe(gulp.dest('css'))
});

gulp.task('script', function (cb) {
	return gulp.src(['js/*.js', '!js/*.min.js'])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('js'));
});

gulp.task('img:prod', function() {
  return gulp.src('image/*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('image/imgmin'));
});

// gulp.task('img:dev', function() {
//   return gulp.src('image/*')
//     .pipe(gulp.dest('image/imgmin'));
// });

gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      https: true
      },
  });

  gulp.watch('less/**/*.less', ['styles']);
  gulp.watch('css/*.css').on('change', browserSync.reload);
  gulp.watch('js/*.js', ['script']);


});


gulp.task('img', ['img:prod'], function() {
});
gulp.task('default', ['styles', 'script', 'watch'], function() {
});