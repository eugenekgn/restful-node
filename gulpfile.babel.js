'use strict';

import gulp from 'gulp';
import del from 'del';
import path from 'path';
import config from './gulpfile.config';
import gulpNewer from 'gulp-newer';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpBabel from 'gulp-babel';
import gulpNodemon from 'gulp-nodemon';
import runSequence from 'run-sequence';


gulp.task('copy', () =>
  gulp.src(config.configurationPaths)
    .pipe(gulpNewer(config.dist))
    .pipe(gulp.dest(config.dist))
);

gulp.task('clean', () =>
  del([config.distAll, config.coverageALL, '!' + config.dist, '!' + config.coverage])
);

/**
 * Transpile es6 to es5
 */
gulp.task('transpile', ()=> {
  gulp.src([...config.jsPaths, '!gulpfile.babel.js', '!gulpfile.config.js'], {
    base: '.'
  })
    .pipe(gulpNewer(config.distPath))
    .pipe(gulpSourcemaps.init())
    .pipe(gulpBabel())
    .pipe(gulpSourcemaps.write('.', {
      includeContent: false,
      sourceRoot(file) {
        return path.relative(file.path, __dirname);
      }
    }))
    .pipe(gulp.dest(config.distPath))
});

gulp.task('nodemon', ['copy', 'transpile'], () =>
  gulpNodemon({
    script: path.join(config.dist, 'app.js'),
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['copy', 'transpile']
  })
);

gulp.task('serve', ['clean'], () => runSequence('nodemon'));

gulp.task('default', ['clean'], () => {
  runSequence(
    ['copy', 'transpile']
  );
});
