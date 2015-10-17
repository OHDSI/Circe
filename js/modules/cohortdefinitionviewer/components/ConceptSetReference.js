define(['knockout','text!./ConceptSetReferenceTemplate.html'], function (ko, template) {

	function ConceptSetReference(params) {
		var self = this;
		self.conceptSetId =params.conceptSetId;
		self.conceptSets = params.conceptSets;
		self.defaultName = params.defaultName;
		
		self.referenceId = ko.pureComputed(function () {
			var calculatedRefId = "";
			if (self.conceptSetId() != null)
			{
				var selectedConceptSet = self.conceptSets().filter(function(item) { return item.id == self.conceptSetId(); })[0];
				calculatedRefId = (self.conceptSets.sorted().indexOf(selectedConceptSet) + 1) + "";
			}
			return calculatedRefId;
		});
		
		self.codesetName = ko.pureComputed(function () {
			if (self.conceptSetId() != null)
			{
				var selectedConceptSet = self.conceptSets().filter(function (item) { return item.id == self.conceptSetId()})[0];
				return ko.utils.unwrapObservable(selectedConceptSet.name);
			}
			else
				return self.defaultName;
		});
	}
	
	// return compoonent definition
	return {
		viewModel: ConceptSetReference,
		template: template
	};
});