/*global module:false*/
module.exports = function (grunt) {
	var fs = require('fs');
	var path = require('path');
	var helper = require('./Helper');
	var CONFIG = grunt.file.readJSON('config.json');
	if (!CONFIG) {
		throw new Error('missing config.json');
	}
	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg        : grunt.file.readJSON('package.json'),
		banner     : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		requirejs  : {
			compile: {
				options: {
					appDir                 : CONFIG.path.app,
					mainConfigFile         : path.join(CONFIG.path.app, 'App/config.js'),
					baseUrl                : 'App',
					dir                    : CONFIG.path.product,
					optimize               : 'uglify2',
					generateSourceMaps     : true,
					preserveLicenseComments: false,
					optimizeCss            : 'none',
					uglify2                : {
						compress: {
							dead_code  : true,
							unused     : true,
							global_defs: {
								//打包的时候关闭调试模式
								MAIZUO_DEBUG      : false,
								//记录系统发布时间
								MAIZUO_UPDATE_TIME: (new Date()).getTime()
							}
						}
					},
					paths                  : {
						jquery: "empty:"
					},
					modules                : helper.getModules()
				}
			}
		},
		concat     : {
			options: {
				separator: ';'
			},
			dist   : {
				src : CONFIG.lib.basic,
				dest: path.join(CONFIG.path.app, 'App/lib/basic.js')
			}
		},
		uglify     : {
			options: {
				banner: '<%= banner %>'
			},
			dist   : {
				src : '<%= concat.dist.dest %>',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		jshint     : {
			options  : {
				curly  : true,
				eqeqeq : true,
				immed  : true,
				latedef: true,
				newcap : true,
				noarg  : true,
				sub    : true,
				undef  : true,
				unused : true,
				boss   : true,
				eqnull : true,
				browser: true,
				globals: {
					jQuery: true
				}
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			lib_test : {
				src: ['lib/**/*.js', 'test/**/*.js']
			}
		},
		qunit      : {
			files: ['test/**/*.html']
		},
		stylus     : {
			views: {
				expand : true,
				options: {},
				src    : [path.join(CONFIG.path.app, 'App/css/view/**/**.styl')],
				ext    : '.css'
			}
		},
		watch      : {
			stylus_views: {
				files: path.join(CONFIG.path.app, 'App/css/view/**/**.styl'),
				tasks: ['stylus:views']
			},
			js          : {
				files  : path.join(CONFIG.path.app, '**/**.js'),
				options: {
					livereload: true
				}
			},
			css         : {
				files  : path.join(CONFIG.path.app, 'App/css/view/**/**.css'),
				options: {
					livereload: true
				}
			}
		},
		command    : {
			jetty : {
				cmd: 'mvn -D jetty.port=' + CONFIG.port + ' jetty:run > jetty.log'
			},
			weinre: {
				cmd: 'weinre --httpPort 8060 --boundHost -all-'
			}
		},
		wait_server: {
			jetty : {
				options: {
					url    : 'http://localhost:' + CONFIG.port,
					timeout: 20 * 1000
				}
			},
			weinre: {
				options: {
					url: 'http://localhost:8060'
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-commands');
	grunt.loadNpmTasks('grunt-wait-server');
	grunt.loadNpmTasks('grunt-contrib-concat');
	// css合并压缩
	grunt.registerTask('css-combo', helper.exeCssCombo);
	// 合并基础库
	grunt.registerTask('concat_basic_lib', ['concat']);
	// 编译stylus
	grunt.registerTask('compile', ['stylus:views']);
	// 发布环境
	grunt.registerTask('production', ['compile', 'requirejs', 'css-combo']);
	// 开发环境
	grunt.registerTask('development', ['compile']);
	// weinre远程调试模式
	grunt.registerTask('remote', ['command:jetty', 'command:weinre', 'wait_server:jetty', 'wait_server:weinre', 'watch']);
	grunt.registerTask('remote-without-jetty', ['command:weinre', 'wait_server:weinre', 'watch']);
	// 调试开发模式
	grunt.registerTask('default', ['command:jetty', 'wait_server:jetty', 'watch']);
};
