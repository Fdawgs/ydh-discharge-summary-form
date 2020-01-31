"use strict";function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}var ActiveDirectory=require("activedirectory");var bodyParser=require("body-parser");var compression=require("compression");var cookieParser=require("cookie-parser");var express=require("express");var fs=require("fs");var helmet=require("helmet");var https=require("https");var http=require("http");var path=require("path");var _require=require("pg"),Pool=_require.Pool;var retrieveInProgress=require("./middleware/postgresql-inprogress.middleware");var retrieveAwaitSignOff=require("./middleware/postgresql-awaitingsignoff.middleware");var fhirPatientRecord=require("./middleware/fhir-patient.middleware");var fhirAllergyRecord=require("./middleware/fhir-allergyintolerance.middleware");var fhirEncounterRecord=require("./middleware/fhir-encounter.middleware");var adGroupMembership=require("./middleware/ad-authorization.middleware");var insertUpdateRecord=require("./middleware/postgresql-upsert.middleware");var gatherCustomParams=require("./middleware/gather-custom-params.middleware");var Server=/*#__PURE__*/function(){/**
	 * @param {Object} config - Server configuration values.
	 */function Server(){var config=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,Server);this.config=config;// Setup our express instance
this.app=express();// ejs settings
this.app.set("view engine","ejs");this.app.use(express["static"](path.join(__dirname,"../public")));this.app.set("views",path.join(__dirname,"../views"));// return self for chaining
return this}/**
	 * @author Frazer Smith
	 * @description Handles FHIR API calls.
	 * @param {Object} fhirConconfig
	 */_createClass(Server,[{key:"configureFhirRouting",value:function configureFhirRouting(fhirConconfig){// search for patient details on FHIR endpoint to attempt to auto-populate fields in forms
this.app.get("/searchpatient",fhirPatientRecord(fhirConconfig),// Only fetch patient data once
function(req,res){res.render("./pages/patient_confirmation",req.patientresource)});this.app.post("/createnew",gatherCustomParams(),fhirAllergyRecord(fhirConconfig),insertUpdateRecord(this.pool),retrieveInProgress(this.pool),/*#__PURE__*/function(){var _ref=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(req,res){return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:res.render("./pages/patient_landing",req.customparams);case 1:case"end":return _context.stop();}}},_callee)}));return function(_x,_x2){return _ref.apply(this,arguments)}}());// return self for chaining
return this}/**
	 * @author Frazer Smith
	 * @description Sets Helmet options for server.
	 */},{key:"configureHelmet",value:function configureHelmet(helmetConfig){// Use Helmet to set response headers
this.app.use(helmet(helmetConfig));// return self for chaining
return this}/**
	 * @author Frazer Smith
	 * @description Sets middleware options for server.
	 */},{key:"configureMiddleware",value:function configureMiddleware(){this.app.use(compression({level:9}));this.app.use(bodyParser.urlencoded({extended:false}));this.app.use(bodyParser.json());this.app.use(cookieParser());this.app.disable("x-powered-by");// Check AD for authorization
this.app.use(adGroupMembership(this.ad));// return self for chaining
return this}/**
	 * @author Frazer Smith
	 * @param {Object} config - Active Directory configuration values.
	 */},{key:"configureActiveDirectory",value:function configureActiveDirectory(activeDirectoryConfig){this.ad=new ActiveDirectory(activeDirectoryConfig);// return self for chaining
return this}/**
	 * @author Frazer Smith
	 * @description Creates PostgreSQL connection pool for server.
	 * @param {Object} config - PostgreSQL instance and connection settings.
	 */},{key:"configurePostgresqlgres",value:function configurePostgresqlgres(postgresqlConfig){this.pool=new Pool(postgresqlConfig);// return self for chaining
return this}/**
	 * @author Frazer Smith
	 * @description Sets routing options for navigation through server.
	 * POST requests are used as opposed to GET when requesting new pages
	 * in order to mask passed parameters in the URI from users.
	 */},{key:"configureRouting",value:function configureRouting(fhirConconfig){this.app.get("/",gatherCustomParams(),retrieveAwaitSignOff(this.pool,"dr",undefined),retrieveAwaitSignOff(this.pool,"nurse",undefined),retrieveAwaitSignOff(this.pool,"pharmacy",undefined),retrieveAwaitSignOff(this.pool,"any",undefined),function(req,res){res.render("./pages/home",req)});this.app.get("/contributors",function(req,res){res.render("./pages/contributors")});/**
		 * Stop users from attempting to GET any other page besides searchpatient. Since route and
		 * searchpatient GETs are defined before this, they won't be caught and redirected by this.
		 */this.app.get("*",function(req,res){res.redirect("/")});this.app.post("/discharge_summary",gatherCustomParams(),fhirEncounterRecord(fhirConconfig),function(req,res){res.render("./pages/discharge_summary",req.customparams)});this.app.post("/patient",gatherCustomParams(),retrieveInProgress(this.pool),function(req,res){res.render("./pages/patient_landing",req.customparams)});// Result of posting discharge summary form
this.app.post("/continue",gatherCustomParams(),fhirEncounterRecord(fhirConconfig),insertUpdateRecord(this.pool),function(req,res){res.render("./pages/discharge_summary",req.customparams)});this.app.post("/preview",gatherCustomParams(),function(req,res,next){var powerBi={id:req.customparams.row_id,version:req.customparams.version};req.powerbi=powerBi;next()},insertUpdateRecord(this.pool),function(req,res){res.render("./pages/preview",req.powerbi)});// return self for chaining
return this}/**
	 * @author Frazer Smith
	 * @description Start the server.
	 * @param {string} port - Port for server to listen on.
	 */},{key:"listen",value:function listen(port,callback){var server=this.config;// Update the express app to be an instance of createServer
if(server.https===true){var options={};// Attempt to use PFX file if present
if(server.ssl.pfx.pfx){options.pfx=fs.readFileSync(server.ssl.pfx.pfx);options.passphrase=server.ssl.pfx.passphrase}else{options.cert=fs.readFileSync(server.ssl.cert);options.key=fs.readFileSync(server.ssl.key)}this.app=https.createServer(options,this.app);this.config.protocol="https"}else{this.config.protocol="http";this.app=http.createServer(this.app)}// Start the app
this.app.listen(port,callback);// console.log(`${server.name} listening for requests at ${this.config.protocol}://127.0.0.1:${port}`);
// return self for chaining
return this}/**
	 * @author Frazer Smith
	 * @description Shut down server (non-gracefully).
	 */},{key:"close",value:function close(){this.pool.end();this.app.close();// return self for chaining
return this}}]);return Server}();module.exports=Server;