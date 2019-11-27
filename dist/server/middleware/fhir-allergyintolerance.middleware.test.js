"use strict";function _typeof(a){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}var fhirAllergyIntoleranceMiddleware=require("./fhir-allergyintolerance.middleware"),_require=require("../../test.config"),fhirConConfig=_require.fhirConConfig;require("regenerator-runtime"),describe("FHIR AllergyIntolerance middleware",function(){beforeAll(function(){jest.setTimeout(3e4)}),test("Should return a middleware function",function(){var a=fhirAllergyIntoleranceMiddleware();expect(_typeof(a)).toBe("function")}),test("Should populate allergies req custom parameter if params populated correctly",function(){var a,b,c,d;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return a=fhirAllergyIntoleranceMiddleware(fhirConConfig),b={customparams:{admission_date:"2000-01-01",discharge_date:"2019-12-31",patient_mrn:"5484125"// test patient with many allergies
}},c={},d=jest.fn(),e.next=6,regeneratorRuntime.awrap(a(b,c,d));case 6:expect(_typeof(b.customparams.allergies)).toBe("object"),expect(d).toHaveBeenCalledTimes(1);case 8:case"end":return e.stop();}})}),test("Should continue if patient has no recorded allergies",function(){var a,b,c,d;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return a=fhirAllergyIntoleranceMiddleware(fhirConConfig),b={customparams:{admission_date:"2000-01-01",discharge_date:"2019-12-31",patient_mrn:"008017610"// test patient with no allergies
}},c={},d=jest.fn(),e.next=6,regeneratorRuntime.awrap(a(b,c,d));case 6:expect(b.customparams.allergies).toBeUndefined(),expect(d).toHaveBeenCalledTimes(1);case 8:case"end":return e.stop();}})}),test("Should fail to populate allergies req custom parameter if date params are missing",function(){var a,b,c,d;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return a=fhirAllergyIntoleranceMiddleware(fhirConConfig),b={customparams:{admission_date:"",discharge_date:"",patient_mrn:"5484125"}},c={},d=jest.fn(),e.next=6,regeneratorRuntime.awrap(a(b,c,d));case 6:expect(_typeof(b.customparams.allergies)).not.toBe("object"),expect(d).toHaveBeenCalledTimes(1);case 8:case"end":return e.stop();}})}),test("Should fail to populate allergies req custom parameter if params are malformed",function(){var a,b,c,d;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return a=fhirAllergyIntoleranceMiddleware(fhirConConfig),b={customparams:{admission_date:"geter",discharge_date:"le2019-01-01",patient_mrn:"5484125"}},c={},d=jest.fn(),e.next=6,regeneratorRuntime.awrap(a(b,c,d));case 6:expect(_typeof(b.customparams.allergies)).not.toBe("object"),expect(d).toHaveBeenCalledTimes(1);case 8:case"end":return e.stop();}})}),test("Should fail to populate allergies req custom parameter if mrn param is missing",function(){var a,b,c,d;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return a=fhirAllergyIntoleranceMiddleware(fhirConConfig),b={customparams:{admission_date:"",discharge_date:"",patient_mrn:""}},c={},d=jest.fn(),e.next=6,regeneratorRuntime.awrap(a(b,c,d));case 6:expect(_typeof(b.customparams.allergies)).not.toBe("object"),expect(d).toHaveBeenCalledTimes(1);case 8:case"end":return e.stop();}})})});