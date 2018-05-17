// Project data
var destpaths = {
	css: './css',
	webfonts: './webfonts',
	images: './images',
	icons: './icons'
};

// Variables and requirements
const gulp = require('gulp');
const rename = require('gulp-rename');

const less = require('gulp-less');
const path = require('path');

const postcss = require('gulp-postcss');
const zindex = require('postcss-zindex');
const autoprefixer = require('gulp-autoprefixer');
const focus = require('postcss-focus');
const nocomments = require('postcss-discard-comments');
const nano = require('gulp-cssnano');
const jmq = require('gulp-join-media-queries');
const stylefmt = require('gulp-stylefmt');

// compilation and postproduction of LESS to CSS
gulp.task('css', function () {
	var processors = [
		nocomments, // discard comments
		focus, // add focus to hover-states
		zindex // reduce z-index values
	];

	return gulp.src('ignite.less')
	.pipe(less({
		paths: [ path.join(__dirname, 'less', 'includes') ]
	})) // compile less to css
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	})) // add vendor prefixes
	.pipe(postcss(processors)) // clean up css
	.pipe(jmq({
		log: true
	}))
	.pipe(stylefmt()) // syntax formatting
	.pipe(rename('style.css'))
	.pipe(gulp.dest(destpaths.css)) // save cleaned version
	.pipe(nano()) // minify css
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest(destpaths.css)); // save minified version
});

gulp.task('watch', function () {
	gulp.watch(['./*/*.less','ignite.less'], ['css']);
});

gulp.task('default', ['css']);
