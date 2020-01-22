/**
 * @author Frazer Smith
 * @description Query PostgreSQL DB for latest version of in-progress discharge summaries for specified patient.
 *
 * @param {Object} pool - Pool object.
 * @return {Function} express middleware
 */
module.exports = function postgresqlInprogressMiddleware(pool) {
	return async (req, res, next) => {
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
					AND raw->>'patient_mrn' = $1
					ORDER BY id DESC`,
					[req.customparams.patient_mrn]
				)
				.then((response) => response.rows);

		await getInProgress()
			.then((results) => {
				req.customparams.in_progress_discharge_summaries = results;
				next();
			})
			.catch((err) => {
				next(err);
			});
	};
};
