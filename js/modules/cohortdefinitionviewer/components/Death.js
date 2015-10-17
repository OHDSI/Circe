define(['knockout', 'cohortbuilder/options', 'cohortbuilder/InputTypes/Range', 'cohortbuilder/InputTypes/Text', 'text!./DeathTemplate.html'], function (ko, options, Range, Text, template) {

	function DeathViewModel(params) {
		var self = this;

		self.expression = params.expression;
		self.Criteria = params.criteria.Death;
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
		viewModel: DeathViewModel,
		template: template
	};
});