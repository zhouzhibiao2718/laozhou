define([
	'require',
	'text!../tpl/tpl.tpl',
	'../data/Data',
	'lazyload'
], function (require, tpl, data) {
	return Backbone.View.extend({
		el: $('.viewport'),
		events: {

		},
		initialize: function () {
			this.initializeVar();
			this.initializeEl();
			this.initializeRouter();
		},
		initializeVar: function () {
		},
		initializeEl: function () {
			this.contentEl = this.$el.find('.content');
		},
		initializeRouter: function () {
			var me = this;
			var Workspace = Backbone.Router.extend({
				initialize: function () {
					return Backbone.history.start();
				},
				routes: {
					"": "main",
					'*view': 'initView'
				},
				initView: function (router) {
					console.info('router:', router);
					if (router != '') {
						require(['view/' + router + '/main'], function (view) {
							me.contentEl.html(view.$el);
						});
					}
				},
				main: function (query, page) {
					me.contentEl.html('main');
				}
			});
			new Workspace;
		}
	});
});
