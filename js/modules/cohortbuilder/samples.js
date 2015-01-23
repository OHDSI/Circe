define(['knockout'], function (ko) {
	var samples = {};

	samples.empty = {
		name: "Empty",
		rule: {
			"Title": "Blank Criteria",
			"Type": 0,
			"PrimaryCriteria": [{
				"ConditionOccurrence": {}
			}]
		}
	}
	samples.nqf_0001_denominator = {
		name: "nqf_0001 Denominator",
		rule: {
			"Title": "Asthma Assessment (NQF 0001) [DENOMINATOR]",
			"Type": "SIMPLE_CRITERIA",
			"PrimaryCriteria": [
				{
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
						},
						"PriorEnrollDays": 0
					}
				}
			],
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
				"Groups": [

				]
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
		name: "nqf_0001 Numerator",
		rule: {
			"Title": "Asthma Assessment (NQF 0001) [NUMERATOR]",
			"Type": "SIMPLE_CRITERIA",
			"PrimaryCriteria": [{
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
			}],
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
		name: "Depression and Antidepressants",
		rule: {
			"Title": "Depression and Antidepressants",
			"Type": "SIMPLE_CRITERIA",
			"PrimaryCriteria": [
				{
					"ConditionOccurrence": {
						"OccurrenceStartDate": {
							"Value": "2015-1-1",
							"Op": "lt"
						},
						"OccurrenceEndDate": {
							"Value": "2015-1-7",
							"Op": "lt"
						},
						"First": true
					}
    }
  ],
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
			"ObservationWindow": {
				"PriorDays": 180,
				"PostDays": 365
			}
		}
	}
	samples.nqf_0002_denominator = {
		name: "nqf_0002 Denominator",
		rule: {
			"Title": "Appropriate Testing for Children with Pharyngitis (NQF 0002) [DENOMINATOR]",
			"Type": "SIMPLE_CRITERIA",
			"CriteriaGroup": {
				"Type": "ALL",
				"CriteriaList": [
					{
						"ConditionIndex": {
							"Codeset": {
								"Name": "Pharyngitis "
							},
							"AgeMin": 2,
							"AgeMax": 18
						}
      }
    ],
				"Groups": [
					{
						"Type": "ALL",
						"CriteriaList": [
							{
								"DrugExposure": {
									"Codeset": {
										"Name": "Pharyngitis Antibiotics"
									},
									"AfterIndexDays": 7
								}
          },
							{
								"DrugExposure": {
									"Codeset": {
										"Name": "Pharyngitis Antibiotics"
									},
									"Occurrence": {
										"Type": 1,
										"Count": 0
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
									}
								}
          }
        ]
      }
    ]
			}
		}
	};

	samples.nqf_0002_numerator = {
		name: "nqf_0002 Numerator",
		rule: {
			"Title": "Appropriate Testing for Children with Pharyngitis (NQF 0002) [NUMERATOR]",
			"Type": "SIMPLE_CRITERIA",
			"CriteriaGroup": {
				"Type": "ALL",
				"CriteriaList": [
					{
						"ConditionIndex": {
							"Codeset": {
								"Name": "Pharyngitis "
							},
							"AgeMin": 2,
							"AgeMax": 18
						}
      }
    ],
				"Groups": [
					{
						"Type": "ALL",
						"CriteriaList": [
							{
								"DrugExposure": {
									"Codeset": {
										"Name": "Pharyngitis Antibiotics"
									},
									"AfterIndexDays": 7
								}
          },
							{
								"DrugExposure": {
									"Codeset": {
										"Name": "Pharyngitis Antibiotics"
									},
									"Occurrence": {
										"Type": 1,
										"Count": 0
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
									}
								}
          },
							{
								"Observation": {
									"Codeset": {
										"Name": "group A streptococcus test"
									},
									"StartWindow": {
										"Start": {
											"Days": 3,
											"Coeff": -1
										},
										"End": {
											"Days": 4,
											"Coeff": 1
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

	//samples.list = [samples.nqf_0001_denominator, samples.nqf_0001_numerator, samples.nqf_0002_denominator, samples.nqf_0002_numerator];
	samples.list = [samples.empty, samples.depression_antidepressants, samples.nqf_0001_denominator, samples.nqf_0001_numerator];
	return samples;
});