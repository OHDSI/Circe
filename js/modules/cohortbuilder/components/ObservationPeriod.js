define(['knockout', '../options', '../InputTypes/Range', 'text!./ObservationPeriodTemplate.html'], function (ko, options, Range, template) {

	function ObservationPeriodViewModel(params) {
		var self = this;

		self.rule = params.rule;
		self.Criteria = params.criteria.ObservationPeriod;
		self.options = options;
		
		var addActions = [
			{
				text: "Add Period Start Date Criterion",
				value: 0,
				selected: false,
				description: "Filter Observation Periods by Start Date.",
				action: function() { 
					if (self.Criteria.PeriodStartDate() == null)
						self.Criteria.PeriodStartDate(new Range({Op: "lt"}));
				}
			},
			{
				text: "Add Period End Date Criterion",
				value: 1,
				selected: false,
				description: "Filter Observation Periods by End Date.",
				action: function() { 
					if (self.Criteria.PeriodEndDate() == null)
						self.Criteria.PeriodEndDate(new Range({Op: "lt"}));
				}
			},
			{
				text: "Add Period Type Criterion",
				value: 2,
				selected: false,
				description: "Filter Obsevation Periods by Type.",
				action: function() { 
					if (self.Criteria.PeriodType() == null)
						self.Criteria.PeriodType(ko.observableArray());
				}				
			},	
			{
				text: "Add Age at Start Criterion",
				value: 3,
				selected: false,
				description: "Filter Periods by Age at Start.",
				action: function() { 
					if (self.Criteria.AgeAtStart() == null)
						self.Criteria.AgeAtStart(new Range());
				}
			}, 
			{
				text: "Add Age at End Criterion",
				value: 4,
				selected: false,
				description: "Filter Periods by age at End.",
				action: function() { 
					if (self.Criteria.AgeAtEnd() == null)
						self.Criteria.AgeAtEnd(new Range());
				}
			}, 
			{
				text: "Add Period Length Criterion",
				value: 13,
				selected: false,
				description: "Filter Observation Periods by duration.",
				action: function() { 
					if (self.Criteria.PeriodLength() == null)
						self.Criteria.PeriodLength(new Range());
				}
			}
		];

		self.addCriterionSettings = {
			selectText: "Add Criterion...",
			height:300,
			actionOptions: addActions,
			onAction: function (data) {
				data.selectedData.action();
			}
		};

		self.removeCriterion = function (propertyName) {
			self.Criteria[propertyName](null);
		}
	}

	// return compoonent definition
	return {
		viewModel: ObservationPeriodViewModel,
		template: template
	};
});