/*
 *  /MathJax/jax/output/HTML-CSS/autoload/multiline.js
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

MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function(){var c="1.1";var a=MathJax.ElementJax.mml,b=MathJax.OutputJax["HTML-CSS"];a.mbase.Augment({toHTMLmultiline:function(u,r){u=this.HTMLcreateSpan(u);if(!this.type!=="mrow"){u=this.HTMLhandleSize(u)}var g=b.createStack(u);var o=[],f=[],p=-b.BIGDIMEN,q=-b.BIGDIMEN,v,t,s,k;for(t=0,k=r.length-1;t<k;t++){o[t]=b.createBox(g);for(v=r[t][0],s=r[t+1][0];v<s;v++){if(this.data[v]){this.data[v].toHTML(o[t])}}if(this.data[r[t][0]]){this.data[r[t][0]].HTMLspanElement().style.paddingLeft=""}if(this.data[r[t][s-1]]){this.data[r[t][s-1]].HTMLspanElement().style.paddingRight=""}f[t]=this.HTMLcomputeBBox(o[t],null,r[t][0],r[t+1][0]);if(o[t].bbox.h>p){p=o[t].bbox.h}if(o[t].bbox.d>q){q=o[t].bbox.d}}var n=0,x=this.HTMLgetScale(),e=b.FONTDATA.baselineskip*x;var l=this,h;while(l.inferred||(l.parent&&l.parent.type==="mrow"&&l.parent.data.length===1)){l=l.parent}var w=(l.type==="math"||l.type==="mtd");l.isMultiline=true;for(t=0,k=r.length-1;t<k;t++){for(v=0,s=f[t].length;v<s;v++){f[t][v].HTMLstretchV(o[t],p,q)}if(f[t].length){this.HTMLcomputeBBox(o[t],true,r[t][0],r[t+1][0])}var d=r[t][1].getValues("indentalign","indentshift");d.lineleading=b.length2em(r[t+1][1].Get("lineleading"),0.5);if(t===0){h=r[t+1][1].getValues("indentalignfirst","indentshiftfirst");d.ALIGN=h.indentalignfirst;d.SHIFT=h.indentshiftfirst}else{if(t===k-1){h=r[t][1].getValues("indentalignlast","indentshiftlast");d.ALIGN=h.indentalignlast;d.SHIFT=h.indentshiftlast}}if(d.ALIGN&&d.ALIGN!==a.INDENTALIGN.INDENTALIGN){d.indentalign=d.ALIGN}if(d.SHIFT&&d.SHIFT!==a.INDENTSHIFT.INDENTSHIFT){d.indentshift=d.SHIFT}if(d.indentalign==a.INDENTALIGN.AUTO){d.indentalign=(w?this.displayAlign:a.INDENTALIGN.LEFT)}if(d.indentshift==="auto"||d.indentshift===""){d.indentshift=(w?this.displayIndent:"0")}d.indentshift=b.length2em(d.indentshift,0);if(d.indentshift&&d.indentalign!==a.INDENTALIGN.CENTER){b.createBlank(o[t],d.indentshift,(d.indentalign!==a.INDENTALIGN.RIGHT));o[t].bbox.w+=d.indentshift;o[t].bbox.rw+=d.indentshift}b.alignBox(o[t],d.indentalign,n);if(t<k-1){n-=Math.max(e,o[t].bbox.d+o[t+1].bbox.h+d.lineleading)}}if(w){g.style.width="100%";if(l.type==="math"){u.bbox.width="100%"}}this.HTMLhandleSpace(u);this.HTMLhandleColor(u);u.bbox.isMultiline=true;return u}});MathJax.Hub.Startup.signal.Post("HTML-CSS multiline Ready");MathJax.Ajax.loadComplete(b.autoloadDir+"/multiline.js")});

