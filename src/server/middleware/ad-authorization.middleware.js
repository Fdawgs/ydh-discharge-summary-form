/**
 * @author Frazer Smith
 * @param {Object} activedirectory - ActiveDirectory object.
 * @return {Function} express middleware
 * @description Queries the Active Directory for a user's groups, using the
 * logon_user variable passed through by IISNode.
 * @todo Loop through usergroups and fetch the inpatient-specific groups.
 */
module.exports = function adAuthorizationMiddleware(activedirectory) {
	return (req, res, next) => {
		/**
		 * Clean username string.
		 * See https://docs.microsoft.com/en-us/previous-versions/iis/6.0-sdk/ms524602(v=vs.90)
		 * for list of variables that can be passed by IISNode.
		 */
		const user = /YDH\\(.*)/gm.exec(req.headers['x-iisnode-logon_user'])[1];
		res.locals.user = user;

		// https://www.npmjs.com/package/activedirectory#getGroupMembershipForUser
		activedirectory.getGroupMembershipForUser(user, (err, groups) => {
			if (err || !groups) {
				next({ status: 500 });
			}

			// Remove groups that aren't discharge summary related
			const commonName = ['inpatdis_doc', 'inpatdis_nurse', 'inpatdis_pharm', 'inpatdis_transcribe', 'Solutions Development'];
			const inpatGroups = [];
			for (let index = 0; index < groups.length; index += 1) {
				const element = groups[index];
				if (commonName.includes(element.cn) === true) {
					if (element.cn === 'Solutions Development') {
						element.cn = 'admin';
					}
					inpatGroups.push('test');
					inpatGroups.push(element.cn);
				}
			}

			// access object used to limit access to html elements
			const access = {
				doctor: {
					disabled: 'disabled',
					readonly: 'readonly'
				},
				nurse: {
					disabled: 'disabled',
					readonly: 'readonly'
				},
				pharmacy: {
					disabled: 'disabled',
					readonly: 'readonly'
				},
				transcribe: {
					disabled: 'disabled',
					readonly: 'readonly'
				}

			};
			if (inpatGroups.includes('doctor')) {
				access.doctor.disabled = '';
				access.doctor.readonly = '';
				access.transcribe.disabled = '';
				access.transcribe.readonly = '';
			}
			if (inpatGroups.includes('nurse')) {
				access.nurse.disabled = '';
				access.nurse.readonly = '';
			}
			if (inpatGroups.includes('transcribe')) {
				access.transcribe.disabled = '';
				access.transcribe.readonly = '';
			}
			if (inpatGroups.includes('pharmacy')) {
				access.pharmacy.disabled = '';
				access.pharmacy.readonly = '';
			}

			if (inpatGroups.includes('admin')) {
				access.doctor.disabled = '';
				access.doctor.readonly = '';
				access.nurse.disabled = '';
				access.nurse.readonly = '';
				access.transcribe.disabled = '';
				access.transcribe.readonly = '';
				access.pharmacy.disabled = '';
				access.pharmacy.readonly = '';
			}

			res.locals.useraccess = access;
			// Cookie used to set limitations on dynamically created sections like the TTOs
			// Not signed as final sign off relies on server-side usergroup
			res.cookie('useraccess', encodeURIComponent(JSON.stringify(access)), { sameSite: true });

			next();
		});
	};
};
