const gulp = require('gulp');
const config = require('../config');
const browserSync = require('browser-sync');

gulp.task('browser-sync', ['assembleHtml'], () => {
	return browserSync.init({
		server: {
			baseDir: config.dist.root
		}
	});
});