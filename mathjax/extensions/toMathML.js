/*
 *  ../SourceForge/trunk/mathjax/extensions/toMathML.js
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
  ['MathJax.Hub.Register.','LoadHook("[','MathJax',']/jax/element/mml/jax.js",','function(){','var a=',2,'.ElementJax.mml;a.mbase','.Augment({toMathML:function(','j){var f=(this.inferred&&this.parent.inferRow);if(j==null){j=""}var d','=this.','type,c',10,'MathMLattributes','();if(d==="mspace"){','return j+"<"+d+c','+" />"}','var h=[];var g=(','this.isToken','?"":j+(f?"":"  "));for(var e=0,b',10,'data','.length;e<b;e++){','if(','this.data[','e]){h.push(',24,'e].toMathML(g))}else{if(!',18,'){h.push(','g+"<mrow />")}}}if(',18,'){',15,'+">"+h.join("")+"</"+d+">"}if(f){return h.join("\\n")}if(h.length===0||(h.length===1&&h[0]==="")){',15,16,15,'+">\\n"+h.join("\\n")+"\\n"+j+"</"+d+">"},',13,':',4,'var h=[],f',10,'defaults;var b',10,'copyAttributes',',k',10,'skipAttributes',';','if(this.type==="','math"){h.push(\'xmlns="http://www.w3.org/1998/Math/MathML"\')}',51,'mstyle"){f=a.math.prototype.defaults}for(var c in f){if(!k[c]&&f.hasOwnProperty(c)){var d=(c==="open"||c==="close");if(this[c]!=null&&(d||this[c]!==f[c])){var j=this[c];delete this[c];if(d||this.Get(c)!==j',29,'c+\'="\'+','this.quoteHTML(','j)+\'"\')}this[c]=j}}}for(var g=0,e=b.length;g<e;g++){if(this[b[g]]!=null',29,'b[g]+\'="\'+',57,'this[b[g]])+\'"\')}}if(h.length){return" "+h.join(" ")}else{return""}},',46,':["fontfamily","fontsize","fontweight","fontstyle","color","background","id","class","href","style"],',49,':{texClass:1,useHeight:1,texprimestyle:1},quoteHTML:function(d){d=String(d).split("");for(var e=0,b=d',22,'var g=d[e].charCodeAt(0);if(g<32||g>126){d[e]="&#x"+g.toString(16).toUpperCase()+";"}else{var f={"&":"&amp;","<":"&lt;",">":"&gt;",\'"\':"&quot;"}[d[e]];if(f){d[e]=f}}}return d.join("")}});a.msubsup',8,'g){var d=this.type;if(this.data[this.','sup',']==null){d="','msub"}if(',24,'this.sub',72,'msup','"}var c=this.MathMLattributes();delete this.data[0].inferred;var f=[];for(var e=0,b=this.data.length;e<b;e++){if(this.data[e]){f.push(this.data[e].toMathML(g+"  "))}}return g+"<"+d+c+">\\n"+f.join("\\n")+"\\n"+g+"</"+d+">"}});a.','munderover',8,70,'under',72,'mover"}if(',24,'this.over',72,'munder',78,'TeXAtom',8,'b){return',' b+"<mrow>\\n"+',24,'0].toMathML(b+"  ")+"\\n"+b+"</mrow>"}});a.chars',8,92,'(b||"")+',57,'this.toString','())}});a.entity',8,92,'(b||"")+"&"+',24,'0]+";<!-- "+',100,'()+" -->"}});',0,'StartupHook("TeX mathchoice Ready",',4,'a.TeXmathchoice',8,92,' this.Core().toMathML(b)}})});',2,'.Hub.Startup.signal.Post("toMathML Ready")});',2,'.Ajax.loadComplete("[',2,']/extensions/toMathML.js");']
]);

