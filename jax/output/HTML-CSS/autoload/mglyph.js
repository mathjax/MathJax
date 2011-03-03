/*
 *  /MathJax/jax/output/HTML-CSS/autoload/mglyph.js
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

MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function(){var c="1.1";var a=MathJax.ElementJax.mml,b=MathJax.OutputJax["HTML-CSS"];a.mglyph.Augment({toHTML:function(i,h){var k=i,f=this.getValues("src","width","height","valign","alt"),j;i=this.HTMLcreateSpan(i);if(f.src===""){var g=this.Get("index");if(g){h=this.HTMLgetVariant();var e=h.defaultFont;if(e){e.noStyleChar=true;e.testString=String.fromCharCode(g)+"ABCabc";if(b.Font.testFont(e)){this.HTMLhandleVariant(i,h,String.fromCharCode(g))}else{if(f.alt===""){f.alt="Bad font: "+e.family}j=a.merror(f.alt).With({mathsize:"75%"});this.Append(j);j.toHTML(i);this.data.pop();i.bbox=j.HTMLspanElement().bbox}}}}else{if(!this.img){this.img=a.mglyph.GLYPH[f.src]}if(!this.img){this.img=a.mglyph.GLYPH[f.src]={img:new Image(),status:"pending"};var d=this.img.img;d.onload=MathJax.Callback(["HTMLimgLoaded",this]);d.onerror=MathJax.Callback(["HTMLimgError",this]);d.src=f.src;MathJax.Hub.RestartAfter(d.onload)}if(this.img.status!=="OK"){j=a.merror("Bad mglyph: "+f.src).With({mathsize:"75%"});this.Append(j);j.toHTML(i);this.data.pop();i.bbox=j.HTMLspanElement().bbox}else{d=b.addElement(i,"img",{src:f.src,alt:f.alt,title:f.alt});if(f.width){if(String(f.width).match(/^\s*-?\d+\s*$/)){f.width+="px"}d.style.width=b.Em(b.length2em(f.width,this.img.img.width/b.em))}if(f.height){if(String(f.height).match(/^\s*-?\d+\s*$/)){f.height+="px"}d.style.height=b.Em(b.length2em(f.height,this.img.img.height/b.em))}i.bbox.w=i.bbox.rw=d.offsetWidth/b.em;i.bbox.h=d.offsetHeight/b.em;if(f.valign){if(String(f.valign).match(/^\s*-?\d+\s*$/)){f.valign+="px"}i.bbox.d=-b.length2em(f.valign,this.img.img.height/b.em);d.style.verticalAlign=b.Em(-i.bbox.d);i.bbox.h-=i.bbox.d}}}if(!k.bbox){k.bbox={w:i.bbox.w,h:i.bbox.h,d:i.bbox.d,rw:i.bbox.rw,lw:i.bbox.lw}}else{if(i.bbox){k.bbox.w+=i.bbox.w;if(k.bbox.w>k.bbox.rw){k.bbox.rw=k.bbox.w}if(i.bbox.h>k.bbox.h){k.bbox.h=i.bbox.h}if(i.bbox.d>k.bbox.d){k.bbox.d=i.bbox.d}}}this.HTMLhandleSpace(i);this.HTMLhandleColor(i);return i},HTMLimgLoaded:function(e,d){if(typeof(e)==="string"){d=e}this.img.status=(d||"OK")},HTMLimgError:function(){this.img.img.onload("error")}},{GLYPH:{}});MathJax.Hub.Startup.signal.Post("HTML-CSS mglyph Ready");MathJax.Ajax.loadComplete(b.autoloadDir+"/mglyph.js")});

