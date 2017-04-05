const fs = require('fs');
const gulp = require('gulp');
const config = require('../config');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const modernizr = require('modernizr');

const modernizrConfig = {
	"options": [
		"setClasses"
	],
	"feature-detects": [
		"touchevents"
	]
}

gulp.task('buildModernizr', (done) => {
	modernizr.build(modernizrConfig, (code) => {
		fs.writeFile(config.src.js + 'vendor/modernizr-build.js', code, done);
	});
});

gulp.task('uglifyModernizr', ['buildModernizr'], () => {
	return gulp.src(config.src.js + 'vendor/modernizr-build.js')
		.pipe(concat('modernizr.js'))
		.pipe(uglify())
		.pipe(gulp.dest(config.dist.js));
});

gulp.task('modernizr', ['uglifyModernizr']);