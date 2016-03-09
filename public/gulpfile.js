var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps');
var b_service = './js/service/';
gulp.task('service',function(){
    gulp.src(b_service+'*.js')
        .pipe(uglify())
        .pipe(sourcemaps.write('/'))
        .pipe(concat('service.js'))
        .pipe(gulp.dest('build'))
});
var lib = './js/Lib/';
gulp.task('other',function(){
    gulp.src([lib+'jquery.3.0-alpha.js',lib+'toastr.js'])
        .pipe(uglify())
        .pipe(concat('other.js'))
        .pipe(gulp.dest('build'))
})
gulp.task('default',['service','other']);