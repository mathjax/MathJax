/*
 *  /MathJax/jax/output/HTML-CSS/config.js
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

MathJax.OutputJax["HTML-CSS"]=MathJax.OutputJax({id:"HTML-CSS",version:"1.0.7",directory:MathJax.OutputJax.directory+"/HTML-CSS",extensionDir:MathJax.OutputJax.extensionDir+"/HTML-CSS",autoloadDir:MathJax.OutputJax.directory+"/HTML-CSS/autoload",fontDir:MathJax.OutputJax.directory+"/HTML-CSS/fonts",webfontDir:MathJax.OutputJax.fontDir+"/HTML-CSS",config:{scale:100,minScaleAdjust:50,availableFonts:["STIX","TeX"],preferredFont:"TeX",webFont:"TeX",imageFont:"TeX",showMathMenu:true,styles:{".MathJax_Display":{"text-align":"center",margin:"1em 0em"},".MathJax .merror":{"background-color":"#FFFF88",color:"#CC0000",border:"1px solid #CC0000",padding:"1px 3px","font-family":"serif","font-style":"normal","font-size":"90%"},".MathJax_Preview":{color:"#888888"},"#MathJax_Tooltip":{"background-color":"InfoBackground",color:"InfoText",border:"1px solid black","box-shadow":"2px 2px 5px #AAAAAA","-webkit-box-shadow":"2px 2px 5px #AAAAAA","-moz-box-shadow":"2px 2px 5px #AAAAAA",filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')",padding:"3px 4px"}}}});if(!MathJax.Hub.config.delayJaxRegistration){MathJax.OutputJax["HTML-CSS"].Register("jax/mml")}(function(b,c){var a;a=b.Insert({minBrowserVersion:{Firefox:3,Opera:9.52,MSIE:6,Chrome:0.3,Safari:2,Konqueror:4},inlineMathDelimiters:["$","$"],displayMathDelimiters:["$$","$$"],multilineDisplay:true,minBrowserTranslate:function(f){var e=b.getJaxFor(f),l=["[Math]"],k;var h=document.createElement("span",{className:"MathJax_Preview"});var j=e.root.Get("displaystyle");if(e.inputJax.id==="TeX"){if(j){k=a.displayMathDelimiters;l=[k[0]+e.originalText+k[1]];if(a.multilineDisplay){l=l[0].split(/\n/)}}else{k=a.inlineMathDelimiters;l=[k[0]+e.originalText.replace(/^\s+/,"").replace(/\s+$/,"")+k[1]]}}for(var g=0,d=l.length;g<d;g++){h.appendChild(document.createTextNode(l[g]));if(g<d-1){h.appendChild(document.createElement("br"))}}f.parentNode.insertBefore(h,f)}},(b.config["HTML-CSS"]||{}));if(b.Browser.version!=="0.0"&&!b.Browser.versionAtLeast(a.minBrowserVersion[b.Browser]||0)){c.Translate=a.minBrowserTranslate;MathJax.Hub.Config({showProcessingMessages:false});MathJax.Message.Set("Your browser does not support MathJax",null,4000);b.Startup.signal.Post("MathJax not supported")}})(MathJax.Hub,MathJax.OutputJax["HTML-CSS"]);MathJax.OutputJax["HTML-CSS"].loadComplete("config.js");

