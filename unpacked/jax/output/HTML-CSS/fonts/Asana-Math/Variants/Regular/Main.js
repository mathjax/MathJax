/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/Asana-Math/Variants/Regular/Main.js
 *  
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['AsanaMathJax_Variants'] = {
  directory: 'Variants/Regular',
  family: 'AsanaMathJax_Variants',
  testString: '\uE200\uE201\uE202\uE203\uE204\uE205\uE206\uE207\uE208\uE209',
  0x20: [0,0,249,0,0],
  0xE200: [475,20,499,20,471],
  0xE201: [483,2,499,63,426],
  0xE202: [474,2,499,20,465],
  0xE203: [474,240,499,9,437],
  0xE204: [480,240,499,3,467],
  0xE205: [468,240,499,8,445],
  0xE206: [699,20,499,31,468],
  0xE207: [469,240,499,35,489],
  0xE208: [684,17,499,32,463],
  0xE209: [472,247,499,28,466]
};

MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"AsanaMathJax_Variants"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/Variants/Regular/Main.js"]
);
