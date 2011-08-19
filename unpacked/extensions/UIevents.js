/*************************************************************
 *
 *  MathJax/extensions/UIevents.js
 *  
 *  Implements the event handlers needed by the output jax to perform
 *  menu, hover, and other events.
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2011 Design Science, Inc.
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

(function (HUB,HTML,AJAX,CALLBACK,OUTPUT) {
  var VERSION = "1.1";
  
  var EXTENSION = MathJax.Extension;
  var UI = EXTENSION.UIevents = {version: VERSION};
  
  var SETTINGS = HUB.config.menuSettings;
  
  var CONFIG = {
    styles: {
      ".MathJax_Hover_Frame": {
        "border-radius": ".25em",                   // Opera 10.5 and IE9
        "-webkit-border-radius": ".25em",           // Safari and Chrome
        "-moz-border-radius": ".25em",              // Firefox
        "-khtml-border-radius": ".25em",            // Konqueror

        "box-shadow": "0px 0px 15px #83A",          // Opera 10.5 and IE9
        "-webkit-box-shadow": "0px 0px 15px #83A",  // Safari and Chrome
        "-moz-box-shadow": "0px 0px 15px #83A",     // Forefox 3.5
        "-khtml-box-shadow": "0px 0px 15px #83A",   // Konqueror

        border: ".1em solid #A6D ! important",
        display: "inline-block", position:"absolute"
      },

      ".MathJax_Hover_Arrow": {
        position:"absolute",
        top:"-5px", right:"-9px",
        width:"15px", height:"11px",
        cursor:"pointer"
      }
    }
  };

  
  //
  //  Common event-handling code
  //
  var EVENT = UI.Event = {
    
    LEFTBUTTON: 0,           // the event.button value for left button
    MENUKEY: "altKey",       // the event value for alternate context menu

    Mousedown: function (event) {return EVENT.Handler(event,"Mousedown",this)},
    Mouseup:   function (event) {return EVENT.Handler(event,"Mouseup",this)},
    Mousemove: function (event) {return EVENT.Handler(event,"Mousemove",this)},
    Mouseover: function (event) {return EVENT.Handler(event,"Mouseover",this)},
    Mouseout:  function (event) {return EVENT.Handler(event,"Mouseout",this)},
    Click:     function (event) {return EVENT.Handler(event,"Click",this)},
    DblClick:  function (event) {return EVENT.Handler(event,"DblClick",this)},
    Menu:      function (event) {return EVENT.Handler(event,"ContextMenu",this)},
    
    //
    //  Call the output jax's event handler
    //
    Handler: function (event,type,math) {
      if (AJAX.loadingMathMenu) {return False(event)}
      var jax = OUTPUT[math.jaxID];
      if (!event) {event = window.event}
      event.isContextMenu = (type === "ContextMenu");
      return jax.HandleEvent(event,type,math);
    },
    //
    //  For use in the output jax (this will be the output jax)
    //
    HandleEvent: function (event,type,math) {
      if (this[type]) {return this[type].call(this,event,math)}
      if (EXTENSION.MathZoom) {return EXTENSION.MathZoom.HandleEvent(event,type,math)}
    },

    
    //
    //  Try to cancel the event in every way we can
    //
    False: function (event) {
      if (!event) {event = window.event}
      if (event) {
        if (event.preventDefault) {event.preventDefault()}
        if (event.stopPropagation) {event.stopPropagation()}
        event.cancelBubble = true;
        event.returnValue = false;
      }
      return false;
    },

    //
    //  Load the contextual menu code, if needed, and post the menu
    //
    ContextMenu: function (event,jax) {
      if (jax.hover) {
        if (jax.hover.remove) {clearTimeout(jax.hover.remove); delete jax.hover.remove}
        jax.hover.nofade = true;
      }
      var MENU = MathJax.Menu;
      if (MENU) {
        MENU.jax = jax;
        MENU.menu.Find("Format").menu.items[1].name = 
          (jax.inputJax.id === "MathML" ? "Original" : jax.inputJax.id);
        return MENU.menu.Post(event);
      } else {
        if (!AJAX.loadingMathMenu) {
          AJAX.loadingMathMenu = true;
          var ev = {
            pageX:event.pageX, pageY:event.pageY,
            clientX:event.clientX, clientY:event.clientY
          };
          CALLBACK.Queue(
            AJAX.Require("[MathJax]/extensions/MathMenu.js"),
            function () {delete AJAX.loadingMathMenu; if (!MathJax.Menu) {MathJax.Menu = {}}},
            ["ContextMenu",this,ev,jax]  // call this function again
          );
        }
        return this.False(event);
      }
    }
  };
  
  //
  //  Handle hover "discoverability"
  //
  var HOVER = UI.Hover = {
    Mouseover: function (event,math) {
      var from = event.fromElement || event.relatedTarget,
          to   = event.toElement   || event.target;
      if (from && to && from.isMathJax != to.isMathJax) {
        var jax = this.getJaxFromMath(math);
        if (jax.hover) {HOVER.ReHover(jax)} else {HOVER.HoverTimer(jax,math)}
        return EVENT.False(event);
      }
    },
    Mouseout: function (event,math) {
      var from = event.fromElement || event.relatedTarget,
          to   = event.toElement   || event.target;
      if (from && to && from.isMathJax != to.isMathJax) {
        var jax = this.getJaxFromMath(math);
        if (jax.hover) {HOVER.UnHover(jax)} else {HOVER.ClearHoverTimer()}
        return EVENT.False(event);
      }
    },
    Mousemove: function (event,math) {
      var jax = this.getJaxFromMath(math); if (jax.hover) return;
      if (HOVER.lastX == event.clientX && HOVER.lastY == event.clientY) return;
      HOVER.lastX = event.clientX; HOVER.lastY = event.clientY;
      HOVER.HoverTimer(jax,math);
      return EVENT.False(event);
    },
    
    HoverTimer: function (jax,math) {
      this.ClearHoverTimer();
      this.hoverTimer = setTimeout(CALLBACK(["Hover",this,jax,math]),SETTINGS.hover);
    },
    ClearHoverTimer: function () {
      if (this.hoverTimer) {clearTimeout(this.hoverTimer); delete this.hoverTimer}
    },
    
    Hover: function (jax,math) {
      if (EXTENSION.MathZoom && EXTENSION.MathZoom.Hover(event,math)) return;
      var JAX = jax.outputJax, span = JAX.getHoverSpan(jax), bbox = JAX.getHoverBBox(jax,span);
      var dx = .25, dy = .33, dd = .1;  // frame size
      jax.hover = {opacity:0};
      if (this.msieBorderWidthBug) {dd = 0}
      jax.hover.id = "MathJax-Hover-"+jax.inputID.replace(/.*-(\d+)$/,"$1");
      var frame = HTML.Element("span",{
         id:jax.hover.id, isMathJax: true,
         style:{display:"inline-block", "z-index":1, width:0, height:0, position:"relative"}
        },[["span",{
          className:"MathJax_Hover_Frame", isMathJax: true,
          style:{
            display:"inline-block", position:"absolute",
            top:this.Em(-bbox.h-dy-dd), left:this.Em(-dx-dd),
            width:this.Em(bbox.w+2*dx), height:this.Em(bbox.h+bbox.d+2*dy),
            opacity:0, filter:"alpha(opacity=0)"
          }},[[
           "img",{
             className: "MathJax_Hover_Arrow", isMathJax: true, math: math,
             src: AJAX.fileURL(OUTPUT.imageDir+"/MenuArrow-15.png"),
             onclick: this.HoverMenu, jax:JAX.id
           }
          ]]
        ]]
      );
      span.parentNode.insertBefore(frame,span); span.style.position = "relative";
      this.ReHover(jax,.2);
    },
    ReHover: function (jax) {
      if (jax.hover.remove) {clearTimeout(jax.hover.remove)}
      jax.hover.remove = setTimeout(CALLBACK(["UnHover",this,jax]),15*1000);
      this.HoverFadeTimer(jax,.2);
    },
    UnHover: function (jax) {
      if (!jax.hover.nofade) {this.HoverFadeTimer(jax,-.05,400)}
    },
    HoverFade: function (jax) {
      delete jax.hover.timer;
      jax.hover.opacity = Math.max(0,Math.min(1,jax.hover.opacity + jax.hover.inc));
      jax.hover.opacity = Math.floor(1000*jax.hover.opacity)/1000;
      var span = document.getElementById(jax.hover.id);
      span.firstChild.style.opacity = jax.hover.opacity;
      span.firstChild.style.filter = "alpha(opacity="+Math.floor(100*jax.hover.opacity)+")";
      if (jax.hover.opacity === 1) {return}
      if (jax.hover.opacity) {this.HoverFadeTimer(jax,jax.hover.inc); return}
      var frame = document.getElementById(jax.hover.id);
      frame.parentNode.removeChild(frame);
      if (jax.hover.remove) {clearTimeout(jax.hover.remove)}
      delete jax.hover;
    },
    HoverFadeTimer: function (jax,inc,delay) {
      jax.hover.inc = inc;
      if (!jax.hover.timer) {
        jax.hover.timer = setTimeout(CALLBACK(["HoverFade",this,jax]),(delay||50));
      }
    },
    HoverMenu: function (event) {
      if (!event) {event = window.event}
      OUTPUT[this.jax].ContextMenu(event,this.math,true);
    },
    
    Em: function (m) {
      if (Math.abs(m) < .0006) {return "0em"}
      return m.toFixed(3).replace(/\.?0+$/,"") + "em";
    },

    //
    //  Preload images so they show up with the menu
    //
    getImages: function () {
      var menu = new Image();
      menu.src = AJAX.fileURL(OUTPUT.imageDir+"/MenuArrow-15.png");
    }

  };
  
  //
  //  Handle touch events.  
  //
  //  Use double-tap-and-hold as a replacement for context menu event.
  //  Use double-tap as a replacement for double click.
  //
  var TOUCH = UI.Touch = {

    last: 0,          // time of last tap event
    delay: 500,       // delay time for double-click
    
    //
    //  Check if this is a double-tap, and if so, start the timer
    //  for the double-tap and hold (to trigger the contextual menu)
    //
    start: function (event) {
      var now = new Date().getTime();
      var dblTap = (now - TOUCH.last < TOUCH.delay);
      TOUCH.last = now;
      if (dblTap) {
        TOUCH.timeout = setTimeout(TOUCH.menu,TOUCH.delay,event,this);
        event.preventDefault();
      }
    },
          
    //
    //  Check if there is a timeout pending, i.e., we have a 
    //  double-tap and were waiting to see if it is held long
    //  enough for the menu.  Since we got the end before the
    //  timeout, it is a double-click, not a double-tap-and-hold.
    //  Prevent the default action and issue a double click.
    //
    end: function (event) {
      if (TOUCH.timeout) {
        clearTimeout(TOUCH.timeout);
        delete TOUCH.timeout; TOUCH.last = 0;
        event.preventDefault();
        return EVENT.Handler((event.touches[0]||event.touch),"DblClick",this);
      }
    },
        
    //
    //  If the timeout passes without an end event, we issue
    //  the contextual menu event.
    //
    menu: function (event,math) {
      delete TOUCH.timeout; TOUCH.last = 0;
      return EVENT.Handler((event.touches[0]||event.touch),"ContextMenu",math);
    }
    
  };
  
  if (MathJax.Hub.Browser.isMobile) {
    var arrow = CONFIG.styles[".MathJax_Hover_Arrow"];
    arrow.width = "25px"; arrow.height = "18px";
    arrow.top = "-11px"; arrow.right = "-15px";
  }
  
  HUB.Browser.Select({
    MSIE: function (browser) {
      if ((document.documentMode||0) < 9) {EVENT.LEFTBUTTON = 1}
      EVENT.msieBorderWidthBug = (document.compatMode === "BackCompat");
    }
  });
  
  CONFIG = HUB.CombineConfig("UIevents",CONFIG);
  
  CALLBACK.Queue(
    ["getImages",HOVER],
    ["Styles",AJAX,CONFIG.styles],
    ["Post",HUB.Startup.signal,"UIevents Ready"],
    ["loadComplete",AJAX,"[MathJax]/extensions/UIevents.js"]
  );
  
})(MathJax.Hub,MathJax.HTML,MathJax.Ajax,MathJax.Callback,MathJax.OutputJax);