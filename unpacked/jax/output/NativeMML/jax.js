/*************************************************************
 *
 *  MathJax/jax/output/NativeMML/jax.js
 *
 *  Implements the NativeMML OutputJax that displays mathematics
 *  using a browser's native MathML capabilities (if any).
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

(function (nMML,HUB,AJAX,HTML,EVENT) {
  var MML, isMSIE = HUB.Browser.isMSIE;
  
  var EVENT, TOUCH, HOVER; // filled in later
  
  nMML.Augment({
    LEFTBUTTON: (isMSIE ? 1 : 0),  // the event.button value for left button
    MENUKEY: "altKey",             // the event value for alternate context menu
    noContextMenuBug: HUB.Browser.isKonequeror,
    msieQuirks: (isMSIE && !(document.compatMode === "BackCompat")),
    msieEventBug: HUB.Browser.isIE9,
    
    //
    //  User can configure styles
    //
    config: {styles: {}}, settings: HUB.config.menuSettings,
    Startup: function () {
      //  Set up event handling
      EVENT = MathJax.Extension.UIevents.Event;
      TOUCH = MathJax.Extension.UIevents.Touch;
      HOVER = MathJax.Extension.UIevents.Hover;
      this.ContextMenu = EVENT.ContextMenu;
      this.Mousedown   = EVENT.AltContextMenu;
      this.Mouseover   = HOVER.Mouseover;
      this.Mouseout    = HOVER.Mouseout;
      this.Mousemove   = HOVER.Mousemove;
      return AJAX.Styles(this.config.styles);
    },
    Config: function () {
      this.SUPER(arguments).Config.call(this);
      if (this.settings.scale) {this.config.scale = this.settings.scale}
      //
      //  Insert styling to take account of displayAlign and displayIndent
      //
      if (HUB.config.displayAlign !== "center") {
        var align = HUB.config.displayAlign, indent = HUB.config.displayIndent;
        var def = {"text-align": align+"!important"}; def["margin-"+align] = indent+"!important";
        MathJax.Hub.Insert(this.config.styles,{
          "div.MathJax_MathML": def,
          "div.MathJax_MathML math": {"text-align": align},
          "div.MathJax_MathContainer > span": {"text-align": align+"!important"}
        });
      }
      this.require.push(MathJax.OutputJax.extensionDir+"/UIevents.js");
    },
    //
    //  Set up MathPlayer for IE on the first time through.
    //
    InitializeMML: function () {
      this.initialized = true;
      if (HUB.Browser.isMSIE) {
        try {
          //
          //  Insert data needed to use MathPlayer for MathML output
          //
          var mathplayer = document.createElement("object");
          mathplayer.id = "mathplayer"; mathplayer.classid = "clsid:32F66A20-7614-11D4-BD11-00104BD3F987";
          document.getElementsByTagName("head")[0].appendChild(mathplayer);
          document.namespaces.add("mjx","http://www.w3.org/1998/Math/MathML");
          document.namespaces.mjx.doImport("#mathplayer");
        } catch (err) {
          //
          //  If that fails, give an alert about security settings
          //
          alert("MathJax was not able to set up MathPlayer.\n\n"+
                "If MathPlayer is not installed, you need to install it first.\n"+
                "Otherwise, your security settings may be preventing ActiveX     \n"+
                "controls from running.  Use the Internet Options item under\n"+
                "the Tools menu and select the Security tab, then press the\n"+
                "Custom Level button. Check that the settings for\n"+
                "'Run ActiveX Controls', and 'Binary and script behaviors'\n"+
                "are enabled.\n\n"+
                "Currently you will see error messages rather than\n"+
                "typeset mathematics.");
        }
      }
    },
    
    //
    //  Add a SPAN to use as a container, and render the math into it
    //  
    Translate: function (script) {
      if (!script.parentNode) return;
      if (!this.initialized) {this.InitializeMML()}
      var prev = script.previousSibling;
      if (prev && String(prev.className).match(/^MathJax(_MathML|_Display)?$/))
        {prev.parentNode.removeChild(prev)}
      var math = script.MathJax.elementJax.root;
      var type = (math.Get("display") === "block" ? "div" : "span");
      var span = HTML.Element(type,{
        className: "MathJax_MathML", style: {"font-size": this.config.scale+"%"}
      },[["span",{
          className:"MathJax_MathContainer", isMathJax: true, jaxID:this.id,
          style:{position:"relative", display:"inline-block", "white-space":"nowrap"}
        }, [["span",{isMathJax:true, style:{display:"inline-block"}}]] // for Firefox hover and zoom
      ]]), container = span.firstChild;
      math.toNativeMML(container.firstChild);
      script.parentNode.insertBefore(span,script);
      if (isMSIE) {
        if (container.addEventListener) {
          container.addEventListener("contextmenu",EVENT.Menu,true);
          container.addEventListener("mouseover",EVENT.Mouseover,true);
          container.addEventListener("mouseout",EVENT.Mouseout,true);
          container.addEventListener("mousedown",EVENT.Mousedown,true);
          container.addEventListener("mouseup",EVENT.False,true);
          container.addEventListener("click",EVENT.Click,true);
          container.addEventListener("dblclick",EVENT.DblClick,true);
        } else {
          var config = (this.config.showMathMenuMSIE != null ? this : HUB).config;
          if (config.showMathMenuMSIE) {this.MSIEoverlay(container)}
        }
      } else {
        container.oncontextmenu = EVENT.Menu;
        container.onmouseover   = EVENT.Mouseover;
        container.onmouseout    = EVENT.Mouseout;
        container.onmousedown   = EVENT.Mousedown;
        container.onclick       = EVENT.Click;
        container.ondblclick    = EVENT.DblClick;
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
      if (math.nodeName.toLowerCase() === "span") {math = math.firstChild}
      var bbox = this.getHoverBBox(null,math,{});
      HTML.addElement(span,"span",{
        style:{display:"inline-block", width:0, height:0, position:"relative"}
      },[["span",{isMathJax: true, className: "MathJax_MathPlayer_Overlay",
        style:{
          display:"inline-block", position:"absolute",
          left:bbox.Units(-bbox.w), top:bbox.Units(-bbox.h-(bbox.y||0)-1),
          width:bbox.Units(bbox.w), height:bbox.Units(bbox.h+bbox.d), cursor:"pointer",
          "background-color":"white", filter:"alpha(opacity=0)"
        }
      }]]);
      HUB.Insert(span,{
        msieMath: math,
        onmousedown: this.MSIEevent, oncontextmenu: this.MSIEevent, onclick: this.MSIEevent,
        onmouseup: this.MSIEevent, onmousemove: this.MSIEevent, ondblclick: this.MSIEevent,
        onmouseover: this.MSIEevent, onmouseout: this.MSIEevent
      });
    },
    MSIEevents: {
      mousedown:"Mousedown", contextmenu:"ContextMenu", click:"Click",
      mouseup:"Mouseup", mousemove:"Mousemove", dblclick: "DblClick",
      mouseover:"Mouseover", mouseout:"Mouseout"
    },
    MSIEevent: function () {
      var event = window.event;
      var type = nMML.MSIEevents[event.type];
      if (nMML[type] && nMML[type](event,this) === false) {return false}
      if (MathJax.Extension.MathZoom && MathJax.Extension.MathZoom.HandleEvent(event,type,this) === false) {return false}
      if (event.srcElement.className === "MathJax_MathPlayer_Overlay" && this.msieMath.fireEvent)
        {this.msieMath.fireEvent("on"+event.type,event)}
      return EVENT.False(event);
    },

    getJaxFromMath: function (math) {
      if (math.className === "MathJax_MSIE_Overlay") {math = math.parentNode.parentNode}
      return HUB.getJaxFor(math.parentNode.nextSibling);
    },
    getHoverSpan: function (jax,math) {
      if (math.className === "MathJax_MSIE_Overlay") {return math.parentNode}
      return math.firstChild;
    },
    getHoverBBox: function (jax,span,math) {
      span = span.parentNode;
      span.appendChild(this.topImg);
      var h = this.topImg.offsetTop, d = span.offsetHeight-h, w = span.offsetWidth;
      span.removeChild(this.topImg);
      var x = (math.className === "MathJax_MSIE_Overlay" ? -w : 0);
      return {w:w, h:h, d:d, x:x}
    },


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

  HUB.Register.StartupHook("mml Jax Ready",function () {

    MML = MathJax.ElementJax.mml;

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
      NativeMMLelement: function (type) {
        var math = (isMSIE ? document.createElement("mjx:"+type) :
	                     document.createElementNS(nMML.MMLnamespace,type));
        math.isMathJax = true;
        return math;
      }
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

    if (HUB.Browser.isFirefox) {
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
    
    MML.xml.Augment({
      //
      //  Insert the XML verbatim
      //
      toNativeMML: function (parent) {
        for (var i = 0, m = this.data.length; i < m; i++)
          {parent.appendChild(this.data[i].cloneNode(true))}
      }
    });

    HUB.Register.StartupHook("TeX mathchoice Ready",function () {
      MML.TeXmathchoice.Augment({
	//
	//  Get the MathML for the selected choice
	//
	toNativeMML: function (parent) {this.Core().toNativeMML(parent)}
      });
    });

    //
    //  Loading isn't complete until the element jax is modified,
    //  but can't call loadComplete within the callback for "mml Jax Ready"
    //  (it would call NativeMML's Require routine, asking for the mml jax again)
    //  so wait until after the mml jax has finished processing.
    //
    setTimeout(MathJax.Callback(["loadComplete",nMML,"jax.js"]),0);
  });
  

  //
  //  Determine browser characteristics
  //
  HUB.Browser.Select({
    MSIE: function (browser) {
      var quirks = (document.compatMode === "BackCompat");
      var isIE8 = browser.versionAtLeast("8.0") && document.documentMode > 7;
      nMML.msieInlineBlockAlignBug = (!isIE8 || quirks);
      nMML.msieTopBug = (!browser.versionAtLeast("8.0") || document.documentMode === 7);
    },
    Opera: function (browser) {
      nMML.operaPositionBug = true;
    }
  });
  
  //
  //  Used in measuring zoom and hover positions
  //
  nMML.topImg = (nMML.msieInlineBlockAlignBug ?
    HTML.Element("img",{style:{width:0,height:0,position:"relative"},src:"about:blank"}) :
    HTML.Element("span",{style:{width:0,height:0,display:"inline-block"}})
  );
  if (nMML.operaPositionBug || nMML.msieTopBug) {nMML.topImg.style.border="1px solid"}


  HUB.Register.StartupHook("End Cookie",function () {
    if (HUB.config.menuSettings.zoom !== "None")
      {AJAX.Require("[MathJax]/extensions/MathZoom.js")}
  });

})(MathJax.OutputJax.NativeMML, MathJax.Hub, MathJax.Ajax, MathJax.HTML, MathJax.HTML.Event);
