define(
	[
		'../data/Data',
		'switch'
	], function (Data) {//null
		var num=view;
		return Backbone.View.extend({
			events: {

			},
			initialize: function () {
				this.initializeVar();
				this.initializeEl();
				this.initializeTemplate();
				this.initializeUI();
				this.initializeData();
				this.initializeEvent();
			},
			initializeVar: function () {

			},
			initializeEl: function () {

			},
			initializeEvent: function () {

			},
			initializeTemplate: function () {
				this.$el.html(tpl);
			},
			initializeUI: function () {

			},
			initializeData: function () {

			}
		});
	});
