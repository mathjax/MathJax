/*
 *  /MathJax/extensions/TeX/autobold.js
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

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var b="1.0";var c=MathJax.InputJax.TeX;var a=c.prefilterMath;c.prefilterMath=function(g,h,e){var f=e.parentNode.insertBefore(document.createElement("span"),e);f.visibility="hidden";f.style.fontFamily="Times, serif";f.appendChild(document.createTextNode("ABCXYZabcxyz"));var d=f.offsetWidth;f.style.fontWeight="bold";if(f.offsetWidth==d){g="\\bf {"+g+"}"}f.parentNode.removeChild(f);return a.call(c,g,h,e)};MathJax.Hub.Startup.signal.Post("TeX autobold Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/autobold.js");

