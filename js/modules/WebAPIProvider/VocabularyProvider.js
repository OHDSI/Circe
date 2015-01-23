define(function (require, exports) {

	var $ = require('jquery');
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
			url: 'http://localhost:8084/WebAPI/vocabulary/search',
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
			url: 'http://localhost:8084/WebAPI/vocabulary/domains',
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

	var api = {
		loaded: loadedPromise,
		search: search,
		getDomains: getDomains,
	}

	return api;
});