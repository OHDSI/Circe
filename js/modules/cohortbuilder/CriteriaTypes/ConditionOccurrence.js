define(['knockout', '../InputTypes/Range','../InputTypes/Concept', '../InputTypes/Text'], function (ko, Range, Concept, Text) {

	function ConditionOccurence(data) {
		var self = this;
		data = data || {};

		// General Condition Occurence Criteria

		// Verbatim fields
		self.CodesetId = ko.observable(data.CodesetId);

		self.OccurrenceStartDate = ko.observable(data.OccurrenceStartDate && new Range(data.OccurrenceStartDate));
		self.OccurrenceEndDate = ko.observable(data.OccurrenceEndDate && new Range(data.OccurrenceEndDate));
		self.ConditionType = ko.observable(data.ConditionType && ko.observableArray(data.ConditionType.map(function (d) {
			return new Concept(d);
		})));
		self.StopReason = ko.observable(data.StopReason && new Text(data.StopReason));
		self.ConditionSourceConcept = ko.observable(data.ConditionSourceConcept && ko.observable(data.ConditionSourceConcept));

		// Derived Fields
		self.First = ko.observable(data.First || null);
		self.Age = ko.observable(data.Age && new Range(data.Age));

		// Linked Fields
		self.Gender = ko.observable(data.Gender && ko.observableArray(data.Gender.map(function (d) {
			return new Concept(d);
		})));

	  /* Do we still need prior enroll days inside the individual criteria?
		self.PriorEnrollDays = ko.observable((typeof data.PriorEnrollDays == "number") ? data.PriorEnrollDays : null);
		self.AfterEnrollDays = ko.observable((typeof data.AfterEnrollDays == "number") ? data.AfterEnrollDays : null);
		*/
	 
		self.ProviderSpecialty = ko.observable(data.ProviderSpecialty && ko.observableArray(data.ProviderSpecialty.map(function (d) {
			return new Concept(d);
		})));
		self.VisitType = ko.observable(data.VisitType && ko.observableArray(data.VisitType.map(function (d) {
			return new Concept(d);
		})));

	}

	ConditionOccurence.prototype.toJSON = function () {
		return this;
	}

	return ConditionOccurence;

});