define(function (require, exports) {

	var $ = require('jquery');
	var config = require('appConfig');
	var sourceAPI = require('webapi/SourceAPI');
	
	var loadedPromise = $.Deferred();
	loadedPromise.resolve();

	var defaultSource;
	var domainPromise = $.Deferred();
	var domains = [];	
	
	sourceAPI.getSources().then(function(sources) {
		// find the source which has a Vocabulary Daimon with priority = 1
		var prioritySources = sources.filter(function(source) { return source.daimons.filter(function (daimon) { return daimon.daimonType == "Vocabulary" && daimon.priority == "1"}).length > 0 }); 
		if (prioritySources.length > 0)
			defaultSource = prioritySources[0];
		else // find the first vocabulary or CDM daimon
			defaultSource = sources.filter(function(source) { return source.daimons.filter(function (daimon) { return daimon.daimonType == "Vocabulary" || daimon.daimonType == "CDM"}).length > 0 })[0];
		
		// preload domain list once for all future calls to getDomains()
		$.ajax({
			url: config.webAPIRoot + defaultSource.sourceKey + '/' + 'vocabulary/domains',
		}).then(function (results){
			$.each(results, function(i,v) {
				domains.push(v.DOMAIN_ID);
			});
			domainPromise.resolve(domains);			
		});		
	})
	
	function search(searchString, options) {
		var deferred = $.Deferred();
		
		var search = {
			QUERY : searchString,
			DOMAIN_ID : options.domains,
			INVALID_REASON: 'V'
		}
		
		$.ajax({
			url: config.webAPIRoot + defaultSource.sourceKey + '/' + 'vocabulary/search',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(search),
			success: function(results) {
				deferred.resolve(results)
			}
		});
				
		return deferred.promise();
	}

	function getDomains() {
		// this is initliazed once for all calls
		return domainPromise;
	}
	
	function getConcept(id) {
		var getConceptPromise = $.ajax({
			url: config.webAPIRoot + defaultSource.sourceKey + '/' + 'vocabulary/concept/' + id
		});
		
		return getConceptPromise;
	}
	
	function getConceptSetList(url)
	{
		var repositoryUrl;
		
		if (!url)
			repositoryUrl = url + 'conceptset/';
		else
			repositoryUrl = config.webAPIRoot + 'conceptset/';
		
		var getConceptSetListPromise = $.ajax({
			url: repositoryUrl
		});

		return getConceptSetListPromise;
	}
	
	function getConceptSetExpression(id, url)
	{
		if (!url)
			repositoryUrl = url + 'conceptset/';
		else
			repositoryUrl = config.webAPIRoot + 'conceptset/';

		repositoryUrl += id + '/expression';
		
		var getConceptSetPromise = $.ajax({
			url: repositoryUrl
		});
		
		return getConceptSetPromise;
	}
	

	var api = {
		loaded: loadedPromise,
		search: search,
		getDomains: getDomains,
		getConcept: getConcept,
		getConceptSetList: getConceptSetList,
		getConceptSetExpression: getConceptSetExpression
	}

	return api;
});