define(['knockout', '../InputTypes/Range','../InputTypes/Concept'], function (ko, Range, Concept) {

	function DrugExposure(data) {
		var self = this;
		data = data || {};

		// General Drug Exposure Criteria

		// Verbatim fields
		self.CodesetId = ko.observable(data.CodesetId);

		self.OccurrenceStartDate = ko.observable(data.OccurrenceStartDate && new Range(data.OccurrenceStartDate));
		self.OccurrenceEndDate = ko.observable(data.OccurrenceEndDate && new Range(data.OccurrenceEndDate));
		self.DrugType = ko.observable(data.DrugType && ko.observableArray(data.DrugType.map(function (d) {
			return new Concept(d);
		})));
		self.StopReason = ko.observable(data.StopReason || null);
		self.Refills = ko.observable(data.Refills || null);
		self.Quantity = ko.observable(data.Quantity || null);
		self.DaysSupply = ko.observable(data.DaysSupply || null);
		self.RouteConcept = ko.observable(data.RouteConcept && ko.observableArray(data.RouteConcept.map(function (d) {
			return new Concept(d);
		})));
		self.EffectiveDrugDose = ko.observable(data.EffectiveDrugDose || null);
		self.DoseUnit = ko.observable(data.DoseUnit && ko.observableArray(data.DoseUnit.map(function (d) {
			return new Concept(d);
		})));
		self.LotNumber = ko.observable(data.LotNumber || null);
		self.DrugSourceConcept = ko.observable(data.DrugSourceConcept && ko.observable(data.DrugSourceConcept));

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

	DrugExposure.prototype.toJSON = function () {
		return this;
	}

	return DrugExposure;

});