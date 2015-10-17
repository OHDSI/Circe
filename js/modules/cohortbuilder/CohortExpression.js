define(function (require, exports) {

	var ko = require('knockout');
	var CriteriaGroup = require('./CriteriaGroup');
	var ConceptSet = require('conceptsetbuilder/InputTypes/ConceptSet');
	var PrimaryCriteria = require('./PrimaryCriteria');

	function conceptSetSorter(a,b)
	{
		var textA = a.name().toUpperCase();
		var textB = b.name().toUpperCase();
		return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	}
	
	function CohortExpression(data) {
		var self = this;
		var data = data || {};

		
		self.PrimaryCriteria = ko.observable(new PrimaryCriteria(data.PrimaryCriteria));
		self.AdditionalCriteria = ko.observable(data.AdditionalCriteria && new CriteriaGroup(data.AdditionalCriteria));
		self.ConceptSets = ko.observableArray(data.ConceptSets && data.ConceptSets.map(function(d) { return new ConceptSet(d) }));
		self.ExpressionLimit =  { Type: ko.observable(data.ExpressionLimit && data.ExpressionLimit.Type || "All") }
		
		self.ConceptSets.sorted = ko.pureComputed(function() {
			return self.ConceptSets().map(function (item) { return item; }).sort(conceptSetSorter);
		});
	
		
	}
	return CohortExpression;
});