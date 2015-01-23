define(function (require, exports, module) {
	var ko = require('knockout');
	var debug = true;

	function CriteriaGroup(data) {
		var self = this;
		var AdditionalCriteria = require('./AdditionalCriteria');
		
		data = data || {};
		self.Type = ko.observable((data.Type) || "ALL");
		self.CriteriaList = ko.observableArray();
		self.Groups = ko.observableArray();

		// if data is provided, intialize the criteriaList
		if (data.CriteriaList && data.CriteriaList.length > 0) {
			data.CriteriaList.forEach(function (d) {
				self.CriteriaList.push(new AdditionalCriteria(d));
			});
		}
		
		if (data.Groups && data.Groups.length > 0) {
			data.Groups.forEach(function (d) {
				self.Groups.push(new CriteriaGroup(d));
			});
		}
	}

	module.exports = CriteriaGroup;
	
});