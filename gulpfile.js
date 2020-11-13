const fs = require("fs"),
  gulp = require("gulp"),
  postcss = require("gulp-postcss"),
  sourcemaps = require("gulp-sourcemaps"),
  browser = require("browser-sync"),
  rename = require("gulp-rename"),
  plumber = require("gulp-plumber"),
  cache = require("gulp-cached"),
  changed = require("gulp-changed"),
  uglify = require("gulp-uglify"),
  path = require("path"),
  cssmqpacker = require("css-mqpacker"),
  cssnano = require("cssnano"),
  discardComments = require("postcss-discard-comments"),
  postcssPresetEnv = require("postcss-preset-env"),
  cssimport = require("postcss-import"),
  pug = require("gulp-pug"),
  colorFunction = require("postcss-color-function"),
  postcssMixins = require("postcss-mixins");

// const gulpWebpack = require("gulp-webpack");
// const webpack = require("webpack");

var filePath = {
  base: "htdocs/",
  html: "htdocs/",
  css: "htdocs/assets/",
  js: "htdocs/",
  src: {
    css: ["src/css/**/*.css", "!src/css/**/_*.css"],
    watchcss: ["src/css/**/*.css", "src/css/**/*.css"],
    pug: ["src/pug/**/*.pug", "!src/pug/**/_*.pug"],
    watchpug: ["src/pug/**/*.pug"],
    js: ["src/js/**/*.js", "!src/js/**/_*.js"],
    watchjs: ["src/js/**/*.js", "src/js/**/*.js"]
  }
};

gulp.task("server", function() {
  browser({
    //open: 'external',
    port: 9015,
    server: {
      baseDir: filePath.base
    },
    startPath: "/",
    ghostMode: false
  });
});

var autoprefixerBrowsers = [
  "last 3 versions",
  "ie >= 10",
  "iOS >= 8",
  "Android >= 4"
];
// var autoprefixerBrowsers = ['last 3 versions', 'ie 8'];

var postcssPresetEnvOption = {
  importFrom: "src/css/_global_vars.css",
  stage: 0,
  browsers: autoprefixerBrowsers,
  preserve: false,
  autoprefixer: { grid: "autoplace" }
};

gulp.task("pcss", function() {
  return (
    gulp
      .src(filePath.src.css)
      .pipe(plumber())
      //.pipe(changed(filePath.css, {extension: '.css'}))
      .pipe(sourcemaps.init())
      .pipe(
        rename({
          extname: ".css"
        })
      )
      .pipe(
        postcss([
          cssimport(),
          postcssMixins(),
          postcssPresetEnv(postcssPresetEnvOption),
          colorFunction({
            preserveCustomProps: true
          }),
          cssmqpacker(),
          discardComments({
            removeAll: true
          })
        ])
      )
      .pipe(gulp.dest(filePath.css))
      .pipe(
        postcss([
          cssnano({
            zindex: false
          })
        ])
      )
      .pipe(
        rename({
          suffix: ".min"
        })
      )
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest(filePath.css))
  );
});

gulp.task("pcss-production", function() {
  return (
    gulp
      .src(filePath.src.css)
      .pipe(plumber())
      //.pipe(changed(filePath.css, {extension: '.css'}))
      .pipe(
        rename({
          extname: ".css"
        })
      )
      .pipe(
        postcss([
          cssimport(),
          postcssMixins(),
          postcssPresetEnv(postcssPresetEnvOption),
          colorFunction({
            preserveCustomProps: true
          }),
          cssmqpacker(),
          discardComments({
            removeAll: true
          })
        ])
      )
      .pipe(gulp.dest(filePath.css))
      .pipe(
        postcss([
          cssnano({
            zindex: false
          })
        ])
      )
      .pipe(
        rename({
          suffix: ".min"
        })
      )
      .pipe(gulp.dest(filePath.css))
  );
});


gulp.task("pug", function() {
  return gulp
    .src(filePath.src.pug)
    .pipe(plumber())
    .pipe(
      changed(filePath.html, {
        extension: ".html"
      })
    )
    .pipe(
      pug({
        pretty: true,
        basedir: "src/pug/"
      })
    )
    .pipe(gulp.dest(filePath.html));
});
gulp.task("pug-all", function() {
  return gulp
    .src(filePath.src.pug)
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true,
        basedir: "src/pug/"
      })
    )
    .pipe(gulp.dest(filePath.html));
});



gulp.task("watch", function() {
  gulp.watch(filePath.src.watchcss, gulp.task("pcss"));
  gulp.watch(filePath.src.watchpug, gulp.task("pug"));
});

gulp.task("default", gulp.parallel("server", "watch"));
