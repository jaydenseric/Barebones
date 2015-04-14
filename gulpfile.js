//-------------------------------------------- Config

var config = {
	icons: {
		vectorsPath: 'icons/vectors',
		templatesPath: 'icons/templates'
	},
	styles: {
		SCSSPath: 'scss',
		CSSPath: 'css'
	}
};

//-------------------------------------------- Plugins

var	gulp				= require('gulp'),
	autoprefixer		= require('gulp-autoprefixer'),
	sass				= require('gulp-sass'),
	svg2ttf				= require('gulp-svg2ttf'),
	svgicons2svgfont	= require('gulp-svgicons2svgfont'),
	tap					= require('gulp-tap'),
	template			= require('gulp-template'),
	ttf2woff			= require('gulp-ttf2woff');

//-------------------------------------------- Tasks

//---------------------- Font icons

gulp.task('icons', function() {
	gulp.src([config.icons.vectorsPath + '/*.svg'])
		.pipe(svgicons2svgfont({
			fontName: 'icons',
			normalize: true,
			fontHeight: 1000
		}))
		.on('codepoints', function(codepoints) {
			gulp.src(config.icons.templatesPath + '/_font-icons.scss')
				.pipe(template({ glyphs: codepoints }))
				.pipe(gulp.dest(config.styles.SCSSPath));
		})
		.pipe(svg2ttf())
		.pipe(ttf2woff())
		.pipe(tap(function(file, t) {
			gulp.src(config.icons.templatesPath + '/_icon-font.scss')
				.pipe(template({ base64: file.contents.toString('base64') }))
				.pipe(gulp.dest(config.styles.SCSSPath));
		}));
});

//---------------------- Styles

gulp.task('styles', function() {
	gulp.src(config.styles.SCSSPath + '/**/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'IE 9'],
			cascade: false
		}))
		.pipe(gulp.dest(config.styles.CSSPath));
});

//-------------------------------------------- Default tasks

gulp.task('default', function() {
	gulp.start('icons', 'styles');
});	

//-------------------------------------------- Watch tasks

gulp.task('watch', function() {
	gulp.watch(config.icons.vectorsPath + '/**/*.svg', ['icons']);
	gulp.watch(config.styles.SCSSPath + '/**/*.scss', ['styles']);
});