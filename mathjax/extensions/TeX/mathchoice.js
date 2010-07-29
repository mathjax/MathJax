/*
 *  ../SourceForge/trunk/mathjax/extensions/TeX/mathchoice.js
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
  ['MathJax.','Hub.Register.StartupHook("TeX Jax Ready",function(){var a=',0,'ElementJax.mml;var c=',0,'InputJax.TeX;var b=c.Definitions;b.macros.','mathchoice','="','MathChoice','";c.Parse.Augment({',8,':function','(e){var h','=this.ParseArg(e','),d',13,'),f',13,'),g',13,');this.Push(a.','TeXmathchoice','(h,d,f,g))}});a.',21,'=a.mbase.Subclass({type:"',21,'",choice',11,'(){var d=this.getValues("displaystyle","','scriptlevel','");if(d.',29,'>0){return Math.min(3,d.',29,'+1)}return(d.displaystyle?0:1)},','setTeXclass',11,'(d){return this.','Core().',35,'(d)},','isSpacelike',':function(){return this.',38,41,'()},','isEmbellished',42,38,46,'()},Core',42,'data[this.choice()]},toHTML',11,'(d){d=this.HTMLcreateSpan(d);d.bbox=this.',38,'toHTML(d).bbox;return d}});',0,'Hub.Startup.signal.Post("TeX ',6,' Ready")});',0,'Ajax.loadComplete("[MathJax]/extensions/TeX/',6,'.js");']
]);

