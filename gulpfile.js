var gulp = require('gulp'),
	changed = require('gulp-changed'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
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

gulp.task('sass', function(){
	gulp.src(paths.sass + '/**/*.{sass,scss}')
		.pipe(sass().on('error', errorHandler))
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
	gulp.watch( paths.sass + '/**/*.{sass,scss}', ['sass']);
	gulp.watch('./*.jade', ['jade']);
	gulp.watch(['./js/*']).on('change', livereload.changed );
})

gulp.task('default', ['sass', 'watch']);

