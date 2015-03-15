	define(['knockout'], function (ko) {
		ko.bindingHandlers.eventListener = {
			init: function (element, valueAccessor, allBindings, viewModel, bindingContext)
			{
				var params = ko.utils.unwrapObservable(valueAccessor());
				$(element).on(params.event,params.selector, function() {
					params.callback(ko.dataFor(this));
				});
			}
		}
	});
