define(['knockout'], function (ko) {
	var debug = false;

	function Range(data) {
		var self = this;
		data = data || {};

		self.Value = ko.observable(data.Value === 0 ? 0 : data.Value || null);
		self.Extent = ko.observable(data.Extent === 0 ? 0 : data.Extent || null);
		self.Op = ko.observable(data.Op || 'gt');
	}

	Range.prototype.toJSON = function () {
		return {
			Value : this.Value instanceof Date ? (this.Value.getFullYear() + '-' + (this.Value.getMonth() + 1) + '-' + this.Value.getDate() ) : this.Value,
			Extent: this.Extent instanceof Date ? (this.Extent.getFullYear() + '-' + (this.Extent.getMonth() + 1) + '-' + this.Extent.getDate() ) : this.Extent,
			Op: this.Op
		}
	}
	
	return Range;
});