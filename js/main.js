requirejs.config({
	baseUrl: "js",
	packages: [
		{
			name: "databindings",
			location: "modules/databindings"
		},
		{
			name: "circe",
			location: "modules/circe"
		}
	],
	paths: {
		"appConfig" : "config",
		"text": "requirejs/plugins/text",
		"css": "requirejs/plugins/css",
		"json": "requirejs/plugins/json",
		"jquery": ["http://cdn.rawgit.com/jquery/jquery/1.11.2/dist/jquery.min","jquery-1.11.1.min"],
		"jquery-ui": "jqueryui/jquery-ui.min",
		"knockout": ["http://cdn.rawgit.com/knockout/knockout/v3.3.0/dist/knockout","knockout-3.3.0"],
		"director": "director.1.2.6.min",
		"cohortbuilder": "modules/cohortbuilder",
		"conceptsetbuilder": "modules/conceptsetbuilder",
		"webapi" : "modules/WebAPIProvider",
		"datatables": "jqueryui/jquery.dataTables.min",
		"vocabularyprovider": "modules/WebAPIProvider/VocabularyProvider",
		"ColVis": "jqueryui/dataTables.colVis.min"
	},
	shim: { 
		"director": { exports: "Router" } 
	},
	deps: ['jquery',
				 'jquery-ui',
				 'jqueryui/jquery.ui.autocomplete.scroll',
				 'css!jqueryui/jquery.dataTables.css',
				 'css!jqueryui/dataTables.colVis.css'
				]
});

require(['knockout', 'app', 'director' ], function (ko, App, Router) {
	var circeApp = new App();
	ko.applyBindings(circeApp, document.getElementById('wrapper'));
	
	var router = Router(circeApp.routes);
	circeApp.router = router;
	router.init('/');

	$(window).bind('beforeunload', function () {
			if (circeApp.selectedDefinition() && circeApp.dirtyFlag() && circeApp.dirtyFlag().isDirty())
					return "Changes will be lost if you do not save.";	
	});
	
});