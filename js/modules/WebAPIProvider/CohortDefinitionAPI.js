define(function (require, exports) {

	var $ = require('jquery');
	var config = require('appConfig');
	
	function pruneJSON(key, value) {
		if (value === 0 || value) {
			return value;
		} else {
			return
		}
	}
	
	function getCohortDefinitionList() {
		var promise = $.ajax({
			url: config.webAPIRoot + 'cohortdefinition/'
		});
		return promise;
	}
	
	function saveCohortDefinition(definition) {
		var savePromise = $.ajax({
			url: config.webAPIRoot + 'cohortdefinition/' + (definition.id || ""),
			method: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify(definition),
			error: function (error) {
				console.log("Error: " + error);
			}
		});
		return savePromise;
	}
	
	function getCohortDefinition(id) {
		var loadPromise = $.ajax({
			url: config.webAPIRoot + 'cohortdefinition/' + id,
			error: function (error) {
				console.log("Error: " + error);
			}
		});
		return loadPromise;	
	}
	
	function getSql(expression, options) {
		var getSqlPromise = $.ajax({
			url: config.webAPIRoot + 'cohortdefinition/sql',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				expression: expression,
				options: options
			}),
			error: function (error) {
				console.log("Error: " + error);
			}
		});	
		return getSqlPromise;
	}
	
	function generate(cohortDefinitionId) {
		var generatePromise = $.ajax({
			url: config.webAPIRoot + 'cohortdefinition/' + (cohortDefinitionId || '-1') + '/generate',
			error: function (error) {
				console.log("Error: " + error);
			}
		});
		return generatePromise;
	}

	function getInfo(cohortDefinitionId) {
		var infoPromise = $.ajax({
			url: config.webAPIRoot + 'cohortdefinition/' + (cohortDefinitionId || '-1') + '/info',
			error: function (error) {
				console.log("Error: " + error);
			}
		});
		return infoPromise;
	}
	
	
	var api = {
		getCohortDefinitionList: getCohortDefinitionList,
		saveCohortDefinition: saveCohortDefinition,
		getCohortDefinition: getCohortDefinition,
		getSql: getSql,
		generate: generate,
		getInfo: getInfo
	}

	return api;
});