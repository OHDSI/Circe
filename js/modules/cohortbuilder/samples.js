define(['knockout'], function (ko) {
	var samples = {};

	samples.emptyCondition = {
		"Title": "Blank Condition Criteria",
		"Type": "SIMPLE_DEFINITION",
		"Expression": {
			"PrimaryCriteria": {
				CriteriaList: [{
					"ConditionOccurrence": {}
				}]
			}
		}
	}
	samples.nqf_0001_denominator = {
		"Title": "Asthma Assessment (NQF 0001) [DENOMINATOR]",
		"Type": "SIMPLE_DEFINITION",
		"Expression": {
			"PrimaryCriteria": {
				CriteriaList: [{
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
			"Codesets": [
				{
					"Id": 0,
					"Name": "Asthma",
					"TargetConcepts": [{
						Id: "4125022",
						Name: "Asthma"
					}]
				}
			]
		}
	};

	samples.nqf_0001_numerator = {
		"Title": "Asthma Assessment (NQF 0001) [NUMERATOR]",
		"Type": "SIMPLE_DEFINITION",
		"Expression": {
			"PrimaryCriteria": {
				CriteriaList: [{
					"ConditionOccurrence": {
						"OccurrenceStartDate": {
							Op: "bt",
							Value: "2012-01-01T05:00:00.000Z",
							Extent: "2013-01-01T05:00:00.000Z"
						},
						"Age": {
							Op: "bt",
							Value: 5,
							Extent: 40
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
						Criteria: {
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
								Criteria: {
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
								Criteria: {
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
			}
		}
	};

	samples.depression_antidepressants = {
		"Title": "Depression and Antidepressants",
		"Type": "SIMPLE_DEFINITION",
		"Expression": {
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
			"Codesets": [
				{
					"Id": 0,
					"Name": "Antidepressants",
					"TargetConcepts": [
						{
							"Id": 21604686,
							"Name": "ANTIDEPRESSANTS"
        },
						{
							"Id": 21500526,
							"Name": "Antidepressants"
        }
      ],
					"UseDescendents": true,
					"Excluded": []
    },
				{
					"Id": 1,
					"Name": "Depression",
					"TargetConcepts": [
						{
							"Id": 440383,
							"Name": "Depressive disorder"
        }
      ],
					"UseDescendents": true,
					"Excluded": [
						{
							"Id": 436665,
							"Name": "Bipolar disorder"
        }
      ],
					"ExcludeDescendents": true
    }
  ]
		}
	}
	
	samples.test = {
		"Title" : "Test Expression",
		"Type" : "SIMPLE_DEFINITION",
		"Expression" : {
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
              "Id": 38000245,
              "Name": "EHR problem list entry"
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
              "Id": 8532,
              "Name": "FEMALE"
            },
            {
              "Id": 8507,
              "Name": "MALE"
            }
          ],
          "ProviderSpecialty": [
            {
              "Id": 38004688,
              "Name": " Ambulance Service Provider"
            },
            {
              "Id": 38004693,
              "Name": " Clinic or Group Practice"
            }
          ],
          "VisitType": [
            {
              "Id": 44818519,
              "Name": "Clinical Study visit"
            },
            {
              "Id": 44818518,
              "Name": "Visit derived from EHR record"
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
              "Id": 38000180,
              "Name": "Inpatient administration"
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
              "Id": 4120036,
              "Name": "Inhaling"
            },
            {
              "Id": 4157760,
              "Name": "Intraocular route"
            }
          ],
          "EffectiveDrugDose": {
            "Value": 12,
            "Op": "lt"
          },
          "DoseUnit": [
            {
              "Id": 9276,
              "Name": "50% cell culture infectious dose"
            },
            {
              "Id": 9414,
              "Name": "50% tissue culture infectious dose"
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
              "Id": 8532,
              "Name": "FEMALE"
            },
            {
              "Id": 8507,
              "Name": "MALE"
            }
          ],
          "ProviderSpecialty": [
            {
              "Id": 38004688,
              "Name": " Ambulance Service Provider"
            },
            {
              "Id": 38004679,
              "Name": " Ambulatory Surgical Center"
            },
            {
              "Id": 38004676,
              "Name": " Anesthesiology Assistant"
            }
          ],
          "VisitType": [
            {
              "Id": 44818519,
              "Name": "Clinical Study visit"
            }
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
              "Id": 38000249,
              "Name": "Inpatient detail - 1st position"
            }
          ],
          "Modifier": [
            {
              "Id": 4210463,
              "Name": "10 to 19 percent of body surface"
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
              "Id": 8532,
              "Name": "FEMALE"
            },
            {
              "Id": 8507,
              "Name": "MALE"
            }
          ],
          "ProviderSpecialty": [
            {
              "Id": 38004693,
              "Name": " Clinic or Group Practice"
            },
            {
              "Id": 38004692,
              "Name": " Clinical Laboratory"
            }
          ],
          "VisitType": [
            {
              "Id": 44818519,
              "Name": "Clinical Study visit"
            },
            {
              "Id": 44818518,
              "Name": "Visit derived from EHR record"
            },
            {
              "Id": 44818517,
              "Name": "Visit derived from encounter on claim"
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
              "Id": 44818702,
              "Name": "Lab result"
            }
          ],
          "Operator": [
            {
              "Id": 4171756,
              "Name": "<"
            }
          ],
          "ValueAsNumber": {
            "Value": 1.5,
            "Extent": 2.5,
            "Op": "bt"
          },
          "ValueAsConcept": [
            {
              "Id": 4079377,
              "Name": "Altered"
            }
          ],
          "Unit": [
            {
              "Id": 9276,
              "Name": "50% cell culture infectious dose"
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
              "Id": 8532,
              "Name": "FEMALE"
            },
            {
              "Id": 8507,
              "Name": "MALE"
            }
          ],
          "ProviderSpecialty": [
            {
              "Id": 38004698,
              "Name": " All Other Suppliers"
            }
          ],
          "VisitType": [
            {
              "Id": 44818519,
              "Name": "Clinical Study visit"
            }
          ]
        }
      },
      {
        "ObservationPeriod": {
          "First": true,
          "PeriodType": [
            {
              "Id": 44814724,
              "Name": "Period covering healthcare encounters"
            },
            {
              "Id": 44814725,
              "Name": "Period inferred by algorithm"
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
              "Id": 38000282,
              "Name": "Chief complaint"
            },
            {
              "Id": 44786633,
              "Name": "HRA Observation Numeric Result"
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
              "Id": 4155143,
              "Name": "Abnormally low"
            }
          ],
          "First": true,
          "Age": {
            "Value": 12,
            "Op": "gt"
          },
          "Gender": [
            {
              "Id": 8532,
              "Name": "FEMALE"
            }
          ],
          "ProviderSpecialty": [
            {
              "Id": 38004698,
              "Name": " All Other Suppliers"
            }
          ],
          "VisitType": [
            {
              "Id": 44818519,
              "Name": "Clinical Study visit"
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
  "Codesets": [
    {
      "Id": 0,
      "Name": "Antidepressants",
      "TargetConcepts": [
        {
          "Id": 21604686,
          "Name": "ANTIDEPRESSANTS"
        },
        {
          "Id": 21500526,
          "Name": "Antidepressants"
        }
      ],
      "UseDescendents": true,
      "Excluded": []
    },
    {
      "Id": 1,
      "Name": "Depression",
      "TargetConcepts": [
        {
          "Id": 440383,
          "Name": "Depressive disorder"
        }
      ],
      "UseDescendents": true,
      "Excluded": [
        {
          "Id": 436665,
          "Name": "Bipolar disorder"
        }
      ],
      "ExcludeDescendents": true
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