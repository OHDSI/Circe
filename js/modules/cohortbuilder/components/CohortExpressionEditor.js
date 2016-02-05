define(['knockout', '../options', '../CriteriaGroup', '../CriteriaTypes','../CohortExpression', 'text!./CohortExpressionEditorTemplate.html',
				'databindings', 'conceptpicker/ConceptPicker', 'css!../css/builder.css', 'css!../css/ddslick.criteria.css', 'ko.sortable'
			 ], function (ko, options, CriteriaGroup, criteriaTypes, CohortExpression, template) {
	function CohortExpressionEditorViewModel(params) {
		var self = this;
		var primaryCriteriaOptions = [
				{
					text: "Add Condition Filters",
					selected: false,
					description: "Find patients with specific diagnoses.",
					//imageSrc: "images/cohortbuilder/condition.png",
					action: function () {				
						self.expression().PrimaryCriteria().CriteriaList.push({
							ConditionOccurrence: new criteriaTypes.ConditionOccurrence(null,self.expression().ConceptSets)
						}); 
					}
				},
				{
					text: "Add Condition Era Filters",
					selected: false,
					description: "Find patients with specific diagosis era.",
					//imageSrc: "images/cohortbuilder/condition.png",
					action: function () {				
						self.expression().PrimaryCriteria().CriteriaList.push({
							ConditionEra: new criteriaTypes.ConditionEra(null,self.expression().ConceptSets)
						}); 
					}
				},
				{
					text: "Add Drug Filters",
					selected: false,
					description: "Find patients with exposure to specific drugs or drug classes.",
					//imageSrc: "images/cohortbuilder/drug.png",
					action: function () {				
						self.expression().PrimaryCriteria().CriteriaList.push({
							DrugExposure: new criteriaTypes.DrugExposure(null,self.expression().ConceptSets)
						}); 
					}
				},
				{
					text: "Add Drug Era Filters",
					selected: false,
					description: "Find patients with with exposure to drugs over time.",
					//imageSrc: "images/cohortbuilder/drugera.png",
					action: function () {				
						self.expression().PrimaryCriteria().CriteriaList.push({
							DrugEra: new criteriaTypes.DrugEra(null,self.expression().ConceptSets)
						}); 
					}
				},
				{
					text: "Add Dose Era Filters",
					selected: false,
					description: "Find patients with dose eras.",
					//imageSrc: "images/cohortbuilder/drugera.png",
					action: function () {				
						self.expression().PrimaryCriteria().CriteriaList.push({
							DoseEra: new criteriaTypes.DoseEra(null,self.expression().ConceptSets)
						}); 
					}
				},
				{
					text: "Add Procedure Filters",
					selected: false,
					description: "Find patients that experienced a specific procedure.",
					//imageSrc: "images/cohortbuilder/procedures.png",
					action: function () {				
						self.expression().PrimaryCriteria().CriteriaList.push({
							ProcedureOccurrence: new criteriaTypes.ProcedureOccurrence(null,self.expression().ConceptSets)
						}); 
					}
				},
				{
					text: "Add Observation Filters",
					selected: false,
					description: "Find patients based on lab tests or other observations.",
					//imageSrc: "images/cohortbuilder/observation.png",
					action: function () {				
						self.expression().PrimaryCriteria().CriteriaList.push({
							Observation: new criteriaTypes.Observation(null,self.expression().ConceptSets)
						}); 
					}
				},
				{
					text: "Add Visit Filters",
					selected: false,
					description: "Find patients based on visit information.",
					//imageSrc: "images/cohortbuilder/visit.png",
					action: function () {				
						self.expression().PrimaryCriteria().CriteriaList.push({
							VisitOccurrence: new criteriaTypes.VisitOccurrence(null,self.expression().ConceptSets)
						}); 
					}
				},
				{
					text: "Add Device Filters",
					selected: false,
					description: "Find patients based on device exposure.",
					//imageSrc: "images/cohortbuilder/procedures.png",
					action: function () {				
						self.expression().PrimaryCriteria().CriteriaList.push({
							DeviceExposure: new criteriaTypes.DeviceExposure(null,self.expression().ConceptSets)
						}); 
					}
				},
				{
					text: "Add Measurement Filters",
					selected: false,
					description: "Find patients based on Measurement.",
					//imageSrc: "images/cohortbuilder/procedures.png",
					action: function () {				
						self.expression().PrimaryCriteria().CriteriaList.push({
							Measurement: new criteriaTypes.Measurement(null,self.expression().ConceptSets)
						}); 
					}
				},
				{
					text: "Add Specimen Filters",
					selected: false,
					description: "Find patients based on Specimen.",
					//imageSrc: "images/cohortbuilder/procedures.png",
					action: function () {				
						self.expression().PrimaryCriteria().CriteriaList.push({
							Specimen: new criteriaTypes.Specimen(null,self.expression().ConceptSets)
						}); 
					}
				},
				{
					text: "Add Observation Period Filters",
					selected: false,
					description: "Find patients based on Observation Period.",
					//imageSrc: "images/cohortbuilder/procedures.png",
					action: function () {				
						self.expression().PrimaryCriteria().CriteriaList.push({
							ObservationPeriod: new criteriaTypes.ObservationPeriod(null,self.expression().ConceptSets)
						}); 
					}
				},
				{
					text: "Add Death Filters",
					selected: false,
					description: "Find patients based on device exposure.",
					//imageSrc: "images/cohortbuilder/procedures.png",
					action: function () {				
						self.expression().PrimaryCriteria().CriteriaList.push({
							Death: new criteriaTypes.Death(null,self.expression().ConceptSets)
						}); 
					}
				}
			];
			
		if (params.widget)
		{
			params.widget(this);
		}
		
		self.expression = params.expression;
		
		self.options = options;

		self.removeAdditionalCriteria = function () {
			self.expression().AdditionalCriteria(null);
		};

		self.addAdditionalCriteria = function () {
			self.expression().AdditionalCriteria(new CriteriaGroup(null, self.expression().ConceptSets));
		};

		self.removePrimaryCriteria = function (criteria) {
			self.expression().PrimaryCriteria().CriteriaList.remove(criteria);	
		}
		
		
		self.addPrimaryCriteriaOptions = {
			selectText: "Add Primary Event Filters...",
			width:250,
			height:300,
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

		self.getExpressionJSON = function() {
			return ko.toJSON(self.expression(), function (key, value) {if (value === 0 || value ) { return value; } else {return}} , 2)				
		}
		
	}

	// return factory
	return {
		viewModel: CohortExpressionEditorViewModel,
		template: template
	};
});