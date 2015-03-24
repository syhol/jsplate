var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var config = require('config');
var reload = browserSync.reload;
var browserSyncActive = false;
var paths = {
	scriptMain : './src/app.js',
	scripts : './src/**/*.js',
	views : './src/**/*.html'
};

gulp.task('default', ['build', 'browser-sync'], function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.views, ['views']);
});

gulp.task('browser-sync', function() {
	browserSync({
		server: './build'
	});
	browserSyncActive = true;
});

gulp.task('views', function () {
	gulp.src('src/index.html')
		.pipe(gulp.dest('build'));
});

gulp.task('scripts', function () {

	var handelErrors = function(error) {
		console.log(error.message);
		this.emit('end');
	};

	var stream = browserify(paths.scriptMain, {debug: true})
		.transform(babelify)
		.bundle()
		.on('error', handelErrors)
	    .pipe(source('app.js'))
		.pipe(gulp.dest('build'))

	if (browserSyncActive) {
		stream.pipe(reload({stream: true}));
	}

	return stream;
});


gulp.task('build', ['scripts', 'views']);

