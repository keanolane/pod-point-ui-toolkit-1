const gulp = require('gulp');
const config = require('../config');
const svgSprite	= require('gulp-svg-sprite');

// My Gulp config
var svgConfig = {
    shape : {
        dimension : { // Set maximum dimensions
            maxWidth : 32,
            maxHeight : 32
        }
    },
    mode : {
        symbol : true // Activate the «symbol» mode
    }
};

// The task itself
gulp.task('svgSprite', () => {
    return gulp.src(config.src.icons+'**/*.svg')
    .pipe(svgSprite(svgConfig))
    .pipe(gulp.dest(config.dist.svg));
});