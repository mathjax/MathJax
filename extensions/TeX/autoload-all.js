/*
 *  /MathJax/extensions/TeX/autoload-all.js
 *  
 *  Copyright (c) 2012 Design Science, Inc.
 *
 *  Part of the MathJax library.
 *  See http://www.mathjax.org for details.
 * 
 *  Licensed under the Apache License, Version 2.0;
 *  you may not use this file except in compliance with the License.
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */

MathJax.Extension["TeX/autoload-all"]={version:"2.0"};MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var h=MathJax.InputJax.TeX,c=h.Definitions.macros,g=h.Definitions.environment;var f={action:["mathtip","texttip","toggle"],AMSmath:["mathring","nobreakspace","negmedspace","negthickspace","intI","iiiint","idotsint","dddot","ddddot","sideset","boxed","substack","injlim","projlim","varliminf","varlimsup","varinjlim","varprojlim","DeclareMathOperator","operatorname","genfrac","tfrac","dfrac","binom","tbinom","dbinom","cfrac","shoveleft","shoveright","xrightarrow","xleftarrow"],begingroup:["begingroup","endgroup","gdef","global"],cancel:["cancel","bcancel","xcancel","cancelto"],color:["color","colorbox","fcolorbox","DefineColor"],enclose:["enclose"],extpfeil:["Newextarrow","xlongequal","xmapsto","xtofrom","xtwoheadleftarrow","xtwoheadrightarrow"],mhchem:["ce","cee","cf"]};for(var b in f){if(f.hasOwnProperty(b)){var e=f[b];for(var d=0,a=e.length;d<a;d++){c[e[d]]=["Extension",b]}}}g.subarray=["ExtensionEnv",null,"AMSmath"];g.smallmatrix=["ExtensionEnv",null,"AMSmath"];g.equation=["ExtensionEnv",null,"AMSmath"];g["equation*"]=["ExtensionEnv",null,"AMSmath"];MathJax.Hub.Startup.signal.Post("TeX autoload-all Ready")});MathJax.Callback.Queue(["Require",MathJax.Ajax,"[MathJax]/extensions/TeX/AMSsymbols.js"],["loadComplete",MathJax.Ajax,"[MathJax]/extensions/TeX/autoload-all.js"]);

