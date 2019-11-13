const fhirPatientMiddleware = require('./fhir-patient.middleware');
const { fhirConConfig } = require('../../test.config');
require('regenerator-runtime');

describe('FHIR Patient middleware', () => {
	beforeAll(() => {
		jest.setTimeout(30000);
	});

	test('Should return a middleware function', () => {
		const middleware = fhirPatientMiddleware();
		expect(typeof middleware).toBe('function');
	});

	test('Should populate req custom parameter if patient mrn param populated correctly', async () => {
		const middleware = fhirPatientMiddleware(fhirConConfig);
		const req = {
			query: {
				mrn: '5484125'
			}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(req.patientresource).not.toBeUndefined();
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should populate req custom parameter if patient nhsno param populated correctly', async () => {
		const middleware = fhirPatientMiddleware(fhirConConfig);
		const req = {
			query: {
				nhsno: '9990010668' // NHS Spine test patient
			}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(req.patientresource).not.toBeUndefined();
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should fail to populate req custom parameter if patient mrn param is missing', async () => {
		const middleware = fhirPatientMiddleware(fhirConConfig);
		const req = {
			query: {
			}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(next.mock.calls[0][0].message).toBe('Error: options.uri is a required argument');
		expect(next).toHaveBeenCalledTimes(1);
	});
});
