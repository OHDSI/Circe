define(['knockout', '../CriteriaTypes','../CriteriaGroup', '../AdditionalCriteria', '../options', 'text!./CriteriaGroupTemplate.html'], function (ko, criteriaTypes, CriteriaGroup, AdditionalCriteria, options, template) {

	function CriteriaGroupViewModel(params) {
		var self = this;

		var addCriteriaActions = [
			{
				text: "Add Condition Filters",
				selected: false,
				description: "Find patients with specific diagnoses.",
				imageSrc: "images/cohortbuilder/condition.png",
				action: function () { self.addConditionCriteria(); }
			},
			{
				text: "Add Condition Era Filters",
				selected: false,
				description: "Find patients with specific diagnosis era.",
				imageSrc: "images/cohortbuilder/condition.png",
				action: function () { self.addConditionEraCriteria(); }
			},
			{
				text: "Add Drug Filters",
				selected: false,
				description: "Find patients with exposure to specific drugs or drug classes.",
				imageSrc: "images/cohortbuilder/drug.png",
				action: function () { self.addDrugExposureCriteria(); }
			},
			{
				text: "Add Drug Era Filters",
				selected: false,
				description: "Find patients with with exposure to drugs over time.",
				imageSrc: "images/cohortbuilder/drugera.png",
				action: function () { self.addDrugEraCriteria(); }
			},
			{
				text: "Add Dose Era Filters",
				selected: false,
				description: "Find patients with dose eras.",
				imageSrc: "images/cohortbuilder/drugera.png",
				action: function () { self.addDoseEraCriteria(); }
			},
			{
				text: "Add Procedure Filters",
				selected: false,
				description: "Find patients that experienced a specific procedure.",
				imageSrc: "images/cohortbuilder/procedures.png",
				action: function () { self.addProcedureCriteria(); }
			},
			{
				text: "Add Observation Filters",
				selected: false,
				description: "Find patients based on lab tests or other observations.",
				imageSrc: "images/cohortbuilder/observation.png",
				action: function () { self.addObservationCriteria(); }
			},
			{
				text: "Add Visit Filters",
				selected: false,
				description: "Find patients based on visit information.",
				imageSrc: "images/cohortbuilder/visit.png",
				action: function () { self.addVisitCriteria(); }
			},
			{
				text: "Add Device Exposure Filters",
				selected: false,
				description: "Find patients based on device exposure.",
				imageSrc: "images/cohortbuilder/procedures.png",
				action: function () { self.addDeviceCriteria(); }
			},
			{
				text: "Add Measurement Filters",
				selected: false,
				description: "Find patients based on Measurements.",
				imageSrc: "images/cohortbuilder/procedures.png",
				action: function () { self.addMeasurementCriteria(); }
			},
			{
				text: "Add Specimen Filters",
				selected: false,
				description: "Find patients based on Specimen.",
				imageSrc: "images/cohortbuilder/procedures.png",
				action: function () { self.addSpecimenCriteria(); }
			},			
			{
				text: "Add Observation Period Filters",
				selected: false,
				description: "Find patients based on Observation Period.",
				imageSrc: "images/cohortbuilder/procedures.png",
				action: function () { self.addObservationPeriodCriteria(); }
			},
			{
				text: "Add Death Filters",
				selected: false,
				description: "Find patients based on death.",
				imageSrc: "images/cohortbuilder/procedures.png",
				action: function () { self.addDeathCriteria(); }
			},
			{
				text: "Add Filter Group",
				selected: false,
				description: "Add a group to combine Filters.",
				imageSrc: "images/cohortbuilder/group.png",
				action: function () { self.addAdditionalCriteria(); }
			}
		];

		self.expression = ko.utils.unwrapObservable(params.expression);
		self.group = params.group;
		self.parentGroup = params.parentGroup;
		self.options = options;

		self.getCriteriaComponent = function (data) {

			if (data.hasOwnProperty("Person"))
				return "person-criteria";
			else if (data.hasOwnProperty("ConditionOccurrence"))
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
			else if (data.hasOwnProperty("VisitOccurrence"))
				return "visit-occurrence-criteria";
			else if (data.hasOwnProperty("Observation"))
				return "observation-criteria";
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
				return "unknown-criteria";
		};

		self.addAdditionalCriteria = function () {
			self.group().Groups.push(new CriteriaGroup());
		};

		self.addConditionCriteria = function () {
			self.group().CriteriaList.push(new AdditionalCriteria({
				Criteria: {
					ConditionOccurrence: {}
				}
			}));
		};

		self.addConditionEraCriteria = function () {
			self.group().CriteriaList.push(new AdditionalCriteria({
				Criteria: {
					ConditionEra: {}
				}
			}));
		};

		self.addDrugExposureCriteria = function () {
			self.group().CriteriaList.push(new AdditionalCriteria({
				Criteria: {
					DrugExposure: {}
				}
			}));
		};

		self.addDrugEraCriteria = function () {
			self.group().CriteriaList.push(new AdditionalCriteria({
				Criteria: {
					DrugEra: {}
				}
			}));
		};

		self.addDoseEraCriteria = function () {
			self.group().CriteriaList.push(new AdditionalCriteria({
				Criteria: {
					DoseEra: {}
				}
			}));
		};

		self.addProcedureCriteria = function () {
			self.group().CriteriaList.push(new AdditionalCriteria({
				Criteria: {
					ProcedureOccurrence: {}
				}
			}));
		};
		
		self.addObservationCriteria = function () {
			self.group().CriteriaList.push(new AdditionalCriteria({
				Criteria: {
					Observation: {}
				}
			}));
		};	

		self.addVisitCriteria = function () {
			self.group().CriteriaList.push(new AdditionalCriteria({
				Criteria: {
					VisitOccurrence: {}
				}
			}));
		};
		
		self.addDeviceCriteria = function () {
			self.group().CriteriaList.push(new AdditionalCriteria({
				Criteria: {
					DeviceExposure: {}
				}
			}));
		};
		
		self.addMeasurementCriteria = function () {
			self.group().CriteriaList.push(new AdditionalCriteria({
				Criteria: {
					Measurement: {}
				}
			}));
		};

		self.addSpecimenCriteria = function () {
			self.group().CriteriaList.push(new AdditionalCriteria({
				Criteria: {
					Specimen: {}
				}
			}));
		};
		
		self.addObservationPeriodCriteria = function () {
			self.group().CriteriaList.push(new AdditionalCriteria({
				Criteria: {
					ObservationPeriod: {}
				}
			}));
		};		
		self.addDeathCriteria = function()
		{
			self.group().CriteriaList.push(new AdditionalCriteria({
				Criteria: {
					Death: {}
				}
			}));
		}
		
		self.removeCriteria = function (observableList, data) {
			observableList.remove(data);
		};

		self.addCriteriaSettings = {
			selectText: "Add New Criteria...",
			actionOptions: addCriteriaActions,
			onAction: function (data) {
				data.selectedData.action();
			}
		}
	}

	// return compoonent definition
	return {
		viewModel: CriteriaGroupViewModel,
		template: template
	};
});