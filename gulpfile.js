var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	changed = require('gulp-changed'),
 	pug = require('gulp-pug'),
	sass = require('gulp-sass'),
	prettify = require('gulp-prettify');

var paths = {
  sass: '_sass',
  css: 'css'
};

function errorHandler(error) {
	console.error(String(error));
	this.emit('end');
	browserSync.notify('Error');
}

gulp.task('sass', function(){
	gulp.src(paths.sass + '/**/*.{sass,scss}')
		.pipe(sass().on('error', errorHandler))
		.pipe(gulp.dest(paths.css))
		.pipe(browserSync.reload({stream:true}))
});

gulp.task('pug', function(){
	gulp.src('./*.pug')
		.pipe(changed('.', {extension: '.html'}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('.'));
		browserSync.reload();
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


gulp.task('serve', ['sass'], function() {

  browserSync.init({
	  server: {
      baseDir: "./"
    }
  });

	gulp.watch( paths.sass + '/**/*.{sass,scss}', ['sass']);
	gulp.watch('./*.pug', ['pug']);
	gulp.watch(['./js/*']).on('change', browserSync.reload );

})

gulp.task('default', ['serve']);

