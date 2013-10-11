/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/Neo-Euler/fontdata.js
 *  
 *  Initializes the HTML-CSS OutputJax to use the Neo-Euler fonts

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

(function (HTMLCSS,MML,AJAX) {

    var VERSION = "2.3";

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

  var H = "H", V = "V", EXTRAH = {load:"extra", dir:H}, EXTRAV = {load:"extra", dir:V};

  HTMLCSS.Augment({
    FONTDATA: {
      version: VERSION,


      TeX_factor: 0.958,
      baselineskip: 1.200,
      lineH: 0.800, lineD: 0.200,

      hasStyleChar: true,  // char 0xEFFD encodes font style

      FONTS: {
        "NeoEulerMathJax_Alphabets": "Alphabets/Regular/Main.js",
        "NeoEulerMathJax_Arrows": "Arrows/Regular/Main.js",
        "NeoEulerMathJax_Fraktur": "Fraktur/Regular/Main.js",
        "NeoEulerMathJax_Main": "Main/Regular/Main.js",
        "NeoEulerMathJax_Marks": "Marks/Regular/Main.js",
        "NeoEulerMathJax_NonUnicode": "NonUnicode/Regular/Main.js",
        "NeoEulerMathJax_Normal": "Normal/Regular/Main.js",
        "NeoEulerMathJax_Operators": "Operators/Regular/Main.js",
        "NeoEulerMathJax_Script": "Script/Regular/Main.js",
        "NeoEulerMathJax_Shapes": "Shapes/Regular/Main.js",
        "NeoEulerMathJax_Size1": "Size1/Regular/Main.js",
        "NeoEulerMathJax_Size2": "Size2/Regular/Main.js",
        "NeoEulerMathJax_Size3": "Size3/Regular/Main.js",
        "NeoEulerMathJax_Size4": "Size4/Regular/Main.js",
        "NeoEulerMathJax_Size5": "Size5/Regular/Main.js",
        "NeoEulerMathJax_Symbols": "Symbols/Regular/Main.js",
        "NeoEulerMathJax_Variants": "Variants/Regular/Main.js"
      },

      VARIANT: {
          "normal": {fonts: [MAIN,NORMAL,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,VARIANTS,NONUNICODE,SIZE1]},
          "bold": {fonts: [MAIN,NORMAL,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,VARIANTS,NONUNICODE,SIZE1], bold:true
, offsetA: 0x1D400, offsetG: 0x1D6A8, offsetN: 0x1D7CE},
          "italic": {fonts: [MAIN,NORMAL,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,VARIANTS,NONUNICODE,SIZE1], italic:true},
          "bolditalic": {fonts: [MAIN,NORMAL,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,VARIANTS,NONUNICODE,SIZE1], bold: true, italic:true},
          "double-struck": {
            fonts: [DOUBLESTRUCK],
            offsetA: 0x1D538,
            offsetN: 0x1D7D8,
            remap: {0x1D53A: 0x2102, 0x1D53F: 0x210D, 0x1D545: 0x2115, 0x1D547: 0x2119, 0x1D548: 0x211A, 0x1D549: 0x211D, 0x1D551: 0x2124}
          },
          "fraktur": {
            fonts: [FRAKTUR],
            offsetA: 0x1D504,
            remap: {0x1D506: 0x212D, 0x1D50B: 0x210C, 0x1D50C: 0x2111, 0x1D515: 0x211C, 0x1D51D: 0x2128}
          },
          "bold-fraktur": {
            fonts: [FRAKTUR], bold:true,
            offsetA: 0x1D56C
          },
          "script": {
            fonts: [SCRIPT], italic:true,
            offsetA: 0x1D49C,
            remap: {0x1D49D: 0x212C, 0x1D4A0: 0x2130, 0x1D4A1: 0x2131, 0x1D4A3: 0x210B, 0x1D4A4: 0x2110, 0x1D4A7: 0x2112, 0x1D4A8: 0x2133, 0x1D4AD: 0x211B, 0x1D4BA: 0x212F, 0x1D4BC: 0x210A, 0x1D4C4: 0x2134},
          },
          "bold-script": {
            fonts: [SCRIPT], bold:true, italic:true,
            offsetA: 0x1D4D0
          },
          "sans-serif": {
            fonts: [SANSSERIF],
            offsetA: 0x1D5A0,
            offsetN: 0x1D7E2,
            offsetG: 0xE17D
          },
          "bold-sans-serif": {
            fonts: [SANSSERIF], bold:true,
            offsetA: 0x1D5D4,
            offsetN: 0x1D7EC,
            offsetG: 0x1D756
          },
          "sans-serif-italic": {
             fonts: [SANSSERIF], italic: true,
             offsetA: 0x1D608,
             offsetN: 0xE1B4,
             offsetG: 0xE1BF
          },
          "sans-serif-bold-italic": {
             fonts: [SANSSERIF], bold:true, italic: true,
             offsetA: 0x1D63C,
             offsetN: 0xE1F6,
             offsetG: 0x1D790
          },
          "monospace": {
             fonts: [MONOSPACE],
             offsetA: 0x1D670,
             offsetN: 0x1D7F6
          },
        "-Neo-Euler-variant": {fonts: [VARIANTS,MAIN,NORMAL,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,NONUNICODE,SIZE1]},
          "-tex-caligraphic": {fonts: [MAIN,NORMAL,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,VARIANTS,NONUNICODE,SIZE1], italic: true},
          "-tex-oldstyle": {offsetN: 0xE200, fonts: [VARIANTS,MAIN,NORMAL,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,NONUNICODE,SIZE1]},
          "-tex-mathit": {fonts: [MAIN,NORMAL,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,VARIANTS,NONUNICODE,SIZE1], italic:true, noIC:true},
          "-largeOp": {fonts:[SIZE1,MAIN]},
          "-smallOp": {}
      },

      RANGES: [
        {name: "alpha", low: 0x61, high: 0x7A, offset: "A", add: 26},
        {name: "Alpha", low: 0x41, high: 0x5A, offset: "A"},
        {name: "number", low: 0x30, high: 0x39, offset: "N"},
        {name: "greek", low: 0x03B1, high: 0x03C9, offset: "G", add: 26},
        {name: "Greek", low: 0x0391, high: 0x03F6, offset: "G",
           remap: {0x03F5: 52, 0x03D1: 53, 0x03F0: 54, 0x03D5: 55, 0x03F1: 56, 0x03D6: 57, 0x03F4: 17}}
      ],

      RULECHAR: 0x2212,

      REMAP: {
      },

      REMAPACCENT: {
      },

      REMAPACCENTUNDER: {
      },

      DELIMITERS: {
        0x28:
        {
          dir: V,
          HW: [[0.925,MAIN], [1.198,SIZE1], [1.798,SIZE2], [1.961,SIZE2,1.091], [2.398,SIZE3], [2.998,SIZE4]],
          stretch: {bot:[0x239D,SYMBOLS], ext:[0x239C,SYMBOLS], top:[0x239B,SYMBOLS]}
        },
        0x29:
        {
          dir: V,
          HW: [[0.925,MAIN], [1.198,SIZE1], [1.798,SIZE2], [1.961,SIZE2,1.091], [2.398,SIZE3], [2.998,SIZE4]],
          stretch: {bot:[0x23A0,SYMBOLS], ext:[0x239F,SYMBOLS], top:[0x239E,SYMBOLS]}
        },
        0x2F:
        {
          dir: V,
          HW: [[0.912,MAIN], [1.199,SIZE1], [1.799,SIZE2], [1.961,SIZE2,1.090], [2.399,SIZE3], [2.999,SIZE4]]
        },
        0x5B:
        {
          dir: V,
          HW: [[0.866,MAIN], [1.199,SIZE1], [1.799,SIZE2], [1.961,SIZE2,1.090], [2.399,SIZE3], [2.999,SIZE4]],
          stretch: {bot:[0x23A3,SYMBOLS], ext:[0x23A2,SYMBOLS], top:[0x23A1,SYMBOLS]}
        },
        0x5C:
        {
          dir: V,
          HW: [[0.914,MAIN], [1.199,SIZE1], [1.799,SIZE2], [1.961,SIZE2,1.090], [2.399,SIZE3], [2.999,SIZE4]]
        },
        0x5D:
        {
          dir: V,
          HW: [[0.866,MAIN], [1.199,SIZE1], [1.799,SIZE2], [1.961,SIZE2,1.090], [2.399,SIZE3], [2.999,SIZE4]],
          stretch: {bot:[0x23A6,SYMBOLS], ext:[0x23A5,SYMBOLS], top:[0x23A4,SYMBOLS]}
        },
        0x7B:
        {
          dir: V,
          HW: [[0.908,MAIN], [1.199,SIZE1], [1.799,SIZE2], [1.961,SIZE2,1.090], [2.399,SIZE3], [2.999,SIZE4]],
          stretch: {bot:[0x23A9,SYMBOLS], ext:[0x23AA,SYMBOLS], mid:[0x23A8,SYMBOLS], top:[0x23A7,SYMBOLS]}
        },
        0x7C:
        {
          dir: V,
          HW: [[0.905,MAIN], [1.505,SIZE1], [2.105,SIZE2], [2.706,SIZE3], [3.306,SIZE4]],
          stretch: {bot:[0xE000,SIZE5], ext:[0xE001,SIZE5]}
        },
        0x7D:
        {
          dir: V,
          HW: [[0.908,MAIN], [1.199,SIZE1], [1.799,SIZE2], [1.961,SIZE2,1.090], [2.399,SIZE3], [2.999,SIZE4]],
          stretch: {bot:[0x23AD,SYMBOLS], ext:[0x23AA,SYMBOLS], mid:[0x23AC,SYMBOLS], top:[0x23AB,SYMBOLS]}
        },
        0x2016:
        {
          dir: V,
          HW: [[0.905,MARKS], [1.505,SIZE1], [2.105,SIZE2], [2.706,SIZE3], [3.306,SIZE4]],
          stretch: {bot:[0xE002,SIZE5], ext:[0xE003,SIZE5]}
        },
        0x2044:
        {
          dir: V,
          HW: [[0.912,MARKS], [1.199,SIZE1], [1.799,SIZE2], [2.399,SIZE3], [2.999,SIZE4]]
        },
        0x20D6:
        {
          dir: H,
          HW: [[0.418,MARKS]],
          stretch: {left:[0x20D6,MARKS], rep:[0xE004,SIZE5]}
        },
        0x20D7:
        {
          dir: H,
          HW: [[0.418,MAIN]],
          stretch: {rep:[0xE004,SIZE5], right:[0x20D7,MAIN]}
        },
        0x20E1:
        {
          dir: H,
          HW: [[0.449,MARKS]],
          stretch: {left:[0x20D6,MARKS], rep:[0xE004,SIZE5], right:[0x20D7,MAIN]}
        },
        0x20EE:
        {
          dir: H,
          HW: [[0.418,MARKS]],
          stretch: {left:[0x20EE,MARKS], rep:[0xE005,SIZE5]}
        },
        0x20EF:
        {
          dir: H,
          HW: [[0.418,MARKS]],
          stretch: {rep:[0xE005,SIZE5], right:[0x20EF,MARKS]}
        },
        0x220F:
        {
          dir: V,
          HW: [[1.000,OPERATORS], [1.400,SIZE1]]
        },
        0x2210:
        {
          dir: V,
          HW: [[1.000,OPERATORS], [1.400,SIZE1]]
        },
        0x2211:
        {
          dir: V,
          HW: [[1.000,OPERATORS], [1.400,SIZE1]]
        },
        0x2215:
        {
          dir: V,
          HW: [[0.912,MAIN], [1.199,SIZE1], [1.799,SIZE2], [2.399,SIZE3], [2.999,SIZE4]]
        },
        0x221A:
        {
          dir: V,
          HW: [[0.989,MAIN], [1.209,SIZE1], [1.801,SIZE2], [2.403,SIZE3], [3.003,SIZE4]],
          stretch: {bot:[0xE006,SIZE5], ext:[0xE007,SIZE5], top:[0xE008,SIZE5]}
        },
        0x2223:
        {
          dir: V,
          HW: [[0.795,MAIN], [1.505,SIZE1], [2.105,SIZE2], [2.706,SIZE3], [3.306,SIZE4]]
        },
        0x2225:
        {
          dir: V,
          HW: [[0.905,MAIN], [0.905,SIZE1], [1.505,SIZE2], [2.105,SIZE3], [2.706,SIZE4], [3.306,SIZE5]],
          stretch: {bot:[0xE002,SIZE5], ext:[0xE003,SIZE5]}
        },
        0x2227:
        {
          dir: V,
          HW: [[0.718,MAIN], [0.998,SIZE1], [1.395,SIZE2]]
        },
        0x2228:
        {
          dir: V,
          HW: [[0.700,MAIN], [0.998,SIZE1], [1.395,SIZE2]]
        },
        0x2229:
        {
          dir: V,
          HW: [[0.600,MAIN], [0.965,SIZE1], [1.358,SIZE2]]
        },
        0x222A:
        {
          dir: V,
          HW: [[0.600,MAIN], [0.965,SIZE1], [1.358,SIZE2]]
        },
        0x222B:
        {
          dir: V,
          HW: [[1.111,MAIN], [2.222,SIZE1]]
        },
        0x222C:
        {
          dir: V,
          HW: [[1.111,OPERATORS], [2.222,SIZE1]]
        },
        0x222D:
        {
          dir: V,
          HW: [[1.111,OPERATORS], [2.222,SIZE1]]
        },
        0x222E:
        {
          dir: V,
          HW: [[1.111,OPERATORS], [2.222,SIZE1]]
        },
        0x228E:
        {
          dir: V,
          HW: [[0.600,MAIN], [0.965,SIZE1], [1.358,SIZE2]]
        },
        0x22C0:
        {
          dir: V,
          HW: [[0.718,OPERATORS], [0.998,SIZE1], [1.395,SIZE2]]
        },
        0x22C1:
        {
          dir: V,
          HW: [[0.700,OPERATORS], [0.998,SIZE1], [1.395,SIZE2]]
        },
        0x22C2:
        {
          dir: V,
          HW: [[0.600,OPERATORS], [0.965,SIZE1], [1.358,SIZE2]]
        },
        0x22C3:
        {
          dir: V,
          HW: [[0.600,OPERATORS], [0.965,SIZE1], [1.358,SIZE2]]
        },
        0x2308:
        {
          dir: V,
          HW: [[0.980,MAIN], [1.199,SIZE1], [1.799,SIZE2], [1.961,SIZE2,1.090], [2.399,SIZE3], [2.999,SIZE4]],
          stretch: {ext:[0x23A2,SYMBOLS], top:[0x23A1,SYMBOLS]}
        },
        0x2309:
        {
          dir: V,
          HW: [[0.980,MAIN], [1.199,SIZE1], [1.799,SIZE2], [1.961,SIZE2,1.090], [2.399,SIZE3], [2.999,SIZE4]],
          stretch: {ext:[0x23A5,SYMBOLS], top:[0x23A4,SYMBOLS]}
        },
        0x230A:
        {
          dir: V,
          HW: [[0.980,MAIN], [1.199,SIZE1], [1.799,SIZE2], [1.961,SIZE2,1.090], [2.399,SIZE3], [2.999,SIZE4]],
          stretch: {bot:[0x23A3,SYMBOLS], ext:[0x23A2,SYMBOLS]}
        },
        0x230B:
        {
          dir: V,
          HW: [[0.980,MAIN], [1.199,SIZE1], [1.799,SIZE2], [1.961,SIZE2,1.090], [2.399,SIZE3], [2.999,SIZE4]],
          stretch: {bot:[0x23A6,SYMBOLS], ext:[0x23A5,SYMBOLS]}
        },
        0x2329:
        {
          dir: V,
          HW: [[0.974,SYMBOLS], [1.176,SIZE1], [1.770,SIZE2], [2.366,SIZE3], [2.958,SIZE4]]
        },
        0x232A:
        {
          dir: V,
          HW: [[0.974,SYMBOLS], [1.176,SIZE1], [1.770,SIZE2], [2.366,SIZE3], [2.958,SIZE4]]
        },
        0x23D0:
        {
          dir: V,
          HW: [[0.905,MAIN,null,0x7C], [1.150,MAIN,1.271,0x7C], [1.556,MAIN,1.719,0x7C], [1.961,MAIN,2.167,0x7C], [2.367,MAIN,2.615,0x7C]],
          stretch: {ext:[0x7C,MAIN]}
        },
        0x23DC:
        {
          dir: H,
          HW: [[0.925,MAIN], [1.199,SIZE1], [1.799,SIZE2], [2.399,SIZE3], [2.999,SIZE4]],
          stretch: {left:[0xE009,SIZE5], rep:[0xE00A,SIZE5], right:[0xE00B,SIZE5]}
        },
        0x23DD:
        {
          dir: H,
          HW: [[0.925,MAIN], [1.199,SIZE1], [1.799,SIZE2], [2.399,SIZE3], [2.999,SIZE4]],
          stretch: {left:[0xE00C,SIZE5], rep:[0xE00D,SIZE5], right:[0xE00E,SIZE5]}
        },
        0x23DE:
        {
          dir: H,
          HW: [[0.908,MAIN], [1.199,SIZE1], [1.799,SIZE2], [2.399,SIZE3], [2.999,SIZE4]],
          stretch: {left:[0xE00F,SIZE5], rep:[0xE010,SIZE5], mid:[0xE011,SIZE5], right:[0xE012,SIZE5]}
        },
        0x23DF:
        {
          dir: H,
          HW: [[0.908,MAIN], [1.199,SIZE1], [1.799,SIZE2], [2.399,SIZE3], [2.999,SIZE4]],
          stretch: {left:[0xE013,SIZE5], rep:[0xE014,SIZE5], mid:[0xE015,SIZE5], right:[0xE016,SIZE5]}
        },
        0x27E8:
        {
          dir: V,
          HW: [[0.974,MAIN], [0.974,SIZE1], [1.176,SIZE2], [1.770,SIZE3], [2.366,SIZE4], [2.958,SIZE5]]
        },
        0x27E9:
        {
          dir: V,
          HW: [[0.974,MAIN], [0.974,SIZE1], [1.176,SIZE2], [1.770,SIZE3], [2.366,SIZE4], [2.958,SIZE5]]
        },
        0x2A0C:
        {
          dir: V,
          HW: [[1.111,OPERATORS], [2.222,SIZE1]]
        }
      }

    }
  });
  MathJax.Hub.Register.LoadHook(HTMLCSS.fontDir+"/Size5/Regular/Main.js",function () {
    var u;
    u = HTMLCSS.FONTDATA.DELIMITERS[0x23DE].stretch.rep[0];
    HTMLCSS.FONTDATA.FONTS[SIZE5][u][0] += 200;  // adjust height for brace extender
    HTMLCSS.FONTDATA.FONTS[SIZE5][u][1] += 200;  // adjust depth for brace extender
    u = HTMLCSS.FONTDATA.DELIMITERS[0x23DF].stretch.rep[0];
    HTMLCSS.FONTDATA.FONTS[SIZE5][u][0] += 200;  // adjust height for brace extender
    HTMLCSS.FONTDATA.FONTS[SIZE5][u][1] += 200;  // adjust depth for brace extender
  });
  AJAX.loadComplete(HTMLCSS.fontDir + "/fontdata.js");

})(MathJax.OutputJax["HTML-CSS"],MathJax.ElementJax.mml,MathJax.Ajax);
