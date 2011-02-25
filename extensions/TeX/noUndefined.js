/*
 *  /MathJax/extensions/TeX/noUndefined.js
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

MathJax.Extension["TeX/noUndefined"]={version:"1.0.1",config:MathJax.Hub.CombineConfig("TeX.noUndefined",{attributes:{mathcolor:"red"}})};MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var b=MathJax.Extension["TeX/noUndefined"].config;var a=MathJax.ElementJax.mml;MathJax.InputJax.TeX.Parse.Augment({csUndefined:function(c){this.Push(a.mtext(c).With(b.attributes))}});MathJax.Hub.Startup.signal.Post("TeX noUndefined Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/noUndefined.js");

