"use strict";function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}var request=require("request-promise");

/**
 * @author Frazer Smith
 * @param {Object} config - FHIR API endpoint access config values.
 * @return {Function} express middleware
 * @description Queries FHIR API endpoints for Patient Resource using MRN or NHS No. provided.
 */
module.exports=function fhirPatientMiddleware(config){
return/*#__PURE__*/function(){var _ref=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(req,res,next){var searchPath;return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:
// Retrieve data from Patient FHIR endpoint
searchPath="";
if(req.query.nhsno!==""&&typeof req.query.nhsno!=="undefined"){
searchPath="".concat(config.url,"Patient?identifier=https://fhir.nhs.uk/Id/nhs-number|").concat(req.query.nhsno);
}else if(
req.query.mrn!==""&&
typeof req.query.mrn!=="undefined")
{
searchPath="".concat(config.url,"Patient?identifier=https://fhir.ydh.nhs.uk/Id/local-patient-identifier|").concat(req.query.mrn);
}else{
res.redirect(400,"back");
}_context.next=4;return(

request.
get(searchPath,config.options).
then(function(body){
var params={};

var result=body.entry[0].resource;

params.patient_gender=result.gender;
params.patient_dobIso=result.birthDate;

// Inefficient way of getting it into DD/MM/YYYY because staff can't read ISO format,
// and localestring pushes it into American
var birthDate=new Date(result.birthDate);
params.patient_dob=[
birthDate.getDate(),
birthDate.getMonth()+1<10?"0".concat(
birthDate.getMonth()+1):
birthDate.getMonth()+1,
birthDate.getFullYear()].
join("/");

if(result.name){
for(
var index=0;
index<result.name.length;
index+=1)
{
var element=result.name[index];
if(element.use.toString().toLowerCase()==="usual"){
params.patient_surname=element.family;
params.patient_forename=element.given[0];
break;
}
}
}

if(result.identifier){
for(
var _index=0;
_index<result.identifier.length;
_index+=1)
{
var _element=result.identifier[_index];
if(
_element.use.toString().toLowerCase()===
"official"&&
_element.system.toString()===
"https://fhir.nhs.uk/Id/nhs-number")
{
params.patient_nhsNo=_element.value;
}
if(
_element.use.toString().toLowerCase()==="usual"&&
_element.system.toString()===
"https://fhir.ydh.nhs.uk/Id/local-patient-identifier")
{
params.patient_mrn=_element.value;
}
}
}

if(typeof params.patient_nhsNo==="undefined"){
params.patient_nhsNo="";
}

if(result.address){
for(
var _index2=0;
_index2<result.address.length;
_index2+=1)
{
var _element2=result.address[_index2];
if(_element2.use.toString().toLowerCase()==="home"){
params.patient_addressCity=_element2.city;
params.patient_addressPostalCode=
_element2.postalCode;
params.patient_addressDistrict=_element2.district;
params.patient_address=_element2.line;
break;
}
}
}

if(result.contained){
for(
var _index3=0;
_index3<result.contained.length;
_index3+=1)
{
var _element3=result.contained[_index3];
if(
_element3.resourceType.toString().toLowerCase()===
"organization"&&
_element3.id.toString()===
result.generalPractitioner[0].reference.replace(
"#",
""))

{
params.gp_id=_element3.id;
params.gp_name=_element3.name;
params.gp_address="".concat(_element3.address[0].line.toString(),", ").concat(
_element3.address[0].city,", ").concat(
_element3.address[0].postalCode);
break;
}
}
}

req.patientresource=params;
next();
})["catch"](
function(){
res.redirect(400,"back");
}));case 4:case"end":return _context.stop();}}},_callee)}));return function(_x,_x2,_x3){return _ref.apply(this,arguments)}}();

};