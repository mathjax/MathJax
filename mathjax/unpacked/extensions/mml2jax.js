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
  varsion: "1.0.3",
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
      this.InitBrowser();
      this.configured = true;
    }
    if (typeof(element) === "string") {element = document.getElementById(element)}
    if (!element) {element = this.config.element || document.body}
    //
    //  Handle all math tags with no namespaces
    //
    this.ProcessMathArray(element.getElementsByTagName("math"));
    //
    //  Handle math with namespaces in XHTML
    //
    if (element.getElementsByTagNameNS)
      {this.ProcessMathArray(element.getElementsByTagNameNS(this.MMLnamespace,"math"))}
    //
    //  Handle math with namespaces in HTML
    //
    var html = document.getElementsByTagName("html")[0];
    if (html) {
      for (var i = 0, m = html.attributes.length; i < m; i++) {
        var attr = html.attributes[i];
        if (attr.nodeName.substr(0,6) === "xmlns:" && attr.nodeValue === this.MMLnamespace)
          {this.ProcessMathArray(element.getElementsByTagName(attr.nodeName.substr(6)+":math"))}
      }
    }
  },
  
  ProcessMathArray: function (math) {
    var i;
    if (math.length) {
      if (this.msieMathTagBug) {
        for (i = math.length-1; i >= 0; i--) {
          if (math[i].nodeName === "MATH") {this.msieProcessMath(math[i])}
                                      else {this.ProcessMath(math[i])}
        }
      } else {
        for (i = math.length-1; i >= 0; i--) {this.ProcessMath(math[i])}
      }
    }
  },
  
  ProcessMath: function (math) {
    var parent = math.parentNode;
    var script = document.createElement("script");
    script.type = "math/mml";
    parent.insertBefore(script,math);
    if (this.msieScriptBug) {
      var html = this.msieOuterHTML(math);
      html = html.replace(/<\?import .*?>/i,"").replace(/<\?xml:namespace .*?\/>/i,"");
      script.text = html.replace(/&nbsp;/g,"&#xA0;");
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
    var mml = "", node;
    while (math && math.nodeName !== "/MATH") {
      node = math; math = math.nextSibling;
      mml += this.msieNodeHTML(node);
      node.parentNode.removeChild(node);
    }
    if (math && math.nodeName === "/MATH") {math.parentNode.removeChild(math)}
    script.text = mml + "</math>";
    if (this.config.preview !== "none") {this.createPreview(math,script)}
  },
  msieNodeHTML: function (node) {
    var html, i, m;
    if (node.nodeName === "#text" || node.nodeName === "#comment")
      {html = node.nodeValue.replace(/&/g,"&#x26;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
    else if (this.msieAttributeBug) {
      // In IE, outerHTML doesn't properly quote attributes, so quote them by hand
      html = "<"+node.nodeName.toLowerCase();
      for (i = 0, m = node.attributes.length; i < m; i++) {
        if (node.attributes[i].specified) {
          html += " "+node.attributes[i].nodeName.toLowerCase()+"=";
          html += '"'+node.attributes[i].nodeValue.replace(/\"/g,'\\"')+'"';
        }
      }
      html += ">";
    } else {
      html = this.toLowerCase(node.outerHTML)
      var parts = html.split(/"/);
      for (i = 0, m = parts.length; i < m; i += 2) {parts[i] = parts[i].toLowerCase()}
      html = parts.join('"');
    }
    return html;
  },
  msieOuterHTML: function (node) {
    // IE's outerHTML doesn't properly quote 
    if (node.nodeName.charAt(0) === "#") {return this.msieNodeHTML(node)}
    if (!this.msieAttributeBug) {return node.outerHTML}
    var html = this.msieNodeHTML(node);
    for (var i = 0, m = node.childNodes.length; i < m; i++)
      {html += this.msieOuterHTML(node.childNodes[i])}
    html += "</"+node.nodeName.toLowerCase()+">"
    return html;
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
  
  filterText: function (text) {return text},
  
  InitBrowser: function () {
    MathJax.Hub.Browser.Select({
      MSIE: function (browser) {
        var test = MathJax.HTML.Element("span",{className:"mathjax"});
        MathJax.Hub.Insert(MathJax.Extension.mml2jax,{
          msieScriptBug: true,
          msieMathTagBug: true,
          msieAttributeBug: (test.outerHTML.substr(12) !== '"') // attributes aren't quoted?
        })
      }
    });
  }

};

  
MathJax.Hub.Register.PreProcessor(["PreProcess",MathJax.Extension.mml2jax]);
MathJax.Ajax.loadComplete("[MathJax]/extensions/mml2jax.js");
