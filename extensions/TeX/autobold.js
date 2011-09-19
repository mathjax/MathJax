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

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var a="1.1.1";var b=MathJax.InputJax.TeX;b.prefilterHooks.Add(function(e){var d=e.script.parentNode.insertBefore(document.createElement("span"),e.script);d.visibility="hidden";d.style.fontFamily="Times, serif";d.appendChild(document.createTextNode("ABCXYZabcxyz"));var c=d.offsetWidth;d.style.fontWeight="bold";if(d.offsetWidth===c){e.math="\\boldsymbol{"+e.math+"}"}d.parentNode.removeChild(d)});MathJax.Hub.Startup.signal.Post("TeX autobold Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/autobold.js");

