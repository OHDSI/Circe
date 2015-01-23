define(['knockout', '../options', '../InputTypes/Range', '../InputTypes/Text', 'text!./MeasurementTemplate.html'], function (ko, options, Range, Text, template) {

	function MeasurementViewModel(params) {
		var self = this;

		self.rule = params.rule;
		self.Criteria = params.criteria.Measurement;
		self.options = options;
		
		var addActions = [
			{
				text: "Add First Measure Criterion",
				value: 14,
				selected: false,
				description: "Restrict Measures to first occurrence.",
				action: function() { 
					if (self.Criteria.First() == null)
						self.Criteria.First(true);
				}
			},
			{
				text: "Add Measurement Date Criterion",
				value: 0,
				selected: false,
				description: "Filter Measurements by Date.",
				action: function() { 
					if (self.Criteria.OccurrenceStartDate() == null)
						self.Criteria.OccurrenceStartDate(new Range({Op: "lt"}));
				}
			},
			{
				text: "Add Measurement Type Criterion",
				value: 1,
				selected: false,
				description: "Filter Measurements by the Measurement Type.",
				action: function() { 
					if (self.Criteria.MeasurementType() == null)
						self.Criteria.MeasurementType(ko.observableArray());
				}				
			},
			{
				text: "Add Operator Criterion",
				value: 2,
				selected: false,
				description: "Filter Measurements by Operator.",
				action: function() { 
					if (self.Criteria.Operator() == null)
						self.Criteria.Operator(ko.observableArray());
				}					
			},
			{
				text: "Add Value as Number Criterion",
				value: 3,
				selected: false,
				description: "Filter Measurements by Value as Number.",
				action: function() { 
					if (self.Criteria.ValueAsNumber() == null)
						self.Criteria.ValueAsNumber(new Range());
				}
			},
			{
				text: "Add Value as Concept Criterion",
				value: 4,
				selected: false,
				description: "Filter Measurements by Value as Concept.",
				action: function() { 
					if (self.Criteria.ValueAsConcept() == null)
						self.Criteria.ValueAsConcept(ko.observableArray());
				}
			},
			{
				text: "Add Unit Criterion",
				value: 5,
				selected: false,
				description: "Filter Measurements by the Unit.",
				action: function() { 
					if (self.Criteria.Unit() == null)
						self.Criteria.Unit(ko.observableArray());
				}
			},
			{
				text: "Add Low Range Criterion",
				value: 6,
				selected: false,
				description: "Filter Measurements Low Range.",
				action: function() { 
					if (self.Criteria.RangeLow() == null)
						self.Criteria.RangeLow(new Range());
				}
			},
			{
				text: "Add High Range Criterion",
				value: 7,
				selected: false,
				description: "Filter Measurements by the Measurement Type.",
				action: function() { 
					if (self.Criteria.RangeHigh() == null)
						self.Criteria.RangeHigh(new Range());
				}
			},
			{
				text: "Add Measurement Source Concept Criterion",
				value: 8,
				selected: false,
				description: "Filter Measurements by the Measurement Source Concept.",
				action: function() { 
					if (self.Criteria.MeasurementSourceConcept() == null)
						self.Criteria.MeasurementSourceConcept(ko.observable());
				}
			},
			{
				text: "Add Low Range Ratio Criterion",
				value: 9,
				selected: false,
				description: "Filter Measurements by the Ratio of Value as Number to Range Low.",
				action: function() { 
					if (self.Criteria.RangeLowRatio() == null)
						self.Criteria.RangeLowRatio(new Range());
				}
			},
			{
				text: "Add High Range Ratio Criterion",
				value: 10,
				selected: false,
				description: "Filter Measurements by the Ratio of Value as Number to Range High.",
				action: function() { 
					if (self.Criteria.RangeHighRatio() == null)
						self.Criteria.RangeHighRatio(new Range());
				}
			},
			{
				text: "Add Abnormal Result Criterion",
				value: 11,
				selected: false,
				description: "Filter Measurements to include those which fall outside of normal range.",
				action: function() { 
					if (self.Criteria.Abnormal() == null)
						self.Criteria.Abnormal(true);
				}
			},			
			{
				text: "Add Age at Occurrence Criterion",
				value: 12,
				selected: false,
				description: "Filter Measurements by age at occurrence.",
				action: function() { 
					if (self.Criteria.Age() == null)
						self.Criteria.Age(new Range());
				}
			}, 
			{
				text: "Add Gender Criterion",
				value: 13,
				selected: false,
				description: "Filter Condition Occurrences based on Gender.",
				action: function() { 
					if (self.Criteria.Gender() == null)
						self.Criteria.Gender(ko.observableArray());
				}
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
				value: 14,
				selected: false,
				description: "Filter Condition Occurrences based on Prior Observation Duration.",
				action: function() { 
					if (self.Criteria.ProviderSpecialty() == null)
						self.Criteria.ProviderSpecialty(ko.observableArray());
				}
			},
			{
				text: "Add Visit Type Criterion",
				value: 15,
				selected: false,
				description: "Filter Condition Occurrences based on Prior Observation Duration.",
				action: function() { 
					if (self.Criteria.VisitType() == null)
						self.Criteria.VisitType(ko.observableArray());
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
		viewModel: MeasurementViewModel,
		template: template
	};
});