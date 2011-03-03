/*
 *  /MathJax/jax/output/NativeMML/config.js
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

MathJax.OutputJax.NativeMML=MathJax.OutputJax({id:"NativeMML",version:"1.1",directory:MathJax.OutputJax.directory+"/NativeMML",extensionDir:MathJax.OutputJax.extensionDir+"/NativeMML",config:{scale:100,showMathMenu:true,showMathMenuMSIE:true,styles:{"DIV.MathJax_MathML":{"text-align":"center",margin:".75em 0px"}}}});if(!MathJax.Hub.config.delayJaxRegistration){MathJax.OutputJax.NativeMML.Register("jax/mml")}(function(b){if(b.isMSIE){var a=document.createElement("object");a.id="mathplayer";a.classid="clsid:32F66A20-7614-11D4-BD11-00104BD3F987";document.getElementsByTagName("head")[0].appendChild(a);document.namespaces.add("mjx","http://www.w3.org/1998/Math/MathML");document.namespaces.mjx.doImport("#mathplayer")}})(MathJax.Hub.Browser);MathJax.OutputJax.NativeMML.loadComplete("config.js");

