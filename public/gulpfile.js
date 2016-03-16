var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    mocha = require('gulp-mocha'),
    cover = require('gulp-coverage');
var b_service = './js/service/';
gulp.task('service',function(){
    gulp.src(b_service+'*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('service.js'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('build'))
});
var lib = './js/Lib/';
gulp.task('other',function(){
    gulp.src([lib+'jquery.3.0-alpha.js',lib+'toastr.js'])
        .pipe(uglify())
        .pipe(concat('other.js'))
        .pipe(gulp.dest('build'))
});
gulp.task('mocha',function(){
    gulp.src(['./js/test.js'],{read : false})
        .pipe(cover.instrument({
            pattern: ['./js/test'],
            debugDirectory: 'debug'
        }))
        .pipe(mocha({reporter: 'spec'}))
        .pipe(cover.gather())
        .pipe(cover.format())
        .pipe(gulp.dest('mytest'));
});
gulp.task('default',['mocha']);