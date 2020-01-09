const { Pool } = require('pg');
const postgresqlInprogressMiddleware = require('./postgresql-inprogress.middleware');
const { postgresqlConfig } = require('../../test.config');
require('regenerator-runtime');

describe('PostgreSQL DB in-progress summaries middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = postgresqlInprogressMiddleware();
		expect(typeof middleware).toBe('function');
	});

	test('Should return list of in-progress discharge summaries', async () => {
		const middleware = postgresqlInprogressMiddleware(
			new Pool(postgresqlConfig)
		);
		const req = {
			customparams: {
				patient_mrn: '5484125'
			}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(
			req.customparams.in_progress_discharge_summaries
		).not.toBeUndefined();
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should fail if config missing', async () => {
		const middleware = postgresqlInprogressMiddleware(new Pool());
		const req = {
			customparams: {
				patient_mrn: '5484125'
			}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(next.mock.calls[0][0].message.substring(0, 30)).toMatch(
			/^password authentication failed|read ECONNRESET/i
		);
		expect(next).toHaveBeenCalledTimes(1);
	});
});
