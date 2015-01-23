define(['knockout', 'cohortbuilder/rule', 'cohortbuilder/CriteriaTypes', 'cohortbuilder/CriteriaGroup', 'cohortbuilder/samples', 'cohortbuilder/components'], function (ko, rule, criteriaTypes, CriteriaGroup, samples) {

	return function App() {
		var self = this;
		self.selectedRule = ko.observable();
		self.sampleRules = ko.observableArray(samples.list.map(function (d) {
			return new rule(d.rule);
		}));
		self.hasChildValue = function (obj) {
			if (typeof obj == 'array') {
				for (var i = 0; i < obj.length; i++) {
					if (self.hasChildValue(obj[i]))
						return true;
				}
				return false;
			} else if (typeof obj === 'object') {
				for (var prop in obj) {
					if (self.hasChildValue(obj[prop])) {
						return true;
					}
				}
				return false;
			} else {
				return !(obj === null || obj === false);
			}
		}

		self.resetForm = function () {
			
		}

		self.generate = function() {
			var rule = self.selectedRule();
			
			$.ajax({
				url: 'http://localhost:8084/WebAPI/cohortdefinition/generate',
				method: 'POST',
				contentType: 'application/json',
				data: self.getRuleJSON(),
				success: function(results) {
					console.log(results);
				}
			});
			
		}
		self.newRule = function (ruleType) {
			var newRule = new rule();
			var PrimaryCriteria = {};
			
			newRule.Title("New Rule");
			newRule.AdditionalCriteria = new CriteriaGroup();
			
			switch (ruleType) {
			case 0:
				PrimaryCriteria.ConditionIndex = new CriteriaTypes.ConditionIndex();
				break;
			case 1:
				PrimaryCriteria.DrugIndex = new CriteriaTypes.DrugIndex();
				break;
			case 2:
				PrimaryCriteria.ProcedureIndex = new CriteriaTypes.ProcedureIndex();
				break;
			}

			var newRuleOption = {
				label: "New Rule",
				value: newRule
			};
			self.sampleRules.push(newRuleOption);
			self.selectedRule(newRuleOption);
		}

		self.getRuleJSON = function()
		{
			return ko.toJSON(self.selectedRule(), function (key, value) {if (value === 0 || value ) { return value; } else {return}} , 2)				
		}		
		
	}
});