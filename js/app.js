define(['jquery',
				'knockout',
				'appConfig',
				'cohortbuilder/CohortDefinition',
				'cohortbuilder/CohortExpression',
				'webapi/CohortDefinitionAPI',
				'webapi/SourceAPI',
				'cohortbuilder/components',
				'knockout-jqueryui/tabs',
				'databindings',
				'circe',
				'bindings/jqAutosizeBinding'
			 ],
	function (
		$,
		ko,
		config,
		CohortDefinition,
		CohortExpression,
		chortDefinitionAPI,
		sourceAPI) {

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
				if (pollTimeout)
					clearTimeout(pollTimeout);
				
				chortDefinitionAPI.getInfo(self.selectedDefinition().id()).then(function(infoList) {
					var hasPending = false;
					infoList.forEach(function(info){
						var source = self.sources().filter(function (s) { return s.source.sourceId == info.id.sourceId })[0];
						source.info(info);
						if (info.status != "COMPLETE")
							hasPending = true;
					});
					
					if (hasPending)
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
			self.tabWidget = ko.observable();
			self.conceptSetEditor = ko.observable();
			self.cohortExpressionEditor = ko.observable();
			self.sources = ko.observableArray();
			self.generatedSql = {};
			self.dirtyFlag = ko.observable();
			self.isRunning = ko.pureComputed(function () {
				return self.sources().filter(function (source) {
					return source.info() && source.info().status != "COMPLETE";
				}).length > 0;
			});
			self.isSaveable = ko.pureComputed(function() {
				return self.dirtyFlag() && self.dirtyFlag().isDirty() && self.isRunning(); 
			});
			self.sqlOptions = ko.observable();
			
			self.modifiedJSON = "";			
			self.expressionJSON = ko.pureComputed({
				read: function () {
					return ko.toJSON(self.selectedDefinition().expression(), function (key, value) {if (value === 0 || value ) { return value; } else {return}} , 2);
				},
				write: function(value) {
					self.modifiedJSON = value;
				}
			});
			
			self.router = null;
			
			// model behaviors
			
			self.addConceptSet = function(item) {
				self.tabWidget().tabs("option", "active", 1); // index 1 is the Concept Set Tab.
				var fieldObservable = item.CodesetId;
				var newConceptId = self.conceptSetEditor().createConceptSet().id;
				fieldObservable(newConceptId);
			}
		
			self.reload = function() {
				var updatedExpression = JSON.parse(self.modifiedJSON);
				self.selectedDefinition().expression(new CohortExpression(updatedExpression));
			}			
			
			self.showSql = function () {
				self.generatedSql.mssql = null;
				self.generatedSql.oracle = null;
				self.generatedSql.postgres = null;
				self.generatedSql.redshift = null;
				self.generatedSql.msaps = null;
				

				var expression = ko.toJS(self.selectedDefinition().expression, pruneJSON);
				var options = ko.toJS(self.sqlOptions);
				
				var templateSqlPromise = chortDefinitionAPI.getSql(expression, options);

				templateSqlPromise.then(function (result) {
					
					var mssqlTranslatePromise = translateSql(result.templateSql, 'sql server');
					mssqlTranslatePromise.then(function (result) {
						self.generatedSql.mssql = result.targetSQL;
					});

					var msapsTranslatePromise = translateSql(result.templateSql, 'pdw');
					msapsTranslatePromise.then(function (result) {
						self.generatedSql.msaps = result.targetSQL;
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

					$.when(mssqlTranslatePromise, msapsTranslatePromise, oracleTranslatePromise, postgresTranslatePromise, redshiftTranslatePromise).then(function () {
						self.isGeneratedOpen(true);
					});
				});
			}

			self.selectDefinition = function (definitionTableItem) {
				window.location.hash = '/' + definitionTableItem.id; 
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
							self.tabWidget().tabs("option", "active", 0); // index 0 is the Expression tab
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
					if (!definition.id) // reset route to new ID
						self.router.setRoute('/' + result.id);
					else // reload saved study
						self.open(definition.id);
				});
			}

			self.copy = function () {
				clearTimeout(pollTimeout);

				// reset view after save
				chortDefinitionAPI.copyCohortDefinition(self.selectedDefinition().id()).then(function(result) {
					console.log("Copied...");
					self.open(result.id);
				});
			}
			
			self.delete = function () {
				clearTimeout(pollTimeout);

				// reset view after save
				chortDefinitionAPI.deleteCohortDefinition(self.selectedDefinition().id()).then(function(result) {
					console.log("Deleted...");
					self.refreshList().then(function () {
						console.log("Refreshed...");
						self.selectedDefinition(null);
						self.sources().forEach(function (source) {
							source.info(null);
						});
						self.router.setRoute("/");
					});
				});
			}			
			
			self.refreshList = function() {
				var refreshPromise = chortDefinitionAPI.getCohortDefinitionList();
				refreshPromise.then(function(definitionList) {
					var filteredList = definitionList.filter(function (def) {
						return def.expressionType == "SIMPLE_EXPRESSION";
					});
					self.definitions(filteredList);
				});
				return refreshPromise;
			}
			
			self.list = function () {
				
				if (self.dirtyFlag() && self.dirtyFlag().isDirty() && !confirm("Changes are not saved. Would you like to continue?"))
				{
					return;
				};
				
				clearTimeout(pollTimeout);
				self.refreshList().then(function () {
					console.log("Refreshed...");
					self.selectedDefinition(null);
					self.sources().forEach(function (source) {
						source.info(null);
					});
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
					self.tabWidget().tabs("option", "active", 1); // index 1 is the Concept Set Tab.
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
			
			self.onGenerate = function(generateComponent) {
				var generatePromise = chortDefinitionAPI.generate(self.selectedDefinition().id(), generateComponent.source.sourceKey);
				generatePromise.then(function (result) {
					pollForInfo();
				});
			}			
			
			self.getExpressionJSON = function () {
				return ko.toJSON(self.selectedDefinition().Expression, pruneJSON, 2)
			}
			
			self.routes = {
				'' : self.list,
				'/new': self.newDefinition,				
				'/:id': self.open
			};
			
			// startup actions

			sourceAPI.getSources().then(function(sources) {
				var sourceList = [];
				sources.forEach(function(source) {
					if (source.daimons.filter(function (daimon) { return daimon.daimonType == "CDM"; }).length > 0
							&& source.daimons.filter(function (daimon) { return daimon.daimonType == "Results"; }).length > 0)
					{
						sourceList.push({
							source: source,
							info: ko.observable()
						});
					}
				});
				self.sources(sourceList);
			});
		}
	});