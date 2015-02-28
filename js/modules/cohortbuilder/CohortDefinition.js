define(function (require, exports) {

	var ko = require('knockout');
	var CohortExpression = require('./CohortExpression');

	function CohortDefinition(data) {
		
		var self = this;
		var data = data || {};

		self.Id = ko.observable(data.Id || null);
		self.Title = ko.observable(data.Title || null);
		self.Description = ko.observable(data.Description || null);
		self.Type = "SIMPLE_DEFINITION";
		self.Expression = ko.observable(new CohortExpression(data.Expression));
	}
	return CohortDefinition;
});