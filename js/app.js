define(['knockout', 'appConfig', 'cohortbuilder/CohortDefinition', 'cohortbuilder/samples', 'cohortbuilder/components'], function (ko, config, CohortDefinition, samples) {

	return function App() {
		var self = this;
		self.selectedDefinition = ko.observable();
		self.sampleDefinitions = ko.observableArray(samples.list.map(function (d) {
			return new CohortDefinition(d);
		}));

		self.generate = function() {
			$.ajax({
				url: config.webAPIRoot + 'cohortdefinition/generate',
				method: 'POST',
				contentType: 'application/json',
				data: self.getExpressionJSON(),
				success: function(results) {
					console.log(results);
					self.generatedSql(results.targetSQL);
					self.isGeneratedOpen(true);
				},
				error: function(error) {
					console.log("Error: " + error);
				}
			});
		}
		
		self.isGeneratedOpen = ko.observable(false);
		self.generatedSql = ko.observable();
		
		self.newDefinition = function () {
			var newDefinition = new CohortDefinition({
				"Title": "New Definition",
				"Type": "SIMPLE_DEFINITION"
			});

			self.sampleDefinitions.push(newDefinition);
			self.selectedDefinition(newDefinition);
		}

		self.getExpressionJSON = function()
		{
			return ko.toJSON(self.selectedDefinition().Expression, function (key, value) {if (value === 0 || value ) { return value; } else {return}} , 2)				
		}		
		
	}
});