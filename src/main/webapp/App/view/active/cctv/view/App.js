define(['text!../tpl/tpl.tpl', '../data/Data', 'lazyload'], function (tpl, data) {
	return Backbone.View.extend({
		tagName   : "li",
		className : "document-row",
		events    : {
			"click .icon"         : "open",
			"click .button.delete": "destroy"
		},
		initialize: function () {
			$('img.img-lazy-load').lazyload({
				threshold: 200,
				effect   : 'fadeIn'
			});
			return $(window).trigger('scroll');
		}
	});
});
