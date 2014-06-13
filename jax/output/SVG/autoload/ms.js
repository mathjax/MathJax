/*
 *  /MathJax/jax/output/SVG/autoload/ms.js
 *
 *  Copyright (c) 2009-2014 The MathJax Consortium
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

MathJax.Hub.Register.StartupHook("SVG Jax Ready",function(){var b="2.4.0";var a=MathJax.ElementJax.mml,c=MathJax.OutputJax.SVG;a.ms.Augment({toSVG:function(){this.SVGgetStyles();var e=this.SVG();this.SVGhandleSpace(e);var d=this.getValues("lquote","rquote");var f=this.SVGgetVariant(),h=this.SVGgetScale();var g=this.data.join("");e.Add(this.SVGhandleVariant(f,h,d.lquote+g+d.rquote));e.Clean();this.SVGhandleColor(e);this.SVGsaveData(e);return e}});a.ms.prototype.defaults.mathvariant="monospace";MathJax.Hub.Startup.signal.Post("SVG ms Ready");MathJax.Ajax.loadComplete(c.autoloadDir+"/ms.js")});
