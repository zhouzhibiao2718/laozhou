/**
 * _  _ ____ _ ___  _  _ ____  ___ ____ ___  _    ____
 * |\/| |__| |   /  |  | |  |   |  |__| |__] |    |___
 * |  | |  | |  /__ |__| |__| . |  |  | |__] |___ |___
 * Date: 2014/5/8 13:04 Created with IntelliJ IDEA.
 *
 */
"use strict"
var fs = require('fs');
var path = require('path');
var grunt = require('grunt');
var cssCombo = require('css-combo');
var CONFIG = grunt.file.readJSON('config.json');
if (!CONFIG) {
	throw new Error('missing config.json');
}
var getModules = function () {
	var modules = [];
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

var exeCssCombo = function () {
	var cssPath = CONFIG.path.cssHome;
	var bootstrapPath = CONFIG.path.bootstrap;
	var viewNames = fs.readdirSync(cssPath);
	viewNames.forEach(function (v, i) {
		var target = path.join(cssPath, v, '/main.css');
		var boo = fs.existsSync(target);
		if (boo) {
			var output = target;
			grunt.log.writeln('combo >>' + output);
			cssCombo.build({
					target        : target,
					output        : output,
					inputEncoding : 'UTF-8',
					outputEncoding: 'UTF-8',
					compress      : true,
					debug         : false
				},
				function (err) {
					if (err) {
						grunt.log.writeln('combo >>' + err);
					}
				}
			);
		} else {
			var secondLevelViewNames = fs.readdirSync(cssPath + '/' + v);
			secondLevelViewNames.forEach(function (secondV, j) {
				var target = path.join(cssPath, v, secondV, '/main.css');
				var boo = fs.existsSync(target);
				if (boo) {
					var output = target;
					grunt.log.writeln('combo >>' + output);
					cssCombo.build({
							target        : target,
							output        : output,
							inputEncoding : 'UTF-8',
							outputEncoding: 'UTF-8',
							compress      : true,
							debug         : false
						},
						function (err) {
							if (err) {
								grunt.log.writeln('combo >>' + err);
							}
						}
					);
				}
			});
		}
	});
	cssCombo.build({
			target        : bootstrapPath,
			output        : bootstrapPath,
			inputEncoding : 'UTF-8',
			outputEncoding: 'UTF-8',
			compress      : true,
			debug         : false
		},
		function (err) {
			if (err) {
				grunt.log.writeln('combo >>' + err);
			}
		}
	);
};

exports.getModules = getModules;
exports.exeCssCombo = exeCssCombo;