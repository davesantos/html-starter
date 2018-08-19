"use strict";

const gulp = require('gulp');
const browserSync = require('browser-sync');
const changed = require('gulp-changed');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const prettify = require('gulp-prettify');

const paths = {
  sass: '_sass',
  css: 'css'
};

function errorHandler(error) {
  console.error(String(error));
  this.emit('end');
  browserSync.notify('Error');
}

gulp.task('sass', function(){
  return gulp.src(paths.sass + '/**/*.{sass,scss}')
    .pipe(sass().on('error', errorHandler))
    .pipe(cleanCSS({
      debug: true,
      keepBreaks: true,
      keepSpecialComments: false
    }, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize + ' -> ' + details.stats.minifiedSize);
    }) )
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('pug', function(){
  return gulp.src('./*.pug')
    .pipe(changed('.', {extension: '.html'}))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('indent', function(){

  return gulp.src('*.html')
    .pipe(prettify({
      indent_inner_html: true,
      indent_with_tabs: true,
      indent_char:" ",
      indent_size: 1,
      preserve_newlines: false
    }))
    .pipe(gulp.dest('.'));

});

gulp.task('serve', gulp.series('sass', function() {

  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(paths.sass + '/**/*.{sass,scss}', gulp.parallel('sass')).on('change', browserSync.reload );
  gulp.watch('./*.pug', gulp.parallel('pug')).on('change', browserSync.reload );
  gulp.watch(['./js/*']).on('change', browserSync.reload );

}));

gulp.task('travis', gulp.series(gulp.parallel('pug', 'indent', 'serve'), function() {
  return console.log('complete');
}));

gulp.task('default', gulp.series('serve'));
