define(['jquery', 'knockout', './jquery.autosize'], function ($, ko) {
	ko.bindingHandlers.jqAutoresize = {
		update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var options = valueAccessor();
			$(element).autosize(options);
		}
	};
});