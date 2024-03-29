import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import browserSync from 'browser-sync';
import config from '../config';

gulp.task('nodemon', () => {
  nodemon({
    script: './.bin/run.js',
    watch: ['./src', './config'],
    ext: 'js',
  })
    .on('restart', () => {
      setTimeout(() => {
        browserSync.reload({
          stream: false
        });
      }, config.browserSync.reloadDelay + 3000);
    });
});

gulp.task('serve', ['clean:tmp', 'nodemon'], () => {
  browserSync.init({
    proxy: `http://localhost:${config.port}`,
    port: config.browserSync.port,
    ui: {
      port: config.browserSync.ui_port,
    },
    reloadDelay: config.browserSync.reloadDelay,
    open: false,
    notify: config.browserSync.notify,
    scriptPath: config.browserSync.domain && function (path) {
      return `//${config.browserSync.domain}` + path;
    } ,
    socket: {
      domain: config.browserSync.domain
    }
  });
});
