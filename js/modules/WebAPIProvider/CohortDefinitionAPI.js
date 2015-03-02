define(function (require, exports) {

	var $ = require('jquery');
	var config = require('appConfig');
	
	function getCohortDefinitionList()
	{
		var promise = $.ajax({
			url: config.webAPIRoot + 'cohortdefinition/'
		});
		return promise;
	}
	
	function saveCohortDefinition(definition)
	{
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
	
	function getCohortDefinition(id)
	{
		var loadPromise = $.ajax({
			url: config.webAPIRoot + 'cohortdefinition/' + id,
			error: function (error) {
				console.log("Error: " + error);
			}
		});
		return loadPromise;	
	}
	
	function generateSql(expression)
	{
	
		return "";
	}
	
	var api = {
		getCohortDefinitionList: getCohortDefinitionList,
		saveCohortDefinition: saveCohortDefinition,
		getCohortDefinition: getCohortDefinition,
		generateSQL: generateSql
	}

	return api;
});