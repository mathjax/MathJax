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

(function (HUB,HTML,AJAX) {
  var VERSION = "1.0.1";
  
  var isPC = HUB.Browser.isPC, isMSIE = HUB.Browser.isMSIE;
  var ROUND = (isPC ? null : "5px");
  
  var CONFIG = HUB.Insert({
    delay: 150,                                    // the delay for submenus
    helpURL: "http://www.mathjax.org/help/user/",  // the URL for the "MathJax Help" menu

    showRenderer: true,                            //  show the "Math Renderer" menu?
    showFontMenu: false,                           //  show the "Font Preference" menu?
    showContext:  false,                           //  show the "Context Menu" menu?

    windowSettings: {                              // for source window
      status: "no", toolbar: "no", locationbar: "no", menubar: "no",
      directories: "no", personalbar: "no", resizable: "yes", scrollbars: "yes",
      width: 100, height: 50
    },
    
    styles: {
      ".MathJax_Menu": {
        position:"absolute", "background-color":"white", color:"black",
        width:"auto", padding:(isPC ? "2px" : "5px 0px"),
        border:"1px solid #CCCCCC", margin:0, cursor:"default",
        font: "menu", "text-align":"left", "text-indent":0, "text-transform":"none",
        "line-height":"normal", "letter-spacing":"normal", "word-spacing":"normal",
        "word-wrap":"normal", "white-space":"nowrap", "float":"none", "z-index":201,

        "border-radius": ROUND,                     // Opera 10.5
        "-webkit-border-radius": ROUND,             // Safari and Chrome
        "-moz-border-radius": ROUND,                // Firefox
        "-khtml-border-radius": ROUND,              // Konqueror

        "box-shadow":"0px 10px 20px #808080",         // Opera 10.5
        "-webkit-box-shadow":"0px 10px 20px #808080", // Safari 3 and Chrome
        "-moz-box-shadow":"0px 10px 20px #808080",    // Forefox 3.5
        "-khtml-box-shadow":"0px 10px 20px #808080",  // Konqueror
        filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')" // IE
      },

      ".MathJax_MenuItem": {
        padding: (isPC ? "2px 2em" : "1px 2em"),
        background:"transparent"
      },

      ".MathJax_MenuTitle": {
        "background-color":"#CCCCCC",
        margin: (isPC ? "-1px -1px 1px -1px" : "-5px 0 0 0"),
        "text-align":"center", "font-style":"italic", "font-size":"80%", color:"#444444",
        padding:"2px 0", overflow:"hidden"
      },

      ".MathJax_MenuArrow": {
        position:"absolute", right:".5em", color:"#666666",
        "font-family": (isMSIE ? "'Arial unicode MS'" : null)
      },
      ".MathJax_MenuActive .MathJax_MenuArrow": {color:"white"},

      ".MathJax_MenuCheck": {
        position:"absolute", left:".7em",
        "font-family": (isMSIE ? "'Arial unicode MS'" : null)
      },

      ".MathJax_MenuRadioCheck": {
        position:"absolute", left: (isPC ? "1em" : ".7em")
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
      }
    }
  },(HUB.config.MathMenu||{}));
  
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
    Post: function (event,parent) {
      if (!event) {event = window.event};
      var title = (!this.title ? null : [["div",{className: "MathJax_MenuTitle"},[this.title]]]);
      var div = document.getElementById("MathJax_MenuFrame");
      if (!div) {div = MENU.Background(this)}
      var menu = HTML.addElement(div,"div",{
        onmouseup: MENU.Mouseup, ondblclick: this.False,
        ondragstart: this.False, onselectstart: this.False, oncontextmenu: this.False,
        menuItem: this, className: "MathJax_Menu"
      },title);
      
      for (var i = 0, m = this.items.length; i < m; i++) {this.items[i].Create(menu)}
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
        MENU.skipUp = true;
      } else {
        var side = "left", mw = parent.offsetWidth;
        x = parent.offsetWidth - 2; y = 0;
        while (parent && parent !== div) {
          x += parent.offsetLeft; y += parent.offsetTop;
          parent = parent.parentNode;
        }
        if (x + menu.offsetWidth > document.body.offsetWidth - this.margin)
          {side = "right"; x = Math.max(this.margin,x - mw - menu.offsetWidth + 6)}
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
      return this.False(event);
    },

    /*
     *  Remove the menu from the screen
     */
    Remove: function (event,menu) {
      var div = document.getElementById("MathJax_MenuFrame");
      if (div) {
        div.parentNode.removeChild(div);
        if (this.msieBackgroundBug) {detachEvent("onresize",MENU.Resize)}
      }
    },
    Mouseup: function (event,menu) {
      if (MENU.skipUp) {delete MENU.skipUp} else {this.Remove(event,menu)}
    },

    False: FALSE
  },{
    config: CONFIG,

    div: null,     // the DOM elements for the menu and submenus

    Remove:    function (event) {MENU.Event(event,this,"Remove")},
    Mouseover: function (event) {MENU.Event(event,this,"Mouseover")},
    Mouseout:  function (event) {MENU.Event(event,this,"Mouseout")},
    Mousedown: function (event) {MENU.Event(event,this,"Mousedown")},
    Mouseup:   function (event) {MENU.Event(event,this,"Mouseup")},
    Mousemove: function (event) {MENU.Event(event,this,"Mousemove")},
    Event: function (event,menu,type) {
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
      if (menu.msieBackgroundBug) {
        //  MSIE doesn't allow transparent background to be hit boxes, so
        //  fake it using opacity with solid background color
        bg.style.backgroundColor = "white"; bg.style.filter = "alpha(opacity=0)";
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
    getCookie: function () {this.cookie = HTML.Cookie.Get("menu")}

  });

  /*************************************************************/
  /*
   *  The menu item root subclass
   */
  var ITEM = MENU.ITEM = MathJax.Object.Subclass({
    name: "", // the menu item's label

    Create: function (menu) {
      if (!this.hidden) {
        var def = {
          onmouseover: MENU.Mouseover, onmouseout: MENU.Mouseout,
          onmouseup: MENU.Mouseup, onmousedown: this.False,
          ondragstart: this.False, onselectstart: this.False, onselectend: this.False,
          className: "MathJax_MenuItem", menuItem: this
        };
        if (this.disabled) {def.className += " MathJax_MenuDisabled"}
        HTML.addElement(menu,"div",def,this.Label(def,menu));
      }
    },

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
        if (this.Timer) {this.Timer(event,menu)}
      }
    },
    Mouseout: function (event,menu) {
      if (!this.menu || !this.menu.posted) {this.Deactivate(menu)}
      if (this.timer) {clearTimeout(this.timer); delete this.timer}
    },
    Mouseup: function (event,menu) {return this.Remove(event,menu)},

    Remove: function (event,menu) {
      menu = menu.parentNode.menuItem;
      return menu.Remove(event,menu);
    },

    Activate: function (menu) {this.Deactivate(menu); menu.className += " MathJax_MenuActive"},
    Deactivate: function (menu) {menu.className = menu.className.replace(/ MathJax_MenuActive/,"")},

    With: function (def) {if (def) {HUB.Insert(this,def)}; return this},
    False: FALSE
  });

  /*************************************************************/
  /*
   *  A menu item that performs a command when selected
   */
  MENU.ITEM.COMMAND = MENU.ITEM.Subclass({
    action: function () {},

    Init: function (name,action,def) {
      this.name = name; this.action = action;
      this.With(def);
    },
    Label: function (def,menu) {return [this.name]},
    Mouseup: function (event,menu) {
      if (!this.disabled) {this.Remove(event,menu); this.action.call(this,event)}
      return this.False(event);
    }
  });

  /*************************************************************/
  /*
   *  A menu item that posts a submenu
   */
  MENU.ITEM.SUBMENU = MENU.ITEM.Subclass({
    menu: null,        // the submenu
    marker: (isPC && !HUB.Browser.isSafari ? "\u25B6" : "\u25B8"),  // the menu arrow

    Init: function (name,def) {
      this.name = name; var i = 1;
      if (!(def instanceof MENU.ITEM)) {this.With(def), i++}
      this.menu = MENU.apply(MENU,[].slice.call(arguments,i));
    },
    Label: function (def,menu) {
      def.onmousemove = MENU.Mousemove; this.menu.posted = false;
      return [this.name+" ",["span",{className:"MathJax_MenuArrow"},[this.marker]]];
    },
    Timer: function (event,menu) {
      if (this.timer) {clearTimeout(this.timer)}
      event = {clientX: event.clientX, clientY: event.clientY}; // MSIE can't pass the event below
      this.timer = setTimeout(MathJax.Callback(["Mouseup",this,event,menu]),CONFIG.delay);
    },
    Mouseup: function (event,menu) {
      if (!this.disabled) {
        if (!this.menu.posted) {
          if (this.timer) {clearTimeout(this.timer); delete this.timer}
          this.menu.Post(event,menu);
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
      return this.False(event);
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
      this.name = name; this.variable = variable; this.With(def);
      if (this.value == null) {this.value = this.name}
    },
    Label: function (def,menu) {
      var span = {className:"MathJax_MenuRadioCheck"};
      if (CONFIG.settings[this.variable] !== this.value) {span = {style:{display:"none"}}}
      return [["span",span,[this.marker]]," "+this.name];
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
        if (this.action) {this.action.call(MENU)}
      }
      this.Remove(event,menu);
      return this.False(event);
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
      this.name = name; this.variable = variable; this.With(def);
    },
    Label: function (def,menu) {
      var span = {className:"MathJax_MenuCheck"};
      if (!CONFIG.settings[this.variable]) {span = {style:{display:"none"}}}
      return [["span",span,[this.marker]]," "+this.name];
    },
    Mouseup: function (event,menu) {
      if (!this.disabled) {
        menu.firstChild.display = (CONFIG.settings[this.variable] ? "none" : "");
        CONFIG.settings[this.variable] = !CONFIG.settings[this.variable];
        MENU.cookie[this.variable] = CONFIG.settings[this.variable]; MENU.saveCookie();
        if (this.action) {this.action.call(MENU)}
      }
      this.Remove(event,menu);
      return this.False(event);
    }
  });

  /*************************************************************/
  /*
   *  A menu item that is a label
   */
  MENU.ITEM.LABEL = MENU.ITEM.Subclass({
    Init: function (name,def) {this.name = name; this.With(def)},
    Label: function (def,menu) {
      delete def.onmouseover, delete def.onmouseout; delete def.onmousedown;
      def.className += " MathJax_MenuLabel";
      return [this.name];
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
    var HTMLCSS = MathJax.OutputJax["HTML-CSS"] || {fontInUse: ""};
    var local = (HTMLCSS.webFonts ? "" : "local "), web = (HTMLCSS.webFonts ? " web" : "");
    var font = (HTMLCSS.imgFonts ? "Image" : local+HTMLCSS.fontInUse+web);
    var jax = [];
    MENU.About.GetJax(jax,MathJax.InputJax,"Input");
    MENU.About.GetJax(jax,MathJax.OutputJax,"Output");
    MENU.About.GetJax(jax,MathJax.ElementJax,"Element");
    MENU.About.div = MENU.Background(MENU.About);
    var about = MathJax.HTML.addElement(MENU.About.div,"div",{
      style:{
        position:"fixed", left:"50%", width:"auto", "text-align":"center",
        border:"3px outset", padding:"1em 2em", "background-color":"#DDDDDD",
        cursor: "default", "font-family":"message-box", "font-size":"120%",
        "font-style":"normal", "text-indent":0, "text-transform":"none",
        "line-height":"normal", "letter-spacing":"normal", "word-spacing":"normal",
        "word-wrap":"normal", "white-space":"nowrap", "float":"none", "z-index":201,
        "box-shadow":"0px 10px 20px #808080",         // Opera 10.5
        "-webkit-box-shadow":"0px 10px 20px #808080", // Safari 3 and Chrome
        "-moz-box-shadow":"0px 10px 20px #808080",    // Forefox 3.5
        "-khtml-box-shadow":"0px 10px 20px #808080",  // Konqueror
        filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')" // IE
      },
      onclick: MENU.About.Remove
    },[
      ["b",{style:{fontSize:"120%"}},["MathJax"]]," v"+MathJax.version,["br"],
      "using "+font+" fonts",["br"],["br"],
      ["span",{style:{
        display:"inline-block", "text-align":"left", "font-size":"80%",
        "background-color":"#E4E4E4", padding:".4em .6em", border:"1px inset"
      }},jax],["br"],["br"],
      ["a",{href:"http://www.mathjax.org/"},["wwww.mathjax.org"]]
    ]);
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
  MENU.About.GetJax = function (jax,JAX,type) {
    for (var id in JAX) {
      if (JAX[id].isa && JAX[id].isa(JAX))
        {jax.push(JAX[id].name+" "+type+" Jax v"+JAX[id].version,["br"])}
    }
    return jax;
  };
  
  /*
   *  Handle the MathJax HELP menu
   */
  MENU.Help = function () {
    window.open(CONFIG.helpURL,"MathJaxHelp");
  };
  
  /*
   *  Handle showing of element's source
   */
  MENU.ShowSource = function (event) {
    if (!event) {event = window.event}
    if (!MENU.jax) return;
    if (CONFIG.settings.format === "MathML") {
      var MML = MathJax.ElementJax.mml;
      if (MML && typeof(MML.mbase.prototype.toMathML) !== "undefined") {
        MENU.ShowSource.Text(MENU.jax.root.toMathML(),event);
      } else if (!AJAX.loadingToMathML) {
        AJAX.loadingToMathML = true;
        var EVENT = {screenX:event.screenX, screenY:event.screenY};
        MENU.ShowSource.Window(event); // WeBKit needs to open window on click event
        MathJax.Callback.Queue(
          AJAX.Require("[MathJax]/extensions/toMathML.js"),
          function () {delete AJAX.loadingToMathML},
          [this,arguments.callee,EVENT]  // call this function again
        );
        return;
      }
    } else {
      if (MENU.jax.originalText == null) {alert("No TeX form available"); return}
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
    var w = MENU.ShowSource.Window(event);
    text = text.replace(/^\s*/,"").replace(/\s*$/,"");
    text = text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    w.document.open();
    w.document.write("<html><head><title>MathJax Equation Source</title></head><body style='font-size:85%'>");
    w.document.write("<table><tr><td><pre>"+text+"</pre></td></tr></table>");
    w.document.write("</body></html>"); w.document.close();
    var table = w.document.body.firstChild;
    var H = (w.outerHeight-w.innerHeight)||30, W = (w.outerWidth-w.innerWidth)||30;
    W = Math.min(Math.floor(.5*screen.width),table.offsetWidth+W+25);
    H = Math.min(Math.floor(.5*screen.height),table.offsetHeight+H+25);
    w.resizeTo(W,H);
    if (event && event.screenX != null) {
      var x = Math.max(0,Math.min(event.screenX-Math.floor(W/2), screen.width-W-20)),
          y = Math.max(0,Math.min(event.screenY-Math.floor(H/2), screen.height-H-20));
      w.moveTo(x,y);
    }
    delete MENU.ShowSource.w;
  };
  
  /*
   *  Handle rescaling all the math
   */
  MENU.Scale = function () {
    var HTMLCSS = MathJax.OutputJax["HTML-CSS"], nMML = MathJax.OutputJax.NativeMML;
    var SCALE = (HTMLCSS ? HTMLCSS.config.scale : nMML.config.scale);
    var scale = prompt("Scale all mathematics (compared to surrounding text) by",SCALE+"%");
    if (scale) {
      if (scale.match(/^\s*\d+\s*%?\s*$/)) {
        scale = parseInt(scale);
        if (scale) {
          if (scale !== SCALE) {
            if (HTMLCSS) {HTMLCSS.config.scale = scale}
            if (nMML)    {nMML.config.scale = scale}
            MENU.cookie.scale = scale;
            MENU.saveCookie(); HUB.Reprocess();
          }
        } else {alert("The scale should not be zero")}
      } else {alert("The scale should be a perentage (e.g., 120%)")}
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
    var jax = HUB.config.outputJax["jax/mml"];
    if (jax[0] !== CONFIG.settings.renderer) {
      MathJax.Callback.Queue(
        ["Require",AJAX,"[MathJax]/jax/output/"+CONFIG.settings.renderer+"/config.js"],
        [function () {
          var JAX = MathJax.OutputJax[CONFIG.settings.renderer];
          for (var i = 0, m = jax.length; i < m; i++)
            {if (jax[i] === JAX) {jax.splice(i,1); break}}
          jax.unshift(JAX);
        }],
        ["Reprocess",HUB]
      );
    }
  };
  
  /*
   *  Handle setting the HTMLCSS fonts
   */
  MENU.Font = function () {
    var HTMLCSS = MathJax.OutputJax["HTML-CSS"]; if (!HTMLCSS) return;
    document.location.reload();
  };

  /*************************************************************/
  /*************************************************************/

  HUB.Browser.Select({
    MSIE: function (browser) {
      var quirks = (document.compatMode === "BackCompat");
      var isIE8 = browser.versionAtLeast("8.0") && document.documentMode > 7;
      MENU.Augment({
        margin: 20,
        msieBackgroundBug: (quirks || !isIE8),
        msieAboutBug: quirks
      });
    }
  });

  /*************************************************************/

  /*
   *  Get the menu settings from the HUB (which includes the
   *  data from the cookie already), and add the format, if
   *  it wasn't set in the cookie.
   */
  CONFIG.settings = HUB.config.menuSettings;
  if (!CONFIG.settings.format)
    {CONFIG.settings.format = (MathJax.InputJax.TeX ? "Original" : "MathML")}
  if (typeof(CONFIG.settings.showRenderer) !== "undefined") {CONFIG.showRenderer = CONFIG.settings.showRenderer}
  if (typeof(CONFIG.settings.showFontMenu) !== "undefined") {CONFIG.showFontMenu = CONFIG.settings.showFontMenu}
  if (typeof(CONFIG.settings.showContext)  !== "undefined") {CONFIG.showContext  = CONFIG.settings.showContext}
  MENU.getCookie();

  /*
   *  The main menu
   */
  MENU.menu = MENU(
    ITEM.COMMAND("Show Source",MENU.ShowSource),
    ITEM.SUBMENU("Format",
      ITEM.RADIO("MathML",   "format"),
      ITEM.RADIO("Original", "format", {value: "Original"})
    ),
    ITEM.RULE(),
    ITEM.SUBMENU("Settings",
      ITEM.SUBMENU("Zoom Trigger",
        ITEM.RADIO("Hover",         "zoom", {action: MENU.Zoom}),
        ITEM.RADIO("Click",         "zoom", {action: MENU.Zoom}),
        ITEM.RADIO("Double-Click",  "zoom", {action: MENU.Zoom}),
        ITEM.RADIO("No Zoom",       "zoom", {value: "None"}),
        ITEM.RULE(),
        ITEM.LABEL("Trigger Requires:"),
        ITEM.CHECKBOX((HUB.Browser.isMac ? "Option" : "Alt"), "ALT"),
        ITEM.CHECKBOX("Command",    "CMD",  {hidden: !HUB.Browser.isMac}),
        ITEM.CHECKBOX("Control",    "CTRL", {hidden:  HUB.Browser.isMac}),
        ITEM.CHECKBOX("Shift",      "Shift")
      ),
      ITEM.SUBMENU("Zoom Factor",
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
      ITEM.SUBMENU("Math Renderer",         {hidden:!CONFIG.showRenderer},
        ITEM.RADIO("HTML-CSS",  "renderer", {action: MENU.Renderer}),
        ITEM.RADIO("MathML",    "renderer", {action: MENU.Renderer, value:"NativeMML"})
      ),
      ITEM.SUBMENU("Font Preference",       {hidden:!CONFIG.showFontMenu},
        ITEM.LABEL("For HTML-CSS:"),
        ITEM.RADIO("Auto",          "font", {action: MENU.Font}),
        ITEM.RULE(),
        ITEM.RADIO("TeX (local)",   "font", {action: MENU.Font}),
        ITEM.RADIO("TeX (web)",     "font", {action: MENU.Font}),
        ITEM.RADIO("TeX (image)",   "font", {action: MENU.Font}),
        ITEM.RULE(),
        ITEM.RADIO("STIX (local)",  "font", {action: MENU.Font})
      ),
      ITEM.SUBMENU("Contextual Menu",       {hidden:!CONFIG.showContext},
        ITEM.RADIO("MathJax", "context"),
        ITEM.RADIO("Browser", "context")
      ),
      ITEM.COMMAND("Scale All Math ...",MENU.Scale)
    ),
    ITEM.RULE(),
    ITEM.COMMAND("About MathJax",MENU.About),
    ITEM.COMMAND("MathJax Help",MENU.Help)
  );

  MENU.showRenderer = function (show) {
    MENU.cookie.showRenderer = CONFIG.showRenderer = show; MENU.saveCookie();
    MENU.menu.items[3].menu.item[3].hidden = !show;
  };
  MENU.showFontMenu = function (show) {
    MENU.cookie.showFontMenu = CONFIG.showFontMenu = show; MENU.saveCookie();
    MENU.menu.items[3].menu.items[4].hidden = !show
  };
  MENU.showContext = function (show) {
    MENU.cookie.showContext = CONFIG.showContext = show; MENU.saveCookie();
    MENU.menu.items[3].menu.items[5].hidden = !show
  };

  /*************************************************************/

  MathJax.Callback.Queue(
    ["Styles",AJAX,CONFIG.styles],
    ["Post",HUB.Startup.signal,"MathMenu Ready"],
    ["loadComplete",AJAX,"[MathJax]/extensions/MathMenu.js"]
  );

})(MathJax.Hub,MathJax.HTML,MathJax.Ajax);
