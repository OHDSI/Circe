define(function (require, exports) {

	var $ = require('jquery');
	var config = require('appConfig');
	
	var loadedPromise = $.Deferred();
	loadedPromise.resolve();

	function search(searchString, options) {
		var deferred = $.Deferred();
		
		var search = {
			QUERY : searchString,
			DOMAIN_ID : options.domains,
			INVALID_REASON: 'V'
		}
		
		$.ajax({
			url: config.webAPIRoot + 'vocabulary/search',
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
		var domainPromise = $.Deferred();
		
		$.ajax({
			url: config.webAPIRoot + 'vocabulary/domains',
			success: function(results) {
				var domains = [];
				$.each(results, function(i,v) {
					domains.push(v.DOMAIN_ID);
				});
				domainPromise.resolve(domains);
			}
		});
			
		return domainPromise;
	}
	
	function getConcept(id) {
		var getConceptPromise = $.ajax({
			url: config.webAPIRoot + 'vocabulary/concept/' + id
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