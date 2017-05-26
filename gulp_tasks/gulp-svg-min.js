const gulp = require('gulp');
const config = require('../config');
const svgmin = require('gulp-svgmin');

gulp.task('svg-min', function () {
	return gulp.src(config.src.toolkitImgs + '**/*.svg')
		.pipe(svgmin())
		.pipe(gulp.dest(config.dist.toolkitImgs));
});
