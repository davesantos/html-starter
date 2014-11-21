var gulp = require('gulp'),
	changed = require('gulp-changed'),
	compass = require('gulp-compass'),
	gutil = require('gulp-util'),
	jade = require('gulp-jade'),
	livereload = require('gulp-livereload'),
	newer = require('gulp-newer'),
	prettify = require('gulp-prettify');

function errorHandler(error) {
	console.error(String(error));
	this.emit('end');
	gutil.beep();
}

// Compass compile and livereload
gulp.task('compass', function(){
	return gulp.src('./_sass/*')
		.pipe(changed('css', {extension: '.css'}))
		.pipe(compass({
			config_file: 'config.rb',
			css: './css',
			sass: '_sass', //Must not have .
			require: ['susy'] }))
		.on('error', errorHandler)
		.pipe(gulp.dest('./css'))
		.pipe(livereload());
});

gulp.task('jade', function(){
	gulp.src('./*.jade')
		.pipe(changed('.', {extension: '.html'}))
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('.'))
		.pipe(livereload());
	gutil.log(gutil.colors.green('jade reloaded'));
})

gulp.task('indent', function(){
	gulp.src('*.html')
		.pipe(prettify({
			indent_inner_html: true,
			indent_with_tabs: true,
			indent_char:"	",
			indent_size: 1,
			preserve_newlines: false
		}))
		.pipe(gulp.dest('.'));
});


gulp.task('watch', function(){
	// var server = livereload();
	livereload.listen();
	gulp.watch('./_sass/**/*', ['compass']);
	gulp.watch('./*.jade', ['jade']);
	gulp.watch(['./js/*']).on('change', livereload.changed );
})

gulp.task('default', ['compass', 'watch']);

