const { Pool } = require('pg');
const postgresqlAwaitingSignOffMiddleware = require('./postgresql-awaitingsignoff.middleware');
const { postgresqlConfig } = require('../../test.config');
require('regenerator-runtime');

describe('PostgreSQL DB awaiting sign off middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = postgresqlAwaitingSignOffMiddleware();
		expect(typeof middleware).toBe('function');
	});

	test('Should return list of discharge summaries awaiting dr sign off', async () => {
		const middleware = postgresqlAwaitingSignOffMiddleware(
			new Pool(postgresqlConfig),
			'dr'
		);
		const req = {};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(req.awaitingsignoff).not.toBeUndefined();
		expect(req.awaitingsignoff.dr).not.toBeUndefined();
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should return list of discharge summaries awaiting nurse sign off', async () => {
		const middleware = postgresqlAwaitingSignOffMiddleware(
			new Pool(postgresqlConfig),
			'nurse'
		);
		const req = {};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(req.awaitingsignoff).not.toBeUndefined();
		expect(req.awaitingsignoff.nurse).not.toBeUndefined();
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should return list of discharge summaries awaiting pharmacy sign off', async () => {
		const middleware = postgresqlAwaitingSignOffMiddleware(
			new Pool(postgresqlConfig),
			'pharmacy'
		);
		const req = {};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(req.awaitingsignoff).not.toBeUndefined();
		expect(req.awaitingsignoff.pharmacy).not.toBeUndefined();
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should fail if config missing', async () => {
		const middleware = postgresqlAwaitingSignOffMiddleware(new Pool());
		const req = {};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(next.mock.calls[0][0].message.substring(0, 30)).toMatch(
			/^password authentication failed|read ECONNRESET/i
		);
		expect(next).toHaveBeenCalledTimes(1);
	});
});
