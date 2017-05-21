const gulp = require('gulp');
const watch = require('gulp-watch');
const browserify = require('gulp-browserify');
const run = require('gulp-run');
const babel = require('gulp-babel');

const PLUGIN_FOLDER = 'i18n.sketchplugin/Contents/Sketch';
const DIST_FOLDER = `${PLUGIN_FOLDER}/build`;

gulp.task('test', () => run('npm test').exec());

gulp.task('build', ['test'], () =>
  gulp.src(`${PLUGIN_FOLDER}/plugin.js`)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(browserify({ insertGlobals: false }))
    .pipe(gulp.dest(`${DIST_FOLDER}`))
);

gulp.task('watch', ['build'],  () =>
  watch([`${PLUGIN_FOLDER}/*.js`, 'spec/**/*.js'], () => gulp.start('build'))
);
