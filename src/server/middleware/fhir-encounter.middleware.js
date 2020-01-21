const request = require('request-promise');

/**
 * @author Frazer Smith
 * @param {Object} config - FHIR API endpoint access config values.
 * @return {Function} express middleware
 * @description Queries FHIR API endpoints for Patient Resource using MRN or NHS No. provided.
 */
module.exports = function fhirEncounterMiddleware(config) {
	return async (req, res, next) => {
		// Retrieve data from Encounter FHIR endpoint
		let searchPath = '';
		if (
			req.patient_nhsNo !== '' &&
			typeof req.patient_nhsNo !== 'undefined'
		) {
			searchPath = `${config.url}Encounter?patient.identifier=https://fhir.nhs.uk/Id/nhs-number|${req.patient_nhsNo}&class=inpatient`;
		} else if (
			req.customparams.patient_mrn !== '' &&
			typeof req.customparams.patient_mrn !== 'undefined'
		) {
			searchPath = `${config.url}Encounter?patient.identifier=https://fhir.ydh.nhs.uk/Id/local-patient-identifier|${req.customparams.patient_mrn}&class=inpatient`;
		}

		await request
			.get(searchPath, config.options)
			.then((body) => {
				const params = [];

				const results = body.entry;

				results.forEach((element) => {
					const inpatEncounter = {};

					// Only parse inpatient encounter resources
					if (
						element.resource.class.code === 'IMP' &&
						element.resource.status !== 'cancelled'
					) {
						// Retrieve admitting specialty
						if (element.resource.type) {
							element.resource.type.forEach((specialtyType) => {
								specialtyType.coding.forEach(
									(specialtyTypeCode) => {
										if (
											specialtyTypeCode.system ===
											'https://fhir.nhs.uk/STU3/CodeSystem/DCH-Specialty-1'
										) {
											inpatEncounter.admission_specialty =
												specialtyTypeCode.display;
										}
									}
								);
							});
						}

						inpatEncounter.admission_date =
							element.resource.period.start;
						inpatEncounter.discharge_date =
							element.resource.period.end;
						// Retrieve admission and discharge method
						if (
							element.resource.hospitalization &&
							element.resource.hospitalization.extension
						) {
							element.resource.hospitalization.extension.forEach(
								(hospitalizationExtension) => {
									if (
										hospitalizationExtension.url ===
										'https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-AdmissionMethod-1'
									) {
										inpatEncounter.admission_method =
											hospitalizationExtension.valueCodeableConcept.coding[0].display;
									}

									if (
										hospitalizationExtension.url ===
										'https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-DischargeMethod-1'
									) {
										inpatEncounter.discharge_method =
											hospitalizationExtension.valueCodeableConcept.coding[0].display;
									}
								}
							);
						}

						// Retrieve admitting and discharging consultant
						if (element.resource.participant) {
							element.resource.participant.forEach(
								(participation) => {
									participation.type.forEach(
										(participationType) => {
											participationType.coding.forEach(
												(participationTypeCode) => {
													if (
														participationTypeCode.code ===
														'ADM'
													) {
														inpatEncounter.admission_careProvider =
															participation.individual.display;
													}

													if (
														participationTypeCode.code ===
														'DIS'
													) {
														inpatEncounter.discharge_careProvider =
															participation.individual.display;
													}
												}
											);
										}
									);
								}
							);
						}

						if (
							element.resource.hospitalization &&
							element.resource.hospitalization.admitSource
						) {
							inpatEncounter.admission_source =
								element.resource.hospitalization.admitSource.coding[0].display;
						}

						params.push(inpatEncounter);
					}
				});

				req.customparams.encounterresources = JSON.stringify(params);
				next();
			})
			.catch((err) => {
				next(err);
			});
	};
};
