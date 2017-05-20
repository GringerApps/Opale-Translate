var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('gulp-browserify');
var run = require('gulp-run');


const PLUGIN_FOLDER = 'i18n.sketchplugin/Contents/Sketch';
const DIST_FOLDER = `${PLUGIN_FOLDER}/build`;

gulp.task('test', function () {
    return run('npm test').exec();
});

gulp.task('build', ['test'], function() {
    gulp.src(`${PLUGIN_FOLDER}/plugin.js`)
      .pipe(browserify({ insertGlobals: false }))
      .pipe(gulp.dest(`${DIST_FOLDER}`));
});

gulp.task('watch', ['build'], function () {
    return watch([`${PLUGIN_FOLDER}/*.js`, 'spec/**/*.spec.js'], function () {
      gulp.start('build');
    });
});
