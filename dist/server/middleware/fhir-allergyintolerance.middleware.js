"use strict";function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}var request=require("request-promise");

/**
 * @author Frazer Smith
 * @param {Object} config - FHIR API endpoint access config values.
 * @return {Function} express middleware
 * @description Queries FHIR API endpoints for AllergyIntolerance Resource
 * using MRN and admission date.
 */
module.exports=function fhirAllergyIntoleranceMiddleware(config){
return/*#__PURE__*/function(){var _ref=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(req,res,next){var searchPath;return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:
// Retrieve data from AllergyIntolerance FHIR endpoint
searchPath="";if(!(

req.customparams.patient_mrn!==""&&
req.customparams.admission_date!==""&&
req.customparams.discharge_date!=="")){_context.next=7;break}

searchPath="".concat(config.url,"AllergyIntolerance?patient=").concat(req.customparams.patient_mrn,"&date=ge").concat(req.customparams.admission_date,"&date=le").concat(req.customparams.discharge_date);_context.next=5;return(
request.
get(searchPath,config.options).
then(function(body){
if(body.resourceType==="Bundle"){
// If no allergies present, move on
if(body.total===0){
next();
}else{
req.customparams.allergies=body.entry;
next();
}
}else{
next();
}
})["catch"](
function(err){
next(err);
}));case 5:_context.next=8;break;case 7:

next();case 8:case"end":return _context.stop();}}},_callee)}));return function(_x,_x2,_x3){return _ref.apply(this,arguments)}}();


};