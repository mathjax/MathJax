/*
 *  ../SourceForge/trunk/mathjax/extensions/mml2jax.js
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
  ['MathJax.','Extension.mml2jax','={varsion:"1.0.3",config:{element:null,preview:"alttext"},','MMLnamespace',':"http://www.w3.org/1998/Math/MathML",','PreProcess',':function(','e){if(!','this.','configured','){',0,'Hub.Insert(','this.config',',(',0,'Hub.config.','mml2jax||{}));if(',13,'.Augment','){',0,12,'this,',13,19,')}',8,'InitBrowser','();',8,9,'=true}if(typeof(e)==="string"){e=document.getElementById(e)}if(!e){e=',13,'.element||document.body}','this.ProcessMathArray(e.getElementsByTagName','("math"));if','(e.getElementsByTagNameNS','){',8,'ProcessMathArray',37,'(',8,3,',"math"))}var d=document.getElementsByTagName("html")[0];if(d){for(var c=0,b=','d.attributes','.length;c<b;c++){var a=',46,'[c];if','(a.nodeName.substr(','0,6)==="xmlns:"&&a.nodeValue===',8,3,'){',35,50,'6)+":math"))}}}},',40,6,'b){var a;if(b.length){if(',8,'msieMathTagBug','){','for(a=b.length-1;a>=0;a--){','if(b[a].nodeName==="MATH"){',8,'msieProcessMath','(b[a])}else{','this.ProcessMath(b[a','])}}}else{',64,69,'])}}}},ProcessMath',6,'e){var d','=e.parentNode;var a=document.createElement("script");a.type="math/mml";','d','.insertBefore(','a,e);if(',8,'msieScriptBug','){var b=',8,'msieOuterHTML','(e);b=b.replace(/<\\?import .*?>/i,"").replace(/<\\?xml:namespace .*?\\/>/i,"");a.text=b.replace(/&nbsp;/g,"&#xA0;");d.removeChild(e)}else{var c=',0,'HTML.Element("span','");c.appendChild(e);',0,'HTML.addText(a,c.innerHTML)}','if(this.config.preview!=="none"){this.createPreview(e,a)}},',67,6,'e){var c',76,'c',78,'a,e);var b="",d;while','(e&&e.nodeName','!=="/MATH"){d=e;e=e.nextSibling;b+=','this.msieNodeHTML(d',');d','.parentNode.removeChild(','d)}if',99,'==="/MATH"){e',103,'e)}a.text=b+"</math>";',91,'msieNodeHTML',6,'d){var c,b,a;if(','d.nodeName==="#','text"||',113,'comment"){c=d.','nodeValue.replace','(/&/g,"&#x26;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}else{if(',8,'msieAttributeBug','){c="<"+d.','nodeName.toLowerCase','();for(b=0,a=',46,'.length;b<a;b','++){if(',46,'[b].','specified){c+=" "+',46,128,122,'()+"=";c+=\'"\'+',46,128,117,'(/\\"/g,\'\\\\"\')+\'"\'}}c+=">"}else{c=',8,'toLowerCase','(d.outerHTML);var e=c.split(/"/);for(b=0,a=e',125,'+=2){e[b]=e',128,139,'()}c=e.join(\'"\')}}return c},',84,6,'d){if(d.nodeName.charAt(0)==="#"){return ',101,')}if(!',8,120,'){return d.outerHTML}var c=',101,');for(var b=0,a=','d.childNodes',125,'++){c+=',8,84,'(',156,'[b])}c+="</"+d.',122,'()+">";return c},createPreview',6,'b,a){var c;if(',13,'.preview','==="alttext"){var d=b.getAttribute("alttext");if(d!=null){c=[',8,'filterText','(d)]}}else{if(',13,169,' instanceof Array){c=',13,169,'}}if(c){c=',0,87,'",{className',':',0,16,'preRemoveClass},c);a.parentNode',78,'c,a)}},',172,6,'a){return a},',28,':function(){',0,'Hub.Browser.Select({MSIE',6,'a',82,0,87,182,':"mathjax"});',0,12,0,1,',{',81,':true,',62,209,120,':(b.outerHTML.substr(12)!==\'"\')})}})}};',0,'Hub.Register.PreProcessor(["',5,'",',0,1,']);',0,'Ajax.loadComplete("[MathJax]/extensions/mml2jax.js");']
]);

