/* eslint-disable sort-keys */
const { Pool } = require('pg');
const postgresqlUpsertMiddleware = require('./postgresql-upsert.middleware');
const { postgresqlConfig } = require('../../test.config');
require('regenerator-runtime');

describe('PostgreSQL DB upsert middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = postgresqlUpsertMiddleware();
		expect(typeof middleware).toBe('function');
	});

	test('Should insert a new discharge summary record into DB', async () => {
		const middleware = postgresqlUpsertMiddleware(
			new Pool(postgresqlConfig)
		);
		const req = {
			customparams: {
				action: 'Create New Form and Exit',
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
				signoff_drGrade: '',
				patient_address: [
					'NHS Foundation Trust',
					'Yeovil District Hospital'
				]
			}
		};
		const res = { locals: { user: 'frazer.smith' } };
		const next = jest.fn();

		await middleware(req, res, next);
		expect(req.customparams.query.result).toBe('success');
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should convert follow-up and medication arrays into arrays of objects before inserting', async () => {
		const middleware = postgresqlUpsertMiddleware(
			new Pool(postgresqlConfig)
		);
		const req = {
			customparams: {
				action: 'Create New Form and Exit',
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
				medication_allergiesFreetext: '',
				medication_change: 'Yes',
				medication_changedMed: [
					'Medication change test 2',
					'Medication change test 1'
				],
				medication_changedReason: ['2', '1'],
				medication_changedPlan: [
					'Continue as prescribed',
					'Complete the prescribed course'
				],
				medication_tto: 'Yes',
				medication_ttoLockDate: ['', ''],
				medication_ttoLockUser: ['', ''],
				medication_ttoMedication: [
					'Test medication 2',
					'Test medication 1'
				],
				medication_ttoDose: ['2', '1'],
				medication_ttoUnit: ['applicatorful', 'application'],
				medication_ttoRoute: ['', 'BUC - Buccal'],
				medication_ttoStartDate: ['', ''],
				medication_ttoFrequency: ['2', '1'],
				medication_ttoLengthOfCourse: ['weeks', 'day'],
				medication_ttoComments: ['', ''],
				medication_ttoPharmacySignOffName: ['', 'frazer.smith'],
				medication_ttoPharmacySignOffDate: ['', '2019-10-02'],
				medication_ttoPharmacySignOffTime: ['', '09: 19: 11'],
				medication_ttoPharmacyAvailability: ['', 'CD Prescription'],
				medication_finalPharmacySignOffName: ['', 'frazer.smith'],
				medication_finalPharmacySignOffDate: ['', '2019-10-02'],
				medication_finalPharmacySignOffTime: ['', '09: 19: 12'],
				medication_ttoPharmacySignOffCheck: 'on',
				medication_finalPharmacySignOffCheck: 'on',
				followup_akiText: '',
				followup_akiStatus: '',
				followup_with: 'AEC',
				followup_intervalNumber: '1',
				followup_interval: 'Day(s)',
				followup_details: '',
				followup_notes: '',
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
				signoff_drGrade: '',
				patient_address: [
					'NHS Foundation Trust',
					'Yeovil District Hospital'
				]
			}
		};
		const res = { locals: { user: 'frazer.smith' } };
		const next = jest.fn();

		await middleware(req, res, next);
		expect(req.customparams.query.result).toBe('success');
		expect(req.customparams.medication_ttoComments).toBeUndefined();
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should update an existing discharge summary record in the DB', async () => {
		const middleware = postgresqlUpsertMiddleware(
			new Pool(postgresqlConfig)
		);
		const req = {
			customparams: {
				version: 420,
				action: 'Save and Exit',
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
				signoff_drGrade: '',
				patient_address: [
					'NHS Foundation Trust',
					'Yeovil District Hospital'
				]
			}
		};
		const res = { locals: { user: 'frazer.smith' } };
		const next = jest.fn();

		await middleware(req, res, next);
		expect(req.customparams.query.result).toBe('success');
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should fail if config missing', async () => {
		const middleware = postgresqlUpsertMiddleware(new Pool());
		const req = {
			customparams: {
				patient_mrn: '5484125'
			}
		};
		const res = { locals: { user: 'frazer.smith' } };
		const next = jest.fn();

		await middleware(req, res, next);
		expect(next.mock.calls[0][0].message.substring(0, 30)).toMatch(
			/^password authentication failed|read ECONNRESET/i
		);
		expect(next).toHaveBeenCalledTimes(1);
	});
});
