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

/*
  var MESSAGE = function () {
    var data = [].slice.call(arguments,0);
    data[0][0] = ["CommonHTML",data[0][0]];
    return MathJax.Message.Set.apply(MathJax.Message,data);
  };
*/
   
  var EVENT, TOUCH, HOVER; // filled in later

  var FONTS = "'Times New Roman',Times,STIXGeneral,serif";
  var STYLES = {
    ".MJXc-script": {"font-size":".8em"},

    ".MJXc-right": {
      "-webkit-transform-origin":"right",
      "-moz-transform-origin":"right",
      "-ms-transform-origin":"right",
      "-o-transform-origin":"right",
      "transform-origin":"right"
    },

    ".MJXc-bold": {"font-weight":"bold"},
    ".MJXc-italic": {"font-style":"italic"},
    ".MJXc-scr": {"font-family":"MathJax_Script,"+FONTS},
    ".MJXc-frak": {"font-family":"MathJax_Fraktur,"+FONTS},
    ".MJXc-sf": {"font-family":"MathJax_SansSerif,"+FONTS},
    ".MJXc-cal": {"font-family":"MathJax_Caligraphic,"+FONTS},
    ".MJXc-mono": {"font-family":"MathJax_Typewriter,"+FONTS},
    ".MJXc-largeop": {"font-size":"150%"},
    ".MJXc-largeop.MJXc-int": {"vertical-align":"-.2em"},

    ".MJXc-math": {
      "display": "inline-block",
      "line-height": "1.2",
      "text-indent": "0",
      "font-family": FONTS,
      "white-space":"nowrap",
      "border-collapse":"collapse"
    },
    ".MJXc-display": {
      "display": "block",
      "text-align": "center",
      "margin": "1em 0"
    },
    ".MJXc-math span": {"display": "inline-block"},
    ".MJXc-box":  {"display":"block!important", "text-align": "center"},
    ".MJXc-box:after": {"content": '" "'},  // needed for when there is no DOCTYPE
    ".MJXc-rule": {"display":"block!important", "margin-top":".1em"},
    ".MJXc-char": {"display":"block!important"},

    ".MJXc-mo": {"margin": "0 .15em"},

    ".MJXc-mfrac": {"margin": "0 .125em", "vertical-align":".25em"},
    ".MJXc-denom": {"display": "inline-table!important", "width":"100%"},
    ".MJXc-denom > *": {"display": "table-row!important"},

    ".MJXc-surd": {"vertical-align":"top"},
    ".MJXc-surd > *": {"display":"block!important"},

    ".MJXc-script-box > * ": {"display":"table!important", "height":"50%"},
    ".MJXc-script-box > * > *": {"display":"table-cell!important","vertical-align":"top"},
    ".MJXc-script-box > *:last-child > *": {"vertical-align":"bottom"},
    ".MJXc-script-box > * > * > *": {"display":"block!important"},

    ".MJXc-mphantom": {"visibility": "hidden"},

    ".MJXc-munderover": {"display":"inline-table!important"},
    ".MJXc-over": {"display":"inline-block!important","text-align":"center"},
    ".MJXc-over > *": {"display":"block!important"},
    ".MJXc-munderover > *": {"display":"table-row!important"},

    ".MJXc-mtable": {"vertical-align":".25em", "margin":"0 .125em"},
    ".MJXc-mtable > *": {"display":"inline-table!important", "vertical-align":"middle"},
    ".MJXc-mtr": {"display":"table-row!important"},
    ".MJXc-mtd": {"display":"table-cell!important","text-align":"center","padding":".5em 0 0 .5em"},
    ".MJXc-mtr > .MJXc-mtd:first-child": {"padding-left":0},
    ".MJXc-mtr:first-child > .MJXc-mtd": {"padding-top":0},
    ".MJXc-mlabeledtr": {"display":"table-row!important"},
    ".MJXc-mlabeledtr > .MJXc-mtd:first-child": {"padding-left":0},
    ".MJXc-mlabeledtr:first-child > .MJXc-mtd": {"padding-top":0},
    
    ".MJXc-merror": {
      "background-color": "#FFFF88",
      color:   "#CC0000",
      border:  "1px solid #CC0000",
      padding: "1px 3px",
      "font-style": "normal",
      "font-size":  "90%"
    }
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

    hideProcessedMath: false,           // use display:none until all math is processed

    maxStretchyParts: 1000,            // limit the number of parts allowed for
                                       // stretchy operators. See issue 366.

    Config: function () {
      if (!this.require) {this.require = []}
      this.SUPER(arguments).Config.call(this); var settings = this.settings;
      if (settings.scale) {this.config.scale = settings.scale}
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
//      math.setTeXclass();
      try {math.toCommonHTML(span)} catch (err) {
        if (err.restart) {while (span.firstChild) {span.removeChild(span.firstChild)}}
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
    getHoverSpan: function (jax,math) {return jax.root.CHTMLspanElement()},
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
      this.idPostfix = "-zoom"; jax.root.toCHTML(span,span); this.idPostfix = "";
      //
      //  Get height and width of zoomed math and original math
      //
      span.style.position = "absolute";
      if (!width) {math.style.position = "absolute"}
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

    VARIANT: {
      "bold": "MJXc-bold",
      "italic": "MJXc-italic",
      "bold-italic": "MJXc-bold MJXc-italic",
      "script": "MJXc-scr",
      "bold-script": "MJXc-scr MJXc-bold",
      "fraktur": "MJXc-frak",
      "bold-fraktur": "MJXc-frak MJXc-bold",
      "monospace": "MJXc-mono",
      "sans-serif": "MJXc-sf",
      "-tex-caligraphic": "MJXc-cal"
    },
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

      thin: .08,
      medium: .1,
      thick: .15,

      infinity: BIGDIMEN
    },
    TeX: {
      x_height:         .430554
    },
    pxPerInch: 72,
    em: 16,

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

    REMAPACCENT: {
      "\u20D7":"\u2192",  // vector arrow
      "'": "\u02CB",
      "`": "\u02CA",
      ".": "\u02D9",
      "^": "\u02C6",
      "-": "\u02C9",
      "~": "\u02DC",
      "\u00AF": "\u02C9",  // macron
      "\u00B0": "\u02DA",  // degree sign
      "\u00B4": "\u02CA",  // acute accent
      "\u0300": "\u02CB",  // combining grave
      "\u0301": "\u02CA",  // combining acute
      "\u0302": "\u02C6",  // combining circumflex
      "\u0303": "\u02DC",  // combinig tilde
      "\u0304": "\u02C9",  // combining macron
      "\u0305": "\u02C9",  // combining overline
      "\u0306": "\u02D8",  // combining breve 
      "\u0307": "\u02D9",  // combining dot
      "\u0308": "\u00A8",  // combining double dot
      "\u030C": "\u02C7"   // combining caron
    },
    REMAPACCENTUNDER: {
    },
    
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
      if (unit === "ex") {return m * this.TeX.x_height}
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

    arrayEntry: function (a,i) {return a[Math.max(0,Math.min(i,a.length-1))]}

  });

  MathJax.Hub.Register.StartupHook("mml Jax Ready",function () {
    MML = MathJax.ElementJax.mml;

    MML.mbase.Augment({
      toCommonHTML: function (span,options) {
        return this.CHTMLdefaultSpan(span,options);
      },

      CHTMLdefaultSpan: function (span,options) {
        if (!options) options = {};
        span = this.CHTMLcreateSpan(span);
        this.CHTMLhandleStyle(span);
        this.CHTMLhandleColor(span);
        if (this.isToken) this.CHTMLhandleToken(span);
        for (var i = 0, m = this.data.length; i < m; i++) this.CHTMLaddChild(span,i,options);
        return span;
      },
      CHTMLaddChild: function (span,i,options) {
        var child = this.data[i];
        if (child) {
          if (options.childSpans)
            span = HTML.addElement(span,"span",{className:options.className});
          child.toCommonHTML(span);
          if (!options.noBBox) {
            this.CHTML.w += child.CHTML.w + child.CHTML.l + child.CHTML.r;
            if (child.CHTML.h > this.CHTML.h) this.CHTML.h = child.CHTML.h;
            if (child.CHTML.d > this.CHTML.d) this.CHTML.d = child.CHTML.d;
            if (child.CHTML.t > this.CHTML.t) this.CHTML.t = child.CHTML.t;
            if (child.CHTML.b > this.CHTML.b) this.CHTML.b = child.CHTML.b;
          }
        } else if (options.forceChild) {HTML.addElement(span,"span")}
      },
      CHTMLstretchChild: function (i,H,D) {
        var data = this.data[i];
        if (data && data.CHTMLcanStretch("Vertical",H,D)) {
          var bbox = this.CHTML, dbox = data.CHTML, w = dbox.w;
          data.CHTMLstretchV(H,D);
          bbox.w += dbox.w - w;
          if (dbox.h > bbox.h) bbox.h = dbox.h;
          if (dbox.d > bbox.d) bbox.d = dbox.d;
        }
      },

      CHTMLcreateSpan: function (span) {
        if (!this.CHTML) this.CHTML = {};
        this.CHTML = {w:0, h:0, d:0, l:0, r:0, t:0, b:0};
        if (this.inferred) return span;
        //  ### FIXME:  This is a hack to handle the different spacing of the
        //  ### integral sign in Times compared to CM fonts
        if (this.type === "mo" && this.data.join("") === "\u222B") {CHTML.lastIsInt = true}
        else if (this.type !== "mspace" || this.width !== "negativethinmathspace") {CHTML.lastIsInt = false}
        //  ###
        if (!this.CHTMLspanID) {this.CHTMLspanID = CHTML.GetID()};
        var id = (this.id || "MJXc-Span-"+this.CHTMLspanID);
        return HTML.addElement(span,"span",{className:"MJXc-"+this.type, id:id});
      },
      CHTMLspanElement: function () {
        if (!this.CHTMLspanID) {return null}
        return document.getElementById(this.id||"MJXc-Span-"+this.CHTMLspanID);
      },

      CHTMLhandleToken: function (span) {
        var values = this.getValues("mathvariant");
        if (values.mathvariant !== MML.VARIANT.NORMAL) {
          span.className += " "+CHTML.VARIANT[values.mathvariant];
        }
      },

      CHTMLhandleStyle: function (span) {
        if (this.style) span.style.cssText = this.style;
      },

      CHTMLhandleColor: function (span) {
        if (this.mathcolor) {span.style.color = this.mathcolor}
        if (this.mathbackground) {span.style.backgroundColor = this.mathbackground}
      },

      CHTMLhandleScriptlevel: function (span) {
        // ### FIXME:  Need to prevent getting too small
        // ### and should keep track of scaling so it can be compensated for
        var level = this.Get("scriptlevel");
        if (level) span.className += " MJXc-script";
      },

      CHTMLhandleText: function (span,text) {
        var c, n;
        var H = 0, D = 0, W = 0;
        for (var i = 0, m = text.length; i < m; i++) {
          n = text.charCodeAt(i); c = text.charAt(i);
          if (n >= 0xD800 && n < 0xDBFF) {
            i++; n = (((n-0xD800)<<10)+(text.charCodeAt(i)-0xDC00))+0x10000;
          }
          var h = .7, d = .22, w = .5;
          if (n < 127) {
            if (c.match(/[A-Za-ehik-or-xz0-9]/)) d = 0;
            if (c.match(/[A-HK-Z]/)) {w = .67} else if (c.match(/[IJ]/)) {w = .36}
            if (c.match(/[acegm-su-z]/)) {h = .45} else if (c.match(/[ij]/)) {h = .75}
            if (c.match(/[ijlt]/)) w = .28;
          }
          if (CHTML.DELIMITERS[c]) {w = CHTML.DELIMITERS[c].w || .4}
          // ### FIXME:  handle Greek
          // ### Combining diacriticals (all sets), spacing modifiers
          // ### arrows (all sets), widths of braces
          if (h > H) H = h; if (d > D) D = d; W += w;
        }
        if (!this.CHML) this.CHTML = {};
        this.CHTML = {h:.9, d:.3, w:W, l:0, r:0, t:H, b:D};
        HTML.addText(span,text);
//  ### FIXME:  use this to get proper bounding boxes in the future
//      this.CHTML = {h:H, d:D, w:W, l:0, r:0};
//      HTML.addElement(span,"span",{className:"MJXc-char",style:{
//        "margin-top":CHTML.Em(H-.9), "margin-bottom":CHTML.Em(D-.25)
//      }},[text]);
      },

      CHTMLbboxFor: function (n) {
        if (this.data[n] && this.data[n].CHTML) return this.data[n].CHTML;
        return {w:0, h:0, d:0, l:0, r:0, t:0, b:0};
      },

      CHTMLcanStretch: function (direction,H,D) {
        if (this.isEmbellished()) {
          var core = this.Core();
          if (core && core !== this) {return core.CHTMLcanStretch(direction,H,D)}
        }
        return false;
      },
      CHTMLstretchV: function (h,d) {},
      CHTMLstretchH: function (w) {},

      CoreParent: function () {
        var parent = this;
        while (parent && parent.isEmbellished() &&
               parent.CoreMO() === this && !parent.isa(MML.math)) {parent = parent.Parent()}
        return parent;
      },
      CoreText: function (parent) {
        if (!parent) {return ""}
        if (parent.isEmbellished()) {return parent.CoreMO().data.join("")}
        while ((parent.isa(MML.mrow) || parent.isa(MML.TeXAtom) ||
                parent.isa(MML.mstyle) || parent.isa(MML.mphantom)) &&
                parent.data.length === 1 && parent.data[0]) {parent = parent.data[0]}
        if (!parent.isToken) {return ""} else {return parent.data.join("")}
      }

    });

    MML.chars.Augment({
      toCommonHTML: function (span) {
        var text = this.toString().replace(/[\u2061-\u2064]/g,"");
        this.CHTMLhandleText(span,text);
      }
    });
    MML.entity.Augment({
      toCommonHTML: function (span) {
        var text = this.toString().replace(/[\u2061-\u2064]/g,"");
        this.CHTMLhandleText(span,text);
      }
    });

    MML.math.Augment({
      toCommonHTML: function (span) {
        span = this.CHTMLdefaultSpan(span);
        if (this.Get("display") === "block") {span.className += " MJXc-display"}
        return span;
      }
    });

    MML.mo.Augment({
      toCommonHTML: function (span) {
        span = this.CHTMLdefaultSpan(span);
        this.CHTMLadjustAccent(span);
        var values = this.getValues("lspace","rspace","scriptlevel","displaystyle","largeop");
        if (values.scriptlevel === 0) {
          this.CHTML.l = CHTML.length2em(values.lspace);
          this.CHTML.r = CHTML.length2em(values.rspace);
          span.style.marginLeft = CHTML.Em(this.CHTML.l);
          span.style.marginRight = CHTML.Em(this.CHTML.r);
        } else {
          this.CHTML.l = .15;
          this.CHTML.r = .1;
        }
        if (values.displaystyle && values.largeop) {
          var box = HTML.Element("span",{className:"MJXc-largeop"});
          box.appendChild(span.firstChild); span.appendChild(box);
          this.CHTML.h *= 1.2; this.CHTML.d *= 1.2;
          if (this.data.join("") === "\u222B") box.className += " MJXc-int";
        }
        // ### FIXME:  Handle embellished op spacing
        // ### FIXME:  Remap minus signs
        return span;
      },
      CHTMLadjustAccent: function (span) {
        var parent = this.CoreParent();
        if (parent && parent.isa(MML.munderover) && 
            this.CoreText(parent.data[parent.base]).length === 1) {
          var over = parent.data[parent.over], under = parent.data[parent.under];
          var c = this.data.join(""), C;
          if (over && this === over.CoreMO() && parent.Get("accent")) {C = CHTML.REMAPACCENT[c]}
          else if (under && this === under.CoreMO() && parent.Get("accentunder")) {C = CHTML.REMAPACCENTUNDER[c]}
          if (C) c = span.innerHTML = C;
          if (c.match(/[\u02C6-\u02DC\u00A8]/)) {this.CHTML.acc = -.52}
          else if (c === "\u2192") {this.CHTML.acc = -.15; this.CHTML.vec = true}
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
        var span = this.CHTMLspanElement(), bbox = this.CHTML; //bbox.w = .4; // ## adjust width
        var values = this.getValues("symmetric","maxsize","minsize");
        if (values.symmetric) {H = 2*Math.max(h-.25,d+.25)} else {H = h + d}
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
        box.appendChild(span.firstChild); span.appendChild(box);
        if (values.symmetric) span.style.verticalAlign = CHTML.Em(.25*(1-scale));
      }
    });

    MML.mspace.Augment({
      toCommonHTML: function (span) {
        span = this.CHTMLdefaultSpan(span);
        var values = this.getValues("height","depth","width");
        var w = CHTML.length2em(values.width),
            h = CHTML.length2em(values.height),
            d = CHTML.length2em(values.depth);
        var bbox = this.CHTML;
        bbox.w = w; bbox.h = h; bbox.d = d;
        if (w < 0) {
          //  ### FIXME:  lastIsInt hack
          if (!CHTML.lastIsInt) span.style.marginLeft = CHTML.Em(w);
          w = 0;
        }
        span.style.width = CHTML.Em(w);
        span.style.height = CHTML.Em(h+d);
        if (d) span.style.verticalAlign = CHTML.Em(-d);
        return span;
      }
    });

    MML.mpadded.Augment({
      toCommonHTML: function (span) {
        span = this.CHTMLdefaultSpan(span,{
          childSpans:true, className:"MJXc-box", forceChild:true
        });
        var child = span.firstChild;
        var values = this.getValues("width","height","depth","lspace","voffset");
        var dimen = this.CHTMLdimen(values.lspace);
        var T = 0, B = 0, L = dimen.len, R = -dimen.len, V = 0;
        if (values.width !== "") {
          dimen = this.CHTMLdimen(values.width,"w",0);
          if (dimen.pm) {R += dimen.len} else {span.style.width = CHTML.Em(dimen.len)}
        }
        if (values.height !== "") {
          dimen = this.CHTMLdimen(values.height,"h",0);
          if (!dimen.pm) T += -this.CHTMLbboxFor(0).h;
          T += dimen.len;
        }
        if (values.depth !== "")  {
          dimen = this.CHTMLdimen(values.depth,"d",0);
          if (!dimen.pm) {B += -this.CHTMLbboxFor(0).d; V += -dimen.len}
          B += dimen.len;
        }
        if (values.voffset !== "") {
          dimen = this.CHTMLdimen(values.voffset);
          T -= dimen.len; B += dimen.len;
          V += dimen.len;
        }
        if (T) child.style.marginTop = CHTML.Em(T);
        if (B) child.style.marginBottom = CHTML.Em(B);
        if (L) child.style.marginLeft = CHTML.Em(L);
        if (R) child.style.marginRight = CHTML.Em(R);
        if (V) span.style.verticalAlign = CHTML.Em(V);
        return span;
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
      toCommonHTML: function (span) {
	var values = this.getValues("displaystyle","accent","accentunder","align");
	if (!values.displaystyle && this.data[this.base] != null &&
	    this.data[this.base].CoreMO().Get("movablelimits")) {
          span = MML.msubsup.prototype.toCommonHTML.call(this,span);
          //
          //  Change class to msubsup for CSS rules.
          //  ### FIXME: should this be handled via adding another class instead?
          //
          span.className = span.className.replace(/munderover/,"msubsup");
          return span;
        }
        span = this.CHTMLdefaultSpan(span,{childSpans:true, className:"", noBBox:true});
        var obox = this.CHTMLbboxFor(this.over),
            ubox = this.CHTMLbboxFor(this.under),
            bbox = this.CHTMLbboxFor(this.base),
            BBOX = this.CHTML, acc = obox.acc;
        if (this.data[this.over]) {
          span.lastChild.firstChild.style.marginLeft = obox.l =
            span.lastChild.firstChild.style.marginRight = obox.r = 0;
          var over = HTML.Element("span",{},[["span",{className:"MJXc-over"}]]);
          over.firstChild.appendChild(span.lastChild);
          if (span.childNodes.length > (this.data[this.under] ? 1 : 0))
            over.firstChild.appendChild(span.firstChild);
          this.data[this.over].CHTMLhandleScriptlevel(over.firstChild.firstChild);
          if (acc != null) {
            if (obox.vec) {
              over.firstChild.firstChild.firstChild.style.fontSize = "60%";
              obox.h *= .6; obox.d *= .6; obox.w *= .6;
            }
            acc = acc - obox.d + .1; if (bbox.t != null) {acc += bbox.t - bbox.h}
            over.firstChild.firstChild.style.marginBottom = CHTML.Em(acc);
          }
          if (span.firstChild) {span.insertBefore(over,span.firstChild)}
            else {span.appendChild(over)}
        }
        if (this.data[this.under]) {
          span.lastChild.firstChild.style.marginLeft = ubox.l =
            span.lastChild.firstChild.marginRight = ubox.r = 0;
          this.data[this.under].CHTMLhandleScriptlevel(span.lastChild);
        }
        BBOX.w = Math.max(.8*obox.w,.8*ubox.w,bbox.w);
        BBOX.h = .8*(obox.h+obox.d+(acc||0)) + bbox.h;
        BBOX.d = bbox.d + .8*(ubox.h+ubox.d);
        return span;
      }
    });

    MML.msubsup.Augment({
      toCommonHTML: function (span) {
        span = this.CHTMLdefaultSpan(span,{noBBox:true});
        if (!this.data[this.base]) {
          if (span.firstChild) {span.insertBefore(HTML.Element("span"),span.firstChild)}
            else {span.appendChild(HTML.Element("span"))}
        }
        var base = this.data[this.base], sub = this.data[this.sub], sup = this.data[this.sup];
        if (!base) base = {bbox: {h:.8, d:.2}};
        span.firstChild.style.marginRight = ".05em";
        var h = Math.max(.4,base.CHTML.h-.4),
            d = Math.max(.2,base.CHTML.d+.1);
        var bbox = this.CHTML;
        if (sup && sub) {
          var box = HTML.Element("span",{className:"MJXc-script-box", style:{
            height: CHTML.Em(h+sup.CHTML.h*.8 + d+sub.CHTML.d*.8),
            "vertical-align": CHTML.Em(-d-sub.CHTML.d*.8)
          }},[
            ["span",{},[["span",{},[["span",{
              style:{"margin-bottom":CHTML.Em(-(sup.CHTML.d-.05))}
            }]]]]],
            ["span",{},[["span",{},[["span",{
              style:{"margin-top":CHTML.Em(-(sup.CHTML.h-.05))}
            }]]]]]
          ]);
          sub.CHTMLhandleScriptlevel(box.firstChild);
          sup.CHTMLhandleScriptlevel(box.lastChild);
          box.firstChild.firstChild.firstChild.appendChild(span.lastChild);
          box.lastChild.firstChild.firstChild.appendChild(span.lastChild);
          span.appendChild(box);
          bbox.h = Math.max(base.CHTML.h,sup.CHTML.h*.8+h);
          bbox.d = Math.max(base.CHTML.d,sub.CHTML.d*.8+d);
          bbox.w = base.CHTML.w + Math.max(sup.CHTML.w,sub.CHTML.w) + .07;
        } else if (sup) {
          span.lastChild.style.verticalAlign = CHTML.Em(h);
          sup.CHTMLhandleScriptlevel(span.lastChild);
          bbox.h = Math.max(base.CHTML.h,sup.CHTML.h*.8+h);
          bbox.d = Math.max(base.CHTML.d,sup.CHTML.d*.8-h);
          bbox.w = base.CHTML.w + sup.CHTML.w + .07;
        } else if (sub) {
          span.lastChild.style.verticalAlign = CHTML.Em(-d);
          sub.CHTMLhandleScriptlevel(span.lastChild);
          bbox.h = Math.max(base.CHTML.h,sub.CHTML.h*.8-d);
          bbox.d = Math.max(base.CHTML.d,sub.CHTML.d*.8+d);
          bbox.w = base.CHTML.w + sub.CHTML.w + .07;
        }
        return span;
      }
    });

    MML.mfrac.Augment({
      toCommonHTML: function (span) {
        span = this.CHTMLdefaultSpan(span,{
          childSpans:true, className:"MJXc-box", forceChild:true, noBBox:true
        });
        var values = this.getValues("linethickness","displaystyle");
        if (!values.displaystyle) {
          if (this.data[0]) this.data[0].CHTMLhandleScriptlevel(span.firstChild);
          if (this.data[1]) this.data[1].CHTMLhandleScriptlevel(span.lastChild);
        }
        var denom = HTML.Element("span",{className:"MJXc-box",style:{"margin-top":"-.8em"}},[
          ["span",{className:"MJXc-denom"},[                        // inline-table
            ["span",{},[["span",{className:"MJXc-rule"}]]],["span"] // spans are table-row
          ]]
        ]);
        denom.firstChild.lastChild.appendChild(span.lastChild);
        span.appendChild(denom);
        var nbox = this.CHTMLbboxFor(0), dbox = this.CHTMLbboxFor(1), bbox = this.CHTML;
        bbox.w = Math.max(nbox.w,dbox.w) * .8;
        bbox.h = nbox.h+nbox.d + .1 + .25;
        bbox.d = dbox.h+dbox.d - .25;
        bbox.l = bbox.r = .125;
        values.linethickness = Math.max(0,CHTML.length2em(values.linethickness||"0",0));
        if (values.linethickness) {
          var rule = denom.firstChild.firstChild.firstChild;
          var t = CHTML.Em(values.linethickness);
          rule.style.borderTop = (values.linethickness < .15 ? "1px" : t)+" solid";
          rule.style.margin = t+" 0";
          t = values.linethickness;
          denom.style.marginTop = CHTML.Em(3*t-.9);
          span.style.verticalAlign = CHTML.Em(1.5*t + .1);
          bbox.h += 1.5*t - .1; bbox.d += 1.5*t;
        }
        return span;
      }
    });

    MML.msqrt.Augment({
      toCommonHTML: function (span) {
        span = this.CHTMLdefaultSpan(span,{
          childSpans:true, className:"MJXc-box", forceChild:true, noBBox:true
        });
        this.CHTMLlayoutRoot(span,span.firstChild);
        return span;
      },
      CHTMLlayoutRoot: function (span,base) {
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
        span.appendChild(surd);
        span.appendChild(root);
        this.CHTML.h = bbox.h + .18; this.CHTML.d = bbox.d;
        this.CHTML.w = bbox.w + W; 
        return span;
      }
    });

    MML.mroot.Augment({
      toCommonHTML: function (span) {
        span = this.CHTMLdefaultSpan(span,{
          childSpans:true, className:"MJXc-box", forceChild:true, noBBox:true
        });
        var rbox = this.CHTMLbboxFor(1), root = span.removeChild(span.lastChild);
        var sqrt = this.CHTMLlayoutRoot(HTML.Element("span"),span.firstChild);
        root.className = "MJXc-script";  // ### FIXME: should be scriptscript
        var scale = parseInt(sqrt.firstChild.firstChild.style.fontSize);
        var v = .55*(scale/120) + rbox.d*.8, r = -.6*(scale/120);
        if (scale > 150) {r *= .95*Math.ceil(150/scale*10)/10}
        root.style.marginRight = CHTML.Em(r); root.style.verticalAlign = CHTML.Em(v);
        if (-r > rbox.w*.8) root.style.marginLeft = CHTML.Em(-r-rbox.w*.8); // ### depends on rbox.w
        span.appendChild(root); span.appendChild(sqrt);
        this.CHTML.w += Math.max(0,rbox.w*.8+r);
        this.CHTML.h = Math.max(this.CHTML.h,rbox.h*.8+v);
        return span;
      },
      CHTMLlayoutRoot: MML.msqrt.prototype.CHTMLlayoutRoot
    });
    
    MML.mfenced.Augment({
      toCommonHTML: function (span) {
        span = this.CHTMLcreateSpan(span);
        this.CHTMLhandleStyle(span);
        this.CHTMLhandleColor(span);
        //
        //  Make row of open, data, sep, ... data, close
        //
        this.addFakeNodes();
        this.CHTMLaddChild(span,"open",{});
        for (var i = 0, m = this.data.length; i < m; i++) {
          this.CHTMLaddChild(span,"sep"+i,{});
          this.CHTMLaddChild(span,i,{});
        }
        this.CHTMLaddChild(span,"close",{});
        //
        //  Check for streching the elements
        //
        var H = this.CHTML.h, D = this.CHTML.d;
        this.CHTMLstretchChild("open",H,D);
        for (i = 0, m = this.data.length; i < m; i++) {
          this.CHTMLstretchChild("sep"+i,H,D);
          this.CHTMLstretchChild(i,H,D);
        }
        this.CHTMLstretchChild("close",H,D);
        return span;
      }
    });

    MML.mrow.Augment({
      toCommonHTML: function (span) {
        span = this.CHTMLdefaultSpan(span);
        var H = this.CHTML.h, D = this.CHTML.d;
        for (var i = 0, m = this.data.length; i < m; i++) this.CHTMLstretchChild(i,H,D);
        return span;
      }
    });

    MML.mstyle.Augment({
      toCommonHTML: function (span) {
        span = this.CHTMLdefaultSpan(span);
        this.CHTMLhandleScriptlevel(span);
        return span;
      }
    });

    MML.TeXAtom.Augment({
      toCommonHTML: function (span) {
        span = this.CHTMLdefaultSpan(span);
        // ### FIXME: handle TeX class?
        span.className = "MJXc-mrow";
        return span;
      }
    });

    MML.mtable.Augment({
      toCommonHTML: function (span) {
        span = this.CHTMLdefaultSpan(span,{noBBox:true});
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

        var table = HTML.Element("span");
        while (span.firstChild) table.appendChild(span.firstChild);
        span.appendChild(table);
        var H = 0, W = 0;
        for (i = 0, m = this.data.length; i < m; i++) {
          var row = this.data[i];
          if (row) {
            var rspace = CHTML.arrayEntry(RSPACE,i-1), ralign = CHTML.arrayEntry(RALIGN,i);
            var rbox = row.CHTML, rspan = row.CHTMLspanElement();
            rspan.style.verticalAlign = ralign;
            var k = (row.type === "mlabeledtr" ? 1 : 0);
            for (j = 0, n = row.data.length; j < n-k; j++) {
              var cell = row.data[j+k];
              if (cell) {
                var cspace = CHTML.arrayEntry(CSPACE,j-1), calign = CHTML.arrayEntry(CALIGN,j);
                var /*cbox = cell.CHTML,*/ cspan = cell.CHTMLspanElement();
                if (j) {rbox.w += cspace; cspan.style.paddingLeft = CHTML.Em(cspace)}
                if (i) cspan.style.paddingTop = CHTML.Em(rspace);
                cspan.style.textAlign = calign;
              }
            }
            H += rbox.h + rbox.d; if (i) {H += rspace}
            if (rbox.w > W) W = rbox.w;
          }
        }
        var bbox = this.CHTML;
        bbox.w = W; bbox.h = H/2 + .25; bbox.d = H/2 - .25;
        bbox.l = bbox.r = .125;
        return span;
      }
    });
    MML.mlabeledtr.Augment({
      CHTMLdefaultSpan: function (span,options) {
        if (!options) options = {};
        span = this.CHTMLcreateSpan(span);
        this.CHTMLhandleStyle(span);
        this.CHTMLhandleColor(span);
        if (this.isToken) this.CHTMLhandleToken(span);
        // skip label for now
        for (var i = 1, m = this.data.length; i < m; i++) this.CHTMLaddChild(span,i,options);
        return span;
      }
    });

    MML.semantics.Augment({
      toCommonHTML: function (span) {
        span = this.CHTMLcreateSpan(span);
        if (this.data[0]) {
          this.data[0].toCommonHTML(span);
          MathJax.Hub.Insert(this.data[0].CHTML||{},this.CHTML);
        }
        return span;
      }
    });
    MML.annotation.Augment({toCommonHTML: function(span) {}});
    MML["annotation-xml"].Augment({toCommonHTML: function(span) {}});

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
