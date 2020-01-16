"use strict";function asyncGeneratorStep(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function _asyncToGenerator(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){function f(a){asyncGeneratorStep(h,d,e,f,g,"next",a)}function g(a){asyncGeneratorStep(h,d,e,f,g,"throw",a)}var h=a.apply(b,c);f(void 0)})}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}var ActiveDirectory=require("activedirectory"),bodyParser=require("body-parser"),compression=require("compression"),cookieParser=require("cookie-parser"),express=require("express"),fs=require("fs"),helmet=require("helmet"),https=require("https"),http=require("http"),path=require("path"),_require=require("pg"),Pool=_require.Pool,retrieveInProgress=require("./middleware/postgresql-inprogress.middleware"),retrieveAwaitSignOff=require("./middleware/postgresql-awaitingsignoff.middleware"),fhirPatientRecord=require("./middleware/fhir-patient.middleware"),fhirAllergyRecord=require("./middleware/fhir-allergyintolerance.middleware"),fhirEncounterRecord=require("./middleware/fhir-encounter.middleware"),adGroupMembership=require("./middleware/ad-authorization.middleware"),insertUpdateRecord=require("./middleware/postgresql-upsert.middleware"),gatherCustomParams=require("./middleware/gather-custom-params.middleware"),Server=/*#__PURE__*/function(){/**
	 * @param {Object} config - Server configuration values.
	 */function a(){var b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};// return self for chaining
return _classCallCheck(this,a),this.config=b,this.app=express(),this.app.set("view engine","ejs"),this.app.use(express["static"](path.join(__dirname,"../public"))),this.app.set("views",path.join(__dirname,"../views")),this}/**
	 * @author Frazer Smith
	 * @description Handles FHIR API calls.
	 * @param {Object} fhirConconfig
	 */return _createClass(a,[{key:"configureFhirRouting",value:function configureFhirRouting(a){// return self for chaining
return this.app.get("/searchpatient",fhirPatientRecord(a),// Only fetch patient data once
function(a,b){b.render("./pages/patient_confirmation",a.patientresource)}),this.app.post("/createnew",gatherCustomParams(),fhirAllergyRecord(a),insertUpdateRecord(this.pool),retrieveInProgress(this.pool),/*#__PURE__*/function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b,c){return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:c.render("./pages/patient_landing",b.customparams);case 1:case"end":return a.stop();}},a)}));return function(){return a.apply(this,arguments)}}()),this}/**
	 * @author Frazer Smith
	 * @description Sets Helmet options for server.
	 */},{key:"configureHelmet",value:function configureHelmet(a){// return self for chaining
return this.app.use(helmet(a)),this}/**
	 * @author Frazer Smith
	 * @description Sets middleware options for server.
	 */},{key:"configureMiddleware",value:function configureMiddleware(){// return self for chaining
return this.app.use(compression({level:9})),this.app.use(bodyParser.urlencoded({extended:!1})),this.app.use(bodyParser.json()),this.app.use(cookieParser()),this.app.disable("x-powered-by"),this.app.use(adGroupMembership(this.ad)),this}/**
	 * @author Frazer Smith
	 * @param {Object} config - Active Directory configuration values.
	 */},{key:"configureActiveDirectory",value:function configureActiveDirectory(a){// return self for chaining
return this.ad=new ActiveDirectory(a),this}/**
	 * @author Frazer Smith
	 * @description Creates PostgreSQL connection pool for server.
	 * @param {Object} config - PostgreSQL instance and connection settings.
	 */},{key:"configurePostgresqlgres",value:function configurePostgresqlgres(a){// return self for chaining
return this.pool=new Pool(a),this}/**
	 * @author Frazer Smith
	 * @description Sets routing options for navigation through server.
	 * POST requests are used as opposed to GET when requesting new pages
	 * in order to mask passed parameters in the URI from users.
	 */},{key:"configureRouting",value:function configureRouting(a){// return self for chaining
return this.app.get("/",gatherCustomParams(),retrieveAwaitSignOff(this.pool,"dr"),retrieveAwaitSignOff(this.pool,"nurse"),retrieveAwaitSignOff(this.pool,"pharmacy"),function(a,b){b.render("./pages/home",a)}),this.app.get("/contributors",function(a,b){b.render("./pages/contributors")}),this.app.get("*",function(a,b){b.redirect("/")}),this.app.post("/discharge_summary",gatherCustomParams(),fhirEncounterRecord(a),function(a,b){b.render("./pages/discharge_summary",a.customparams)}),this.app.post("/patient",gatherCustomParams(),retrieveInProgress(this.pool),function(a,b){b.render("./pages/patient_landing",a.customparams)}),this.app.post("/continue",gatherCustomParams(),insertUpdateRecord(this.pool),function(a,b){b.render("./pages/discharge_summary",a.customparams)}),this.app.post("/preview",gatherCustomParams(),function(a,b,c){var d={id:a.customparams.row_id,version:a.customparams.version};a.powerbi=d,c()},insertUpdateRecord(this.pool),function(a,b){b.render("./pages/preview",a.powerbi)}),this}/**
	 * @author Frazer Smith
	 * @description Start the server.
	 * @param {string} port - Port for server to listen on.
	 */},{key:"listen",value:function listen(a,b){var c=this.config;// Update the express app to be an instance of createServer
if(!0===c.https){var d={};// Attempt to use PFX file if present
c.ssl.pfx.pfx?(d.pfx=fs.readFileSync(c.ssl.pfx.pfx),d.passphrase=c.ssl.pfx.passphrase):(d.cert=fs.readFileSync(c.ssl.cert),d.key=fs.readFileSync(c.ssl.key)),this.app=https.createServer(d,this.app),this.config.protocol="https"}else this.config.protocol="http",this.app=http.createServer(this.app);// Start the app
// console.log(`${server.name} listening for requests at ${this.config.protocol}://127.0.0.1:${port}`);
// return self for chaining
return this.app.listen(a,b),this}/**
	 * @author Frazer Smith
	 * @description Shut down server (non-gracefully).
	 */},{key:"close",value:function close(){// return self for chaining
return this.pool.end(),this.app.close(),this}}]),a}();module.exports=Server;