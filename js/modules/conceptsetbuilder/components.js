define(function (require, exports) {
	
	var ko = require('knockout')
	
	var conceptSetBuilder = require('./components/ConceptSetBuilder');
	ko.components.register('concept-set-builder', conceptSetBuilder);
	
});