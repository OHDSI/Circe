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

	samples.list = [samples.emptyCondition, samples.depression_antidepressants, samples.nqf_0001_denominator, samples.nqf_0001_numerator];
	return samples;
});