
const gulp = require('gulp');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');

const settings = {
    dist: 'dist', 
    styles: [ 
        // kube:
        'src/kube/src/_scss/_variables.scss',
        'src/kube/src/_scss/mixins/_breakpoints.scss',
        'src/kube/src/_scss/mixins/_fonts.scss',
        'src/kube/src/_scss/mixins/_flex.scss',
        // 'src/kube/src/_scss/mixins/_grid.scss',
        'src/kube/src/_scss/mixins/_utils.scss',
        'src/kube/src/_scss/mixins/_buttons.scss',
        'src/kube/src/_scss/mixins/_gradients.scss',
        'src/kube/src/_scss/mixins/_labels.scss',

        // flexbox-grid:
        'src/flexbox-grid.scss',
    ],
    scripts: [
        // kube:
        'src/_js/Core/Kube.js',
        'src/_js/Core/Kube.Plugin.js',
        'src/_js/Core/Kube.Animation.js',
        'src/_js/Core/Kube.Detect.js',
        'src/_js/Core/Kube.FormData.js',
        'src/_js/Core/Kube.Response.js',
        'src/_js/Core/Kube.Utils.js',
        'src/_js/Message/Kube.Message.js',
        'src/_js/Sticky/Kube.Sticky.js',
        'src/_js/Toggleme/Kube.Toggleme.js',
        'src/_js/Offcanvas/Kube.Offcanvas.js',
        'src/_js/Collapse/Kube.Collapse.js',
        'src/_js/Dropdown/Kube.Dropdown.js',
        'src/_js/Tabs/Kube.Tabs.js',
        'src/_js/Modal/Kube.Modal.js',
    ],
}

// JAVASCRIPT: concat together, compile es2015, minify
gulp.task('scripts', function() {
    return gulp.src( settings.scripts ) 
        .pipe(concat( 'app.js' )) 
        .pipe(babel()) 
        .pipe(gulp.dest( settings.dist )) 
        .pipe(rename( 'app.min.js' ))
        .pipe(uglify())
        .pipe(gulp.dest( settings.dist ));
});

// CSS/SASS: compile scss to css, autoprefix, minify
gulp.task('sass', function () {
    return gulp.src( settings.styles ) 
        .pipe(concat( 'kube-flexbox.scss' ))
        .pipe(gulp.dest( settings.dist ))

        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ 
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename('kube-flexbox.css')) 
        .pipe(gulp.dest( settings.dist )) 
        .pipe(rename('kube-flexbox.min.css'))
        .pipe(minify({compatibility: 'ie8'})) 
        .pipe(gulp.dest( settings.dist ));
});

// WATCH FOR CHANGES
gulp.task('watch', function() {
    gulp.watch( settings.scripts, ['scripts']);
    gulp.watch( settings.styles, ['sass']);
});

gulp.task('default', ['sass', 'scripts', 'watch']);