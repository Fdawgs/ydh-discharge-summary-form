"use strict";function collapse(that){
var element=that;
element.classList.toggle("collapsible-active");
var content=element.nextElementSibling;
if(content.style.maxHeight){
content.style.maxHeight=null;
}else{
content.style.maxHeight="".concat(content.scrollHeight,"px");
}
}