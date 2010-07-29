/*
 *  ../SourceForge/trunk/mathjax/jax/output/HTML-CSS/autoload/mglyph.js
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
  ['(','function','(a,b){a.mglyph.Augment({toHTML:',1,'(h,g){var j=h,e=this.getValues("src","','width','","','height','","','valign','","alt"),i;h=this.HTMLcreateSpan(h);','if(e.','src===""){var f=this.Get("index");if(f){g=this.HTMLgetVariant();var d=g.defaultFont;if(d){d.noStyleChar=true;d.testString=','String.fromCharCode(f',')+"ABCabc";if(b.Font.testFont(d)){this.HTMLhandleVariant(h,g,',13,'))}else{',11,'alt===""){e.alt="Bad font: "+d.family}i=a.merror(e.alt',').With({mathsize:"75%"});this.Append(i);i.toHTML(h);this.data.pop();h.bbox=i.HTMLspanElement().bbox','}}}}else{','if(!this.img){this.img=a.mglyph.GLYPH[e.src',']}',21,']={img:new Image(),status:"pending"};var c=','this.img.img',';c.onload','=MathJax.Callback(["','HTMLimgLoaded','",this]);c.','onerror',27,'HTMLimgError',29,'src=e.src;MathJax.Hub.RestartAfter(c.onload)}if(','this.img.status','!=="OK"){i=a.merror("Bad mglyph: "+e.src',19,'}else{c=b.addElement(h,"img",{src:e.src,alt:e.alt,title:e.alt});',11,5,'){if(String(e.',5,').match(/^\\s*-?\\d+\\s*$/)){e.',5,'+="px"}c.style.',5,'=b.Em(','b.length2em(e.',5,',',25,'.',5,'/b.em))}',11,7,41,7,43,7,45,7,47,48,7,',',25,'.',7,54,'h.bbox.w=h.bbox.rw=c.offsetWidth/b.em;h.bbox.h=c.offsetHeight/b.em;',11,9,41,9,43,9,'+="px"}h.bbox.d=-',48,9,',',25,'.',7,'/b.em);c.style.verticalAlign=b.Em(-h.bbox.d);h.bbox.h-=h.bbox.d}}}if(!j.bbox){j.bbox={w:h.bbox.w,h:h.bbox.h,d:h.bbox.d,rw:h.bbox.rw,lw:h.bbox.lw}}else{if(h.bbox){j.bbox.w+=h.bbox.w;if(j.bbox.w>j.bbox.rw){j.bbox.rw=j.bbox.w}if(h.bbox.h>j.bbox.h){j.bbox.h=h.bbox.h}if(h.bbox.d>j.bbox.d){j.bbox.d=h.bbox.d}}}this.HTMLhandleSpace(h);this.HTMLhandleColor(h);return h},',28,':',1,'(d,c){if(typeof(d)==="string"){c=d}',35,'=(c||"OK")},',32,':',1,'(){',25,'.onload("error")}},{GLYPH:{}});MathJax.Hub.Startup.signal.Post("HTML-CSS mglyph Ready");MathJax.Ajax.loadComplete(b.autoloadDir+"/mglyph.js")})(MathJax.ElementJax.mml,MathJax.OutputJax["HTML-CSS"]);']
]);

