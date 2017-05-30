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

// Minify svg images used for the toolkit.
// Put svgs in dist/img and also create a hbs files and put in src/templates/partials
gulp.task('toolkit-svgs', () => {
    gulp.src(config.src.toolkitImgs + '**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest(config.dist.toolkitImgs));

    gulp.src(config.src.toolkitImgs + '**/*.svg')
        .pipe(svgmin())
        .pipe(rename(function (path) {
                path.extname = ".hbs"
            }))
        .pipe(gulp.dest(config.src.svgPartials));
});


gulp.task('svgs', ['svg-sprite', 'toolkit-svgs']);
