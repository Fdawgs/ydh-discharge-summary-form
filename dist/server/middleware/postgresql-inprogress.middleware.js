"use strict";function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}/**
 * @author Frazer Smith
 * @description Query PostgreSQL DB for latest version of in-progress discharge summaries for specified patient.
 *
 * @param {Object} pool - Pool object.
 * @return {Function} express middleware
 */
module.exports=function postgresqlInprogressMiddleware(pool){
return/*#__PURE__*/function(){var _ref=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(req,res,next){var getInProgress;return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:
getInProgress=function getInProgress(){return(
pool.
query("WITH CTE\n\t\t\t\t\tAS (SELECT *,\n\t\t\t\t\tROW_NUMBER() OVER (PARTITION BY ID ORDER BY VERSION DESC) AS rn\n\t\t\t\t\tFROM public.discharge_summary)\n\t\t\t\t\tSELECT id, \"lastUpdate\", raw, version\n\t\t\t\t\tFROM CTE\n\t\t\t\t\tWHERE rn = 1\n\t\t\t\t\tAND raw->>'patient_mrn' = $1\n\t\t\t\t\tORDER BY id DESC",









[req.customparams.patient_mrn]).

then(function(response){return response.rows}))};_context.next=3;return(

getInProgress().
then(function(results){
req.customparams.in_progress_discharge_summaries=results;
next();
})["catch"](
function(err){
next(err);
}));case 3:case"end":return _context.stop();}}},_callee)}));return function(_x,_x2,_x3){return _ref.apply(this,arguments)}}();

};