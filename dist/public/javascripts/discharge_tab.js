"use strict";/* eslint-disable camelcase */
/* eslint-disable sort-keys */
function populateDischargeDestination(that){
var destination=that.value;

var destinations=[
{
name:"",
line1:"",
line2:"",
city:"",
district:"",
postalcode:""},

{
name:"Blandford Community Hospital",
line1:"Milldown Road",
line2:"",
city:"Blandford Forum",
district:"Dorset",
postalcode:"DT11 7DD"},

{
name:"Bridgwater Community Hospital",
line1:"Bower Lane",
line2:"",
city:"Bridgwater",
district:"Somerset",
postalcode:"TA6 4GU"},

{
name:"Bristol Royal Infirmary",
line1:"Marlborough Street",
line2:"",
city:"Bristol",
district:"Bristol",
postalcode:"BS2 8HW"},

{
name:"Burnham-on-sea War Memorial Hospital",
line1:"6 Love Lane",
line2:"",
city:"Burnham-On-Sea",
district:"Somerset",
postalcode:"TA8 1ED"},

{
name:"Chard Community Hospital",
line1:"Crewkerne Road",
line2:"",
city:"Chard",
district:"Somerset",
postalcode:"TA20 1NF"},

{
name:"Crewkerne Community Hospital",
line1:"Middle Path",
line2:"",
city:"Crewkerne",
district:"Somerset",
postalcode:"TA18 8BG"},

{
name:"Dene Barton Community Hospital",
line1:"Dene Road",
line2:"Cotford St Luke",
city:"Taunton",
district:"Somerset",
postalcode:"TA4 1DD"},

{
name:"Dorset County Hospital",
line1:"Williams Avenue",
line2:"",
city:"Dorchester",
district:"Dorset",
postalcode:"DT1 2JY"},

{
name:"Family/Friend",
line1:"",
line2:"",
city:"",
district:"",
postalcode:""},

{
name:"Frome Community Hospital",
line1:"Enos Way",
line2:"",
city:"Frome",
district:"Somerset",
postalcode:"BA11 2FH"},

{
name:"Minehead Community Hospital",
line1:"Luttrell Way",
line2:"",
city:"Minehead",
district:"Somerset",
postalcode:"TA24 6DF"},

{
name:"Musgrove Park Hospital - Taunton",
line1:"Parkfield Drive",
line2:"",
city:"Taunton",
district:"Somerset",
postalcode:"TA1 5DA"},

{
name:"Nursing Accommodation",
line1:"",
line2:"",
city:"",
district:"",
postalcode:""},

{
name:"Residential Accommodation",
line1:"",
line2:"",
city:"",
district:"",
postalcode:""},

{
name:"Royal Devon and Exeter Hospital",
line1:"Barrack Road",
line2:"",
city:"Exeter",
district:"Devon",
postalcode:"EX2 5DW"},

{
name:"Salisbury District Hospital",
line1:"Odstock Road",
line2:"",
city:"Salisbury",
district:"Wiltshire",
postalcode:"SP2 8BJ"},

{
name:"Shepton Mallet Community Hospital",
line1:"Old Wells Road",
line2:"",
city:"Shepton Mallet",
district:"Somerset",
postalcode:"BA4 4PG"},

{
name:"South Petherton Community Hospital",
line1:"Benard Way",
line2:"",
city:"South Petherton",
district:"Somerset",
postalcode:"TA13 5EF"},

{
name:"Southampton General Hospital",
line1:"Tremona Road",
line2:"",
city:"Southampton",
district:"Hampshire",
postalcode:"SO16 6YD"},

{
name:"Southmead Hospital - Bristol",
line1:"Southmead Road",
line2:"",
city:"Bristol",
district:"Bristol",
postalcode:"BS10 5NB"},

{
name:"Usual place of Residence",
line1:"",
line2:"",
city:"",
district:"",
postalcode:""},

{
name:"Wellington Community Hospital",
line1:"Bulford Lane",
line2:"",
city:"Wellington",
district:"Somerset",
postalcode:"TA21 8QQ"},

{
name:"West Mendip Community Hospital",
line1:"Old Wells Road",
line2:"",
city:"Glastonbury",
district:"Somerset",
postalcode:"BA6 8JD"},

{
name:"Westminster Memorial Hospital - Shaftesbury",
line1:"Abbey Walk",
line2:"",
city:"Shaftesbury",
district:"Dorset",
postalcode:"SP7 8BD"},

{
name:"Williton Community Hospital",
line1:"North Road",
line2:"Williton",
city:"Taunton",
district:"Somerset",
postalcode:"TA4 4RA"},

{
name:"Wincanton Community Hospital",
line1:"Dancing Lane",
line2:"",
city:"Wincaton",
district:"Somerset",
postalcode:"BA9 9DQ"},

{
name:"Yeatman Hospital - Sherborne",
line1:"Hospital Lane",
line2:"",
city:"Sherborne",
district:"Dorset",
postalcode:"DT9 3JU"}];



var discharge_differentAddressLine1=document.querySelector(
"[name=\"discharge_differentAddressLine1\"]");

var discharge_differentAddressLine2=document.querySelector(
"[name=\"discharge_differentAddressLine2\"]");

var discharge_differentAddressCity=document.querySelector(
"[name=\"discharge_differentAddressCity\"]");

var discharge_differentAddressDistrict=document.querySelector(
"[name=\"discharge_differentAddressDistrict\"]");

var discharge_differentAddressPostalCode=document.querySelector(
"[name=\"discharge_differentAddressPostalCode\"]");


destinations.forEach(function(option){
if(option.name===destination){
discharge_differentAddressLine1.value=option.line1;
discharge_differentAddressLine2.value=option.line2;
discharge_differentAddressCity.value=option.city;
discharge_differentAddressDistrict.value=option.district;
discharge_differentAddressPostalCode.value=option.postalcode;
}
});
}