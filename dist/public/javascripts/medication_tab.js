"use strict";/**
 * @author Frazer Smith
 * @description Creates a new div element holding inputs for a new medication/TTO.
 * @todo Refactor so that the inner html isn't a string but constructed.
 */
function addMedicationBlock(){
var newNode=document.createElement("div");
newNode.classList.add("block");
newNode.classList.add("form-block");

newNode.innerHTML="<span title=\"Remove medication item\" class=\"closebtn\" onclick=\"this.parentElement.remove();\">&times;</span>\n\n\t<br><br>\n\t<div class=\"half-column\">\n\t\t<div class=\"block\">\n\t\t\t<label>Medication:</label>\n\t\t\t<input class=\"input\" type=\"text\" name=\"medication_ttoMedication\" value=\"\" onchange=\"highRiskDrugCheck(this)\"/>\n\t\t</div>\n\t\n\t\t<div class=\"block\">\n\t\t\t<label style=\"width: 15%\">Dose:</label>\n\t\t\t<input style=\"width: 30%\" class=\"input\" name=\"medication_ttoDose\" type=\"number\" min=\"1\" value=\"1\"/>\n\t\t\t<label style=\"width: 15%\">Unit:</label>\n\n\t\t\t<input style=\"width:30%;\" class=\"input\" list=\"medicationTtoUnits\" name=\"medication_ttoUnit\">\n\t\t\t<datalist id=\"medicationTtoUnits\">\n\t\t\t\t<option value=\"\"></option>\n\t\t\t\t<option value=\"application\">application</option>\n\t\t\t\t<option value=\"applicatorful\">applicatorful</option>\n\t\t\t\t<option value=\"bottle(s)\">bottle(s)</option>\n\t\t\t\t<option value=\"caplet\">caplet</option>\n\t\t\t\t<option value=\"capsule\">capsule</option>\n\t\t\t\t<option value=\"drop(s)\">drop(s)</option>\n\t\t\t\t<option value=\"g\">g</option>\n\t\t\t\t<option value=\"mcg\">mcg</option>\n\t\t\t\t<option value=\"mg\">mg</option>\n\t\t\t\t<option value=\"ml\">ml</option>\n\t\t\t\t<option value=\"ng\">ng</option>\n\t\t\t\t<option value=\"patch\">patch</option>\n\t\t\t\t<option value=\"pessary\">pessary</option>\n\t\t\t\t<option value=\"puff(s)\">puff(s)</option>\n\t\t\t\t<option value=\"sachet\">sachet</option>\n\t\t\t\t<option value=\"spray(s)\">spray(s)</option>\n\t\t\t\t<option value=\"suppository\">suppository</option>\n\t\t\t\t<option value=\"tablet\">tablet</option>\n\t\t\t\t<option value=\"units\">units</option>\n\t\t\t</datalist>\n\t\t</div>\n\t\n\t\t<div class=\"block\">\n\t\t\t<label>Route:</label>\n\n\t\t\t<input class=\"input\" list=\"medicationTtoRoutes\" name=\"medication_ttoRoute\">\n\t\t\t<datalist id=\"medicationTtoRoutes\">\n\t\t\t\t<option value=\"\"></option>\n\t\t\t\t<option value=\"BUC - Buccal\">BUC - Buccal</option>\n\t\t\t\t<option value=\"IA - Intraartciular\">IA - Intraartciular</option>\n\t\t\t\t<option value=\"IM - Intramuscular\">IM - Intramuscular</option>\n\t\t\t\t<option value=\"INH - By inhilation\">INH - By inhilation</option>\n\t\t\t\t<option value=\"Intraoccular\">Intraoccular</option>\n\t\t\t\t<option value=\"Intravitreal\">Intravitreal</option>\n\t\t\t\t<option value=\"IV - Intravenous\">IV - Intravenous</option>\n\t\t\t\t<option value=\"NEB - By nebulisation\">NEB - By nebulisation</option>\n\t\t\t\t<option value=\"NG - By nasogastric tube\">NG - By nasogastric tube</option>\n\t\t\t\t<option value=\"PEG\">PEG</option>\n\t\t\t\t<option value=\"PO - Oral\">PO - Oral</option>\n\t\t\t\t<option value=\"PR - Rectal\">PR - Rectal</option>\n\t\t\t\t<option value=\"PV - Vaginal\">PV - Vaginal</option>\n\t\t\t\t<option value=\"SC - Subcutaneous\">SC - Subcutaneous</option>\n\t\t\t\t<option value=\"SL - Sublingual\">SL - Sublingual</option>\n\t\t\t\t<option value=\"TD - Transdermal\">TD - Transdermal</option>\n\t\t\t\t<option value=\"TOP - Topical\">TOP - Topical</option>\n\t\t\t</datalist>\n\t\t</div>\n\n\t</div>\n\t\n\t<div class=\"half-column\">\n\t\n\t\t<div class=\"block\">\n\t\t\t<label>Frequency:</label>\n\t\t\t<input class=\"input\" list=\"medicationTtoFrequencies\" name=\"medication_ttoFrequency\">\n\t\t\t<datalist id=\"medicationTtoFrequencies\">\n\t\t\t\t<option value=\"\"></option>\n\t\t\t\t<option value=\"5 times per day\">5 times per day</option>\n\t\t\t\t<option value=\"Alternate days\">Alternate days</option>\n\t\t\t\t<option value=\"As directed\">As directed</option>\n\t\t\t\t<option value=\"BD PRN - twice daily as needed\">BD PRN - twice daily as needed</option>\n\t\t\t\t<option value=\"BD - twice daily\">BD - twice daily</option>\n\t\t\t\t<option value=\"OD - once daily\">OD - once daily</option>\n\t\t\t\t<option value=\"OD PRN - once daily as needed\">OD PRN - once daily as needed</option>\n\t\t\t\t<option value=\"OM - once each morning\">OM - once each morning</option>\n\t\t\t\t<option value=\"ON - once each night\">ON - once each night</option>\n\t\t\t\t<option value=\"Once at lunchtime\">Once at lunchtime</option>\n\t\t\t\t<option value=\"Once at suppertime\">Once at suppertime</option>\n\t\t\t\t<option value=\"Once weekly\">Once weekly</option>\n\t\t\t\t<option value=\"PRN - as needed\">PRN - as needed</option>\n\t\t\t\t<option value=\"QDS - 4 times per day\">QDS - 4 times per day</option>\n\t\t\t\t<option value=\"QDS PRN - 4 times per day as needed\">QDS PRN - 4 times per day as needed</option>\n\t\t\t\t<option value=\"TDS - 3 times per day\">TDS - 3 times per day</option>\n\t\t\t\t<option value=\"TDS PRN - 3 times per day as needed\">TDS PRN - 3 times per day as needed</option>\n\t\t\t</datalist>\n\t\t</div>\n\t\n\t\t<div class=\"block\">\n\t\t\t<label>Start Date:</label>\n\t\t\t<input class=\"input\" type=\"date\" name=\"medication_ttoStartDate value=\"\"/>\n\t\t</div>\n\t\t<div class=\"block\">\n\t\t\t<label>Length of Course:</label>\n\t\t\t<input class=\"input\" list=\"medicationTtoLengthOfCourses\"\n\t\t\tname=\"medication_ttoLengthOfCourse\">\n\t\t\t<datalist id=\"medicationTtoLengthOfCourses\">\n\t\t\t\t<option value=\"\"></option>\n\t\t\t\t<option value=\"1 day\">1 day</option>\n\t\t\t\t<option value=\"2 days\">2 days</option>\n\t\t\t\t<option value=\"3 days\">3 days</option>\n\t\t\t\t<option value=\"4 days\">4 days</option>\n\t\t\t\t<option value=\"5 days\">5 days</option>\n\t\t\t\t<option value=\"6 days\">6 days</option>\n\t\t\t\t<option value=\"7 days\">7 days</option>\n\t\t\t\t<option value=\"8 days\">8 days</option>\n\t\t\t\t<option value=\"9 days\">9 days</option>\n\t\t\t\t<option value=\"10 days\">10 days</option>\n\t\t\t\t<option value=\"11 days\">11 days</option>\n\t\t\t\t<option value=\"12 days\">12 days</option>\n\t\t\t\t<option value=\"13 days\">13 days</option>\n\t\t\t\t<option value=\"14 days\">14 days</option>\n\t\t\t\t<option value=\"Ongoing\">Ongoing</option>\n\t\t\t</datalist>\n\n\t\t</div>\n\t\n\t\t<div class=\"block\">\n\t\t\t<label>Comments:</label>\n\t\t\t<textarea class=\"input\" name=\"medication_ttoComments\" cols=\"20\" rows=\"4\" spellcheck=\"true\"\n\t\t\t\t></textarea>\n\t\t</div>\n\t</div>\n\t\n\t<div class=\"full-column\" style=\"display: block\">\n\t\t<hr>\n\t</div>\n\t\n\t<div class=\"half-column\">\n\t\t<div class=\"block\">\n\t\t\t<label>\n\t\t\t\t<h3>Pharmacy Sign Off</h3>\n\t\t\t</label>\n\t\t</div>\n\t\t<div class=\"block\">\n\t\t\t<label>\n\t\t\t\t<h4>Pharmacy Clinical Screen</h4>\n\t\t\t</label>\n\t\t</div>\n\t\t<div class=\"sign-off\">\n\t\t\t<div class=\"block\">\n\t\t\t\t<label>I confirm this TTO is correct:</label>\n\t\t\t\t<input class=\"binaryinput\" type=\"checkbox\" name=\"medication_ttoPharmacySignOffCheck\"\n\t\t\t\t\ttitle=\"Confirm TTO correct\" onclick=\"signOff(this);\">\n\t\n\t\t\t</div>\n\t\n\t\n\t\t\t<div class=\"block\">\n\t\t\t\t<label>Name:</label>\n\t\t\t\t<input class=\"input disabled\" type=\"text\" name=\"medication_ttoPharmacySignOffName\" value=\"\" readonly>\n\t\t\t</div>\n\t\n\t\t\t<div class=\"block\">\n\t\t\t\t<label>Date:</label>\n\t\t\t\t<input class=\"input disabled\" type=\"date\" name=\"medication_ttoPharmacySignOffDate\" value=\"\" readonly>\n\t\t\t</div>\n\t\n\t\t\t<div class=\"block\">\n\t\t\t\t<label>Time:</label>\n\t\t\t\t<input class=\"input disabled\" type=\"time\" name=\"medication_ttoPharmacySignOffTime\" value=\"\" readonly>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t\n\t<div class=\"half-column\">\n\t\n\t\t<div class=\"block\">\n\t\t\t<label>\n\t\t\t</label>\n\t\t</div>\n\t\n\t\t<div class=\"block\">\n\t\t\t<label>Availability:</label>\n\t\t\t<select class=\"input\" name=\"medication_ttoPharmacyAvailability\">\n\t\t\t\t<option value=\"\"></option>\n\t\t\t\t<option value=\"CD Prescription\">CD Prescription</option>\n\t\t\t\t<option value=\"For Dispensing\" style=\"background-color: green;\">For Dispensing</option>\n\t\t\t\t<option value=\"Kitchen\">Kitchen</option>\n\t\t\t\t<option value=\"Not Dispensed\">Not Dispensed</option>\n\t\t\t\t<option value=\"On Ward\">On Ward</option>\n\t\t\t\t<option value=\"Ordered from Pharmacy today\">Ordered from Pharmacy today</option>\n\t\t\t\t<option value=\"PODs (At Home)\">PODs (At Home)</option>\n\t\t\t\t<option value=\"PODs (Blister Pack)\">PODs (Blister Pack)</option>\n\t\t\t\t<option value=\"PODs (Patient Locker)\">PODs (Patient Locker)</option>\n\t\t\t\t<option value=\"TTO pack on ward\">TTO pack on ward</option>\n\t\t\t</select>\n\t\t</div>\n\t\n\t\n\t\t<div class=\"block\">\n\t\t\t<label>\n\t\t\t\t<h4>Pharmacy Final Check</h4>\n\t\t\t</label>\n\t\t</div>\n\t\t<div class=\"sign-off\">\n\t\t\t<div class=\"block\">\n\t\t\t\t<label>I confirm this TTO is correct:</label>\n\t\t\t\t<input class=\"binaryinput\" type=\"checkbox\" name=\"medication_finalPharmacySignOffCheck\"\n\t\t\t\t\ttitle=\"Confirm TTO correct\" onclick=\"signOff(this);\">\n\t\n\t\t\t</div>\n\t\t\t<div class=\"block\">\n\t\t\t\t<label>Name:</label>\n\t\t\t\t<input class=\"input disabled\" type=\"text\" name=\"medication_finalPharmacySignOffName\" value=\"\" readonly>\n\t\t\t</div>\n\t\t\t<div class=\"block\">\n\t\t\t\t<label>Date:</label>\n\t\t\t\t<input class=\"input disabled\" type=\"date\" name=\"medication_finalPharmacySignOffDate\" value=\"\" readonly>\n\t\t\t</div>\n\t\t\t<div class=\"block\">\n\t\t\t\t<label>Time:</label>\n\t\t\t\t<input class=\"input disabled\" type=\"time\" name=\"medication_finalPharmacySignOffTime\" value=\"\" readonly>\n\t\t\t</div>\n\t\t</div>\n\t</div>";






























































































































































































































var referenceNode=document.querySelector("#ttos-header");
referenceNode.after(newNode);
}

