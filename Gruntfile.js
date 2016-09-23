'use strict';

module.exports = function(grunt) {

	//dependencies
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-copy-to');
	grunt.loadNpmTasks('grunt-bumpup');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-wakeup');
	// grunt.loadNpmTasks('grunt-svg2storeicons');


	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		currentVersion: '<%= pkg.name  %>.<%= pkg.version %>',

		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// clean task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		clean: {
			pre: ['temp', 'prod'], //delete before running
			post: ['tmp'], //delete after running
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// includes task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		includes: {
			files: {
				cwd: 'dev/',
				src: ['*.html'], // Source files
				dest: 'tmp/',
				options: {
					flatten: true,
					includePath: 'dev/HTMLincludes/',
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// replace task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		replace: {
			currentVersion: {
				src: ['tmp/**/*.*'],
				overwrite: true,
				replacements: [{
					from: '--currentVersion--',
					to: '<%= currentVersion %>',
				}],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// stylus task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		stylus: {
			site: {
				options: {
					compress: true,
				},
				files: {
					'prod/css/<%= currentVersion  %>.min.css': 'dev/stylus/site.styl',
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// vendor prefixes
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		autoprefixer: {
			Prefix: {
				src: 'prod/css/<%= currentVersion  %>.min.css',
				dest: 'prod/css/<%= currentVersion  %>.min.css',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// JS minification
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		uglify: {
			js: {
				files: {
					'prod/js/<%= currentVersion  %>.min.js': ['dev/js/*.js', '!dev/js/cpr/*.js'],
				},
			},

			cpr: {
				files: {
					'prod/js/cpr-<%= currentVersion  %>.min.js': ['dev/js/cpr/*.js'],
				},
			},

			node: {
				files: {
					'prod/node/api.min.js': ['dev/node/*.js', '!dev/node/node_modules/**/*'],
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// JS concat
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		concat: {
			node: {
				files: {
					'prod/node/api.js': ['dev/node/*.js', '!dev/node/node_modules/**/*'],
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// minify svgs
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'dev/svg/',
					src: ['*.svg'],
					dest: 'temp/svg/',
				}],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// svg2storeicons
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// svg2storeicons: {
		// 	icons: {
		// 		options: {
		// 			profiles: ['default', 'ios', 'android'],
		// 		},

		// 		src: 'dev/res/svg/icon.svg',
		// 		dest: 'app/res',
		// 	},
		// },


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// grunticon
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		grunticon: {
			myIcons: {
				files: [{
					expand: true,
					cwd: 'temp/svg',
					src: '*.svg',
					dest: 'prod/css',
				}],
				options: {
					datasvgcss: 'symbols.data.svg.css',
					datapngcss: 'symbols.data.png.css',
					urlpngcss: 'symbols.fallback.css',
					cssprefix: '.symbol-',
					customselectors: {
						// 'radio-on': ['input[type="radio"]:checked + label'],
						// 'radio-off': ['.radio label', '.radio-inline label'],
						// 'checkbox-on': ['input[type="checkbox"]:checked + label'],
						// 'checkbox-off': ['.checkbox label', '.checkbox-inline label']
					},
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// minify images
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		imagemin: {
			images: {
				options: {
					optimizationLevel: 4,
				},
				files: [{
					expand: true,
					cwd: 'dev/img',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'prod/img/',
				}],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// copy all files to prod
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		copyto: {

			//js folder
			JS: {
				files: [{
					cwd: 'dev/js/libs',
					src: ['**/*'],
					dest: ['prod/js/libs/']
				}]
			},

			//fonts
			Fonts: {
				files: [{
					cwd: 'dev/fonts',
					src: ['**/*'],
					dest: ['prod/fonts/'],
				}],
			},

			//svgs
			Fonts: {
				files: [{
					cwd: 'dev/img',
					src: ['**/*.svg'],
					dest: ['prod/img/'],
				}],
			},

			//html template
			Templates: {
				files: [{
					cwd: 'tmp',
					src: ['*.html'],
					dest: ['prod/'],
				}],
			},

			//media
			Media: {
				files: [{
					cwd: 'dev/media',
					src: ['**/*'],
					dest: ['prod/media/'],
				}],
			},

			//swf
			SWF: {
				files: [{
					cwd: 'dev/swf',
					src: ['**/*'],
					dest: ['prod/swf/'],
				}],
			},

			//Node modules
			Node: {
				files: [{
					cwd: 'dev/node/node_modules',
					src: [
						'**/*',
						'../package.json',
						'../local.crt',
						'../local.key',
					],
					dest: ['prod/node/node_modules/'],
				}],
			},

			//JSON files
			JSON: {
				files: [{
					cwd: 'dev/json',
					src: ['*.json'],
					dest: ['prod/json/'],
				}],
			},

			//cordova files
			// cordova: {
			// 	options: {
			// 		ignore: [
			// 			'prod/node/{,/**/*}',
			// 			'prod/node',
			// 			'dev/res/svg/{,/**/*}',
			// 			'dev/res/svg',
			// 		],
			// 	},
			// 	files: [{
			// 		cwd: 'prod/',
			// 		src: [
			// 			'**/*',
			// 			'dev/res/**/*',
			// 		],
			// 		dest: 'app/www/',
			// 	}],
			// },

			//icons
			// icons: {
			// 	options: {
			// 		ignore: [
			// 			'dev/res/svg/{,/**/*}',
			// 			'dev/res/svg',
			// 		],
			// 	},
			// 	files: [{
			// 		cwd: 'dev/res/',
			// 		src: [
			// 			'**/*',
			// 		],
			// 		dest: 'app/www/',
			// 	}],
			// },
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// bump version
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		bumpup: {
			files: 'package.json',
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Wakeup
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		wakeup: {
			wakeme: {
				randomize: true,
				notifications: true,
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// server
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		connect: {
			server: {
				options: {
					open: false,
					port: 1337,
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// watch for changes
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		watch: {
			All: {
				files: [
					'dev/**/*',
					'!dev/node/node_modules/**/*',
					'!package.json',
				],
				tasks: [
					'build',
				],
			},
		},

	});



	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('build', [
		'clean:pre',
		'includes',
		'replace',
		'stylus',
		'autoprefixer',
		'uglify',
		'concat',
		'svgmin',
		// 'svg2storeicons',
		'grunticon',
		'imagemin',
		'copyto',
		'clean:post',
		'wakeup',
	]);

	grunt.registerTask('default', ['connect', 'build', 'watch']);
	grunt.registerTask('new', ['build', 'bumpup']);
};