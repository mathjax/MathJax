/*************************************************************
 *
 *  MathJax/jax/output/SVG/fonts/Gyre-Pagella/fontdata-extra.js
 *  
 *  Adds extra stretchy characters to the Gyre-Pagella fonts

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

(function (SVG) {
  var VERSION = "2.3";

  var DELIMITERS = SVG.FONTDATA.DELIMITERS;

  var H = "H", V = "V";

  var ALPHABETS = "GyrePagellaMathJax_Alphabets",
      ARROWS = "GyrePagellaMathJax_Arrows",
      DOUBLESTRUCK = "GyrePagellaMathJax_DoubleStruck",
      FRAKTUR = "GyrePagellaMathJax_Fraktur",
      LATIN = "GyrePagellaMathJax_Latin",
      MAIN = "GyrePagellaMathJax_Main",
      MARKS = "GyrePagellaMathJax_Marks",
      MISC = "GyrePagellaMathJax_Misc",
      MONOSPACE = "GyrePagellaMathJax_Monospace",
      NONUNICODE = "GyrePagellaMathJax_NonUnicode",
      NORMAL = "GyrePagellaMathJax_Normal",
      OPERATORS = "GyrePagellaMathJax_Operators",
      SANSSERIF = "GyrePagellaMathJax_SansSerif",
      SCRIPT = "GyrePagellaMathJax_Script",
      SHAPES = "GyrePagellaMathJax_Shapes",
      SIZE1 = "GyrePagellaMathJax_Size1",
      SIZE2 = "GyrePagellaMathJax_Size2",
      SIZE3 = "GyrePagellaMathJax_Size3",
      SIZE4 = "GyrePagellaMathJax_Size4",
      SIZE5 = "GyrePagellaMathJax_Size5",
      SIZE6 = "GyrePagellaMathJax_Size6",
      SYMBOLS = "GyrePagellaMathJax_Symbols",
      VARIANTS = "GyrePagellaMathJax_Variants";

  var delim = {

  };
  
  for (var id in delim) {if (delim.hasOwnProperty(id)) {DELIMITERS[id] = delim[id]}};

  MathJax.Ajax.loadComplete(SVG.fontDir + "/fontdata-extra.js");

})(MathJax.OutputJax["SVG"]);
