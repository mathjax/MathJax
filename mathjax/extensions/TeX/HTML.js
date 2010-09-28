/*
 *  ../SourceForge/trunk/mathjax/extensions/TeX/HTML.js
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
  ['MathJax.','Hub.Register.StartupHook("TeX Jax Ready",function(){var b="1.0";var c=',0,'InputJax.TeX;var a=c.Definitions;a.macros.href="','HREF_attribute','";a.macros','["class','"]="','CLASS_attribute',5,'.style="','STYLE_attribute',5,'.cssId="','ID_attribute','";c.Parse.Augment({',4,':function(f){var e=this.GetArgument(f),d=this.GetArgumentMML(f);this.Push(d.With({','href:e}))},',8,':function(e){var f=this.GetArgument(e),d=this.GetArgumentMML(e);if(d',6,'"]!=null){f=d',6,'"]+" "+','f}this.Push(d.With','({"class":f}))},',11,20,'.style!=null){if(f.charAt(f.length-1)!==";"){f+=";"}f=d.style+" "+',25,'({style:f}))},',14,17,'id:e}))},GetArgumentMML:function(e){var d=this.ParseArg(e);if(d.inferred&&d.data.length==1){d=d.data[0]}else{delete d.inferred}return d}});',0,'Hub.Startup.signal.Post("TeX HTML Ready")});',0,'Ajax.loadComplete("[MathJax]/extensions/TeX/HTML.js");']
]);

