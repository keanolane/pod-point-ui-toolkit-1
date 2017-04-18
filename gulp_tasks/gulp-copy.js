const gulp = require('gulp');
const config = require('../config');
const gulpif = require('gulp-if');

gulp.task('copyMain', () => {
	gulp.src([
			config.src.root + '*.{ico,png,txt}',
		])
	.pipe(gulp.dest(config.dist.root));
	gulp.src([
			config.src.fonts + '{,*/}*.*',
		])
	.pipe(gulp.dest(config.dist.fonts));
});

gulp.task('copyImages', () => {
	return gulp.src([
			config.src.img + '**/*.*',
		])
	.pipe(gulp.dest(config.dist.img));
});

gulp.task('copyAll', ['copyMain', 'copyImages']);