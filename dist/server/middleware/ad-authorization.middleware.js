"use strict";/**
 * @author Frazer Smith
 * @param {Object} activedirectory - ActiveDirectory object.
 * @return {Function} express middleware
 * @description Queries the Active Directory for a user's groups, using the
 * logon_user variable passed through by IISNode.
 * @todo Loop through usergroups and fetch the inpatient-specific groups.
 */module.exports=function(a){return function(b,c,d){/**
		 * Clean username string.
		 * See https://docs.microsoft.com/en-us/previous-versions/iis/6.0-sdk/ms524602(v=vs.90)
		 * for list of variables that can be passed by IISNode.
		 */var e=/YDH\\(.*)/gm.exec(b.headers["x-iisnode-logon_user"])[1];// https://www.npmjs.com/package/activedirectory#getGroupMembershipForUser
c.locals.user=e,a.getGroupMembershipForUser(e,function(a,b){(a||!b)&&d({status:500});for(var e,f=["inpatdis_doc","inpatdis_nurse","inpatdis_pharm","inpatdis_transcribe","Solutions Development"],g=[],h=0;h<b.length;h+=1)e=b[h],!0===f.includes(e.cn)&&("Solutions Development"===e.cn&&(e.cn="admin"),g.push("test"),g.push(e.cn));// access object used to limit access to html elements
var i={doctor:{disabled:"disabled",readonly:"readonly"},nurse:{disabled:"disabled",readonly:"readonly"},pharmacy:{disabled:"disabled",readonly:"readonly"},transcribe:{disabled:"disabled",readonly:"readonly"}};// Cookie used to set limitations on dynamically created sections like the TTOs
// Not signed as final sign off relies on server-side usergroup
g.includes("doctor")&&(i.doctor.disabled="",i.doctor.readonly="",i.transcribe.disabled="",i.transcribe.readonly=""),g.includes("nurse")&&(i.nurse.disabled="",i.nurse.readonly=""),g.includes("transcribe")&&(i.transcribe.disabled="",i.transcribe.readonly=""),g.includes("pharmacy")&&(i.pharmacy.disabled="",i.pharmacy.readonly=""),g.includes("admin")&&(i.doctor.disabled="",i.doctor.readonly="",i.nurse.disabled="",i.nurse.readonly="",i.transcribe.disabled="",i.transcribe.readonly="",i.pharmacy.disabled="",i.pharmacy.readonly=""),c.locals.useraccess=i,c.cookie("useraccess",encodeURIComponent(JSON.stringify(i)),{sameSite:!0}),d()})}};