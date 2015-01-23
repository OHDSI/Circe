define(['knockout'], function (ko) {

	function Concept(data) {
		var self = this;
		data = data || {};

		self.Id = data.Id;
		self.Name = data.Name;
	}

	return Concept;
});