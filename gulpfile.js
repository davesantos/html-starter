var gulp = require('gulp'),
	jade = require('gulp-jade')
	compass = require('gulp-compass')
	livereload = require('gulp-livereload')


function errorHandler(error) {
	console.error(String(error));
	this.emit('end');
}

// Compass compile and livereload
gulp.task('compass', function(){
	return gulp.src('./src/_sass/*.scss')
		.pipe(compass({
			config_file: 'config.rb',
			css: './src/css',
			sass: 'src/_sass', //Must not have .
			require: ['susy'] }))
		.on('error', errorHandler)
		.pipe(gulp.dest('./src/css'))
});

gulp.task('jade', function(){

})

gulp.task('default', ['compass']);

