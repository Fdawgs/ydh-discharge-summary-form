"use strict";/**
 * @author Frazer Smith
 * @param {Object} pool - Pool object.
 * @param {('dr'|'nurse'|'pharmacy')} signOffType - String specifying type
 * of sign-off that is still needed.
 * @return {Function} express middleware
 * @description Query PostgreSQL DB for discharge summaries awaiting sign-offs.
 */module.exports=function(a,b){return function(c,d,e){var f,g;return regeneratorRuntime.async(function(d){for(;;)switch(d.prev=d.next){case 0:d.t0=b,d.next="nurse"===d.t0?3:"dr"===d.t0?5:"pharmacy"===d.t0?7:9;break;case 3:return f="AND (raw::jsonb ? 'signoff_nurseFirstCheck' = FALSE OR raw::jsonb ? 'signoff_nurseSecondCheck' = FALSE)",d.abrupt("break",10);case 5:return f="AND (raw::jsonb ? 'signoff_drCheckbox' = FALSE)",d.abrupt("break",10);case 7:return f="AND (raw::jsonb ? 'medication_overallPharmacySignOffCheck' = FALSE) AND (json_array_length(raw->'ttos') IS NOT NULL)",d.abrupt("break",10);case 9:return d.abrupt("break",10);case 10:return g=function(){return a.query("WITH CTE\n\t\t\t\t\t\t\t\t\t\t\t\t  AS (SELECT *,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ROW_NUMBER() OVER (PARTITION BY ID ORDER BY VERSION DESC) AS rn\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tFROM public.discharge_summary)\n\t\t\t\t\t\t\t\t\t\t\t  SELECT id, \"lastUpdate\", raw, version\n\t\t\t\t\t\t\t\t\t\t\t\tFROM CTE\n\t\t\t\t\t\t\t\t\t\t\t   WHERE rn = 1\n\t\t\t\t\t\t\t\t\t\t\t   ".concat(f,"\n\t\t\t\t\t\t\t\t\t\t\tORDER BY id DESC")).then(function(a){return a.rows})},d.next=13,regeneratorRuntime.awrap(g().then(function(a){c.awaitingsignoff||(c.awaitingsignoff={}),c.awaitingsignoff["".concat(b)]=a,e()})["catch"](function(a){e(a)}));case 13:case"end":return d.stop();}})}};