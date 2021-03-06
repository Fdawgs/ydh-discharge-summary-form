/**
 * @author Frazer Smith
 * @return {Function} express middleware
 * @todo Questioning validity of this function.
 */
module.exports = function gatherCustomParamsMiddleware() {
	return (req, res, next) => {
		const params = req.body;
		params.patient_address = [];

		// Push address back into array for next page
		Object.keys(params).forEach((element) => {
			if (element.match(/patient_addressLine\d+/)) {
				params.patient_address.push(params[element]);
			}
		});
		req.customparams = params;
		next();
	};
};
