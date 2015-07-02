//------------------------------------------------ Paths config

var paths = {
	templates	: 'templates/',
	icons		: 'icons/',
	fonts		: 'fonts/',
	scss		: 'scss/',
	css			: 'css/'
};

//------------------------------------------------ Resources

var	gulp				= require('gulp'),
	autoprefixer		= require('gulp-autoprefixer'),
	sass				= require('gulp-sass'),
	svg2ttf				= require('gulp-svg2ttf'),
	svgicons2svgfont	= require('gulp-svgicons2svgfont'),
	tap					= require('gulp-tap'),
	template			= require('gulp-template'),
	ttf2woff			= require('gulp-ttf2woff');

//------------------------------------------------ Tasks

//------------------------ Font icons

gulp.task('icons', function() {
	gulp.src([paths.icons + '*.svg'])
		.pipe(svgicons2svgfont({
			fontName	: 'icons-400-normal',
			normalize	: true,
			fontHeight	: 1000,
			log			: function() {} // Silence
		}))
		.on('glyphs', function(glyphs) {
			gulp.src(paths.templates + '_icons.scss')
				.pipe(template({ glyphs: glyphs }))
				.pipe(gulp.dest(paths.scss));
		})
		.pipe(svg2ttf())
		.pipe(gulp.dest(paths.fonts));
});

//------------------------ Fonts

gulp.task('fonts', function() {
	var fonts = {};
	gulp.src([paths.fonts + '*.ttf'])
		.pipe(ttf2woff())
		.pipe(tap(function(file) {
			var	chunks	= file.path.substring(file.path.lastIndexOf('/') + 1, file.path.lastIndexOf('.')).split('-'),
				variant	= {
							style	: chunks.pop(),
							weight	: chunks.pop(),
							base64	: file.contents.toString('base64')
						};
			chunks.forEach(function(string, i, array) { array[i] = string[0].toUpperCase() + string.slice(1) });
			var family = chunks.join(' ');
			if (fonts.hasOwnProperty(family)) fonts[family].push(variant);
			else fonts[family] = [variant];
		}))
		.on('end', function() {
			gulp.src(paths.templates + '_fonts.scss')
				.pipe(template({ fonts: fonts }))
				.pipe(gulp.dest(paths.scss));
		});
});

//------------------------ Styles

gulp.task('styles', function() {
	gulp.src(paths.scss + '**/*.scss')
		.pipe(sass({
			errLogToConsole	: true,
			outputStyle		: 'compressed'
		}))
		.pipe(autoprefixer({
			browsers	: ['last 2 versions', 'IE 9'],
			cascade		: false
		}))
		.pipe(gulp.dest(paths.css));
});

//------------------------------------------------ Default tasks

gulp.task('default', function() {
	gulp.start('icons', 'fonts', 'styles');
});

//------------------------------------------------ Watch tasks

gulp.task('watch', function() {
	gulp.watch(paths.icons + '**/*.svg', ['icons']);
	gulp.watch(paths.fonts + '**/*.ttf', ['fonts']);
	gulp.watch(paths.scss + '**/*.scss', ['styles']);
});
