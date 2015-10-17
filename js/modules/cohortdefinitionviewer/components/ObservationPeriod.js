define(['knockout', 'cohortbuilder/options', 'cohortbuilder/InputTypes/Range', 'text!./ObservationPeriodTemplate.html'], function (ko, options, Range, template) {

	function ObservationPeriodViewModel(params) {
		var self = this;

		self.expression = params.expression;
		self.Criteria = params.criteria.ObservationPeriod;
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
		viewModel: ObservationPeriodViewModel,
		template: template
	};
});