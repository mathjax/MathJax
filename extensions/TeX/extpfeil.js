/*
 *  /MathJax/extensions/TeX/extpfeil.js
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

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var b="1.1";var c=MathJax.InputJax.TeX,a=c.Definitions;MathJax.Hub.Insert(a,{macros:{xtwoheadrightarrow:["Extension","AMSmath"],xtwoheadleftarrow:["Extension","AMSmath"],xmapsto:["Extension","AMSmath"],xlongequal:["Extension","AMSmath"],xtofrom:["Extension","AMSmath"],Newextarrow:["Extension","AMSmath"]}});MathJax.Hub.Register.StartupHook("TeX AMSmath Ready",function(){MathJax.Hub.Insert(a,{macros:{xtwoheadrightarrow:["xArrow",8608,12,16],xtwoheadleftarrow:["xArrow",8606,17,13],xmapsto:["xArrow",8614,6,7],xlongequal:["xArrow",61,7,7],xtofrom:["xArrow",8644,12,12],Newextarrow:"NewExtArrow"}})});c.Parse.Augment({NewExtArrow:function(d){var f=this.GetArgument(d),g=this.GetArgument(d),e=this.GetArgument(d);if(!f.match(/^\\([a-z]+|.)$/i)){c.Error("First argument to "+d+" must be a control sequence name")}if(!g.match(/^(\d+),(\d+)$/)){c.Error("Second argument to "+d+" must be two integers separated by a comma")}if(!e.match(/^(\d+|0x[0-9A-F]+)$/i)){c.Error("Third argument to "+d+" must be a unicode character number")}f=f.substr(1);g=g.split(",");e=parseInt(e);a.macros[f]=["xArrow",e,parseInt(g[0]),parseInt(g[1])]}});MathJax.Hub.Startup.signal.Post("TeX extpfeil Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/extpfeil.js");

