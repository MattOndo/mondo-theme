"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");

// Concat & Minify JS
function scripts() {
	return gulp
		.src("./src/js/*.js")
		.pipe(plumber())
		.pipe(concat("./main.min.js"))
		.pipe(uglify())
		.pipe(
			gulp.dest("./js", {
				overwrite: true,
			})
		);
}

// Compile, Prefix, and Minify Styles
function styles() {
	return gulp
		.src("./src/scss/style.scss")
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: "compressed",
				sourceComments: true,
				sourceMap: true,
			}).on("error", sass.logError)
		)
		.pipe(autoprefixer())
		.pipe(sourcemaps.write("./maps"))
		.pipe(gulp.dest("./"));
}

// Watch & Run
function watcher() {
	gulp.watch("./src/js/*.js", gulp.series(scripts));
	gulp.watch("./src/scss/**/*.scss", gulp.series(styles));
}

// Gulp
exports.compile = gulp.series(styles, scripts);
exports.watch = watcher;
