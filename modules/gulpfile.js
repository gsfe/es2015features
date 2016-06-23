'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync').create();

gulp.task('html', () => {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('server', ['babelify', 'html'], () => {
	return browserSync.init({
		server: {
			baseDir: './dist',
			directory: true
		}
	});
});

gulp.task('babelify', () => {
	let examples = ['basic_example.js', 'alias_example.js', 'default_example.js', 'complex_example.js', 'every_example.js'];

	return examples.map(file => {
		browserify('./src/' + file)
			.transform('babelify', {presets: ['es2015']})
			.bundle()
			.pipe(source(file))
			.pipe(gulp.dest('dist'))
			.pipe(browserSync.reload({stream:true}));
	});
});

gulp.task('watch', () => {
	gulp.watch('src/**/*.js', ['babelify']);
});

gulp.task('default', ['server', 'watch']);
