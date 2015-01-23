define(['knockout', '../InputTypes/Range'], function (ko, Range) {

	function DrugEra(data) {
		var self = this;
		data = data || {};

		// General Condition Occurence Criteria

		// Verbatim fields
		self.CodesetId = ko.observable(data.CodesetId);

		self.EraStartDate = ko.observable(data.OccurrenceStartDate && new Range(data.OccurrenceStartDate));
		self.EraEndDate = ko.observable(data.OccurrenceEndDate && new Range(data.OccurrenceEndDate));
		self.OccurrenceCount = ko.observable(data.OccurrenceCount && new Range(data.OccurrenceCount));
		self.GapDays = ko.observable(data.GapDays && new Range(data.GapDays));
		self.EraLength = ko.observable(data.EraLength && new Range(data.EraLength));

		// Derived Fields
		self.First = ko.observable(data.First || null);
		self.AgeAtStart = ko.observable(data.AgeAtStart && new Range(data.AgeAtStart));
		self.AgeAtEnd = ko.observable(data.AgeAtEnd && new Range(data.AgeAtEnd));

		// Linked Fields
		self.Gender = ko.observable(data.Gender && ko.observableArray(data.Gender.map(function (d) {
			return new Concept(d);
		})));
	}

	DrugEra.prototype.toJSON = function () {
		return this;
	}
	return DrugEra;
});