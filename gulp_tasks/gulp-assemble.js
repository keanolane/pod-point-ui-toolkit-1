const gulp = require('gulp');
const config = require('../config');
const assemble = require('assemble');
const extname = require('gulp-extname');
const renderFile = require('assemble-render-file');
const app = assemble();

app.option('layout', 'default');

gulp.task('load', (cb) => {
	app.partials(config.src.templates + 'partials/**/*.hbs');
	app.layouts(config.src.templates + 'layouts/*.hbs');
	app.pages(config.src.templates + 'pages/*.hbs');
	app.data([config.src.data + '*.json']);
	cb();
});

gulp.task('assembleHtml', ['load'], () => {
	return app.toStream('pages')
		.pipe(app.renderFile('html'))
		.pipe(extname())
		.pipe(app.dest(config.dist.root));
});