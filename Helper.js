/**
 * _  _ ____ _ ___  _  _ ____  ___ ____ ___  _    ____
 * |\/| |__| |   /  |  | |  |   |  |__| |__] |    |___
 * |  | |  | |  /__ |__| |__| . |  |  | |__] |___ |___
 * Date: 2014/5/29 11:06 Created with IntelliJ IDEA.
 *
 */
var fs = require('fs');
var path = require('path');
var grunt = require('grunt');
var CONFIG = grunt.file.readJSON('config.json');
if (!CONFIG) {
	throw new Error('missing config.json');
}

var getModules = function () {
	var modules = [
		{name: 'lib/basic'},
		{name: 'config'}
	];
	var viewPath = path.join(CONFIG.path.app, 'App/view/');
	var arr = fs.readdirSync(viewPath);
	arr.forEach(function (v, i) {
		var secondLevel = viewPath + v;
		var mainFile = secondLevel + '/main.js';
		var hasMain = fs.existsSync(mainFile);
		if (hasMain) {
			modules.push({
				name: 'view/' + v + '/main'
			});
		} else {
			var secondLeveArr = fs.readdirSync(secondLevel);
			secondLeveArr.forEach(function (secondV, j) {
				var thirdLevel = secondLevel + '/' + secondV;
				var _mainFile = thirdLevel + '/main.js';
				var _hasMain = fs.existsSync(_mainFile);
				if (_hasMain) {
					modules.push({
						name: 'view/' + v + '/' + secondV + '/main'
					});
				}
			});
		}
	});
	return modules;
};

var getRequireConfig = function () {
	console.info(getModules());
	return {
		compile: {
			options: {
				appDir: CONFIG.path.app,
				mainConfigFile: path.join(CONFIG.path.app, 'App/config.js'),
				baseUrl: 'App',
				dir: CONFIG.path.product,
				optimize: 'uglify2',
				generateSourceMaps: false,
				preserveLicenseComments: false,
				optimizeCss: 'none',
//				skipDirOptimize: true,
				uglify2: {
					compress: {
						dead_code: true,
						unused: true,
						global_defs: {
							//打包的时候关闭调试模式
							MAIZUO_DEBUG: false,
							//记录系统发布时间
							MAIZUO_UPDATE_TIME: (new Date()).getTime()
						}
					}
				},
				paths: {
					jquery: "empty:"
				},
				modules: getModules()
			}
		}
	};
};
var updateBasic = function (fileName) {
	console.info('fileName:', fileName);
	var path = "./src/main/webapp/WEB-INF/html/decorator/main.html";
	var finalCode = '';
	var lines = fs.readFileSync(path).toString().split('\n');
	var length = lines.length;
	var folder = fileName == 'basic' ? "/App/lib/" : "/App/";
	lines.forEach(function (line, i) {
		line = line.toString();
		if (i < length - 1) {
			line += "\n";
		}
		if (line && line.indexOf(fileName + '.js') >= 0) {
			line = '<script src="' + folder + fileName + '.js?t=' + new Date().getTime() + '">' + "<\/script>\n";
			console.log(line);
		}
		finalCode += line;
	});
	fs.writeFileSync(path, finalCode);
};

exports.getRequireConfig = getRequireConfig;
exports.updateBasic = updateBasic;