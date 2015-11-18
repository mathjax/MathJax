/*************************************************************
 *
 *  MathJax/jax/output/PlainSource/jax.js
 *
 *  Implements the PlainSource OutputJax that displays whatever
 *  source there was, for assistive technology users who prefer this.
 *
 *  ---------------------------------------------------------------------
 *
 *  Copyright (c) 2015 The MathJax Consortium
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


(function(AJAX, HUB, HTML, PlainSource) {
  var MML;

  var EVENT, TOUCH, HOVER; // filled in later


  PlainSource.Augment({
    settings: HUB.config.menuSettings,

    hideProcessedMath: false, // use display:none until all math is processed

    maxStretchyParts: 1000, // limit the number of parts allowed for
    // stretchy operators. See issue 366.

    Config: function() {
      if (!this.require) {
        this.require = []
      }
      this.SUPER(arguments).Config.call(this);
      var settings = this.settings;
      if (settings.scale) {
        this.config.scale = settings.scale
      }
      this.require.push(MathJax.OutputJax.extensionDir + "/MathEvents.js");
    },

    Startup: function() {
      //
      //  Set up event handling
      //
      EVENT = MathJax.Extension.MathEvents.Event;
      TOUCH = MathJax.Extension.MathEvents.Touch;
      HOVER = MathJax.Extension.MathEvents.Hover;
      this.ContextMenu = EVENT.ContextMenu;
      this.Mousedown = EVENT.AltContextMenu;
      this.Mouseover = HOVER.Mouseover;
      this.Mouseout = HOVER.Mouseout;
      this.Mousemove = HOVER.Mousemove;

    },

    preTranslate: function(state) {
      var scripts = state.jax[this.id],
        i, m = scripts.length,
        script, prev, span, div, jax;
      //
      //  Loop through the scripts
      //
      for (i = 0; i < m; i++) {
        script = scripts[i];
        if (!script.parentNode) continue;
        //
        //  Remove any existing output
        //
        prev = script.previousSibling;
        if (prev && String(prev.className).match(/^MathJax_PlainSource(_Display)?( MathJax_Processing)?$/)) {
          prev.parentNode.removeChild(prev)
        }
        //
        //  Add the span, and a div if in display mode,
        //  then set the role and mark it as being processed
        //
        jax = script.MathJax.elementJax;
        if (!jax) continue;
        jax.PlainSource = {
          display: (jax.root.Get("display") === "block")
        }
        span = div = HTML.Element("span", {
          className: "MathJax_PlainSource",
          id: jax.inputID + "-Frame",
          isMathJax: true,
          jaxID: this.id,
          oncontextmenu: EVENT.Menu,
          onmousedown: EVENT.Mousedown,
          onmouseover: EVENT.Mouseover,
          onmouseout: EVENT.Mouseout,
          onmousemove: EVENT.Mousemove,
          onclick: EVENT.Click,
          ondblclick: EVENT.DblClick,
          // Added for keyboard accessible menu.
          onkeydown: EVENT.Keydown,
          tabIndex: "0"
        });
        if (HUB.Browser.noContextMenu) {
          span.ontouchstart = TOUCH.start;
          span.ontouchend = TOUCH.end;
        }
        if (jax.PlainSource.display) {
          div = HTML.Element("div", {
            className: "MathJax_PlainSource_Display"
          });
          div.appendChild(span);
        }
        //
        div.className += " MathJax_Processing";
        script.parentNode.insertBefore(div, script);
      }
    },

    Translate: function(script, state) {
      if (!script.parentNode) return;

      //
      //  Get the data about the math
      //
      var jax = script.MathJax.elementJax,
        math = jax.root,
        span = document.getElementById(jax.inputID + "-Frame"),
        div = (jax.PlainSource.display ? span.parentNode : span);
      //
      //  Typeset the math
      //
      this.initPlainSource(math, span);
      //      math.setTeXclass();
      // try {math.toPreviewHTML(span)} catch (err) {
      //   if (err.restart) {while (span.firstChild) {span.removeChild(span.firstChild)}}
      //   throw err;
      // }

      //NEWSTUFF
      if (jax.inputJax === "MathML") {
        console.log("Yay! MathML!");
        if (jax.root.data[0].data.length > 0) {
          if (jax.root.data[0].data[0].type === "semantics") {
              if (jax.root.data[0].data[0].data[1].attr.encoding === "application/x-tex"){
                span.innerHTML = jax.root.data[0].data[0].data[1].data[0].data[0];
                console.log("yay Annotation TeX");
              }
          }

        } else {
          span.innerHTML = jax.originalText;
        }
      }
      // span.innerHTML = jax.originalText;



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
          jax.PlainSource.preview = script.MathJax.preview;
          delete script.MathJax.preview;
        }
      }
    },

    postTranslate: function(state) {
      var scripts = state.jax[this.id];
      if (!this.hideProcessedMath) return;
      for (var i = 0, m = scripts.length; i < m; i++) {
        var script = scripts[i];
        if (script && script.MathJax.elementJax) {
          //
          //  Remove the processed marker
          //
          script.previousSibling.className = script.previousSibling.className.split(/ /)[0];
          var data = script.MathJax.elementJax.PlainSource;
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
    },

    getJaxFromMath: function(math) {
      if (math.parentNode.className === "MathJax_PlainSource_Display") {
        math = math.parentNode
      }
      do {
        math = math.nextSibling
      } while (math && math.nodeName.toLowerCase() !== "script");
      return HUB.getJaxFor(math);
    },

    initPlainSource: function(math, span) {},

    Remove: function(jax) {
      var span = document.getElementById(jax.inputID + "-Frame");
      if (span) {
        if (jax.PlainSource.display) {
          span = span.parentNode
        }
        span.parentNode.removeChild(span);
      }
      delete jax.PlainSource;
    },


  });

  MathJax.Hub.Register.StartupHook("mml Jax Ready", function() {
    MathJax.Hub.Register.StartupHook("onLoad", function() {
      setTimeout(MathJax.Callback(["loadComplete", PlainSource, "jax.js"]), 0);
    });
  });

  MathJax.Hub.Register.StartupHook("End Cookie", function() {
    if (HUB.config.menuSettings.zoom !== "None") {
      AJAX.Require("[MathJax]/extensions/MathZoom.js")
    }
  });

})(MathJax.Ajax, MathJax.Hub, MathJax.HTML, MathJax.OutputJax.PlainSource);
