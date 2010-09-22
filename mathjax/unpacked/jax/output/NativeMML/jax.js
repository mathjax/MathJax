/*************************************************************
 *
 *  MathJax/jax/output/NativeMML/jax.js
 *
 *  Implements the NativeMML OutputJax that displays mathematics
 *  using a browser's native MathML capabilities (if any).
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

(function (MML,nMML,HUB,AJAX) {
  var isMSIE = HUB.Browser.isMSIE;
  
  nMML.Augment({
    LEFTBUTTON: (isMSIE ? 1 : 0),  // the event.button value for left button
    MENUKEY: "altKey",                         // the event value for alternate context menu
    noContextMenuBug: HUB.Browser.isKonequeror,
    msieQuirks: (isMSIE && !(document.compatMode === "BackCompat")),
    
    //
    //  User can configure styles
    //
    config: {styles: {}}, settings: HUB.config.menuSettings,
    Startup: function () {return MathJax.Ajax.Styles(this.config.styles)},
    Config: function () {
      this.SUPER(arguments).Config.call(this);
      if (this.settings.scale) {this.config.scale = this.settings.scale}
    },
    
    //
    //  Add a SPAN to use as a container, and render the math into it
    //  
    Translate: function (script) {
      if (!script.parentNode) return;
      var prev = script.previousSibling;
      if (prev && String(prev.className).match(/^MathJax(_MathML|_Display)?$/))
        {prev.parentNode.removeChild(prev)}
      var math = script.MathJax.elementJax.root;
      var type = (math.Get("display") === "block" ? "div" : "span");
      var span = document.createElement(type), container = span;
      span.className = "MathJax_MathML"; span.style.fontSize = this.config.scale+"%";
      if (isMSIE) {
        container = MathJax.HTML.addElement(span,"span",{
          className:"MathJax_MathContainer",
          style:{display:"inline-block",position:"relative"}
        });
      }
      math.toNativeMML(container);
      script.parentNode.insertBefore(span,script);
      if (isMSIE) {
        if (this.config.showMathMenuMSIE) {this.MSIEoverlay(span)}
      } else {
        math = span.firstChild;
        math.oncontextmenu = this.ContextMenu;
        math.onmouseover   = this.Mouseover;
        math.onmousedown   = this.Mousedown;
        math.onclick       = this.Click;
        math.ondblclick    = this.DblClick;
      }
    },
    //
    //  Remove MathML preceeding the script
    //
    Remove: function (jax) {
      var span = jax.SourceElement(); if (!span) return;
      span = span.previousSibling; if (!span) return;
      if (span.className.match(/MathJax_MathML/)) {span.parentNode.removeChild(span)}
    },
    //
    //  The namespace to use for MML
    //
    MMLnamespace: "http://www.w3.org/1998/Math/MathML",

    //
    //  For MSIE, we must overlay the MathPlayer object to trap the events
    //  (since they can't be cancelled when the events are on the <math> tag
    //  itself).  The events we DON'T want are transferred to the math element,
    //  and the others are handled directly.
    //
    MSIEoverlay: function (span) {
      var math = span.firstChild;
      span.style.position = "absolute"; // so we can measure height/depth
      var HD = span.scrollHeight, W = span.offsetWidth;
      var tmp = MathJax.HTML.addElement(span,"img",{src:"about:blank",style:{width:0,height:HD+"px"}});
      var D = span.scrollHeight - HD; span.removeChild(tmp);
      span.style.position = "";        // back to normal
      var top, left, isDisplay = (span.parentNode.nodeName.toLowerCase() === "div");
      if (isDisplay && this.quirks) {top = -HD; left = Math.floor(-W/2)} else {top = D-HD, left = -W}
      MathJax.HTML.addElement(span,"span",{
        style:{display:"inline-block", width:0, height:0, position:"relative"}
      },[["span",{
        style:{display:"inline-block", position:"absolute", left:left+"px", top:top+"px",
        width:math.offsetWidth+"px", height:HD+"px", cursor:"pointer",
        "background-color":"white", filter:"alpha(opacity=0)"},
        onmousedown: this.MSIEevent, oncontextmenu: this.MSIEevent, onclick: this.MSIEevent,
        /*onmouseup: this.MSIEevent,*/ onmousemove: this.MSIEevent, ondblclick: this.MSIEevent,
        onmouseover: this.MSIEevent, onmouseout: this.MSIEevent
      }]]);
    },
    MSIEmath: function (span) {
      // display="block" seems to produce an extra span, so need extra firstChild
      var math = span.parentNode.previousSibling.firstChild;
      return (math.nodeName.toLowerCase() === "span" ? math.firstChild : math);
    },
    MSIEevent: function () {
      var math = nMML.MSIEmath(this);
      var event = window.event;
      var action = nMML["MSIE"+event.type];
      if (action && action.call(nMML,event,math,this)) {return false}
      math.fireEvent("on"+event.type,event);
      return false;
    },
    MSIEmousedown: function (event,math,span) {
      if (event[this.MENUKEY] && event.button === this.LEFTBUTTON && this.settings.context !== "MathJax") {
        this.trapUp = this.trapClick = true;
        this.ContextMenu.call(span,event,true);
        return true;
      }
      if (this.MSIEzoomKeys && this.MSIEzoomKeys(event)) {this.trapUp = true; return true}
      return false;
    },
    MSIEcontextmenu: function (event,math,span) {
      if (this.settings.context === "MathJax") {
        this.trapUp = this.trapClick = true;
        this.ContextMenu.call(span,event,true);
        return true;
      }
      return false;
    },
    // Other event handlers are in MathZoom.js

    //
    //  Autoload the MathMenu code, when needed
    //
    ContextMenu: function (event,force) {
      if (nMML.config.showMathMenu && (nMML.settings.context === "MathJax" || force)) {
        if (nMML.safariContextMenuBug) {setTimeout('window.getSelection().empty()',0)}
        var MENU = MathJax.Menu;
        if (MENU) {
          if (document.selection) {setTimeout("document.selection.empty()",0)}
          var script = (isMSIE ? this.parentNode.parentNode.nextSibling : this.parentNode.nextSibling);
          MENU.jax = HUB.getJaxFor(script);
          MENU.menu.items[1].menu.items[1].name = 
            (MENU.jax.inputJax.id === "MathML" ? "Original" : MENU.jax.inputJax.id);
          delete nMML.trapClick; delete nMML.trapUp;
          return MENU.menu.Post(event);
        } else {
          if (!AJAX.loadingMathMenu) {
            AJAX.loadingMathMenu = true;
            if (!event) {event = window.event}
            var EVENT = {pageX:event.pageX, pageY:event.pageY, clientX:event.clientX, clientY:event.clientY};
            MathJax.Callback.Queue(
              AJAX.Require("[MathJax]/extensions/MathMenu.js"),
              function () {delete AJAX.loadingMathMenu},
              [this,arguments.callee,EVENT,force]  // call this function again
            );
          }
          if (!event) {event = window.event}
          if (event.preventDefault) {event.preventDefault()}
          if (event.stopPropagation) {event.stopPropagation()}
          event.cancelBubble = true;
          event.returnValue = false;
          return false;
        }
      }
    },
    Mousedown: function (event) {
      if (nMML.config.showMathMenu) {
        if (!event) {event = window.event}
        if (nMML.settings.context === "MathJax") {
          if (!nMML.noContextMenuBug || event.button !== 2) return
        } else {
          if (!event[nMML.MENUKEY] || event.button !== nMML.LEFTBUTTON) return
        }
        return nMML.ContextMenu.call(this,event,true);
      }
    },
    /*
     *  Used for zooming, when that is enabled by the MathMenu
     */
    Mouseover: function (event) {nMML.HandleEvent(event,"Mouseover",this)},
    Click: function (event) {nMML.HandleEvent(event,"Click",this)},
    DblClick: function (event) {nMML.HandleEvent(event,"DblClick",this)},
    HandleEvent: function (event,type,math) {},

    NAMEDSPACE: {
      negativeveryverythinmathspace:  "-.0556em",
      negativeverythinmathspace:      "-.1111em",
      negativethinmathspace:          "-.1667em",
      negativemediummathspace:        "-.2222em",
      negativethickmathspace:         "-.2778em",
      negativeverythickmathspace:     "-.3333em",
      negativeveryverythickmathspace: "-.3889em"
    }
  });
  
  MML.mbase.Augment({
    //
    //  Add a MathML tag of the correct type, and set its attributes
    //    then populate it with its children and append it to the parent
    //
    toNativeMML: function (parent) {
      var tag = this.NativeMMLelement(this.type);
      this.NativeMMLattributes(tag);
      for (var i = 0, m = this.data.length; i < m; i++) {
        if (this.data[i]) {this.data[i].toNativeMML(tag)}
          else {tag.appendChild(this.NativeMMLelement("mrow"))}
      }
      parent.appendChild(tag);
    },
    //
    //  Look for attributes that are different from the defaults
    //    and set those in the tag's attribute list
    //
    NativeMMLattributes: function (tag) {
      var defaults = this.defaults;
      var copy = this.NativeMMLcopyAttributes,
          skip = this.NativeMMLskipAttributes;
      if (this.type === "mstyle") {defaults = MML.math.prototype.defaults}
      for (var id in defaults) {if (!skip[id] && defaults.hasOwnProperty(id)) {
        if (this[id] != null) {tag.setAttribute(id,this.NativeMMLattribute(id,this[id]))}
      }}
      for (var i = 0, m = copy.length; i < m; i++) {
        if (this[copy[i]] != null)
          {tag.setAttribute(copy[i],this.NativeMMLattribute(copy[i],this[copy[i]]))}
      }
    },
    NativeMMLcopyAttributes: [
      "fontfamily","fontsize","fontweight","fontstyle",
      "color","background",
      "id","class","href","style"
    ],
    NativeMMLskipAttributes: {texClass: 1, useHeight: 1, texprimestyle: 1},
    NativeMMLattribute: function (id,value) {
      value = String(value);
      if (nMML.NAMEDSPACE[value]) {value = nMML.NAMEDSPACE[value]} // MP doesn't do negative spaes
      else if (value.match(/^\s*([-+]?(\d+(\.\d*)?|\.\d+))\s*mu\s*$/)) {value = ((1/18)*RegExp.$1)+"em"} // FIXME:  should take scriptlevel into account
      else if (value === "-tex-caligraphic") {value = "script"}
      else if (value === "-tex-oldstyle") {value = "normal"}
      return value;
    },
    //
    //  Create a MathML element
    //
    NativeMMLelement: (
      isMSIE ?
        function (type) {return document.createElement("mjx:"+type)} :
        function (type) {return document.createElementNS(nMML.MMLnamespace,type)}
    )
  });
  
  MML.mrow.Augment({
    //
    //  Make inferred rows not include an mrow tag
    //
    toNativeMML: function (parent) {
      if (this.inferred  && this.parent.inferRow) {
        for (var i = 0, m = this.data.length; i < m; i++) {
          if (this.data[i]) {this.data[i].toNativeMML(parent)}
            else {parent.appendChild(this.NativeMMLelement("mrow"))}
        }
      } else {
        this.SUPER(arguments).toNativeMML.call(this,parent);
      }
    }
  });
  
  MML.msubsup.Augment({
    //
    //  Use proper version of msub, msup, or msubsup, depending on
    //  which items are present
    //
    toNativeMML: function (parent) {
      var type = this.type;
      if (this.data[this.sup] == null) {type = "msub"}
      if (this.data[this.sub] == null) {type = "msup"}
      var tag = this.NativeMMLelement(type);
      this.NativeMMLattributes(tag);
      delete this.data[0].inferred;
      for (var i = 0, m = this.data.length; i < m; i++)
        {if (this.data[i]) {this.data[i].toNativeMML(tag)}}
      parent.appendChild(tag);
    }
  });
  
  MML.munderover.Augment({
    //
    //  Use proper version of munder, mover, or munderover, depending on
    //  which items are present
    //
    toNativeMML: function (parent) {
      var type = this.type;
      if (this.data[this.under] == null) {type = "mover"}
      if (this.data[this.over] == null)  {type = "munder"}
      var tag = this.NativeMMLelement(type);
      this.NativeMMLattributes(tag);
      delete this.data[0].inferred;
      for (var i = 0, m = this.data.length; i < m; i++)
        {if (this.data[i]) {this.data[i].toNativeMML(tag)}}
      parent.appendChild(tag);
    }
  });
  
  if (MathJax.Hub.Browser.isFirefox) {
    MML.mtable.Augment({
      toNativeMML: function (parent) {
        //
        //  FF doesn't handle width, so put it in styles instead
        //
        if (this.width) {
          var styles = (this.style||"").replace(/;\s*$/,"").split(";");
          styles.push("width:"+this.width);
          this.style = styles.join(";");
        }
        this.SUPER(arguments).toNativeMML.call(this,parent);
      }
    });
    MML.mlabeledtr.Augment({
      toNativeMML: function (parent) {
        //
        //  FF doesn't handle mlabeledtr, so remove the label
        //
        var tag = this.NativeMMLelement("mtr");
        this.NativeMMLattributes(tag);
        for (var i = 1, m = this.data.length; i < m; i++) {
          if (this.data[i]) {this.data[i].toNativeMML(tag)}
          else {tag.appendChild(this.NativeMMLelement("mrow"))}
        }
        parent.appendChild(tag);
      }
    });
    
    var fontDir = MathJax.Hub.config.root + "/fonts/HTML-CSS/TeX/otf";
    
    /*
     *  Add fix for mathvariant issues in FF
     */
    nMML.Augment({
      config: {
        styles: {
          '[mathvariant="double-struck"]':          {"font-family":"MathJax_AMS"},
          '[mathvariant="script"]':                 {"font-family":"MathJax_Script"},
          '[mathvariant="fraktur"]':                {"font-family":"MathJax_Fraktur"},
          '[mathvariant="-tex-oldstyle"]':          {"font-family":"MathJax_Caligraphic"},
          '[mathvariant="-tex-oldstyle-bold"]':     {"font-family":"MathJax_Caligraphic", "font-weight":"bold"},
          '[mathvariant="-tex-caligraphic"]':       {"font-family":"MathJax_Caligraphic"},
          '[mathvariant="-tex-caligraphic-bold"]':  {"font-family":"MathJax_Caligraphic", "font-weight":"bold"},
          '[mathvariant="bold-script"]':            {"font-family":"MathJax_Script", "font-weight":"bold"},
          '[mathvariant="bold-fraktur"]':           {"font-family":"MathJax_Fraktur", "font-weight":"bold"},
          '[mathvariant="monospace"]':              {"font-family":"monospace"},
          '[mathvariant="sans-serif"]':             {"font-family":"sansserif"},
          '[mathvariant="bold-sans-serif"]':        {"font-family":"sansserif", "font-weight":"bold"},
          '[mathvariant="sans-serif-italic"]':      {"font-family":"sansserif", "font-style":"italic"},
          '[mathvariant="sans-serif-bold-italic"]': {"font-family":"sansserif", "font-style":"italic", "font-weight":"bold"},

          '@font-face /*1*/': {
            "font-family": "MathJax_AMS",
            "src": "local('MathJax_AMS'), url('"+fontDir+"/MathJax_AMS-Regular.otf')"
          },
          '@font-face /*2*/': {
            "font-family": "MathJax_Script",
            "src": "local('MathJax_Script'), url('"+fontDir+"/MathJax_Script-Regular.otf')"
          },
          '@font-face /*3*/': {
            "font-family": "MathJax_Fraktur",
            "src": "local('MathJax_Fraktur'), url('"+fontDir+"/MathJax_Fraktur-Regular.otf')"
          },
          '@font-face /*4*/': {
            "font-family": "MathJax_Caligraphic",
            "src": "local('MathJax_Caligraphic'), url('"+fontDir+"/MathJax_Caligraphic-Regular.otf')"
          },
          '@font-face /*5*/': {
            "font-family": "MathJax_Fraktur", "font-weight":"bold",
            "src": "local('MathJax_Fraktur-Bold'), url('"+fontDir+"/MathJax_Fraktur-Bold.otf')"
          },
          '@font-face /*6*/': {
            "font-family": "MathJax_Caligraphic", "font-weight":"bold",
            "src": "local('MathJax_Caligraphic-Bold'), url('"+fontDir+"/MathJax_Caligraphic-Bold.otf')"
          }
        }
      }
    });
  }
  
  MML.TeXAtom.Augment({
    //
    //  Convert TeXatom to an mrow
    //
    toNativeMML: function (parent) {
      // FIXME:  Handle spacing using mpadded?
      var tag = this.NativeMMLelement("mrow");
      this.data[0].toNativeMML(tag);
      parent.appendChild(tag);
    }
  });
  
  MML.chars.Augment({
    //
    //  Add a text node
    //
    toNativeMML: function (parent) {
      parent.appendChild(document.createTextNode(this.toString()));
    }
  });
  
  MML.entity.Augment({
    //
    //  Add a text node
    //
    toNativeMML: function (parent) {
      parent.appendChild(document.createTextNode(this.toString()));
    }
  });
  
  MathJax.Hub.Register.StartupHook("TeX mathchoice Ready",function () {
    MML.TeXmathchoice.Augment({
      //
      //  Get the MathML for the selected choice
      //
      toNativeMML: function (parent) {this.Core().toNativeMML(parent)}
    });
  });
  
  if (HUB.config.menuSettings.zoom !== "None")
    {AJAX.Require("[MathJax]/extensions/MathZoom.js")}

  nMML.loadComplete("jax.js");

})(MathJax.ElementJax.mml, MathJax.OutputJax.NativeMML, MathJax.Hub, MathJax.Ajax);
