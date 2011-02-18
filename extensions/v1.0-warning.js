/*
 *  /MathJax/extensions/v1.0-warning.js
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

(function(c,f){var e="1.0";var a={style:{position:"fixed",bottom:"4em",left:"3em",width:"40em",border:"3px solid #880000","background-color":"#E0E0E0",padding:"1em","font-size":"small","white-space":"normal","border-radius":".75em","-webkit-border-radius":".75em","-moz-border-radius":".75em","-khtml-border-radius":".75em","box-shadow":"4px 4px 10px #AAAAAA","-webkit-box-shadow":"4px 4px 10px #AAAAAA","-moz-box-shadow":"4px 4px 10px #AAAAAA","-khtml-box-shadow":"4px 4px 10px #AAAAAA",filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=3, OffY=3, Color='gray', Positive='true')"},removeAfter:12*1000,fadeoutSteps:10,fadeoutTime:1.5*1000};if(c.Browser.isIE9&&document.documentMode>=9){delete a.style.filter}var d=function(){b.fade++;if(b.timer){delete b.timer}if(b.fade<a.fadeoutSteps){var g=1-b.fade/a.fadeoutSteps;b.div.style.opacity=g;b.div.style.filter="alpha(opacity="+Math.floor(100*g)+")";setTimeout(d,a.fadeoutTime/a.fadeoutSteps)}else{b.div.style.display="none"}};var b={div:null,fade:0};if(!f.Cookie.Get("configWarn").warned){c.Register.StartupHook("onLoad",function(){var g=document.body;if(c.Browser.isMSIE){MathJax.Message.Init();g=document.getElementById("MathJax_MSIE_frame");a.style.position="absolute"}else{delete a.style.filter}a.style.maxWidth=(document.body.clientWidth-75)+"px";b.div=f.addElement(g,"div",{id:"MathJax_ConfigWarning",style:a.style},[["div",{style:{position:"absolute",overflow:"hidden",top:".1em",right:".1em",border:"1px outset",width:"1em",height:"1em","text-align":"center",cursor:"pointer","background-color":"#EEEEEE",color:"#606060","border-radius":".5em","-webkit-border-radius":".5em","-moz-border-radius":".5em","-khtml-border-radius":".5em"},onclick:function(){if(b.div&&b.fade===0){if(b.timer){clearTimeout(b.timer)}b.div.style.display="none"}}},[["span",{style:{position:"relative",bottom:".2em"}},["x"]]]],"The method used by MathJax to load its default configuration file has changed from that used in earlier versions.  This page seems to use the older technique, and shoudl be updated.  This is explained further at",["p",{style:{"text-align":"center"}},[["a",{href:"    http://www.mathjax.org/help/configuration"},["http://www.mathjax.org/help/configuration"]]]]]);if(a.removeAfter){c.Register.StartupHook("End",function(){b.timer=setTimeout(d,a.removeAfter)})}f.Cookie.Set("configWarn",{warned:true})})}})(MathJax.Hub,MathJax.HTML);MathJax.Ajax.loadComplete("[MathJax]/extensions/v1.0-warning.js");

