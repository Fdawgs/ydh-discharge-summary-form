const ActiveDirectory = require('activedirectory');
const adAuthorizationMiddleware = require('./ad-authorization.middleware');
const { activeDirectoryConfig } = require('../../test.config');
require('regenerator-runtime');

describe('Active Directory authentication middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = adAuthorizationMiddleware();
		expect(typeof middleware).toBe('function');
	});

	test('Should remove YDH domain from name and store in locals', () => {
		const ad = new ActiveDirectory(activeDirectoryConfig);
		const middleware = adAuthorizationMiddleware(ad);
		const req = { headers: { 'x-iisnode-logon_user': 'YDH\\frazer.smith' } };
		const res = { locals: {} };
		const next = jest.fn();

		middleware(req, res, next);
		expect(res.locals.user).toBe('frazer.smith');
	});
});
