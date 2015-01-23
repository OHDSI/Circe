define(function (require, exports) {

	var ko = require('knockout');

	function Rule(data) {
		var CriteriaTypes = require('./CriteriaTypes');
		var CriteriaGroup = require('./CriteriaGroup');
		var Codeset = require('./InputTypes/Codeset');
		var Window = require('./InputTypes/Window');
		
		var self = this;
		var data = data || {};

		self.RuleId = ko.observable(data.RuleId || null);
		self.Title = ko.observable(data.Title || null);
		self.Description = ko.observable(data.Description || null);
		self.Type = "SIMPLE_CRITERIA";
		self.PrimaryCriteria = ko.observableArray(data.PrimaryCriteria.map(function (d) {
			return CriteriaTypes.GetCriteriaFromObject(d)
		}));
		self.AdditionalCriteria = ko.observable(data.AdditionalCriteria && new CriteriaGroup(data.AdditionalCriteria));
		self.Codesets = ko.observableArray(data.Codesets && data.Codesets.map(function(d) { return new Codeset(d) }));
		self.ObservationWindow = { PriorDays: ko.observable((data.ObservationWindow && data.ObservationWindow.PriorDays) || 0),
																PostDays: ko.observable((data.ObservationWindow && data.ObservationWindow.PostDays) || 0) };
	}
	return Rule;
});