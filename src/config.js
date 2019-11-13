const activeDirectoryConfig = {
	baseDN: '',
	password: '',
	url: '',
	username: ''
};

const fhirConConfig = {
	options: {
		gzip: true,
		headers: {
			Accept: '*/*',
			Authorization: '',
			'Cache-Control': 'no-cache',
			'Content-Type': 'application/fhir+json',
			'accept-encoding': 'gzip, deflate',
			'x-api-key': ''
		},
		json: true,
		rejectUnauthorized: false

	},
	url: ''
};

/**
 * The following headers are turned on by default:
 * - dnsPrefetchControl (Controle browser DNS prefetching). https://helmetjs.github.io/docs/dns-prefetch-control
 * - frameguard (prevent clickjacking). https://helmetjs.github.io/docs/frameguard
 * - hidePoweredBy (remove the X-Powered-By header). https://helmetjs.github.io/docs/hide-powered-by
 * - hsts (HTTP strict transport security). https://helmetjs.github.io/docs/hsts
 * - ieNoOpen (sets X-Download-Options for IE8+). https://helmetjs.github.io/docs/ienoopen
 * - noSniff (prevent clients from sniffing MIME type). https://helmetjs.github.io/docs/dont-sniff-mimetype
 * - xssFilter (adds small XSS protections). https://helmetjs.github.io/docs/xss-filter/
 */
const helmetConfig = {
	contentSecurityPolicy: {
		directives: {
			// defaultSrc: ['\'self\''],
			scriptSrc: ['\'self\'', '\'unsafe-inline\''],
			styleSrc: ['\'self\'', '\'unsafe-inline\'']
		}
	},
	hidePoweredBy: true,
	noCache: true
};

const postgresqlConfig = {
	database: 'discharge',
	host: '127.0.0.1',
	password: 'password',
	port: 5432,
	user: 'app'
};

const serverConfig = {
	https: false,
	name: 'YDH-Discharge-Summary-Forms',
	port: process.env.PORT,
	ssl: {
		cert: 'ssl_certs/ydhclientcert.cer',
		key: 'ssl_certs/ydhclientcert.key',
		pfx: {

		}
	}
};

module.exports = {
	activeDirectoryConfig,
	fhirConConfig,
	helmetConfig,
	postgresqlConfig,
	serverConfig
};
