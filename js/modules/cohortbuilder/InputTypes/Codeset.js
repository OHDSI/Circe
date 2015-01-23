define(['knockout'], function (ko) {

	function Codeset(data) {
		var self = this;
		data = data || {};

		self.Id = data.Id;
		self.Name = ko.observable(data.Name || "Unnamed Codeset");
		self.TargetConcepts = ko.observableArray(data.TargetConcepts);
		self.UseDescendents = ko.observable(data.UseDescendents);
		self.Excluded = ko.observableArray(data.Excluded);
		self.ExcludeDescendents = ko.observable(data.ExcludeDescendents);
	}

	return Codeset;
});