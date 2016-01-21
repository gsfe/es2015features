'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

let examples = ['basic_example.js', 'alias_example.js', 'default_example.js', 'complex_example.js'];

gulp.task('default', () => examples.map(file => browserify('./src/' + file)
	.transform('babelify', {presets: ['es2015']})
	.bundle()
	.pipe(source(file))
	.pipe(gulp.dest('dist'))));
