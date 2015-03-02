define(['knockout'], function (ko) {
	var samples = {};

	samples.emptyCondition = {
		"id": 1,
		"name": "Blank Condition Filter",
		"expressionType": "SIMPLE_DEFINITION",
		"description": "An empty cohort definition.",
		"expression": {
			"PrimaryCriteria": {
				"CriteriaList": [
					{
						"ConditionOccurrence": {}
					}
				],
				"ObservationWindow": {
					"PriorDays": 0,
					"PostDays": 0
				},
				"PrimaryCriteriaLimit": {
					"Type": "All"
				}
			},
			"ConceptSets": [],
			"ExpressionLimit": {
				"Type": "All"
			}
		}
	}
	
	samples.nqf_0001_denominator = {
		"id": 2,
		"name": "Asthma Assessment (NQF 0001) [DENOMINATOR]",
		"expressionType": "SIMPLE_DEFINITION",
		"description": "An example Quality Measure Denominator cohort for Asthma Assessment.",
		"expression": {
			"PrimaryCriteria": {
				"CriteriaList": [{
					"ConditionOccurrence": {
						"CodesetId": 0,
						"OccurrenceStartDate": {
							"Value": "2012-01-01T05:00:00.000Z",
							"Extent": "2013-01-01T05:00:00.000Z",
							"Op": "bt"
						},
						"Age": {
							"Value": 5,
							"Extent": 40,
							"Op": "bt"
						}
					}
				}]
			},
			"AdditionalCriteria": {
				"Type": "ALL",
				"CriteriaList": [
					{
						"Criteria": {
							"VisitOccurrence": {
								"Codeset": {
									"Name": "Inpatient Visit"
								}
							}
						},
						"StartWindow": {
							"Start": {
								"Coeff": -1
							},
							"End": {
								"Coeff": 1
							}
						},
						"Occurrence": {
							"Type": 2,
							"Count": 2
						}
					}
				],
				"Groups": []
			},
			"ConceptSets": [
				{
					"id": 0,
					"name": "Asthma",
					"expression": {
						"items": [
							{
								"concept": {
									"CONCEPT_ID": 4125022,
									"CONCEPT_NAME": "Acute asthma",
									"CONCEPT_CODE": "304527002",
									"DOMAIN_ID": "Condition",
									"VOCABULARY_ID": "SNOMED"
								},
								"includeDescendants": true
							}
						]
					}
				}
			]
		}
	};

	samples.nqf_0001_numerator = {
		"id": 3,
		"name": "Asthma Assessment (NQF 0001) [NUMERATOR]",
		"expressionType": "SIMPLE_DEFINITION",
		"description": "An example Quality Measure numerator cohort for Asthma Assessment.",
		"expression": {
			"PrimaryCriteria": {
				"CriteriaList": [{
					"ConditionOccurrence": {
						"OccurrenceStartDate": {
							"Op": "bt",
							"Value": "2012-01-01T05:00:00.000Z",
							"Extent": "2013-01-01T05:00:00.000Z"
						},
						"Age": {
							"Op": "bt",
							"Value": 5,
							"Extent": 40
						}
					}
				}]
			},
			"AdditionalCriteria": {
				"Type": "ALL",
				"CriteriaList": [
					{
						"Occurrence": {
							"Type": 2,
							"Count": 2
						},
						"StartWindow": {
							"Start": {
								"Days": 180,
								"Coeff": -1
							},
							"End": {
								"Days": 180,
								"Coeff": 1
							}
						},
						"Criteria": {
							"VisitOccurrence": {}
						}
				}
			],
				"Groups": [
					{
						"Type": "ANY",
						"CriteriaList": [
							{
								"StartWindow": {
									"Start": {
										"Days": 180,
										"Coeff": -1
									},
									"End": {
										"Days": 180,
										"Coeff": 1
									}
								},
								"Criteria": {
									"ProcedureOccurrence": {
										"Codeset": {
											"Name": "Asthma Diagnosis Procedure"
										}
									}
								}
						},
							{
								"StartWindow": {
									"Start": {
										"Days": 180,
										"Coeff": -1
									},
									"End": {
										"Days": 180,
										"Coeff": 1
									}
								},
								"Criteria": {
									"Observation": {
										"Codeset": {
											"Name": "Asthma Symptom Assessment Tool"
										}
									}
								}
							}
						]
					}
				]
			},
			"ConceptSets": [
				{
					"id": 0,
					"name": "Asthma",
					"expression": {
						"items": [
							{
								"concept": {
									"CONCEPT_ID": 4125022,
									"CONCEPT_NAME": "Acute asthma",
									"CONCEPT_CODE": "304527002",
									"DOMAIN_ID": "Condition",
									"VOCABULARY_ID": "SNOMED"
								},
								"includeDescendants": true
							}
						]
					}
				}
			]
		}
	};

	samples.depression_antidepressants = {
		"id": 4,
		"name": "Depression and Antidepressants",
		"expressionType": "SIMPLE_DEFINITION",
		"description": "An example Depression and Antidepressants cohort demonstrating concept sets for conditions and drugs.",
		"expression": {
			"PrimaryCriteria": {
				"CriteriaList": [
					{
						"ConditionOccurrence": {
							"CodesetId": 1,
							"OccurrenceStartDate": {
								"Value": "2010-1-1",
								"Extent": "2012-1-1",
								"Op": "bt"
							},
							"Age": {
								"Value": 18,
								"Extent": 45,
								"Op": "bt"
							}
						}
      }
    ],
				"ObservationWindow": {
					"PriorDays": 180,
					"PostDays": 365
				}
			},
			"AdditionalCriteria": {
				"Type": "ALL",
				"CriteriaList": [
					{
						"Criteria": {
							"ConditionOccurrence": {
								"CodesetId": 1
							}
						},
						"StartWindow": {
							"Start": {
								"Days": 30,
								"Coeff": -1
							},
							"End": {
								"Days": 1,
								"Coeff": -1
							}
						},
						"Occurrence": {
							"Type": 2,
							"Count": 1
						}
      },
					{
						"Criteria": {
							"ConditionOccurrence": {
								"CodesetId": 1
							}
						},
						"StartWindow": {
							"Start": {
								"Days": 1,
								"Coeff": 1
							},
							"End": {
								"Days": 30,
								"Coeff": 1
							}
						},
						"Occurrence": {
							"Type": 2,
							"Count": 1
						}
      }
    ],
		"Groups": []
			},
  		"ConceptSets": [
    {
      "id": 0,
      "name": "Antidepressants",
      "expression": {
        "items": [
          {
            "concept": {
              "CONCEPT_ID": 21500526,
              "CONCEPT_NAME": "Antidepressants",
              "CONCEPT_CODE": "526",
              "DOMAIN_ID": "Drug",
              "VOCABULARY_ID": "ETC"
            },
            "includeDescendants": true
          },
          {
            "concept": {
              "CONCEPT_ID": 21604686,
              "CONCEPT_NAME": "ANTIDEPRESSANTS",
              "CONCEPT_CODE": "N06A",
              "DOMAIN_ID": "Drug",
              "VOCABULARY_ID": "ATC"
            },
            "includeDescendants": true
          }
        ]
      }
    },
    {
      "id": 1,
      "name": "Depression",
      "expression": {
        "items": [
          {
            "concept": {
              "CONCEPT_ID": 440383,
              "CONCEPT_NAME": "Depressive disorder",
              "CONCEPT_CODE": "35489007",
              "DOMAIN_ID": "Condition",
              "VOCABULARY_ID": "SNOMED"
            },
            "includeDescendants": true
          },
          {
            "concept": {
              "CONCEPT_ID": 436665,
              "CONCEPT_NAME": "Bipolar disorder",
              "CONCEPT_CODE": "13746004",
              "DOMAIN_ID": "Condition",
              "VOCABULARY_ID": "SNOMED"
            },
            "isExcluded": true,
            "includeDescendants": true
          }
        ]
		}
	}
	]
		}
	};
	
	samples.test = {
		"id": 5,
		"name" : "Test Expression",
		"expressionType" : "SIMPLE_DEFINITION",
		"description": "A Test Expression representing all criteria types, with all criteria enabled.",
		"expression" : {
  "PrimaryCriteria": {
    "CriteriaList": [
      {
        "ConditionOccurrence": {
          "CodesetId": 1,
          "OccurrenceStartDate": {
            "Value": "2010-1-1",
            "Extent": "2012-1-1",
            "Op": "bt"
          },
          "OccurrenceEndDate": {
            "Value": "2011-1-1",
            "Op": "lt"
          },
          "ConditionType": [
            {
              "CONCEPT_ID": 38000246,
              "CONCEPT_NAME": "Condition era - 0 days persistence window",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Condition Type",
              "VOCABULARY_ID": "Condition Type"
            },
            {
              "CONCEPT_ID": 38000247,
              "CONCEPT_NAME": "Condition era - 30 days persistence window",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Condition Type",
              "VOCABULARY_ID": "Condition Type"
            }
          ],
          "StopReason": {
            "Text": "test",
            "Op": "contains"
          },
          "ConditionSourceConcept": 0,
          "First": true,
          "Age": {
            "Value": 18,
            "Extent": 45,
            "Op": "bt"
          },
          "Gender": [
            {
              "CONCEPT_ID": 8532,
              "CONCEPT_NAME": "FEMALE",
              "CONCEPT_CODE": "F",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            },
            {
              "CONCEPT_ID": 8507,
              "CONCEPT_NAME": "MALE",
              "CONCEPT_CODE": "M",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            }
          ],
          "ProviderSpecialty": [
            {
              "CONCEPT_ID": 44777717,
              "CONCEPT_NAME": "General surgery",
              "CONCEPT_CODE": "100",
              "DOMAIN_ID": "Provider Specialty",
              "VOCABULARY_ID": "HES Specialty"
            },
            {
              "CONCEPT_ID": 44777747,
              "CONCEPT_NAME": "Urology",
              "CONCEPT_CODE": "101",
              "DOMAIN_ID": "Provider Specialty",
              "VOCABULARY_ID": "HES Specialty"
            }
          ],
          "VisitType": [
            {
              "CONCEPT_ID": 44818519,
              "CONCEPT_NAME": "Clinical Study visit",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Visit Type",
              "VOCABULARY_ID": "Visit Type"
            },
            {
              "CONCEPT_ID": 44818518,
              "CONCEPT_NAME": "Visit derived from EHR record",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Visit Type",
              "VOCABULARY_ID": "Visit Type"
            },
            {
              "CONCEPT_ID": 44818517,
              "CONCEPT_NAME": "Visit derived from encounter on claim",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Visit Type",
              "VOCABULARY_ID": "Visit Type"
            }
          ]
        }
      },
      {
        "DrugExposure": {
          "CodesetId": 0,
          "OccurrenceStartDate": {
            "Value": "2015-1-1",
            "Extent": "2015-1-31",
            "Op": "bt"
          },
          "OccurrenceEndDate": {
            "Value": "2015-1-1",
            "Op": "lt"
          },
          "DrugType": [
            {
              "CONCEPT_ID": 38000180,
              "CONCEPT_NAME": "Inpatient administration",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Drug Type",
              "VOCABULARY_ID": "Drug Type"
            },
            {
              "CONCEPT_ID": 38000176,
              "CONCEPT_NAME": "Prescription dispensed through mail order",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Drug Type",
              "VOCABULARY_ID": "Drug Type"
            }
          ],
          "StopReason": {
            "Text": "test",
            "Op": "contains"
          },
          "Refills": {
            "Value": 3,
            "Op": "lt"
          },
          "Quantity": {
            "Value": 5.5,
            "Op": "lt"
          },
          "DaysSupply": {
            "Value": 25,
            "Op": "lt"
          },
          "RouteConcept": [
            {
              "CONCEPT_ID": 4217202,
              "CONCEPT_NAME": "Intrathecal route",
              "CONCEPT_CODE": "72607000",
              "DOMAIN_ID": "Route",
              "VOCABULARY_ID": "SNOMED"
            },
            {
              "CONCEPT_ID": 4233974,
              "CONCEPT_NAME": "Urethral route",
              "CONCEPT_CODE": "90028008",
              "DOMAIN_ID": "Route",
              "VOCABULARY_ID": "SNOMED"
            },
            {
              "CONCEPT_ID": 4112421,
              "CONCEPT_NAME": "Intravenous",
              "CONCEPT_CODE": "255560000",
              "DOMAIN_ID": "Route",
              "VOCABULARY_ID": "SNOMED"
            }
          ],
          "EffectiveDrugDose": {
            "Value": 12,
            "Op": "lt"
          },
          "DoseUnit": [
            {
              "CONCEPT_ID": 9215,
              "CONCEPT_NAME": "percent 0 to 3 hours",
              "CONCEPT_CODE": "%{0'to3'hours}",
              "DOMAIN_ID": "Unit",
              "VOCABULARY_ID": "UCUM"
            },
            {
              "CONCEPT_ID": 8687,
              "CONCEPT_NAME": "percent activity",
              "CONCEPT_CODE": "%{activity}",
              "DOMAIN_ID": "Unit",
              "VOCABULARY_ID": "UCUM"
            }
          ],
          "LotNumber": {
            "Text": "1234a",
            "Op": "contains"
          },
          "DrugSourceConcept": 0,
          "First": true,
          "Age": {
            "Value": 12,
            "Op": "gt"
          },
          "Gender": [
            {
              "CONCEPT_ID": 45454912,
              "CONCEPT_NAME": "Gender unspecified",
              "CONCEPT_CODE": "1K3..00",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Read"
            },
            {
              "CONCEPT_ID": 8532,
              "CONCEPT_NAME": "FEMALE",
              "CONCEPT_CODE": "F",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            }
          ],
          "ProviderSpecialty": [
            {
              "CONCEPT_ID": 38004446,
              "CONCEPT_NAME": "General Practice",
              "CONCEPT_CODE": "1",
              "DOMAIN_ID": "Provider Specialty",
              "VOCABULARY_ID": "Specialty"
            },
            {
              "CONCEPT_ID": 38004455,
              "CONCEPT_NAME": "Gastroenterology",
              "CONCEPT_CODE": "10",
              "DOMAIN_ID": "Provider Specialty",
              "VOCABULARY_ID": "Specialty"
            },
            {
              "CONCEPT_ID": 44777717,
              "CONCEPT_NAME": "General surgery",
              "CONCEPT_CODE": "100",
              "DOMAIN_ID": "Provider Specialty",
              "VOCABULARY_ID": "HES Specialty"
            }
          ],
          "VisitType": [
            {}
          ]
        }
      },
      {
        "ProcedureOccurrence": {
          "CodesetId": 0,
          "OccurrenceStartDate": {
            "Value": "2011-1-1",
            "Extent": "2012-1-1",
            "Op": "!bt"
          },
          "ProcedureType": [
            {
              "CONCEPT_ID": 38000249,
              "CONCEPT_NAME": "Inpatient detail - 1st position",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Procedure Type",
              "VOCABULARY_ID": "Procedure Type"
            },
            {
              "CONCEPT_ID": 38000248,
              "CONCEPT_NAME": "Inpatient detail - primary position",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Procedure Type",
              "VOCABULARY_ID": "Procedure Type"
            }
          ],
          "Modifier": [
            {
              "CONCEPT_ID": 4027948,
              "CONCEPT_NAME": "Structure of fetal part of placenta",
              "CONCEPT_CODE": "107008",
              "DOMAIN_ID": "Spec Anatomic Site",
              "VOCABULARY_ID": "SNOMED"
            },
            {
              "CONCEPT_ID": 4030780,
              "CONCEPT_NAME": "Entire condylar emissary vein",
              "CONCEPT_CODE": "108003",
              "DOMAIN_ID": "Spec Anatomic Site",
              "VOCABULARY_ID": "SNOMED"
            }
          ],
          "Quantity": {
            "Value": 10,
            "Extent": 20.5,
            "Op": "bt"
          },
          "ProcedureSourceConcept": 0,
          "First": true,
          "Age": {
            "Value": 18,
            "Extent": 30,
            "Op": "bt"
          },
          "Gender": [
            {
              "CONCEPT_ID": 8532,
              "CONCEPT_NAME": "FEMALE",
              "CONCEPT_CODE": "F",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            },
            {
              "CONCEPT_ID": 8507,
              "CONCEPT_NAME": "MALE",
              "CONCEPT_CODE": "M",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            }
          ],
          "ProviderSpecialty": [
            {
              "CONCEPT_ID": 38004446,
              "CONCEPT_NAME": "General Practice",
              "CONCEPT_CODE": "1",
              "DOMAIN_ID": "Provider Specialty",
              "VOCABULARY_ID": "Specialty"
            },
            {
              "CONCEPT_ID": 38004455,
              "CONCEPT_NAME": "Gastroenterology",
              "CONCEPT_CODE": "10",
              "DOMAIN_ID": "Provider Specialty",
              "VOCABULARY_ID": "Specialty"
            }
          ],
          "VisitType": [
            {
              "CONCEPT_ID": 44818519,
              "CONCEPT_NAME": "Clinical Study visit",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Visit Type",
              "VOCABULARY_ID": "Visit Type"
            },
            {
              "CONCEPT_ID": 44818518,
              "CONCEPT_NAME": "Visit derived from EHR record",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Visit Type",
              "VOCABULARY_ID": "Visit Type"
            }
          ]
        }
      },
      {
        "Measurement": {
          "CodesetId": 0,
          "First": true,
          "OccurrenceStartDate": {
            "Value": "2015-1-1",
            "Op": "gt"
          },
          "MeasurementType": [
            {
              "CONCEPT_ID": 44818702,
              "CONCEPT_NAME": "Lab result",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Meas Type",
              "VOCABULARY_ID": "Meas Type"
            },
            {
              "CONCEPT_ID": 44818703,
              "CONCEPT_NAME": "Pathology finding",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Meas Type",
              "VOCABULARY_ID": "Meas Type"
            }
          ],
          "Operator": [
            {
              "CONCEPT_ID": 4171755,
              "CONCEPT_NAME": ">=",
              "CONCEPT_CODE": "276138003",
              "DOMAIN_ID": "Meas Value Operator",
              "VOCABULARY_ID": "SNOMED"
            }
          ],
          "ValueAsNumber": {
            "Value": 1.5,
            "Extent": 2.5,
            "Op": "bt"
          },
          "ValueAsConcept": [
            {
              "CONCEPT_ID": 4079377,
              "CONCEPT_NAME": "Altered",
              "CONCEPT_CODE": "18307000",
              "DOMAIN_ID": "Meas Value",
              "VOCABULARY_ID": "SNOMED"
            },
            {
              "CONCEPT_ID": 4047870,
              "CONCEPT_NAME": "Good",
              "CONCEPT_CODE": "20572008",
              "DOMAIN_ID": "Meas Value",
              "VOCABULARY_ID": "SNOMED"
            }
          ],
          "Unit": [
            {
              "CONCEPT_ID": 9216,
              "CONCEPT_NAME": "percent abnormal",
              "CONCEPT_CODE": "%{abnormal}",
              "DOMAIN_ID": "Unit",
              "VOCABULARY_ID": "UCUM"
            },
            {
              "CONCEPT_ID": 8687,
              "CONCEPT_NAME": "percent activity",
              "CONCEPT_CODE": "%{activity}",
              "DOMAIN_ID": "Unit",
              "VOCABULARY_ID": "UCUM"
            }
          ],
          "RangeLow": {
            "Value": 12,
            "Op": "gt"
          },
          "RangeHigh": {
            "Value": 15,
            "Op": "gt"
          },
          "RangeLowRatio": {
            "Value": 1.5,
            "Op": "gt"
          },
          "RangeHighRatio": {
            "Value": 2.2,
            "Op": "gt"
          },
          "Abnormal": true,
          "Age": {
            "Value": 15,
            "Op": "gt"
          },
          "Gender": [
            {
              "CONCEPT_ID": 8532,
              "CONCEPT_NAME": "FEMALE",
              "CONCEPT_CODE": "F",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            }
          ],
          "ProviderSpecialty": [
            {
              "CONCEPT_ID": 44777717,
              "CONCEPT_NAME": "General surgery",
              "CONCEPT_CODE": "100",
              "DOMAIN_ID": "Provider Specialty",
              "VOCABULARY_ID": "HES Specialty"
            }
          ],
          "VisitType": [
            {
              "CONCEPT_ID": 44818519,
              "CONCEPT_NAME": "Clinical Study visit",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Visit Type",
              "VOCABULARY_ID": "Visit Type"
            },
            {
              "CONCEPT_ID": 44818518,
              "CONCEPT_NAME": "Visit derived from EHR record",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Visit Type",
              "VOCABULARY_ID": "Visit Type"
            }
          ]
        }
      },
      {
        "ObservationPeriod": {
          "First": true,
          "PeriodType": [
            {
              "CONCEPT_ID": 44814724,
              "CONCEPT_NAME": "Period covering healthcare encounters",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Obs Period Type",
              "VOCABULARY_ID": "Obs Period Type"
            },
            {
              "CONCEPT_ID": 44814725,
              "CONCEPT_NAME": "Period inferred by algorithm",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Obs Period Type",
              "VOCABULARY_ID": "Obs Period Type"
            }
          ],
          "AgeAtStart": {
            "Value": 10,
            "Extent": 20,
            "Op": "bt"
          },
          "AgeAtEnd": {
            "Value": 15,
            "Op": "lte"
          },
          "PeriodLength": {
            "Value": 240,
            "Op": "gt"
          }
        }
      },
      {
        "Observation": {
          "CodesetId": 0,
          "OccurrenceStartDate": {
            "Value": "2015-1-1",
            "Extent": "2015-1-12",
            "Op": "bt"
          },
          "ObservationType": [
            {
              "CONCEPT_ID": 38000282,
              "CONCEPT_NAME": "Chief complaint",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Observation Type",
              "VOCABULARY_ID": "Observation Type"
            },
            {
              "CONCEPT_ID": 44786633,
              "CONCEPT_NAME": "HRA Observation Numeric Result",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Observation Type",
              "VOCABULARY_ID": "Observation Type"
            }
          ],
          "ValueAsNumber": {
            "Value": 12,
            "Op": "lt"
          },
          "ValueAsString": {
            "Text": "abcd",
            "Op": "contains"
          },
          "ValueAsConcept": [
            {
              "CONCEPT_ID": 9191,
              "CONCEPT_NAME": "Positive",
              "CONCEPT_CODE": "10828004",
              "DOMAIN_ID": "Meas Value",
              "VOCABULARY_ID": "SNOMED"
            }
          ],
          "First": true,
          "Age": {
            "Value": 12,
            "Op": "gt"
          },
          "Gender": [
            {
              "CONCEPT_ID": 8507,
              "CONCEPT_NAME": "MALE",
              "CONCEPT_CODE": "M",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            }
          ],
          "ProviderSpecialty": [
            {
              "CONCEPT_ID": 38003623,
              "CONCEPT_NAME": "Behavioral Health & Social Service Providers, Counselor",
              "CONCEPT_CODE": "101Y00000X",
              "DOMAIN_ID": "Provider Specialty",
              "VOCABULARY_ID": "NUCC"
            },
            {
              "CONCEPT_ID": 38003624,
              "CONCEPT_NAME": "Behavioral Health & Social Service Providers, Counselor, Addiction (Substance Use Disorder)",
              "CONCEPT_CODE": "101YA0400X",
              "DOMAIN_ID": "Provider Specialty",
              "VOCABULARY_ID": "NUCC"
            }
          ],
          "VisitType": [
            {
              "CONCEPT_ID": 44818519,
              "CONCEPT_NAME": "Clinical Study visit",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Visit Type",
              "VOCABULARY_ID": "Visit Type"
            },
            {
              "CONCEPT_ID": 44818518,
              "CONCEPT_NAME": "Visit derived from EHR record",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Visit Type",
              "VOCABULARY_ID": "Visit Type"
            }
          ]
        }
      },
      {
        "DeviceExposure": {
          "CodesetId": 0,
          "OccurrenceStartDate": {
            "Value": "2015-1-1",
            "Op": "lt"
          },
          "OccurrenceEndDate": {
            "Value": "2015-1-1",
            "Extent": "2015-1-2",
            "Op": "bt"
          },
          "DeviceType": [
            {
              "CONCEPT_ID": 44818707,
              "CONCEPT_NAME": "EHR Detail",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Device Type",
              "VOCABULARY_ID": "Device Type"
            },
            {
              "CONCEPT_ID": 44818705,
              "CONCEPT_NAME": "Inferred from procedure claim",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Device Type",
              "VOCABULARY_ID": "Device Type"
            }
          ],
          "UniqueDeviceId": {
            "Text": "abcd",
            "Op": "contains"
          },
          "Quantity": {
            "Value": 12,
            "Extent": 15,
            "Op": "bt"
          },
          "DeviceSourceConcept": 0,
          "First": true,
          "Age": {
            "Value": 12,
            "Op": "eq"
          },
          "Gender": [
            {
              "CONCEPT_ID": 8532,
              "CONCEPT_NAME": "FEMALE",
              "CONCEPT_CODE": "F",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            },
            {
              "CONCEPT_ID": 8507,
              "CONCEPT_NAME": "MALE",
              "CONCEPT_CODE": "M",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            }
          ],
          "ProviderSpecialty": [
            {
              "CONCEPT_ID": 38004455,
              "CONCEPT_NAME": "Gastroenterology",
              "CONCEPT_CODE": "10",
              "DOMAIN_ID": "Provider Specialty",
              "VOCABULARY_ID": "Specialty"
            }
          ],
          "VisitType": [
            {
              "CONCEPT_ID": 44818519,
              "CONCEPT_NAME": "Clinical Study visit",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Visit Type",
              "VOCABULARY_ID": "Visit Type"
            },
            {
              "CONCEPT_ID": 44818518,
              "CONCEPT_NAME": "Visit derived from EHR record",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Visit Type",
              "VOCABULARY_ID": "Visit Type"
            },
            {
              "CONCEPT_ID": 44818517,
              "CONCEPT_NAME": "Visit derived from encounter on claim",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Visit Type",
              "VOCABULARY_ID": "Visit Type"
            }
          ]
        }
      },
      {
        "Specimen": {
          "CodesetId": 1,
          "OccurrenceStartDate": {
            "Value": "2015-1-1",
            "Op": "lt"
          },
          "SpecimenType": [
            {
              "CONCEPT_ID": 4234527,
              "CONCEPT_NAME": "Eluate",
              "CONCEPT_CODE": "40511003",
              "DOMAIN_ID": "Specimen",
              "VOCABULARY_ID": "SNOMED"
            }
          ],
          "Quantity": {
            "Value": 5.5,
            "Op": "lt"
          },
          "Unit": [
            {
              "CONCEPT_ID": 8631,
              "CONCEPT_NAME": "sperm motility at 60 minutes",
              "CONCEPT_CODE": "%{sperm'motility'at'60'min}",
              "DOMAIN_ID": "Unit",
              "VOCABULARY_ID": "UCUM"
            }
          ],
          "AnatomicSite": [
            {
              "CONCEPT_ID": 4024559,
              "CONCEPT_NAME": "Structure of posterior carpal region",
              "CONCEPT_CODE": "106004",
              "DOMAIN_ID": "Spec Anatomic Site",
              "VOCABULARY_ID": "SNOMED"
            }
          ],
          "DiseaseStatus": [
            {
              "CONCEPT_ID": 4030780,
              "CONCEPT_NAME": "Entire condylar emissary vein",
              "CONCEPT_CODE": "108003",
              "DOMAIN_ID": "Spec Anatomic Site",
              "VOCABULARY_ID": "SNOMED"
            },
            {
              "CONCEPT_ID": 4003838,
              "CONCEPT_NAME": "Structure of visceral layer of Bowman's capsule",
              "CONCEPT_CODE": "110001",
              "DOMAIN_ID": "Spec Anatomic Site",
              "VOCABULARY_ID": "SNOMED"
            }
          ],
          "SourceId": {
            "Text": "somecode",
            "Op": "!startsWith"
          },
          "First": true,
          "Age": {
            "Value": 18,
            "Extent": 22,
            "Op": "bt"
          },
          "Gender": [
            {
              "CONCEPT_ID": 8532,
              "CONCEPT_NAME": "FEMALE",
              "CONCEPT_CODE": "F",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            },
            {
              "CONCEPT_ID": 8507,
              "CONCEPT_NAME": "MALE",
              "CONCEPT_CODE": "M",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            }
          ]
        }
      },
      {
        "VisitOccurrence": {
          "CodesetId": 0,
          "OccurrenceStartDate": {
            "Value": "2015-1-1",
            "Op": "lt"
          },
          "OccurrenceEndDate": {
            "Value": "2015-1-1",
            "Op": "gt"
          },
          "VisitType": [
            {
              "CONCEPT_ID": 44818519,
              "CONCEPT_NAME": "Clinical Study visit",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Visit Type",
              "VOCABULARY_ID": "Visit Type"
            },
            {
              "CONCEPT_ID": 44818518,
              "CONCEPT_NAME": "Visit derived from EHR record",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Visit Type",
              "VOCABULARY_ID": "Visit Type"
            }
          ],
          "VisitLength": {
            "Value": 31,
            "Op": "gt"
          },
          "First": true,
          "Age": {
            "Value": 20,
            "Extent": 30,
            "Op": "bt"
          },
          "Gender": [
            {
              "CONCEPT_ID": 8507,
              "CONCEPT_NAME": "MALE",
              "CONCEPT_CODE": "M",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            }
          ],
          "ProviderSpecialty": [
            {
              "CONCEPT_ID": 38004455,
              "CONCEPT_NAME": "Gastroenterology",
              "CONCEPT_CODE": "10",
              "DOMAIN_ID": "Provider Specialty",
              "VOCABULARY_ID": "Specialty"
            },
            {
              "CONCEPT_ID": 44777717,
              "CONCEPT_NAME": "General surgery",
              "CONCEPT_CODE": "100",
              "DOMAIN_ID": "Provider Specialty",
              "VOCABULARY_ID": "HES Specialty"
            }
          ],
          "PlaceOfService": [
            {
              "CONCEPT_ID": 8562,
              "CONCEPT_NAME": "Pharmacy",
              "CONCEPT_CODE": "1",
              "DOMAIN_ID": "Place of Service",
              "VOCABULARY_ID": "Place of Service"
            },
            {
              "CONCEPT_ID": 8537,
              "CONCEPT_NAME": "School",
              "CONCEPT_CODE": "3",
              "DOMAIN_ID": "Place of Service",
              "VOCABULARY_ID": "Place of Service"
            }
          ]
        }
      },
      {
        "Death": {
          "CodesetId": 0,
          "OccurrenceStartDate": {
            "Value": "2015-1-1",
            "Extent": "2015-1-1",
            "Op": "bt"
          },
          "DeathType": [
            {
              "CONCEPT_ID": 38003617,
              "CONCEPT_NAME": "Death Certificate contributory cause",
              "CONCEPT_CODE": "OMOP generated",
              "DOMAIN_ID": "Death Type",
              "VOCABULARY_ID": "Death Type"
            }
          ],
          "Age": {
            "Value": 40,
            "Extent": 50,
            "Op": "bt"
          },
          "Gender": [
            {
              "CONCEPT_ID": 8532,
              "CONCEPT_NAME": "FEMALE",
              "CONCEPT_CODE": "F",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            },
            {
              "CONCEPT_ID": 8507,
              "CONCEPT_NAME": "MALE",
              "CONCEPT_CODE": "M",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            }
          ]
        }
      },
      {
        "ConditionEra": {
          "CodesetId": 1,
          "EraStartDate": {
            "Value": "2015-2-1",
            "Op": "lt"
          },
          "EraEndDate": {
            "Value": "2014-9-1",
            "Op": "lt"
          },
          "OccurrenceCount": {
            "Value": 4,
            "Op": "gt"
          },
          "EraLength": {
            "Value": 12,
            "Op": "gt"
          },
          "First": true,
          "AgeAtStart": {
            "Value": 20,
            "Extent": 50,
            "Op": "bt"
          },
          "AgeAtEnd": {
            "Value": 5,
            "Extent": 10,
            "Op": "!bt"
          },
          "Gender": [
            {
              "CONCEPT_ID": 8532,
              "CONCEPT_NAME": "FEMALE",
              "CONCEPT_CODE": "F",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            },
            {
              "CONCEPT_ID": 8507,
              "CONCEPT_NAME": "MALE",
              "CONCEPT_CODE": "M",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            }
          ]
        }
      },
      {
        "DrugEra": {
          "CodesetId": 0,
          "EraStartDate": {
            "Value": "2015-1-1",
            "Op": "lt"
          },
          "EraEndDate": {
            "Value": "2014-12-1",
            "Op": "lt"
          },
          "OccurrenceCount": {
            "Value": 3,
            "Extent": 5,
            "Op": "bt"
          },
          "GapDays": {
            "Value": 20,
            "Op": "lt"
          },
          "EraLength": {
            "Value": 10,
            "Op": "gt"
          },
          "First": true,
          "AgeAtStart": {
            "Value": 10,
            "Extent": 15,
            "Op": "bt"
          },
          "AgeAtEnd": {
            "Value": 1,
            "Extent": 9,
            "Op": "!bt"
          },
          "Gender": [
            {
              "CONCEPT_ID": 8532,
              "CONCEPT_NAME": "FEMALE",
              "CONCEPT_CODE": "F",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            }
          ]
        }
      },
      {
        "DoseEra": {
          "CodesetId": 0,
          "EraStartDate": {
            "Value": "2015-2-1",
            "Op": "lte"
          },
          "EraEndDate": {
            "Value": "2015-2-1",
            "Op": "lt"
          },
          "Unit": [
            {
              "CONCEPT_ID": 9217,
              "CONCEPT_NAME": "percent basal activity",
              "CONCEPT_CODE": "%{basal'activity}",
              "DOMAIN_ID": "Unit",
              "VOCABULARY_ID": "UCUM"
            }
          ],
          "DoseValue": {
            "Value": 24,
            "Op": "gt"
          },
          "EraLength": {
            "Value": 15,
            "Op": "lt"
          },
          "First": true,
          "AgeAtStart": {
            "Value": 15,
            "Op": "gt"
          },
          "AgeAtEnd": {
            "Value": 20,
            "Op": "gt"
          },
          "Gender": [
            {
              "CONCEPT_ID": 8532,
              "CONCEPT_NAME": "FEMALE",
              "CONCEPT_CODE": "F",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            },
            {
              "CONCEPT_ID": 8507,
              "CONCEPT_NAME": "MALE",
              "CONCEPT_CODE": "M",
              "DOMAIN_ID": "Gender",
              "VOCABULARY_ID": "Gender"
            }
          ]
        }
      }
    ],
    "ObservationWindow": {
      "PriorDays": 180,
      "PostDays": 365
    },
    "PrimaryCriteriaLimit": {
      "Type": "All"
    }
  },
  "ConceptSets": [
    {
      "id": 0,
      "name": "Antidepressants",
      "expression": {
        "items": [
          {
            "concept": {
              "CONCEPT_ID": 21500526,
              "CONCEPT_NAME": "Antidepressants",
              "CONCEPT_CODE": "526",
              "DOMAIN_ID": "Drug",
              "VOCABULARY_ID": "ETC"
            },
            "includeDescendants": true
          },
          {
            "concept": {
              "CONCEPT_ID": 21604686,
              "CONCEPT_NAME": "ANTIDEPRESSANTS",
              "CONCEPT_CODE": "N06A",
              "DOMAIN_ID": "Drug",
              "VOCABULARY_ID": "ATC"
            },
            "includeDescendants": true
          }
        ]
      }
    },
    {
      "id": 1,
      "name": "Depression",
      "expression": {
        "items": [
          {
            "concept": {
              "CONCEPT_ID": 440383,
              "CONCEPT_NAME": "Depressive disorder",
              "CONCEPT_CODE": "35489007",
              "DOMAIN_ID": "Condition",
              "VOCABULARY_ID": "SNOMED"
            },
            "includeDescendants": true
          },
          {
            "concept": {
              "CONCEPT_ID": 436665,
              "CONCEPT_NAME": "Bipolar disorder",
              "CONCEPT_CODE": "13746004",
              "DOMAIN_ID": "Condition",
              "VOCABULARY_ID": "SNOMED"
            },
            "isExcluded": true,
            "includeDescendants": true
          }
        ]
      }
    }
  ],
  "ExpressionLimit": {
    "Type": "All"
  }
}
	}

	samples.list = [samples.emptyCondition, samples.test, samples.depression_antidepressants, samples.nqf_0001_denominator, samples.nqf_0001_numerator];
	return samples;
});