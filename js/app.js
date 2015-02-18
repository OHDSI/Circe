define(['knockout',
				'appConfig',
				'cohortbuilder/CohortDefinition',
				'cohortbuilder/samples',
				'cohortbuilder/components',
				'knockout-jqueryui/tabs',
				'cohortbuilder/bindings/datatableBinding'
			 ],
	function (
		ko,
		config,
		CohortDefinition,
		samples) {

		function translateSql(sql, dialect) {
			translatePromise = $.ajax({
				url: config.webAPIRoot + 'sqlrender/translate',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({
					SQL: sql,
					targetdialect: dialect
				}),
				error: function (error) {
					console.log("Error: " + error);
				}
			});
			return translatePromise;
		}

		return function App() {
			var self = this;

			// model state
			self.selectedDefinition = ko.observable();
			self.definitions = ko.observableArray(samples.list.map(function (d) {
				return new CohortDefinition(d);
			}));
			self.plainDefinitions = ko.computed(function() {
				return self.definitions().map(function(item) { return { Id: item.Id, Title: item.Title, Description: item.Description, Type: item.Type, Definition: item}; });
			});
			
			self.selectedView = ko.observable("");
			self.isGeneratedOpen = ko.observable(false);
			self.generatedSql = {};

			// model behaviors
			self.selectDefinition = function (definitionTableItem) {
				self.selectedDefinition(definitionTableItem.Definition);
				self.selectedView("detail");
			};

			self.generate = function () {
				self.generatedSql.mssql = null;
				self.generatedSql.oracle = null;
				self.generatedSql.postgres = null;
				self.generatedSql.redshift = null;

				var templateSqlPromise = $.ajax({
					url: config.webAPIRoot + 'cohortdefinition/generate',
					method: 'POST',
					contentType: 'application/json',
					data: JSON.stringify({
						expression: ko.toJS(self.selectedDefinition().Expression, function (key, value) {
							if (value === 0 || value) {
								return value;
							} else {
								return
							}
						}, 2),
						options: {
							targetTable: "testCohort"
						}
					}),
					error: function (error) {
						console.log("Error: " + error);
					}
				});

				templateSqlPromise.then(function (result) {
					var mssqlTranslatePromise = translateSql(result.templateSql, 'sql server');
					mssqlTranslatePromise.then(function (result) {
						self.generatedSql.mssql = result.targetSQL;
					});

					var oracleTranslatePromise = translateSql(result.templateSql, 'oracle');
					oracleTranslatePromise.then(function (result) {
						self.generatedSql.oracle = result.targetSQL;
					});

					var postgresTranslatePromise = translateSql(result.templateSql, 'postgres');
					postgresTranslatePromise.then(function (result) {
						self.generatedSql.postgres = result.targetSQL;
					});

					var redshiftTranslatePromise = translateSql(result.templateSql, 'redshift');
					redshiftTranslatePromise.then(function (result) {
						self.generatedSql.redshift = result.targetSQL;
					});

					$.when(mssqlTranslatePromise, oracleTranslatePromise, postgresTranslatePromise, redshiftTranslatePromise).then(function () {
						self.isGeneratedOpen(true);
					});
				});
			}

			self.saveAndClose = function () {
				// post ajax call to save definition
				self.selectedDefinition(null);
				self.selectedView("list");
			}

			self.cancel = function () {
				// add check for changes without saving, prompt to confirm
				self.selectedDefinition(null);
				self.selectedView("list");
			}

			self.newDefinition = function () {
				var newDefinition = new CohortDefinition({
					"Title": "New Definition",
					"Type": "SIMPLE_DEFINITION"
				});

				self.definitions.push(newDefinition);
				self.selectedDefinition(newDefinition);
				self.selectedView("detail");
			}

			self.getExpressionJSON = function () {
				return ko.toJSON(self.selectedDefinition().Expression, function (key, value) {
					if (value === 0 || value) {
						return value;
					} else {
						return
					}
				}, 2)
			}



		}
	});