const ActiveDirectory = require('activedirectory');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const express = require('express');
const fs = require('fs');
const helmet = require('helmet');
const https = require('https');
const http = require('http');
const path = require('path');
const { Pool } = require('pg');
const retrieveInProgress = require('./middleware/postgresql-inprogress.middleware');
const retrieveAwaitSignOff = require('./middleware/postgresql-awaitingsignoff.middleware');
const fhirPatientRecord = require('./middleware/fhir-patient.middleware');
const fhirAllergyRecord = require('./middleware/fhir-allergyintolerance.middleware');
const adGroupMembership = require('./middleware/ad-authorization.middleware');
const insertUpdateRecord = require('./middleware/postgresql-upsert.middleware');
const gatherCustomParams = require('./middleware/gather-custom-params.middleware');

class Server {
	/**
	 * @param {Object} config - Server configuration values.
	 */
	constructor(config = {}) {
		this.config = config;
		// Setup our express instance
		this.app = express();

		// ejs settings
		this.app.set('view engine', 'ejs');
		this.app.use(express.static(path.join(__dirname, '../assets')));
		this.app.set('views', path.join(__dirname, '../views'));

		// return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @description Handles FHIR API calls.
	 * @param {Object} fhirConconfig
	 */
	configureFhirRouting(fhirConconfig) {
		// search for patient details on FHIR endpoint to attempt to auto-populate fields in forms
		this.app.get('/searchpatient', fhirPatientRecord(fhirConconfig), (req, res) => {
			res.render('./pages/patient_confirmation', req.patientresource);
		});

		this.app.post('/createnew', gatherCustomParams(), fhirAllergyRecord(fhirConconfig), insertUpdateRecord(this.pool), retrieveInProgress(this.pool), async (req, res) => {
			res.render('./pages/patient_landing', req.customparams);
		});

		// return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @description Sets Helmet options for server.
	 */
	configureHelmet(helmetConfig) {
		// Use Helmet to set response headers
		this.app.use(helmet(helmetConfig));

		// return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @description Sets middleware options for server.
	 */
	configureMiddleware() {
		this.app.use(compression({ level: 9 }));
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(bodyParser.json());
		this.app.use(cookieParser());
		this.app.disable('x-powered-by');

		// Check AD for authorization
		this.app.use(adGroupMembership(this.ad));

		// return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @param {Object} config - Active Directory configuration values.
	 */
	configureActiveDirectory(activeDirectoryConfig) {
		this.ad = new ActiveDirectory(activeDirectoryConfig);

		// return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @description Creates PostgreSQL connection pool for server.
	 * @param {Object} config - PostgreSQL instance and connection settings.
	 */
	configurePostgresqlgres(postgresqlConfig) {
		this.pool = new Pool(postgresqlConfig);

		// return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @description Sets routing options for navigation through server.
	 * POST requests are used as opposed to GET when requesting new pages
	 * in order to mask passed parameters in the URI from users.
	 */
	configureRouting() {
		this.app.get('/', gatherCustomParams(), retrieveAwaitSignOff(this.pool, 'dr'),
			retrieveAwaitSignOff(this.pool, 'nurse'), retrieveAwaitSignOff(this.pool, 'pharmacy'),
			(req, res) => {
				res.render('./pages/home', req);
			});

		this.app.get('/contributors', (req, res) => {
			res.render('./pages/contributors');
		});

		/**
		 * Stop users from attempting to GET any other page besides searchpatient. Since route and
		 * searchpatient GETs are defined before this, they won't be caught and redirected by this.
		 */
		this.app.get('*', (req, res) => {
			res.redirect('/');
		});

		this.app.post('/discharge_summary', gatherCustomParams(), (req, res) => {
			res.render('./pages/discharge_summary', req.customparams);
		});
		this.app.post('/patient', gatherCustomParams(), retrieveInProgress(this.pool), (req, res) => {
			res.render('./pages/patient_landing', req.customparams);
		});

		// Result of posting discharge summary form
		this.app.post('/continue', gatherCustomParams(), insertUpdateRecord(this.pool), (req, res) => {
			res.render('./pages/discharge_summary', req.customparams);
		});
		this.app.post('/preview', gatherCustomParams(),
			(req, res, next) => {
				const powerBi = { id: req.customparams.row_id, version: req.customparams.version };
				req.powerbi = powerBi; next();
			},
			insertUpdateRecord(this.pool), (req, res) => {
				res.render('./pages/preview', req.powerbi);
			});

		// return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @description Start the server.
	 * @param {string} port - Port for server to listen on.
	 */
	listen(port, callback) {
		const server = this.config;
		// Update the express app to be an instance of createServer
		if (server.https === true) {
			const options = {};
			// Attempt to use PFX file if present
			if (server.ssl.pfx.pfx) {
				options.pfx = fs.readFileSync(server.ssl.pfx.pfx);
				options.passphrase = server.ssl.pfx.passphrase;
			} else {
				options.cert = fs.readFileSync(server.ssl.cert);
				options.key = fs.readFileSync(server.ssl.key);
			}

			this.app = https.createServer(options, this.app);
			this.config.protocol = 'https';
		} else {
			this.config.protocol = 'http';
			this.app = http.createServer(this.app);
		}

		// Start the app
		this.app.listen(port, callback);
		// console.log(`${server.name} listening for requests at ${this.config.protocol}://127.0.0.1:${port}`);

		// return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @description Shut down server (non-gracefully).
	 */
	close() {
		this.pool.end();
		this.app.close();

		// return self for chaining
		return this;
	}
}

module.exports = Server;
