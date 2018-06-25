const gulp = require('gulp');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');

const settings = {
    dest: 'dist', 
}

const files = {
    scripts: [ 

    ],
    styles: [
        'src/flexbox-grid/dist/flexboxgrid.css',
        'src/kube/src/kube.scss',
    ],
}

// JavaScript: concat files together, compile es2015 to es5, minify
gulp.task('scripts', function() {
    return gulp.src( files.scripts )
        .pipe(concat( 'app.js' ))
        .pipe(babel())
        .pipe(gulp.dest( settings.dest ))
        .pipe(rename( 'app.min.js' ))
        .pipe(uglify())
        .pipe(gulp.dest( settings.dest ));
});


// CSS/SASS: compile scss to css, autoprefix, minify
gulp.task('sass', function () {
    return gulp.src( files.styles ) 
        .pipe(sass().on('error', sass.logError))

        .pipe(concat( 'kube-flexbox.scss' )) 
        .pipe(gulp.dest( settings.dest ))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename('kube-flexbox.css'))
        .pipe(gulp.dest( settings.dest ))
        .pipe(rename('kube-flexbox.min.css'))
        .pipe(minify({compatibility: 'ie8'}))
        .pipe(gulp.dest( settings.dest ));
});


gulp.task('watch', function() {
    gulp.watch( files.scripts, ['scripts']);
    gulp.watch( files.styles, ['sass']);
});


gulp.task('default', ['sass', 'scripts', 'watch']);