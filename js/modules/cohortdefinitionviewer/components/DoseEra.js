define(['knockout', 'cohortbuilder/options', 'cohortbuilder/InputTypes/Range', 'text!./DoseEraTemplate.html'], function (ko, options, Range, template) {

	function DoseEraViewModel(params) {
		
		var self = this;
		self.expression = params.expression;
		self.Criteria = params.criteria.DoseEra;
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
		viewModel: DoseEraViewModel,
		template: template
	};
});