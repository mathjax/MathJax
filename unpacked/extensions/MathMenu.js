/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/extensions/MathMenu.js
 *  
 *  Implements a right-mouse (or CTRL-click) menu over mathematics
 *  elements that gives the user the ability to copy the source,
 *  change the math size, and zoom settings.
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2010-2015 The MathJax Consortium
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
  var VERSION = "2.5.0";

  var SIGNAL = MathJax.Callback.Signal("menu")  // signal for menu events
  
  MathJax.Extension.MathMenu = {
    version: VERSION,
    signal: SIGNAL
  };

  var _ = function (id) {
    return MathJax.Localization._.apply(
      MathJax.Localization,
      [["MathMenu",id]].concat([].slice.call(arguments,1))
    );
  };

  var isPC = HUB.Browser.isPC, isMSIE = HUB.Browser.isMSIE, isIE9 = ((document.documentMode||0) > 8);
  var ROUND = (isPC ? null : "5px");
  
  var CONFIG = HUB.CombineConfig("MathMenu",{
    delay: 150,                                    // the delay for submenus
    closeImg: AJAX.urlRev(OUTPUT.imageDir+"/CloseX-31.png"), // image for close "X" for mobiles

    showRenderer: true,                            //  show the "Math Renderer" menu?
    showMathPlayer: true,                          //  show the "MathPlayer" menu?
    showFontMenu: false,                           //  show the "Font Preference" menu?
    showContext:  false,                           //  show the "Context Menu" menu?
    showDiscoverable: false,                       //  show the "Discoverable" menu?
    showLocale: true,                              //  show the "Locale" menu?
    showLocaleURL: false,                          //  show the "Load from URL" menu?

    semanticsAnnotations: {
      "TeX": ["TeX", "LaTeX", "application/x-tex"],
      "StarMath": ["StarMath 5.0"],
      "Maple": ["Maple"],
      "ContentMathML": ["MathML-Content", "application/mathml-content+xml"],
      "OpenMath": ["OpenMath"]
    },

    windowSettings: {                              // for source window
      status: "no", toolbar: "no", locationbar: "no", menubar: "no",
      directories: "no", personalbar: "no", resizable: "yes", scrollbars: "yes",
      width: 400, height: 300,
      left: Math.round((screen.width - 400)/2),
      top:  Math.round((screen.height - 300)/3)
    },
    
    styles: {
      "#MathJax_About": {
        position:"fixed", left:"50%", width:"auto", "text-align":"center",
        border:"3px outset", padding:"1em 2em", "background-color":"#DDDDDD", color:"black",
        cursor: "default", "font-family":"message-box", "font-size":"120%",
        "font-style":"normal", "text-indent":0, "text-transform":"none",
        "line-height":"normal", "letter-spacing":"normal", "word-spacing":"normal",
        "word-wrap":"normal", "white-space":"nowrap", "float":"none", "z-index":201,

        "border-radius": "15px",                     // Opera 10.5 and IE9
        "-webkit-border-radius": "15px",             // Safari and Chrome
        "-moz-border-radius": "15px",                // Firefox
        "-khtml-border-radius": "15px",              // Konqueror

        "box-shadow":"0px 10px 20px #808080",         // Opera 10.5 and IE9
        "-webkit-box-shadow":"0px 10px 20px #808080", // Safari 3 and Chrome
        "-moz-box-shadow":"0px 10px 20px #808080",    // Forefox 3.5
        "-khtml-box-shadow":"0px 10px 20px #808080",  // Konqueror
        filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')" // IE
      },

      ".MathJax_Menu": {
        position:"absolute", "background-color":"white", color:"black",
        width:"auto", padding:(isPC ? "2px" : "5px 0px"),
        border:"1px solid #CCCCCC", margin:0, cursor:"default",
        font: "menu", "text-align":"left", "text-indent":0, "text-transform":"none",
        "line-height":"normal", "letter-spacing":"normal", "word-spacing":"normal",
        "word-wrap":"normal", "white-space":"nowrap", "float":"none", "z-index":201,

        "border-radius": ROUND,                     // Opera 10.5 and IE9
        "-webkit-border-radius": ROUND,             // Safari and Chrome
        "-moz-border-radius": ROUND,                // Firefox
        "-khtml-border-radius": ROUND,              // Konqueror

        "box-shadow":"0px 10px 20px #808080",         // Opera 10.5 and IE9
        "-webkit-box-shadow":"0px 10px 20px #808080", // Safari 3 and Chrome
        "-moz-box-shadow":"0px 10px 20px #808080",    // Forefox 3.5
        "-khtml-box-shadow":"0px 10px 20px #808080",  // Konqueror
        filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')" // IE
      },

      ".MathJax_MenuItem": {
        padding: (isPC ? "2px 2em" : "1px 2em"),
        background:"transparent"
      },

      ".MathJax_MenuArrow": {
        position:"absolute", right:".5em", color:"#666666",
        "font-family": (isMSIE ? "'Arial unicode MS'" : null)
      },
      ".MathJax_MenuActive .MathJax_MenuArrow": {color:"white"},
      ".MathJax_MenuArrow.RTL": {left:".5em", right:"auto"},

      ".MathJax_MenuCheck": {
        position:"absolute", left:".7em",
        "font-family": (isMSIE ? "'Arial unicode MS'" : null)
      },
      ".MathJax_MenuCheck.RTL": {right:".7em", left:"auto"},

      ".MathJax_MenuRadioCheck": {
        position:"absolute", left: (isPC ? "1em" : ".7em")
      },
      ".MathJax_MenuRadioCheck.RTL": {
        right: (isPC ? "1em" : ".7em"), left:"auto"
      },

      ".MathJax_MenuLabel": {
        padding: (isPC ? "2px 2em 4px 1.33em" : "1px 2em 3px 1.33em"),
        "font-style":"italic"
      },
    
      ".MathJax_MenuRule": {
        "border-top": (isPC ? "1px solid #CCCCCC" : "1px solid #DDDDDD"),
        margin: (isPC ? "4px 1px 0px" : "4px 3px")
      },
     
      ".MathJax_MenuDisabled": {
        color:"GrayText"
      },
     
      ".MathJax_MenuActive": {
        "background-color": (isPC ? "Highlight" : "#606872"),
        color: (isPC ? "HighlightText" : "white")
      },
      
      ".MathJax_Menu_Close": {
          position:"absolute",
          width: "31px", height: "31px",
          top:"-15px", left:"-15px"
      }
    }
  });
  
  var FALSE, HOVER;
  HUB.Register.StartupHook("MathEvents Ready",function () {
    FALSE = MathJax.Extension.MathEvents.Event.False;
    HOVER = MathJax.Extension.MathEvents.Hover;
  });
  
  /*************************************************************/
  /*
   *  The main menu class
   */
  var MENU = MathJax.Menu = MathJax.Object.Subclass({
    version: VERSION,
    items: [],
    posted: false,
    title: null,
    margin: 5,
    
    Init: function (def) {this.items = [].slice.call(arguments,0)},
    With: function (def) {if (def) {HUB.Insert(this,def)}; return this},

    /*
     *  Display the menu
     */
    Post: function (event,parent,forceLTR) {
      if (!event) {event = window.event};
      var div = document.getElementById("MathJax_MenuFrame");
      if (!div) {
        div = MENU.Background(this);
        delete ITEM.lastItem; delete ITEM.lastMenu;
        delete MENU.skipUp;
        SIGNAL.Post(["post",MENU.jax]);
        MENU.isRTL = (MathJax.Localization.fontDirection() === "rtl");
      }
      var menu = HTML.Element("div",{
        onmouseup: MENU.Mouseup, ondblclick: FALSE,
        ondragstart: FALSE, onselectstart: FALSE, oncontextmenu: FALSE,
        menuItem: this, className: "MathJax_Menu"
      });
      if (!forceLTR) {MathJax.Localization.setCSS(menu)}

      for (var i = 0, m = this.items.length; i < m; i++) {this.items[i].Create(menu)}
      if (MENU.isMobile) {
        HTML.addElement(menu,"span",{
          className: "MathJax_Menu_Close", menu: parent,
          ontouchstart: MENU.Close, ontouchend: FALSE, onmousedown: MENU.Close, onmouseup: FALSE
        },[["img",{src: CONFIG.closeImg, style:{width:"100%",height:"100%"}}]]);
      }
      
      div.appendChild(menu);
      this.posted = true;
      
      menu.style.width = (menu.offsetWidth+2) + "px";
      var x = event.pageX, y = event.pageY;
      if (!x && !y) {
        x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop  + document.documentElement.scrollTop;
      }
      if (!parent) {
        if (x + menu.offsetWidth > document.body.offsetWidth - this.margin)
           {x = document.body.offsetWidth - menu.offsetWidth - this.margin}
        if (MENU.isMobile) {x = Math.max(5,x-Math.floor(menu.offsetWidth/2)); y -= 20}
        MENU.skipUp = event.isContextMenu;
      } else {
        var side = "left", mw = parent.offsetWidth;
        x = (MENU.isMobile ? 30 : mw - 2); y = 0;
        while (parent && parent !== div) {
          x += parent.offsetLeft; y += parent.offsetTop;
          parent = parent.parentNode;
        }
        if (!MENU.isMobile) {
          if ((MENU.isRTL && x - mw - menu.offsetWidth > this.margin) ||
              (!MENU.isRTL && x + menu.offsetWidth > document.body.offsetWidth - this.margin))
            {side = "right"; x = Math.max(this.margin,x - mw - menu.offsetWidth + 6)}
        }
        if (!isPC) {
          // in case these ever get implemented
          menu.style["borderRadiusTop"+side] = 0;       // Opera 10.5
          menu.style["WebkitBorderRadiusTop"+side] = 0; // Safari and Chrome
          menu.style["MozBorderRadiusTop"+side] = 0;    // Firefox
          menu.style["KhtmlBorderRadiusTop"+side] = 0;  // Konqueror
        }
      }
      
      menu.style.left = x+"px"; menu.style.top = y+"px";
      
      if (document.selection && document.selection.empty) {document.selection.empty()}
      return FALSE(event);
    },

    /*
     *  Remove the menu from the screen
     */
    Remove: function (event,menu) {
      SIGNAL.Post(["unpost",MENU.jax]);
      var div = document.getElementById("MathJax_MenuFrame");
      if (div) {
        div.parentNode.removeChild(div);
        if (this.msieFixedPositionBug) {detachEvent("onresize",MENU.Resize)}
      }
      if (MENU.jax.hover) {
        delete MENU.jax.hover.nofade;
        HOVER.UnHover(MENU.jax);
      }
      return FALSE(event);
    },

    /*
     *  Find an item in a menu (or submenu) by name (Find) or ID (FindID).
     *  A list of names or IDs means descend into submenus.
     */
    Find: function (name) {return this.FindN(1,name,[].slice.call(arguments,1))},
    FindId: function (name) {return this.FindN(0,name,[].slice.call(arguments,1))},
    FindN: function (n,name,names) {
      for (var i = 0, m = this.items.length; i < m; i++) {
        if (this.items[i].name[n] === name) {
          if (names.length) {
            if (!this.items[i].menu) {return null}
            return this.items[i].menu.FindN(n,names[0],names.slice(1));
          }
          return this.items[i];
        }
      }
      return null;
    },
    
    /*
     *  Find the index of a menu item (so we can insert before or after it)
     */
    IndexOf: function (name) {return this.IndexOfN(1,name)},
    IndexOfId: function (name) {return this.IndexOfN(0,name)},
    IndexOfN: function (n,name) {
      for (var i = 0, m = this.items.length; i < m; i++)
        {if (this.items[i].name[n] === name) {return i}}
      return null;
    }
    
  },{
    
    config: CONFIG,

    div: null,     // the DOM elements for the menu and submenus

    Close:      function (event)
      {return MENU.Event(event,this.menu||this.parentNode,(this.menu?"Touchend":"Remove"))},
    Remove:     function (event) {return MENU.Event(event,this,"Remove")},
    Mouseover:  function (event) {return MENU.Event(event,this,"Mouseover")},
    Mouseout:   function (event) {return MENU.Event(event,this,"Mouseout")},
    Mousedown:  function (event) {return MENU.Event(event,this,"Mousedown")},
    Mouseup:    function (event) {return MENU.Event(event,this,"Mouseup")},
    Touchstart: function (event) {return MENU.Event(event,this,"Touchstart")},
    Touchend:   function (event) {return MENU.Event(event,this,"Touchend")},
    Event: function (event,menu,type,force) {
      if (MENU.skipMouseover && type === "Mouseover" && !force) {return FALSE(event)}
      if (MENU.skipUp) {
        if (type.match(/Mouseup|Touchend/)) {delete MENU.skipUp; return FALSE(event)}
        if (type === "Touchstart" ||
           (type === "Mousedown" && !MENU.skipMousedown)) {delete MENU.skipUp}
      }
      if (!event) {event = window.event}
      var item = menu.menuItem;
      if (item && item[type]) {return item[type](event,menu)}
      return null;
    },

    /*
     *  Style for the background DIV
     */
    BGSTYLE: {
      position:"absolute", left:0, top:0, "z-index":200,
      width:"100%", height:"100%", border:0, padding:0, margin:0
    },

    Background: function (menu) {
      var div = HTML.addElement(document.body,"div",{style:this.BGSTYLE, id:"MathJax_MenuFrame"},
                    [["div",{style: this.BGSTYLE, menuItem: menu, onmousedown: this.Remove}]]);
      var bg = div.firstChild;
      if (MENU.msieBackgroundBug) {
        //  MSIE doesn't allow transparent background to be hit boxes, so
        //  fake it using opacity with solid background color
        bg.style.backgroundColor = "white"; bg.style.filter = "alpha(opacity=0)";
      }
      if (MENU.msieFixedPositionBug) {
        //  MSIE can't do fixed position, so use a full-sized background
        //  and an onresize handler to update it (stupid, but necessary)
        div.width = div.height = 0; this.Resize();
        attachEvent("onresize",this.Resize);
      } else {
        // otherwise, use a fixed position DIV to cover the viewport
        bg.style.position = "fixed";
      }
      return div;
    },
    Resize: function () {setTimeout(MENU.SetWH,0)},
    SetWH: function () {
      var bg = document.getElementById("MathJax_MenuFrame");
      if (bg) {
        bg = bg.firstChild;
        bg.style.width = bg.style.height = "1px"; // so scrollWidth/Height will be right below
        bg.style.width = document.body.scrollWidth + "px";
        bg.style.height = document.body.scrollHeight + "px";
      }
    },
    
    saveCookie: function () {HTML.Cookie.Set("menu",this.cookie)},
    getCookie: function () {this.cookie = HTML.Cookie.Get("menu")},
    
    //
    //  Preload images so they show up with the menu
    //
    getImages: function () {
      if (MENU.isMobile) {var close = new Image(); close.src = CONFIG.closeImg}
    }

  });

  /*************************************************************/
  /*
   *  The menu item root subclass
   */
  var ITEM = MENU.ITEM = MathJax.Object.Subclass({
    name: "", // the menu item's label as [id,label] pair

    Create: function (menu) {
      if (!this.hidden) {
        var def = {
          onmouseover: MENU.Mouseover, onmouseout: MENU.Mouseout,
          onmouseup: MENU.Mouseup, onmousedown: MENU.Mousedown,
          ondragstart: FALSE, onselectstart: FALSE, onselectend: FALSE,
          ontouchstart: MENU.Touchstart, ontouchend: MENU.Touchend,
          className: "MathJax_MenuItem", menuItem: this
        };
        if (this.disabled) {def.className += " MathJax_MenuDisabled"}
        HTML.addElement(menu,"div",def,this.Label(def,menu));
      }
    },
    Name: function () {return _(this.name[0],this.name[1])},

    Mouseover: function (event,menu) {
      if (!this.disabled) {this.Activate(menu)}
      if (!this.menu || !this.menu.posted) {
        var menus = document.getElementById("MathJax_MenuFrame").childNodes,
            items = menu.parentNode.childNodes;
        for (var i = 0, m = items.length; i < m; i++) {
          var item = items[i].menuItem;
          if (item && item.menu && item.menu.posted) {item.Deactivate(items[i])}
        }
        m = menus.length-1;
        while (m >= 0 && menu.parentNode.menuItem !== menus[m].menuItem) {
          menus[m].menuItem.posted = false;
          menus[m].parentNode.removeChild(menus[m]);
          m--;
        }
        if (this.Timer && !MENU.isMobile) {this.Timer(event,menu)}
      }
    },
    Mouseout: function (event,menu) {
      if (!this.menu || !this.menu.posted) {this.Deactivate(menu)}
      if (this.timer) {clearTimeout(this.timer); delete this.timer}
    },
    Mouseup: function (event,menu) {return this.Remove(event,menu)},
    
    Touchstart: function (event,menu) {return this.TouchEvent(event,menu,"Mousedown")},
    Touchend: function (event,menu)   {return this.TouchEvent(event,menu,"Mouseup")},
    TouchEvent: function (event,menu,type) {
      if (this !== ITEM.lastItem) {
        if (ITEM.lastMenu) {MENU.Event(event,ITEM.lastMenu,"Mouseout")}
        MENU.Event(event,menu,"Mouseover",true);
        ITEM.lastItem = this; ITEM.lastMenu = menu;
      }
      if (this.nativeTouch) {return null}
      MENU.Event(event,menu,type);
      return false;
    },
    
    Remove: function (event,menu) {
      menu = menu.parentNode.menuItem;
      return menu.Remove(event,menu);
    },

    Activate: function (menu) {this.Deactivate(menu); menu.className += " MathJax_MenuActive"},
    Deactivate: function (menu) {menu.className = menu.className.replace(/ MathJax_MenuActive/,"")},

    With: function (def) {if (def) {HUB.Insert(this,def)}; return this},
    
    isRTL: function () {return MENU.isRTL},
    rtlClass: function () {return (this.isRTL() ? " RTL" : "")}
  });

  /*************************************************************/
  /*
   *  A menu item that performs a command when selected
   */
  MENU.ITEM.COMMAND = MENU.ITEM.Subclass({
    action: function () {},

    Init: function (name,action,def) {
      if (!(name instanceof Array)) {name = [name,name]}  // make [id,label] pair
      this.name = name; this.action = action;
      this.With(def);
    },
    
    Label: function (def,menu) {return [this.Name()]},
    Mouseup: function (event,menu) {
      if (!this.disabled) {
        this.Remove(event,menu);
        SIGNAL.Post(["command",this]);
        this.action.call(this,event);
      }
      return FALSE(event);
    }
  });

  /*************************************************************/
  /*
   *  A menu item that posts a submenu
   */
  MENU.ITEM.SUBMENU = MENU.ITEM.Subclass({
    menu: null,        // the submenu
    marker: (isPC && !HUB.Browser.isSafari ? "\u25B6" : "\u25B8"),  // the menu arrow
    markerRTL: (isPC && !HUB.Browser.isSafari ? "\u25B0" : "\u25C2"),

    Init: function (name,def) {
      if (!(name instanceof Array)) {name = [name,name]}  // make [id,label] pair
      this.name = name; var i = 1;
      if (!(def instanceof MENU.ITEM)) {this.With(def), i++}
      this.menu = MENU.apply(MENU,[].slice.call(arguments,i));
    },
    Label: function (def,menu) {
      this.menu.posted = false;
      return [this.Name()+" ",["span",{
        className:"MathJax_MenuArrow" + this.rtlClass()
      },[this.isRTL() ? this.markerRTL : this.marker]]];
    },
    Timer: function (event,menu) {
      if (this.timer) {clearTimeout(this.timer)}
      event = {clientX: event.clientX, clientY: event.clientY}; // MSIE can't pass the event below
      this.timer = setTimeout(CALLBACK(["Mouseup",this,event,menu]),CONFIG.delay);
    },
    Touchend: function (event,menu) {
      var forceout = this.menu.posted;
      var result = this.SUPER(arguments).Touchend.apply(this,arguments);
      if (forceout) {this.Deactivate(menu); delete ITEM.lastItem; delete ITEM.lastMenu}
      return result;
    },
    Mouseup: function (event,menu) {
      if (!this.disabled) {
        if (!this.menu.posted) {
          if (this.timer) {clearTimeout(this.timer); delete this.timer}
          this.menu.Post(event,menu,this.ltr);
        } else {
         var menus = document.getElementById("MathJax_MenuFrame").childNodes,
              m = menus.length-1;
          while (m >= 0) {
            var child = menus[m];
            child.menuItem.posted = false;
            child.parentNode.removeChild(child);
            if (child.menuItem === this.menu) {break};
            m--;
          }
        }
      }
      return FALSE(event);
    }
  });

  /*************************************************************/
  /*
   *  A menu item that is one of several radio buttons
   */
  MENU.ITEM.RADIO = MENU.ITEM.Subclass({
    variable: null,     // the variable name
    marker: (isPC ? "\u25CF" : "\u2713"),   // the checkmark

    Init: function (name,variable,def) {
      if (!(name instanceof Array)) {name = [name,name]}  // make [id,label] pair
      this.name = name; this.variable = variable; this.With(def);
      if (this.value == null) {this.value = this.name[0]}
    },
    Label: function (def,menu) {
      var span = {className:"MathJax_MenuRadioCheck" + this.rtlClass()};
      if (CONFIG.settings[this.variable] !== this.value) {span = {style:{display:"none"}}}
      return [["span",span,[this.marker]]," "+this.Name()];
    },
    Mouseup: function (event,menu) {
      if (!this.disabled) {
        var child = menu.parentNode.childNodes;
        for (var i = 0, m = child.length; i < m; i++) {
          var item = child[i].menuItem;
          if (item && item.variable === this.variable)
            {child[i].firstChild.style.display = "none"}
        }
        menu.firstChild.display = ""; 
        CONFIG.settings[this.variable] = this.value;
        MENU.cookie[this.variable] = CONFIG.settings[this.variable]; MENU.saveCookie();
        SIGNAL.Post(["radio button",this]);
      }
      this.Remove(event,menu);
      if (this.action && !this.disabled) {this.action.call(MENU,this)}
      return FALSE(event);
    }
  });

  /*************************************************************/
  /*
   *  A menu item that is checkable
   */
  MENU.ITEM.CHECKBOX = MENU.ITEM.Subclass({
    variable: null,     // the variable name
    marker: "\u2713",   // the checkmark

    Init: function (name,variable,def) {
      if (!(name instanceof Array)) {name = [name,name]}  // make [id,label] pair
      this.name = name; this.variable = variable; this.With(def);
    },
    Label: function (def,menu) {
      var span = {className:"MathJax_MenuCheck" + this.rtlClass()};
      if (!CONFIG.settings[this.variable]) {span = {style:{display:"none"}}}
      return [["span",span,[this.marker]]," "+this.Name()];
    },
    Mouseup: function (event,menu) {
      if (!this.disabled) {
        menu.firstChild.display = (CONFIG.settings[this.variable] ? "none" : "");
        CONFIG.settings[this.variable] = !CONFIG.settings[this.variable];
        MENU.cookie[this.variable] = CONFIG.settings[this.variable]; MENU.saveCookie();
        SIGNAL.Post(["checkbox",this]);
      }
      this.Remove(event,menu);
      if (this.action && !this.disabled) {this.action.call(MENU,this)}
      return FALSE(event);
    }
  });

  /*************************************************************/
  /*
   *  A menu item that is a label
   */
  MENU.ITEM.LABEL = MENU.ITEM.Subclass({
    Init: function (name,def) {
      if (!(name instanceof Array)) {name = [name,name]}  // make [id,label] pair
      this.name = name; this.With(def);
    },
    Label: function (def,menu) {
      delete def.onmouseover, delete def.onmouseout; delete def.onmousedown;
      def.className += " MathJax_MenuLabel";
      return [this.Name()];
    }
  });

  /*************************************************************/
  /*
   *  A rule in a menu
   */
  MENU.ITEM.RULE = MENU.ITEM.Subclass({
    Label: function (def,menu) {
      delete def.onmouseover, delete def.onmouseout; delete def.onmousedown;
      def.className += " MathJax_MenuRule";
      return null;
    }
  });
  
  /*************************************************************/
  /*************************************************************/

  /*
   *  Handle the ABOUT box
   */
  MENU.About = function () {
    var HTMLCSS = OUTPUT["HTML-CSS"] || {};
    var font = 
       (HTMLCSS.imgFonts ? "image" :
       (HTMLCSS.fontInUse ?
         (HTMLCSS.webFonts ? "web" : "local")+" "+HTMLCSS.fontInUse :
       (OUTPUT.SVG ? "web SVG" : "generic")) ) + " fonts";
    var format = (!HTMLCSS.webFonts || HTMLCSS.imgFonts ? null :
        HTMLCSS.allowWebFonts.replace(/otf/,"woff or otf") + " fonts");
    var jax = ["MathJax.js v"+MathJax.fileversion,["br"]];
    jax.push(["div",{style:{"border-top":"groove 2px",margin:".25em 0"}}]);
    MENU.About.GetJax(jax,MathJax.InputJax,["InputJax","%1 Input Jax v%2"]);
    MENU.About.GetJax(jax,MathJax.OutputJax,["OutputJax","%1 Output Jax v%2"]);
    MENU.About.GetJax(jax,MathJax.ElementJax,["ElementJax","%1 Element Jax v%2"]);
    jax.push(["div",{style:{"border-top":"groove 2px",margin:".25em 0"}}]);
    MENU.About.GetJax(jax,MathJax.Extension,["Extension","%1 Extension v%2"],true);
    jax.push(["div",{style:{"border-top":"groove 2px",margin:".25em 0"}}],["center",{},[
      HUB.Browser + " v"+HUB.Browser.version + (format ? 
        " \u2014 " + _(format.replace(/ /g,""),format) : "")
    ]]);
    MENU.About.div = MENU.Background(MENU.About);
    var about = HTML.addElement(MENU.About.div,"div",{
      id: "MathJax_About"
    },[
      ["b",{style:{fontSize:"120%"}},["MathJax"]]," v"+MathJax.version,["br"],
      _(font.replace(/ /g,""),"using "+font),["br"],["br"],
      ["span",{style:{
        display:"inline-block", "text-align":"left", "font-size":"80%",
        "max-height":"20em", overflow:"auto", 
        "background-color":"#E4E4E4", padding:".4em .6em", border:"1px inset"
      }},jax],["br"],["br"],
      ["a",{href:"http://www.mathjax.org/"},["www.mathjax.org"]],
      ["img", {
        src: CONFIG.closeImg,
        style: {width:"21px", height:"21px", position:"absolute", top:".2em", right:".2em"},
        onclick: MENU.About.Remove
      }]
    ]);
    MathJax.Localization.setCSS(about);
    var doc = (document.documentElement||{});
    var H = window.innerHeight || doc.clientHeight || doc.scrollHeight || 0;
    if (MENU.prototype.msieAboutBug) {
      about.style.width = "20em"; about.style.position = "absolute";
      about.style.left = Math.floor((document.documentElement.scrollWidth - about.offsetWidth)/2)+"px";
      about.style.top = (Math.floor((H-about.offsetHeight)/3)+document.body.scrollTop)+"px";
    } else {
      about.style.marginLeft = Math.floor(-about.offsetWidth/2)+"px";
      about.style.top = Math.floor((H-about.offsetHeight)/3)+"px";
    }
  };
  MENU.About.Remove = function (event) {
    if (MENU.About.div) {document.body.removeChild(MENU.About.div); delete MENU.About.div}
  };
  MENU.About.GetJax = function (jax,JAX,type,noTypeCheck) {
    var info = [];
    for (var id in JAX) {if (JAX.hasOwnProperty(id) && JAX[id]) {
      if ((noTypeCheck && JAX[id].version) || (JAX[id].isa && JAX[id].isa(JAX)))
        {info.push(_(type[0],type[1],(JAX[id].id||id),JAX[id].version))}
    }}
    info.sort();
    for (var i = 0, m = info.length; i < m; i++) {jax.push(info[i],["br"])}
    return jax;
  };

  
  /*
   *  Handle the MathJax HELP menu
   */
  MENU.Help = function () {
    AJAX.Require("[MathJax]/extensions/HelpDialog.js",
                 function () {MathJax.Extension.Help.Dialog()});
  };
  
  /*
   *  Handle showing of element's source
   */
  MENU.ShowSource = function (event) {
    if (!event) {event = window.event}
    var EVENT = {screenX:event.screenX, screenY:event.screenY};
    if (!MENU.jax) return;
    if (this.format === "MathML") {
      var MML = MathJax.ElementJax.mml;
      if (MML && typeof(MML.mbase.prototype.toMathML) !== "undefined") {
        // toMathML() can call MathJax.Hub.RestartAfter, so trap errors and check
        try {MENU.ShowSource.Text(MENU.jax.root.toMathML("",MENU.jax),event)} catch (err) {
          if (!err.restart) {throw err}
          CALLBACK.After([this,MENU.ShowSource,EVENT],err.restart);
        }
      } else if (!AJAX.loadingToMathML) {
        AJAX.loadingToMathML = true;
        MENU.ShowSource.Window(event); // WeBKit needs to open window on click event
        CALLBACK.Queue(
          AJAX.Require("[MathJax]/extensions/toMathML.js"),
          function () {
            delete AJAX.loadingToMathML;
            if (!MML.mbase.prototype.toMathML) {MML.mbase.prototype.toMathML = function () {}}
          },
          [this,MENU.ShowSource,EVENT]  // call this function again
        );
        return;
      }
    } else if (this.format === "Error") {
      MENU.ShowSource.Text(MENU.jax.errorText,event);
    } else if (CONFIG.semanticsAnnotations[this.format]) {
      var annotation = MENU.jax.root.getAnnotation(this.format);
      if (annotation.data[0]) MENU.ShowSource.Text(annotation.data[0].toString());
    } else {
      if (MENU.jax.originalText == null) {
        alert(_("NoOriginalForm","No original form available"));
        return;
      }
      MENU.ShowSource.Text(MENU.jax.originalText,event);
    }
  };
  MENU.ShowSource.Window = function (event) {
    if (!MENU.ShowSource.w) {
      var def = [], DEF = CONFIG.windowSettings;
      for (var id in DEF) {if (DEF.hasOwnProperty(id)) {def.push(id+"="+DEF[id])}}
      MENU.ShowSource.w = window.open("","_blank",def.join(","));
    }
    return MENU.ShowSource.w;
  };
  MENU.ShowSource.Text = function (text,event) {
    var w = MENU.ShowSource.Window(event); delete MENU.ShowSource.w;
    text = text.replace(/^\s*/,"").replace(/\s*$/,"");
    text = text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    var title = _("EqSource","MathJax Equation Source");
    if (MENU.isMobile) {
      w.document.open();
      w.document.write("<html><head><meta name='viewport' content='width=device-width, initial-scale=1.0' /><title>"+title+"</title></head><body style='font-size:85%'>");
      w.document.write("<pre>"+text+"</pre>");
      w.document.write("<hr><input type='button' value='"+_("Close","Close")+"' onclick='window.close()' />");
      w.document.write("</body></html>");
      w.document.close();
    } else {
      w.document.open();
      w.document.write("<html><head><title>"+title+"</title></head><body style='font-size:85%'>");
      w.document.write("<table><tr><td><pre>"+text+"</pre></td></tr></table>");
      w.document.write("</body></html>");
      w.document.close();
      var table = w.document.body.firstChild;
      setTimeout(function () {
        var H = (w.outerHeight-w.innerHeight)||30, W = (w.outerWidth-w.innerWidth)||30, x, y;
        W = Math.max(100,Math.min(Math.floor(.5*screen.width),table.offsetWidth+W+25));
        H = Math.max(40,Math.min(Math.floor(.5*screen.height),table.offsetHeight+H+25));
        if (MENU.prototype.msieHeightBug) {H += 35}; // for title bar in XP
        w.resizeTo(W,H);
        var X; try {X = event.screenX} catch (e) {}; // IE8 throws an error accessing screenX
        if (event && X != null) {
          x = Math.max(0,Math.min(event.screenX-Math.floor(W/2), screen.width-W-20));
          y = Math.max(0,Math.min(event.screenY-Math.floor(H/2), screen.height-H-20));
          w.moveTo(x,y);
        }
      },50);
    }
  };
  
  /*
   *  Handle rescaling all the math
   */
  MENU.Scale = function () {
    var HTMLCSS = OUTPUT["HTML-CSS"], nMML = OUTPUT.NativeMML, SVG = OUTPUT.SVG;
    var SCALE = (HTMLCSS||nMML||SVG||{config:{scale:100}}).config.scale;
    var scale = prompt(_("ScaleMath","Scale all mathematics (compared to surrounding text) by"),SCALE+"%");
    if (scale) {
      if (scale.match(/^\s*\d+(\.\d*)?\s*%?\s*$/)) {
        scale = parseFloat(scale);
        if (scale) {
          if (scale !== SCALE) {
            if (HTMLCSS) {HTMLCSS.config.scale = scale}
            if (nMML)    {nMML.config.scale = scale}
            if (SVG)     {SVG.config.scale = scale}
            MENU.cookie.scale = scale;
            MENU.saveCookie(); HUB.Rerender();
          }
        } else {alert(_("NonZeroScale","The scale should not be zero"))}
      } else {alert(_("PercentScale",
                      "The scale should be a percentage (e.g., 120%%)"))}
    }
  };
  
  /*
   *  Handle loading the zoom code
   */
  MENU.Zoom = function () {
    if (!MathJax.Extension.MathZoom) {AJAX.Require("[MathJax]/extensions/MathZoom.js")}
  };
  
  /*
   *  Handle changing the renderer
   */
  MENU.Renderer = function () {
    var jax = HUB.outputJax["jax/mml"];
    if (jax[0] !== CONFIG.settings.renderer) {
      var BROWSER = HUB.Browser, message, MESSAGE = MENU.Renderer.Messages, warned;
      //
      //  Check that the new renderer is appropriate for the browser
      //
      switch (CONFIG.settings.renderer) {
        case "NativeMML":
          if (!CONFIG.settings.warnedMML) {
            if (BROWSER.isChrome && BROWSER.version.substr(0,3) !== "24.") {message = MESSAGE.MML.WebKit} 
            else if (BROWSER.isSafari && !BROWSER.versionAtLeast("5.0")) {message = MESSAGE.MML.WebKit}
            else if (BROWSER.isMSIE) {if (!BROWSER.hasMathPlayer) {message = MESSAGE.MML.MSIE}}
            else {message = MESSAGE.MML[BROWSER]}
            warned = "warnedMML";
          }
          break;

        case "SVG":
          if (!CONFIG.settings.warnedSVG) {
            if (BROWSER.isMSIE && !isIE9) {message = MESSAGE.SVG.MSIE}
          }
          break;  
      }
      if (message) {
        message = _(message[0],message[1]);
        message += "\n\n";
        message += _("SwitchAnyway",
                     "Switch the renderer anyway?\n\n" +
                     "(Press OK to switch, CANCEL to continue with the current renderer)");
        MENU.cookie.renderer = jax[0].id; MENU.saveCookie();
        if (!confirm(message)) {
          MENU.cookie.renderer = CONFIG.settings.renderer = HTML.Cookie.Get("menu").renderer;
          MENU.saveCookie();
          return;
        }
        if (warned) {MENU.cookie.warned  = CONFIG.settings.warned = true}
        MENU.cookie.renderer = CONFIG.settings.renderer; MENU.saveCookie();
      }
      HUB.Queue(
        ["setRenderer",HUB,CONFIG.settings.renderer,"jax/mml"],
        ["Rerender",HUB]
      );
    }
  };
  MENU.Renderer.Messages = {
    MML: {
      WebKit:  ["WebkitNativeMMLWarning",
                 "Your browser doesn't seem to support MathML natively, " +
                 "so switching to MathML output may cause the mathematics " +
                 "on the page to become unreadable."],

      MSIE:    ["MSIENativeMMLWarning",
                 "Internet Explorer requires the MathPlayer plugin " +
                 "in order to process MathML output."],
      
      Opera:   ["OperaNativeMMLWarning",
                 "Opera's support for MathML is limited, so switching to " +
                 "MathML output may cause some expressions to render poorly."],

      Safari:  ["SafariNativeMMLWarning",
                 "Your browser's native MathML does not implement all the features " +
                 "used by MathJax, so some expressions may not render properly."],

      Firefox: ["FirefoxNativeMMLWarning",
                 "Your browser's native MathML does not implement all the features " +
                 "used by MathJax, so some expressions may not render properly."]
    },
    
    SVG: {
      MSIE:    ["MSIESVGWarning",
                 "SVG is not implemented in Internet Explorer prior to " +
                 "IE9 or when it is emulating IE8 or below. " +
                 "Switching to SVG output will cause the mathematics to " +
                 "not display properly."]
    }
  };
  
  /*
   *  Handle setting the HTMLCSS fonts
   */
  MENU.Font = function () {
    var HTMLCSS = OUTPUT["HTML-CSS"]; if (!HTMLCSS) return;
    document.location.reload();
  };
  
  /*
   *  Handle selection of locale and rerender the page
   */
  MENU.Locale = function () {
    MathJax.Localization.setLocale(CONFIG.settings.locale);
    MathJax.Hub.Queue(["Reprocess",MathJax.Hub]); // FIXME: Just reprocess error messages?
  };
  MENU.LoadLocale = function () {
    var url = prompt(_("LoadURL","Load translation data from this URL:"));
    if (url) {
      if (!url.match(/\.js$/)) {
        alert(_("BadURL",
          "The URL should be for a javascript file that defines MathJax translation data.  " +
          "Javascript file names should end with '.js'"
        ));
      }
      AJAX.Require(url,function (status) {
        if (status != AJAX.STATUS.OK) {alert(_("BadData","Failed to load translation data from %1",url))}
      });
    }
  };
  
  /*
   *  Handle setting MathPlayer events
   */
  MENU.MPEvents = function (item) {
    var discoverable = CONFIG.settings.discoverable,
        MESSAGE = MENU.MPEvents.Messages;
    if (!isIE9) {
      if (CONFIG.settings.mpMouse && !confirm(_.apply(_,MESSAGE.IE8warning))) {
        delete MENU.cookie.mpContext; delete CONFIG.settings.mpContext;
        delete MENU.cookie.mpMouse; delete CONFIG.settings.mpMouse;
        MENU.saveCookie();
        return;
      }
      CONFIG.settings.mpContext = CONFIG.settings.mpMouse;
      MENU.cookie.mpContext = MENU.cookie.mpMouse = CONFIG.settings.mpMouse;
      MENU.saveCookie();
      MathJax.Hub.Queue(["Rerender",MathJax.Hub])
    } else if (!discoverable && item.name[1] === "Menu Events" && CONFIG.settings.mpContext) {
      alert(_.apply(_,MESSAGE.IE9warning));
    }
  };

  MENU.MPEvents.Messages = {
    IE8warning: ["IE8warning",
      "This will disable the MathJax menu and zoom features, " +
      "but you can Alt-Click on an expression to obtain the MathJax " +
      "menu instead.\n\nReally change the MathPlayer settings?"],

    IE9warning: ["IE9warning",
      "The MathJax contextual menu will be disabled, but you can " +
      "Alt-Click on an expression to obtain the MathJax menu instead."]
  };
  
  /*************************************************************/
  /*************************************************************/

  HUB.Browser.Select({
    MSIE: function (browser) {
      var quirks = (document.compatMode === "BackCompat");
      var isIE8 = browser.versionAtLeast("8.0") && document.documentMode > 7;
      MENU.Augment({
        margin: 20,
        msieBackgroundBug: ((document.documentMode||0) < 9),
        msieFixedPositionBug: (quirks || !isIE8),
        msieAboutBug: quirks,
        msieHeightBug: ((document.documentMode||0) < 9)
           // height of window doesn't include title bar in XP
      });
      if (isIE9) {
        delete CONFIG.styles["#MathJax_About"].filter;
        delete CONFIG.styles[".MathJax_Menu"].filter;
      }
    },
    Firefox: function (browser) {
      MENU.skipMouseover = browser.isMobile && browser.versionAtLeast("6.0");
      MENU.skipMousedown = browser.isMobile;
    }
  });
  MENU.isMobile      = HUB.Browser.isMobile;
  MENU.noContextMenu = HUB.Browser.noContextMenu;

  /*************************************************************/

  //
  //  Creates the locale menu from the list of locales in MathJax.Localization.strings
  //
  MENU.CreateLocaleMenu = function () {
    if (!MENU.menu) return;
    var menu = MENU.menu.Find("Language").menu, items = menu.items;
    //
    //  Get the names of the languages and sort them
    //
    var locales = [], LOCALE = MathJax.Localization.strings;
    for (var id in LOCALE) {if (LOCALE.hasOwnProperty(id)) {locales.push(id)}}
    locales = locales.sort(); menu.items = [];
    //
    //  Add a menu item for each
    //
    for (var i = 0, m = locales.length; i < m; i++) {
      var title = LOCALE[locales[i]].menuTitle;
      if (title) {title += " ("+locales[i]+")"} else {title = locales[i]}
      menu.items.push(ITEM.RADIO([locales[i],title],"locale",{action:MENU.Locale}));
    }
    //
    //  Add the rule and "Load from URL" items
    //
    menu.items.push(items[items.length-2],items[items.length-1]);
  };

  //
  // Create the annotation menu from MathJax.Hub.config.semanticsAnnotations
  //
  MENU.CreateAnnotationMenu = function () {
    if (!MENU.menu) return;
    var menu = MENU.menu.Find("Show Math As","Annotation").menu;
    var annotations = CONFIG.semanticsAnnotations;
    for (var a in annotations) {
      if (annotations.hasOwnProperty(a)) {
        menu.items.push(ITEM.COMMAND([a,a], MENU.ShowSource, {hidden: true, nativeTouch: true, format: a}));
      }
    }
  };

  /*************************************************************/

  HUB.Register.StartupHook("End Config",function () {

    /*
     *  Get the menu settings from the HUB (which includes the
     *  data from the cookie already), and add the format, if
     *  it wasn't set in the cookie.
     */
    CONFIG.settings = HUB.config.menuSettings;
    if (typeof(CONFIG.settings.showRenderer) !== "undefined") {CONFIG.showRenderer = CONFIG.settings.showRenderer}
    if (typeof(CONFIG.settings.showFontMenu) !== "undefined") {CONFIG.showFontMenu = CONFIG.settings.showFontMenu}
    if (typeof(CONFIG.settings.showContext)  !== "undefined") {CONFIG.showContext  = CONFIG.settings.showContext}
    MENU.getCookie();

    /*
     *  The main menu
     */
    // Localization: items used as key, should be refactored.
    MENU.menu = MENU(
      ITEM.SUBMENU(["Show","Show Math As"],
        ITEM.COMMAND(["MathMLcode","MathML Code"],  MENU.ShowSource, {nativeTouch: true, format: "MathML"}),
        ITEM.COMMAND(["Original","Original Form"],  MENU.ShowSource, {nativeTouch: true}),
        ITEM.SUBMENU(["Annotation","Annotation"], {disabled:true}),
        ITEM.RULE(),
        ITEM.CHECKBOX(["texHints","Show TeX hints in MathML"], "texHints"),
        ITEM.CHECKBOX(["semantics","Add original form as annotation"], "semantics")
      ),
      ITEM.RULE(),
      ITEM.SUBMENU(["Settings","Math Settings"],
        ITEM.SUBMENU(["ZoomTrigger","Zoom Trigger"],
          ITEM.RADIO(["Hover","Hover"],               "zoom", {action: MENU.Zoom}),
          ITEM.RADIO(["Click","Click"],               "zoom", {action: MENU.Zoom}),
          ITEM.RADIO(["DoubleClick","Double-Click"],  "zoom", {action: MENU.Zoom}),
          ITEM.RADIO(["NoZoom","No Zoom"],            "zoom", {value: "None"}),
          ITEM.RULE(),
          ITEM.LABEL(["TriggerRequires","Trigger Requires:"]),
          ITEM.CHECKBOX((HUB.Browser.isMac ? ["Option","Option"] : ["Alt","Alt"]), "ALT"),
          ITEM.CHECKBOX(["Command","Command"],    "CMD",  {hidden: !HUB.Browser.isMac}),
          ITEM.CHECKBOX(["Control","Control"],    "CTRL", {hidden:  HUB.Browser.isMac}),
          ITEM.CHECKBOX(["Shift","Shift"],        "Shift")
        ),
        ITEM.SUBMENU(["ZoomFactor","Zoom Factor"],
          ITEM.RADIO("125%", "zscale"),
          ITEM.RADIO("133%", "zscale"),
          ITEM.RADIO("150%", "zscale"),
          ITEM.RADIO("175%", "zscale"),
          ITEM.RADIO("200%", "zscale"),
          ITEM.RADIO("250%", "zscale"),
          ITEM.RADIO("300%", "zscale"),
          ITEM.RADIO("400%", "zscale")
        ),
        ITEM.RULE(),
        ITEM.SUBMENU(["Renderer","Math Renderer"],    {hidden:!CONFIG.showRenderer},
          ITEM.RADIO("HTML-CSS",  "renderer", {action: MENU.Renderer}),
          ITEM.RADIO("Fast HTML", "renderer", {action: MENU.Renderer, value:"CommonHTML"}),
          ITEM.RADIO("MathML",    "renderer", {action: MENU.Renderer, value:"NativeMML"}),
          ITEM.RADIO("SVG",       "renderer", {action: MENU.Renderer}),
          ITEM.RULE(),
          ITEM.CHECKBOX("Fast Preview", "CHTMLpreview")
        ),
        ITEM.SUBMENU("MathPlayer",  {hidden:!HUB.Browser.isMSIE || !CONFIG.showMathPlayer,
                                                    disabled:!HUB.Browser.hasMathPlayer},
          ITEM.LABEL(["MPHandles","Let MathPlayer Handle:"]),
          ITEM.CHECKBOX(["MenuEvents","Menu Events"],             "mpContext", {action: MENU.MPEvents, hidden:!isIE9}),
          ITEM.CHECKBOX(["MouseEvents","Mouse Events"],           "mpMouse",   {action: MENU.MPEvents, hidden:!isIE9}),
          ITEM.CHECKBOX(["MenuAndMouse","Mouse and Menu Events"], "mpMouse",   {action: MENU.MPEvents, hidden:isIE9})
        ),
        ITEM.SUBMENU(["FontPrefs","Font Preference"],       {hidden:!CONFIG.showFontMenu},
          ITEM.LABEL(["ForHTMLCSS","For HTML-CSS:"]),
          ITEM.RADIO(["Auto","Auto"],          "font", {action: MENU.Font}),
          ITEM.RULE(),
          ITEM.RADIO(["TeXLocal","TeX (local)"],   "font", {action: MENU.Font}),
          ITEM.RADIO(["TeXWeb","TeX (web)"],       "font", {action: MENU.Font}),
          ITEM.RADIO(["TeXImage","TeX (image)"],   "font", {action: MENU.Font}),
          ITEM.RULE(),
          ITEM.RADIO(["STIXLocal","STIX (local)"], "font", {action: MENU.Font}),
          ITEM.RADIO(["STIXWeb","STIX (web)"], "font", {action: MENU.Font}),
          ITEM.RULE(),
          ITEM.RADIO(["AsanaMathWeb","Asana Math (web)"], "font", {action: MENU.Font}),
          ITEM.RADIO(["GyrePagellaWeb","Gyre Pagella (web)"], "font", {action: MENU.Font}),
          ITEM.RADIO(["GyreTermesWeb","Gyre Termes (web)"], "font", {action: MENU.Font}),
          ITEM.RADIO(["LatinModernWeb","Latin Modern (web)"], "font", {action: MENU.Font}),
          ITEM.RADIO(["NeoEulerWeb","Neo Euler (web)"], "font", {action: MENU.Font})
        ),
        ITEM.SUBMENU(["ContextMenu","Contextual Menu"],    {hidden:!CONFIG.showContext},
          ITEM.RADIO("MathJax", "context"),
          ITEM.RADIO(["Browser","Browser"], "context")
        ),
        ITEM.COMMAND(["Scale","Scale All Math ..."],MENU.Scale),
        ITEM.RULE().With({hidden:!CONFIG.showDiscoverable, name:["","discover_rule"]}),
        ITEM.CHECKBOX(["Discoverable","Highlight on Hover"], "discoverable", {hidden:!CONFIG.showDiscoverable})
      ),
      ITEM.SUBMENU(["Locale","Language"],                  {hidden:!CONFIG.showLocale, ltr:true},
        ITEM.RADIO("en", "locale",  {action: MENU.Locale}),
        ITEM.RULE().With({hidden:!CONFIG.showLocaleURL, name:["","localURL_rule"]}),
        ITEM.COMMAND(["LoadLocale","Load from URL ..."], MENU.LoadLocale, {hidden:!CONFIG.showLocaleURL})
      ),
      ITEM.RULE(),
      ITEM.COMMAND(["About","About MathJax"],MENU.About),
      ITEM.COMMAND(["Help","MathJax Help"],MENU.Help)
    );

    if (MENU.isMobile) {
      (function () {
        var settings = CONFIG.settings;
        var trigger = MENU.menu.Find("Math Settings","Zoom Trigger").menu;
        trigger.items[0].disabled = trigger.items[1].disabled = true;
        if (settings.zoom === "Hover" || settings.zoom == "Click") {settings.zoom = "None"}
        trigger.items = trigger.items.slice(0,4);
    
        if (navigator.appVersion.match(/[ (]Android[) ]/)) {
          MENU.ITEM.SUBMENU.Augment({marker: "\u00BB"});
        }
      })();
    }

    MENU.CreateLocaleMenu();
    MENU.CreateAnnotationMenu();
  });
  
  MENU.showRenderer = function (show) {
    MENU.cookie.showRenderer = CONFIG.showRenderer = show; MENU.saveCookie();
    MENU.menu.Find("Math Settings","Math Renderer").hidden = !show;
  };
  MENU.showMathPlayer = function (show) {
    MENU.cookie.showMathPlayer = CONFIG.showMathPlayer = show; MENU.saveCookie();
    MENU.menu.Find("Math Settings","MathPlayer").hidden = !show;
  };
  MENU.showFontMenu = function (show) {
    MENU.cookie.showFontMenu = CONFIG.showFontMenu = show; MENU.saveCookie();
    MENU.menu.Find("Math Settings","Font Preference").hidden = !show;
  };
  MENU.showContext = function (show) {
    MENU.cookie.showContext = CONFIG.showContext = show; MENU.saveCookie();
    MENU.menu.Find("Math Settings","Contextual Menu").hidden = !show;
  };
  MENU.showDiscoverable = function (show) {
    MENU.cookie.showDiscoverable = CONFIG.showDiscoverable = show; MENU.saveCookie();
    MENU.menu.Find("Math Settings","Highlight on Hover").hidden = !show;
    MENU.menu.Find("Math Settings","discover_rule").hidden = !show;
  };
  MENU.showLocale = function (show) {
    MENU.cookie.showLocale = CONFIG.showLocale = show; MENU.saveCookie();
    MENU.menu.Find("Language").hidden = !show;
  };
  
  MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function () {
    if (!MathJax.OutputJax["HTML-CSS"].config.imageFont)
      {MENU.menu.Find("Math Settings","Font Preference","TeX (image)").disabled = true}
  });
  
  /*************************************************************/

  CALLBACK.Queue(
    HUB.Register.StartupHook("End Config",{}), // wait until config is complete
    ["getImages",MENU],
    ["Styles",AJAX,CONFIG.styles],
    ["Post",HUB.Startup.signal,"MathMenu Ready"],
    ["loadComplete",AJAX,"[MathJax]/extensions/MathMenu.js"]
  );

})(MathJax.Hub,MathJax.HTML,MathJax.Ajax,MathJax.CallBack,MathJax.OutputJax);
