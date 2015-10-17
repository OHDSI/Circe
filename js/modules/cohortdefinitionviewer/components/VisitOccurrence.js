define(['knockout', 'cohortbuilder/options', 'cohortbuilder/InputTypes/Range', 'text!./VisitOccurrenceTemplate.html'], function (ko, options, Range, template) {

	function VisitOccurrenceViewModel(params) {
		var self = this;

		self.expression = params.expression;
		self.Criteria = params.criteria.VisitOccurrence;
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
		viewModel: VisitOccurrenceViewModel,
		template: template
	};
});