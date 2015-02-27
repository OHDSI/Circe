define([], function () {

	var options = {};

	options.dayOptions = ['0', '1', '7', '14', '21', '30', '60', '90', '120', '180', '365', '548', '730', '1095'];
	options.monthOptions = [1, 3, 6, 9, 12, 24, 36];

	options.ageOptions = new Array();
	for (i = 1; i < 100; i++) {
		options.ageOptions.push(i);
	} // intialize age options

	options.quantityOptions = new Array();
	for (i = 0; i < 100; i++) {
		options.quantityOptions.push(i);
	} // intialize quantity options

	options.occurrenceTypeOptions = [{
		id: 1,
		name: 'At Most'
}, {
		id: 0,
		name: 'Exactly'
}, {
		id: 2,
		name: 'At Least'
}];

	options.windowDayOptions = new Array();
	options.windowDayOptions.push({
		label: "All",
		value: " " // ' ' is used to work around an autocomplete issue: when it's set to null or '', the autocomplete uses the label for the value instead of value (annoying)
	});
	for (i = 0; i < options.dayOptions.length; i++) {
		options.windowDayOptions.push({
			label: options.dayOptions[i],
			value: options.dayOptions[i]
		});
	}
	options.windowCoeffOptions = [{
		value: -1,
		name: 'Before'
}, {
		value: 1,
		name: 'After'
}];

	options.occurrenceCountOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	options.groupTypeOptions = [{
		id: 'ALL',
		name: 'All'
}, {
		id: 'ANY',
		name: 'Any'
}];
	
	options.resultLimitOptions = [{
				name: "All Events",
				id: "All"
		}, {
				name: "Earliest Event",
				id: "First"
		}, {
				name: "Latest Event",
				id: "Last"
		}];
	
	return options;
});