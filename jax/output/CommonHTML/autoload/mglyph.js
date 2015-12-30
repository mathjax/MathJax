/*
 *  /MathJax/jax/output/CommonHTML/autoload/mglyph.js
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

MathJax.Hub.Register.StartupHook("CommonHTML Jax Ready",function(){var c="2.6.0";var a=MathJax.ElementJax.mml,b=MathJax.OutputJax.CommonHTML,d=MathJax.Localization;a.mglyph.Augment({toCommonHTML:function(e,n){var l=this.getValues("src","width","height","valign","alt");e=this.CHTMLcreateNode(e);this.CHTMLhandleStyle(e);this.CHTMLhandleScale(e);if(l.src===""){var j=this.Get("index");this.CHTMLgetVariant();if(j&&this.CHTMLvariant.style){this.CHTMLhandleText(e,String.fromCharCode(j),this.CHTMLvariant)}}else{var m=this.CHTML;if(!m.img){m.img=a.mglyph.GLYPH[l.src]}if(!m.img){m.img=a.mglyph.GLYPH[l.src]={img:new Image(),status:"pending"};m.img.img.onload=MathJax.Callback(["CHTMLimgLoaded",this]);m.img.img.onerror=MathJax.Callback(["CHTMLimgError",this]);m.img.img.src=l.src;MathJax.Hub.RestartAfter(m.img.img.onload)}if(m.img.status!=="OK"){var f=a.Error(d._(["MathML","BadMglyph"],"Bad mglyph: %1",l.src));f.data[0].data[0].mathsize="75%";this.Append(f);f.toCommonHTML(e);this.data.pop();m.combine(f.CHTML,0,0,1)}else{var g=b.addElement(e,"img",{isMathJax:true,src:l.src,alt:l.alt,title:l.alt});var k=m.img.img.width/b.em,i=m.img.img.height/b.em;if(l.width!==""){g.style.width=b.Em(this.CHTMLlength2em(l.width,k))}if(l.height!==""){g.style.height=b.Em(this.CHTMLlength2em(l.height,i))}m.w=m.r=g.offsetWidth/b.em;m.h=m.t=g.offsetHeight/b.em;if(l.valign){m.d=m.b=-this.CHTMLlength2em(l.valign,i);g.style.verticalAlign=b.Em(-m.d);m.h-=m.d;m.t=m.h}}}this.CHTMLhandleSpace(e);this.CHTMLhandleBBox(e);this.CHTMLhandleColor(e);return e},CHTMLimgLoaded:function(f,e){if(typeof(f)==="string"){e=f}this.CHTML.img.status=(e||"OK")},CHTMLimgError:function(){this.CHTML.img.img.onload("error")}},{GLYPH:{}});MathJax.Hub.Startup.signal.Post("CommonHTML mglyph Ready");MathJax.Ajax.loadComplete(b.autoloadDir+"/mglyph.js")});
