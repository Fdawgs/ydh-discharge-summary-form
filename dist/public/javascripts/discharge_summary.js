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
 */function deactivateReloader(){window.removeEventListener("beforeunload",onBeforeUnload)}activateReloader();/**
 * @author Frazer Smith
 * @description
 *
 * @param {*} admissionSpecialty
 * @param {*} admissionMethod
 * @param {*} admissionCareProvider
 * @param {*} admissionSource
 * @param {*} dischargeDate
 * @param {*} dischargeMethod
 * @param {*} dischargeCareProvider
 */function changeAdmission(a,b,c,d,e,f,g){// Set Admission tab values
var h=document.querySelector("[name=\"admission_specialty\"]");h.value=a;var i=document.querySelector("[name=\"admission_method\"]");i.value=b;var j=document.querySelector("[name=\"admission_careProvider\"]");j.value=c;var k=document.querySelector("[name=\"admission_source\"]");k.value=d;// Set Discharge tab values
var l=document.querySelector("[name=\"discharge_date\"]");l.value=e.replace("T"," ");var m=document.querySelector("[name=\"discharge_method\"]");m.value=f;var n=document.querySelector("[name=\"discharge_careProvider\"]");n.value=g}