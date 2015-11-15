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
		},
		{
			name: "cohortdefinitionviewer",
			location: "modules/cohortdefinitionviewer"
		}
	],
	paths: {
		"appConfig" : "config",
		"text": "requirejs/plugins/text",
		"css": "requirejs/plugins/css",
		"json": "requirejs/plugins/json",
		"jquery": "//code.jquery.com/jquery-1.11.2",
		"jquery-ui": "//code.jquery.com/ui/1.11.4/jquery-ui.min",
		"knockout": "//cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min",
		"director": "//cdnjs.cloudflare.com/ajax/libs/Director/1.2.8/director.min",
		"cohortbuilder": "modules/cohortbuilder",
		"conceptsetbuilder": "modules/conceptsetbuilder",
		"conceptpicker": "modules/conceptpicker",
		"webapi" : "modules/WebAPIProvider",
		"datatables": "//cdn.datatables.net/1.10.10/js/jquery.dataTables.min",
		"vocabularyprovider": "modules/WebAPIProvider/VocabularyProvider",
		"ColVis": "jqueryui/dataTables.colVis.min"
	},
	shim: { 
		"director": { exports: "Router" } 
	},
	deps: ['jquery',
				 'jquery-ui',
				 'jqueryui/jquery.ui.autocomplete.scroll',
				 'css!//cdn.datatables.net/1.10.10/css/jquery.dataTables.min.css',
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