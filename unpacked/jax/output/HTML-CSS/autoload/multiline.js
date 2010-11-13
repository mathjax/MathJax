/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/autoload/multiline.js
 *  
 *  Implements the HTML-CSS output <mrow>'s that contain line breaks.
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2010 Design Science, Inc.
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

(function (MML,HTMLCSS) {
  var VERSION = "1.0";
  
  MML.mbase.Augment({
    toHTMLmultiline: function (span,split) {
      span = this.HTMLcreateSpan(span); if (!this.type !== "mrow") {span = this.HTMLhandleSize(span)}
      var stack = HTMLCSS.createStack(span);
      var box = [], stretchy = [], H = -HTMLCSS.BIGDIMEN, D = -HTMLCSS.BIGDIMEN, i, j, m, M;
      for (j = 0, M = split.length-1; j < M; j++) {
        box[j] = HTMLCSS.createBox(stack);
        for (i = split[j][0], m = split[j+1][0]; i < m; i++)
          {if (this.data[i]) {this.data[i].toHTML(box[j])}}
        // remove inter-object spacing
        if (this.data[split[j][0]]) {this.data[split[j][0]].HTMLspanElement().style.paddingLeft = ""}
        if (this.data[split[j][m-1]]) {this.data[split[j][m-1]].HTMLspanElement().style.paddingRight = ""}
        //
        stretchy[j] = this.HTMLcomputeBBox(box[j],null,split[j][0],split[j+1][0]);
        if (box[j].bbox.h > H) {H = box[j].bbox.h}
        if (box[j].bbox.d > D) {D = box[j].bbox.d}
      }
      var y = 0, scale = this.HTMLgetScale(), LHD = HTMLCSS.FONTDATA.baselineskip * scale;
      var parent = this, first;
      while (parent.inferred || (parent.parent && parent.parent.type === "mrow" &&
             parent.parent.data.length === 1)) {parent = parent.parent}
      var isTop = (parent.type === "math" || parent.type === "mtd"); parent.isMultiline = true;
      for (j = 0, M = split.length-1; j < M; j++) {
        for (i = 0, m = stretchy[j].length; i < m; i++) {stretchy[j][i].HTMLstretchV(box[j],H,D)}
        if (stretchy[j].length) {this.HTMLcomputeBBox(box[j],true,split[j][0],split[j+1][0])}
        var values = split[j][1].getValues("indentalign","indentshift");
        values.lineleading = HTMLCSS.length2em(split[j+1][1].Get("lineleading"),.5);
        // handle first/last special cases
        if (j === 0) {
          first = split[j+1][1].getValues("indentalignfirst","indentshiftfirst");
          values.ALIGN = first.indentalignfirst; values.SHIFT = first.indentshiftfirst;
        } else if (j === M-1) {
          first = split[j][1].getValues("indentalignlast","indentshiftlast");
          values.ALIGN = first.indentalignlast; values.SHIFT = first.indentshiftlast;
        }
        if (values.ALIGN && values.ALIGN !== MML.INDENTALIGN.INDENTALIGN)
          {values.indentalign = values.ALIGN}
        if (values.SHIFT && values.SHIFT !== MML.INDENTSHIFT.INDENTSHIFT)
          {values.indentshift = values.SHIFT}
        //
        if (values.indentalign == MML.INDENTALIGN.AUTO) 
          {values.indentalign = (isTop ? this.displayAlign : MML.INDENTALIGN.LEFT)}
        if (values.indentshift === "auto" || values.indentshift === "")
          {values.indentshift = (isTop ? this.displayIndent : "0")}
        values.indentshift = HTMLCSS.length2em(values.indentshift,0);
        if (values.indentshift && values.indentalign !== MML.INDENTALIGN.CENTER) {
          HTMLCSS.createBlank(box[j],values.indentshift,(values.indentalign !== MML.INDENTALIGN.RIGHT));
          box[j].bbox.w += values.indentshift; box[j].bbox.rw += values.indentshift;
        }
        HTMLCSS.alignBox(box[j],values.indentalign,y);
        if (j < M-1) {y -= Math.max(LHD,box[j].bbox.d + box[j+1].bbox.h + values.lineleading)}
      }
      if (isTop) {
        stack.style.width = "100%";
        if (parent.type === "math") {span.bbox.width = "100%"}
      }
      this.HTMLhandleSpace(span);
      this.HTMLhandleColor(span);
      span.bbox.isMultiline = true;
      return span;
    }
  });
  
  MathJax.Hub.Startup.signal.Post("HTML-CSS multiline Ready");
  MathJax.Ajax.loadComplete(HTMLCSS.autoloadDir+"/multiline.js");
  
})(MathJax.ElementJax.mml,MathJax.OutputJax["HTML-CSS"]);

