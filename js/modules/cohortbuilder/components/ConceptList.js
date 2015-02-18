define(['knockout','text!./ConceptListTemplate.html', '../InputTypes/Concept'], function (ko, template, Concept) {

	function CocneptListViewModel(params) {
		var self = this;
		self.ConceptList = ko.utils.unwrapObservable(params.$raw.ConceptList);
		self.PickerParams = params.PickerParams;
		
		// onAdd handler
		self.addConcepts = function(concepts) {
			self.ConceptList(self.ConceptList().concat(concepts));
		}
		
		self.removeConcept = function (item) {
			this.ConceptList.remove(item);
		};
		
	}
	
	// return compoonent definition
	return {
		viewModel: CocneptListViewModel,
		template: template
	};
});