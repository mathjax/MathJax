/*
 *  /MathJax/extensions/TeX/verb.js
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

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var c="1.0";var a=MathJax.ElementJax.mml;var d=MathJax.InputJax.TeX;var b=d.Definitions;b.macros.verb="Verb";d.Parse.Augment({Verb:function(e){var h=this.GetNext();var g=++this.i;if(h==""){d.Error(e+" requires an argument")}while(this.i<this.string.length&&this.string.charAt(this.i)!=h){this.i++}if(this.i==this.string.length){d.Error("Can't find closing delimiter for "+e)}var f=this.string.slice(g,this.i);this.i++;this.Push(a.mtext(f).With({mathvariant:a.VARIANT.MONOSPACE}))}});MathJax.Hub.Startup.signal.Post("TeX verb Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/verb.js");

