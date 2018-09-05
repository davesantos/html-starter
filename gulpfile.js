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

const errorHandler = error => {
  console.error(String(error));
  this.emit('end');
  browserSync.notify('Error');
}

gulp.task('sass', () => {
  return gulp.src(paths.sass + '/**/*.{sass,scss}')
    .pipe(sass().on('error', errorHandler))
    .pipe(cleanCSS({
      debug: true,
      keepBreaks: true,
      keepSpecialComments: false
    }, details => {
      console.log(details.name + ': ' + details.stats.originalSize + ' -> ' + details.stats.minifiedSize);
    }) )
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('pug', () => {
  return gulp.src('./*.pug')
    .pipe(changed('.', {extension: '.html'}))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('indent', () => {

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

gulp.task('serve', gulp.series('sass', () =>  {

  browserSync.init({
    server: {
      baseDir: "./"
    },
    notify: false
  });

  gulp.watch(paths.sass + '/**/*.{sass,scss}', gulp.parallel('sass')).on('change', browserSync.reload );
  gulp.watch('./*.pug', gulp.parallel('pug')).on('change', browserSync.reload );
  gulp.watch(['./js/*']).on('change', browserSync.reload );

}));

gulp.task('travis', gulp.series(gulp.parallel('pug', 'indent', 'serve'), () =>  {
  return console.log('complete'), done();
}));

gulp.task('default', gulp.series('serve'));
