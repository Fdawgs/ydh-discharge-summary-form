const fhirAllergyIntoleranceMiddleware = require('./fhir-allergyintolerance.middleware');
const { fhirConConfig } = require('../../test.config');
require('regenerator-runtime');

describe('FHIR AllergyIntolerance middleware', () => {
	beforeAll(() => {
		jest.setTimeout(30000);
	});

	test('Should return a middleware function', () => {
		const middleware = fhirAllergyIntoleranceMiddleware();
		expect(typeof middleware).toBe('function');
	});

	test('Should populate allergies req custom parameter if params populated correctly', async () => {
		const middleware = fhirAllergyIntoleranceMiddleware(fhirConConfig);
		const req = {
			customparams: {
				admission_date: '2000-01-01',
				discharge_date: '2019-12-31',
				patient_mrn: '5484125' // test patient with many allergies
			}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(typeof req.customparams.allergies).toBe('object');
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should continue if patient has no recorded allergies', async () => {
		const middleware = fhirAllergyIntoleranceMiddleware(fhirConConfig);
		const req = {
			customparams: {
				admission_date: '2000-01-01',
				discharge_date: '2019-12-31',
				patient_mrn: '008017610' // test patient with no allergies
			}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(req.customparams.allergies).toBeUndefined();
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should fail to populate allergies req custom parameter if date params are missing', async () => {
		const middleware = fhirAllergyIntoleranceMiddleware(fhirConConfig);
		const req = {
			customparams: {
				admission_date: '',
				discharge_date: '',
				patient_mrn: '5484125'
			}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(typeof req.customparams.allergies).not.toBe('object');
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should fail to populate allergies req custom parameter if params are malformed', async () => {
		const middleware = fhirAllergyIntoleranceMiddleware(fhirConConfig);
		const req = {
			customparams: {
				admission_date: 'geter',
				discharge_date: 'le2019-01-01',
				patient_mrn: '5484125'
			}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(typeof req.customparams.allergies).not.toBe('object');
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should fail to populate allergies req custom parameter if mrn param is missing', async () => {
		const middleware = fhirAllergyIntoleranceMiddleware(fhirConConfig);
		const req = {
			customparams: {
				admission_date: '',
				discharge_date: '',
				patient_mrn: ''
			}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(typeof req.customparams.allergies).not.toBe('object');
		expect(next).toHaveBeenCalledTimes(1);
	});
});
