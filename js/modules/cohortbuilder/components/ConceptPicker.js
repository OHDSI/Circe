define(['knockout', 'text!./ConceptPickerTemplate.html', '../InputTypes/Concept', 'vocabularyprovider/VocabularyProvider', 'knockout-jqueryui/dialog', 'css!../css/conceptpicker.css'], function (ko, template, Concept, VocabularyProvider) {
	function ConceptPickerViewModel(params) {
		var self = this;

		self.ConceptList = params.$raw.ConceptList();
		self.SelectedDomain = params.DefaultDomain;
		self.DomainOptions = ko.observableArray([params.DefaultDomain]);
		self.MaxResults = params.MaxResults || 10000;
		self.isOpen = ko.observable(false);
		self.results = ko.observableArray();
		self.searchText = params.DefaultQuery || "";
		self.ProviderReady = ko.observable(false);

		VocabularyProvider.getDomains().then(function (domains) {
			self.DomainOptions(domains);
			if (params.DefaultQuery != null)
				self.search();
		});

		VocabularyProvider.loaded.then(function () {
			self.ProviderReady(true);
		});
	};

	// need to add behavior here to add/remove concepts from the selected concepts.	
	ConceptPickerViewModel.prototype.open = function () {
		this.isOpen(true);
	};

	ConceptPickerViewModel.prototype.removeConcept = function (item) {
		this.ConceptList.remove(item);
	};

	ConceptPickerViewModel.prototype.add = function (vm) {
		vm.ConceptList.push.apply(vm.ConceptList, vm.results()
			.filter(function (item) {
				return item.selected() == true
			})
			.map(function (item) {
				return new Concept({
					Id: item.CONCEPT_ID,
					Name: item.CONCEPT_NAME
				})
			})
		);
	};
 
 ConceptPickerViewModel.prototype.addAndClose = function(vm) {
	this.add(vm);
	this.isOpen(false);
 }

	ConceptPickerViewModel.prototype.search = function () {
		var self = this;
		VocabularyProvider.search(this.searchText, {
			domains: [this.SelectedDomain],
			maxResults: this.MaxResults
		})
			.then(function (searchResults) {
				self.results(searchResults.map(function (d) {
					return $.extend({
						selected: ko.observable(false)
					}, d)
				}));
			});
	}

	ConceptPickerViewModel.prototype.searchKeyUp = function (d, e) {
		if (e.keyCode == 13) {
			this.search();
		}
	}

	// return compoonent definition
	return {
		viewModel: ConceptPickerViewModel,
		template: template
	}

});