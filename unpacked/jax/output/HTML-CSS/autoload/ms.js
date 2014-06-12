/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/autoload/ms.js
 *  
 *  Implements the HTML-CSS output for <ms> elements.
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2010-2014 The MathJax Consortium
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

MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function () {
  var VERSION = "2.4.0";
  var MML = MathJax.ElementJax.mml,
      HTMLCSS = MathJax.OutputJax["HTML-CSS"];
  
  MML.ms.Augment({
    toHTML: function (span) {
      span = this.HTMLhandleSize(this.HTMLcreateSpan(span));
      var values = this.getValues("lquote","rquote");
      var text = this.data.join("");  // FIXME:  handle mglyph?
      this.HTMLhandleVariant(span,this.HTMLgetVariant(),values.lquote+text+values.rquote);
      this.HTMLhandleSpace(span);
      this.HTMLhandleColor(span);
      this.HTMLhandleDir(span);
      return span;
    }
  });
  MML.ms.prototype.defaults.mathvariant = 'monospace';
  
  MathJax.Hub.Startup.signal.Post("HTML-CSS ms Ready");
  MathJax.Ajax.loadComplete(HTMLCSS.autoloadDir+"/ms.js");

});

