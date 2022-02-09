const { series } = require("gulp");
const gulp = require("gulp");
const imagesResize = require("gulp-image-resize");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

function resizeImages() {
	return gulp
		.src("original/*")
		.pipe(
			imagesResize({
				width: 2000,
				cover: true,
			})
		)
		.pipe(gulp.dest("optimized/"));
}

function imagesOptimize() {
	return gulp
		.src("original/*")
		.pipe(imagemin([imagemin.mozjpeg({ quality: 75 })]))
		.pipe(gulp.dest("optimized/"));
}

function imagesConverterWebp() {
	return gulp.src("optimized/*").pipe(webp()).pipe(gulp.dest("optimized"));
}

function img() {
	return gulp
		.src("original/*")
		.pipe(
			imagesResize({
				width: 2000,
				cover: true,
			})
		)
		.pipe(imagemin([imagemin.mozjpeg({ quality: 75 })]))
		.pipe(webp())
		.pipe(gulp.dest("optimized/"));
}

exports.resizeImages = resizeImages;
exports.imagesOptimize = imagesOptimize;
exports.imagesConverterWebp = imagesConverterWebp;
exports.img = img;
exports.default = series(resizeImages, imagesOptimize, imagesConverterWebp);
