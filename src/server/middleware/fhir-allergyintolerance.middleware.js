const request = require('request-promise');

/**
 * @author Frazer Smith
 * @param {Object} config - FHIR API endpoint access config values.
 * @return {Function} express middleware
 * @description Queries FHIR API endpoints for AllergyIntolerance Resource
 * using MRN and admission date.
 */
module.exports = function fhirAllergyIntoleranceMiddleware(config) {
	return async (req, res, next) => {
		// Retrieve data from AllergyIntolerance FHIR endpoint
		let searchPath = '';
		if (req.customparams.patient_mrn !== '' && req.customparams.admission_date !== '' && req.customparams.discharge_date !== '') {
			searchPath = `${config.url}AllergyIntolerance?patient=${req.customparams.patient_mrn}&date=ge${req.customparams.admission_date}&date=le${req.customparams.discharge_date}`;
			await request.get(searchPath, config.options)
				.then((body) => {
					if (body.resourceType === 'Bundle') {
						// If no allergies present, move on
						if (body.total === 0) {
							next();
						} else {
							req.customparams.allergies = body.entry;
							next();
						}
					} else {
						next();
					}
				})
				.catch((err) => {
					next(err);
				});
		} else {
			next();
		}
	};
};
