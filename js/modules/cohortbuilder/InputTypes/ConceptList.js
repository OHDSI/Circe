define(['knockout', './Concept'], function (ko, Concept) {

	function ConceptList(data) {
		var self = this;
		data = data || {};
		self.Concepts = ko.observableArray(data.Concepts && data.Concepts.map(function (d) { return new Concept(d); }));
	}

	return ConceptList;
});

// TODO: no longer need this wrapper 