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
  ['MathJax.Extension.mml2jax','={varsion:"1.0.3",config:{element:null,preview:"alttext"},','MMLnamespace',':"http://www.w3.org/1998/Math/MathML",','PreProcess',':function(','e){if(!','this.configured','){','MathJax.Hub.','Insert(','this.config',',(',9,'config.','mml2jax||{}));if(',11,'.Augment','){',9,10,'this,',11,17,')}',7,'=true}if(typeof(e)==="string"){e=document.getElementById(e)}if(!e){e=',11,'.element||document.body}','this.ProcessMathArray(e.getElementsByTagName','("math"));if','(e.getElementsByTagNameNS','){this.','ProcessMathArray',31,'(this.',2,',"math"))}var d=document.getElementsByTagName("html")[0];if(d){for(var c=0,b=d.attributes.length;c<b;c++){var a=d.attributes[c];if','(a.nodeName.substr(','0,6)==="xmlns:"&&a.nodeValue===this.',2,'){',29,38,'6)+":math"))}}}},',33,5,'b){var a;if(b.length){if',35,'msieMathTagBug','){','for(a=b.length-1;a>=0;a--){','if(b[a].nodeName==="MATH"){this.','msieProcessMath','(b[a])}else{','this.ProcessMath(b[a','])}}}else{',51,55,'])}}}},ProcessMath',5,'e){var d','=e.parentNode;var a=document.createElement("script");a.type="math/mml";','d','.insertBefore(','a,e);if',35,'msieScriptBug','){var b=e.outerHTML;b=b.replace(/<\\?import .*?>/i,"").replace(/<\\?xml:namespace .*?\\/>/i,"");a.text=b.replace(/&nbsp;/g,"&#xA0;");d.removeChild(e)}else{var ','c=MathJax.HTML.Element("span','");c.appendChild(e);MathJax.HTML.addText(a,c.innerHTML)}','if(this.config.preview!=="none"){this.createPreview(e,a)}},',53,5,'e){var c',62,'c',64,'a,e);var b="";while(e&&','e.nodeName','!=="/MATH"){if(',79,'==="#text"||',79,'==="#comment"){b+=e.nodeValue.replace(/&/g,"&#x26;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}else{b+=this.','toLowerCase','(e.outerHTML)}var d=e;e=e.nextSibling;d','.parentNode.removeChild(','d)}if(e&&',79,'==="/MATH"){e',87,'e)}a.text=b+"</math>";',71,85,5,'b){var d=b.split(/"/);for(var c=0,a=d.length;c<a;c+=2){d[c]=d[c].',85,'()}return d.join(\'"\')},createPreview',5,'b,a){var c;if(',11,'.preview','==="alttext"){var d=b.getAttribute("alttext");if(d!=null){c=[this.filterText(d)]}}else{if(',11,102,' instanceof Array){c=',11,102,'}}if(c){',69,'",{className:',9,14,'preRemoveClass},c);a.parentNode',64,'c,a)}},filterText',5,'a){return a}};',9,'Browser.Select({MSIE',5,'a){',9,10,0,',{',67,':true,',49,':true})}});',9,'Register.PreProcessor(["',4,'",',0,']);MathJax.Ajax.loadComplete("[MathJax]/extensions/mml2jax.js");']
]);

