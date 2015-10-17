define(['knockout', 'cohortbuilder/options', 'cohortbuilder/InputTypes/Range', 'cohortbuilder/InputTypes/Text', 'text!./ConditionOccurrenceTemplate.html'], function (ko, options, Range, Text, template) {

	function ConditionOccurrenceViewModel(params) {

		var self = this;
		self.expression = params.expression;
		self.Criteria = params.criteria.ConditionOccurrence;
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
		viewModel: ConditionOccurrenceViewModel,
		template: template
	};
});