/**
 * @author Frazer Smith
 * @description Creates a new div element holding inputs for a new medication change.
 * @todo Refactor so that the inner html isn't a string but constructed.
 */
function addMedicationChangeBlock(){
var newNode=document.createElement("div");
var date=new Date;
newNode.classList.add("block");
newNode.classList.add("form-block");
newNode.innerHTML="<span title=\"Remove medication item\" class=\"closebtn\" onclick=\"this.parentElement.remove();\">&times;</span>\n\t<br><br>\n\t<div class=\"block\">\n\t\t<label>Medication Changed:</label>\n\t\t<input class=\"input\" type=\"text\" name=\"medication_changedMed\" value=\"\" />\n\t</div>\n\n\t<div class=\"block\">\n\t\t<label>Reason For Change:</label>\n\t\t<input class=\"input\" type=\"text\" name=\"medication_changedReason\" value=\"\" />\n\t</div>\n\n\t<div class=\"block\">\n\t\t<label>Future Plan For This Medication:</label>\n\t\t<select class=\"input\" name=\"medication_changedPlan\">\n\t\t<option value=\"\" selected ></option>\n\t\t<option value=\"Complete the prescribed course\">Complete the prescribed course</option>\n\t\t<option value=\"Continue as prescribed\">Continue as prescribed</option>\n\t\t<option value=\"Not to be restarted\">Not to be restarted</option>\n\t\t<option value=\"Restart after clinical review\">Restart after clinical review</option>\n\t\t<option value=\"Review needed by GP\">Review needed by GP</option>\n\t\t<option value=\"Started during admission\">Started during admission</option>\n\t</select>\n\t</div>";
























var referenceNode=document.querySelector("#medchange-header");
referenceNode.after(newNode);
}

