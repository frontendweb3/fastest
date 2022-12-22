var gulp = require('gulp');
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify');

const sourcemaps = require('gulp-sourcemaps');

gulp.task('main', function(){    
    return gulp.src('assets/js/style.js') 
    .pipe(sourcemaps.init())          
        .pipe(concat('main.js'))       
        .pipe(uglify())    
        .pipe(sourcemaps.write('.'))   
        .pipe(gulp.dest('assets/build/js')); 
});

