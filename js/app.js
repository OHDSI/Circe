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
			
			var pollTimeout = null;
			
			function pollForInfo() {
				chortDefinitionAPI.getInfo(self.selectedDefinition().id()).then(function(info) {
					self.info(info);
					if (info && info.status != "COMPLETE")
					{
						pollTimeout = setTimeout(function () {
							pollForInfo();
						},5000);
					}
				});
			}
											 
			var self = this;

			// model state
			self.selectedDefinition = ko.observable();
			self.definitions = ko.observableArray();
			self.selectedView = ko.observable("");
			self.isGeneratedOpen = ko.observable(false);
			self.generatedSql = {};
			self.info = ko.observable();
			self.editorWidget = ko.observable();

			// model behaviors
			self.selectDefinition = function (definitionTableItem) {
				chortDefinitionAPI.getCohortDefinition(definitionTableItem.id).then(function(definition) {
					definition.expression = JSON.parse(definition.expression);
					self.selectedDefinition(new CohortDefinition(definition));
					self.selectedView("detail");
				}).then(function() {
					pollForInfo();
				});
			};

			self.sqlOptions = ko.observable();
			
			self.showSql = function () {
				self.generatedSql.mssql = null;
				self.generatedSql.oracle = null;
				self.generatedSql.postgres = null;
				self.generatedSql.redshift = null;
				

				var expression = ko.toJS(self.selectedDefinition().expression, pruneJSON);
				var options = ko.toJS(self.sqlOptions);
				
				var templateSqlPromise = chortDefinitionAPI.getSql(expression, options);

				templateSqlPromise.then(function (result) {
					
					var mssqlTranslatePromise = translateSql(result.templateSql, 'sql server');
					mssqlTranslatePromise.then(function (result) {
						self.generatedSql.mssql = result.targetSQL;
					});

					var oracleTranslatePromise = translateSql(result.templateSql, 'oracle');
					oracleTranslatePromise.then(function (result) {
						self.generatedSql.oracle = result.targetSQL;
					});

					var postgresTranslatePromise = translateSql(result.templateSql, 'postgresql');
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
				clearTimeout(pollTimeout);

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
				clearTimeout(pollTimeout);
				// add check for changes without saving, prompt to confirm
				self.selectedDefinition(null);
				self.selectedView("list");
			}

			self.newDefinition = function () {
				var newDefinition = new CohortDefinition({
					"Title": "New Definition",
					"Type": "SIMPLE_DEFINITION"
				});

				self.selectedDefinition(newDefinition);
				self.selectedView("detail");
			}

			self.addSqlOptions = function() {
				self.sqlOptions({ 
					cdmSchema: ko.observable(""),
					targetSchema: ko.observable(""),
					targetTable: ko.observable(""),
					cohortId: ko.observable(""),
				});
			}
			
			self.removeSqlOptions = function()  {
				self.sqlOptions(null);	
			}
			
			self.generate = function() {
				var generatePromise = chortDefinitionAPI.generate(self.selectedDefinition().id());
				generatePromise.then(function (result) {
					pollForInfo();
				});
			}
			
			self.getExpressionJSON = function () {
				return ko.toJSON(self.selectedDefinition().Expression, pruneJSON, 2)
			}
		}
	});