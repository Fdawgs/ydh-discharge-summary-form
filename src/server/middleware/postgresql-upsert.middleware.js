/* eslint-disable max-len */
/**
 * @author Frazer Smith
 * @param {Object} pool - Pool object.
 * @return {Function} express middleware
 * @description Transforms and upserts discharge summary to PostgreSQL DB.
 * @todo Convert queries within to parameterised ones to prevent SQL injections.
 * @todo Attempt to make this code dynamic.
 */
module.exports = function postgresqlUpsertMiddleware(pool) {
	return async (req, res, next) => {
		// Push follow-up appointments, medication changes, and ttos into objects rather
		// than keep in array/strings, far more structured and safer
		if (typeof req.customparams.followup_with !== 'undefined') {
			req.customparams.followups = [];

			if (typeof req.customparams.followup_with === 'object') {
				for (let i = 0; i < req.customparams.followup_with.length; i += 1) {
					const followUpObject = {
						followup_details: req.customparams.followup_details[i],
						followup_interval: req.customparams.followup_interval[i],
						followup_intervalNumber: req.customparams.followup_intervalNumber[i],
						followup_notes: req.customparams.followup_notes[i],
						followup_with: req.customparams.followup_with[i]
					};
					req.customparams.followups.push(followUpObject);
				}
			} else {
				const followUpObject = {
					followup_details: req.customparams.followup_details,
					followup_interval: req.customparams.followup_interval,
					followup_intervalNumber: req.customparams.followup_intervalNumber,
					followup_notes: req.customparams.followup_notes,
					followup_with: req.customparams.followup_with
				};
				req.customparams.followups.push(followUpObject);
			}
			delete req.customparams.followup_details;
			delete req.customparams.followup_interval;
			delete req.customparams.followup_intervalNumber;
			delete req.customparams.followup_notes;
			delete req.customparams.followup_with;
		}

		if (typeof req.customparams.medication_changedMed !== 'undefined') {
			req.customparams.changedmeds = [];
			if (typeof req.customparams.medication_changedMed === 'object') {
				for (let j = 0; j < req.customparams.medication_changedMed.length; j += 1) {
					const changedMedObject = {
						medication_changedMed: req.customparams.medication_changedMed[j],
						medication_changedPlan: req.customparams.medication_changedPlan[j],
						medication_changedReason: req.customparams.medication_changedReason[j]
					};
					req.customparams.changedmeds.push(changedMedObject);
				}
			} else {
				const changedMedObject = {
					medication_changedMed: req.customparams.medication_changedMed,
					medication_changedPlan: req.customparams.medication_changedPlan,
					medication_changedReason: req.customparams.medication_changedReason
				};
				req.customparams.changedmeds.push(changedMedObject);
			}
			delete req.customparams.medication_changedMed;
			delete req.customparams.medication_changedPlan;
			delete req.customparams.medication_changedReason;
		}

		if (typeof req.customparams.medication_ttoMedication !== 'undefined') {
			req.customparams.ttos = [];
			if (typeof req.customparams.medication_ttoMedication === 'object') {
				for (let k = 0; k < req.customparams.medication_ttoMedication.length; k += 1) {
					const ttoObject = {
						medication_finalPharmacySignOffCheck:
							req.customparams.medication_finalPharmacySignOffCheck[k],
						medication_finalPharmacySignOffDate:
							req.customparams.medication_finalPharmacySignOffDate[k],
						medication_finalPharmacySignOffName:
							req.customparams.medication_finalPharmacySignOffName[k],
						medication_finalPharmacySignOffTime:
							req.customparams.medication_finalPharmacySignOffTime[k],
						medication_ttoComments: req.customparams.medication_ttoComments[k],
						medication_ttoDose: req.customparams.medication_ttoDose[k],
						medication_ttoFrequency: req.customparams.medication_ttoFrequency[k],
						medication_ttoLengthOfCourse: req.customparams.medication_ttoLengthOfCourse[k],
						medication_ttoLockDate: req.customparams.medication_ttoLockDate[k],
						medication_ttoLockUser: req.customparams.medication_ttoLockUser[k],
						medication_ttoMedication: req.customparams.medication_ttoMedication[k],
						medication_ttoPharmacyAvailability:
							req.customparams.medication_ttoPharmacyAvailability[k],
						medication_ttoPharmacySignOffCheck:
							req.customparams.medication_ttoPharmacySignOffCheck[k],
						medication_ttoPharmacySignOffDate: req.customparams.medication_ttoPharmacySignOffDate[k],
						medication_ttoPharmacySignOffName: req.customparams.medication_ttoPharmacySignOffName[k],
						medication_ttoPharmacySignOffTime: req.customparams.medication_ttoPharmacySignOffTime[k],
						medication_ttoRoute: req.customparams.medication_ttoRoute[k],
						medication_ttoStartDate: req.customparams.medication_ttoStartDate[k],
						medication_ttoUnit: req.customparams.medication_ttoUnit[k]
					};
					req.customparams.ttos.push(ttoObject);
				}
			} else {
				const ttoObject = {

					medication_finalPharmacySignOffCheck: req.customparams.medication_finalPharmacySignOffCheck,
					medication_finalPharmacySignOffDate: req.customparams.medication_finalPharmacySignOffDate,
					medication_finalPharmacySignOffName: req.customparams.medication_finalPharmacySignOffName,
					medication_finalPharmacySignOffTime: req.customparams.medication_finalPharmacySignOffTime,
					medication_ttoComments: req.customparams.medication_ttoComments,
					medication_ttoDose: req.customparams.medication_ttoDose,
					medication_ttoFrequency: req.customparams.medication_ttoFrequency,
					medication_ttoLengthOfCourse: req.customparams.medication_ttoLengthOfCourse,
					medication_ttoLockDate: req.customparams.medication_ttoLockDate,
					medication_ttoLockUser: req.customparams.medication_ttoLockUser,
					medication_ttoMedication: req.customparams.medication_ttoMedication,
					medication_ttoPharmacyAvailability: req.customparams.medication_ttoPharmacyAvailability,
					medication_ttoPharmacySignOffCheck: req.customparams.medication_ttoPharmacySignOffCheck,
					medication_ttoPharmacySignOffDate: req.customparams.medication_ttoPharmacySignOffDate,
					medication_ttoPharmacySignOffName: req.customparams.medication_ttoPharmacySignOffName,
					medication_ttoPharmacySignOffTime: req.customparams.medication_ttoPharmacySignOffTime,
					medication_ttoRoute: req.customparams.medication_ttoRoute,
					medication_ttoUnit: req.customparams.medication_ttoUnit
				};
				req.customparams.ttos.push(ttoObject);
			}
			delete req.customparams.medication_finalPharmacySignOffCheck;
			delete req.customparams.medication_finalPharmacySignOffDate;
			delete req.customparams.medication_finalPharmacySignOffName;
			delete req.customparams.medication_finalPharmacySignOffTime;
			delete req.customparams.medication_ttoComments;
			delete req.customparams.medication_ttoDose;
			delete req.customparams.medication_ttoFrequency;
			delete req.customparams.medication_ttoLengthOfCourse;
			delete req.customparams.medication_ttoLockDate;
			delete req.customparams.medication_ttoLockUser;
			delete req.customparams.medication_ttoMedication;
			delete req.customparams.medication_ttoPharmacyAvailability;
			delete req.customparams.medication_ttoPharmacySignOffCheck;
			delete req.customparams.medication_ttoPharmacySignOffDate;
			delete req.customparams.medication_ttoPharmacySignOffName;
			delete req.customparams.medication_ttoPharmacySignOffTime;
			delete req.customparams.medication_ttoRoute;
			delete req.customparams.medication_ttoUnit;
		}

		// Stop id and version being inserted into raw body
		const id = req.customparams.row_id;
		let version = Number(req.customparams.version);
		delete req.customparams.row_id;
		delete req.customparams.version;
		req.customparams.lastUpdatedBy = res.locals.user;

		// Upsert to PostgreSQL DB
		let query;

		switch (req.customparams.action) {
			case 'Create New Form and Continue':
			case 'Create New Form and Exit':
			case 'Create New Form and Submit discharge summary':
			default:
				delete req.customparams.action;
				query = `INSERT INTO public.discharge_summary("lastUpdate", "raw", version)
		VALUES(CURRENT_TIMESTAMP, '${JSON.stringify(req.customparams)}', 1)
		RETURNING id, "lastUpdate", "raw", version;`;
				break;
			case 'Save and Continue':
			case 'Save and Exit':
			case 'Save and Submit discharge summary':
			case 'Save and Preview':
				delete req.customparams.action;
				query = `INSERT INTO public.discharge_summary(id, "lastUpdate", "raw", version)
		VALUES('${id}', CURRENT_TIMESTAMP, '${JSON.stringify(req.customparams)}', ${version += 1})
		ON CONFLICT (id, version) DO UPDATE SET id ='${id}', version = ${version}
		RETURNING id, "lastUpdate", "raw", version;`;
				break;
		}

		await pool.query(query)
			.then((response) => {
				req.customparams.query = {
					command: response.command
				};

				req.customparams.row_id = response.rows[0].id;

				const lastUpdated = new Date(response.rows[0].lastUpdate);
				const lastUpdatedString = [
					lastUpdated.getDate(),
					((lastUpdated.getMonth() + 1) < 10 ? `0${lastUpdated.getMonth() + 1}` : (lastUpdated.getMonth() + 1)),
					lastUpdated.getFullYear()
				].join('/');

				req.customparams.lastUpdate = `${lastUpdatedString} ${new Date(response.rows[0].lastUpdate).toLocaleTimeString()}`;
				req.customparams.version = response.rows[0].version;

				if (response.rowCount === 1) {
					req.customparams.query.result = 'success';
					next();
				} else {
					req.customparams.query.result = 'warning';
					next();
				}
			}).catch((err) => {
				next(err);
			});
	};
};
