/*
 *  ../SourceForge/trunk/mathjax/config/MMLorHTML.js
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
  ['(function(c){var a=','MathJax.Hub','.Insert({prefer:{MSIE:"MML",Firefox:"MML",Opera:"HTML",other:"HTML"}},(',1,'.config.MMLorHTML||{}));var f={Firefox:3,Opera:9.52,MSIE:6,Chrome:0.3,Safari:2,Konqueror:4};var b=(c','.Browser','.version==="0.0"||','c.Browser.versionAtLeast','(f[c',5,']||0));var h;try{new ActiveXObject("MathPlayer.Factory.1");h=true}catch(g){h=false}var e=(c',5,'.isFirefox&&',7,'("1.5"))||(c',5,'.isMSIE&&h)||(c',5,'.isOpera&&',7,'("9.52"));var d=(a.prefer&&typeof(a.prefer)==="object"?a.prefer[',1,5,']||a.prefer.other||"HTML":a.prefer);if(b||e){if(e&&(d==="MML"||!b)){','c.config.jax.unshift("output/','NativeMML")}else{',24,'HTML-CSS")}}else{c.PreProcess','.disabled=true;','c.prepareScripts',28,'MathJax.Message.Set("Your browser does not support MathJax",null,4000);c.Startup.signal.Post("MathJax not supported")}})(',1,');MathJax.Ajax.loadComplete("[MathJax]/config/MMLorHTML.js");']
]);

