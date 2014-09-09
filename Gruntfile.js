module.exports = function (grunt) {
	var fs = require('fs');
	var path = require('path');
	var helper = require('./Helper');
	var CONFIG = grunt.file.readJSON('config.json');
	if (!CONFIG) {
		throw new Error('missing config.json');
	}

	var changedFiles = {};

	var onStylusChange = grunt.util._.debounce(function () {
		grunt.config('stylus.compile.files', changedFiles);
		changedFiles = {};
	}, 200);

	grunt.event.on('watch', function (action, filePath, taskName) {
		if (taskName.trim() == 'stylus') {
			changedFiles[filePath.replace('.styl', '.css')] = filePath;
			onStylusChange();
		}
	});

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			version: '0.1.0'
		},
		requirejs: helper.getRequireConfig(),
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: CONFIG.lib.basic,
				dest: path.join(CONFIG.path.app, 'App/lib/basic.js')
			}
		},
		stylus: {
			local: {
				options: {
					compress: false,
					'include css': true,
					paths: [path.join(CONFIG.path.app, 'App/css/')],
					urlfunc: 'embedurl',
					use: [
					],
					define: {
						DEVE: true
					},
					import: [
						'global/helper'
					]
				},
				files: changedFiles
			},
			deve: {
				options: {
					compress: false,
					'include css': true,
					paths: [path.join(CONFIG.path.app, 'App/css/')],
					urlfunc: 'embedurl',
					use: [
					],
					define: {
						DEVE: true
					},
					import: [
						'global/helper'
					]
				},
				expand: true,
				cwd: path.join(CONFIG.path.app, 'App/css/view/'),
				src: '**/*.styl',
				dest: path.join(CONFIG.path.app, 'App/css/view/'),
				ext: '.css'
			},
			prod: {
				options: {
					compress: true,
					'include css': true,
					paths: [path.join(CONFIG.path.app, 'App/css/')],
					urlfunc: 'embedurl',
					use: [
					],
					define: {
						DEVE: false
					},
					import: [
						'global/helper'
					]
				},
				expand: true,
				cwd: path.join(CONFIG.path.app, 'App/css/view/'),
				src: '**/*.styl',
				dest: path.join(CONFIG.path.app, 'App/css/view/'),
				ext: '.css'
			}
		},
		watch: {
			stylus: {
				files: path.join(CONFIG.path.app, 'App/css/**/**.styl'),
				tasks: ['stylus:local'],
				options: {
					spawn: false
				}
			},
			js: {
				files: path.join(CONFIG.path.app, 'App/view/**/**.js'),
				options: {
					livereload: true
				}
			},
			css: {
				files: path.join(CONFIG.path.app, 'App/css/view/**/**.css'),
				options: {
					livereload: true
				}
			}
		},
		command: {
			jetty: {
				cmd: 'mvn -D jetty.port=' + CONFIG.port + ' jetty:run > jetty.log'
			},
			backend: {
				cmd: 'start mvn -D jetty.port=' + CONFIG.port + ' jetty:run'
			},
			weinre: {
				cmd: 'weinre --httpPort 8060 --boundHost -all-'
			}
		},
		wait_server: {
			jetty: {
				options: {
					url: 'http://localhost:' + CONFIG.port,
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
	// 编译stylus
	grunt.registerTask('compile', ['stylus:prod']);
	// 从IDE迁移到Grunt
	grunt.registerTask('migrate', ['clean:map', 'compile']);
	grunt.registerTask('update_basic', helper.updateBasic);
	// 合并基础库
	grunt.registerTask('concat_basic_lib', ['concat', 'update_basic:basic']);
	// 发布环境
	grunt.registerTask('prod', ['stylus:prod', 'requirejs']);
	// 开发环境
	grunt.registerTask('deve', ['stylus:deve']);

	// weinre远程调试模式
	grunt.registerTask('remote', ['command:jetty', 'command:weinre', 'wait_server:jetty', 'wait_server:weinre', 'watch']);
	grunt.registerTask('remote-without-jetty', ['command:weinre', 'wait_server:weinre', 'watch']);
	// 调试开发模式
	grunt.registerTask('backend', ['command:backend', 'wait_server:jetty', 'watch']);
	grunt.registerTask('backend-with-remote', ['command:backend', 'command:weinre', 'wait_server:jetty', 'wait_server:weinre', 'watch']);
	grunt.registerTask('default', ['command:jetty', 'wait_server:jetty', 'watch']);

};