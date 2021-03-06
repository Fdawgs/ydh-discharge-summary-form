"use strict";function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}/**
 * @author Frazer Smith
 * @description Query PostgreSQL DB for discharge summaries awaiting sign-offs.
 *
 * @param {Object} pool - Pool object.
 * @param {('any'|'dr'|'nurse'|'pharmacy'|'ward')} signOffType - String specifying type of view to generate.
 * @param {String=} ward - optional if signOffType param not set to 'ward'.
 * @return {Function} express middleware
 */
module.exports=function postgresqlAwaitingSignOffMiddleware(
pool,
signOffType,
ward)
{
return/*#__PURE__*/function(){var _ref=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(req,res,next){var predicateParts,getInProgress;return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:
predicateParts={
any:"(raw::jsonb ? 'signoff_drCheckbox' = FALSE OR raw::jsonb ? 'medication_overallPharmacySignOffCheck' = FALSE OR raw::jsonb ? 'signoff_nurseFirstCheck' = FALSE OR raw::jsonb ? 'signoff_nurseSecondCheck' = FALSE)",
dr:"(raw::jsonb ? 'signoff_drCheckbox' = FALSE)",
nurse:
"(raw::jsonb ? 'signoff_nurseFirstCheck' = FALSE OR raw::jsonb ? 'signoff_nurseSecondCheck' = FALSE)",
pharmacy:
"(raw::jsonb ? 'medication_overallPharmacySignOffCheck' = FALSE) AND (json_array_length(raw->'ttos') IS NOT NULL)",
ward:"(raw::jsonb ? 'discharge_ward' = ".concat(ward," AND (raw::jsonb ? 'signoff_drCheckbox' = FALSE OR raw::jsonb ? 'medication_overallPharmacySignOffCheck' = FALSE OR raw::jsonb ? 'signoff_nurseFirstCheck' = FALSE OR raw::jsonb ? 'signoff_nurseSecondCheck' = FALSE))")};


getInProgress=function getInProgress(){return(
pool.
query("WITH CTE\n\t\t\t\t\tAS (SELECT *,\n\t\t\t\t\tROW_NUMBER() OVER (PARTITION BY ID ORDER BY VERSION DESC) AS rn\n\t\t\t\t\tFROM public.discharge_summary)\n\t\t\t\t\tSELECT id, \"lastUpdate\", raw, version\n\t\t\t\t\tFROM CTE\n\t\t\t\t\tWHERE rn = 1\n\t\t\t\t\tAND ".concat(







predicateParts[signOffType],"\n\t\t\t\t\tORDER BY id DESC")).


then(function(response){return response.rows}))};_context.next=4;return(

getInProgress().
then(function(results){
if(!req.awaitingsignoff){
req.awaitingsignoff={};
}

req.awaitingsignoff["".concat(signOffType)]=results;
next();
})["catch"](
function(err){
next(err);
}));case 4:case"end":return _context.stop();}}},_callee)}));return function(_x,_x2,_x3){return _ref.apply(this,arguments)}}();

};