/*
 *  ../SourceForge/trunk/mathjax/jax/output/HTML-CSS/autoload/ms.js
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
  ['(','function(','a){a.ms.Augment({toHTML:',1,'c){c=this.HTMLhandleSize(this.HTMLcreateSpan(c));var b=this.getValues("lquote","rquote");var e=this.data.join("");var d=[];if(b.lquote','.length===1){d.push(this.HTMLquoteRegExp(b.','lquote))}if(b.rquote',5,'rquote))}if(d.length){e=e.replace(RegExp("("+d.join("|")+")","g"),"\\\\$1")}this.HTMLhandleVariant(c,this.HTMLgetVariant(),b.lquote+e+b.rquote);this.HTMLhandleSpace(c);this.HTMLhandleColor(c);return c},HTMLquoteRegExp:',1,'b){return b.replace(/([.*+?|{}()\\[\\]\\\\])/g,"\\\\$1")}});a.ms.prototype.defaults.fontfamily="monospace";MathJax.Hub.Startup.signal.Post("HTML-CSS ms Ready")})(MathJax.ElementJax.mml);MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].autoloadDir+"/ms.js");']
]);

