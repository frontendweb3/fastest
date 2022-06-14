var gulp = require('gulp');
var cssnano = require('gulp-cssnano'); 
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify');

const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');



gulp.task('css', function(){    
    return gulp.src(['assets/css/editor.css','assets/css/tailwind.css'])  
    .pipe(sourcemaps.init())
		.pipe(autoprefixer())           
        .pipe(cssnano())       
		.pipe(concat('build.css'))
		.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/build/css')); 
});


gulp.task('main', function(){    
    return gulp.src('assets/js/style.js') 
    .pipe(sourcemaps.init())          
        .pipe(concat('main.js'))       
        .pipe(uglify())    
        .pipe(sourcemaps.write('.'))   
        .pipe(gulp.dest('assets/build/js')); 
});

gulp.task('search', function(){    
    return gulp.src('assets/js/search.js') 
    .pipe(sourcemaps.init())          
        .pipe(concat('search.js'))       
        .pipe(uglify())    
        .pipe(sourcemaps.write('.'))   
        .pipe(gulp.dest('assets/build/js')); 
});
