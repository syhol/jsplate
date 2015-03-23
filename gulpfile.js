var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var through2 = require('through2');
var browserSync = require('browser-sync');
var config = require('config');
var reload = browserSync.reload;
var browserSyncActive = false;
var paths = {
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

	var babelifyIt = through2.obj(function (file, enc, next){
		browserify({
				entries : file.path,
				debug: true 
			})
			.transform(babelify)
			.bundle(function(err, res){
				// assumes file.contents is a Buffer
				if (err) {
					console.log(err.message);
					this.end();
				} else {			
					file.contents = res;
				}
				next(null, file);
			});
	});

	var stream = gulp.src('./src/app.js')
		.pipe(babelifyIt)
		.pipe(gulp.dest('build'))

	if (browserSyncActive) {
		stream.pipe(reload({stream: true}));
	}

	return stream;
});


gulp.task('build', ['scripts', 'views']);

