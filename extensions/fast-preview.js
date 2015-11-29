/*
 *  /MathJax/extensions/fast-preview.js
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

(function(b,f,e){var c=b.config.menuSettings;var a=e.isMSIE&&(document.documentMode||0)<8;var d=MathJax.Extension["fast-preview"]={version:"2.6.0-beta",config:b.CombineConfig("fast-preview",{Chunks:{EqnChunk:10000,EqnChunkFactor:1,EqnChunkDelay:0},color:"inherit!important",updateTime:30,updateDelay:6,messageStyle:"none",disabled:e.isMSIE&&!e.versionAtLeast("8.0")}),Config:function(){if(b.config["CHTML-preview"]){MathJax.Hub.Config({"fast-preview":b.config["CHTML-preview"]})}var l,i,j,g,k;var h=this.config;if(!h.disabled&&c.FastPreview==null){b.Config({menuSettings:{FastPreview:true}})}if(c.FastPreview){MathJax.Ajax.Styles({".MathJax_Preview .MJXf-math":{color:h.color}});b.Config({"HTML-CSS":h.Chunks,CommonHTML:h.Chunks,SVG:h.Chunks})}b.Register.MessageHook("Begin Math Output",function(){if(!g&&c.FastPreview&&c.renderer!=="PreviewHTML"){l=b.processUpdateTime;i=b.processUpdateDelay;j=b.config.messageStyle;b.processUpdateTime=h.updateTime;b.processUpdateDelay=h.updateDelay;b.Config({messageStyle:h.messageStyle});MathJax.Message.Clear(0,0);k=true}});b.Register.MessageHook("End Math Output",function(){if(!g&&k){b.processUpdateTime=l;b.processUpdateDelay=i;b.Config({messageStyle:j});g=true}})},Preview:function(g){if(!c.FastPreview||c.renderer==="PreviewHTML"){return}var h=g.script.MathJax.preview||g.script.previousSibling;if(!h||h.className!==MathJax.Hub.config.preRemoveClass){h=f.Element("span",{className:MathJax.Hub.config.preRemoveClass});g.script.parentNode.insertBefore(h,g.script);g.script.MathJax.preview=h}h.innerHTML="";h.style.color=(a?"black":"inherit");return this.postFilter(h,g)},postFilter:function(i,h){if(!h.math.root.toPreviewHTML){var g=MathJax.Callback.Queue();g.Push(["Require",MathJax.Ajax,"[MathJax]/jax/output/PreviewHTML/config.js"],["Require",MathJax.Ajax,"[MathJax]/jax/output/PreviewHTML/jax.js"]);b.RestartAfter(g.Push({}))}h.math.root.toPreviewHTML(i)},Register:function(g){b.Register.StartupHook(g+" Jax Require",function(){var h=MathJax.InputJax[g];h.postfilterHooks.Add(["Preview",MathJax.Extension["fast-preview"]],50)})}};d.Register("TeX");d.Register("MathML");d.Register("AsciiMath");b.Register.StartupHook("End Config",["Config",d]);b.Startup.signal.Post("fast-preview Ready")})(MathJax.Hub,MathJax.HTML,MathJax.Hub.Browser);MathJax.Ajax.loadComplete("[MathJax]/extensions/fast-preview.js");
