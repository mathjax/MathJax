/*************************************************************
 *
 *  MathJax/extensions/MathZoom.js
 *  
 *  Implements the zoom feature for enlarging math expressions.  It is
 *  loaded automatically when the Zoom menu selection changes from "None".
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2010-2011 Design Science, Inc.
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

(function (HUB,HTML,AJAX,HTMLCSS,nMML) {
  var VERSION = "1.1.3";
  
  var CONFIG = HUB.CombineConfig("MathZoom",{
    delay: 400,   // mouse must be still this long (milliseconds)

    styles: {
      //
      //  The styles for the MathZoom display box
      //
      "#MathJax_Zoom": {
        position:"absolute", "background-color":"#F0F0F0", overflow:"auto",
        display:"block", "z-index":301, padding:".5em", border:"1px solid black", margin:0,
        "font-family":"serif", "font-size":"85%", "font-weight":"normal",
        "font-style":"normal", "text-align":"left", "text-indent":0, "text-transform":"none",
        "line-height":"normal", "letter-spacing":"normal", "word-spacing":"normal",
        "word-wrap":"normal", "white-space":"nowrap", "float":"none",
        "box-shadow":"5px 5px 15px #AAAAAA",         // Opera 10.5 and IE9
        "-webkit-box-shadow":"5px 5px 15px #AAAAAA", // Safari 3 and Chrome
        "-moz-box-shadow":"5px 5px 15px #AAAAAA",    // Forefox 3.5
        "-khtml-box-shadow":"5px 5px 15px #AAAAAA",  // Konqueror
        filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')" // IE
      },
      
      //
      //  The styles for the hidden overlay (should not need to be adjusted by the page author)
      //
      "#MathJax_ZoomOverlay": {
        position:"absolute", left:0, top:0, "z-index":300, display:"inline-block",
        width:"100%", height:"100%", border:0, padding:0, margin:0,
        "background-color":"white", opacity:0, filter:"alpha(opacity=0)"
      }
    }
  });
  
  var FALSE, HOVER;
  MathJax.Hub.Register.StartupHook("MathEvents Ready",function () {
    FALSE = MathJax.Extension.MathEvents.Event.False;
    HOVER = MathJax.Extension.MathEvents.Hover;
  });

  /*************************************************************/

  var ZOOM = MathJax.Extension.MathZoom = {
    version: VERSION,
    settings: HUB.config.menuSettings,

    //
    //  Process events passed from output jax
    //
    HandleEvent: function (event,type,math) {
      if (ZOOM.settings.CTRL  && !event.ctrlKey)  return true;
      if (ZOOM.settings.ALT   && !event.altKey)   return true;
      if (ZOOM.settings.CMD   && !event.metaKey)  return true;
      if (ZOOM.settings.Shift && !event.shiftKey) return true;
      if (!ZOOM[type]) return true;
      return ZOOM[type](event,math);
    },
    
    //
    //  Zoom on click
    //
    Click: function (event,math) {
      if (this.settings.zoom === "Click") {return this.Zoom(math,event)}
    },
    
    //
    //  Zoom on double click
    //
    DblClick: function (event,math) {
      if (this.settings.zoom === "Double-Click") {return this.Zoom(math,event)}
    },
    
    //
    //  Zoom on hover (called by UI.Hover)
    //
    Hover: function (event,math) {
      if (this.settings.zoom === "Hover") {this.Zoom(math,event); return true}
      return false;
    },
    
    
    //
    //  Handle the actual zooming
    //
    Zoom: function (math,event) {
      this.Remove(); HOVER.ClearHoverTimer();
      
      //
      //  Find the jax and its type
      //
      var parent = math.parentNode;
      if (parent.className === "MathJax_MathContainer") {parent = parent.parentNode}
      if (parent.parentNode.className === "MathJax_MathContainer") {parent = parent.parentNode.parentNode}
      var script = (String(parent.className).match(/^MathJax_(MathML|Display)$/) ? parent : math).nextSibling;
      var jax = HUB.getJaxFor(script), root = jax.root;
      var JAX = (HTMLCSS && jax.outputJax.isa(HTMLCSS.constructor) ? "HTMLCSS" :
                (nMML && jax.outputJax.isa(nMML.constructor) ? "MathML" : null));
      if (!JAX) return; //  FIXME:  report an error?
      if (jax.hover) {HOVER.UnHover(jax)}

      //
      //  Create the DOM elements for the zoom box
      //
      var Mw = Math.floor(.85*document.body.clientWidth),
          Mh = Math.floor(.85*document.body.clientHeight);
      var div = HTML.Element(
        "span",{
            style: {position:"relative", display:"inline-block", height:0, width:0},
            id:"MathJax_ZoomFrame"
        },[
          ["span",{id:"MathJax_ZoomOverlay", onmousedown:this.Remove}],
          ["span",{
            id:"MathJax_Zoom", onclick: this.Remove,
            style:{
              visibility:"hidden", fontSize:this.settings.zscale,
              "max-width":Mw+"px", "max-height":Mh+"px"
            }
          },[["span"]]]
        ]
      );
      var zoom = div.lastChild, span = zoom.firstChild, overlay = div.firstChild;
      math.parentNode.insertBefore(div,math);

      //
      //  Display the zoomed math
      //
      if (this.msieZIndexBug) {
        //  MSIE doesn't do z-index properly, so move the div to the document.body,
        //  and use an empty span as a tracker for the usual position
        var tracker = HTML.addElement(document.body,"img",{
          src:"about:blank", id:"MathJax_ZoomTracker", width: 0, height: 0,
          style:{width:0, height:0, position:"relative"}
        });
        div.style.position = "relative";
        div.style.zIndex = CONFIG.styles["#MathJax_ZoomOverlay"]["z-index"];
        div = tracker;
      }

      var bbox = (this["Zoom"+JAX])(root,span,math,Mw,Mh);
      
      //
      //  Fix up size and position for browsers with bugs (IE)
      //
      if (this.msiePositionBug) {
        if (this.msieSizeBug) 
          {zoom.style.height = bbox.zH+"px"; zoom.style.width = bbox.zW+"px"} // IE8 gets the dimensions completely wrong
        if (zoom.offsetHeight > Mh) {zoom.style.height = Mh+"px"}  // IE doesn't do max-height?
        if (zoom.offsetWidth  > Mw) {zoom.style.width  = Mw+"px"}
        if (math.nextSibling) {math.parentNode.insertBefore(div,math.nextSibling)}
          else {parent.appendChild(div)}                           // needs to be after to be above?
      }
      if (this.operaPositionBug) {zoom.style.width = Math.min(Mw,bbox.zW)+"px"}  // Opera gets width as 0?
      if (zoom.offsetWidth <= Mw && zoom.offsetHeight <= Mh) {zoom.style.overflow = "visible"}
      this.Position(zoom,bbox,(JAX === "MathML" && parent.nodeName.toLowerCase() === "div"));
      zoom.style.visibility = "";

      //
      //  Add event handlers
      //
      if (this.settings.zoom === "Hover") {overlay.onmouseover = this.Remove}
      if (window.addEventListener) {addEventListener("resize",this.Resize,false)}
      else if (window.attachEvent) {attachEvent("onresize",this.Resize)}
      else {this.onresize = window.onresize; window.onresize = this.Resize}
      
      //
      //  Canel further actions
      //
      return FALSE(event);
    },
    
    //
    //  Handle the jax-specific output
    //
    ZoomHTMLCSS: function (root,span,math,Mw,Mh) {
      //
      //  Re-render at larger size
      //
      span.className = "MathJax";
      HTMLCSS.idPostfix = "-zoom";
      HTMLCSS.getScales(span,span);
      root.toHTML(span,span);
      var bbox = root.HTMLspanElement().bbox;
      HTMLCSS.idPostfix = "";
      if (bbox.width) {
        //  Handle full-width displayed equations
        //  FIXME: this is a hack for now
        span.style.width = Math.floor(Mw-1.5*HTMLCSS.em)+"px"; span.style.display="inline-block";
        var id = (root.id||"MathJax-Span-"+root.spanID)+"-zoom";
        var child = document.getElementById(id).firstChild;
        while (child && child.style.width !== bbox.width) {child = child.nextSibling}
        if (child) {child.style.width = "100%"}
      }
      //
      //  Get height and width of zoomed math and original math
      //
      span.style.position = math.style.position = "absolute";
      var zW = span.offsetWidth, zH = span.offsetHeight,
          mH = math.offsetHeight, mW = math.offsetWidth;
      span.style.position = math.style.position = "";
      if (mW === 0) {mW = math.offseWidth || math.parentNode.offsetWidth}; // IE7 gets mW == 0?
      //
      return {Y:-this.getTop(root,span,math,this.msieTopBug,this.msieBorderBug,false),
              mW:mW, mH:mH, zW:zW, zH:zH};
    },
    ZoomMathML: function (root,span,math) {
      root.toNativeMML(span,span);
      var top = this.getTop(root,span,math,this.msieTopMMLBug,false,this.ffMMLdisplayBug);
      var mW = math.offsetWidth  || math.scrollWidth,
          mH = math.offsetHeight || math.scrollHeight;
      if (this.msieIE8HeightBug) {span.style.position = "absolute"}
      var zW = span.offsetWidth, zH = span.offsetHeight;
      if (this.msieIE8HeightBug) {span.style.position = ""}
      if (this.ffMMLdisplayBug) {
        // Force width in FF, since it gets the math element width wrong
        span.style.display="inline-block";
        span.style.width = zW+"px";
      }
      return {Y:-top, mW:mW, mH:mH, zW:zW, zH:zH}
    },
    
    //
    //  Get top offset from baseline
    //
    getTop: function (root,span,math,topBug,borderBug,mmlBug) {
      span.appendChild(this.topImg);
      if (mmlBug && math.getAttribute("display") === "block") {
        // FF breaks between the display math and the image, so 
        // convert display to inline with displaystyle true
        math.setAttribute("display","inline"); math.MJinline = true;
        var mstyle = root.NativeMMLelement("mstyle");
        while (math.firstChild) {mstyle.appendChild(math.firstChild)}
        math.appendChild(mstyle); mstyle.setAttribute("displaystyle","true");
      }
      if (math.MJinline) {
        // FF breaks between the display math and the image, so 
        // convert display to inline with displaystyle true
        span.insertBefore(this.topImg,span.firstChild);
        var zmath = span.childNodes[1], zstyle = root.NativeMMLelement("mstyle");
        zmath.setAttribute("display","inline");
        while (zmath.firstChild) {zstyle.appendChild(zmath.firstChild)}
        zmath.appendChild(zstyle); zstyle.setAttribute("displaystyle","true");
        zstyle.setAttribute("displaystyle","true");
      }
      var top = this.topImg.offsetTop;
      if (topBug) {
        // For IE, frame is not at the baseline, so remove extra height
        var wrap = math.parentNode.style.whiteSpace;
        math.parentNode.style.whiteSpace = "nowrap";
        math.parentNode.insertBefore(this.topImg,math);
        top -= this.topImg.offsetTop - span.parentNode.parentNode.offsetTop;
        math.parentNode.style.whiteSpace = wrap;
      }
      if (borderBug) {top += Math.floor(.5*HTMLCSS.em)} // adjust for zoom box padding
      this.topImg.parentNode.removeChild(this.topImg);
      return top;
    },
    
    //
    //  Set the position of the zoom box and overlay
    //
    Position: function (zoom,bbox,MMLdisplay) {
      var XY = this.Resize(), x = XY.x, y = XY.y, W = bbox.mW;
      if (this.msieIE8Bug) {W = -W}
      var dx = -Math.floor((zoom.offsetWidth-W)/2), dy = bbox.Y;
      zoom.style.left = Math.max(dx,10-x)+"px"; zoom.style.top = Math.max(dy,10-y)+"px";
    },
    
    //
    //  Handle resizing of overlay while zoom is displayed
    //
    Resize: function (event) {
      if (ZOOM.onresize) {ZOOM.onresize(event)}
      var x = 0, y = 0,
          div = document.getElementById("MathJax_ZoomFrame"), obj = div,
          overlay = document.getElementById("MathJax_ZoomOverlay");
      if (ZOOM.operaPositionBug) {div.style.border = "1px solid"}  // to get vertical position right
      if (obj.offsetParent) {
        do {x += obj.offsetLeft; y += obj.offsetTop} while (obj = obj.offsetParent);
      }
      if (ZOOM.operaPositionBug) {div.style.border = ""}
      overlay.style.left = (-x)+"px"; overlay.style.top = (-y)+"px";
      if (ZOOM.msiePositionBug) {setTimeout(ZOOM.SetWH,0)} else {ZOOM.SetWH()}
      return {x:x, y:y};
    },
    SetWH: function () {
      var overlay = document.getElementById("MathJax_ZoomOverlay");
      overlay.style.width = overlay.style.height = "1px"; // so scrollWidth/Height will be right below
      overlay.style.width = document.body.scrollWidth + "px";
      overlay.style.height = document.body.scrollHeight + "px";
    },
    
    //
    //  Remove zoom display and event handlers
    //
    Remove: function (event) {
      var div = document.getElementById("MathJax_ZoomFrame");
      if (div) {
        div.parentNode.removeChild(div);
        div = document.getElementById("MathJax_ZoomTracker");
        if (div) {div.parentNode.removeChild(div)}
        if (ZOOM.operaRefreshBug) {
	  // force a redisplay of the page
	  // (Opera doesn't refresh properly after the zoom is removed)
          var overlay = HTML.addElement(document.body,"div",{
            style:{position:"fixed", left:0, top:0, width:"100%", height:"100%",
                   backgroundColor:"white", opacity:0},
            id: "MathJax_OperaDiv"
          });
          document.body.removeChild(overlay);
        }
        if (window.removeEventListener) {removeEventListener("resize",ZOOM.Resize,false)}
        else if (window.detachEvent) {detachEvent("onresize",ZOOM.Resize)}
        else {window.onresize = ZOOM.onresize; delete ZOOM.onresize}
      }
      return FALSE(event);
    }
    
  };
  
  
  /*************************************************************/

  HUB.Browser.Select({
    MSIE: function (browser) {
      var quirks = (document.compatMode === "BackCompat");
      var isIE8 = browser.versionAtLeast("8.0") && document.documentMode > 7;
      var isIE9 = document.documentMode >= 9;
      ZOOM.msiePositionBug = !isIE9;
      ZOOM.msieSizeBug = browser.versionAtLeast("7.0") &&
        (!document.documentMode || document.documentMode === 7 || document.documentMode === 8);
      ZOOM.msieIE8Bug = isIE8 && (document.documentMode === 8);
      ZOOM.msieIE8HeightBug = (document.documentMode === 8);
      ZOOM.msieZIndexBug = !isIE8;
      ZOOM.msieTopBug = (!browser.versionAtLeast("8.0") || document.documentMode === 7);
      ZOOM.msieTopMMLBug = ZOOM.msieTopBug || (!isIE8 || document.documentMode >= 9);
      ZOOM.msieBorderBug = quirks && browser.versionAtLeast("8.0");
      ZOOM.msieInlineBlockAlignBug = (!isIE8 || quirks);
      if (document.documentMode >= 9) {delete CONFIG.styles["#MathJax_Zoom"].filter}
    },
    
    Opera: function (browser) {
      ZOOM.operaPositionBug = true;
      ZOOM.operaRefreshBug = true;
    },
    
    Firefox: function (browser) {
      ZOOM.ffMMLdisplayBug = true;
    }
  });
  
  ZOOM.topImg = (ZOOM.msieInlineBlockAlignBug ?
    HTML.Element("img",{style:{width:0,height:0,position:"relative"},src:"about:blank"}) :
    HTML.Element("span",{style:{width:0,height:0,display:"inline-block"}})
  );
  if (ZOOM.operaPositionBug || ZOOM.msieTopBug) {ZOOM.topImg.style.border="1px solid"}

  /*************************************************************/

  MathJax.Callback.Queue(
    ["StartupHook",MathJax.Hub.Register,"Begin Styles",{}],
    ["Styles",AJAX,CONFIG.styles],
    ["Post",HUB.Startup.signal,"MathZoom Ready"],
    ["loadComplete",AJAX,"[MathJax]/extensions/MathZoom.js"]
  );

})(MathJax.Hub,MathJax.HTML,MathJax.Ajax,MathJax.OutputJax["HTML-CSS"],MathJax.OutputJax.NativeMML);
