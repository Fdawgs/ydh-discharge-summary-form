"use strict";window.addEventListener("load",function(){document.getElementById("defaultOpen").click()});/**
 * @param {*} e - event.
 */function onBeforeUnload(a){// Cancel the event
// Chrome requires returnValue to be set
a.preventDefault(),a.returnValue=""}/**
 * @description Adds beforeunload event listener.
 * Called on load of discharge summary page to add navigation warning
 * when user attempts to load another page.
 */function activateReloader(){window.addEventListener("beforeunload",onBeforeUnload)}/**
 * @description Removes beforeunload event listener.
 * Called when a user clicks a submit-like button in the discharge summary,
 * to remove the navigation warning.
 */function deactivateReloader(){window.removeEventListener("beforeunload",onBeforeUnload)}activateReloader();