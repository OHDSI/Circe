define(['knockout', 'text!./PrimaryEventSelectorTemplate.html'], function (ko, componentTemplate) {

	function PrimaryEventSelectorViewModel(params) {
		var self = this;
		self.addPrimaryCriteriaOptions = params.addPrimaryCriteriaOptions;
	};

	var component = {
		viewModel: PrimaryEventSelectorViewModel,
		template: componentTemplate
	};
	
	return component;
});