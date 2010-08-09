/*************************************************************
 *
 *  MathJax/extensions/MathZoom.js
 *  
 *  Implements the zoom feature for enlarging math expressions.  It is
 *  loaded automatically when the Zoom menu selection changes from "None".
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

(function (HUB,HTML,AJAX,HTMLCSS,nMML) {
  var VERSION = "1.0";
  
  var CONFIG = HUB.Insert({
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
        "box-shadow":"5px 5px 15px #AAAAAA",         // Opera 10.5
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
  },(HUB.config.MathZoom||{}));
  
  /*************************************************************/
  /*
   *  Cancel event's default action (try everything we can)
   */
  var FALSE = function (event) {
    if (!event) {event = window.event}
    if (event) {
      if (event.preventDefault) {event.preventDefault()}
      if (event.stopPropagation) {event.stopPropagation()}
      event.cancelBubble = true;
      event.returnValue = false;
    }
    return false;
  };

  /*************************************************************/

  var ZOOM = MathJax.Extension.MathZoom = {
    version: VERSION,
    settings: HUB.config.menuSettings,

    //
    //  Used to override HTMLCSS or nMML method of the same name
    //
    HandleEvent: function (event,type,math) {
      if (!event) {event = window.event}
      if (ZOOM.settings.CTRL  && !event.ctrlKey)  return true;
      if (ZOOM.settings.ALT   && !event.altKey)   return true;
      if (ZOOM.settings.CMD   && !event.metaKey)  return true;
      if (ZOOM.settings.Shift && !event.shiftKey) return true;
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
    //  Zoom on hover
    //
    Mouseover: function (event,math) {
      if (this.settings.zoom === "Hover") {
        ZOOM.oldMouseOver = math.onmouseover;
        math.onmouseover = null;
        math.onmousemove = this.Mousemove;
        math.onmouseout = this.Mouseout;
        return ZOOM.Timer(event,math);
      }
    },
    Mouseout: function (event) {
      this.onmouseover = ZOOM.oldMouseOver; delete ZOOM.oldMouseOver;
      this.onmousemove = this.onmouseout = null;
      ZOOM.ClearTimer();
      return FALSE(event);
    },
    Mousemove: function (event) {
      return ZOOM.Timer(event||window.event,this);
    },
    Timer: function (event,math) {
      this.ClearTimer();
      this.timer = setTimeout(MathJax.Callback(["Zoom",this,math,{}]),CONFIG.delay);
      return FALSE(event);
    },
    ClearTimer: function () {
      if (this.timer) {clearTimeout(this.timer); delete this.timer}
    },
    
    //
    //  Handle the actual zooming
    //
    Zoom: function (math,event) {
      this.ClearTimer(); this.Remove();
      
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
        var tracker = HTML.Element("img",{
          src:"about:blank", id:"MathJax_ZoomTracker",
          style:{width:0, height:0, position:"relative"}
        });
        document.body.appendChild(div);
        div.style.position = "absolute";
        div.style.zIndex = CONFIG.styles["#MathJax_ZoomOverlay"]["z-index"];
        div = tracker;
      }
      var bbox = (this["Zoom"+JAX])(root,span,math);
      if (this.msiePositionBug) {
        if (this.msieIE8Bug) {
          // IE8 gets height completely wrong
          span.style.position = "absolute"; zoom.style.height = span.offsetHeight; span.style.position = "";
          if (zoom.offsetHeight <= Mh && zoom.offsetWidth <= Mw) {zoom.style.overflow = "visible"}
        }
        if (this.msieWidthBug) {zoom.style.width = Math.min(Mw,bbox.w)}
          else if (bbox.w > Mw) {zoom.style.width = Mw}
        if (zoom.offsetHeight > Mh) {zoom.style.Height = Mh+"px"}  // IE doesn't do max-height?
        if (math.nextSibling) {math.parentNode.insertBefore(div,math.nextSibling)}
          else {parent.appendChild(div)}                           // needs to be after to be above?
      } else if (this.operaPositionBug) {
        zoom.style.width = Math.min(Mw,span.offsetWidth)+"px";     // gets width as 0?
      }
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
    ZoomHTMLCSS: function (root,span,math) {
      span.className = "MathJax";
      HTMLCSS.idPostfix = "-zoom";
      HTMLCSS.getScales(span,span);
      root.toHTML(span,span);
      var bbox = root.HTMLspanElement().bbox;
      HTMLCSS.idPostfix = "";
      if (bbox.width && bbox.width !== "100%") {
        //  Handle full-width displayed equations
        //  FIXME: this is a hack for now
        var Mw = Math.floor(.85*document.body.clientWidth);
        span.style.width = Mw+"px"; span.style.display="inline-block";
        var id = (root.id||"MathJax-Span-"+root.spanID)+"-zoom";
        var child = document.getElementById(id).firstChild;
        while (child && child.style.width !== bbox.width) {child = child.nextSibling}
        if (child) {child.style.width = "100%"}
      }
      span.appendChild(this.topImg); var top = this.topImg.offsetTop; span.removeChild(this.topImg);
      var W = (this.msieWidthBug ? HTMLCSS.getW(math)*HTMLCSS.em : math.offsetWidth);
      return {w:bbox.w*HTMLCSS.em, Y:-top, W:W};
    },
    ZoomMathML: function (root,span,math) {
      root.toNativeMML(span,span); var top;
      span.appendChild(this.topImg); top = this.topImg.offsetTop; span.removeChild(this.topImg);
      var W = (this.ffMMLwidthBug ? math.parentNode : math).offsetWidth;
      return {w:span.offsetWidth, Y:-top, W:W}
    },
    
    //
    //  Set the position of the zoom box and overlay
    //
    Position: function (zoom,bbox,MMLdisplay) {
      var XY = this.Resize(), x = XY.x, y = XY.y, W = bbox.W;
      if (this.msiePositionBug) {W = -W}
      if (MMLdisplay && this.ffMMLcenterBug) {W = 0}
      var dx = -Math.floor((zoom.offsetWidth-W)/2), dy = bbox.Y;
      zoom.style.left = Math.max(dx,20-x)+"px"; zoom.style.top = Math.max(dy,20-y)+"px";
    },
    
    //
    //  Handle resizing of overlay while zoom is displayed
    //
    Resize: function (event) {
      if (ZOOM.onresize) {ZOOM.onresize(event)}
      var x = 0, y = 0,
          div = document.getElementById("MathJax_ZoomFrame"),
          overlay = document.getElementById("MathJax_ZoomOverlay");
      var obj = (ZOOM.msieZIndexBug ? document.getElementById("MathJax_ZoomTracker") : div);
      if (ZOOM.operaPositionBug) {div.style.border = "1px solid"}  // to get vertical position right
      if (obj.offsetParent) {
        do {x += obj.offsetLeft; y += obj.offsetTop} while (obj = obj.offsetParent);
      }
      if (ZOOM.operaPositionBug) {div.style.border = ""}
      if (ZOOM.msieZIndexBug) {div.style.left = x+"px"; div.style.top = y+"px"}
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
  
  //
  //  Hook into the HTML-CSS and NativeMML event handling
  //
  HUB.Register.StartupHook("HTML-CSS Jax Ready",function () {
    HTMLCSS = MathJax.OutputJax["HTML-CSS"];
    HTMLCSS.Augment({HandleEvent: ZOOM.HandleEvent});
  });
  HUB.Register.StartupHook("NativeMML Jax Ready", function () {
    nMML = MathJax.OutputJax.NativeMML;
    nMML.Augment({
      HandleEvent: ZOOM.HandleEvent,
      MSIEmouseup: function (event,math,span) {
        if (this.trapUp) {delete this.trapUp; return true}
        if (this.MSIEzoomKeys(event)) {return true}
        return false;
      },
      MSIEclick: function (event,math,span) {
        if (this.trapClick) {delete this.trapClick; return true}
        if (!this.MSIEzoomKeys(event)) return false;
        if (!this.settings.zoom.match(/Click/)) return false;
        return (ZOOM.Click(event,math) === false);
      },
      MSIEdblclick: function (event,math,span) {
        if (!this.MSIEzoomKeys(event)) return false;
        return (ZOOM.DblClick(event,math) === false);
      },
      MSIEmouseover: function (event,math,span) {
        if (this.settings.zoom !== "Hover") {return false}
        ZOOM.Timer(event,math); return true;
      },
      MSIEmouseout: function (event,math,span) {
        if (this.settings.zoom !== "Hover") {return false}
        ZOOM.ClearTimer(); return true;
      },
      MSIEmousemove: function (event,math,span) {
        if (this.settings.zoom !== "Hover") {return false}
        ZOOM.Timer(event,math); return true;
      },
      MSIEzoomKeys: function (event) {
        if (this.settings.CTRL  && !event.ctrlKey)  return false;
        if (this.settings.CMD   && !event.metaKey)  return false;
        if (this.settings.ALT   && !event.altKey)   return false;
        if (this.settings.Shift && !event.shiftKey) return false;
        return true;
      }
    });
  });
  
  /*************************************************************/

  HUB.Browser.Select({
    MSIE: function (browser) {
      var quirks = (document.compatMode === "BackCompat");
      var isIE8 = browser.versionAtLeast("8.0") && document.documentMode > 7;
      ZOOM.msiePositionBug = true;
      ZOOM.msieWidthBug = !quirks;
      ZOOM.msieIE8Bug = isIE8;
      ZOOM.msieZIndexBug = !isIE8;
      ZOOM.msieInlineBlockAlignBug = (!isIE8 || quirks);
    },
    
    Opera: function (browser) {
      ZOOM.operaPositionBug = true;
      ZOOM.operaRefreshBug = true;
    },
    
    Firefox: function (browser) {
      ZOOM.ffMMLwidthBug = true;
      ZOOM.ffMMLcenterBug = true;
    }
  });
  
  ZOOM.topImg = (ZOOM.msieInlineBlockAlignBug ?
    HTML.Element("img",{style:{width:0,height:0},src:"about:blank"}) :
    HTML.Element("span",{style:{width:0,height:0,display:"inline-block"}})
  );
  if (ZOOM.operaPositionBug) {ZOOM.topImg.style.border="1px solid"}

  /*************************************************************/

  MathJax.Callback.Queue(
    ["Styles",AJAX,CONFIG.styles],
    ["Post",HUB.Startup.signal,"MathZoom Ready"],
    ["loadComplete",AJAX,"[MathJax]/extensions/MathZoom.js"]
  );

})(MathJax.Hub,MathJax.HTML,MathJax.Ajax,MathJax.OutputJax["HTML-CSS"],MathJax.OutputJax.NativeMML);
