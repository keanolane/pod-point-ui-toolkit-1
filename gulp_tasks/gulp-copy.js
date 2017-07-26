const gulp = require('gulp');
const config = require('../config');
const gulpif = require('gulp-if');

gulp.task('copyMain', () => {
	gulp.src([
			config.src.root + '*.{ico,png,txt}',
		])
	.pipe(gulp.dest(config.dist.root));
});

gulp.task('copyImages', () => {
    gulp.src(config.src.img + '**/*.{png,gif,jpg,jpeg}')
        .pipe(gulp.dest(config.dist.img));
});

gulp.task('copyAll', ['copyMain', 'copyImages']);
