/*
 *  ../SourceForge/trunk/mathjax/jax/output/HTML-CSS/autoload/multiline.js
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
  ['(function(a,b){a.mbase.Augment({toHTMLmultiline:function(t,q){t=this.HTMLcreateSpan(t);if(!this.type!=="mrow"){t=this.HTMLhandleSize(t)}var f=b.createStack(t);var n=[],e=[],o','=-b.BIGDIMEN,','p',1,'u,s,r,h',';for(s=0,h=q.length-1;s<h;s++){','n[s]=b.createBox(f);for(u=q[s][0],r=q[s+1][0];u<r;u++){if(this.data[u]){this.data[u].toHTML(n[s])}}if(','this.data[q[s][','0]]){',7,'0',']].HTMLspanElement().style.','paddingLeft=""}if(',7,'r-1]]){',7,'r-1',11,'paddingRight=""}e[s]=','this.HTMLcomputeBBox(n[s],','null',',q[s][0],q[s+1][0',']);if(','n[s].bbox.','h>o){o=',23,'h}if(',23,'d>p){p=',23,'d}}var l=0,w=this.HTMLgetScale(),d=b.FONTDATA.baselineskip*w;var k=this,g;while(k.inferred||(k.parent&&k.parent.type==="mrow"&&k.parent.data.length===1)){k=k.parent}var v=(','k.type==="math','"||k.type==="mtd");k.isMultiline=true',5,'for(u=0,r=e[s].length;u<r;u++){e[s][u].HTMLstretchV(n[s],o,p)}if(e[s].length){',19,'true',21,'])}var c=q[s','][1].getValues("','indentalign","indentshift");c.','lineleading','=b.length2em(','q[s+1][1].Get("',41,'"),0.5);if(s===0){g=q[s+1',39,'indentalignfirst','","','indentshiftfirst','");c.ALIGN=g.',47,';c.SHIFT=g.',49,'}else{if(s===h-1){g=q[s',39,'indentalignlast','","','indentshiftlast',50,56,52,58,'}}if(c.ALIGN&&c.ALIGN!==','a.INDENTALIGN.','INDENTALIGN){','c.indentalign','=c.ALIGN}if(c.SHIFT&&c.SHIFT!==a.INDENTSHIFT.INDENTSHIFT){','c.indentshift','=c.SHIFT}if(',66,'==',64,'AUTO){',66,'=(v?this.','displayAlign:',64,'LEFT)}if(',68,'==="auto"||',68,'===""){',68,75,'displayIndent:"0")}',68,42,68,',0);if(',68,'&&',66,'!==',64,'CENTER){b.createBlank(n[s],',68,',(',66,'!==',64,'RIGHT));',23,'w+=',68,';',23,'rw+=',68,'}b.alignBox(n[s],',66,',l);if(s<h-1){l-=Math.max(d,',23,'d+n[s+1].bbox.h+c.',41,')}}if(v){f.style.width="100%";if(',31,'"){t.bbox.width="100%"}}this.HTMLhandleSpace(t);this.HTMLhandleColor(t);t.bbox.isMultiline=true;return t}});MathJax.Hub.Startup.signal.Post("HTML-CSS multiline Ready");MathJax.Ajax.loadComplete(b.autoloadDir+"/multiline.js")})(MathJax.ElementJax.mml,MathJax.OutputJax["HTML-CSS"]);']
]);

