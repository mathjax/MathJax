/*
 *  /MathJax/extensions/mml2jax.js
 *  
 *  Copyright (c) 2010 Design Science, Inc.
 *
 *  Part of the MathJax library.
 *  See http://www.mathjax.org for details.
 * 
 *  Licensed under the Apache License, Version 2.0;
 *  you may not use this file except in compliance with the License.
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */

MathJax.Unpack([
  ['MathJax.Extension.mml2jax','={varsion:"1.0.4",config:{element:null,preview:"alttext"},','MMLnamespace',':"http://www.w3.org/1998/Math/MathML",','PreProcess',':function(','e){if(!','this.','configured','){','MathJax.Hub.','Insert(','this.config',',(',10,'config.','mml2jax||{}));if(',12,'.Augment','){',10,11,'this,',12,18,')}',7,'InitBrowser','();',7,8,'=true}if(typeof(e)==="string"){e=document.getElementById(e)}if(!e){e=',12,'.element||document.body}','this.ProcessMathArray(e.getElementsByTagName','("math"));if','(e.getElementsByTagNameNS','){',7,'ProcessMathArray',36,'(',7,2,',"math"))}var d=document.getElementsByTagName("html")[0];if(d){for(var c=0,b=','d.attributes','.length;c<b;c++){var a=',45,'[c];if','(a.nodeName.substr(','0,6)==="xmlns:"&&a.nodeValue===',7,2,'){',34,49,'6)+":math"))}}}},',39,5,'b){var a;if(b.length){if(',7,'msieMathTagBug','){','for(a=b.length-1;a>=0;a--){','if(b[a].nodeName==="MATH"){',7,'msieProcessMath','(b[a])}else{','this.ProcessMath(b[a','])}}}else{',63,68,'])}}}},ProcessMath',5,'e){var d','=e.parentNode;var a=document.createElement("script");a.type="math/mml";','d','.insertBefore(','a,e);if(',7,'msieScriptBug','){var b=',7,'msieOuterHTML','(e);b=b.replace(/<\\?import .*?>/i,"").replace(/<\\?xml:namespace .*?\\/>/i,"");a.text=b.replace(/&nbsp;/g,"&#xA0;");d.removeChild(e)}else{var c=','MathJax.HTML.Element("span','");c.appendChild(e);MathJax.HTML.addText(a,c.innerHTML)}','if(this.config.preview!=="none"){this.createPreview(e,a)}},',66,5,'e){var c',75,'c',77,'a,e);var b="",d;while','(e&&e.nodeName','!=="/MATH"){d=e;e=e.nextSibling;b+=','this.msieNodeHTML(d',');d','.parentNode.removeChild(','d)}if',95,'==="/MATH"){e',99,'e)}a.text=b+"</math>";',87,'msieNodeHTML',5,'d){var c,b,a;if(','d.nodeName==="#','text"||',109,'comment"){c=d.','nodeValue.replace','(/&/g,"&#x26;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}else{if(',7,'msieAttributeBug','){c="<"+d.','nodeName.toLowerCase','();for(b=0,a=',45,'.length;b<a;b','++){if(',45,'[b].','specified){c+=" "+',45,124,118,'()+"=";c+=\'"\'+',45,124,113,'(/\\"/g,\'\\\\"\')+\'"\'}}c+=">"}else{c=',7,'toLowerCase','(d.outerHTML);var e=c.split(/\\"/);for(b=0,a=e',121,'+=2){e[b]=e',124,135,'()}c=e.join(\'"\')}}return c},',83,5,'d){if(d.nodeName.charAt(0)==="#"){return ',97,')}if(!',7,116,'){return d.outerHTML}var c=',97,');for(var b=0,a=d.','childNodes',121,'++){c+=',7,83,'(d.',152,'[b])}c+="</"+d.',118,'()+">";return c},createPreview',5,'b,a){var c;if(',12,'.preview','==="alttext"){var d=b.getAttribute("alttext");if(d!=null){c=[',7,'filterText','(d)]}}else{if(',12,165,' instanceof Array){c=',12,165,'}}if(c){c=',85,'",{className',':',10,15,'preRemoveClass},c);a.parentNode',77,'c,a)}},',168,5,'a){return a},',27,':function(){',10,'Browser.Select({MSIE',5,'a',81,85,177,':"mathjax"});',10,11,0,',{',80,':true,',61,':(',85,'",{innerHTML:"<math><mi>x</mi></math>"}).',152,'.length!==1),',116,':(b.outerHTML.substr(12)!==\'"\')})}})}};',10,'Register.PreProcessor(["',4,'",',0,']);MathJax.Ajax.loadComplete("[MathJax]/extensions/mml2jax.js");']
]);

