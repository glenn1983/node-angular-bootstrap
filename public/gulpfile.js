var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    mocha = require('gulp-mocha'),
    cover = require('gulp-coverage'),
    istanbul = require('gulp-istanbul');
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
        .pipe(mocha({reporter: 'spec'}))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});
gulp.task('default',['mocha']);