/**
 * @author Frazer Smith
 * @param {*} that
 * @description Sets the comments automatically for a medication if it is considered high risk.
 */
function highRiskDrugCheck(that){
var drugList=[
{
name:"insulin",
text:"GUIDANCE: Check correct dosage, presentation and units"},

{
name:"methotrexate",
text:
"GUIDANCE: Ensure and comment that arrangements have been made for regular blood tests. CAUTION: interaction with Spetrin and Trimethoprin. Should only be prescribed weekly"},

{
name:"warfarin",
text:
"GUIDANCE: Ensure and comment that arrangements for INR checks have been made"}];



var ttoDiv=that;

for(var i=0;i<drugList.length;i+=1){
if(that.value.toLowerCase()===drugList[i].name){
// block -> column -> block
ttoDiv=that.parentNode.parentNode.parentNode;

if(ttoDiv.classList.contains("form-block")){
// columns
for(var j=0;j<ttoDiv.children.length;j+=1){
// blocks
for(
var k=0;
k<ttoDiv.children[j].children.length;
k+=1)
{
// inputs
for(
var l=0;
l<ttoDiv.children[j].children[k].children.length;
l+=1)
{
var element=
ttoDiv.children[j].children[k].children[l];
if(element.name==="medication_ttoComments"){
element.value+=drugList[i].text;
}
}
}
}
}
}
}
return ttoDiv;
}