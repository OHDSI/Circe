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

		function dirtyFlag(root, isInitiallyDirty) {
			var result = function() {},
					_initialState = ko.observable(ko.toJSON(root,pruneJSON)),
					_isInitiallyDirty = ko.observable(isInitiallyDirty);

			result.isDirty = ko.pureComputed(function() {
					return _isInitiallyDirty() || _initialState() !== ko.toJSON(root,pruneJSON);
			}).extend({rateLimit: 500});;

			result.reset = function() {
					_initialState(ko.toJSON(root));
					_isInitiallyDirty(false);
			};

			return result;
		}

	
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
			self.dirtyFlag = ko.observable();
			self.isRunning = ko.pureComputed(function () {
				return (self.info() && self.info().status != "COMPLETE");
			});
			self.isSaveable = ko.pureComputed(function() {
				return self.dirtyFlag() && self.dirtyFlag().isDirty() && self.isRunning(); 
			});
			self.sqlOptions = ko.observable();
			
			// model behaviors
			
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

			self.selectDefinition = function (definitionTableItem) {
				self.open(definitionTableItem.id);
			};
			
			self.open = function (id) {
				var currentId = self.selectedDefinition() && self.selectedDefinition().id();
				
				chortDefinitionAPI.getCohortDefinition(id).then(function(definition) {
					definition.expression = JSON.parse(definition.expression);
					var definition = new CohortDefinition(definition);
					self.dirtyFlag(new dirtyFlag(definition));
					self.selectedDefinition(definition);
					self.selectedView("detail");
					if (currentId != id)
					{				
						setTimeout(function() {
							self.editorWidget().tabWidget().tabs("option", "active", 0); // index 0 is the Expression tab
						},0);
					}
				}).then(function() {
					pollForInfo();
				});
			};
			
			self.save = function () {
				clearTimeout(pollTimeout);

				var definition = ko.toJS(self.selectedDefinition());

				// for saving, we flatten the expresson JS into a JSON string
				definition.expression = ko.toJSON(definition.expression, pruneJSON);
				
				// reset view after save
				chortDefinitionAPI.saveCohortDefinition(definition).then(function(result) {
					console.log("Saved...");
					self.open(result.id);
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
				
				if (self.dirtyFlag().isDirty() && !confirm("Changes are not saved. Would you like to continue?"))
				{
					return;
				};
				
				clearTimeout(pollTimeout);
				self.refreshList().then(function () {
					console.log("Refreshed...");
					self.selectedDefinition(null);
					self.info(null);
					self.selectedView("list");
				});
			}

			self.newDefinition = function () {
				var newDefinition = new CohortDefinition({
					"Title": "New Definition",
					"Type": "SIMPLE_DEFINITION"
				});
				
				self.dirtyFlag(new dirtyFlag(newDefinition, true));
				self.selectedDefinition(newDefinition);
				self.selectedView("detail");
				setTimeout(function() {
					self.editorWidget().tabWidget().tabs("option", "active", 1); // index 1 is the Concept Set tab	
				},0);
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