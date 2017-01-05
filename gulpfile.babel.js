/**
 * Created by Doma on 15/12/28.
 */

'use strict'

import gulp from 'gulp'
let browserSync = require('browser-sync').create();

// 引入组件
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import concat from 'gulp-concat' //文件合并
import uglify from 'gulp-uglify'
import notify from 'gulp-notify'
import plumber from 'gulp-plumber'
import babel from 'gulp-babel'

gulp.task('scss', () => {
   return gulp.src('src/scss/*.scss')
       .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
       .pipe(sass())
       .pipe(autoprefixer({
           browsers: ["Android 4.0", "iOS 7.0", "Chrome > 31", "ff > 31", "ie >= 8"],
           cascade:  true
       }))
       .pipe(gulp.dest('dist/css'))
       .pipe(browserSync.reload({stream: true}))
});

// 合并、压缩js文件
gulp.task('polyfill', () => {
    return gulp.src('src/js/polyfill/*.js')
        .pipe(concat('polyfill.js'))
        .pipe(gulp.dest('dist/js'));
});
gulp.task('js', () => {
    return gulp.src('src/js/*.js')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(babel())
        // .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('reload-js', ['js'], browserSync.reload)

gulp.task('default', ['scss', 'polyfill', 'js'], () => {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        open: false
    })

    gulp.watch('src/scss/*.scss', ['scss'])
    gulp.watch('src/js/*.js', ['reload-js']);
});