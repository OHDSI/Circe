define(['knockout', '../options', '../InputTypes/Range', 'text!./DrugEraTemplate.html'], function (ko, options, Range, template) {

	function DrugEraViewModel(params) {
		
		var self = this;
		self.expression = params.expression;
		self.Criteria = params.criteria.DrugEra;
		self.options = options;

		var addActions = [
			{
				text: "Add Era Start Date Criterion",
				selected: false,
				description: "Filter Drug Eras by the Era Start Date.",
				action: function() {
					if (self.Criteria.EraStartDate() == null)
						self.Criteria.EraStartDate(new Range({Op: "lt"}));				
				}
			},
			{
				text: "Add Era End Date Criterion",
				selected: false,
				description: "Filter Drug Eras  by the Era End Date",
				action: function() {
					if (self.Criteria.EraEndDate() == null)
						self.Criteria.EraEndDate(new Range({Op: "lt"}));				
				}
			},
			{
				text: "Add Era Exposure Count Criterion",
				selected: false,
				description: "Filter Drug Eras by the Exposure Count.",
				action: function() {
					if (self.Criteria.OccurrenceCount() == null)
						self.Criteria.OccurrenceCount(new Range());				
				}
			},
			{
				text: "Add Gap Length Criterion",
				selected: false,
				description: "Filter Drug Eras by the Gap Length.",
				action: function() {
					if (self.Criteria.GapDays() == null)
						self.Criteria.GapDays(new Range());				
				}
			},
			{
				text: "Add Era Length Criterion",
				selected: false,
				description: "Filter Drug Eras by the Era duration.",
				action: function() {
					if (self.Criteria.EraLength() == null)
						self.Criteria.EraLength(new Range());				
				}
			},
			{
				text: "Add New Exposure Criterion",
				selected: false,
				description: "Limit Drug Eras to new exposure.",
				action: function() {
					if (self.Criteria.First() == null)
						self.Criteria.First(true);				
				}
			},
			{
				text: "Add Age at Era Start Criterion",
				selected: false,
				description: "Filter Drug Eras by age at era start.",
				action: function() {
					if (self.Criteria.AgeAtStart() == null)
						self.Criteria.AgeAtStart(new Range());				
				}
			}, 
			{
				text: "Add Age at Era End Criterion",
				selected: false,
				description: "Filter Drug Eras by age at era end.",
				action: function() {
					if (self.Criteria.AgeAtEnd() == null)
						self.Criteria.AgeAtEnd(new Range());				
				}
			}, 
			{
				text: "Add Gender Criterion",
				selected: false,
				description: "Filter Drug Eras based on Gender.",
				action: function() {
					if (self.Criteria.Gender() == null)
						self.Criteria.Gender(ko.observableArray());				
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
		viewModel: DrugEraViewModel,
		template: template
	};
});