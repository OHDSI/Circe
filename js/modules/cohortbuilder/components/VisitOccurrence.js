define(['knockout', '../options', '../InputTypes/Range', 'text!./VisitOccurrenceTemplate.html'], function (ko, options, Range, template) {

	function VisitOccurrenceViewModel(params) {
		var self = this;

		var addActions = [
			{
				text: "Add Visit Start Date Criterion",
				value: 0,
				selected: false,
				description: "Filter Visit Occurrences by the Condition Start Date."
					},
			{
				text: "Add Visit End Date Criterion",
				value: 1,
				selected: false,
				description: "Filter Visit Occurrences  by the Condition End Date"
					},
			{
				text: "Add Visit Type Criterion",
				value: 2,
				selected: false,
				description: "Filter Condition Occurrences  by the Condition Type."
			},
			{
				text: "Add Visit Source Concept Criterion",
				value: 3,
				selected: false,
				description: "Filter Visit Occurrences by the Visit Source Concept."
					},
			{
				text: "Add Visit Length Criterion",
				value: 4,
				selected: false,
				description: "Filter Visit Occurrences by duration."
			},
			{
				text: "Add Initial Visit Criterion",
				value: 5,
				selected: false,
				description: "Limit Visit Occurrences to the first visit."
			},
			{
				text: "Add Age at Occurrence Criterion",
				value: 6,
				selected: false,
				description: "Filter Visit Occurrences by age at occurrence."
					}, {
				text: "Add Gender Criterion",
				value: 7,
				selected: false,
				description: "Filter Visit Occurrences based on Gender."
					},
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
					},
*/
			{
				text: "Add Provider Specialty Criterion",
				value: 10,
				selected: false,
				description: "Filter Visit Occurrences based on Prior Observation Duration."
			}
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
					if (self.Criteria.OccurrenceEndDate() == null)
						self.Criteria.OccurrenceEndDate(new Range({Op: "lt"}));
					break;
				case 2:
					if (self.Criteria.VisitType() == null)
						self.Criteria.VisitType(ko.observableArray());
					break;
				case 3:
					if (self.Criteria.VisitSourceConcept() == null)
						self.Criteria.VisitSourceConcept(ko.observable());
					break;
				case 4:
					if (self.Criteria.VisitLength() == null)
						self.Criteria.VisitLength(new Range());
					break;
				case 5:
					if (self.Criteria.First() == null)
						self.Criteria.First(true);
					break;
				case 6:
					if (self.Criteria.Age() == null)
						self.Criteria.Age(new Range());
					break;
				case 7:
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
				case 10:
					if (self.Criteria.ProviderSpecialty() == null)
						self.Criteria.ProviderSpecialty(ko.observableArray());
					break;
				}
			}
		};

		self.rule = params.rule;
		self.Criteria = params.criteria.VisitOccurrence;
		self.options = options;

		self.removeCriterion = function (propertyName) {
			self.Criteria[propertyName](null);
		}


	}

	// return compoonent definition
	return {
		viewModel: VisitOccurrenceViewModel,
		template: template
	};
});