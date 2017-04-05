const gulp = require('gulp');
const config = require('../config');
const rimraf = require('rimraf');;

gulp.task('clean', (cb) => {
	return rimraf(config.dist.root, cb);
});