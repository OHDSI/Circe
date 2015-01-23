define(['knockout', 'text!./CodesetBuilderTemplate.html', '../InputTypes/Codeset','css!../css/buttons.css', 'css!../css/tabs.css'], function (ko, codesetBuilderTemplate, Codeset) {

	function CodesetBuilderViewModel(params) {
		var self = this;
		
		self.Codesets = params.Codesets;
		self.selectedCodeset = ko.observable();
		
		self.addCodeset = function()
		{
			var newCodeset = new Codeset();
			newCodeset.Id = self.Codesets().length > 0 
				? Math.max.apply(null, self.Codesets().map(function(d) { return d.Id; })) + 1
				: 0;
			self.Codesets.push(newCodeset);
			self.selectedCodeset(newCodeset);
		}
		
		self.removeCodeset = function()
		{
			self.Codesets.remove(self.selectedCodeset());
		}
	}

	// return compoonent definition
	return {
		viewModel: CodesetBuilderViewModel,
		template: codesetBuilderTemplate
	};
});