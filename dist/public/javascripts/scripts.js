"use strict";/**
 * @param {*} evt - event.
 * @param {*} tabName - id of element.
 * @description Switches the display of a tab.
 */
function openTab(evt,tabName){
var tabDivs=document.getElementsByClassName("tab-div");
var tabButtons=document.getElementsByClassName("tab-button");
var event=evt;

for(var i=0;i<tabDivs.length;i+=1){
tabDivs[i].style.display="none";
}

for(var _i=0;_i<tabButtons.length;_i+=1){
tabButtons[_i].className=tabButtons[_i].className.replace(
" active",
"");

}
document.getElementById(tabName).style.display="flex";
event.currentTarget.className+=" active";
}

function selectToggle(selectId,selectOption,hiddenClass){
var element=document.getElementById(selectId);
var hid=document.getElementsByClassName(hiddenClass);

for(var index=0;index<element.length;index+=1){
if(element[index].selected===true){
if(element[index].value!==selectOption){
for(var i=0;i<hid.length;i+=1){
hid[i].style.display="block";
}
}else{
for(var _i2=0;_i2<hid.length;_i2+=1){
hid[_i2].style.display="none";
}
}
}
}
}

/**
 * @author Frazer Smith
 * @description Creates a new div element holding inputs for a new follow-up appointment.
 * @todo Refactor so that the inner html isn't a string but constructed.
 */
function addFollowUpBlock(){
var newNode=document.createElement("div");
newNode.classList.add("block");
newNode.classList.add("form-block");
newNode.innerHTML="<span class=\"closebtn\" title=\"Remove follow-up item\" onclick=\"this.parentElement.remove();\">&times;</span>\n\t<br>\n\t<div class=\"block\">\n\t\t<label>Follow-Up With:</label>\n\t\t<select class=\"input\" name=\"followup_with\">\n\t\t\t<option value=\"\" selected ></option>\n\t\t\t<option value=\"AEC\">AEC</option>\n\t\t\t<option value=\"Community Pharmacy\">Community Pharmacy</option>\n\t\t\t<option value=\"ICRT - Dorset\">ICRT - Dorset</option>\n\t\t\t<option value=\"Dietician\">Dietician</option>\n\t\t\t<option value=\"District Nurse\">District Nurse</option>\n\t\t\t<option value=\"Dressing Clinic\">Dressing Clinic</option>\n\t\t\t<option value=\"GP\">GP</option>\n\t\t\t<option value=\"IRT - Somerset\">IRT - Somerset</option>\n\t\t\t<option value=\"Other Hospital\">Other Hospital</option>\n\t\t\t<option value=\"Patient to Arrange\">Patient to Arrange</option>\n\t\t\t<option value=\"Practice Nurse\">Practice Nurse</option>\n\t\t\t<option value=\"QCAC\">QCAC</option>\n\t\t\t<option value=\"Rapid Response\">Rapid Response</option>\n\t\t\t<option value=\"YDH\">YDH</option>\n\t\t</select>\n\t</div>\n\t<div class=\"block\">\n\t\t<label>When:</label>\n\t\t<input class=\"input\" name=\"followup_intervalNumber\" style=\"width: 10%\" type=\"number\" min=\"1\" value=\"1\">\n\t\t<select class=\"input\" name=\"followup_interval\" style=\"width: 25%\">\n\t\t\t<option value=\"\" selected ></option>\n\t\t\t<option value=\"Day(s)\" selected >Day(s)</option>\n\t\t\t<option value=\"Week(s)\">Week(s)</option>\n\t\t\t<option value=\"Month(s)\">Month(s)</option>\n\t\t</select>\n\t</div>\n\t<div class=\"block\">\n\t\t<label>Follow-Up Clinical Details:</label>\n\t\t<textarea class=\"input\" name=\"followup_details\"  cols=\"20\" rows=\"4\" spellcheck=\"true\"\n\t\t\t></textarea>\n\t</div>\n\t<div class=\"block\">\n\t\t<label>Follow-Up Notes:</label>\n\t\t<textarea class=\"input\" name=\"followup_notes\"  cols=\"20\" rows=\"4\" spellcheck=\"true\"\n\t\t\t></textarea>\n\t</div>";










































var referenceNode=document.querySelector("#follow-up-header");

referenceNode.after(newNode);
}

/**
 * @param {string} className - name of class.
 * @description Hides all elements in a specified class.
 */
function hideClass(className){
var x=document.getElementsByClassName(className);
for(var i=0;i<x.length;i+=1){
x[i].style.display="none";
}
}
/**
 * @param {string} className - name of class.
 * @param {string} displayStyle - element's display type.
 * @description Unhides all elements in a specified class.
 */
function showClass(className,displayStyle){
var x=document.getElementsByClassName(className);
for(var i=0;i<x.length;i+=1){
x[i].style.display=displayStyle;
}
}

/**
 * @param {string} className - name of class.
 * @description Uncheck all input checkboxes in a specified class.
 */
function uncheckRadio(className){
var x=document.getElementsByClassName(className);
for(var i=0;i<x.length;i+=1){
x[i].checked=false;
}
}

/**
 * @param {string} className - name of class.
 * @description Unselect all option elements in a select element within a
 * specified class and resets to the first.
 */
function unselect(className){
var array=document.getElementsByClassName(className);
for(var i=0;i<array.length;i+=1){
array[i].selectedIndex=0;
}
}

/**
 * @param {string} className - name of class.
 * @description Set values to empty strings for elements within a specified class.
 */
function clearValue(className){
var array=document.getElementsByClassName(className);
for(var i=0;i<array.length;i+=1){
array[i].value="";
}
}

/**
 * @param {string} className - name of class.
 * @description Set values to empty strings for elements within a specified class.
 */
function changeFormAction(action){
var array=document.getElementsByTagName("form");
for(var i=0;i<array.length;i+=1){
array[i].action=action;
}
}

/**
 * @author Frazer Smith
 * @param {*} that - HTML element.
 * @description Sets sign off elements inside an element with a 'sign-off' class.
 * This relies on the sign offs being structured in a specific way,
 * refer to already in place sign offs for an insight how to set them up.
 */
function signOff(that){
var date=new Date;
var signOffDate=date.toISOString().slice(0,10);
var signOffTime=date.toLocaleTimeString();

var signOffDiv=that.parentNode.parentNode;
if(signOffDiv.className==="sign-off"){
for(var index=0;index<signOffDiv.children.length;index+=1){
var block=signOffDiv.children[index].children;

for(var index2=0;index2<block.length;index2+=1){
var element=block[index2];
if(
element.tagName==="INPUT"&&
element.type!=="checkbox")
{
if(element.value===""){
// Internet explorer doesn't support date or time inputs
// Have to switch based on name of element rather than type
switch(
element.name.
substring(
element.name.length-4,
element.name.length).

toLowerCase()){

case"date":
element.value=signOffDate;
break;
case"text":
case"name":
element.value=document.getElementById(
"user").
innerHTML;
break;
case"time":
element.value=signOffTime;
break;
default:
break;}

}else{
// Have to remove readonly attribute to clear value for date and time
element.removeAttribute("readonly");
element.value="";
element.setAttribute("readonly","");
}
}
}
}
}
}