define(['knockout'], function (ko) {

	function Window(data) {
		var self = this;
		data = data || {};

		self.Start = {
			Days: ko.observable((data.Start && data.Start.Days) || null),
			Coeff: ko.observable((data.Start && data.Start.Coeff) || -1)
		};
		
		self.End = {
			Days: ko.observable((data.End && data.End.Days) || null),
			Coeff: ko.observable((data.End && data.End.Coeff) || 1)
		};
	}

	return Window;
});