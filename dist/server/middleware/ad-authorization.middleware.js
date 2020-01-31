"use strict";/**
 * @author Frazer Smith
 * @param {Object} activedirectory - ActiveDirectory object.
 * @return {Function} express middleware
 * @description Queries the Active Directory for a user's groups, using the
 * logon_user variable passed through by IISNode.
 * @todo Loop through usergroups and fetch the inpatient-specific groups.
 */module.exports=function adAuthorizationMiddleware(activedirectory){return function(req,res,next){/**
		 * Clean username string.
		 * See https://docs.microsoft.com/en-us/previous-versions/iis/6.0-sdk/ms524602(v=vs.90)
		 * for list of variables that can be passed by IISNode.
		 */var user=/YDH\\(.*)/gm.exec(req.headers["x-iisnode-logon_user"])[1];res.locals.user=user;// https://www.npmjs.com/package/activedirectory#getGroupMembershipForUser
activedirectory.getGroupMembershipForUser(user,function(err,groups){if(err||!groups){next({status:500})}// Remove groups that aren't discharge summary related
var commonName=["inpatdis_doc","inpatdis_nurse","inpatdis_pharm","inpatdis_transcribe","Solutions Development"];var inpatGroups=[];for(var index=0;index<groups.length;index+=1){var element=groups[index];if(commonName.includes(element.cn)===true){if(element.cn==="Solutions Development"){element.cn="admin"}inpatGroups.push("test");inpatGroups.push(element.cn)}}// access array used to limit access to html elements
var access=[];if(inpatGroups.includes("doctor")){access.push("clinical","doctor","transcribe")}if(inpatGroups.includes("nurse")){access.push("clinicial","nurse")}if(inpatGroups.includes("transcribe")){access.push("transcribe")}if(inpatGroups.includes("pharmacy")){access.push("pharmacy","transcribe")}if(inpatGroups.includes("admin")){access.push("doctor","nurse","pharmacy","transcribe")}res.locals.useraccess=access;// Cookie used to set limitations on dynamically created sections like the TTOs
// Not signed as final sign off relies on server-side usergroup
res.cookie("useraccess",encodeURIComponent(JSON.stringify(access)),{sameSite:true});next()})}};