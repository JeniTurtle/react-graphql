// @see: https://github.com/gulpjs/gulp/tree/4.0

const gulp = require('gulp')
const changed = require('gulp-changed')
const watch = require('gulp-watch')

const DIST_DIR = 'dist'
const STATIC_FILES = 'static/**/*'

const copyAntD = () => {
  const dist = 'static/jouryu/antd'

  return gulp
    .src('node_modules/antd/dist/*')
    .pipe(changed(dist))
    .pipe(gulp.dest(dist))
}

const copyStatic = () =>
  gulp.src('static/**').pipe(gulp.dest(`${DIST_DIR}/static`))

const watchStatic = () => {

  watch(STATIC_FILES, {
    ignoreInitial: false,
    verbose: true
  })
  .pipe(gulp.dest(`${DIST_DIR}/static`))
}

const copy = gulp.series(copyAntD, gulp.parallel(copyStatic))

gulp.task('watch', watchStatic)

gulp.task('copy', copy)

