define(['jquery', 'knockout', './jquery.autosize'], function ($, ko) {
	ko.bindingHandlers.jqAutoresize = {
		update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			$(element).autosize();
		}
	};
});