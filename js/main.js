require.config({
	baseUrl: "js",
	paths: {
		"appConfig" : "config",
		"text": "requirejs/plugins/text",
		"css": "requirejs/plugins/css",
		"json": "requirejs/plugins/json",
		"jquery": "jquery-1.11.1.min",
		"jquery-ui": "jqueryui/jquery-ui.min",
		"knockout": "knockout-3.3.0",
		"cohortbuilder": "modules/cohortbuilder",
		"webapi" : "modules/WebAPIProvider",
		"datatables": "jqueryui/jquery.dataTables.min",
		"vocabularyprovider": "modules/WebAPIProvider/VocabularyProvider",
		"ColVis": "jqueryui/dataTables.colVis.min"
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