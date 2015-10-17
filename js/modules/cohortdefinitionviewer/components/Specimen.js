define(['knockout', 'cohortbuilder/options', 'cohortbuilder/InputTypes/Range', 'cohortbuilder/InputTypes/Text', 'text!./SpecimenTemplate.html'], function (ko, options, Range, Text, template) {

	function SpecimenViewModel(params) {
		var self = this;
		self.expression = params.expression;
		self.Criteria = params.criteria.Specimen;
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
		viewModel: SpecimenViewModel,
		template: template
	};
});