define(['knockout', '../options', '../InputTypes/Range', '../InputTypes/Text', 'text!./DeathTemplate.html'], function (ko, options, Range, Text, template) {

	function DeathViewModel(params) {
		var self = this;

		var addActions = [
			{
				text: "Add Death Date Criterion",
				value: 0,
				selected: false,
				description: "Filter Death by Date."
			},
			{
				text: "Add Death Type Criterion",
				value: 1,
				selected: false,
				description: "Filter by Death Type."
			},
			{
				text: "Add Cause of Death Source Concept Criterion",
				value: 2,
				selected: false,
				description: "Filter Condition Occurrences  by the Condition Source Concept."
			},
			{
				text: "Add Age at Occurrence Criterion",
				value: 3,
				selected: false,
				description: "Filter Condition Occurrences by age at occurrence."
					}, 
			{
				text: "Add Gender Criterion",
				value: 4,
				selected: false,
				description: "Filter Condition Occurrences based on Gender."
			}
/*
 			{
				text: "Add Prior Observation Duration Criterion",
				value: 8,
				selected: false,
				description: "Filter Condition Occurrences based on Prior Observation Duration."
					},
			{
				text: "Add Post Observation Duration Criterion",
				value: 9,
				selected: false,
				description: "Filter Condition Occurrences based on Prior Observation Duration."
					}
*/
		];

		self.addCriterionSettings = {
			selectText: "Add Criterion...",
			height:300,
			actionOptions: addActions,
			onAction: function (data) {
				var criteriaType = data.selectedData.value;
				switch (criteriaType) {
				case 0:
					if (self.Criteria.OccurrenceStartDate() == null)
						self.Criteria.OccurrenceStartDate(new Range({Op: "lt"}));
					break;
				case 1:
					if (self.Criteria.DeathType() == null)
						self.Criteria.DeathType(ko.observableArray());
					break;
				case 2:
					if (self.Criteria.DeathSourceConcept() == null)
						self.Criteria.DeathSourceConcept(ko.observable());
					break;
				case 3:
					if (self.Criteria.Age() == null)
						self.Criteria.Age(new Range());
					break;
				case 4:
					if (self.Criteria.Gender() == null)
						self.Criteria.Gender(ko.observableArray());
					break;
/*
 				case 8:
					if (typeof self.Criteria.PriorEnrollDays() != "number")
						self.Criteria.PriorEnrollDays(0);
					break;
				case 9:
					if (typeof self.Criteria.AfterEnrollDays() != "number")
						self.Criteria.AfterEnrollDays(0);
					break;
*/
				}
			}
		};

		self.rule = params.rule;
		self.Criteria = params.criteria.Death;
		self.options = options;
		
		self.removeCriterion = function (propertyName) {
			self.Criteria[propertyName](null);
		}


	}

	// return compoonent definition
	return {
		viewModel: DeathViewModel,
		template: template
	};
});