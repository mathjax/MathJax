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
        "-moz-box-shadow": "0px 0px 15px #83A",     // Forefox
        "-khtml-box-shadow": "0px 0px 15px #83A",   // Konqueror

        border: "1px solid #A6D ! important",
        display: "inline-block", position:"absolute"
      },

      ".MathJax_Hover_Arrow": {
        position:"absolute",
        top:"1px", right:"-11px",
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
    RIGHTBUTTON: 2,          // the event.button value for right button
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
    //  Call the output jax's event handler or the zoom handler
    //
    Handler: function (event,type,math) {
      if (AJAX.loadingMathMenu) {return False(event)}
      var jax = OUTPUT[math.jaxID];
      if (!event) {event = window.event}
      event.isContextMenu = (type === "ContextMenu");
      if (jax[type]) {return jax[type](event,math)}
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
    ContextMenu: function (event,math,force) {
      //
      //  Check if we are showing menus
      //
      var JAX = OUTPUT[math.jaxID], jax = JAX.getJaxFromMath(math);
      var show = (JAX.config.showMathMenu != null ? JAX : HUB).config.showMathMenu;
      if (!show || (SETTINGS.context !== "MathJax" && !force)) return;

      //
      //  Remove selections, remove hover fades
      //
      if (UI.msieEventBug) {event = window.event}
      if (UI.safariContextMenuBug) {setTimeout("window.getSelection().empty()",0)}
      if (document.selection) {setTimeout("document.selection.empty()",0)}
      HOVER.ClearHoverTimer();
      if (jax.hover) {
        if (jax.hover.remove) {clearTimeout(jax.hover.remove); delete jax.hover.remove}
        jax.hover.nofade = true;
      }

      //
      //  If the menu code is loaded, post the menu
      //  Otherwse lad the menu code and try again
      //
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
            ["ContextMenu",this,ev,math,force]  // call this function again
          );
        }
        return EVENT.False(event);
      }
    },
    
    //
    //  Mousedown handler for alternate means of accessing menu
    //
    AltContextMenu: function (event,math) {
      var JAX = OUTPUT[math.jaxID], jax = JAX.getJaxFromMath(math);
      var show = (JAX.config.showMathMenu != null ? JAX : HUB).config.showMathMenu;
      if (show) {
        if (SETTINGS.context === "MathJax") {
          if (!UI.noContextMenuBug || event.button !== EVENT.RIGHTBUTTON) return;
        } else {
          if (!event[EVENT.MENUKEY] || event.button !== EVENT.LEFTBUTTON) return;
        }
        return JAX.ContextMenu(event,math,true);
      }
    }
    
  };
  
  //
  //  Handle hover "discoverability"
  //
  var HOVER = UI.Hover = {
    //
    //  Check if we are moving from a non-MathJax element to a MathJax one
    //  and either start fading in again (if it is fading out) or start the
    //  timer for the hover
    //
    Mouseover: function (event,math) {
      if (SETTINGS.discoverable) {
        var from = event.fromElement || event.relatedTarget,
            to   = event.toElement   || event.target;
        if (from && to && from.isMathJax != to.isMathJax) {
          var jax = this.getJaxFromMath(math);
          if (jax.hover) {HOVER.ReHover(jax)} else {HOVER.HoverTimer(jax,math)}
          return EVENT.False(event);
        }
      }
    },
    //
    //  Check if we are moving from a MathJax element to a non-MathJax one
    //  and either start fading out, or clear the timer if we haven't
    //  hovered yet
    //
    Mouseout: function (event,math) {
      if (SETTINGS.discoverable) {
        var from = event.fromElement || event.relatedTarget,
            to   = event.toElement   || event.target;
        if (from && to && from.isMathJax != to.isMathJax) {
          var jax = this.getJaxFromMath(math);
          if (jax.hover) {HOVER.UnHover(jax)} else {HOVER.ClearHoverTimer()}
          return EVENT.False(event);
        }
      }
    },
    //
    //  Restart hover timer if the mouse moves
    //
    Mousemove: function (event,math) {
      if (SETTINGS.discoverable) {
        var jax = this.getJaxFromMath(math); if (jax.hover) return;
        if (HOVER.lastX == event.clientX && HOVER.lastY == event.clientY) return;
        HOVER.lastX = event.clientX; HOVER.lastY = event.clientY;
        HOVER.HoverTimer(jax,math);
        return EVENT.False(event);
      }
    },
    
    //
    //  Clear the old timer and start a new one
    //
    HoverTimer: function (jax,math) {
      this.ClearHoverTimer();
      this.hoverTimer = setTimeout(CALLBACK(["Hover",this,jax,math]),SETTINGS.hover);
    },
    ClearHoverTimer: function () {
      if (this.hoverTimer) {clearTimeout(this.hoverTimer); delete this.hoverTimer}
    },
    
    //
    //  Handle putting up the hover frame
    //
    Hover: function (jax,math) {
      //
      //  Check if Zoom handles the hover event
      //
      if (EXTENSION.MathZoom && EXTENSION.MathZoom.Hover({},math)) return;
      //
      //  Get the hover data
      //
      var JAX = jax.outputJax,
          span = JAX.getHoverSpan(jax,math),
          bbox = JAX.getHoverBBox(jax,span,math),
          show = (JAX.config.showMathMenu != null ? JAX : HUB).config.showMathMenu;
      var dx = 3.5, dy = 5, dd = 1;  // frame size
      if (UI.msieBorderWidthBug) {dd = 0}
      jax.hover = {opacity:0, id: jax.inputID+"-Hover"};
      //
      //  The frame and menu button
      //
      var frame = HTML.Element("span",{
         id:jax.hover.id, isMathJax: true,
         style:{display:"inline-block", width:0, height:0, position:"relative"}
        },[["span",{
          className:"MathJax_Hover_Frame", isMathJax: true,
          style:{
            display:"inline-block", position:"absolute",
            top:this.Px(-bbox.h-dy-dd-(bbox.y||0)), left:this.Px(-dx-dd+(bbox.x||0)),
            width:this.Px(bbox.w+2*dx), height:this.Px(bbox.h+bbox.d+2*dy),
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
      if (UI.msieZIndexBug) {frame.style.zIndex = 1}
      if (bbox.width) {
        frame.style.width = bbox.width;
        frame.style.marginRight = "-"+bbox.width;
        frame.firstChild.style.width = bbox.width;
        frame.firstChild.firstChild.style.right = "-5px";
      }
      if (!show) {frame.firstChild.removeChild(frame.firstChild.firstChild)}
      //
      //  Add the frame
      //
      span.parentNode.insertBefore(frame,span);
      if (span.style) {span.style.position = "relative"} // so math is on top of hover frame
      //
      //  Start the hover fade-in
      //
      this.ReHover(jax,.2);
    },
    //
    //  Restart the hover fade in and fade-out timers
    //
    ReHover: function (jax) {
      if (jax.hover.remove) {clearTimeout(jax.hover.remove)}
      jax.hover.remove = setTimeout(CALLBACK(["UnHover",this,jax]),15*1000);
      this.HoverFadeTimer(jax,.2);
    },
    //
    //  Start the fade-out
    //
    UnHover: function (jax) {
      if (!jax.hover.nofade) {this.HoverFadeTimer(jax,-.05,400)}
    },
    //
    //  Handle the fade-in and fade-out
    //
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
    //
    //  Set the fade to in or out (via inc) and start the timer, if needed
    //
    HoverFadeTimer: function (jax,inc,delay) {
      jax.hover.inc = inc;
      if (!jax.hover.timer) {
        jax.hover.timer = setTimeout(CALLBACK(["HoverFade",this,jax]),(delay||50));
      }
    },
    
    //
    //  Handle a click on the menu button
    //
    HoverMenu: function (event) {
      if (!event) {event = window.event}
      OUTPUT[this.jax].ContextMenu(event,this.math,true);
    },
    
    //
    //  Clear all hover timers
    //
    ClearHover: function (jax) {
      if (jax.hover.remove) {clearTimeout(jax.hover.remove)}
      if (jax.hover.timer)  {clearTimeout(jax.hover.timer)}
      HOVER.ClearHoverTimer();
      delete jax.hover;
    },
    
    //
    //  Make a measurement in pixels
    //
    Px: function (m) {
      if (Math.abs(m) < .006) {return "0px"}
      return m.toFixed(2).replace(/\.?0+$/,"") + "px";
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
  
  //
  //  Mobile screens are small, so use larger version of arrow
  //
  var arrow = CONFIG.styles[".MathJax_Hover_Arrow"];
  if (HUB.Browser.isMobile) {
    arrow.width = "25px"; arrow.height = "18px";
    arrow.top = "-11px"; arrow.right = "-15px";
  }
  
  //
  //  Set up browser-specific values
  //
  HUB.Browser.Select({
    MSIE: function (browser) {
      var mode = (document.documentMode||0);
      UI.msieBorderWidthBug = (document.compatMode === "BackCompat");  // borders are inside offsetWidth/Height
      UI.msieZIndexBug = (mode < 8);    // put hover frame on top of math
      UI.msieEventBug = browser.isIE9;  // must get event from window even though event is passes
      if (mode < 8 && !browser.isIE9) {arrow.top = arrow.right = "-1px"}  // IE < 8 clips to frame
      if (mode < 9) {EVENT.LEFTBUTTON = 1}  // IE < 9 has wrong event.button values
    },
    Safari: function (browser) {
      UI.safariContextMenuBug = true;  // selection can be started by contextmenu event
    },
    Konqueror: function (browser) {
      UI.noContextMenuBug = true;      // doesn't produce contextmenu event
    }
  });
  
  //
  //  Get configuration from user
  //
  CONFIG = HUB.CombineConfig("UIevents",CONFIG);
  
  //
  //  Queue the events needed for startup
  //
  CALLBACK.Queue(
    ["getImages",HOVER],
    ["Styles",AJAX,CONFIG.styles],
    ["Post",HUB.Startup.signal,"UIevents Ready"],
    ["loadComplete",AJAX,"[MathJax]/extensions/UIevents.js"]
  );
  
})(MathJax.Hub,MathJax.HTML,MathJax.Ajax,MathJax.Callback,MathJax.OutputJax);