define(['knockout', '../options', '../CriteriaGroup', '../CriteriaTypes', 'text!./CohortExpressionEditorTemplate.html', 'knockout-jqueryui/tabs', '../bindings/allBindings', 'css!../css/builder.css', 'css!../css/buttons.css'], function (ko, options, CriteriaGroup, criteriaTypes, template) {

	function CohortExpressionEditorViewModel(params) {
		var self = this;

		var primaryCriteriaOptions = [
			{
				text: "Add Condition Criteria",
				selected: false,
				description: "Find patients with specific diagnoses.",
				imageSrc: "images/cohortbuilder/condition.png",
				action: function () {				
					self.expression().PrimaryCriteria.push({
						ConditionOccurrence: new criteriaTypes.ConditionOccurrence
					}); 
				}
			},
			{
				text: "Add Condition Era Criteria",
				selected: false,
				description: "Find patients with specific diagosis era.",
				imageSrc: "images/cohortbuilder/condition.png",
				action: function () {				
					self.expression().PrimaryCriteria.push({
						ConditionEra: new criteriaTypes.ConditionEra
					}); 
				}
			},
			{
				text: "Add Drug Criteria",
				selected: false,
				description: "Find patients with exposure to specific drugs or drug classes.",
				imageSrc: "images/cohortbuilder/drug.png",
				action: function () {				
					self.expression().PrimaryCriteria.push({
						DrugExposure: new criteriaTypes.DrugExposure
					}); 
				}
			},
			{
				text: "Add Drug Era Criteria",
				selected: false,
				description: "Find patients with with exposure to drugs over time.",
				imageSrc: "images/cohortbuilder/drugera.png",
				action: function () {				
					self.expression().PrimaryCriteria.push({
						DrugEra: new criteriaTypes.DrugEra
					}); 
				}
			},
			{
				text: "Add Dose Era Criteria",
				selected: false,
				description: "Find patients with dose eras.",
				imageSrc: "images/cohortbuilder/drugera.png",
				action: function () {				
					self.expression().PrimaryCriteria.push({
						DoseEra: new criteriaTypes.DoseEra
					}); 
				}
			},
			{
				text: "Add Procedure Criteria",
				selected: false,
				description: "Find patients that experienced a specific procedure.",
				imageSrc: "images/cohortbuilder/procedures.png",
				action: function () {				
					self.expression().PrimaryCriteria.push({
						ProcedureOccurrence: new criteriaTypes.ProcedureOccurrence
					}); 
				}
			},
			{
				text: "Add Observation Criteria",
				selected: false,
				description: "Find patients based on lab tests or other observations.",
				imageSrc: "images/cohortbuilder/observation.png",
				action: function () {				
					self.expression().PrimaryCriteria.push({
						Observation: new criteriaTypes.Observation
					}); 
				}
			},
			{
				text: "Add Visit Criteria",
				selected: false,
				description: "Find patients based on visit information.",
				imageSrc: "images/cohortbuilder/visit.png",
				action: function () {				
					self.expression().PrimaryCriteria.push({
						VisitOccurrence: new criteriaTypes.VisitOccurrence
					}); 
				}
			},
			{
				text: "Add Device Criteria",
				selected: false,
				description: "Find patients based on device exposure.",
				imageSrc: "images/cohortbuilder/procedures.png",
				action: function () {				
					self.expression().PrimaryCriteria.push({
						DeviceExposure: new criteriaTypes.DeviceExposure
					}); 
				}
			},
			{
				text: "Add Measurement Criteria",
				selected: false,
				description: "Find patients based on Measurement.",
				imageSrc: "images/cohortbuilder/procedures.png",
				action: function () {				
					self.expression().PrimaryCriteria.push({
						Measurement: new criteriaTypes.Measurement
					}); 
				}
			},
			{
				text: "Add Specimen Criteria",
				selected: false,
				description: "Find patients based on Specimen.",
				imageSrc: "images/cohortbuilder/procedures.png",
				action: function () {				
					self.expression().PrimaryCriteria.push({
						Specimen: new criteriaTypes.Specimen
					}); 
				}
			},
			{
				text: "Add Observation Period Criteria",
				selected: false,
				description: "Find patients based on Observation Period.",
				imageSrc: "images/cohortbuilder/procedures.png",
				action: function () {				
					self.expression().PrimaryCriteria.push({
						ObservationPeriod: new criteriaTypes.ObservationPeriod
					}); 
				}
			},
			{
				text: "Add Death Criteria",
				selected: false,
				description: "Find patients based on device exposure.",
				imageSrc: "images/cohortbuilder/procedures.png",
				action: function () {				
					self.expression().PrimaryCriteria.push({
						Death: new criteriaTypes.Death
					}); 
				}
			}
		];
		
		self.expression = params.expression;
		self.options = options;

		self.removeAdditionalCriteria = function () {
			self.expression().AdditionalCriteria(null);
		};

		self.addAdditionalCriteria = function () {
			self.expression().AdditionalCriteria(new CriteriaGroup());
		};

		self.removePrimaryCriteria = function (criteria)
		{
			self.expression().PrimaryCriteria.remove(criteria);	
		}
		
		
		self.addPrimaryCriteriaOptions = {
			selectText: "Add Primary Criteria...",
			width:225,
			actionOptions: primaryCriteriaOptions,
			onAction: function(data) {
				data.selectedData.action();
			}
		};

		self.getCriteriaIndexComponent = function (data) {
			data = ko.utils.unwrapObservable(data);

			if (data.hasOwnProperty("ConditionOccurrence"))
				return "condition-occurrence-criteria";
			else if (data.hasOwnProperty("ConditionEra"))
				return "condition-era-criteria";
			else if (data.hasOwnProperty("DrugExposure"))
				return "drug-exposure-criteria";
			else if (data.hasOwnProperty("DrugEra"))
				return "drug-era-criteria";
			else if (data.hasOwnProperty("DoseEra"))
				return "dose-era-criteria";
			else if (data.hasOwnProperty("ProcedureOccurrence"))
				return "procedure-occurrence-criteria";
			else if (data.hasOwnProperty("Observation"))
				return "observation-criteria";			
			else if (data.hasOwnProperty("VisitOccurrence"))
				return "visit-occurrence-criteria";			
			else if (data.hasOwnProperty("DeviceExposure"))
				return "device-exposure-criteria";			
			else if (data.hasOwnProperty("Measurement"))
				return "measurement-criteria";
			else if (data.hasOwnProperty("Specimen"))
				return "specimen-criteria";
			else if (data.hasOwnProperty("ObservationPeriod"))
				return "observation-period-criteria";			
			else if (data.hasOwnProperty("Death"))
				return "death-criteria";			
			else
				return "unknownCriteriaType";
		};

		self.getExpressionJSON = function()
		{
			return ko.toJSON(self.expression(), function (key, value) {if (value === 0 || value ) { return value; } else {return}} , 2)				
		}		
	}

	// return factory
	return {
		viewModel: CohortExpressionEditorViewModel,
		template: template
	};
});