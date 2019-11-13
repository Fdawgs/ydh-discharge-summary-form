const request = require('request-promise');

/**
 * @author Frazer Smith
 * @param {Object} config - FHIR API endpoint access config values.
 * @return {Function} express middleware
 * @description Queries FHIR API endpoints for Patient Resource using MRN or NHS No. provided.
 */
module.exports = function fhirPatientMiddleware(config) {
	return async (req, res, next) => {
		// Retrieve data from Patient FHIR endpoint
		let searchPath = '';
		if (req.query.nhsno !== '' && typeof req.query.nhsno !== 'undefined') {
			searchPath = `${config.url}Patient?identifier=https://fhir.nhs.uk/Id/nhs-number|${req.query.nhsno}`;
		} else if (req.query.mrn !== '' && typeof req.query.mrn !== 'undefined') {
			searchPath = `${config.url}Patient?identifier=https://fhir.ydh.nhs.uk/Id/local-patient-identifier|${req.query.mrn}`;
		}

		await request.get(searchPath, config.options)
			.then((body) => {
				const params = {
				};

				const result = body.entry[0].resource;

				params.patient_gender = result.gender;
				params.patient_dobIso = result.birthDate;

				// Stupid way of getting it into DD/MM/YYYY because for some reason people can't read ISO,
				// and localestring pushes it into American
				const birthDate = new Date(result.birthDate);
				params.patient_dob = [
					birthDate.getDate(),
					((birthDate.getMonth() + 1) < 10 ? `0${birthDate.getMonth() + 1}` : (birthDate.getMonth() + 1)),
					birthDate.getFullYear()
				].join('/');

				if (result.name) {
					for (let index = 0; index < result.name.length; index += 1) {
						const element = result.name[index];
						if (element.use.toString().toLowerCase() === 'usual') {
							params.patient_surname = element.family;
							params.patient_forename = element.given[0];
							break;
						}
					}
				}

				if (result.identifier) {
					for (let index = 0; index < result.identifier.length; index += 1) {
						const element = result.identifier[index];
						if (element.use.toString().toLowerCase() === 'official' && element.system.toString() === 'https://fhir.nhs.uk/Id/nhs-number') {
							params.patient_nhsNo = element.value;
						}
						if (element.use.toString().toLowerCase() === 'usual' && element.system.toString() === 'https://fhir.ydh.nhs.uk/Id/local-patient-identifier') {
							params.patient_mrn = element.value;
						}
					}
				}

				if (typeof params.patient_nhsNo === 'undefined') {
					params.patient_nhsNo = '';
				}

				if (result.address) {
					for (let index = 0; index < result.address.length; index += 1) {
						const element = result.address[index];
						if (element.use.toString().toLowerCase() === 'home') {
							params.patient_addressCity = element.city;
							params.patient_addressPostalCode = element.postalCode;
							params.patient_addressDistrict = element.district;
							params.patient_address = element.line;
							break;
						}
					}
				}

				if (result.contained) {
					for (let index = 0; index < result.contained.length; index += 1) {
						const element = result.contained[index];
						if (element.resourceType.toString().toLowerCase() === 'organization' && element.id.toString() === result.generalPractitioner[0].reference.replace('#', '')) {
							params.gp_id = element.id;
							params.gp_name = element.name;
							params.gp_address = `${element.address[0].line.toString()}, ${element.address[0].city}, ${element.address[0].postalCode}`;
							break;
						}
					}
				}

				req.patientresource = params;
				next();
			})
			.catch((err) => {
				next(err);
			});
	};
};
