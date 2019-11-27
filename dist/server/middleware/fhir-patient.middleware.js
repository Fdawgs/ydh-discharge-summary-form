"use strict";var request=require("request-promise");/**
 * @author Frazer Smith
 * @param {Object} config - FHIR API endpoint access config values.
 * @return {Function} express middleware
 * @description Queries FHIR API endpoints for Patient Resource using MRN or NHS No. provided.
 */module.exports=function(a){return function(b,c,d){var e;return regeneratorRuntime.async(function(c){for(;;)switch(c.prev=c.next){case 0:return e="",""!==b.query.nhsno&&"undefined"!=typeof b.query.nhsno?e="".concat(a.url,"Patient?identifier=https://fhir.nhs.uk/Id/nhs-number|").concat(b.query.nhsno):""!==b.query.mrn&&"undefined"!=typeof b.query.mrn&&(e="".concat(a.url,"Patient?identifier=https://fhir.ydh.nhs.uk/Id/local-patient-identifier|").concat(b.query.mrn)),c.next=4,regeneratorRuntime.awrap(request.get(e,a.options).then(function(a){var c={},e=a.entry[0].resource;c.patient_gender=e.gender,c.patient_dobIso=e.birthDate;// Inefficient way of getting it into DD/MM/YYYY because staff can't read ISO format,
// and localestring pushes it into American
var f=new Date(e.birthDate);if(c.patient_dob=[f.getDate(),10>f.getMonth()+1?"0".concat(f.getMonth()+1):f.getMonth()+1,f.getFullYear()].join("/"),e.name)for(var g,h=0;h<e.name.length;h+=1)if(g=e.name[h],"usual"===g.use.toString().toLowerCase()){c.patient_surname=g.family,c.patient_forename=g.given[0];break}if(e.identifier)for(var i,j=0;j<e.identifier.length;j+=1)i=e.identifier[j],"official"===i.use.toString().toLowerCase()&&"https://fhir.nhs.uk/Id/nhs-number"===i.system.toString()&&(c.patient_nhsNo=i.value),"usual"===i.use.toString().toLowerCase()&&"https://fhir.ydh.nhs.uk/Id/local-patient-identifier"===i.system.toString()&&(c.patient_mrn=i.value);if("undefined"==typeof c.patient_nhsNo&&(c.patient_nhsNo=""),e.address)for(var k,l=0;l<e.address.length;l+=1)if(k=e.address[l],"home"===k.use.toString().toLowerCase()){c.patient_addressCity=k.city,c.patient_addressPostalCode=k.postalCode,c.patient_addressDistrict=k.district,c.patient_address=k.line;break}if(e.contained)for(var m,n=0;n<e.contained.length;n+=1)if(m=e.contained[n],"organization"===m.resourceType.toString().toLowerCase()&&m.id.toString()===e.generalPractitioner[0].reference.replace("#","")){c.gp_id=m.id,c.gp_name=m.name,c.gp_address="".concat(m.address[0].line.toString(),", ").concat(m.address[0].city,", ").concat(m.address[0].postalCode);break}b.patientresource=c,d()})["catch"](function(a){d(a)}));case 4:case"end":return c.stop();}})}};