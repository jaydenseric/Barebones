'use strict';
module.exports = function (grunt) {
	
//-------------------------------------------- Config

	grunt.initConfig({
		paths: {
			icons: 'icons',
			scss: 'scss',
			css: 'css'
		}
	});

//-------------------------------------------- Sub-tasks

//---------------------- Font icons

	grunt.loadNpmTasks('grunt-webfont');
	grunt.config('webfont', {
		options: {
			engine: 'node',
			normalize: true,
			types: 'woff',
			embed: true,
			stylesheet: 'scss',
			template: '<%= paths.icons %>/template.txt',
			htmlDemo: false
        },
		compile: {
			src: '<%= paths.icons %>/vectors/*.svg',
			dest: 'scss'
		}	
	});

//---------------------- Sass

	grunt.loadNpmTasks('grunt-sass');
	grunt.config('sass', {
		options: {
			outputStyle: 'compressed'
		},
		compile: {
			files: {
				'<%= paths.css %>/main.css': '<%= paths.scss %>/main.scss',
				'<%= paths.css %>/main-ie9.css': '<%= paths.scss %>/main-ie9.scss'
			}
		}
	});

//---------------------- Autoprefixer

	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.config('autoprefixer', {
		options: {
			browsers: ['last 2 versions', 'ie 9']
		},
		compile: {
			src: '<%= paths.css %>/**/*.css'
		}
	});

//-------------------------------------------- Watch tasks

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.config('watch', {
		icons: {
			files: '<%= paths.icons %>/vectors/*.svg',
			tasks: ['webfont']
		},
		sass: {
			files: '<%= paths.scss %>/**/*.scss',
			tasks: ['sass', 'autoprefixer']
		}
	});

//-------------------------------------------- Default tasks

	grunt.registerTask('default', ['webfont', 'sass', 'autoprefixer']);
};