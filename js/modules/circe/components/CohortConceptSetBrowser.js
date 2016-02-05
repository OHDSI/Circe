define(['knockout', 'text!./CohortConceptSetBrowserTemplate.html', 'vocabularyprovider', 'appConfig', 'conceptsetbuilder/InputTypes/ConceptSet', 'databindings'
], function (ko, template, VocabularyProvider, appConfig, ConceptSet) {
	function CohortConcptSetBrowser(params)
	{
		var self = this;
		
		self.criteriaContext = params.criteriaContext;
		self.cohortConceptSets = params.$raw.cohortConceptSets();
		self.onActionComplete = params.onActionComplete;
		
		self.loading = ko.observable(false);
		self.repositoryConceptSets = ko.observableArray();
		
		self.sources = [{ name: 'Cohort Definition', url:null}]
		appConfig.services.forEach(function(service) {
			self.sources.push(service);
		});

		self.selectedSource = ko.observable(self.sources[0]);
		self.sourceSubscription = self.selectedSource.subscribe(function (newSource) {
			if (self.sources.indexOf(newSource) > 0)
			{
				self.loading(true);
				
				VocabularyProvider.getConceptSetList(newSource.url)
					.done(function (results) {
						self.repositoryConceptSets(results);
						self.loading(false);
					})
					.fail(function (err) {
						console.log(err);
					});
			}
		});
		
		// datatable callbacks:
		
		self.selectCohortConceptSet = function(conceptSet)
		{
			console.log(conceptSet);	
			self.criteriaContext().conceptSetId(conceptSet.id);
			self.onActionComplete({action: 'assign', status: 'Success'});
		}

		self.selectRepositoryConceptSet = function (conceptSet) {
			console.log(conceptSet);
			VocabularyProvider.getConceptSetExpression(conceptSet.id, self.selectedSource())
				.done(function (result) {
					var newId = self.cohortConceptSets().length > 0 ? Math.max.apply(null, self.cohortConceptSets().map(function (d) {
						return d.id;
					})) + 1 : 0;
					
					var newConceptSet = new ConceptSet({id: newId, name: conceptSet.name, expression: result});
					self.cohortConceptSets.push(newConceptSet);
					self.criteriaContext() && self.criteriaContext().conceptSetId(newConceptSet.id);
					self.onActionComplete({
						action: 'load',
						status: 'Success'
					});
				})
				.fail(function (err) {
					console.log(err);
				});
			}
		
		self.addConceptSet = function()
		{
			self.onActionComplete({ action: 'add', status: 'Success'});
		}
		
		// dispose subscriptions
		self.dispose = function()
		{
			self.sourceSubscription.dispose();
		}
		
	}
	
	var component = {
		viewModel: CohortConcptSetBrowser,
		template: template
	};

	return component;
});