// var root_file = 'form';
var gulp = require('gulp');
var data = require('gulp-data');
var stylus = require('gulp-stylus');
var sass = require('node-sass');
var nib = require('nib');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var jade = require('gulp-jade');


//================================
// GET ONE .sass file and render 
//================================
gulp.task('styl', function () {
  return gulp.src('./source/stylesheets/main.scss')
    .pipe(sass({
    	  outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
    }))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('./dist/css/'));
});


//================================
//COMPILE JADE
//================================
gulp.task('templates', function() {
gulp.src('./source/layouts/*.jade')
    .pipe(jade({
        locals: {
        	title: 'Formidable' 
        },
        pretty: true
    }))
    .pipe(gulp.dest('./dist/'));
});

//===================================================
//FUNCTION ABOUT SEND ALL << LIB >> TO PUBLIC FILE
//===================================================
gulp.task('lib', function(){
    gulp.src('./source/lib/**/*')
        .pipe(gulp.dest('./dist/lib/'));
});

//===================================================
//FUNCTION ABOUT SEND ALL << IMAGES >> TO PUBLIC FILE
//===================================================
gulp.task('images', function(){
    gulp.src('./source/images/**/*')
        .pipe(gulp.dest('./dist/images/'));
});



//======================================================
//FUNCTION FOR COMPILE JS WITH ECS6
//======================================================

gulp.task('bundle', function() {
var bundle = browserify('./source/javascripts/main.js', {debug: true});
        bundle
            .transform(babel, { presets: [ 'es2015' ], plugins: [ 'syntax-async-functions', 'transform-regenerator' ] })
            .bundle()
            .on('error', function(err) { console.log(err); this.emit('end') })
            .pipe(source('main.js'))
            .pipe(rename('app.js'))
            .pipe(gulp.dest('./dist/js'));
    
});


//======================================================
//FUNCTION FOR WATCHING CHANGUE ON REAL TIME IN CONSOLE
//======================================================
gulp.task('watch', function (){
	gulp.watch('./source/stylesheets/**/*.scss', [stylus]);
	gulp.watch('./source/layouts/**/*.jade', [jade])
    gulp.watch('./source/javascripts/main.js', [browserify])
});

 
gulp.task('default', ['styl', 'templates', 'images', 'lib', 'watch']);
