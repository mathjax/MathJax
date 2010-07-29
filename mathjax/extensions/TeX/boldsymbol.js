/*
 *  ../SourceForge/trunk/mathjax/extensions/TeX/boldsymbol.js
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
  ['MathJax.Hub.Register.StartupHook("','TeX',' Jax Ready",function(){var a=MathJax.','ElementJax.mml;var d=MathJax.InputJax.TeX;var b=d.Definitions;var c={};c[','a.VARIANT.','NORMAL]=',4,'BOLD;c[',4,'ITALIC]=',4,'BOLDITALIC;c[',4,'FRAKTUR]=',4,'BOLDFRAKTUR;c[',4,'SCRIPT]=',4,'BOLDSCRIPT;c[',4,'SANSSERIF]=',4,'BOLDSANSSERIF;c','["-tex-caligraphic','"]="-tex-','caligraphic-bold";c','["-tex-oldstyle',25,'oldstyle-bold";b.macros.boldsymbol="Boldsymbol";d.Parse.Augment({mmlToken:function(f){if(','this.stack.env.boldsymbol','){var e=','f.Get("','mathvariant','");if(e==null){f.',33,'=',4,'BOLD}else{f.',33,'=(c[e]||e)}}return f},Boldsymbol:function(h',31,30,',f=','this.stack.env.font',';',30,'=true;',44,'=null;var g=this.ParseArg(h);',44,'=f;',30,'=e;this.Push(g)}})});',0,'HTML-CSS',2,'OutputJax["',55,'"];var c=a.FONTDATA.FONTS;var b=a.FONTDATA.VARIANT;','if(a.fontInUse==="','TeX"){c["MathJax_Caligraphic-bold"]="Caligraphic/Bold/Main.js";b',24,'-bold"]={fonts:["MathJax_Caligraphic-bold","MathJax_Main-bold","MathJax_Main","MathJax_Math","MathJax_Size1','"],offsetA:65,variantA:"','bold-italic','"};b',27,63,'"]};if(','a.msieCheckGreek','&&a.Font.testFont({family:"','MathJax_Greek','",weight:"bold",style:"italic",testString:',70,'})){b["',65,'"].offsetG=913;b["',65,'"].variantG="-','Greek-Bold-Italic','";b["-',80,'"]={fonts:["',72,'-',65,'"]};c["',72,'-',65,'"]="Greek/BoldItalic/Main.js"}if(','MathJax.Hub.Browser.','isChrome&&!',92,'versionAtLeast("5.0")){b',24,'-bold"].remap={84:[58096,"-WinChrome"]}}}else{',60,'STIX"){b',24,'-bold"]={fonts:["STIXGeneral-bold','-italic','","STIXNonUnicode','-',65,103,'","STIXGeneral","STIXSizeOneSym"],','offsetA:57927,noLowerCase:1};b',27,101,103,'-bold',107,'offsetN:57955,remap:{57956:57959,57957:57963,57958:57967,57959:57971,57960:57975,57961:57979,57962:57983,57963:57987,57964:57991}}}}MathJax.Hub.Startup.signal.Post("TeX boldsymbol Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/boldsymbol.js");']
]);

