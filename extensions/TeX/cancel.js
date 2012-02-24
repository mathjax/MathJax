/*
 *  /MathJax/extensions/TeX/cancel.js
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

MathJax.Extension["TeX/cancel"]={version:"2.0",ALLOWED:{arrow:1,color:1,mathcolor:1,background:1,mathbackground:1,padding:1,thickness:1}};MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var d=MathJax.InputJax.TeX,c=d.Definitions.macros,a=MathJax.ElementJax.mml,b=MathJax.Extension["TeX/cancel"];b.setAttributes=function(j,f){if(f!==""){f=f.replace(/ /g,"").split(/,/);for(var h=0,e=f.length;h<e;h++){var g=f[h].split(/[:=]/);if(b.ALLOWED[g[0]]){if(g[1]==="true"){g[1]=true}if(g[1]==="false"){g[1]=false}j[g[0]]=g[1]}}}return j};c.cancel=["Cancel",a.NOTATION.UPDIAGONALSTRIKE];c.bcancel=["Cancel",a.NOTATION.DOWNDIAGONALSTRIKE];c.xcancel=["Cancel",a.NOTATION.UPDIAGONALSTRIKE+" "+a.NOTATION.DOWNDIAGONALSTRIKE];c.cancelto="CancelTo";d.Parse.Augment({Cancel:function(f,h){var e=this.GetBrackets(f,""),g=this.ParseArg(f);var i=b.setAttributes({notation:h},e);this.Push(a.menclose(g).With(i))},CancelTo:function(f,h){var j=this.ParseArg(f),e=this.GetBrackets(f,""),g=this.ParseArg(f);var i=b.setAttributes({notation:a.NOTATION.UPDIAGONALSTRIKE,arrow:true},e);j=a.mpadded(j).With({depth:"-.1em",height:"+.1em",voffset:".1em"});this.Push(a.msup(a.menclose(g).With(i),j))}});MathJax.Hub.Startup.signal.Post("TeX cancel Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/cancel.js");

