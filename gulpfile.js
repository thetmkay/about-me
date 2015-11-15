//inspired by: https://gist.github.com/simenbrekken/9544303

var gulp = require('gulp'),
	gutil = require('gulp-util');	

gulp.task('scripts', function() {
	var browserify = require('gulp-browserify'),
		reactify = require('reactify'),
		rename = require('gulp-rename');

	return gulp.src('src/jsx/*.jsx').
			pipe(browserify({
				debug:true,
				extensions: ['.jsx','.js','.json'],
				transform: [reactify]
			})).
			on('error', function(err) {
				gutil.log(err.message);
			}).
			pipe(rename('rt.js')).
			pipe(gulp.dest('public/js'))
});

gulp.task('sass', function() {
	var compass = require('gulp-compass');

	return gulp.src('src/scss/index.scss').
			pipe(compass({
				config_file:'./config.rb',
				css:'public/css',
				sass:'src/scss'
			})).
			on('error', function(err){
				gutil.log(err.message);
			}).
			pipe(gulp.dest('./public/css'))
})

gulp.task('watch', function() {
	gulp.watch('src/scss/**',['sass']);
	gulp.watch('src/jsx/**',['js']);
});

gulp.task('development', function() {
	var nodemon = require('gulp-nodemon');

	nodemon({
		script:'server.js'
	});
});




gulp.task('build',['scripts','sass']);
gulp.task('default', ['build','watch', 'development']);
