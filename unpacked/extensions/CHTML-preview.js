/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/extensions/CHTML-preview.js
 *  
 *  Implements a fast preview using the Common-HTML output jax
 *  and then a slower update to the more accurate HTML-CSS output
 *  (or whatever the user has selected).
 *  
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2014-2015 The MathJax Consortium
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

(function (HUB,HTML) {
  
  var SETTINGS = HUB.config.menuSettings;

  var CHTMLpreview = MathJax.Extension["CHTML-preview"] = {
    version: "2.5.0",

    //
    //  Configuration for the chunking of the main output
    //  after the previews have been created, and other configuration.
    //
    config: HUB.CombineConfig("CHTML-preview",{
      Chunks: {EqnChunk: 10000, EqnChunkFactor: 1, EqnChunkDelay: 0},
      color: "inherit!important",
      updateTime: 30, updateDelay: 6,
      messageStyle: "none",
      disabled: false
    }),

    //
    //  Ajust the chunking of the output jax
    //
    Config: function () {
      HUB.Config({
        "HTML-CSS": this.config.Chunks,
        SVG: this.config.Chunks
      });
      MathJax.Ajax.Styles({".MathJax_Preview .MJXc-math":{color:this.config.color}});
      var update, delay, style, done, saved;
      var config = this.config;

      if (!config.disabled && SETTINGS.CHTMLpreview == null)
        HUB.Config({menuSettings:{CHTMLpreview:true}});
      HUB.Register.MessageHook("Begin Math Output",function () {
        if (!done && SETTINGS.CHTMLpreview && SETTINGS.renderer !== "CommonHTML") {
          update = HUB.processUpdateTime; delay = HUB.processUpdateDelay;
          style = HUB.config.messageStyle;
          HUB.processUpdateTime = config.updateTime;
          HUB.processUpdateDelay = config.updateDelay;
          HUB.Config({messageStyle: config.messageStyle});
          MathJax.Message.Clear(0,0);
          saved = true;
        }
      });
      HUB.Register.MessageHook("End Math Output",function () {
        if (!done && saved) {
          HUB.processUpdateTime = update;
          HUB.processUpdateDelay = delay;
          HUB.Config({messageStyle: style});
          done = true;
        }
      });
    },

    //
    //  Insert a preview span, if there isn't one already,
    //  and call the CommonHTML output jax to create the preview
    //
    Preview: function (data) {
      if (!SETTINGS.CHTMLpreview || SETTINGS.renderer === "CommonHTML") return;
      var preview = data.script.MathJax.preview || data.script.previousSibling;
      if (!preview || preview.className !== MathJax.Hub.config.preRemoveClass) {
        preview = HTML.Element("span",{className:MathJax.Hub.config.preRemoveClass});
        data.script.parentNode.insertBefore(preview,data.script);
        data.script.MathJax.preview = preview;
      }
      preview.innerHTML = ""; preview.style.color = "inherit";
      return this.postFilter(preview,data);
    },
    postFilter: function (preview,data) {
      //
      //  Load the CommonHTML jax if it is not already loaded
      //
      if (!data.math.root.toCommonHTML) {
        var queue = MathJax.Callback.Queue();
        queue.Push(
          ["Require",MathJax.Ajax,"[MathJax]/jax/output/CommonHTML/config.js"],
          ["Require",MathJax.Ajax,"[MathJax]/jax/output/CommonHTML/jax.js"]
        );
        HUB.RestartAfter(queue.Push({}));
      }
      data.math.root.toCommonHTML(preview);
    },

    //
    //  Hook into the input jax postFilter to create the previews as
    //  the input jax are processed.
    //
    Register: function (name) {
      HUB.Register.StartupHook(name+" Jax Require",function () {
        var jax = MathJax.InputJax[name];
        jax.postfilterHooks.Add(["Preview",MathJax.Extension["CHTML-preview"]],50);
      });
    }
  }

  //
  //  Hook into each input jax
  //
  CHTMLpreview.Register("TeX");
  CHTMLpreview.Register("MathML");
  CHTMLpreview.Register("AsciiMath");
  
  HUB.Register.StartupHook("End Config",["Config",CHTMLpreview]);
  
  HUB.Startup.signal.Post("CHTML-preview Ready");

})(MathJax.Hub,MathJax.HTML);

MathJax.Ajax.loadComplete("[MathJax]/extensions/CHTML-preview.js");

