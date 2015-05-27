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
		defaultSource = sources[0]; // use this source for all vocab calls
		
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

	var api = {
		loaded: loadedPromise,
		search: search,
		getDomains: getDomains,
		getConcept: getConcept
	}

	return api;
});