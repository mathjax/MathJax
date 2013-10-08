/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/Neo-Euler/fontdata-extra.js
 *  
 *  Adds extra stretchy characters to the Neo-Euler fonts

 *  Copyright (c) 2013 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function (HTMLCSS) {
  var VERSION = "2.3";

  var DELIMITERS = HTMLCSS.FONTDATA.DELIMITERS;

  var H = "H", V = "V";

  var ALPHABETS = "NeoEulerMathJax_Alphabets",
      ARROWS = "NeoEulerMathJax_Arrows",
      FRAKTUR = "NeoEulerMathJax_Fraktur",
      MAIN = "NeoEulerMathJax_Main",
      MARKS = "NeoEulerMathJax_Marks",
      NONUNICODE = "NeoEulerMathJax_NonUnicode",
      NORMAL = "NeoEulerMathJax_Normal",
      OPERATORS = "NeoEulerMathJax_Operators",
      SCRIPT = "NeoEulerMathJax_Script",
      SHAPES = "NeoEulerMathJax_Shapes",
      SIZE1 = "NeoEulerMathJax_Size1",
      SIZE2 = "NeoEulerMathJax_Size2",
      SIZE3 = "NeoEulerMathJax_Size3",
      SIZE4 = "NeoEulerMathJax_Size4",
      SIZE5 = "NeoEulerMathJax_Size5",
      SYMBOLS = "NeoEulerMathJax_Symbols",
      VARIANTS = "NeoEulerMathJax_Variants",
      DOUBLESTRUCK = "NeoEulerMathJax_Normal",
      SANSSERIF = "NeoEulerMathJax_Normal",
      MONOSPACE = "NeoEulerMathJax_Normal";

  var delim = {

  };
  
  for (var id in delim) {if (delim.hasOwnProperty(id)) {DELIMITERS[id] = delim[id]}};

  MathJax.Ajax.loadComplete(HTMLCSS.fontDir + "/fontdata-extra.js");

})(MathJax.OutputJax["HTML-CSS"]);
