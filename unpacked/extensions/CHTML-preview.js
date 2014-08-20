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
 *  Copyright (c) 2014 The MathJax Consortium
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

  var CHTMLpreview = MathJax.Extension["CHTML-preview"] = {
    version: "1.0",

    //
    //  Configuration for the chunking of the main output
    //  after the previews have been created, and other configuration.
    //
    config: HUB.CombineConfig("CHTML-preview",{
      Chunks: {EqnChunk: 10000, EqnChunkFactor: 1, EqnChunkDelay: 0},
      color: "inherit",
      updateTime: 10, updateDelay: 50,
      messageStyle: "none"
    }),

    //
    //  Ajust the chunking of the output jax
    //
    Config: function () {
      HUB.Config({
        "HTML-CSS": this.config.Chunks,
        SVG: this.config.Chunks,
      });
      MathJax.Ajax.Styles({".MathJax_Preview":{color:this.config.color}});
      var update, delay, style, done;
      var config = this.config;
      HUB.Register.MessageHook("Begin Math Output",function () {
        if (!done) {
          update = HUB.processUpdateTime; delay = HUB.processUpdateDelay;
          style = HUB.config.messageStyle;
          HUB.processUpdateTime = config.updateTime;
          HUB.processUpdateDelay = config.updateDelay;
          HUB.Config({messageStyle: config.messageStyle});
          MathJax.Message.Clear(0,0);
        }
      });
      HUB.Register.MessageHook("End Math Output",function () {
        if (!done) {
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
      var preview = data.script.previousSibling;
      if (!preview || preview.className !== MathJax.Hub.config.preRemoveClass) {
        preview = HTML.Element("span",{className:MathJax.Hub.config.preRemoveClass});
        data.script.parentNode.insertBefore(preview,data.script);
      }
      preview.innerHTML = "";
      return this.postFilter(preview,data);
      return data;
    },
    postFilter: function (preview,data) {
      try {
        data.math.root.toCommonHTML(preview);
      } catch (err) {
        if (!err.restart) {throw err} // an actual error
        return MathJax.Callback.After(["postFilter",this,preview,data],err.restart);
      }
    },

    //
    //  Hook into the inut jax postFilter to create the previews as
    //  the input jax are processed.
    //
    Register: function (name) {
      HUB.Register.StartupHook(name+" Jax Require",function () {
        var jax = MathJax.InputJax[name];
        var delay = HUB.config.delayJaxRegistration;
        HUB.config.delayJaxRegistration = true;
        HUB.Register.StartupHook(name+" Jax Ready",function () {HUB.config.delayJaxRegistration = delay});
        jax.require.push(
          "[MathJax]/jax/output/CommonHTML/config.js",
          "[MathJax]/jax/output/CommonHTML/jax.js"
        );
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

})(MathJax.Hub,MathJax.HTML);

MathJax.Ajax.loadComplete("[MathJax]/extensions/CHTML-preview.js");

