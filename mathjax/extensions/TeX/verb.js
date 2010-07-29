/*
 *  ../SourceForge/trunk/mathjax/extensions/TeX/verb.js
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
  ['MathJax.','Hub.Register.StartupHook("TeX Jax Ready",function(){var a=',0,'ElementJax.mml;var c=',0,'InputJax.TeX;var b=c.Definitions;b.macros.verb="Verb";c.Parse.Augment({Verb:function(d){var g=this.GetNext();var f=++this.i;if(g==""){c.Error(d+" requires an argument")}while(this.i<','this.string.','length&&',6,'charAt(this.i)!=g){this.i++}if(this.i==',6,'length){c.Error("Can\'t find closing delimiter for "+d)}var e=',6,'slice(f,this.i);this.i++;this.Push(a.mtext(e).With({mathvariant:a.VARIANT.MONOSPACE}))}});',0,'Hub.Startup.signal.Post("TeX verb Ready")});',0,'Ajax.loadComplete("[MathJax]/extensions/TeX/verb.js");']
]);

