/*************************************************************
 *
 *  MathJax/extensions/mml2jax.js
 *  
 *  Implements the MathML to Jax preprocessor that locates <math> nodes
 *  within the text of a document and replaces them with SCRIPT tags
 *  for processing by MathJax.
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

MathJax.Extension.mml2jax = {
  varsion: "1.0.1",
  config: {
    element: null,          // The ID of the element to be processed
                            //   (defaults to full document)

    preview: "alttext"      // Use the <math> element's alttext as the 
                            //   preview.  Set to "none" for no preview,
                            //   or set to an array specifying an HTML snippet
                            //   to use a fixed preview for all math

  },
  MMLnamespace: "http://www.w3.org/1998/Math/MathML",
  
  PreProcess: function (element) {
    if (!this.configured) {
      MathJax.Hub.Insert(this.config,(MathJax.Hub.config.mml2jax||{}));
      if (this.config.Augment) {MathJax.Hub.Insert(this,this.config.Augment)}
      this.configured = true;
    }
    if (typeof(element) === "string") {element = document.getElementById(element)}
    if (!element) {element = this.config.element || document.body}
    var math = element.getElementsByTagName("math"), i;
    if (math.length === 0 && element.getElementsByTagNameNS)
      {math = element.getElementsByTagNameNS(this.MMLnamespace,"math")}
    if (this.msieMathTagBug) {
      for (i = math.length-1; i >= 0; i--) {
        if (math[i].nodeName === "MATH") {this.msieProcessMath(math[i])}
                                    else {this.ProcessMath(math[i])}
      }
    } else {
      for (i = math.length-1; i >= 0; i--) {this.ProcessMath(math[i])}
    }
  },
  
  ProcessMath: function (math) {
    var parent = math.parentNode;
    var script = document.createElement("script");
    script.type = "math/mml";
    parent.insertBefore(script,math);
    if (this.msieScriptBug) {
      var html = math.outerHTML;
      html = html.replace(/<\?import .*?>/,"").replace(/<\?xml:namespace .*?\/>/,"");
      html = html.replace(/<(\/?)m:/g,"<$1").replace(/&nbsp;/g,"&#xA0;");
      script.text = html;
      parent.removeChild(math);
    } else {
      var span = MathJax.HTML.Element("span"); span.appendChild(math);
      MathJax.HTML.addText(script,span.innerHTML);
    }
    if (this.config.preview !== "none") {this.createPreview(math,script)}
  },
  
  msieProcessMath: function (math) {
    var parent = math.parentNode;
    var script = document.createElement("script");
    script.type = "math/mml";
    parent.insertBefore(script,math);
    var mml = "";
    while (math && math.nodeName !== "/MATH") {
      if (math.nodeName === "#text" || math.nodeName === "#comment")
        {mml += math.nodeValue.replace(/&/g,"&#x26;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
        else {mml += this.toLowerCase(math.outerHTML)}
      var node = math;
      math = math.nextSibling;
      node.parentNode.removeChild(node);
    }
    if (math && math.nodeName === "/MATH") {math.parentNode.removeChild(math)}
    script.text = mml + "</math>";
    if (this.config.preview !== "none") {this.createPreview(math,script)}
  },
  toLowerCase: function (string) {
    var parts = string.split(/"/);
    for (var i = 0, m = parts.length; i < m; i += 2) {parts[i] = parts[i].toLowerCase()}
    return parts.join('"');
  },
  
  createPreview: function (math,script) {
    var preview;
    if (this.config.preview === "alttext") {
      var text = math.getAttribute("alttext");
      if (text != null) {preview = [this.filterText(text)]}
    } else if (this.config.preview instanceof Array) {preview = this.config.preview}
    if (preview) {
      preview = MathJax.HTML.Element("span",{className:MathJax.Hub.config.preRemoveClass},preview);
      script.parentNode.insertBefore(preview,script);
    }
  },
  
  filterText: function (text) {return text}

};

MathJax.Hub.Browser.Select({
  MSIE: function (browser) {
    MathJax.Hub.Insert(MathJax.Extension.mml2jax,{
      msieScriptBug: true,
      msieMathTagBug: true
    })
  }
});
  
MathJax.Hub.Register.PreProcessor(["PreProcess",MathJax.Extension.mml2jax]);
MathJax.Ajax.loadComplete("[MathJax]/extensions/mml2jax.js");
