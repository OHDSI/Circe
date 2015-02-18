require.config({
	baseUrl: "js",
	paths: {
		"appConfig" : "config",
		"text": "requirejs/plugins/text",
		"css": "requirejs/plugins/css",
		"json": "requirejs/plugins/json",
		"jquery": "jquery-1.11.1.min",
		"jquery-ui": "jqueryui/jquery-ui.min",
		"knockout": "knockout-latest.debug",
		"cohortbuilder": "modules/cohortbuilder",
		"datatables": "jqueryui/jquery.dataTables",
		"vocabularyprovider": "modules/WebAPIProvider",
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
	circeApp.selectedView("list");
	
});