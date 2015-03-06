define(['knockout',
				'appConfig',
				'cohortbuilder/CohortDefinition',
				'webapi/CohortDefinitionAPI',
				'cohortbuilder/components',
				'knockout-jqueryui/tabs',
				'cohortbuilder/bindings/datatableBinding',
				'bindings/jqAutosizeBinding'
			 ],
	function (
		ko,
		config,
		CohortDefinition,
		chortDefinitionAPI) {

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
		
		function pruneJSON(key, value) {
			if (value === 0 || value) {
				return value;
			} else {
				return
			}
		}

		return function App() {
			var self = this;

			// model state
			self.selectedDefinition = ko.observable();
			self.definitions = ko.observableArray();
			self.selectedView = ko.observable("");
			self.isGeneratedOpen = ko.observable(false);
			self.generatedSql = {};

			// model behaviors
			self.selectDefinition = function (definitionTableItem) {
				chortDefinitionAPI.getCohortDefinition(definitionTableItem.id).then(function(definition) {
					definition.expression = JSON.parse(definition.expression);
					self.selectedDefinition(new CohortDefinition(definition));
					self.selectedView("detail");
				});
			};

			self.generateOptions = ko.observable();
			self.generate = function () {
				self.generatedSql.mssql = null;
				self.generatedSql.oracle = null;
				self.generatedSql.postgres = null;
				self.generatedSql.redshift = null;

				var templateSqlPromise = $.ajax({
					url: config.webAPIRoot + 'cohortdefinition/sql',
					method: 'POST',
					contentType: 'application/json',
					data: JSON.stringify({
						expression: ko.toJS(self.selectedDefinition().expression, pruneJSON, 2),
						options: ko.toJS(self.generateOptions)
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

				var definition = ko.toJS(self.selectedDefinition());

				// for saving, we flatten the expresson JS into a JSON string
				definition.expression = ko.toJSON(definition.expression, pruneJSON);
				
				// reset view after save
				chortDefinitionAPI.saveCohortDefinition(definition).then(function(result) {
					console.log("Saved...");
					return self.refreshList();
				}).then(function () {
					console.log("Refreshed...");
					self.selectedView("list");
				});
			}

			self.refreshList = function() {
				var refreshPromise = chortDefinitionAPI.getCohortDefinitionList();
				refreshPromise.then(function(definitionList) {
					self.definitions(definitionList);
				});
				return refreshPromise;
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

			self.addGenerateOptions = function() {
				self.generateOptions({ 
					cdmSchema: ko.observable(""),
					targetSchema: ko.observable(""),
					targetTable: ko.observable(""),
					cohortId: ko.observable(""),
				});
			}
			
			self.removeGenerateOptions = function()  {
				self.generateOptions(null);	
			}
			
			self.getExpressionJSON = function () {
				return ko.toJSON(self.selectedDefinition().Expression, pruneJSON, 2)
			}
		}
	});