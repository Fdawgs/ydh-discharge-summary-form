"use strict";/**
 * @param {String} name - cookie name.
 */ // eslint-disable-next-line consistent-return
function getCookie(a){var b="; ".concat(document.cookie),c=b.split("; ".concat(a,"="));if(2===c.length)return decodeURIComponent(decodeURI(c.pop().split(";").shift()))}/**
 * @param {*} evt - event.
 * @param {*} tabName - id of element.
 * @description Switches the display of a tab.
 */function openTab(a,b){for(var c=document.getElementsByClassName("tab-div"),d=document.getElementsByClassName("tab-button"),e=a,f=0;f<c.length;f+=1)c[f].style.display="none";for(var g=0;g<d.length;g+=1)d[g].className=d[g].className.replace(" active","");document.getElementById(b).style.display="flex",e.currentTarget.className+=" active"}function selectToggle(a,b,c){for(var d=document.getElementById(a),e=document.getElementsByClassName(c),f=0;f<d.length;f+=1)if(!0===d[f].selected)if(d[f].value!==b)for(var g=0;g<e.length;g+=1)e[g].style.display="block";else for(var h=0;h<e.length;h+=1)e[h].style.display="none"}/**
 * @author Frazer Smith
 * @description Creates a new div element holding inputs for a new follow-up appointment.
 * @todo Refactor so that the inner html isn't a string but constructed.
 */function addFollowUpBlock(){var a=document.createElement("div");a.classList.add("block"),a.classList.add("form-block"),a.innerHTML="<span class=\"closebtn\" title=\"Remove follow-up item\" onclick=\"this.parentElement.remove();\">&times;</span>\n\t<br>\n\t<div class=\"block\">\n\t\t<label>Follow-Up With:</label>\n\t\t<select class=\"input\" name=\"followup_with\">\n\t\t\t<option value=\"\" selected ></option>\n\t\t\t<option value=\"AEC\">AEC</option>\n\t\t\t<option value=\"Community Pharmacy\">Community Pharmacy</option>\n\t\t\t<option value=\"Community Rehab Team\">Community Rehab Team</option>\n\t\t\t<option value=\"ICRT - Dorset\">ICRT - Dorset</option>\n\t\t\t<option value=\"Dietician\">Dietician</option>\n\t\t\t<option value=\"District Nurse\">District Nurse</option>\n\t\t\t<option value=\"Dressing Clinic\">Dressing Clinic</option>\n\t\t\t<option value=\"GP\">GP</option>\n\t\t\t<option value=\"IRT - Somerset\">IRT - Somerset</option>\n\t\t\t<option value=\"Other Hospital\">Other Hospital</option>\n\t\t\t<option value=\"Patient to Arrange\">Patient to Arrange</option>\n\t\t\t<option value=\"Practice Nurse\">Practice Nurse</option>\n\t\t\t<option value=\"QCAC\">QCAC</option>\n\t\t\t<option value=\"YDH\">YDH</option>\n\t\t</select>\n\t</div>\n\t<div class=\"block\">\n\t\t<label>When:</label>\n\t\t<input class=\"input\" name=\"followup_intervalNumber\" style=\"width: 10%\" type=\"number\" min=\"1\" value=\"1\">\n\t\t<select class=\"input\" name=\"followup_interval\" style=\"width: 25%\">\n\t\t\t<option value=\"\" selected ></option>\n\t\t\t<option value=\"Day(s)\" selected >Day(s)</option>\n\t\t\t<option value=\"Week(s)\">Week(s)</option>\n\t\t\t<option value=\"Month(s)\">Month(s)</option>\n\t\t</select>\n\t</div>\n\t<div class=\"block\">\n\t\t<label>Follow-Up Clinical Details:</label>\n\t\t<textarea class=\"input\" name=\"followup_details\"  cols=\"20\" rows=\"4\" spellcheck=\"true\"\n\t\t\t></textarea>\n\t</div>\n\t<div class=\"block\">\n\t\t<label>Follow-Up Notes:</label>\n\t\t<textarea class=\"input\" name=\"followup_notes\"  cols=\"20\" rows=\"4\" spellcheck=\"true\"\n\t\t\t></textarea>\n\t</div>";var b=document.querySelector("#follow-up-header");b.after(a)}/**
 * @param {string} className - name of class.
 * @description Hides all elements in a specified class.
 */function hideClass(a){for(var b=document.getElementsByClassName(a),c=0;c<b.length;c+=1)b[c].style.display="none"}/**
 * @param {string} className - name of class.
 * @description Unhides all elements in a specified class.
 */function showClass(a){for(var b=document.getElementsByClassName(a),c=0;c<b.length;c+=1)b[c].style.display="block"}/**
 * @param {string} className - name of class.
 * @description Uncheck all input checkboxes in a specified class.
 */function uncheckRadio(a){for(var b=document.getElementsByClassName(a),c=0;c<b.length;c+=1)b[c].checked=!1}/**
 * @param {string} className - name of class.
 * @description Unselect all option elements in a select element within a
 * specified class and resets to the first.
 */function unselect(a){for(var b=document.getElementsByClassName(a),c=0;c<b.length;c+=1)b[c].selectedIndex=0}/**
 * @param {string} className - name of class.
 * @description Set values to empty strings for elements within a specified class.
 */function clearValue(a){for(var b=document.getElementsByClassName(a),c=0;c<b.length;c+=1)b[c].value=""}/**
 * @param {string} className - name of class.
 * @description Set values to empty strings for elements within a specified class.
 */function changeFormAction(a){for(var b=document.getElementsByTagName("form"),c=0;c<b.length;c+=1)b[c].action=a}/**
 * @author Frazer Smith
 * @param {*} that - HTML element.
 * @description Sets sign off elements inside an element with a 'sign-off' class.
 * This relies on the sign offs being structured in a specific way,
 * refer to already in place sign offs for an insight how to set them up.
 */function signOff(a){var b=new Date,c=b.toISOString().slice(0,10),d=b.toLocaleTimeString(),e=a.parentNode.parentNode;if("sign-off"===e.className)for(var f,g=0;g<e.children.length;g+=1){f=e.children[g].children;for(var h,i=0;i<f.length;i+=1)if(h=f[i],"INPUT"===h.tagName&&"checkbox"!==h.type)if(""===h.value)// Internet explorer doesn't support date or time inputs
// Have to switch based on name of element rather than type
switch(h.name.substring(h.name.length-4,h.name.length).toLowerCase()){case"date":h.value=c;break;case"text":case"name":h.value=document.getElementById("user").innerHTML;break;case"time":h.value=d;break;default:}else// Have to remove readonly attribute to clear value for date and time
h.removeAttribute("readonly"),h.value="",h.setAttribute("readonly","")}}var useraccess=JSON.parse(getCookie("useraccess"));