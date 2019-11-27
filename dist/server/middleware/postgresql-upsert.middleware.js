"use strict";function _typeof(a){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}/* eslint-disable max-len */ /**
 * @author Frazer Smith
 * @param {Object} pool - Pool object.
 * @return {Function} express middleware
 * @description Transforms and upserts discharge summary to PostgreSQL DB.
 * @todo Convert queries within to parameterised ones to prevent SQL injections.
 * @todo Attempt to make this code dynamic.
 */module.exports=function(a){return function(b,c,d){var e,f,g,h,l,m,n,o,p,q,r,s;return regeneratorRuntime.async(function(i){for(;;)switch(i.prev=i.next){case 0:// Push follow-up appointments, medication changes, and ttos into objects rather
// than keep in array/strings, far more structured and safer
if("undefined"!=typeof b.customparams.followup_with){if(b.customparams.followups=[],"object"===_typeof(b.customparams.followup_with))for(e=0;e<b.customparams.followup_with.length;e+=1)f={followup_details:b.customparams.followup_details[e],followup_interval:b.customparams.followup_interval[e],followup_intervalNumber:b.customparams.followup_intervalNumber[e],followup_notes:b.customparams.followup_notes[e],followup_with:b.customparams.followup_with[e]},b.customparams.followups.push(f);else g={followup_details:b.customparams.followup_details,followup_interval:b.customparams.followup_interval,followup_intervalNumber:b.customparams.followup_intervalNumber,followup_notes:b.customparams.followup_notes,followup_with:b.customparams.followup_with},b.customparams.followups.push(g);delete b.customparams.followup_details,delete b.customparams.followup_interval,delete b.customparams.followup_intervalNumber,delete b.customparams.followup_notes,delete b.customparams.followup_with}if("undefined"!=typeof b.customparams.medication_changedMed){if(b.customparams.changedmeds=[],"object"===_typeof(b.customparams.medication_changedMed))for(h=0;h<b.customparams.medication_changedMed.length;h+=1)l={medication_changedMed:b.customparams.medication_changedMed[h],medication_changedPlan:b.customparams.medication_changedPlan[h],medication_changedReason:b.customparams.medication_changedReason[h]},b.customparams.changedmeds.push(l);else m={medication_changedMed:b.customparams.medication_changedMed,medication_changedPlan:b.customparams.medication_changedPlan,medication_changedReason:b.customparams.medication_changedReason},b.customparams.changedmeds.push(m);delete b.customparams.medication_changedMed,delete b.customparams.medication_changedPlan,delete b.customparams.medication_changedReason}if("undefined"!=typeof b.customparams.medication_ttoMedication){if(b.customparams.ttos=[],"object"===_typeof(b.customparams.medication_ttoMedication))for(n=0;n<b.customparams.medication_ttoMedication.length;n+=1)o={medication_finalPharmacySignOffCheck:b.customparams.medication_finalPharmacySignOffCheck[n],medication_finalPharmacySignOffDate:b.customparams.medication_finalPharmacySignOffDate[n],medication_finalPharmacySignOffName:b.customparams.medication_finalPharmacySignOffName[n],medication_finalPharmacySignOffTime:b.customparams.medication_finalPharmacySignOffTime[n],medication_ttoComments:b.customparams.medication_ttoComments[n],medication_ttoDose:b.customparams.medication_ttoDose[n],medication_ttoFrequency:b.customparams.medication_ttoFrequency[n],medication_ttoLengthOfCourse:b.customparams.medication_ttoLengthOfCourse[n],medication_ttoLockDate:b.customparams.medication_ttoLockDate[n],medication_ttoLockUser:b.customparams.medication_ttoLockUser[n],medication_ttoMedication:b.customparams.medication_ttoMedication[n],medication_ttoPharmacyAvailability:b.customparams.medication_ttoPharmacyAvailability[n],medication_ttoPharmacySignOffCheck:b.customparams.medication_ttoPharmacySignOffCheck[n],medication_ttoPharmacySignOffDate:b.customparams.medication_ttoPharmacySignOffDate[n],medication_ttoPharmacySignOffName:b.customparams.medication_ttoPharmacySignOffName[n],medication_ttoPharmacySignOffTime:b.customparams.medication_ttoPharmacySignOffTime[n],medication_ttoRoute:b.customparams.medication_ttoRoute[n],medication_ttoStartDate:b.customparams.medication_ttoStartDate[n],medication_ttoUnit:b.customparams.medication_ttoUnit[n]},b.customparams.ttos.push(o);else p={medication_finalPharmacySignOffCheck:b.customparams.medication_finalPharmacySignOffCheck,medication_finalPharmacySignOffDate:b.customparams.medication_finalPharmacySignOffDate,medication_finalPharmacySignOffName:b.customparams.medication_finalPharmacySignOffName,medication_finalPharmacySignOffTime:b.customparams.medication_finalPharmacySignOffTime,medication_ttoComments:b.customparams.medication_ttoComments,medication_ttoDose:b.customparams.medication_ttoDose,medication_ttoFrequency:b.customparams.medication_ttoFrequency,medication_ttoLengthOfCourse:b.customparams.medication_ttoLengthOfCourse,medication_ttoLockDate:b.customparams.medication_ttoLockDate,medication_ttoLockUser:b.customparams.medication_ttoLockUser,medication_ttoMedication:b.customparams.medication_ttoMedication,medication_ttoPharmacyAvailability:b.customparams.medication_ttoPharmacyAvailability,medication_ttoPharmacySignOffCheck:b.customparams.medication_ttoPharmacySignOffCheck,medication_ttoPharmacySignOffDate:b.customparams.medication_ttoPharmacySignOffDate,medication_ttoPharmacySignOffName:b.customparams.medication_ttoPharmacySignOffName,medication_ttoPharmacySignOffTime:b.customparams.medication_ttoPharmacySignOffTime,medication_ttoRoute:b.customparams.medication_ttoRoute,medication_ttoUnit:b.customparams.medication_ttoUnit},b.customparams.ttos.push(p);delete b.customparams.medication_finalPharmacySignOffCheck,delete b.customparams.medication_finalPharmacySignOffDate,delete b.customparams.medication_finalPharmacySignOffName,delete b.customparams.medication_finalPharmacySignOffTime,delete b.customparams.medication_ttoComments,delete b.customparams.medication_ttoDose,delete b.customparams.medication_ttoFrequency,delete b.customparams.medication_ttoLengthOfCourse,delete b.customparams.medication_ttoLockDate,delete b.customparams.medication_ttoLockUser,delete b.customparams.medication_ttoMedication,delete b.customparams.medication_ttoPharmacyAvailability,delete b.customparams.medication_ttoPharmacySignOffCheck,delete b.customparams.medication_ttoPharmacySignOffDate,delete b.customparams.medication_ttoPharmacySignOffName,delete b.customparams.medication_ttoPharmacySignOffTime,delete b.customparams.medication_ttoRoute,delete b.customparams.medication_ttoUnit}// Stop id and version being inserted into raw body
q=b.customparams.row_id,r=+b.customparams.version,delete b.customparams.row_id,delete b.customparams.version,b.customparams.lastUpdatedBy=c.locals.user,i.t0=b.customparams.action,i.next="Create New Form and Continue"===i.t0?11:"Create New Form and Exit"===i.t0?11:"Create New Form and Submit discharge summary"===i.t0?11:"Save and Continue"===i.t0?14:"Save and Exit"===i.t0?14:"Save and Submit discharge summary"===i.t0?14:"Save and Preview"===i.t0?14:11;break;case 11:return delete b.customparams.action,s="INSERT INTO public.discharge_summary(\"lastUpdate\", \"raw\", version)\n\t\tVALUES(CURRENT_TIMESTAMP, '".concat(JSON.stringify(b.customparams),"', 1)\n\t\tRETURNING id, \"lastUpdate\", \"raw\", version;"),i.abrupt("break",17);case 14:return delete b.customparams.action,s="INSERT INTO public.discharge_summary(id, \"lastUpdate\", \"raw\", version)\n\t\tVALUES('".concat(q,"', CURRENT_TIMESTAMP, '").concat(JSON.stringify(b.customparams),"', ").concat(r+=1,")\n\t\tON CONFLICT (id, version) DO UPDATE SET id ='").concat(q,"', version = ").concat(r,"\n\t\tRETURNING id, \"lastUpdate\", \"raw\", version;"),i.abrupt("break",17);case 17:return i.next=19,regeneratorRuntime.awrap(a.query(s).then(function(a){b.customparams.query={command:a.command},b.customparams.row_id=a.rows[0].id;var c=new Date(a.rows[0].lastUpdate),e=[c.getDate(),10>c.getMonth()+1?"0".concat(c.getMonth()+1):c.getMonth()+1,c.getFullYear()].join("/");b.customparams.lastUpdate="".concat(e," ").concat(new Date(a.rows[0].lastUpdate).toLocaleTimeString()),b.customparams.version=a.rows[0].version,1===a.rowCount?(b.customparams.query.result="success",d()):(b.customparams.query.result="warning",d())})["catch"](function(a){d(a)}));case 19:case"end":return i.stop();}})}};