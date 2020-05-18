/* eslint-disable camelcase */
// Open patient tab on page load/refresh
window.addEventListener('load', () => {
	document.getElementById('defaultOpen').click();
});

/**
 * @param {*} e - event.
 */
function onBeforeUnload(e) {
	// Cancel the event
	e.preventDefault();
	// Chrome requires returnValue to be set
	e.returnValue = '';
}

/**
 * @description Adds beforeunload event listener.
 * Called on load of discharge summary page to add navigation warning
 * when user attempts to load another page.
 */
function activateReloader() {
	window.addEventListener('beforeunload', onBeforeUnload);
}

/**
 * @description Removes beforeunload event listener.
 * Called when a user clicks a submit-like button in the discharge summary,
 * to remove the navigation warning.
 */
function deactivateReloader() {
	window.removeEventListener('beforeunload', onBeforeUnload);
}

activateReloader();

/**
 * @author Frazer Smith
 * @description
 *
 * @param {String} admissionSpecialty
 * @param {String} admissionMethod
 * @param {String} admissionWard
 * @param {String} admissionCareProvider
 * @param {String} admissionSource
 * @param {String} dischargeDate
 * @param {String} dischargeSpecialty
 * @param {String} dischargeMethod
 * @param {String} dischargeCareProvider
 * @param {String} dischargeWard
 */
function changeAdmission(
	admissionSpecialty,
	admissionMethod,
	admissionWard,
	admissionCareProvider,
	admissionSource,
	dischargeDate,
	dischargeSpecialty,
	dischargeMethod,
	dischargeCareProvider,
	dischargeWard
) {
	// Set Admission tab values
	const admission_specialty = document.querySelector(
		'[name="admission_specialty"]'
	);
	admission_specialty.value = admissionSpecialty;

	const admission_method = document.querySelector(
		'[name="admission_method"]'
	);
	admission_method.value = admissionMethod;

	const admission_ward = document.querySelector('[name="admission_ward"]');
	admission_ward.value = admissionWard;

	const admission_careProvider = document.querySelector(
		'[name="admission_careProvider"]'
	);
	admission_careProvider.value = admissionCareProvider;

	const admission_source = document.querySelector(
		'[name="admission_source"]'
	);
	admission_source.value = admissionSource;

	// Set Discharge tab values
	const discharge_date = document.querySelector('[name="discharge_date"]');
	discharge_date.value = dischargeDate.replace('T', ' ');

	const discharge_specialty = document.querySelector(
		'[name="discharge_specialty"]'
	);
	discharge_specialty.value = dischargeSpecialty;

	const discharge_method = document.querySelector(
		'[name="discharge_method"]'
	);
	discharge_method.value = dischargeMethod;

	const discharge_careProvider = document.querySelector(
		'[name="discharge_careProvider"]'
	);
	discharge_careProvider.value = dischargeCareProvider;

	const discharge_ward = document.querySelector('[name="discharge_ward"]');
	discharge_ward.value = dischargeWard;
}

/**
 * @param {String} name - cookie name.
 */
// eslint-disable-next-line consistent-return
function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		return decodeURIComponent(decodeURI(parts.pop().split(';').shift()));
	}
}

/**
 * @author Frazer Smith
 * @description disable editing functionality for
 * inputs based on user's AD group.
 *
 * @param {Array} accessGroupList
 */
function setEditingRights(accessGroupList) {
	const fieldList = {
		patient_addressAccommodationType: 'clinical',
		clinical_admissionReason: 'clinical'
	};

	Object.keys(fieldList).forEach((key) => {
		const element = document.getElementById(key);
		const adGroup = fieldList[key];
		if (!accessGroupList.includes(adGroup)) {
			if (
				typeof element !== 'undefined' &&
				(element.tagName === 'INPUT' ||
					element.tagName === 'TEXTAREA') &&
				element.type.toLowerCase() !== 'checkbox'
			) {
				element.setAttribute('readonly', true);
				element.classList.add('disabled');
			}
		}
	});
}

setEditingRights(getCookie('useraccess'));
