"use strict";

import gulp from 'gulp';
import browserSync from 'browser-sync';
import changed from 'gulp-changed';
import cleanCSS from 'gulp-clean-css';
import sass from 'gulp-sass';
import pug from 'gulp-pug';
import prettify from 'gulp-prettify';
import del from 'del';

const paths = {
  dest: 'dist',
  source: 'src',
  sass: 'src/_sass',
  css: 'dist/css'
};

const configFiles = [
  'CNAME',
  '.surgeignore',
  'src/js/*'
]


const errorHandler = error => {
  console.error(String(error));
  this.emit('end');
  browserSync.notify('Error');
}


gulp.task('sass', () => {
  return gulp.src(paths.sass + '/**/*.{sass,scss}')
    .pipe(sass({
       includePaths: ['node_modules']
    }).on('error', errorHandler))
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
  return gulp.src(paths.source + '/**/*.pug')
    .pipe(changed('.', {extension: '.html'}))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('indent', () => {
  return gulp.src(paths.dest + '/**/*.html')
    .pipe(prettify({
      indent_inner_html: true,
      indent_with_tabs: true,
      indent_char:" ",
      indent_size: 1,
      preserve_newlines: false
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('js', () => {
  return gulp.src(configFiles, { allowEmpty: true })
  .pipe(gulp.dest(paths.dest));
});

gulp.task('clean', done => {
  del(['dist']);
  done();
});

gulp.task('build', gulp.series(gulp.parallel('pug', 'sass','js')));

gulp.task('serve', gulp.series(gulp.parallel('sass', 'pug', 'js'), () =>  {
  browserSync.init({
    server: {
      baseDir: paths.dest
    },
    notify: false,
    open: false
  });

  gulp.watch(paths.sass + '/**/*.{sass,scss}', gulp.parallel('sass')).on('change', browserSync.reload );
  gulp.watch(paths.source + '/**/*.pug', gulp.parallel('pug')).on('change', browserSync.reload );
  gulp.watch(paths.source + '/js/*').on('change', browserSync.reload );
}));

gulp.task('travis', gulp.series(gulp.parallel('pug', 'indent', 'serve'), () =>  {
  return console.log('complete'), done();
}));

gulp.task('default', gulp.series('serve'));
