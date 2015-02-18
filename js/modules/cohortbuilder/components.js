define(function (require, exports) {
	
	var ko = require('knockout')
	
	var conceptPicker = require('cohortbuilder/components/ConceptPicker');
	ko.components.register('concept-picker', conceptPicker);
	
	var conceptSetBuilder = require('cohortbuilder/components/ConceptSetBuilder');
	ko.components.register('concept-set-builder', conceptSetBuilder);
	
	var expressionEditor = require('cohortbuilder/components/CohortExpressionEditor');
	ko.components.register('cohort-expression-editor', expressionEditor);
	
	var criteriaGroup = require('cohortbuilder/components/CriteriaGroup');
	ko.components.register('criteria-group', criteriaGroup);

	var conditionOccurrence = require('cohortbuilder/components/ConditionOccurrence');
	ko.components.register('condition-occurrence-criteria', conditionOccurrence);

	var conditionEra = require('cohortbuilder/components/ConditionEra');
	ko.components.register('condition-era-criteria', conditionEra);

	var drugExposure = require('cohortbuilder/components/DrugExposure');
	ko.components.register('drug-exposure-criteria', drugExposure);

	var drugEra = require('cohortbuilder/components/DrugEra');
	ko.components.register('drug-era-criteria', drugEra);	
	
	var doseEra = require('cohortbuilder/components/DoseEra');
	ko.components.register('dose-era-criteria', doseEra);
	
	var procedureOccurrence = require('cohortbuilder/components/ProcedureOccurrence');
	ko.components.register('procedure-occurrence-criteria', procedureOccurrence);
	
	var observation = require('cohortbuilder/components/Observation');
	ko.components.register('observation-criteria', observation);
	
	var visitOccurrence = require('cohortbuilder/components/VisitOccurrence');
	ko.components.register('visit-occurrence-criteria', visitOccurrence);
	
	var deviceExposure = require('cohortbuilder/components/DeviceExposure');
	ko.components.register('device-exposure-criteria', deviceExposure);

	var measurement = require('cohortbuilder/components/Measurement');
	ko.components.register('measurement-criteria', measurement);

	var observationPeriod = require('cohortbuilder/components/ObservationPeriod');
	ko.components.register('observation-period-criteria', observationPeriod);

	var specimen = require('cohortbuilder/components/Specimen');
	ko.components.register('specimen-criteria', specimen);
	
	var death = require('cohortbuilder/components/Death');
	ko.components.register('death-criteria', death);
	
	var numericRange = require('cohortbuilder/components/NumericRange');
	ko.components.register('numeric-range', numericRange);

	var dateRange = require('cohortbuilder/components/DateRange');
	ko.components.register('date-range', dateRange);
	
	var windowInput = require('cohortbuilder/components/WindowInput');
	ko.components.register('window-input',windowInput);
	
	var textFilter = require('cohortbuilder/components/TextFilter');
	ko.components.register('text-filter-input',textFilter);	
	
	var conceptList = require('cohortbuilder/components/ConceptList');
	ko.components.register('concept-list',conceptList);
	
});
