define(['knockout'], function (ko) {

	function Concept(data) {
		var self = this;
		data = data || {};

		self.CONCEPT_ID = data.CONCEPT_ID;
		self.CONCEPT_NAME = data.CONCEPT_NAME;
		self.CONCEPT_CODE = data.CONCEPT_CODE;
		self.DOMAIN_ID = data.DOMAIN_ID;
		self.VOCABULARY_ID = data.VOCABULARY_ID;
	}

	return Concept;
});