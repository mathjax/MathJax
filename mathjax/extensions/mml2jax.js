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
  ['MathJax.Extension.mml2jax','={','config',':{element:null,preview:"alttext"},MMLnamespace:"http://www.w3.org/1998/Math/MathML",','PreProcess',':function(','b){if(!','this.configured','){','MathJax.Hub.','Insert(','this.config',',(',9,2,'.mml2jax||{}));if(',11,'.Augment','){',9,10,'this,',11,17,')}',7,'=true}if(typeof(b)==="string"){b=document.getElementById(b)}if(!b){b=',11,'.element||document.body}var c=b.getElementsByTagName("math"),a;if(c.length===0&&','b.getElementsByTagNameNS','){c=',29,'(this.MMLnamespace,"math")}if(this.','msieMathTagBug','){','for(a=c.length-1;a>=0;a--){','if(c[a].nodeName==="MATH"){this.','msieProcessMath','(c[a])}else{','this.ProcessMath(c[a','])}}}else{',35,39,'])}}},ProcessMath',5,'d){var c=d','.parentNode;var a=document.createElement("script");a.type="math/mml";c.insertBefore(a,','d);if(this.msieScriptBug){var b=d.outerHTML;b=b.replace(/<\\?import .*?>/,"").replace(/<\\?xml:namespace .*?\\/>/,"");b=b.replace(/<(\\/?)m:/g,"<$1").replace(/&nbsp;/g,"&#xA0;");a.text=b;c.removeChild(d)}else{a.appendChild(d)}if(','this.config.preview','!=="none"){this.createPreview(','d,a)}},',37,5,'e){var c=e',46,'e);var b="";while(e&&','e.nodeName','!=="/MATH"){if(',56,'==="#text"||',56,'==="#comment"){b+=e.nodeValue.replace(/&/g,"&#x26;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}else{b+=this.','toLowerCase','(e.outerHTML)}var d=e;e=e.nextSibling;d','.parentNode.removeChild(','d)}if(e&&',56,'==="/MATH"){e',64,'e)}a.text=b+"</math>";if(',48,49,'e,a)}},',62,5,'b){var d=b.split(/"/);for(var c=0,a=d.length;c<a;c+=2){d[c]=d[c].',62,'()}return d.join(\'"\')},createPreview',5,'b,a){var c;if(',48,'==="alttext"){var d=b.getAttribute("alttext");if(d!=null){c=[this.filterText(d)]}}else{if(',48,' instanceof Array){c=',48,'}}if(c){c=MathJax.HTML.Element("span",{className:',9,2,'.preRemoveClass},c);a.parentNode.insertBefore(c,a)}},filterText',5,'a){return a}};',9,'Browser.Select({MSIE',5,'a){',9,10,0,',{msieScriptBug:true,',33,':true})}});',9,'Register.PreProcessor(["',4,'",',0,']);MathJax.Ajax.loadComplete("[MathJax]/extensions/mml2jax.js");']
]);

