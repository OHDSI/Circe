define(['knockout', 'cohortbuilder/options', 'cohortbuilder/InputTypes/Range', 'cohortbuilder/InputTypes/Text', 'text!./DrugExposureTemplate.html'], function (ko, options, Range, Text, template) {

	function DrugExposureViewModel(params) {
		var self = this;

		self.expression = params.expression;
		self.Criteria = params.criteria.DrugExposure;
		self.options = options;

		self.getCodesetName = function(codesetId, defaultName) {
			if (codesetId != null)	
				return ko.utils.unwrapObservable(self.expression.ConceptSets()[codesetId].name);
			else
				return defaultName;
		};
		
	}

	// return compoonent definition
	return {
		viewModel: DrugExposureViewModel,
		template: template
	};
});