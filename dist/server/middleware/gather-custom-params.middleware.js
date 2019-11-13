"use strict";/**
 * @author Frazer Smith
 * @return {Function} express middleware
 * @todo Questioning validity of this function.
 */module.exports=function(){return function(a,b,c){var d=a.body;// Push address back into array for next page
d.patient_address=[],Object.keys(d).forEach(function(a){a.match(/patient_addressLine\d+/)&&d.patient_address.push(d[a])}),a.customparams=d,c()}};