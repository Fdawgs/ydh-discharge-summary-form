"use strict";var request=require("request-promise");/**
 * @author Frazer Smith
 * @param {Object} config - FHIR API endpoint access config values.
 * @return {Function} express middleware
 * @description Queries FHIR API endpoints for AllergyIntolerance Resource
 * using MRN and admission date.
 */module.exports=function(a){return function(b,c,d){var e;return regeneratorRuntime.async(function(c){for(;;)switch(c.prev=c.next){case 0:if(e="",""===b.customparams.patient_mrn||""===b.customparams.admission_date||""===b.customparams.discharge_date){c.next=7;break}return e="".concat(a.url,"AllergyIntolerance?patient=").concat(b.customparams.patient_mrn,"&date=ge").concat(b.customparams.admission_date,"&date=le").concat(b.customparams.discharge_date),c.next=5,regeneratorRuntime.awrap(request.get(e,a.options).then(function(a){"Bundle"===a.resourceType?0===a.total?d():(b.customparams.allergies=a.entry,d()):d()})["catch"](function(a){d(a)}));case 5:c.next=8;break;case 7:d();case 8:case"end":return c.stop();}})}};