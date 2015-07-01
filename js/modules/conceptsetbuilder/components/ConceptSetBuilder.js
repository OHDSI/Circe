define([
	'jquery',
	'knockout',
	'text!./ConceptSetBuilderTemplate.html',
	'../InputTypes/ConceptSet',
	'../InputTypes/ConceptSetItem',
	'databindings',
	'css!../css/buttons.css',
	'css!../css/tabs.css'],
	function (
		$,
		ko,
		template,
		ConceptSet,
		ConceptSetItem) {

		function CodesetBuilderViewModel(params) {
			var self = this;

			self.conceptSets = params.conceptSets;
			self.selectedConceptSet = ko.observable();
			self.nameHasFocus = ko.observable();
			self.isImportEnabled = ko.observable(false);
			self.isExportEnabled = ko.observable(false);
			self.importValues = ko.observable();
			self.dtApi = ko.observable(); // store reference to datatable
			params.ref(this); // assign refrence to self to ref's param

			// model behaviors
			self.createConceptSet = function () {
				var newConceptSet = new ConceptSet();
				newConceptSet.id = self.conceptSets().length > 0 ? Math.max.apply(null, self.conceptSets().map(function (d) {
					return d.id;
				})) + 1 : 0;
				self.conceptSets.push(newConceptSet);
				self.selectedConceptSet(newConceptSet);
				self.nameHasFocus(true);
				return newConceptSet;
			}
			
			self.doImport = function() {
				var parsedItems, importedConceptSetItems;
				parsedItems = JSON.parse(self.importValues());
				
				importedConceptSetItems = parsedItems.items.map(function (item) {
					return new ConceptSetItem(item);
				});
				
				self.selectedConceptSet().expression.items(self.selectedConceptSet().expression.items().concat(importedConceptSetItems));
				self.isImportEnabled(false);
			};

			self.deleteConceptSet = function () {
				self.conceptSets.remove(self.selectedConceptSet());
			}

			// concept picker handlers
			self.addConcepts = function (conceptList) {
				var newConceptSetItems = conceptList.map(function (c) {
					return new ConceptSetItem({
						concept: c
					});
				});
				var selectedConceptSetItems = self.selectedConceptSet().expression.items;
				selectedConceptSetItems(selectedConceptSetItems().concat(newConceptSetItems));
			}

			self.removeSelected = function()
			{
				var selectedItems = self.dtApi().getSelectedData();
				self.selectedConceptSet().expression.items.removeAll(selectedItems);
			}
			
			self.renderCheckbox = function (field) {
				return '<span data-bind="click: function(d) { d.' + field + '(!d.' + field + '()); } ,css: { selected: ' + field + '} " class="glyphicon glyphicon-ok"></span>';
			}
			
			self.getConceptSetJson = function()
			{
				if (self.selectedConceptSet())
					return ko.toJSON(self.selectedConceptSet().expression, null, 2);
				else
					return "";
			}
			
		}

		// return compoonent definition
		return {
			viewModel: CodesetBuilderViewModel,
			template: template
		};
	});