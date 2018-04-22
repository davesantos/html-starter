var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	changed = require('gulp-changed'),
	cleanCSS = require('gulp-clean-css'),
	sass = require('gulp-sass'),
 	pug = require('gulp-pug'),
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
		.pipe(sass({
	    includePaths: ['node_modules/susy/sass']
	    }).on('error', errorHandler))
		.pipe( cleanCSS({
		  debug: true,
		  keepBreaks: true,
		  keepSpecialComments: false
		}, function(details) {
		  console.log(details.name + ': ' + details.stats.originalSize + ' => ' + details.stats.minifiedSize);
		}) )
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

