/**
 * @author Frazer Smith
 * @param {Object} pool - Pool object.
 * @param {('Dr'|'Nurse'|'Pharmacy')} signOffType - String specifying type
 * of sign-off that is still needed.
 * @return {Function} express middleware
 * @description Query PostgreSQL DB for discharge summaries awaiting sign-offs.
 */
module.exports = function postgresqlAwaitingSignOffMiddleware(
	pool,
	signOffType
) {
	return async (req, res, next) => {
		// Build WHERE clause predicates
		let predicateParts;
		switch (signOffType) {
			case 'Nurse':
				predicateParts =
					"AND (raw::jsonb ? 'signoff_nurseFirstCheck' = FALSE OR raw::jsonb ? 'signoff_nurseSecondCheck' = FALSE)";
				break;
			case 'Dr':
				predicateParts =
					"AND (raw::jsonb ? 'signoff_drCheckbox' = FALSE)";
				break;
			case 'Pharmacy':
				predicateParts =
					"AND (raw::jsonb ? 'medication_overallPharmacySignOffCheck' = FALSE) AND (json_array_length(raw->'ttos') IS NOT NULL)";
				break;
			default:
				break;
		}

		const getInProgress = () =>
			pool
				.query(
					`WITH CTE
												  AS (SELECT *,
															 ROW_NUMBER() OVER (PARTITION BY ID ORDER BY VERSION DESC) AS rn
														FROM public.discharge_summary)
											  SELECT id, "lastUpdate", raw, version
												FROM CTE
											   WHERE rn = 1
											   ${predicateParts}
											ORDER BY id DESC`
				)
				.then((response) => response.rows);

		await getInProgress()
			.then((results) => {
				if (!req.awaitingsignoff) {
					req.awaitingsignoff = {};
				}

				req.awaitingsignoff[`${signOffType}`] = results;
				next();
			})
			.catch((err) => {
				next(err);
			});
	};
};
