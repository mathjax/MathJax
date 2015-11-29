/*
 *  /MathJax/extensions/AssistiveMML.js
 *
 *  Copyright (c) 2009-2015 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function(a,e,b,f){var c=b.config.menuSettings;var d=MathJax.Extension.AssistiveMML={version:"2.6.0-beta",config:{disabled:false,styles:{".MJX_Assistive_MathML":{position:"absolute!important",clip:(b.Browser.isMSIE&&(document.documentMode||0)<8?"rect(1px 1px 1px 1px)":"rect(1px, 1px, 1px, 1px)"),padding:"1px 0 0 0!important",border:"0!important",height:"1px!important",width:"1px!important",overflow:"hidden!important",display:"block!important"}}},Config:function(){if(!this.config.disabled&&c.assistiveMML==null){b.Config({menuSettings:{assistiveMML:true}})}a.Styles(this.config.styles);b.Register.MessageHook("End Math",function(g){d.EndMathHook(g[1])})},EndMathHook:function(g){if(!c.assistiveMML){return}var h={jax:b.getAllJax(g),i:0,callback:MathJax.Callback({})};this.HandleMML(h);return h.callback},HandleMML:function(l){var g=l.jax.length,h,i,n,j;while(l.i<g){h=l.jax[l.i];n=document.getElementById(h.inputID+"-Frame");if(h.outputJax!=="NativeMML"&&n&&!n.getAttribute("data-mathml")){try{i=h.root.toMathML("").replace(/\n */g,"").replace(/<!--.*?-->/g,"")}catch(k){if(!k.restart){throw k}return MathJax.Callback.After(["HandleMML",this,l],k.restart)}n.setAttribute("data-mathml",i);j=f.addElement(n,"span",{isMathJax:true,className:"MJX_Assistive_MathML"});j.innerHTML=i;n.firstChild.setAttribute("aria-hidden","true");j.setAttribute("aria-readonly","true")}l.i++}l.callback()}};b.Startup.signal.Post("AssistiveMML Ready")})(MathJax.Ajax,MathJax.Callback,MathJax.Hub,MathJax.HTML);MathJax.Callback.Queue(["Require",MathJax.Ajax,"[MathJax]/extensions/toMathML.js"],["loadComplete",MathJax.Ajax,"[MathJax]/extensions/AssistiveMML.js"],function(){MathJax.Hub.Register.StartupHook("End Config",["Config",MathJax.Extension.AssistiveMML])});
