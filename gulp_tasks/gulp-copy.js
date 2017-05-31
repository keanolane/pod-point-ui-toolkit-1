const gulp = require('gulp');
const config = require('../config');
const gulpif = require('gulp-if');

gulp.task('copyMain', () => {
	gulp.src([
			config.src.root + '*.{ico,png,txt}',
		])
	.pipe(gulp.dest(config.dist.root));
});

gulp.task('copyJS', () => {
	gulp.src([
			config.src.jsData + '**/*.json',
		])
	.pipe(gulp.dest(config.dist.jsData));
	gulp.src([
			config.src.plugins + '**/**',
		])
	.pipe(gulp.dest(config.dist.plugins));
});

gulp.task('copyImages', () => {
	return gulp.src(config.src.contentImgs + '**/**')
	.pipe(gulp.dest(config.dist.contentImgs));
});

gulp.task('copyAll', ['copyMain', 'copyJS', 'copyImages']);
