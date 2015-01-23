define(['knockout', '../InputTypes/Range','../InputTypes/Concept', '../InputTypes/Text'], function (ko, Range, Concept, Text) {

	function ConditionOccurence(data) {
		var self = this;
		data = data || {};

		// General Condition Occurence Criteria

		// Verbatim fields
		self.CodesetId = ko.observable(data.CodesetId);

		self.OccurrenceStartDate = ko.observable(data.OccurrenceStartDate && new Range(data.OccurrenceStartDate));
		self.DeathType = ko.observable(data.DeathType && ko.observableArray(data.DeathType.map(function (d) {
			return new Concept(d);
		})));
		self.DeathSourceConcept = ko.observable(data.CauseSourceConcept && ko.observable(data.CauseSourceConcept));
		// Derived Fields
		self.Age = ko.observable(data.Age && new Range(data.Age));

		// Linked Fields
		self.Gender = ko.observable(data.Gender && ko.observableArray(data.Gender.map(function (d) {
			return new Concept(d);
		})));

	  /* Do we still need prior enroll days inside the individual criteria?
		self.PriorEnrollDays = ko.observable((typeof data.PriorEnrollDays == "number") ? data.PriorEnrollDays : null);
		self.AfterEnrollDays = ko.observable((typeof data.AfterEnrollDays == "number") ? data.AfterEnrollDays : null);
		*/
	}

	ConditionOccurence.prototype.toJSON = function () {
		return this;
	}

	return ConditionOccurence;

});