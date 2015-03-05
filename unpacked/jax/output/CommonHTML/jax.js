/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/jax/output/HTML2/jax.js
 *
 *  Implements the HTML2 OutputJax that displays mathematics
 *  using HTML to position the characters from math fonts
 *  in their proper locations.
 *  
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2013-2015 The MathJax Consortium
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


(function (AJAX,HUB,HTML,CHTML) {
  var MML;

  var EVENT, TOUCH, HOVER; // filled in later

  var SCRIPTFACTOR = Math.sqrt(1/2),
      AXISHEIGHT = .25,
      HFUZZ = .05, DFUZZ = 0;  // adjustments to bounding box of character boxes

  var STYLES = {
    ".MathJax_CHTML_Display": {
      "display":    "block",
      "text-align": "center",
      "margin":     "1em 0"
    },

    "mjx-math":   {
      "display":        "inline-block",
      "line-height":    0,
      "text-indent":    0,
      "white-space":    "nowrap",
      "border-collapse":"collapse"
    },
    "mjx-math *": {display:"inline-block", "text-align":"left"},

    "mjx-mfrac":  {"vertical-align":".25em"},
    "mjx-fbox":   {width:"100%"},
    "mjx-ftable": {display:"table", width:"100%"},
    "mjx-numerator":   {display:"table-cell", "text-align":"center"},
    "mjx-denominator": {display:"table-cell", "text-align":"center"},
    ".MJXc-fpad": {"padding-left":".1em", "padding-right":".1em"},
    
    "mjx-stack":  {display:"inline-block"},
    "mjx-op":     {display:"block"},
    "mjx-under":  {display:"table-cell"},
    "mjx-over":   {display:"block"},
    
    "mjx-stack > mjx-sup": {display:"block"},
    "mjx-stack > mjx-sub": {display:"block"},
    
    "mjx-mphantom": {"visibility":"hidden"},

    "mjx-merror": {
      "background-color":"#FFFF88",
      color:             "#CC0000",
      border:            "1px solid #CC0000",
      padding:           "2px 3px",
      "font-style":      "normal",
      "font-size":       "90%"
    },

    "mjx-box":    {display:"inline-block"},
    "mjx-block":  {display:"block"},
    "mjx-char":   {display:"block"},
    "mjx-itable": {display:"inline-table"},
    "mjx-row":    {display:"table-row"},
    "mjx-cell":   {display:"table-cell"},
    "mjx-table":  {display:"table", width:"100%"},
    "mjx-line":   {display:"block", width:"100%", "border-top":"0 solid"},

    ".MJXc-script": {"font-size":SCRIPTFACTOR+"em"},

/*********************************/
    
    ".MJXc-surd": {"vertical-align":"top"},
    ".MJXc-surd > span": {"display":"block!important"},

    ".MJXc-mtable": {"vertical-align":AXISHEIGHT+"em", "margin":"0 .125em"},
    ".MJXc-mtable > span": {"display":"inline-table!important", "vertical-align":"middle"},
    ".MJXc-mtr": {"display":"table-row!important"},
    ".MJXc-mtd": {"display":"table-cell!important", "text-align":"center", "padding":".5em 0 0 .5em"},
    ".MJXc-mtr > .MJXc-mtd:first-child": {"padding-left":0},
    ".MJXc-mtr:first-child > .MJXc-mtd": {"padding-top":0},
    ".MJXc-mlabeledtr": {"display":"table-row!important"},
    ".MJXc-mlabeledtr > .MJXc-mtd:first-child": {"padding-left":0},
    ".MJXc-mlabeledtr:first-child > .MJXc-mtd": {"padding-top":0}    
  };
  
  (function () {
    for (var i = 0; i < 10; i++) {
      var scale = "scaleX(."+i+")";
      STYLES[".MJXc-scale"+i] = {
        "-webkit-transform":scale,
        "-moz-transform":scale,
        "-ms-transform":scale,
        "-o-transform":scale,
        "transform":scale
      }
    }
  })();
  
  var BIGDIMEN = 1000000;
  var V = "V", H = "H";

  CHTML.Augment({
    settings: HUB.config.menuSettings,
    config: {styles: STYLES},

    Config: function () {
      if (!this.require) {this.require = []}
      this.SUPER(arguments).Config.call(this); var settings = this.settings;
      if (settings.scale) {this.config.scale = settings.scale}
      this.require.push(this.fontDir+"/TeX/fontdata.js");
      this.require.push(MathJax.OutputJax.extensionDir+"/MathEvents.js");
    },

    Startup: function () {
      //
      //  Set up event handling
      //
      EVENT = MathJax.Extension.MathEvents.Event;
      TOUCH = MathJax.Extension.MathEvents.Touch;
      HOVER = MathJax.Extension.MathEvents.Hover;
      this.ContextMenu = EVENT.ContextMenu;
      this.Mousedown   = EVENT.AltContextMenu;
      this.Mouseover   = HOVER.Mouseover;
      this.Mouseout    = HOVER.Mouseout;
      this.Mousemove   = HOVER.Mousemove;

      //
      //  Determine pixels per inch
      //
      var div = HTML.addElement(document.body,"div",{style:{width:"5in"}});
      this.pxPerInch = div.offsetWidth/5; div.parentNode.removeChild(div);

      //
      //  Set up styles and preload web fonts
      //
      return AJAX.Styles(this.config.styles,["InitializeCHTML",this]);
    },
    InitializeCHTML: function () {
    },
    
    preTranslate: function (state) {
      var scripts = state.jax[this.id], i, m = scripts.length,
          script, prev, span, div, jax;
      //
      //  Loop through the scripts
      //
      for (i = 0; i < m; i++) {
        script = scripts[i]; if (!script.parentNode) continue;
        //
        //  Remove any existing output
        //
        prev = script.previousSibling;
        if (prev && String(prev.className).match(/^MathJax_CHTML(_Display)?( MathJax_Processing)?$/))
          {prev.parentNode.removeChild(prev)}
        //
        //  Add the span, and a div if in display mode,
        //  then set the role and mark it as being processed
        //
        jax = script.MathJax.elementJax; if (!jax) continue;
        jax.CHTML = {display: (jax.root.Get("display") === "block")}
        span = div = HTML.Element("span",{
	  className:"MathJax_CHTML", id:jax.inputID+"-Frame", isMathJax:true, jaxID:this.id,
          oncontextmenu:EVENT.Menu, onmousedown: EVENT.Mousedown,
          onmouseover:EVENT.Mouseover, onmouseout:EVENT.Mouseout, onmousemove:EVENT.Mousemove,
	  onclick:EVENT.Click, ondblclick:EVENT.DblClick
        });
	if (HUB.Browser.noContextMenu) {
	  span.ontouchstart = TOUCH.start;
	  span.ontouchend = TOUCH.end;
	}
        if (jax.CHTML.display) {
          div = HTML.Element("div",{className:"MathJax_CHTML_Display"});
          div.appendChild(span);
        }
        //
        div.className += " MathJax_Processing";
        script.parentNode.insertBefore(div,script);
      }
      /* 
       * state.CHTMLeqn = state.CHTMLlast = 0; state.CHTMLi = -1;
       * state.CHTMLchunk = this.config.EqnChunk;
       * state.CHTMLdelay = false;
       */
    },

    Translate: function (script,state) {
      if (!script.parentNode) return;

      /* 
       * //
       * //  If we are supposed to do a chunk delay, do it
       * //  
       * if (state.CHTMLdelay) {
       *   state.CHTMLdelay = false;
       *   HUB.RestartAfter(MathJax.Callback.Delay(this.config.EqnChunkDelay));
       * }
       */

      //
      //  Get the data about the math
      //
      var jax = script.MathJax.elementJax, math = jax.root,
          span = document.getElementById(jax.inputID+"-Frame"),
          div = (jax.CHTML.display ? span.parentNode : span);
      //
      //  Typeset the math
      //
      this.initCHTML(math,span);
      math.setTeXclass();
      try {math.toCommonHTML(span)} catch (err) {
        while (span.firstChild) span.removeChild(span.firstChild);
        throw err;
      }
      //
      //  Put it in place, and remove the processing marker
      //
      div.className = div.className.split(/ /)[0];
      //
      //  Check if we are hiding the math until more is processed
      //
      if (this.hideProcessedMath) {
        //
        //  Hide the math and don't let its preview be removed
        //
        div.className += " MathJax_Processed";
        if (script.MathJax.preview) {
          jax.CHTML.preview = script.MathJax.preview;
          delete script.MathJax.preview;
        }
	/* 
	 * //
	 * //  Check if we should show this chunk of equations
	 * //
	 * state.CHTMLeqn += (state.i - state.CHTMLi); state.CHTMLi = state.i;
	 * if (state.CHTMLeqn >= state.CHTMLlast + state.CHTMLchunk) {
	 *   this.postTranslate(state);
	 *   state.CHTMLchunk = Math.floor(state.CHTMLchunk*this.config.EqnChunkFactor);
	 *   state.CHTMLdelay = true;  // delay if there are more scripts
	 * }
	 */
      }
    },

    postTranslate: function (state) {
      var scripts = state.jax[this.id];
      if (!this.hideProcessedMath) return;
      for (var i = 0, m = scripts.length; i < m; i++) {
        var script = scripts[i];
        if (script && script.MathJax.elementJax) {
          //
          //  Remove the processed marker
          //
          script.previousSibling.className = script.previousSibling.className.split(/ /)[0];
          var data = script.MathJax.elementJax.CHTML;
          //
          //  Remove the preview, if any
          //
          if (data.preview) {
            data.preview.innerHTML = "";
            script.MathJax.preview = data.preview;
            delete data.preview;
          }
        }
      }

      /* 
       * //
       * //  Reveal this chunk of math
       * //
       * for (var i = state.CHTMLlast, m = state.CHTMLeqn; i < m; i++) {
       *   var script = scripts[i];
       *   if (script && script.MathJax.elementJax) {
       *     //
       *     //  Remove the processed marker
       *     //
       *     script.previousSibling.className = script.previousSibling.className.split(/ /)[0];
       *     var data = script.MathJax.elementJax.CHTML;
       *     //
       *     //  Remove the preview, if any
       *     //
       *     if (data.preview) {
       *       data.preview.innerHTML = "";
       *       script.MathJax.preview = data.preview;
       *       delete data.preview;
       *     }
       *   }
       * }
       * //
       * //  Save our place so we know what is revealed
       * //
       * state.CHTMLlast = state.CHTMLeqn;
       */
    },

    getJaxFromMath: function (math) {
      if (math.parentNode.className === "MathJax_CHTML_Display") {math = math.parentNode}
      do {math = math.nextSibling} while (math && math.nodeName.toLowerCase() !== "script");
      return HUB.getJaxFor(math);
    },
    getHoverSpan: function (jax,math) {return jax.root.CHTMLnodeElement()},
    getHoverBBox: function (jax,span,math) {
//      var bbox = span.CHTML, em = jax.CHTML.outerEm;
//      var BBOX = {w:bbox.w*em, h:bbox.h*em, d:bbox.d*em};
//      if (bbox.width) {BBOX.width = bbox.width}
      return BBOX;
    },
    
    Zoom: function (jax,span,math,Mw,Mh) {
      //
      //  Re-render at larger size
      //
      span.className = "MathJax";
      this.idPostfix = "-zoom"; jax.root.toCommonHTML(span,span); this.idPostfix = "";
      //
      //  Get height and width of zoomed math and original math
      //
      span.style.position = "absolute";
      var zW = span.offsetWidth, zH = span.offsetHeight,
          mH = math.offsetHeight, mW = math.offsetWidth;
      if (mW === 0) {mW = math.parentNode.offsetWidth}; // IE7 gets mW == 0?
      span.style.position = math.style.position = "";
      //
      return {Y:-EVENT.getBBox(span).h, mW:mW, mH:mH, zW:zW, zH:zH};
    },

    initCHTML: function (math,span) {},

    Remove: function (jax) {
      var span = document.getElementById(jax.inputID+"-Frame");
      if (span) {
        if (jax.CHTML.display) {span = span.parentNode}
        span.parentNode.removeChild(span);
      }
      delete jax.CHTML;
    },
    
    ID: 0, idPostfix: "",
    GetID: function () {this.ID++; return this.ID},

    MATHSPACE: {
      veryverythinmathspace:  1/18,
      verythinmathspace:      2/18,
      thinmathspace:          3/18,
      mediummathspace:        4/18,
      thickmathspace:         5/18,
      verythickmathspace:     6/18,
      veryverythickmathspace: 7/18,
      negativeveryverythinmathspace:  -1/18,
      negativeverythinmathspace:      -2/18,
      negativethinmathspace:          -3/18,
      negativemediummathspace:        -4/18,
      negativethickmathspace:         -5/18,
      negativeverythickmathspace:     -6/18,
      negativeveryverythickmathspace: -7/18,

      thin: .04,
      medium: .06,
      thick: .1,

      infinity: BIGDIMEN
    },
    pxPerInch: 96,
    em: 16,
    
    FONTDEF: {},
    TEXDEF: {
      x_height:         .442,
      quad:             1,
      num1:             .676508,
      num2:             .393732,
      num3:             .44373,
      denom1:           .685951,
      denom2:           .344841,
      sup1:             .412892,
      sup2:             .362892,
      sup3:             .288888,
      sub1:             .15,
      sub2:             .247217,
      sup_drop:         .386108,
      sub_drop:         .05,
      delim1:          2.39,
      delim2:          1.0,
      axis_height:      .25,
      rule_thickness:   .06,
      big_op_spacing1:  .111111,
      big_op_spacing2:  .166666,
      big_op_spacing3:  .2,
      big_op_spacing4:  .6,
      big_op_spacing5:  .1,

      scriptspace:         .05,
      nulldelimiterspace:  .12,
      delimiterfactor:     901,
      delimitershortfall:   .3,

      min_rule_thickness:  1.25     // in pixels
    },
    
    getUnicode: function (string) {
      var n = string.text.charCodeAt(string.i); string.i++;
      if (n >= 0xD800 && n < 0xDBFF) {
        n = (((n-0xD800)<<10)+(string.text.charCodeAt(string.i)-0xDC00))+0x10000;
        string.i++;
      }
      return n;
    },
    getCharList: function (variant,n) {
      var id, M, list = [], cache = variant.cache, N = n;
      if (cache[n]) return cache[n];
      var RANGES = this.FONTDATA.RANGES, VARIANT = this.FONTDATA.VARIANT;
      if (n >= RANGES[0].low && n <= RANGES[RANGES.length-1].high) {
        for (id = 0, M = RANGES.length; id < M; id++) {
          if (RANGES[id].name === "alpha" && variant.noLowerCase) continue;
          var N = variant["offset"+RANGES[id].offset];
          if (N && n >= RANGES[id].low && n <= RANGES[id].high) {
            if (RANGES[id].remap && RANGES[id].remap[n]) {
              n = N + RANGES[id].remap[n];
            } else {
              n = n - RANGES[id].low + N;
              if (RANGES[id].add) {n += RANGES[id].add}
            }
            if (variant["variant"+RANGES[id].offset])
              variant = VARIANT[variant["variant"+RANGES[id].offset]];
            break;
          }
        }
      }
      if (variant.remap && variant.remap[n]) {
        n = variant.remap[n];
        if (variant.remap.variant) {variant = VARIANT[variant.remap.variant]}
      } else if (this.FONTDATA.REMAP[n] && !variant.noRemap) {
        n = this.FONTDATA.REMAP[n];
      }
      if (n instanceof Array) {variant = VARIANT[n[1]]; n = n[0]} 
      if (typeof(n) === "string") {
        var string = {text:n, i:0, length:n.length};
        while (string.i < string.length) {
          n = this.getUnicode(string);
          var chars = this.getCharList(variant,n);
          if (chars) list.push.apply(list,chars);
        }
      } else {
        if (variant.cache[n]) {list = variant.cache[n]}
          else {variant.cache[n] = list = [this.lookupChar(variant,n)]}
      }
      cache[N] = list;
      return list;
    },
    lookupChar: function (variant,n) {
      while (variant) {
        for (var i = 0, m = variant.fonts.length; i < m; i++) {
          var font = this.FONTDATA.FONTS[variant.fonts[i]];
//          if (typeof(font) === "string") this.loadFont(font);
          var C = font[n];
          if (C) {
// ### FIXME: implement aliases, spaces, etc.
            if (C.length === 5) C[5] = {};
            if (C.c == null) {
              C[0] /= 1000; C[1] /= 1000; C[2] /= 1000; C[3] /= 1000; C[4] /= 1000;
              if (n <= 0xFFFF) {
                C.c = String.fromCharCode(n);
              } else {
                var N = n - 0x10000;
                C.c = String.fromCharCode((N>>10)+0xD800)
                    + String.fromCharCode((N&0x3FF)+0xDC00);
              }
            }
            return {type:"char", font:font, n:n};
          } // else load block files?
        }
        variant = this.FONTDATA.VARIANT[variant.chain];
      }
      return this.unknownChar(variant,n);
    },
    unknownChar: function (variant,n) {},

    addCharList: function (node,list,bbox) {
      var text = "", className;
      for (var i = 0, m = list.length; i < m; i++) {
        var item = list[i];
        switch (item.type) {
          case "char":
            var font = item.font;
            if (className && font.className !== className) {
              HTML.addElement(node,"span",{className:className},[text]);
              text = ""; className = null;
            }
            var C = font[item.n];
            text += C.c; className = font.className;
            if (bbox.h < C[0]) bbox.h = C[0];
            if (bbox.d < C[1]) bbox.d = C[1];
            if (bbox.l > bbox.w+C[3]) bbox.l = bbox.w+C[3];
            if (bbox.r < bbox.w+C[4]) bbox.r = bbox.w+C[4];
            bbox.w += C[2];
            if (bbox.H < font.ascent)  bbox.H = font.ascent;
            if (bbox.D < font.descent) bbox.D = font.descent;
            if (m == 1 && font.skew && font.skew[item.n]) bbox.skew = font.skew[item.n];
        }
      }
      if (node.childNodes.length) {
        HTML.addElement(node,"span",{className:className},[text]);
      } else {
        HTML.addText(node,text);
        node.className += " "+className;
      }
    },
    

    // ### FIXME:  add more here

    DELIMITERS: {
      "(": {dir:V},
      "{": {dir:V, w:.58},
      "[": {dir:V},
      "|": {dir:V, w:.275},
      ")": {dir:V},
      "}": {dir:V, w:.58},
      "]": {dir:V},
      "/": {dir:V},
      "\\": {dir:V},
      "\u2223": {dir:V, w:.275},
      "\u2225": {dir:V, w:.55},
      "\u230A": {dir:V, w:.5},
      "\u230B": {dir:V, w:.5},
      "\u2308": {dir:V, w:.5},
      "\u2309": {dir:V, w:.5},
      "\u27E8": {dir:V, w:.5},
      "\u27E9": {dir:V, w:.5},
      "\u2191": {dir:V, w:.65},
      "\u2193": {dir:V, w:.65},
      "\u21D1": {dir:V, w:.75},
      "\u21D3": {dir:V, w:.75},
      "\u2195": {dir:V, w:.65},
      "\u21D5": {dir:V, w:.75},
      "\u27EE": {dir:V, w:.275},
      "\u27EF": {dir:V, w:.275},
      "\u23B0": {dir:V, w:.6},
      "\u23B1": {dir:V, w:.6}
    },
    
    //
    //  ### FIXME: Handle mu's
    //
    length2em: function (length,size) {
      if (typeof(length) !== "string") {length = length.toString()}
      if (length === "") {return ""}
      if (length === MML.SIZE.NORMAL) {return 1}
      if (length === MML.SIZE.BIG)    {return 2}
      if (length === MML.SIZE.SMALL)  {return .71}
      if (this.MATHSPACE[length])     {return this.MATHSPACE[length]}
      var match = length.match(/^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/);
      var m = parseFloat(match[1]||"1"), unit = match[2];
      if (size == null) {size = 1}
      if (unit === "em") {return m}
      if (unit === "ex") {return m * this.TEX.x_height}
      if (unit === "%")  {return m / 100 * size}
      if (unit === "px") {return m / this.em}
      if (unit === "pt") {return m / 10}                      // 10 pt to an em
      if (unit === "pc") {return m * 1.2}                     // 12 pt to a pc
      if (unit === "in") {return m * this.pxPerInch / this.em}
      if (unit === "cm") {return m * this.pxPerInch / this.em / 2.54}  // 2.54 cm to an inch
      if (unit === "mm") {return m * this.pxPerInch / this.em / 25.4}  // 10 mm to a cm
      if (unit === "mu") {return m / 18}                     // 18mu to an em for the scriptlevel
      return m*size;  // relative to given size (or 1em as default)
    },

    Em: function (m) {
      if (Math.abs(m) < .001) return "0em";
      return (m.toFixed(3).replace(/\.?0+$/,""))+"em";
    },
    unEm: function (m) {
      return parseFloat(m);
    },
    
    zeroBBox: function () {
      return {h:0, d:0, w:0, l:0, r:0, D:0, H:0};
    },
    emptyBBox: function () {
      return {h:-BIGDIMEN, d:-BIGDIMEN, w:0, l:BIGDIMEN, r:-BIGDIMEN,
              D:-BIGDIMEN, H:-BIGDIMEN};
    },
    cleanBBox: function (bbox) {
      if (bbox.h === -BIGDIMEN) bbox.h = 0;
      if (bbox.d === -BIGDIMEN) bbox.d = 0;
      if (bbox.l ===  BIGDIMEN) bbox.l = 0;
      if (bbox.r === -BIGDIMEN) bbox.r = 0;
      if (bbox.H === -BIGDIMEN) bbox.H = .8;
      if (bbox.D === -BIGDIMEN) bbox.D = .2;
    },
    scaleBBox: function (bbox,level,dlevel) {
      var scale = Math.pow(SCRIPTFACTOR,Math.min(2,level)-(dlevel||0));
      bbox.w *= scale; bbox.h *= scale; bbox.d *= scale;
      bbox.l *= scale; bbox.r *= scale;
      if (bbox.L) bbox.L *= scale;
      if (bbox.R) bbox.R *= scale;
    },

    arrayEntry: function (a,i) {return a[Math.max(0,Math.min(i,a.length-1))]}

  });

  MathJax.Hub.Register.StartupHook("mml Jax Ready",function () {
    MML = MathJax.ElementJax.mml;

    MML.mbase.Augment({
      toCommonHTML: function (node,options) {
        return this.CHTMLdefaultNode(node,options);
      },

      CHTMLdefaultNode: function (node,options) {
        if (!options) options = {};
        node = this.CHTMLcreateNode(node);
        if (!options.noBBox) this.CHTMLhandleSpace(node);
        this.CHTMLhandleStyle(node);
        this.CHTMLhandleColor(node);
        var m = Math.max((options.minChildren||0),this.data.length);
        for (var i = 0; i < m; i++) this.CHTMLaddChild(node,i,options);
        if (!options.noBBox) CHTML.cleanBBox(this.CHTML);
        return node;
      },
      CHTMLaddChild: function (node,i,options) {
        var child = this.data[i];
        if (child) {
          var type = options.childNodes;
          if (type) {
            if (type instanceof Array) type = type[i];
            node = HTML.addElement(node,type);
          }
          child.toCommonHTML(node,options.childOptions);
          if (!options.noBBox) {
            var bbox = this.CHTML, cbox = child.CHTML;
            if (cbox.r + bbox.w > bbox.r) bbox.r = bbox.w + cbox.r;
            if (cbox.l + bbox.w < bbox.l) bbox.l = bbox.w + cbox.l;
            bbox.w += cbox.w + (cbox.L||0) + (cbox.R||0);
            if (cbox.h > bbox.h) bbox.h = cbox.h;
            if (cbox.d > bbox.d) bbox.d = cbox.d;
            if (cbox.ic) {bbox.ic = cbox.ic} else {delete bbox.ic}
            if (cbox.skew) bbox.skew = cbox.skew;
          }
        } else if (options.forceChild) {HTML.addElement(node,"span")}
      },
      CHTMLstretchChildV: function (i,H,D) {
        var data = this.data[i];
        if (data && data.CHTMLcanStretch("Vertical",H,D)) {
          var bbox = this.CHTML, dbox = data.CHTML, w = dbox.w;
          if (dbox.h !== H || dbox.d !== D) {
            data.CHTMLstretchV(H,D);
            bbox.w += dbox.w - w;
            if (dbox.h > bbox.h) bbox.h = dbox.h;
            if (dbox.d > bbox.d) bbox.d = dbox.d;
          }
        }
      },
      CHTMLstretchChildH: function (i,W) {
        var data = this.data[i];
        if (data) {
          var bbox = this.CHTML, dbox = data.CHTML;
          if (dbox.w !== W) {
            data.CHTMLstretchH(W);
            if (dbox.h > bbox.h) bbox.h = dbox.h;
            if (dbox.d > bbox.d) bbox.d = dbox.d;
          }
        }
      },

      CHTMLcreateNode: function (node) {
        if (!this.CHTML) this.CHTML = {};
        this.CHTML = CHTML.zeroBBox();
        if (this.inferred) return node;
        if (!this.CHTMLnodeID) {this.CHTMLnodeID = CHTML.GetID()};
        var id = (this.id || "MJXc-Node-"+this.CHTMLnodeID);
        return HTML.addElement(node,"mjx-"+this.type,{className:"MJXc-"+this.type, id:id});
      },
      CHTMLnodeElement: function () {
        if (!this.CHTMLnodeID) {return null}
        return document.getElementById(this.id||"MJXc-Node-"+this.CHTMLnodeID);
      },

      CHTMLhandleStyle: function (node) {
        if (this.style) node.style.cssText = this.style;
      },

      CHTMLhandleColor: function (node) {
        if (this.mathcolor) {node.style.color = this.mathcolor}
          else if (this.color) {node.style.color = this.color}
        if (this.mathbackground) {node.style.backgroundColor = this.mathbackground}
          else if (this.background) {node.style.backgroundColor = this.background}
      },
      
      CHTMLhandleSpace: function (node) {
        if (!this.useMMLspacing) {
	  var space = this.texSpacing();
          if (space !== "") this.CHTML.L = CHTML.length2em(space) + (this.CHTML.L||0);
          if (this.CHTML.L) node.style.marginLeft = CHTML.Em(this.CHTML.L);
          if (this.CHTML.R) node.style.marginRight = CHTML.Em(this.CHTML.R);
        }
      },

      CHTMLhandleScriptlevel: function (node,dlevel) {
        var level = this.Get("scriptlevel");
        if (level === 0) return;
        // ### FIXME: handle scriptminsize
        if (level > 2) level = 2;
        if (level > 0 && dlevel == null) {
          node.className += " MJXc-script";
        } else {
          if (dlevel) level -= dlevel;
          var scale = Math.floor(Math.pow(SCRIPTFACTOR,level)*100);
          node.style.fontSize = scale+"%";
        }
      },
      
      CHTMLhandleText: function (node,text,variant) {
        if (node.childNodes.length === 0) {
          HTML.addElement(node,"mjx-char");
          this.CHTML = CHTML.emptyBBox();
        }
        var bbox = this.CHTML, string = {text:text, i:0, length:text.length};
        if (typeof(variant) === "string") variant = CHTML.FONTDATA.VARIANT[variant];
        if (!variant) {variant = CHTML.FONTDATA.VARIANT[MML.VARIANT.NORMAL]}
        var list = [];
        while (string.i < string.length) {
          var n = CHTML.getUnicode(string);
          list.push.apply(list,CHTML.getCharList(variant,n));
        }
        CHTML.addCharList(node.firstChild,list,bbox);
        CHTML.cleanBBox(bbox);
        bbox.h += HFUZZ; bbox.d += DFUZZ;
        var a = (bbox.H-bbox.D)/2;  // center of font (line-height:0)
        node.firstChild.style.marginTop = CHTML.Em(bbox.h-a);
        node.firstChild.style.marginBottom = CHTML.Em(bbox.d+a);
      },

      CHTMLbboxFor: function (n) {
        if (this.data[n] && this.data[n].CHTML) return this.data[n].CHTML;
        return CHTML.zeroBBox();
      },
      //
      //  Debugging function to see if internal BBox matches actual bbox
      //
      CHTMLdrawBBox: function (node) {
        var bbox = this.CHTML;
        HTML.addElement(node.parentNode,"mjx-box",
          {style:{opacity:.5,"margin-left":CHTML.Em(-bbox.w-(bbox.R||0))}},[
          ["mjx-box",{style:{
            height:CHTML.Em(bbox.h),width:CHTML.Em(bbox.w),"background-color":"red"}
          }],
          ["mjx-box",{style:{
            height:CHTML.Em(bbox.d),width:CHTML.Em(bbox.w),
            "margin-left":CHTML.Em(-bbox.w),"vertical-align":CHTML.Em(-bbox.d),
            "background-color":"green"}
          }]
        ]);
      },


      CHTMLnotEmpty: function (mml) {
	while (mml && mml.data.length < 2 && (mml.type === "mrow" || mml.type === "texatom"))
          mml = mml.data[0];
	return !!mml;
      },

      CHTMLcanStretch: function (direction,H,D) {
        if (this.isEmbellished()) {
          var core = this.Core();
          if (core && core !== this) {return core.CHTMLcanStretch(direction,H,D)}
        }
        return false;
      },
      CHTMLstretchV: function (h,d) {},
      CHTMLstretchH: function (w) {}

    });

    MML.chars.Augment({
      toCommonHTML: function (node,options) {
        if (options == null) options = {};
        var text = this.toString();
        if (options.remap) text = options.remap(text,options.remapchars);
        //  ### FIXME: handle mtextFontInherit
        this.CHTMLhandleText(node,text,options.variant||this.parent.Get("mathvariant"));
      }
    });
    MML.entity.Augment({
      toCommonHTML: function (node,options) {
        if (options == null) options = {};
        var text = this.toString();
        if (options.remapchars) text = options.remap(text,options.remapchars);
        //  ### FIXME: handle mtextFontInherit
        this.CHTMLhandleText(node,text,options.variant||this.parent.Get("mathvariant"));
      }
    });

    MML.math.Augment({
      toCommonHTML: function (node) {
        node = this.CHTMLdefaultNode(node);
        if (this.Get("display") === "block") {node.className += " MJXc-display"}
        return node;
      }
    });
    
    MML.mi.Augment({
      toCommonHTML: function (node) {
        node = this.CHTMLdefaultNode(node);
        var bbox = this.CHTML, text = this.data.join("");
        if (bbox.skew != null && text.length !== 1) delete bbox.skew;
        if (bbox.r > bbox.w && text.length === 1 /*&& !variant.noIC*/) {  // ### FIXME: handle variants
          bbox.ic = bbox.r - bbox.w; bbox.w = bbox.r;
          node.style.paddingRight = CHTML.Em(bbox.ic);
        }
      }
    });

    MML.mo.Augment({
      toCommonHTML: function (node) {
        node = this.CHTMLcreateNode(node);
        this.CHTML = CHTML.emptyBBox();
        
        var values = this.getValues("displaystyle","largeop","mathvariant");
        values.text = this.data.join("");
        this.CHTMLadjustAccent(values);
        this.CHTMLadjustVariant(values);

        for (var i = 0, m = this.data.length; i < m; i++) {
          this.CHTMLaddChild(node,i,{childOptions:{
            variant: values.mathvariant,
            remap: this.remap,
            remapchars: values.mapchars
          }});
        }
        if (values.text.length !== 1) delete this.CHTML.skew;
        if (values.largeop) this.CHTMLcenterOp(node);
        CHTML.cleanBBox(this.CHTML);

        this.CHTMLhandleSpace(node);
        this.CHTMLhandleStyle(node);
        this.CHTMLhandleColor(node);

        return node;
      },
      CHTMLhandleSpace: function (node) {
        if (this.useMMLspacing) {
	  var values = this.getValues("scriptlevel","lspace","rspace");
          values.lspace = Math.max(0,CHTML.length2em(values.lspace));
          values.rspace = Math.max(0,CHTML.length2em(values.rspace));
          if (values.scriptlevel > 0) {
            if (!this.hasValue("lspace")) values.lspace = .15;
            if (!this.hasValue("rspace")) values.rspace = .15;
          }
          var core = this, parent = this.Parent();
          while (parent && parent.isEmbellished() && parent.Core() === core)
	    {core = parent; parent = parent.Parent(); node = core.CHTMLnodeElement()}
          if (values.lspace) {node.style.paddingLeft =  CHTML.Em(values.lspace)}
	  if (values.rspace) {node.style.paddingRight = CHTML.Em(values.rspace)}
        } else {
          this.SUPER(arguments).CHTMLhandleSpace.apply(this,arguments);
        }
      },
      CHTMLadjustAccent: function (data) {
        var parent = this.CoreParent(); data.parent = parent;
        if (data.text.length === 1 && parent && parent.isa(MML.munderover) && 
            this.CoreText(parent.data[parent.base]).length === 1) {
          var over = parent.data[parent.over], under = parent.data[parent.under];
          if (over && this === over.CoreMO() && parent.Get("accent")) {
            data.mapchars = CHTML.FONTDATA.REMAPACCENT
          } else if (under && this === under.CoreMO() && parent.Get("accentunder")) {
            data.mapchars = CHTML.FONTDATA.REMAPACCENTUNDER
          }
        }
      },
      CHTMLadjustVariant: function (data) {
        var parent = data.parent,
            isScript = (parent && parent.isa(MML.msubsup) && this !== parent.data[parent.base]);
        if (data.largeop) data.mathvariant = (data.displaystyle ? "-largeOp" : "-smallOp");
        if (isScript) {
          data.mapchars = this.remapChars;
          if (data.text.match(/['`"\u00B4\u2032-\u2037\u2057]/))
            data.mathvariant = "-TeX-variant";  // ### FIXME: handle other fonts
        }
      },
      CHTMLcenterOp: function (node) {
        var bbox = this.CHTML;
        var p = (bbox.h - bbox.d)/2 - CHTML.TEX.axis_height;
        if (Math.abs(p) > .001) node.style.verticalAlign = CHTML.Em(-p);
        bbox.h -= p; bbox.d += p;
        if (bbox.r > bbox.w) {
          bbox.ic = bbox.r - bbox.w; bbox.w = bbox.r;
          node.style.paddingRight = CHTML.Em(bbox.ic);
        }
      },
      CHTMLcanStretch: function (direction,H,D) {
        if (!this.Get("stretchy")) {return false}
        var c = this.data.join("");
        if (c.length > 1) {return false}
        c = CHTML.DELIMITERS[c];
        var stretch = (c && c.dir === direction.substr(0,1));
        if (stretch) {
          stretch = (this.CHTML.h !== H || this.CHTML.d !== D ||
            (this.Get("minsize",true) || this.Get("maxsize",true)));
        }
        return stretch;
      },
      CHTMLstretchV: function (h,d) {
        var node = this.CHTMLnodeElement(), bbox = this.CHTML; //bbox.w = .4; // ## adjust width
        var values = this.getValues("symmetric","maxsize","minsize");
        var a = CHTML.TEX.axis_height;
        if (values.symmetric) {H = 2*Math.max(h-a,d+a)} else {H = h + d}
        values.maxsize = CHTML.length2em(values.maxsize,bbox.h+bbox.d);
        values.minsize = CHTML.length2em(values.minsize,bbox.h+bbox.d);
        H = Math.max(values.minsize,Math.min(values.maxsize,H));
        var scale = H/(bbox.h+bbox.d-.3);  // ### adjusted for extra tall bbox
        var box = HTML.Element("span",{style:{"font-size":CHTML.Em(scale)}});
        if (scale > 1.25) {
          var sX = Math.ceil(1.25/scale * 10);
          box.className = "MJXc-right MJXc-scale"+sX;
          box.style.marginLeft = CHTML.Em(bbox.w*(sX/10-1)+.07);
          bbox.w *= scale*sX/10;
        }
        box.appendChild(node.firstChild); node.appendChild(box);
        if (values.symmetric) node.style.verticalAlign = CHTML.Em(a*(1-scale));
      }
    });

    MML.mspace.Augment({
      toCommonHTML: function (node) {
        node = this.CHTMLcreateNode(node);
        this.CHTMLhandleStyle(node);
        this.CHTMLhandleColor(node);
        var values = this.getValues("height","depth","width");
        var w = CHTML.length2em(values.width),
            h = CHTML.length2em(values.height),
            d = CHTML.length2em(values.depth);
        var bbox = this.CHTML;
        bbox.w = w; bbox.h = h; bbox.d = d;
        if (w < 0) {node.style.marginRight = CHTML.Em(w); w = 0}
        node.style.width = CHTML.Em(w);
        node.style.height = CHTML.Em(h+d);
        if (d) node.style.verticalAlign = CHTML.Em(-d);
        return node;
      }
    });

    MML.mpadded.Augment({
      toCommonHTML: function (node) {
        node = this.CHTMLdefaultNode(node,{childNodes:"mjx-block", forceChild:true});
        var child = node.firstChild, cbox = this.CHTMLbboxFor(0), bbox = this.CHTML;
        node = HTML.addElement(node,"mjx-block"); node.appendChild(child);
        var values = this.getValues("width","height","depth","lspace","voffset"), dimen;
        if (values.width !== "") {
          dimen = this.CHTMLdimen(values.width,"w",0);
          if (dimen.pm) dimen.len += cbox.w;
          if (dimen.len < 0) dimen.len = 0;
          if (dimen.len !== cbox.w) node.style.width = CHTML.Em(dimen.len);
          bbox.w = dimen.len;
        }
        if (values.height !== "") {
          dimen = this.CHTMLdimen(values.height,"h",0);
          if (dimen.pm) {bbox.h += dimen.len} else {bbox.h = dimen.len; dimen.len += -cbox.h}
          if (dimen.len+cbox.h < 0) dimen.len = -cbox.h;
          if (dimen.len) child.style.marginTop = CHTML.Em(dimen.len);
        }
        if (values.depth !== "")  {
          dimen = this.CHTMLdimen(values.depth,"d",0);
          if (dimen.pm) {bbox.d += dimen.len} else {bbox.d = dimen.len; dimen.len += -cbox.d}
          if (dimen.len+cbox.d < 0) dimen.len = -cbox.d;
          if (dimen.len) child.style.marginBottom = CHTML.Em(dimen.len);
        }
        if (values.voffset !== "") {
          dimen = this.CHTMLdimen(values.voffset);
          if (dimen.len) {
            node.style.position = "relative";
            node.style.top = CHTML.Em(-dimen.len);
          }
        }
        if (values.lspace !== "") {
          dimen = this.CHTMLdimen(values.lspace);
          if (dimen.len) {
            node.style.position = "relative";
            node.style.left = CHTML.Em(dimen.len);
          }
        }
        return node.parentNode;
      },
      CHTMLdimen: function (length,d,m) {
        if (m == null) {m = -BIGDIMEN}
        length = String(length);
        var match = length.match(/width|height|depth/);
        var size = (match ? this.CHTML[match[0].charAt(0)] : (d ? this.CHTML[d] : 0));
        return {len: CHTML.length2em(length,size)||0, pm: !!length.match(/^[-+]/)};
      }
    });

    MML.munderover.Augment({
      toCommonHTML: function (node) {
	var values = this.getValues("displaystyle","scriptlevel","accent","accentunder","align");
	if (!values.displaystyle && this.data[this.base] != null &&
	    this.data[this.base].CoreMO().Get("movablelimits"))
                return MML.msubsup.prototype.toCommonHTML.call(this,node);
        //
        //  Get the nodes for base and limits
        //
        var types = ["mjx-op","mjx-under","mjx-over"];
        if (this.over === 1) types[1] = types[2];
        node = this.CHTMLdefaultNode(node,{
          childNodes:types, noBBox:true, forceChild:true, minChildren: 2
        });
        var base, under, over;
        base = node.removeChild(node.firstChild);
        under = over = node.removeChild(node.firstChild);
        if (node.firstChild) over = node.removeChild(node.firstChild);
        //
        //  Get the scale of the base and its limits
        //
        this.CHTMLgetScaleFactors(values,under,over);
        //
        //  Get the bounding boxes and the maximum width
        //
        var boxes = [], W = this.CHTMLgetBBoxes(boxes,values);
	var bbox = boxes[this.base], BBOX = this.CHTML;
        BBOX.w = W; BBOX.h = bbox.h; BBOX.d = bbox.d; // modified below
        //
        //  Add over- and under-scripts
        //  
        var stack = base, delta = 0;
        if (bbox.ic) {delta = 1.3*bbox.ic + .05} // make faked IC be closer to expeted results
        if (this.data[this.over]) {
          stack = this.CHTMLaddOverscript(over,boxes,values,delta,base);
        }
        if (this.data[this.under]) {
          this.CHTMLaddUnderscript(under,boxes,values,delta,node,stack);
        } else {
          node.appendChild(stack);
        }
        //
        //  Handle horizontal positions
        //
        this.CHTMLplaceBoxes(base,under,over,values,boxes);
        this.CHTMLhandleSpace(node);
        return node;
      },
      //
      //  Compute scaling factors for the under- and over-scripts
      //
      CHTMLgetScaleFactors: function (values,under,over) {
        values.oscale = values.uscale = 1;
        if (values.scriptlevel < 2) {
          if (!values.accent) {
            values.oscale = SCRIPTFACTOR;
            if (this.data[this.over])  this.data[this.over].CHTMLhandleScriptlevel(over);
          }
          if (!values.accentunder) {
            values.uscale = SCRIPTFACTOR;
            if (this.data[this.under]) this.data[this.under].CHTMLhandleScriptlevel(under);
          }
        }
      },
      //
      //  Get the bounding boxes for the children, stretch
      //  any stretchable elements, and compute the maximum width
      //  
      CHTMLgetBBoxes: function (bbox,values) {
        var i, m = this.data.length, SCALE,
            w = -BIGDIMEN,  // maximum width of non-stretchy items
            W = w;          // maximum width of all items
        //
        //  Get the maximum width
        //
        for (i = 0; i < m; i++) {
          bbox[i] = this.CHTMLbboxFor(i);
          if (this.data[i]) bbox[i].stretch = this.data[i].CHTMLcanStretch("Horizontal");
          SCALE = (i === this.base ? 1 : i === this.over ? values.oscale : values.uscale);
          W = Math.max(W,SCALE*(bbox[i].w + (bbox[i].L||0) + (bbox[i].R||0)));
          if (!bbox[i].stretch && W > w) w = W;
        }
        if (w === -BIGDIMEN) w = W;
        //
        //  Stretch those parts that need it
        //
        for (i = 0; i < m; i++) {
          if (bbox[i].stretch) {
            SCALE = (i === this.base ? 1 : i === this.over ? valuses.oscale : values.uscale);
            this.CHTMLstretchChildH(i,w/SCALE);
            W = Math.max(W,SCALE*(bbox[i].w + (bbox[i].L||0) + (bbox[i].R||0)));
          }
        }
        return W;
      },
      //
      //  Add an overscript
      //
      CHTMLaddOverscript: function (over,boxes,values,delta,base) {
        var BBOX = this.CHTML;
        var w, z1, z2, z3 = CHTML.TEX.big_op_spacing5, k;
        var scale = values.oscale, obox = boxes[this.over], bbox = boxes[this.base];
        //
        //  Put the base and script into a stack
        //  
        var stack = HTML.Element("mjx-stack");
        stack.appendChild(over); stack.appendChild(base);
        if (obox.d < 0 || obox.h < .25) {
          //
          // For negative depths, set the height and align to top
          // in order to avoid extra baseline space
          //
          over.firstChild.style.verticalAlign = "top";
          over.style.height = CHTML.Em(obox.h+obox.d);
        }
        //
        //  Determine the spacing
        //
        obox.x = 0;
        if (values.accent) {
          if (obox.w < .001) obox.x += (obox.r - obox.l)/2; // center combining accents
          k = CHTML.TEX.rule_thickness; z3 = 0;
          if (bbox.skew) {
            obox.x += scale*bbox.skew; BBOX.skew = scale*bbox.skew;
            if (obox.x+scale*obox.w > BBOX.w) BBOX.skew += (BBOX.w - (obox.x+scale*obox.w))/2;
          }
        } else {
          z1 = CHTML.TEX.big_op_spacing1;
          z2 = CHTML.TEX.big_op_spacing3;
          k = Math.max(z1,z2-Math.max(0,scale*obox.d));
        }
        obox.x += delta/2;
        //
        //  Position the overscript
        //
        if (k) over.style.paddingBottom = CHTML.Em(k/scale);
        if (z3) over.style.paddingTop = CHTML.Em(z3/scale);
        BBOX.h += scale*(obox.h+obox.d) + k + z3;
        return stack;
      },
      //
      //  Add an underscript
      //
      CHTMLaddUnderscript: function (under,boxes,values,delta,node,stack) {
        var BBOX = this.CHTML;
        var w, x = 0, z1, z2, z3 = CHTML.TEX.big_op_spacing5, k;
        var scale = values.uscale, ubox = boxes[this.under], bbox = boxes[this.base];
        //
        //  Create a table for the underscript
        //
        HTML.addElement(node,"mjx-itable",{},[
          ["mjx-row",{},[["mjx-cell"]]],
          ["mjx-row"],
        ]);
        node.firstChild.firstChild.firstChild.appendChild(stack);
        node.firstChild.lastChild.appendChild(under);
        if (ubox.d < 0 || ubox.h < .25) {
          //
          // For negative depths, set the height and align to top
          // in order to avoid extra baseline space
          //
          under.firstChild.style.verticalAlign = "top";
          under.style.height = CHTML.Em(ubox.h+ubox.d);
        }
        //
        //  determine the spacing
        //
        if (values.accentunder) {
          k = 3*CHTML.TEX.rule_thickness; z3 = 0;
        } else {
          z1 = CHTML.TEX.big_op_spacing2;
          z2 = CHTML.TEX.big_op_spacing4;
          k = Math.max(z1,z2-scale*ubox.h);
        }
        ubox.x = -delta/2;
        //
        //  Position the overscript
        //
        if (k) under.style.paddingTop = CHTML.Em(k/scale);
        if (z3) under.style.paddingBottom = CHTML.Em(z3/scale);
        BBOX.d += scale*(ubox.h+ubox.d) + z3 + k;
      },
      //
      //  Center boxes horizontally, taking offsets into account
      //  ### FIXME: handle BBOX.l and BBOX.r
      //
      CHTMLplaceBoxes: function (base,under,over,values,boxes) {
        var BBOX = this.CHTML, W = BBOX.w, i, m = boxes.length;
        boxes[this.base].x = 0; var dx = 0;
        for (i = 0; i < m; i++) {
          var SCALE = (i === this.base ? 1 : i === this.over ? values.oscale : values.uscale);
          var w = SCALE*(boxes[i].w + (boxes[i].L||0) + (boxes[i].R||0));
          boxes[i].x += (W-w)/2;
          if (w + boxes[i].x > BBOX.w) BBOX.w = w + boxes[i].x;
          if (boxes[i].x < dx) dx = boxes[i].x;
        }
        if (dx) BBOX.w += -dx;
        for (i = 0; i < m; i++) {
          if (boxes[i].x + dx) {
            var node = (i === this.base ? base : i === this.over ? over : under);
          var SCALE = (i === this.base ? 1 : i === this.over ? values.oscale : values.uscale);
            node.style.paddingLeft = CHTML.Em((boxes[i].x+dx)/SCALE);
          }
        }
      }
    });

    MML.msubsup.Augment({
      toCommonHTML: function (node) {
	var values = this.getValues("displaystyle","scriptlevel",
                       "subscriptshift","superscriptshift","texprimestyle");
        //
        //  Get the nodes for base and limits
        //
        var types = ["mjx-base","mjx-sub","mjx-sup"];
        if (this.sup === 1) types[1] = types[2];
        node = this.CHTMLdefaultNode(node,{
          childNodes:types, noBBox:true, forceChild:true, minChildren: 2
        });
        var base, sub, sup; base = node.firstChild; sub = sup = base.nextSibling;
        if (sub.nextSibling) sup = sub.nextSibling;
        if (!this.CHTMLnotEmpty(this.data[this.sub])) {node.removeChild(sub); sub = null}
        if (!this.CHTMLnotEmpty(this.data[this.sup])) {node.removeChild(sup); sup = null}
        if (node.childNodes.length === 3) {
          var stack = HTML.addElement(node,"mjx-stack");
          stack.appendChild(sup); stack.appendChild(sub);
        }
        //
        //  Get the scale of the base and its limits
        //
        this.CHTMLgetScaleFactors(values,sub,sup);
        var sscale = values.sscale;
        //
        //  Get the bounding boxes and maximum width of scripts
        //
        var boxes = []; this.CHTMLgetBBoxes(boxes,values);
	var BBOX = this.CHTML,
            bbox = boxes[this.base], subbox = boxes[this.sub], supbox = boxes[this.sup];
        BBOX.w = bbox.w; BBOX.h = bbox.h; BBOX.d = bbox.d; // modified below
        //
        //  Get initial values for parameters
        //
        var ex = CHTML.TEX.x_height, s = CHTML.TEX.scriptspace;
	var q = CHTML.TEX.sup_drop * sscale, r = CHTML.TEX.sub_drop * sscale;
	var u = bbox.h - q, v = bbox.d + r, delta = 0, p;
	if (bbox.ic) {
          BBOX.w -= bbox.ic;         // remove IC (added by mo and mi)
          base.style.marginRight = CHTML.Em(-bbox.ic);
          delta = 1.3*bbox.ic + .05; // make faked IC be closer to expeted results
        }
        var bmml = this.data[this.base];
	if (bmml && (bmml.type === "mi" || bmml.type === "mo")) {
	  if (bmml.data.join("").length === 1 && bmml.Get("scriptlevel") === 0 &&
	      !bmml.Get("largeop")) {u = v = 0}  // ### FIXME: get scale rather than use scriptlevel
	}
	values.subscriptshift   = (values.subscriptshift === ""   ? 0 : CHTML.length2em(values.subscriptshift));
	values.superscriptshift = (values.superscriptshift === "" ? 0 : CHTML.length2em(values.superscriptshift));
        //
        //  Add the super- and subscripts
        //
	if (!sup) {
	  if (sub) {
	    v = Math.max(v,CHTML.TEX.sub1,sscale*subbox.h-(4/5)*ex,values.subscriptshift);
            this.CHTMLplaceSub(sub,subbox,v,s,BBOX,bbox.w,sscale,sup);
	  }
	} else {
	  if (!sub) {
	    p = CHTML.TEX[(values.displaystyle ? "sup1" : (values.texprimestyle ? "sup3" : "sup2"))];
	    u = Math.max(u,p,sscale*supbox.d+(1/4)*ex,values.superscriptshift);
            this.CHTMLplaceSuper(sup,supbox,u,s,BBOX,bbox.w,delta,sscale,sub);
	  } else {
	    v = Math.max(v,CHTML.TEX.sub2);
	    var t = CHTML.TEX.rule_thickness;
	    if ((u - sscale*supbox.d) - (sscale*subbox.h - v) < 3*t) {
	      v = 3*t - u + sscale*(supbox.d + subbox.h);
	      q = (4/5)*ex - (u - sscale*supbox.d);
	      if (q > 0) {u += q; v -= q}
	    }
            u = Math.max(u,values.superscriptshift);
            v = Math.max(v,values.subscriptshift);
            this.CHTMLplaceSuper(sup,supbox,u,s,BBOX,bbox.w,delta,sscale,sub,subbox,v,stack);
            this.CHTMLplaceSub(sub,subbox,v,s,BBOX,bbox.w,sscale,sup);
	  }
	}
        return node;
      },
      //
      //  Compute scaling factors for the under- and over-scripts
      //
      CHTMLgetScaleFactors: function (values,sub,sup) {
        values.sscale = 1;
        if (values.scriptlevel < 2) {
          values.sscale = SCRIPTFACTOR;
          if (sub) this.data[this.sub].CHTMLhandleScriptlevel(sub);
          if (sup) this.data[this.sup].CHTMLhandleScriptlevel(sup);
        }
      },
      //
      //  Get the bounding boxes for the children
      //  
      CHTMLgetBBoxes: function (bbox,values) {
        var i, m = this.data.length;
        for (i = 0; i < m; i++) bbox[i] = this.CHTMLbboxFor(i);
      },
      //
      //  Place subscript
      //
      CHTMLplaceSub: function (sub,subbox,v,s,BBOX,w,sscale,sup) {
        if (!sup) sub.style.verticalAlign = CHTML.Em(-v/sscale);
        sub.style.paddingRight = CHTML.Em(s/sscale);
        BBOX.w = Math.max(BBOX.w,w+sscale*(subbox.w+(subbox.L||0)+(subbox.R||0))+s);
        BBOX.h = Math.max(BBOX.h,sscale*subbox.h-v);
        BBOX.d = Math.max(BBOX.d,sscale*subbox.d+v);
        // ### FIXME: handle BBOX.l and BBOX.r
      },
      //
      //  Place subscript
      //
      CHTMLplaceSuper: function (sup,supbox,u,s,BBOX,w,delta,sscale,sub,subbox,v,stack) {
        if (sub) {
          sup.style.paddingBottom = CHTML.Em((u+v)/sscale-supbox.d-subbox.h);
          stack.style.verticalAlign = CHTML.Em(-v);
        } else {
          sup.style.verticalAlign = CHTML.Em(u/sscale);
        }
        sup.style.paddingLeft = CHTML.Em(delta/sscale);
        sup.style.paddingRight = CHTML.Em(s/sscale);
        BBOX.w = Math.max(BBOX.w,w+sscale*(supbox.w+(supbox.L||0)+(supbox.R||0))+s+delta);
        BBOX.h = Math.max(BBOX.h,sscale*supbox.h+u);
        BBOX.d = Math.max(BBOX.d,sscale*supbox.d-u);
      }
    });

    MML.mfrac.Augment({
      toCommonHTML: function (node) {
        node = this.CHTMLdefaultNode(node,{
          childNodes:["mjx-numerator","mjx-denominator"],
          forceChild:true, noBBox:true
        });
        var values = this.getValues("linethickness","displaystyle","scriptlevel",
                                    "numalign","denomalign","bevelled");
        var isDisplay = values.displaystyle;
        //
        //  Get the scale of the fraction and its parts
        //
        var sscale = 1, scale = (values.scriptlevel > 0 ? SCRIPTFACTOR : 1);
        if (!isDisplay && values.scriptlevel < 2) {
          sscale = SCRIPTFACTOR;
          if (this.data[0]) this.data[0].CHTMLhandleScriptlevel(node.firstChild);
          if (this.data[1]) this.data[1].CHTMLhandleScriptlevel(node.lastChild);
        }
        //
        //  Create the table for the fraction and set the alignment
        //
        var frac = HTML.addElement(node,"mjx-itable",{},[
          ["mjx-row",{},[["mjx-fbox",{},[["mjx-ftable",{},[["mjx-row"]]]]]]],
          ["mjx-row"]
        ]);
        var num = frac.firstChild.firstChild.firstChild.firstChild, denom = frac.lastChild;
        num.appendChild(node.firstChild);
        denom.appendChild(node.firstChild);
        if (values.numalign !== "center") num.firstChild.style.textAlign = values.numalign;
        if (values.denomalign !== "center") denom.firstChild.style.textAlign = values.denomalign;
        //
        //  Get the bounding boxes for the parts, and determine the placement
        //  of the numerator and denominator
        //
        var nbox = this.CHTMLbboxFor(0), dbox = this.CHTMLbboxFor(1), bbox = this.CHTML;
        values.linethickness = Math.max(0,CHTML.length2em(values.linethickness||"0",0));
        var mt = CHTML.TEX.min_rule_thickness/CHTML.em/scale, a = CHTML.TEX.axis_height;
        var t = values.linethickness, p,q, u,v;
        if (isDisplay) {u = CHTML.TEX.num1; v = CHTML.TEX.denom1}
          else {u = (t === 0 ? CHTML.TEX.num3 : CHTML.TEX.num2); v = CHTML.TEX.denom2}
        if (t === 0) { // \atop
          p = Math.max((isDisplay ? 7 : 3) * CHTML.TEX.rule_thickness, 2*mt); // force to at least 2 px
          q = (u - nbox.d*sscale) - (dbox.h*sscale - v);
          if (q < p) {u += (p - q)/2; v += (p - q)/2}
        } else { // \over
          p = Math.max((isDisplay ? 3 : 0) * t, mt);  // force to be at least 1px
          t = Math.max(t,mt);
          q = (u - nbox.d*sscale) - (a + t/2); if (q < p) u += (p - q);
          q = (a - t/2) - (dbox.h*sscale - v); if (q < p) v += (p - q);
          node.style.verticalAlign = CHTML.Em(a-t/2);
          //
          //  Add the rule to the table
          //
          var rule = HTML.Element("mjx-row",{},[["mjx-cell",{},[["mjx-line"]]]]);
          num.parentNode.appendChild(rule); rule = rule.firstChild.firstChild;
          rule.style.borderTop = CHTML.Em(t)+" solid";
          num.firstChild.className += " MJXc-fpad";
          denom.firstChild.className += " MJXc-fpad";
        }
        //
        //  Determine the new bounding box and place the parts
        //
        bbox.w = sscale*Math.max(nbox.w,dbox.w);
        bbox.h = sscale*nbox.h+u; bbox.d = sscale*dbox.d+v;
        u -= sscale*nbox.d + a + t/2; v -= sscale*dbox.h - a + t/2;
        if (u > 0) num.firstChild.style.paddingBottom = CHTML.Em(u);
        if (v > 0) denom.firstChild.style.paddingTop = CHTML.Em(v);
        //
        //  Add nulldelimiterspace around the fraction
        //  (TeXBook pg 150 and Appendix G rule 15e)
        //
	if (!this.texWithDelims && !this.useMMLspacing) 
          bbox.L = bbox.R = CHTML.TEX.nulldelimiterspace;
        this.CHTMLhandleSpace(node);
        //
        //  Return the completed fraction
        //
        return node;
      }
    });

    MML.msqrt.Augment({
      toCommonHTML: function (node) {
        node = this.CHTMLdefaultNode(node,{
          childNodes:"mjx-box", forceChild:true, noBBox:true
        });
        this.CHTMLlayoutRoot(node,node.firstChild);
        return node;
      },
      CHTMLlayoutRoot: function (node,base) {
        var bbox = this.CHTMLbboxFor(0);
        var scale = Math.ceil((bbox.h+bbox.d+.14)*100), t = CHTML.Em(14/scale);
        var surd = HTML.Element("span",{className:"MJXc-surd"},[
          ["span",{style:{"font-size":scale+"%","margin-top":t}},["\u221A"]]
        ]);
        var root = HTML.Element("span",{className:"MJXc-root"},[
          ["span",{className:"MJXc-rule",style:{"border-top":".08em solid"}}]
        ]);
        var W = (1.2/2.2)*scale/100; // width-of-surd = (height/H-to-W-ratio)
        if (scale > 150) {
          var sX = Math.ceil(150/scale * 10);
          surd.firstChild.className = "MJXc-right MJXc-scale"+sX;
          surd.firstChild.style.marginLeft = CHTML.Em(W*(sX/10-1)/scale*100);
          W = W*sX/10;
          root.firstChild.style.borderTopWidth = CHTML.Em(.08/Math.sqrt(sX/10));
        }
        root.appendChild(base);
        node.appendChild(surd);
        node.appendChild(root);
        this.CHTML.h = bbox.h + .18; this.CHTML.d = bbox.d;
        this.CHTML.w = bbox.w + W; 
        return node;
      }
    });

    MML.mroot.Augment({
      toCommonHTML: function (node) {
        node = this.CHTMLdefaultNode(node,{
          childNodes:"mjx-box", forceChild:true, noBBox:true
        });
        var rbox = this.CHTMLbboxFor(1), root = node.removeChild(node.lastChild);
        var sqrt = this.CHTMLlayoutRoot(HTML.Element("span"),node.firstChild);
        root.className = "MJXc-script";  // ### FIXME: should be scriptscript
        var scale = parseInt(sqrt.firstChild.firstChild.style.fontSize);
        var v = .55*(scale/120) + rbox.d*SCRIPTFACTOR, r = -.6*(scale/120);
        if (scale > 150) {r *= .95*Math.ceil(150/scale*10)/10}
        root.style.marginRight = CHTML.Em(r); root.style.verticalAlign = CHTML.Em(v);
        if (-r > rbox.w*SCRIPTFACTOR) root.style.marginLeft = CHTML.Em(-r-rbox.w*SCRIPTFACTOR); // ### depends on rbox.w
        node.appendChild(root); node.appendChild(sqrt);
        this.CHTML.w += Math.max(0,rbox.w*SCRIPTFACTOR+r);
        this.CHTML.h = Math.max(this.CHTML.h,rbox.h*SCRIPTFACTOR+v);
        return node;
      },
      CHTMLlayoutRoot: MML.msqrt.prototype.CHTMLlayoutRoot
    });
    
    MML.mfenced.Augment({
      toCommonHTML: function (node) {
        node = this.CHTMLcreateNode(node);
        this.CHTMLhandleSpace(node);
        this.CHTMLhandleStyle(node);
        this.CHTMLhandleColor(node);
        //
        //  Make row of open, data, sep, ... data, close
        //
        this.addFakeNodes();
        this.CHTMLaddChild(node,"open",{});
        for (var i = 0, m = this.data.length; i < m; i++) {
          this.CHTMLaddChild(node,"sep"+i,{});
          this.CHTMLaddChild(node,i,{});
        }
        this.CHTMLaddChild(node,"close",{});
        //
        //  Check for stretching the elements
        //
        var H = this.CHTML.h, D = this.CHTML.d;
        this.CHTMLstretchChildV("open",H,D);
        for (i = 0, m = this.data.length; i < m; i++) {
          this.CHTMLstretchChildV("sep"+i,H,D);
          this.CHTMLstretchChildV(i,H,D);
        }
        this.CHTMLstretchChildV("close",H,D);
        return node;
      }
    });

    MML.mrow.Augment({
      toCommonHTML: function (node) {
        node = this.CHTMLdefaultNode(node);
        var H = this.CHTML.h, D = this.CHTML.d;
        for (var i = 0, m = this.data.length; i < m; i++) this.CHTMLstretchChildV(i,H,D);
        return node;
      }
    });

    MML.mstyle.Augment({
      toCommonHTML: function (node) {
        node = this.CHTMLdefaultNode(node);
        if (this.scriptlevel) {
          var dlevel = this.Get("scriptlevel",null,true);
          if (this.scriptlevel !== dlevel) {
            this.CHTMLhandleScriptlevel(node,dlevel);
            CHTML.scaleBBox(this.CHTML,this.scriptlevel,dlevel);
          }
        }
        return node;
      }
    });

    MML.TeXAtom.Augment({
      toCommonHTML: function (node) {
        node = this.CHTMLdefaultNode(node);
        // ### FIXME: handle TeX class?
        node.className = "MJXc-mrow";
        return node;
      }
    });

    MML.mtable.Augment({
      toCommonHTML: function (node) {
        node = this.CHTMLdefaultNode(node,{noBBox:true});
        var values = this.getValues("columnalign","rowalign","columnspacing","rowspacing",
                                    "columnwidth","equalcolumns","equalrows",
                                    "columnlines","rowlines","frame","framespacing",
                                    "align","width"/*,"useHeight","side","minlabelspacing"*/);
        var SPLIT = MathJax.Hub.SplitList, i, m, j, n;
        var CSPACE = SPLIT(values.columnspacing),
            RSPACE = SPLIT(values.rowspacing),
            CALIGN = SPLIT(values.columnalign),
            RALIGN = SPLIT(values.rowalign);//,
//            CLINES = SPLIT(values.columnlines),
//            RLINES = SPLIT(values.rowlines),
//            CWIDTH = SPLIT(values.columnwidth),
//            RCALIGN = [];
        for (i = 0, m = CSPACE.length; i < m; i++) {CSPACE[i] = CHTML.length2em(CSPACE[i])}
        for (i = 0, m = RSPACE.length; i < m; i++) {RSPACE[i] = CHTML.length2em(RSPACE[i])}

        var table = HTML.Element("node");
        while (node.firstChild) table.appendChild(node.firstChild);
        node.appendChild(table);
        var H = 0, W = 0;
        for (i = 0, m = this.data.length; i < m; i++) {
          var row = this.data[i];
          if (row) {
            var rspace = CHTML.arrayEntry(RSPACE,i-1), ralign = CHTML.arrayEntry(RALIGN,i);
            var rbox = row.CHTML, rnode = row.CHTMLnodeElement();
            rnode.style.verticalAlign = ralign;
            var k = (row.type === "mlabeledtr" ? 1 : 0);
            for (j = 0, n = row.data.length; j < n-k; j++) {
              var cell = row.data[j+k];
              if (cell) {
                var cspace = CHTML.arrayEntry(CSPACE,j-1), calign = CHTML.arrayEntry(CALIGN,j);
                var /*cbox = cell.CHTML,*/ cnode = cell.CHTMLnodeElement();
                if (j) {rbox.w += cspace; cnode.style.paddingLeft = CHTML.Em(cspace)}
                if (i) cnode.style.paddingTop = CHTML.Em(rspace);
                cnode.style.textAlign = calign;
              }
            }
            H += rbox.h + rbox.d; if (i) {H += rspace}
            if (rbox.w > W) W = rbox.w;
          }
        }
        var bbox = this.CHTML;
        bbox.w = W; bbox.h = H/2 + AXISHEIGHT; bbox.d = H/2 - AXISHEIGHT;
        bbox.L = bbox.R = .125;
        return node;
      }
    });
    MML.mlabeledtr.Augment({
      CHTMLdefaultNode: function (node,options) {
        if (!options) options = {};
        node = this.CHTMLcreateNode(node);
        this.CHTMLhandleStyle(node);
        this.CHTMLhandleColor(node);
        // skip label for now
        for (var i = 1, m = this.data.length; i < m; i++) this.CHTMLaddChild(node,i,options);
        return node;
      }
    });

    MML.semantics.Augment({
      toCommonHTML: function (node) {
        node = this.CHTMLcreateNode(node);
        if (this.data[0]) {
          this.data[0].toCommonHTML(node);
          MathJax.Hub.Insert(this.data[0].CHTML||{},this.CHTML);
        }
        return node;
      }
    });
    MML.annotation.Augment({toCommonHTML: function(node) {}});
    MML["annotation-xml"].Augment({toCommonHTML: function(node) {}});

    //
    //  Loading isn't complete until the element jax is modified,
    //  but can't call loadComplete within the callback for "mml Jax Ready"
    //  (it would call CommonHTML's Require routine, asking for the mml jax again)
    //  so wait until after the mml jax has finished processing.
    //  
    //  We also need to wait for the onload handler to run, since the loadComplete
    //  will call Config and Startup, which need to modify the body.
    //
    MathJax.Hub.Register.StartupHook("onLoad",function () {
      setTimeout(MathJax.Callback(["loadComplete",CHTML,"jax.js"]),0);
    });
  });

  MathJax.Hub.Register.StartupHook("End Cookie", function () {  
    if (HUB.config.menuSettings.zoom !== "None")
      {AJAX.Require("[MathJax]/extensions/MathZoom.js")}
  });
    
})(MathJax.Ajax,MathJax.Hub,MathJax.HTML,MathJax.OutputJax.CommonHTML);
