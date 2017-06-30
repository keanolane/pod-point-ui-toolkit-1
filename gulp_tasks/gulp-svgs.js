const gulp = require('gulp');
const config = require('../config');
const svgmin = require('gulp-svgmin');
const svgSprite	= require('gulp-svg-sprite');
const rename = require("gulp-rename");

// Spritesheet config
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

// Generate SVG Spritesheet from icons.
// Put spritesheet as an svg in dist/img and also create a hbs file and put in src/templates/partials
gulp.task('svg-sprite', () => {
    gulp.src(config.src.icons+'**/*.svg')
        .pipe(svgSprite(svgConfig))
        .pipe(gulp.dest(config.dist.img));

    gulp.src(config.dist.img + '/symbol/svg/sprite.symbol.svg')
        .pipe(rename(function (path) {
                path.basename = "spritesheet";
                path.extname = ".hbs"
            }))
        .pipe(gulp.dest(config.src.svgPartials));
});

// Minify svg images used for the toolkit
gulp.task('copy-svgs', () => {
    gulp.src(config.src.img + '**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest(config.dist.img));
});

gulp.task('svgs', ['svg-sprite', 'copy-svgs']);
