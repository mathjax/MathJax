/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/Gyre-Termes/fontdata-extra.js
 *  
 *  Adds extra stretchy characters to the Gyre-Termes fonts

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

  var ALPHABETS = "GyreTermesMathJax_Alphabets",
      ARROWS = "GyreTermesMathJax_Arrows",
      DOUBLESTRUCK = "GyreTermesMathJax_DoubleStruck",
      FRAKTUR = "GyreTermesMathJax_Fraktur",
      LATIN = "GyreTermesMathJax_Latin",
      MAIN = "GyreTermesMathJax_Main",
      MARKS = "GyreTermesMathJax_Marks",
      MISC = "GyreTermesMathJax_Misc",
      MONOSPACE = "GyreTermesMathJax_Monospace",
      NONUNICODE = "GyreTermesMathJax_NonUnicode",
      NORMAL = "GyreTermesMathJax_Normal",
      OPERATORS = "GyreTermesMathJax_Operators",
      SANSSERIF = "GyreTermesMathJax_SansSerif",
      SCRIPT = "GyreTermesMathJax_Script",
      SHAPES = "GyreTermesMathJax_Shapes",
      SIZE1 = "GyreTermesMathJax_Size1",
      SIZE2 = "GyreTermesMathJax_Size2",
      SIZE3 = "GyreTermesMathJax_Size3",
      SIZE4 = "GyreTermesMathJax_Size4",
      SIZE5 = "GyreTermesMathJax_Size5",
      SIZE6 = "GyreTermesMathJax_Size6",
      SYMBOLS = "GyreTermesMathJax_Symbols",
      VARIANTS = "GyreTermesMathJax_Variants";

  var delim = {

  };
  
  for (var id in delim) {if (delim.hasOwnProperty(id)) {DELIMITERS[id] = delim[id]}};

  MathJax.Ajax.loadComplete(HTMLCSS.fontDir + "/fontdata-extra.js");

})(MathJax.OutputJax["HTML-CSS"]);
