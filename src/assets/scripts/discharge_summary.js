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
