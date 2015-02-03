define(function (require, exports) {

	var ko = require('knockout');
	var CriteriaGroup = require('./CriteriaGroup');
	var Codeset = require('./InputTypes/Codeset');
	var PrimaryCriteria = require('./PrimaryCriteria');

	function CohortExpression(data) {
		var self = this;
		var data = data || {};

		self.PrimaryCriteria = ko.observable(new PrimaryCriteria(data.PrimaryCriteria));
		self.AdditionalCriteria = ko.observable(data.AdditionalCriteria && new CriteriaGroup(data.AdditionalCriteria));
		self.Codesets = ko.observableArray(data.Codesets && data.Codesets.map(function(d) { return new Codeset(d) }));
		self.ExpressionLimit =  { Type: ko.observable(data.ExpressionLimit || "All") }
		
	}
	return CohortExpression;
});