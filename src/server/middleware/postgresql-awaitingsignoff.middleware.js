/**
 * @author Frazer Smith
 * @description Query PostgreSQL DB for discharge summaries awaiting sign-offs.
 *
 * @param {Object} pool - Pool object.
 * @param {('dr'|'nurse'|'pharmacy')} signOffType - String specifying type
 * of sign-off that is still needed.
 * @return {Function} express middleware
 */
module.exports = function postgresqlAwaitingSignOffMiddleware(
	pool,
	signOffType
) {
	return async (req, res, next) => {
		const predicateParts = {
			nurse:
				"(raw::jsonb ? 'signoff_nurseFirstCheck' = FALSE OR raw::jsonb ? 'signoff_nurseSecondCheck' = FALSE)",
			dr: "(raw::jsonb ? 'signoff_drCheckbox' = FALSE)",
			pharmacy:
				"(raw::jsonb ? 'medication_overallPharmacySignOffCheck' = FALSE) AND (json_array_length(raw->'ttos') IS NOT NULL)"
		};

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
					AND ${predicateParts[signOffType]}
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
