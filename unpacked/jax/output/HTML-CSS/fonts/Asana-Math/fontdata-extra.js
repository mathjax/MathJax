/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/Asana-Math/fontdata-extra.js
 *  
 *  Adds extra stretchy characters to the Asana-Math fonts

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

  var ALPHABETS = "AsanaMathJax_Alphabets",
      ARROWS = "AsanaMathJax_Arrows",
      DOUBLESTRUCK = "AsanaMathJax_DoubleStruck",
      FRAKTUR = "AsanaMathJax_Fraktur",
      LATIN = "AsanaMathJax_Latin",
      MAIN = "AsanaMathJax_Main",
      MARKS = "AsanaMathJax_Marks",
      MISC = "AsanaMathJax_Misc",
      MONOSPACE = "AsanaMathJax_Monospace",
      NONUNICODE = "AsanaMathJax_NonUnicode",
      NORMAL = "AsanaMathJax_Normal",
      OPERATORS = "AsanaMathJax_Operators",
      SANSSERIF = "AsanaMathJax_SansSerif",
      SCRIPT = "AsanaMathJax_Script",
      SHAPES = "AsanaMathJax_Shapes",
      SIZE1 = "AsanaMathJax_Size1",
      SIZE2 = "AsanaMathJax_Size2",
      SIZE3 = "AsanaMathJax_Size3",
      SIZE4 = "AsanaMathJax_Size4",
      SIZE5 = "AsanaMathJax_Size5",
      SIZE6 = "AsanaMathJax_Size6",
      SYMBOLS = "AsanaMathJax_Symbols",
      VARIANTS = "AsanaMathJax_Variants";

  var delim = {

  };
  
  for (var id in delim) {if (delim.hasOwnProperty(id)) {DELIMITERS[id] = delim[id]}};

  MathJax.Ajax.loadComplete(HTMLCSS.fontDir + "/fontdata-extra.js");

})(MathJax.OutputJax["HTML-CSS"]);
