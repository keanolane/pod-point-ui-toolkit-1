const gulp = require('gulp');
const config = require('../config');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const gulpif = require('gulp-if');
const rimraf = require('rimraf');

const fontName = 'icons';

gulp.task('complileIconfont', () => {
	return gulp.src([config.src.icons + '**/*.svg'])
		.pipe(iconfontCss({
			path:  config.src.icons + 'template.scss',
			fontName: fontName,
			targetPath: '../../../temp/_icons.scss',
			fontPath: '../fonts/',
			cssClass: 'iconfont'
		}))
		.pipe(iconfont({
			fontName: fontName,
			formats: ['svg', 'ttf', 'eot', 'woff'],
			normalize: true
		 }))
		.pipe(gulp.dest(config.dist.fonts));
});

// The icon.scss was not copying into the src folder, so this is a workaround.
// Feel free to get rid if you can fix it.
gulp.task('copyIconsScss', ['complileIconfont'], () => {
	return gulp.src('./temp/_icons.scss')
	.pipe(gulp.dest(config.src.scss + 'includes/'))
});
gulp.task('deleteTemp', ['copyIconsScss'], (cb) => {
	rimraf('./temp', cb);
});
gulp.task('iconfont', ['deleteTemp']);