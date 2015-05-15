requirejs.config({
	baseUrl: "js",
	packages: [
		{
			name: "databindings",
			location: "modules/databindings"
		}
	],
	paths: {
		"appConfig" : "config",
		"text": "requirejs/plugins/text",
		"css": "requirejs/plugins/css",
		"json": "requirejs/plugins/json",
		"jquery": "http://cdn.rawgit.com/jquery/jquery/1.11.2/dist/jquery.min",
		"jquery-ui": "jqueryui/jquery-ui.min",
		"knockout": "http://cdn.rawgit.com/knockout/knockout/v3.3.0/dist/knockout",
		"cohortbuilder": "modules/cohortbuilder",
		"conceptsetbuilder": "modules/conceptsetbuilder",
		"webapi" : "modules/WebAPIProvider",
		"datatables": "jqueryui/jquery.dataTables.min",
		"vocabularyprovider": "modules/WebAPIProvider/VocabularyProvider",
		"ColVis": "jqueryui/dataTables.colVis.min",
		"databindings/knockout.selectOnFocus": "http://cdn.rawgit.com/One-com/knockout-select-on-focus/v0.1.5/lib/knockout.selectOnFocus"
	},
	deps: ['jquery',
				 'jquery-ui',
				 'jqueryui/jquery.ui.autocomplete.scroll',
				 'css!jqueryui/jquery.dataTables.css',
				 'css!jqueryui/dataTables.colVis.css'
				]
});

require(['knockout', 'app', ], function (ko, App) {
	var circeApp = new App();
	ko.applyBindings(circeApp, document.getElementById('wrapper'));
	circeApp.refreshList().then(function (){
		circeApp.selectedView("list");
	});
	
	$(window).bind('beforeunload', function () {
			if (circeApp.selectedDefinition() && circeApp.dirtyFlag() && circeApp.dirtyFlag().isDirty())
					return "Changes will be lost if you do not save.";	
	});
	
});