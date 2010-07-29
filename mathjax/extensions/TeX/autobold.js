/*
 *  ../SourceForge/trunk/mathjax/extensions/TeX/autobold.js
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
  ['MathJax.','Hub.Register.StartupHook("TeX Jax Ready",function(){var b=',0,'InputJax.TeX;var a=','b.prefilterMath',';',4,'=function(f,g,d){var e=d.parentNode.insertBefore(document.createElement("span"),d);e.visibility="hidden";e.style.fontFamily="Times, serif";e.appendChild(document.createTextNode("ABCXYZabcxyz"));var c=','e.offsetWidth',';e.style.fontWeight="bold";if(',8,'==c){f="\\\\bf {"+f+"}"}e.parentNode.removeChild(e);return a.call(b,f,g,d)};',0,'Hub.Startup.signal.Post("TeX autobold Ready")});',0,'Ajax.loadComplete("[MathJax]/extensions/TeX/autobold.js");']
]);

