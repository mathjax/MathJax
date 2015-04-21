/*
 *  /MathJax/extensions/CHTML-preview.js
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

(function(a,e,d){var b=a.config.menuSettings;var c=MathJax.Extension["CHTML-preview"]={version:"2.5.2",config:a.CombineConfig("CHTML-preview",{Chunks:{EqnChunk:10000,EqnChunkFactor:1,EqnChunkDelay:0},color:"inherit!important",updateTime:30,updateDelay:6,messageStyle:"none",disabled:d.isMSIE&&!d.versionAtLeast("8.0")}),Config:function(){a.Config({"HTML-CSS":this.config.Chunks,SVG:this.config.Chunks});MathJax.Ajax.Styles({".MathJax_Preview .MJXc-math":{color:this.config.color}});var k,h,i,f,j;var g=this.config;if(!g.disabled&&b.CHTMLpreview==null){a.Config({menuSettings:{CHTMLpreview:true}})}a.Register.MessageHook("Begin Math Output",function(){if(!f&&b.CHTMLpreview&&b.renderer!=="CommonHTML"){k=a.processUpdateTime;h=a.processUpdateDelay;i=a.config.messageStyle;a.processUpdateTime=g.updateTime;a.processUpdateDelay=g.updateDelay;a.Config({messageStyle:g.messageStyle});MathJax.Message.Clear(0,0);j=true}});a.Register.MessageHook("End Math Output",function(){if(!f&&j){a.processUpdateTime=k;a.processUpdateDelay=h;a.Config({messageStyle:i});f=true}})},Preview:function(f){if(!b.CHTMLpreview||b.renderer==="CommonHTML"){return}var g=f.script.MathJax.preview||f.script.previousSibling;if(!g||g.className!==MathJax.Hub.config.preRemoveClass){g=e.Element("span",{className:MathJax.Hub.config.preRemoveClass});f.script.parentNode.insertBefore(g,f.script);f.script.MathJax.preview=g}g.innerHTML="";g.style.color="inherit";return this.postFilter(g,f)},postFilter:function(h,g){if(!g.math.root.toCommonHTML){var f=MathJax.Callback.Queue();f.Push(["Require",MathJax.Ajax,"[MathJax]/jax/output/CommonHTML/config.js"],["Require",MathJax.Ajax,"[MathJax]/jax/output/CommonHTML/jax.js"]);a.RestartAfter(f.Push({}))}g.math.root.toCommonHTML(h)},Register:function(f){a.Register.StartupHook(f+" Jax Require",function(){var g=MathJax.InputJax[f];g.postfilterHooks.Add(["Preview",MathJax.Extension["CHTML-preview"]],50)})}};c.Register("TeX");c.Register("MathML");c.Register("AsciiMath");a.Register.StartupHook("End Config",["Config",c]);a.Startup.signal.Post("CHTML-preview Ready")})(MathJax.Hub,MathJax.HTML,MathJax.Hub.Browser);MathJax.Ajax.loadComplete("[MathJax]/extensions/CHTML-preview.js");
