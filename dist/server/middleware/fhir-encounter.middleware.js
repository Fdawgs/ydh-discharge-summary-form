"use strict";function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}var request=require("request-promise");

/**
 * @author Frazer Smith
 * @param {Object} config - FHIR API endpoint access config values.
 * @return {Function} express middleware
 * @description Queries FHIR API endpoints for Patient Resource using MRN or NHS No. provided.
 */
module.exports=function fhirEncounterMiddleware(config){
return/*#__PURE__*/function(){var _ref=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(req,res,next){var searchPath;return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:
// Retrieve data from Encounter FHIR endpoint
searchPath="";
if(
req.patient_nhsNo!==""&&
typeof req.patient_nhsNo!=="undefined")
{
searchPath="".concat(config.url,"Encounter?patient.identifier=https://fhir.nhs.uk/Id/nhs-number|").concat(req.patient_nhsNo,"&class=inpatient");
}else if(
req.customparams.patient_mrn!==""&&
typeof req.customparams.patient_mrn!=="undefined")
{
searchPath="".concat(config.url,"Encounter?patient.identifier=https://fhir.ydh.nhs.uk/Id/local-patient-identifier|").concat(req.customparams.patient_mrn,"&class=inpatient");
}_context.next=4;return(

request.
get(searchPath,config.options).
then(function(body){
var params=[];

var results=body.entry;
if(body.total===0){
res.redirect(400,"back");
}else{
results.forEach(function(element){
var inpatEncounter={};

// Only parse inpatient encounter resources
if(
element.resource["class"].code==="IMP"&&
element.resource.status!=="cancelled")
{
// Retrieve admitting specialty
if(element.resource.type){
element.resource.type.forEach(
function(specialtyType){
specialtyType.extension.forEach(
function(specialtyTypeExtension){
if(
specialtyTypeExtension.
valueCodeableConcept.
coding[0].system===
"https://fhir.ydh.nhs.uk/STU3/ValueSet/Extension-YDH-SpecialtyContext-1"&&
specialtyTypeExtension.
valueCodeableConcept.
coding[0].code===
"DIS")
{
inpatEncounter.admission_specialty=
specialtyType.coding[0].display;
}

if(
specialtyTypeExtension.
valueCodeableConcept.
coding[0].system===
"https://fhir.ydh.nhs.uk/STU3/ValueSet/Extension-YDH-SpecialtyContext-1"&&
specialtyTypeExtension.
valueCodeableConcept.
coding[0].code===
"ADM")
{
inpatEncounter.discharge_specialty=
specialtyType.coding[0].display;
}
});

});

}

// Retrieve admitting and discharging ward
if(element.resource.location){
element.resource.location.forEach(
function(wardLocation){
if(wardLocation.period.start){
inpatEncounter.admission_ward=
wardLocation.location.display;
}
if(wardLocation.period.end){
inpatEncounter.discharge_ward=
wardLocation.location.display;
}
});

}

inpatEncounter.admission_date=
element.resource.period.start;
inpatEncounter.discharge_date=
element.resource.period.end;
// Retrieve admission and discharge method
if(
element.resource.hospitalization&&
element.resource.hospitalization.extension)
{
element.resource.hospitalization.extension.forEach(
function(hospitalizationExtension){
if(
hospitalizationExtension.url===
"https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-AdmissionMethod-1")
{
inpatEncounter.admission_method=
hospitalizationExtension.valueCodeableConcept.coding[0].display;
}

if(
hospitalizationExtension.url===
"https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-DischargeMethod-1")
{
inpatEncounter.discharge_method=
hospitalizationExtension.valueCodeableConcept.coding[0].display;
}
});

}

// Retrieve admitting and discharging consultant
if(element.resource.participant){
element.resource.participant.forEach(
function(participation){
participation.type.forEach(
function(participationType){
participationType.coding.forEach(
function(participationTypeCode){
if(
participationTypeCode.code===
"ADM")
{
inpatEncounter.admission_careProvider=
participation.individual.display;
}

if(
participationTypeCode.code===
"DIS")
{
inpatEncounter.discharge_careProvider=
participation.individual.display;
}
});

});

});

}

if(
element.resource.hospitalization&&
element.resource.hospitalization.admitSource)
{
inpatEncounter.admission_source=
element.resource.hospitalization.admitSource.coding[0].display;
}

params.push(inpatEncounter);
}
});

req.customparams.encounterresources=JSON.stringify(
params);

next();
}
})["catch"](
function(err){
next(err);
}));case 4:case"end":return _context.stop();}}},_callee)}));return function(_x,_x2,_x3){return _ref.apply(this,arguments)}}();

};