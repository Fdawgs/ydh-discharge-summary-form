/* eslint-disable sort-keys */
const gatherCustomParamsMiddleware = require('./gather-custom-params.middleware');
require('regenerator-runtime');

describe('Gather Custom Params middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = gatherCustomParamsMiddleware();
		expect(typeof middleware).toBe('function');
	});

	test('Should add customparams', async () => {
		const middleware = gatherCustomParamsMiddleware();

		const req = {
			body: {
				patient_nhsNo: '',
				patient_mrn: '5484125',
				patient_surname: 'Zzztest',
				patient_forename: 'Charlotte',
				patient_dob: '1/09/1989',
				patient_gender: 'female',
				patient_addressLine1: 'NHS Foundation Trust',
				patient_addressLine2: 'Yeovil District Hospital',
				patient_addressCity: 'Yeovil',
				patient_addressDistrict: 'Somerset',
				patient_addressPostalCode: 'BA21 4AT',
				patient_addressAccommodationType: '',
				gp_id: 'V81999',
				gp_name: '0 GMP Unknown',
				gp_address: 'Unknown GP, undefined, undefined',
				patient_individualRequirements: '',
				admission_specialty: '',
				admission_date: '2019-09-26',
				admission_time: '',
				admission_method: '',
				admission_careProvider: '',
				admission_ward: '',
				admission_source: '',
				discharge_specialty: '',
				discharge_date: '',
				discharge_time: '',
				discharge_estimatedDate: '',
				discharge_method:
					'PATIENT discharged on clinical advice or with clinical consent',
				discharge_careProvider: '',
				discharge_ward: '',
				discharge_destination: '',
				discharge_differentAddressLine1: '',
				discharge_differentAddressLine2: '',
				discharge_differentAddressCity: '',
				discharge_differentAddressDistrict: '',
				discharge_differentAddressPostalCode: '',
				discharge_differentAddressContactNo: '',
				discharge_differentAddressComments: '',
				clinical_admissionReason: '',
				clinical_initialPresentation: '',
				clinical_preexistingConditions: '',
				clinical_significantInvestigations: '',
				clinical_conditionManagement: '',
				clinical_outstandingResults: '',
				clinical_patientConcerns: '',
				clinical_significantEvents: '',
				clinical_adverseIncidents: '',
				clinical_aki: '',
				clinical_akiPresent: '',
				clinical_akiHospital: '',
				clinical_akiStage: '',
				clinical_akiMedReview: 'No',
				clinical_dnar: '',
				clinical_epaccs: '',
				clinical_advancedCarePlan: '',
				followup_akiText: '',
				followup_akiStatus: '',
				signoff_nurseFirstName: '',
				signoff_nurseFirstDate: '',
				signoff_nurseFirstTime: '',
				signoff_nurseSecondName: '',
				signoff_nurseSecondDate: '',
				signoff_nurseSecondTime: '',
				signoff_drName: '',
				signoff_drDate: '',
				signoff_drTime: '',
				signoff_drContactNo: '',
				signoff_drGrade: ''
			}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(req.customparams).not.toBeUndefined();
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should push address into patient_address array', async () => {
		const middleware = gatherCustomParamsMiddleware();

		const req = {
			body: {
				patient_nhsNo: '',
				patient_mrn: '5484125',
				patient_surname: 'Zzztest',
				patient_forename: 'Charlotte',
				patient_dob: '1/09/1989',
				patient_gender: 'female',
				patient_addressLine1: 'NHS Foundation Trust',
				patient_addressLine2: 'Yeovil District Hospital',
				patient_addressCity: 'Yeovil',
				patient_addressDistrict: 'Somerset',
				patient_addressPostalCode: 'BA21 4AT',
				patient_addressAccommodationType: ''
			}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(req.customparams.patient_address).not.toBeUndefined();
		expect(typeof req.customparams.patient_address).toBe('object');
		expect(next).toHaveBeenCalledTimes(1);
	});
});
