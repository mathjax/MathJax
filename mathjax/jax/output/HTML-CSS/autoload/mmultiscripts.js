/*
 *  ../SourceForge/trunk/mathjax/jax/output/HTML-CSS/autoload/mmultiscripts.js
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
  ['(','function(','a,b){a.','mmultiscripts','.Augment({toHTML:',1,'G,E,z){G=this.HTMLcreateSpan(G);var L=this.','HTMLgetScale();var ','j=b.createStack(G),e;var i=b.createBox(j);this.HTMLmeasureChild(this.base,i);if(','this.data[this.base',']){if(z!=null){b.Remeasured(',9,'].','HTMLstretchV','(i,E,z),i)}else{if(E!=null){b.Remeasured(',9,'].','HTMLstretchH','(i,E),i)}}}var J=b.TeX.x_height*L,y=b.TeX.scriptspace*L*0.75;var x=this.','HTMLgetScripts','(j,y);var k=x[0],c=x[1],n=x[2],g=x[3];var f=(','this.data[','1]||this).',7,'B=b.TeX.sup_drop*f,A=b.TeX.sub_drop*f;var o=i.bbox.h-B,m=i.bbox.d+A,K=0,C;if(i.bbox.ic){K=i.bbox.ic}if(',9,']&&(',9,'].type==="','mi"||',9,28,'mo")){if(',9,'].data.join("").length===1&&i.bbox.scale===1&&!',9,'].Get("largeop")){o=m=0}}var F','=this.getValues("','subscriptshift","','superscriptshift','");','F.subscriptshift','=(',41,'===""?0:b.length2em(',41,'));F.',39,'=(F.',39,'===""?0:b.length2em(F.',39,'));var l=0;if(n){l=','n.bbox.w','+K}else{if(g){l=g.bbox.w-K}}if(l<0){l=0}b.placeBox(i,l,0);if(!c&&!g){m','=Math.max(','m,b.TeX.','sub1*L,',41,');if(k){m',55,'m,k.bbox.h-(4/5)*J)}if(n){m',55,'m,n.bbox.h-(4/5)*J',')}if(k){b.placeBox(k,l+i.bbox.w+y-K,-m)}if(n){b.placeBox(n,','0,-m)}}else{if(!k&&!n){e',37,'displaystyle','","texprimestyle");C=b.TeX[(e.',67,'?"sup1":(e.texprimestyle?"sup3":"sup2"))];o',55,'o,C*L,F.',39,');if(c){o',55,'o,c.bbox.d+(1/4)*J)}if(g){o',55,'o,g.bbox.d+(1/4)*J)}','if(c){b.placeBox(c,l+i.bbox.w+y,o)}if(g){b.placeBox(g,','0,o)}}else{m',55,56,'sub2*L);var w=b.TeX.rule_thickness*L;var H=(k||n).bbox.h,I=(c||g).bbox.d;if(n){H',55,'H,n.bbox.h)}if(g){I',55,'I,g.bbox.d)}if((o-I)-(H-m)<3*w){m=3*w-o+I+H;B=(4/5)*J-(o-I);if(B>0){o+=B;m-=B}}o',55,'o,F.',39,');m',55,'m,',41,');',79,'l+K-g.bbox.w,o',64,'l-',53,',-m)}}}this.HTMLhandleSpace(G);this.HTMLhandleColor(G);return G},',19,':',1,'o,p){var n,c,d=[];var l=1,f=this.data.length,e=0;for(var g=0;g<4;g+=2){while(l<f&&',21,'l].type!=="','mprescripts"){for(var h=g;h<g+2;h++){if(',21,'l]&&',21,107,'none"){if(!d[h]){d[h]=b.createBox(o);d[h].bbox=this.HTMLemptyBBox({});if(e){b.createBlank(d[h],e);','d[h].bbox.','w=',114,'rw=e}}',21,'l].toHTML(d[h]);this.HTMLcombineBBoxes(',21,'l],d[h].bbox)}l++}c=d[g];n=d[g+1];if(c&&n){if(c.bbox.w<','n.bbox.w){b.createBlank(','c,',53,'-c.bbox.w);c.bbox.w=',53,';c.bbox.rw',55,'c.bbox.w,c.bbox.rw)}else{if(c.bbox.w>',122,'n,c.bbox.w-',53,');',53,'=c.bbox.w;n.bbox.rw',55,53,',n.bbox.rw)}}}if(c){e=c.bbox.w}else{if(n){e=',53,'}}}l++;e=0}for(h=0;h<4;h++){if(d[h]){',114,'w+=p;',114,'rw',55,114,'w,',114,'rw);this.HTMLcleanBBox(d[h].bbox)}}return d},',17,':a.mbase.',17,',',13,151,13,'});MathJax.Hub.Startup.signal.Post("HTML-CSS ',3,' Ready");MathJax.Ajax.loadComplete(b.autoloadDir+"/',3,'.js")})(MathJax.ElementJax.mml,MathJax.OutputJax["HTML-CSS"]);']
]);

