define(['knockout', '../InputTypes/Range','../InputTypes/Concept'], function (ko, Range, Concept) {

	function ConditionOccurence(data) {
		var self = this;
		data = data || {};

		// General Condition Occurence Criteria

		// Verbatim fields
		self.CodesetId = ko.observable(data.CodesetId);

		self.OccurrenceStartDate = ko.observable(data.OccurrenceStartDate && new Range(data.OccurrenceStartDate));
		self.ProcedureType = ko.observable(data.ProcedureType && ko.observableArray(data.ProcedureType.map(function (d) {
			return new Concept(d);
		})));
		
		self.Modifier = ko.observable(data.Modifier && ko.observableArray(data.Modifier.map(function (d) {
			return new Concept(d);
		})));
		
		self.Quantity = ko.observable(data.Quantity && new Range(data.Quantity));
		
		self.ProcedureSourceConcept = ko.observable(data.ProcedureSourceConcept && ko.observable(data.ProcedureSourceConcept));

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