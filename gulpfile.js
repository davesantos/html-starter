var gulp = require('gulp'),
	changed = require('gulp-changed'),
	compass = require('gulp-compass'),
	gutil = require('gulp-util'),
	jade = require('gulp-jade'),
	livereload = require('gulp-livereload'),
	prettify = require('gulp-prettify');

var paths = {
  sass: '_sass',
  css: 'css'
};

function errorHandler(error) {
	console.error(String(error));
	this.emit('end');
	gutil.beep();
}

// Compass compile and livereload
gulp.task('compass', function(){
	return gulp.src(paths.sass + '/*.{sass,scss}')
		.pipe(changed('css', {extension: '.css'}))
		.pipe(compass({
			config_file: 'config.rb',
			css: paths.css,
			sass: paths.sass, //Must not have .
			require: ['susy'] }))
		.on('error', errorHandler)
		.pipe(gulp.dest(paths.css))
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
	livereload.listen();
	gulp.watch( paths.sass + '/**/*.{sass,scss}', ['compass']);
	gulp.watch('./*.jade', ['jade']);
	gulp.watch(['./js/*']).on('change', livereload.changed );
})

gulp.task('default', ['compass', 'watch']);

