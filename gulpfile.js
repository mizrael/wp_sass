var gulp = require('gulp'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

var base_path = './wp-content/themes/twentysixteen-child',
    paths = {
        clean: base_path + '/style.css',
        input: base_path + '/sass/**/*.scss',
        output: base_path
    };

gulp.task('clean', function() {
    return gulp.src([paths.clean], { read: false })
        .pipe(clean());
});

gulp.task('sass', ['clean'], function() {
    var sassOptions = {};
    //var sassOptions = { outputStyle: 'compressed' };

    return gulp.src(paths.input)
        .pipe(sass(sassOptions))
        .pipe(gulp.dest(paths.output));
});

gulp.task('postprocess', ['sass'], function() {
    return gulp.src(paths.output).pipe(autoprefixer());
});

gulp.task('build', ['postprocess']);

gulp.task('watch', function() {
    return gulp.watch(paths.input, ['build'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('default', ['build', 'watch']);