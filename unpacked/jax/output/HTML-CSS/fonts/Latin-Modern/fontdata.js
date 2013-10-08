/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/Latin-Modern/fontdata.js
 *  
 *  Initializes the HTML-CSS OutputJax to use the Latin-Modern fonts

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

  var ALPHABETS = "LatinModernMathJax_Alphabets",
      ARROWS = "LatinModernMathJax_Arrows",
      DOUBLESTRUCK = "LatinModernMathJax_DoubleStruck",
      FRAKTUR = "LatinModernMathJax_Fraktur",
      LATIN = "LatinModernMathJax_Latin",
      MAIN = "LatinModernMathJax_Main",
      MARKS = "LatinModernMathJax_Marks",
      MISC = "LatinModernMathJax_Misc",
      MONOSPACE = "LatinModernMathJax_Monospace",
      NONUNICODE = "LatinModernMathJax_NonUnicode",
      NORMAL = "LatinModernMathJax_Normal",
      OPERATORS = "LatinModernMathJax_Operators",
      SANSSERIF = "LatinModernMathJax_SansSerif",
      SCRIPT = "LatinModernMathJax_Script",
      SHAPES = "LatinModernMathJax_Shapes",
      SIZE1 = "LatinModernMathJax_Size1",
      SIZE2 = "LatinModernMathJax_Size2",
      SIZE3 = "LatinModernMathJax_Size3",
      SIZE4 = "LatinModernMathJax_Size4",
      SIZE5 = "LatinModernMathJax_Size5",
      SIZE6 = "LatinModernMathJax_Size6",
      SIZE7 = "LatinModernMathJax_Size7",
      SYMBOLS = "LatinModernMathJax_Symbols",
      VARIANTS = "LatinModernMathJax_Variants";

  var H = "H", V = "V", EXTRAH = {load:"extra", dir:H}, EXTRAV = {load:"extra", dir:V};

  HTMLCSS.Augment({
    FONTDATA: {
      version: VERSION,


      TeX_factor: 1.091,
      baselineskip: 1.200,
      lineH: 0.800, lineD: 0.200,

      hasStyleChar: true,  // char 0xEFFD encodes font style

      FONTS: {
        "LatinModernMathJax_Alphabets": "Alphabets/Regular/Main.js",
        "LatinModernMathJax_Arrows": "Arrows/Regular/Main.js",
        "LatinModernMathJax_DoubleStruck": "DoubleStruck/Regular/Main.js",
        "LatinModernMathJax_Fraktur": "Fraktur/Regular/Main.js",
        "LatinModernMathJax_Latin": "Latin/Regular/Main.js",
        "LatinModernMathJax_Main": "Main/Regular/Main.js",
        "LatinModernMathJax_Marks": "Marks/Regular/Main.js",
        "LatinModernMathJax_Misc": "Misc/Regular/Main.js",
        "LatinModernMathJax_Monospace": "Monospace/Regular/Main.js",
        "LatinModernMathJax_NonUnicode": "NonUnicode/Regular/Main.js",
        "LatinModernMathJax_Normal": "Normal/Regular/Main.js",
        "LatinModernMathJax_Operators": "Operators/Regular/Main.js",
        "LatinModernMathJax_SansSerif": "SansSerif/Regular/Main.js",
        "LatinModernMathJax_Script": "Script/Regular/Main.js",
        "LatinModernMathJax_Shapes": "Shapes/Regular/Main.js",
        "LatinModernMathJax_Size1": "Size1/Regular/Main.js",
        "LatinModernMathJax_Size2": "Size2/Regular/Main.js",
        "LatinModernMathJax_Size3": "Size3/Regular/Main.js",
        "LatinModernMathJax_Size4": "Size4/Regular/Main.js",
        "LatinModernMathJax_Size5": "Size5/Regular/Main.js",
        "LatinModernMathJax_Size6": "Size6/Regular/Main.js",
        "LatinModernMathJax_Size7": "Size7/Regular/Main.js",
        "LatinModernMathJax_Symbols": "Symbols/Regular/Main.js",
        "LatinModernMathJax_Variants": "Variants/Regular/Main.js"
      },

      VARIANT: {
          "normal": {fonts: [MAIN,NORMAL,MONOSPACE,LATIN,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,MISC,VARIANTS,NONUNICODE,SIZE1]},
          "bold": {fonts: [MAIN,NORMAL,MONOSPACE,LATIN,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,MISC,VARIANTS,NONUNICODE,SIZE1], bold:true
, offsetA: 0x1D400, offsetG: 0x1D6A8, offsetN: 0x1D7CE},
          "italic": {fonts: [MAIN,NORMAL,MONOSPACE,LATIN,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,MISC,VARIANTS,NONUNICODE,SIZE1], italic:true, offsetA: 0x1D434, offsetG: 0x1D6E2, remap: {0x1D455: 0x210E}},
          "bolditalic": {fonts: [MAIN,NORMAL,MONOSPACE,LATIN,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,MISC,VARIANTS,NONUNICODE,SIZE1], bold: true, italic:true
, offsetA: 0x1D468, offsetG: 0x1D71C},
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
        "-Latin-Modern-variant": {fonts: [VARIANTS,MAIN,NORMAL,MONOSPACE,LATIN,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,MISC,NONUNICODE,SIZE1]},
          "-tex-caligraphic": {fonts: [MAIN,NORMAL,MONOSPACE,LATIN,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,MISC,VARIANTS,NONUNICODE,SIZE1], italic: true},
          "-tex-oldstyle": {fonts: [MAIN,NORMAL,MONOSPACE,LATIN,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,MISC,VARIANTS,NONUNICODE,SIZE1]},
          "-tex-mathit": {fonts: [MAIN,NORMAL,MONOSPACE,LATIN,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,MISC,VARIANTS,NONUNICODE,SIZE1], italic:true, noIC:true},
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
          HW: [[0.996,MAIN], [1.094,SIZE1], [1.194,SIZE2], [1.444,SIZE3], [1.792,SIZE4], [2.092,SIZE5], [2.392,SIZE6], [2.990,SIZE7]],
          stretch: {bot:[0x239D,SYMBOLS], ext:[0x239C,SYMBOLS], top:[0x239B,SYMBOLS]}
        },
        0x29:
        {
          dir: V,
          HW: [[0.996,MAIN], [1.094,SIZE1], [1.194,SIZE2], [1.444,SIZE3], [1.792,SIZE4], [2.092,SIZE5], [2.392,SIZE6], [2.990,SIZE7]],
          stretch: {bot:[0x23A0,SYMBOLS], ext:[0x239F,SYMBOLS], top:[0x239E,SYMBOLS]}
        },
        0x2F:
        {
          dir: V,
          HW: [[1.000,MAIN], [1.310,SIZE1], [1.716,SIZE2], [1.771,SIZE2,1.032], [2.248,SIZE3], [2.944,SIZE4], [3.858,SIZE5], [5.054,SIZE6], [6.620,SIZE7]]
        },
        0x3D:
        {
          dir: H,
          HW: [[0.666,MAIN]],
          stretch: {left:[0xE000,SIZE7], rep:[0xE001,SIZE7], right:[0xE002,SIZE7]}
        },
        0x5B:
        {
          dir: V,
          HW: [[1.000,MAIN], [1.100,SIZE1], [1.200,SIZE2], [1.450,SIZE3], [1.800,SIZE4], [2.100,SIZE5], [2.400,SIZE6], [3.000,SIZE7]],
          stretch: {bot:[0x23A3,SYMBOLS], ext:[0x23A2,SYMBOLS], top:[0x23A1,SYMBOLS]}
        },
        0x5C:
        {
          dir: V,
          HW: [[1.000,MAIN], [1.310,SIZE1], [1.716,SIZE2], [1.771,SIZE2,1.032], [2.248,SIZE3], [2.944,SIZE4], [3.858,SIZE5], [5.054,SIZE6], [6.620,SIZE7]]
        },
        0x5D:
        {
          dir: V,
          HW: [[1.000,MAIN], [1.100,SIZE1], [1.200,SIZE2], [1.450,SIZE3], [1.800,SIZE4], [2.100,SIZE5], [2.400,SIZE6], [3.000,SIZE7]],
          stretch: {bot:[0x23A6,SYMBOLS], ext:[0x23A5,SYMBOLS], top:[0x23A4,SYMBOLS]}
        },
        0x7B:
        {
          dir: V,
          HW: [[1.000,MAIN], [1.100,SIZE1], [1.200,SIZE2], [1.450,SIZE3], [1.800,SIZE4], [2.100,SIZE5], [2.400,SIZE6], [3.000,SIZE7]],
          stretch: {bot:[0x23A9,SYMBOLS], ext:[0xE003,SIZE7], mid:[0x23A8,SYMBOLS], top:[0x23A7,SYMBOLS]}
        },
        0x7C:
        {
          dir: V,
          HW: [[1.000,MAIN], [1.202,SIZE1], [1.444,SIZE2], [1.734,SIZE3], [2.084,SIZE4], [2.502,SIZE5], [3.004,SIZE6], [3.606,SIZE7]],
          stretch: {bot:[0xE004,SIZE7], ext:[0xE005,SIZE7], top:[0xE006,SIZE7]}
        },
        0x7D:
        {
          dir: V,
          HW: [[1.000,MAIN], [1.100,SIZE1], [1.200,SIZE2], [1.450,SIZE3], [1.800,SIZE4], [2.100,SIZE5], [2.400,SIZE6], [3.000,SIZE7]],
          stretch: {bot:[0x23AD,SYMBOLS], ext:[0xE007,SIZE7], mid:[0x23AC,SYMBOLS], top:[0x23AB,SYMBOLS]}
        },
        0x302:
        {
          dir: H,
          HW: [[0.364,MAIN], [0.644,SIZE1], [0.768,SIZE2], [0.919,SIZE3], [1.100,SIZE4], [1.320,SIZE5], [1.581,SIZE6], [1.896,SIZE7]]
        },
        0x303:
        {
          dir: H,
          HW: [[0.370,MAIN], [0.652,SIZE1], [0.778,SIZE2], [0.931,SIZE3], [1.115,SIZE4], [1.335,SIZE5], [1.599,SIZE6], [1.915,SIZE7]]
        },
        0x305:
        {
          dir: H,
          HW: [[0.392,MARKS], [0.568,SIZE1]],
          stretch: {left:[0xE0FB,SIZE7], rep:[0xE0FC,SIZE7], right:[0xE0FD,SIZE7]}
        },
        0x306:
        {
          dir: H,
          HW: [[0.374,MAIN], [0.658,SIZE1], [0.784,SIZE2], [0.937,SIZE3], [1.120,SIZE4], [1.341,SIZE5], [1.604,SIZE6], [1.920,SIZE7]]
        },
        0x30C:
        {
          dir: H,
          HW: [[0.364,MAIN], [0.644,SIZE1], [0.768,SIZE2], [0.919,SIZE3], [1.100,SIZE4], [1.320,SIZE5], [1.581,SIZE6], [1.896,SIZE7]]
        },
        0x311:
        {
          dir: H,
          HW: [[0.374,MARKS], [0.658,SIZE1], [0.784,SIZE2], [0.937,SIZE3], [1.120,SIZE4], [1.341,SIZE5], [1.604,SIZE6], [1.920,SIZE7]]
        },
        0x32C:
        {
          dir: H,
          HW: [[0.364,MARKS], [0.644,SIZE1], [0.768,SIZE2], [0.919,SIZE3], [1.100,SIZE4], [1.320,SIZE5], [1.581,SIZE6], [1.896,SIZE7]]
        },
        0x32D:
        {
          dir: H,
          HW: [[0.364,MARKS], [0.644,SIZE1], [0.768,SIZE2], [0.919,SIZE3], [1.100,SIZE4], [1.320,SIZE5], [1.581,SIZE6], [1.896,SIZE7]]
        },
        0x32E:
        {
          dir: H,
          HW: [[0.374,MARKS], [0.658,SIZE1], [0.784,SIZE2], [0.937,SIZE3], [1.120,SIZE4], [1.341,SIZE5], [1.604,SIZE6], [1.920,SIZE7]]
        },
        0x32F:
        {
          dir: H,
          HW: [[0.374,MARKS], [0.658,SIZE1], [0.784,SIZE2], [0.937,SIZE3], [1.120,SIZE4], [1.341,SIZE5], [1.604,SIZE6], [1.920,SIZE7]]
        },
        0x330:
        {
          dir: H,
          HW: [[0.370,MARKS], [0.652,SIZE1], [0.778,SIZE2], [0.931,SIZE3], [1.115,SIZE4], [1.335,SIZE5], [1.599,SIZE6], [1.915,SIZE7]]
        },
        0x332:
        {
          dir: H,
          HW: [[0.392,MARKS], [0.568,SIZE1]],
          stretch: {left:[0xE0F5,SIZE7], rep:[0xE0F6,SIZE7], right:[0xE0F7,SIZE7]}
        },
        0x333:
        {
          dir: H,
          HW: [[0.392,MARKS], [0.568,SIZE1]],
          stretch: {left:[0xE0F8,SIZE7], rep:[0xE0F9,SIZE7], right:[0xE0FA,SIZE7]}
        },
        0x33F:
        {
          dir: H,
          HW: [[0.392,MARKS], [0.568,SIZE1]],
          stretch: {left:[0xE0FE,SIZE7], rep:[0xE0FF,SIZE7], right:[0xE100,SIZE7]}
        },
        0x2016:
        {
          dir: V,
          HW: [[1.000,MARKS], [1.202,SIZE1], [1.444,SIZE2], [1.734,SIZE3], [2.084,SIZE4], [2.502,SIZE5], [3.004,SIZE6], [3.606,SIZE7]],
          stretch: {bot:[0xE12A,SIZE7], ext:[0xE12B,SIZE7], top:[0xE12C,SIZE7]}
        },
        0x2044:
        {
          dir: V,
          HW: [[1.000,MARKS], [1.310,SIZE1], [1.716,SIZE2], [2.248,SIZE3], [2.944,SIZE4], [3.858,SIZE5], [5.054,SIZE6], [6.620,SIZE7]]
        },
        0x20D0:
        {
          dir: H,
          HW: [[0.422,MARKS], [0.555,SIZE1]],
          stretch: {left:[0xE008,SIZE7], rep:[0xE009,SIZE7], right:[0xE00A,SIZE7]}
        },
        0x20D1:
        {
          dir: H,
          HW: [[0.422,MARKS], [0.555,SIZE1]],
          stretch: {left:[0xE00B,SIZE7], rep:[0xE00C,SIZE7], right:[0xE00D,SIZE7]}
        },
        0x20D6:
        {
          dir: H,
          HW: [[0.416,MARKS], [0.547,SIZE1]],
          stretch: {left:[0xE00E,SIZE7], rep:[0xE00F,SIZE7], right:[0xE010,SIZE7]}
        },
        0x20D7:
        {
          dir: H,
          HW: [[0.416,MAIN], [0.547,SIZE1]],
          stretch: {left:[0xE011,SIZE7], rep:[0xE012,SIZE7], right:[0xE013,SIZE7]}
        },
        0x20E1:
        {
          dir: H,
          HW: [[0.470,MARKS], [0.603,SIZE1]],
          stretch: {left:[0xE014,SIZE7], rep:[0xE015,SIZE7], right:[0xE016,SIZE7]}
        },
        0x20E9:
        {
          dir: H,
          HW: [[0.360,MARKS], [0.735,SIZE1], [1.110,SIZE2], [1.485,SIZE3], [1.860,SIZE4], [2.235,SIZE5], [2.610,SIZE6], [2.985,SIZE7]],
          stretch: {left:[0xE11B,SIZE7], rep:[0xE11C,SIZE7], right:[0xE11D,SIZE7]}
        },
        0x20EC:
        {
          dir: H,
          HW: [[0.422,MARKS], [0.555,SIZE1]],
          stretch: {left:[0xE017,SIZE7], rep:[0xE018,SIZE7], right:[0xE019,SIZE7]}
        },
        0x20ED:
        {
          dir: H,
          HW: [[0.422,MARKS], [0.555,SIZE1]],
          stretch: {left:[0xE01A,SIZE7], rep:[0xE01B,SIZE7], right:[0xE01C,SIZE7]}
        },
        0x20EE:
        {
          dir: H,
          HW: [[0.416,MARKS], [0.547,SIZE1]],
          stretch: {left:[0xE01D,SIZE7], rep:[0xE01E,SIZE7], right:[0xE01F,SIZE7]}
        },
        0x20EF:
        {
          dir: H,
          HW: [[0.416,MARKS], [0.547,SIZE1]],
          stretch: {left:[0xE020,SIZE7], rep:[0xE021,SIZE7], right:[0xE022,SIZE7]}
        },
        0x2190:
        {
          dir: H,
          HW: [[0.885,MAIN], [1.351,SIZE1]],
          stretch: {left:[0xE023,SIZE7], rep:[0xE024,SIZE7], right:[0xE025,SIZE7]}
        },
        0x2191:
        {
          dir: V,
          HW: [[0.882,MAIN], [1.348,SIZE1]],
          stretch: {bot:[0xE029,SIZE7], ext:[0xE02A,SIZE7], top:[0xE02B,SIZE7]}
        },
        0x2192:
        {
          dir: H,
          HW: [[0.885,MAIN], [1.351,SIZE1]],
          stretch: {left:[0xE026,SIZE7], rep:[0xE027,SIZE7], right:[0xE028,SIZE7]}
        },
        0x2193:
        {
          dir: V,
          HW: [[0.882,MAIN], [1.348,SIZE1]],
          stretch: {bot:[0xE02C,SIZE7], ext:[0xE02D,SIZE7], top:[0xE02E,SIZE7]}
        },
        0x2194:
        {
          dir: H,
          HW: [[0.884,MAIN], [1.330,SIZE1]],
          stretch: {left:[0xE037,SIZE7], rep:[0xE038,SIZE7], right:[0xE039,SIZE7]}
        },
        0x2195:
        {
          dir: V,
          HW: [[1.014,MAIN], [1.014,SIZE1]],
          stretch: {bot:[0xE03A,SIZE7], ext:[0xE03B,SIZE7], top:[0xE03C,SIZE7]}
        },
        0x2196:
        {
          dir: V,
          HW: [[0.917,MAIN], [1.383,SIZE1]]
        },
        0x2197:
        {
          dir: V,
          HW: [[0.917,MAIN], [1.383,SIZE1]]
        },
        0x2198:
        {
          dir: V,
          HW: [[0.917,MAIN], [1.383,SIZE1]]
        },
        0x2199:
        {
          dir: V,
          HW: [[0.917,MAIN], [1.383,SIZE1]]
        },
        0x219A:
        {
          dir: H,
          HW: [[0.885,MAIN], [1.351,SIZE1]],
          stretch: {left:[0xE02F,SIZE7], rep:[0xE030,SIZE7], mid:[0xE031,SIZE7], right:[0xE032,SIZE7]}
        },
        0x219B:
        {
          dir: H,
          HW: [[0.885,MAIN], [1.351,SIZE1]],
          stretch: {left:[0xE033,SIZE7], rep:[0xE034,SIZE7], mid:[0xE035,SIZE7], right:[0xE036,SIZE7]}
        },
        0x219E:
        {
          dir: H,
          HW: [[0.905,MAIN], [1.351,SIZE1]],
          stretch: {left:[0xE041,SIZE7], rep:[0xE042,SIZE7], right:[0xE043,SIZE7]}
        },
        0x219F:
        {
          dir: V,
          HW: [[0.902,ARROWS], [1.348,SIZE1]],
          stretch: {bot:[0xE047,SIZE7], ext:[0xE048,SIZE7], top:[0xE049,SIZE7]}
        },
        0x21A0:
        {
          dir: H,
          HW: [[0.905,MAIN], [1.351,SIZE1]],
          stretch: {left:[0xE044,SIZE7], rep:[0xE045,SIZE7], right:[0xE046,SIZE7]}
        },
        0x21A1:
        {
          dir: V,
          HW: [[0.902,ARROWS], [1.348,SIZE1]],
          stretch: {bot:[0xE04A,SIZE7], ext:[0xE04B,SIZE7], top:[0xE04C,SIZE7]}
        },
        0x21A2:
        {
          dir: H,
          HW: [[1.080,MAIN], [1.546,SIZE1]],
          stretch: {left:[0xE04D,SIZE7], rep:[0xE04E,SIZE7], right:[0xE04F,SIZE7]}
        },
        0x21A3:
        {
          dir: H,
          HW: [[1.080,MAIN], [1.546,SIZE1]],
          stretch: {left:[0xE050,SIZE7], rep:[0xE051,SIZE7], right:[0xE052,SIZE7]}
        },
        0x21A4:
        {
          dir: H,
          HW: [[0.865,ARROWS], [1.331,SIZE1]],
          stretch: {left:[0xE053,SIZE7], rep:[0xE054,SIZE7], right:[0xE055,SIZE7]}
        },
        0x21A5:
        {
          dir: V,
          HW: [[0.862,ARROWS], [1.328,SIZE1]],
          stretch: {bot:[0xE059,SIZE7], ext:[0xE05A,SIZE7], top:[0xE05B,SIZE7]}
        },
        0x21A6:
        {
          dir: H,
          HW: [[0.865,MAIN], [1.331,SIZE1]],
          stretch: {left:[0xE056,SIZE7], rep:[0xE057,SIZE7], right:[0xE058,SIZE7]}
        },
        0x21A7:
        {
          dir: V,
          HW: [[0.862,ARROWS], [1.328,SIZE1]],
          stretch: {bot:[0xE05C,SIZE7], ext:[0xE05D,SIZE7], top:[0xE05E,SIZE7]}
        },
        0x21A9:
        {
          dir: H,
          HW: [[0.885,MAIN], [1.351,SIZE1]],
          stretch: {left:[0xE062,SIZE7], rep:[0xE063,SIZE7], right:[0xE064,SIZE7]}
        },
        0x21AA:
        {
          dir: H,
          HW: [[0.885,MAIN], [1.351,SIZE1]],
          stretch: {left:[0xE05F,SIZE7], rep:[0xE060,SIZE7], right:[0xE061,SIZE7]}
        },
        0x21AB:
        {
          dir: H,
          HW: [[0.885,MAIN], [1.351,SIZE1]],
          stretch: {left:[0xE068,SIZE7], rep:[0xE069,SIZE7], right:[0xE06A,SIZE7]}
        },
        0x21AC:
        {
          dir: H,
          HW: [[0.885,MAIN], [1.351,SIZE1]],
          stretch: {left:[0xE065,SIZE7], rep:[0xE066,SIZE7], right:[0xE067,SIZE7]}
        },
        0x21AD:
        {
          dir: H,
          HW: [[0.884,MAIN], [1.330,SIZE1]]
        },
        0x21AE:
        {
          dir: H,
          HW: [[0.884,MAIN], [1.330,SIZE1]],
          stretch: {left:[0xE03D,SIZE7], rep:[0xE03E,SIZE7], mid:[0xE03F,SIZE7], right:[0xE040,SIZE7]}
        },
        0x21B0:
        {
          dir: V,
          HW: [[0.858,MAIN], [1.168,SIZE1]]
        },
        0x21B1:
        {
          dir: V,
          HW: [[0.858,MAIN], [1.168,SIZE1]]
        },
        0x21B2:
        {
          dir: V,
          HW: [[0.858,ARROWS], [1.168,SIZE1]]
        },
        0x21B3:
        {
          dir: V,
          HW: [[0.858,ARROWS], [1.168,SIZE1]]
        },
        0x21B6:
        {
          dir: H,
          HW: [[0.868,MAIN], [1.218,SIZE1]]
        },
        0x21B7:
        {
          dir: H,
          HW: [[0.868,MAIN], [1.218,SIZE1]]
        },
        0x21BC:
        {
          dir: H,
          HW: [[0.900,MAIN], [1.366,SIZE1]],
          stretch: {left:[0xE06B,SIZE7], rep:[0xE06C,SIZE7], right:[0xE06D,SIZE7]}
        },
        0x21BD:
        {
          dir: H,
          HW: [[0.900,MAIN], [1.366,SIZE1]],
          stretch: {left:[0xE071,SIZE7], rep:[0xE072,SIZE7], right:[0xE073,SIZE7]}
        },
        0x21BE:
        {
          dir: V,
          HW: [[0.900,MAIN], [1.366,SIZE1]],
          stretch: {bot:[0xE077,SIZE7], ext:[0xE078,SIZE7], top:[0xE079,SIZE7]}
        },
        0x21BF:
        {
          dir: V,
          HW: [[0.900,MAIN], [1.366,SIZE1]],
          stretch: {bot:[0xE07D,SIZE7], ext:[0xE07E,SIZE7], top:[0xE07F,SIZE7]}
        },
        0x21C0:
        {
          dir: H,
          HW: [[0.900,MAIN], [1.366,SIZE1]],
          stretch: {left:[0xE06E,SIZE7], rep:[0xE06F,SIZE7], right:[0xE070,SIZE7]}
        },
        0x21C1:
        {
          dir: H,
          HW: [[0.900,MAIN], [1.366,SIZE1]],
          stretch: {left:[0xE074,SIZE7], rep:[0xE075,SIZE7], right:[0xE076,SIZE7]}
        },
        0x21C2:
        {
          dir: V,
          HW: [[0.900,MAIN], [1.366,SIZE1]],
          stretch: {bot:[0xE07A,SIZE7], ext:[0xE07B,SIZE7], top:[0xE07C,SIZE7]}
        },
        0x21C3:
        {
          dir: V,
          HW: [[0.900,MAIN], [1.366,SIZE1]],
          stretch: {bot:[0xE080,SIZE7], ext:[0xE081,SIZE7], top:[0xE082,SIZE7]}
        },
        0x21C4:
        {
          dir: H,
          HW: [[0.906,MAIN], [1.372,SIZE1]],
          stretch: {left:[0xE083,SIZE7], rep:[0xE084,SIZE7], right:[0xE085,SIZE7]}
        },
        0x21C5:
        {
          dir: V,
          HW: [[0.906,ARROWS], [1.372,SIZE1]],
          stretch: {bot:[0xE089,SIZE7], ext:[0xE08A,SIZE7], top:[0xE08B,SIZE7]}
        },
        0x21C6:
        {
          dir: H,
          HW: [[0.906,MAIN], [1.372,SIZE1]],
          stretch: {left:[0xE086,SIZE7], rep:[0xE087,SIZE7], right:[0xE088,SIZE7]}
        },
        0x21C7:
        {
          dir: H,
          HW: [[0.885,MAIN], [1.351,SIZE1]],
          stretch: {left:[0xE08F,SIZE7], rep:[0xE090,SIZE7], right:[0xE091,SIZE7]}
        },
        0x21C8:
        {
          dir: V,
          HW: [[0.882,MAIN], [1.348,SIZE1]],
          stretch: {bot:[0xE095,SIZE7], ext:[0xE096,SIZE7], top:[0xE097,SIZE7]}
        },
        0x21C9:
        {
          dir: H,
          HW: [[0.885,MAIN], [1.351,SIZE1]],
          stretch: {left:[0xE092,SIZE7], rep:[0xE093,SIZE7], right:[0xE094,SIZE7]}
        },
        0x21CA:
        {
          dir: V,
          HW: [[0.882,MAIN], [1.348,SIZE1]],
          stretch: {bot:[0xE098,SIZE7], ext:[0xE099,SIZE7], top:[0xE09A,SIZE7]}
        },
        0x21CB:
        {
          dir: H,
          HW: [[0.906,MAIN], [1.372,SIZE1]],
          stretch: {left:[0xE0A1,SIZE7], rep:[0xE0A2,SIZE7], right:[0xE0A3,SIZE7]}
        },
        0x21CC:
        {
          dir: H,
          HW: [[0.906,MAIN], [1.372,SIZE1]],
          stretch: {left:[0xE0A4,SIZE7], rep:[0xE0A5,SIZE7], right:[0xE0A6,SIZE7]}
        },
        0x21CD:
        {
          dir: H,
          HW: [[0.879,MAIN], [1.345,SIZE1]],
          stretch: {left:[0xE0B9,SIZE7], rep:[0xE0BA,SIZE7], mid:[0xE0BB,SIZE7], right:[0xE0BC,SIZE7]}
        },
        0x21CE:
        {
          dir: H,
          HW: [[0.956,MAIN], [1.422,SIZE1]],
          stretch: {left:[0xE0C1,SIZE7], rep:[0xE0C2,SIZE7], mid:[0xE0C3,SIZE7], right:[0xE0C4,SIZE7]}
        },
        0x21CF:
        {
          dir: H,
          HW: [[0.879,MAIN], [1.345,SIZE1]],
          stretch: {left:[0xE0BD,SIZE7], rep:[0xE0BE,SIZE7], mid:[0xE0BF,SIZE7], right:[0xE0C0,SIZE7]}
        },
        0x21D0:
        {
          dir: H,
          HW: [[0.879,MAIN], [1.345,SIZE1]],
          stretch: {left:[0xE0A7,SIZE7], rep:[0xE0A8,SIZE7], right:[0xE0A9,SIZE7]}
        },
        0x21D1:
        {
          dir: V,
          HW: [[0.879,MAIN], [1.345,SIZE1]],
          stretch: {bot:[0xE0AD,SIZE7], ext:[0xE0AE,SIZE7], top:[0xE0AF,SIZE7]}
        },
        0x21D2:
        {
          dir: H,
          HW: [[0.879,MAIN], [1.345,SIZE1]],
          stretch: {left:[0xE0AA,SIZE7], rep:[0xE0AB,SIZE7], right:[0xE0AC,SIZE7]}
        },
        0x21D3:
        {
          dir: V,
          HW: [[0.879,MAIN], [1.345,SIZE1]],
          stretch: {bot:[0xE0B0,SIZE7], ext:[0xE0B1,SIZE7], top:[0xE0B2,SIZE7]}
        },
        0x21D4:
        {
          dir: H,
          HW: [[0.956,MAIN], [1.422,SIZE1]],
          stretch: {left:[0xE0B3,SIZE7], rep:[0xE0B4,SIZE7], right:[0xE0B5,SIZE7]}
        },
        0x21D5:
        {
          dir: V,
          HW: [[0.956,MAIN], [1.422,SIZE1]],
          stretch: {bot:[0xE0B6,SIZE7], ext:[0xE0B7,SIZE7], top:[0xE0B8,SIZE7]}
        },
        0x21D6:
        {
          dir: V,
          HW: [[0.954,ARROWS], [1.420,SIZE1]]
        },
        0x21D7:
        {
          dir: V,
          HW: [[0.954,ARROWS], [1.420,SIZE1]]
        },
        0x21D8:
        {
          dir: V,
          HW: [[0.954,ARROWS], [1.420,SIZE1]]
        },
        0x21D9:
        {
          dir: V,
          HW: [[0.954,ARROWS], [1.420,SIZE1]]
        },
        0x21DA:
        {
          dir: H,
          HW: [[0.903,MAIN], [1.349,SIZE1]],
          stretch: {left:[0xE0CB,SIZE7], rep:[0xE0CC,SIZE7], right:[0xE0CD,SIZE7]}
        },
        0x21DB:
        {
          dir: H,
          HW: [[0.903,MAIN], [1.349,SIZE1]],
          stretch: {left:[0xE0CE,SIZE7], rep:[0xE0CF,SIZE7], right:[0xE0D0,SIZE7]}
        },
        0x21DC:
        {
          dir: H,
          HW: [[0.885,ARROWS], [1.351,SIZE1]]
        },
        0x21DD:
        {
          dir: H,
          HW: [[0.885,MAIN], [1.351,SIZE1]]
        },
        0x21E6:
        {
          dir: H,
          HW: [[0.938,ARROWS], [1.384,SIZE1]],
          stretch: {left:[0xE0D1,SIZE7], rep:[0xE0D2,SIZE7], right:[0xE0D3,SIZE7]}
        },
        0x21E7:
        {
          dir: V,
          HW: [[0.938,ARROWS], [1.384,SIZE1]],
          stretch: {bot:[0xE0D7,SIZE7], ext:[0xE0D8,SIZE7], top:[0xE0D9,SIZE7]}
        },
        0x21E8:
        {
          dir: H,
          HW: [[0.938,ARROWS], [1.384,SIZE1]],
          stretch: {left:[0xE0D4,SIZE7], rep:[0xE0D5,SIZE7], right:[0xE0D6,SIZE7]}
        },
        0x21E9:
        {
          dir: V,
          HW: [[0.938,ARROWS], [1.384,SIZE1]],
          stretch: {bot:[0xE0DA,SIZE7], ext:[0xE0DB,SIZE7], top:[0xE0DC,SIZE7]}
        },
        0x21F3:
        {
          dir: V,
          HW: [[0.950,ARROWS], [1.396,SIZE1]],
          stretch: {bot:[0xE0DD,SIZE7], ext:[0xE0DE,SIZE7], top:[0xE0DF,SIZE7]}
        },
        0x21F5:
        {
          dir: V,
          HW: [[0.906,ARROWS], [1.372,SIZE1]],
          stretch: {bot:[0xE08C,SIZE7], ext:[0xE08D,SIZE7], top:[0xE08E,SIZE7]}
        },
        0x21F6:
        {
          dir: H,
          HW: [[0.885,ARROWS], [1.351,SIZE1]],
          stretch: {left:[0xE09B,SIZE7], rep:[0xE09C,SIZE7], right:[0xE09D,SIZE7]}
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
        0x2212:
        {
          dir: H,
          HW: [[0.666,MAIN]],
          stretch: {left:[0xE127,SIZE7], rep:[0xE128,SIZE7], right:[0xE129,SIZE7]}
        },
        0x221A:
        {
          dir: V,
          HW: [[1.000,MAIN], [1.200,SIZE1], [1.800,SIZE2], [2.400,SIZE3], [3.000,SIZE4]],
          stretch: {bot:[0x23B7,SYMBOLS], ext:[0xE133,SIZE7], top:[0xE134,SIZE7]}
        },
        0x2223:
        {
          dir: V,
          HW: [[1.000,MAIN], [1.202,SIZE1], [1.444,SIZE2], [1.734,SIZE3], [2.084,SIZE4], [2.502,SIZE5], [3.004,SIZE6], [3.606,SIZE7]],
          stretch: {bot:[0xE004,SIZE7], ext:[0xE005,SIZE7], top:[0xE006,SIZE7]}
        },
        0x2225:
        {
          dir: V,
          HW: [[1.000,MAIN], [1.202,SIZE1], [1.444,SIZE2], [1.734,SIZE3], [2.084,SIZE4], [2.502,SIZE5], [3.004,SIZE6], [3.606,SIZE7]],
          stretch: {bot:[0xE12A,SIZE7], ext:[0xE12B,SIZE7], top:[0xE12C,SIZE7]}
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
        0x222F:
        {
          dir: V,
          HW: [[1.111,OPERATORS], [2.222,SIZE1]]
        },
        0x2230:
        {
          dir: V,
          HW: [[1.111,OPERATORS], [2.222,SIZE1]]
        },
        0x2231:
        {
          dir: V,
          HW: [[1.111,OPERATORS], [2.222,SIZE1]]
        },
        0x2232:
        {
          dir: V,
          HW: [[1.111,OPERATORS], [2.222,SIZE1]]
        },
        0x2233:
        {
          dir: V,
          HW: [[1.111,OPERATORS], [2.222,SIZE1]]
        },
        0x2261:
        {
          dir: H,
          HW: [[0.666,MAIN]],
          stretch: {left:[0xE12D,SIZE7], rep:[0xE12E,SIZE7], right:[0xE12F,SIZE7]}
        },
        0x2263:
        {
          dir: H,
          HW: [[0.666,OPERATORS]],
          stretch: {left:[0xE130,SIZE7], rep:[0xE131,SIZE7], right:[0xE132,SIZE7]}
        },
        0x22A2:
        {
          dir: V,
          HW: [[0.684,MAIN], [0.868,SIZE1]]
        },
        0x22A3:
        {
          dir: V,
          HW: [[0.684,MAIN], [0.868,SIZE1]]
        },
        0x22A4:
        {
          dir: V,
          HW: [[0.684,MAIN], [0.868,SIZE1]]
        },
        0x22A5:
        {
          dir: V,
          HW: [[0.684,MAIN], [0.868,SIZE1]]
        },
        0x22C0:
        {
          dir: V,
          HW: [[1.045,OPERATORS], [1.393,SIZE1]]
        },
        0x22C1:
        {
          dir: V,
          HW: [[1.045,OPERATORS], [1.393,SIZE1]]
        },
        0x22C2:
        {
          dir: V,
          HW: [[1.022,OPERATORS], [1.356,SIZE1]]
        },
        0x22C3:
        {
          dir: V,
          HW: [[1.022,OPERATORS], [1.356,SIZE1]]
        },
        0x2308:
        {
          dir: V,
          HW: [[1.000,MAIN], [1.100,SIZE1], [1.200,SIZE2], [1.450,SIZE3], [1.800,SIZE4], [2.100,SIZE5], [2.400,SIZE6], [3.000,SIZE7]],
          stretch: {ext:[0x23A2,SYMBOLS], top:[0x23A1,SYMBOLS]}
        },
        0x2309:
        {
          dir: V,
          HW: [[1.000,MAIN], [1.100,SIZE1], [1.200,SIZE2], [1.450,SIZE3], [1.800,SIZE4], [2.100,SIZE5], [2.400,SIZE6], [3.000,SIZE7]],
          stretch: {ext:[0x23A5,SYMBOLS], top:[0x23A4,SYMBOLS]}
        },
        0x230A:
        {
          dir: V,
          HW: [[1.000,MAIN], [1.100,SIZE1], [1.200,SIZE2], [1.450,SIZE3], [1.800,SIZE4], [2.100,SIZE5], [2.400,SIZE6], [3.000,SIZE7]],
          stretch: {bot:[0x23A3,SYMBOLS], ext:[0x23A2,SYMBOLS]}
        },
        0x230B:
        {
          dir: V,
          HW: [[1.000,MAIN], [1.100,SIZE1], [1.200,SIZE2], [1.450,SIZE3], [1.800,SIZE4], [2.100,SIZE5], [2.400,SIZE6], [3.000,SIZE7]],
          stretch: {bot:[0x23A6,SYMBOLS], ext:[0x23A5,SYMBOLS]}
        },
        0x2329:
        {
          dir: V,
          HW: [[1.000,SYMBOLS], [1.100,SIZE1], [1.200,SIZE2], [1.450,SIZE3], [1.800,SIZE4], [2.100,SIZE5], [2.400,SIZE6], [3.000,SIZE7]]
        },
        0x232A:
        {
          dir: V,
          HW: [[1.000,SYMBOLS], [1.100,SIZE1], [1.200,SIZE2], [1.450,SIZE3], [1.800,SIZE4], [2.100,SIZE5], [2.400,SIZE6], [3.000,SIZE7]]
        },
        0x23B4:
        {
          dir: H,
          HW: [[0.360,MAIN], [0.735,SIZE1], [1.110,SIZE2], [1.485,SIZE3], [1.860,SIZE4], [2.235,SIZE5], [2.610,SIZE6], [2.985,SIZE7]],
          stretch: {left:[0xE11B,SIZE7], rep:[0xE11C,SIZE7], right:[0xE11D,SIZE7]}
        },
        0x23B5:
        {
          dir: H,
          HW: [[0.360,MAIN], [0.735,SIZE1], [1.110,SIZE2], [1.485,SIZE3], [1.860,SIZE4], [2.235,SIZE5], [2.610,SIZE6], [2.985,SIZE7]],
          stretch: {left:[0xE11E,SIZE7], rep:[0xE11F,SIZE7], right:[0xE120,SIZE7]}
        },
        0x23D0:
        {
          dir: V,
          HW: [[1.000,MAIN,null,0x7C], [1.309,MAIN,1.309,0x7C], [1.771,MAIN,1.771,0x7C], [2.233,MAIN,2.233,0x7C], [2.695,MAIN,2.695,0x7C]],
          stretch: {ext:[0x7C,MAIN]}
        },
        0x23DC:
        {
          dir: H,
          HW: [[0.504,MAIN], [1.006,SIZE1], [1.508,SIZE2], [2.012,SIZE3], [2.516,SIZE4], [3.020,SIZE5], [3.524,SIZE6], [4.032,SIZE7]],
          stretch: {left:[0xE115,SIZE7], rep:[0xE116,SIZE7], right:[0xE117,SIZE7]}
        },
        0x23DD:
        {
          dir: H,
          HW: [[0.504,MAIN], [1.006,SIZE1], [1.508,SIZE2], [2.012,SIZE3], [2.516,SIZE4], [3.020,SIZE5], [3.524,SIZE6], [4.032,SIZE7]],
          stretch: {left:[0xE118,SIZE7], rep:[0xE119,SIZE7], right:[0xE11A,SIZE7]}
        },
        0x23DE:
        {
          dir: H,
          HW: [[0.492,MAIN], [0.993,SIZE1], [1.494,SIZE2], [1.996,SIZE3], [2.498,SIZE4], [3.000,SIZE5], [3.502,SIZE6], [4.006,SIZE7]],
          stretch: {left:[0xE10D,SIZE7], rep:[0xE10E,SIZE7], mid:[0xE10F,SIZE7], right:[0xE110,SIZE7]}
        },
        0x23DF:
        {
          dir: H,
          HW: [[0.492,MAIN], [0.993,SIZE1], [1.494,SIZE2], [1.996,SIZE3], [2.498,SIZE4], [3.000,SIZE5], [3.502,SIZE6], [4.006,SIZE7]],
          stretch: {left:[0xE111,SIZE7], rep:[0xE112,SIZE7], mid:[0xE113,SIZE7], right:[0xE114,SIZE7]}
        },
        0x23E0:
        {
          dir: H,
          HW: [[0.546,MAIN], [1.048,SIZE1], [1.550,SIZE2], [2.056,SIZE3], [2.564,SIZE4], [3.068,SIZE5], [3.574,SIZE6], [4.082,SIZE7]],
          stretch: {left:[0xE121,SIZE7], rep:[0xE122,SIZE7], right:[0xE123,SIZE7]}
        },
        0x23E1:
        {
          dir: H,
          HW: [[0.546,MAIN], [1.048,SIZE1], [1.550,SIZE2], [2.056,SIZE3], [2.564,SIZE4], [3.068,SIZE5], [3.574,SIZE6], [4.082,SIZE7]],
          stretch: {left:[0xE124,SIZE7], rep:[0xE125,SIZE7], right:[0xE126,SIZE7]}
        },
        0x27A1:
        {
          dir: H,
          HW: [[0.865,MISC], [1.311,SIZE1]],
          stretch: {left:[0xE0E6,SIZE7], rep:[0xE0E7,SIZE7], right:[0xE0E8,SIZE7]}
        },
        0x27E6:
        {
          dir: V,
          HW: [[1.000,SYMBOLS], [1.100,SIZE1], [1.200,SIZE2], [1.450,SIZE3], [1.800,SIZE4], [2.100,SIZE5], [2.400,SIZE6], [3.000,SIZE7]],
          stretch: {bot:[0xE107,SIZE7], ext:[0xE108,SIZE7], top:[0xE109,SIZE7]}
        },
        0x27E7:
        {
          dir: V,
          HW: [[1.000,SYMBOLS], [1.100,SIZE1], [1.200,SIZE2], [1.450,SIZE3], [1.800,SIZE4], [2.100,SIZE5], [2.400,SIZE6], [3.000,SIZE7]],
          stretch: {bot:[0xE10A,SIZE7], ext:[0xE10B,SIZE7], top:[0xE10C,SIZE7]}
        },
        0x27E8:
        {
          dir: V,
          HW: [[1.000,MAIN], [1.100,SIZE1], [1.200,SIZE2], [1.450,SIZE3], [1.800,SIZE4], [2.100,SIZE5], [2.400,SIZE6], [3.000,SIZE7]]
        },
        0x27E9:
        {
          dir: V,
          HW: [[1.000,MAIN], [1.100,SIZE1], [1.200,SIZE2], [1.450,SIZE3], [1.800,SIZE4], [2.100,SIZE5], [2.400,SIZE6], [3.000,SIZE7]]
        },
        0x27EA:
        {
          dir: V,
          HW: [[1.000,SYMBOLS], [1.100,SIZE1], [1.200,SIZE2], [1.450,SIZE3], [1.800,SIZE4], [2.100,SIZE5], [2.400,SIZE6], [3.000,SIZE7]]
        },
        0x27EB:
        {
          dir: V,
          HW: [[1.000,SYMBOLS], [1.100,SIZE1], [1.200,SIZE2], [1.450,SIZE3], [1.800,SIZE4], [2.100,SIZE5], [2.400,SIZE6], [3.000,SIZE7]]
        },
        0x27EE:
        {
          dir: V,
          HW: [[1.024,MAIN], [1.126,SIZE1], [1.228,SIZE2], [1.482,SIZE3], [1.836,SIZE4], [2.140,SIZE5], [2.444,SIZE6], [3.052,SIZE7]],
          stretch: {bot:[0xE101,SIZE7], ext:[0xE102,SIZE7], top:[0xE103,SIZE7]}
        },
        0x27EF:
        {
          dir: V,
          HW: [[1.024,MAIN], [1.126,SIZE1], [1.228,SIZE2], [1.482,SIZE3], [1.836,SIZE4], [2.140,SIZE5], [2.444,SIZE6], [3.052,SIZE7]],
          stretch: {bot:[0xE104,SIZE7], ext:[0xE105,SIZE7], top:[0xE106,SIZE7]}
        },
        0x2906:
        {
          dir: H,
          HW: [[0.879,ARROWS], [1.325,SIZE1]],
          stretch: {left:[0xE0C5,SIZE7], rep:[0xE0C6,SIZE7], right:[0xE0C7,SIZE7]}
        },
        0x2907:
        {
          dir: H,
          HW: [[0.879,ARROWS], [1.325,SIZE1]],
          stretch: {left:[0xE0C8,SIZE7], rep:[0xE0C9,SIZE7], right:[0xE0CA,SIZE7]}
        },
        0x2A00:
        {
          dir: V,
          HW: [[0.986,OPERATORS], [1.304,SIZE1]]
        },
        0x2A01:
        {
          dir: V,
          HW: [[0.986,OPERATORS], [1.304,SIZE1]]
        },
        0x2A02:
        {
          dir: V,
          HW: [[0.986,OPERATORS], [1.304,SIZE1]]
        },
        0x2A03:
        {
          dir: V,
          HW: [[1.022,OPERATORS], [1.356,SIZE1]]
        },
        0x2A04:
        {
          dir: V,
          HW: [[1.022,OPERATORS], [1.356,SIZE1]]
        },
        0x2A05:
        {
          dir: V,
          HW: [[1.028,OPERATORS], [1.372,SIZE1]]
        },
        0x2A06:
        {
          dir: V,
          HW: [[1.028,OPERATORS], [1.372,SIZE1]]
        },
        0x2A09:
        {
          dir: V,
          HW: [[0.981,OPERATORS], [1.260,SIZE1]]
        },
        0x2A0C:
        {
          dir: V,
          HW: [[1.111,OPERATORS], [2.222,SIZE1]]
        },
        0x2A11:
        {
          dir: V,
          HW: [[1.111,OPERATORS], [2.222,SIZE1]]
        },
        0x2B04:
        {
          dir: H,
          HW: [[0.950,SHAPES], [1.396,SIZE1]],
          stretch: {left:[0xE0E0,SIZE7], rep:[0xE0E1,SIZE7], right:[0xE0E2,SIZE7]}
        },
        0x2B05:
        {
          dir: H,
          HW: [[0.865,SHAPES], [1.311,SIZE1]],
          stretch: {left:[0xE0E3,SIZE7], rep:[0xE0E4,SIZE7], right:[0xE0E5,SIZE7]}
        },
        0x2B06:
        {
          dir: V,
          HW: [[0.865,SHAPES], [1.311,SIZE1]],
          stretch: {bot:[0xE0E9,SIZE7], ext:[0xE0EA,SIZE7], top:[0xE0EB,SIZE7]}
        },
        0x2B07:
        {
          dir: V,
          HW: [[0.865,SHAPES], [1.311,SIZE1]],
          stretch: {bot:[0xE0EC,SIZE7], ext:[0xE0ED,SIZE7], top:[0xE0EE,SIZE7]}
        },
        0x2B0C:
        {
          dir: H,
          HW: [[0.844,SHAPES], [1.290,SIZE1]],
          stretch: {left:[0xE0EF,SIZE7], rep:[0xE0F0,SIZE7], right:[0xE0F1,SIZE7]}
        },
        0x2B0D:
        {
          dir: V,
          HW: [[0.844,SHAPES], [1.290,SIZE1]],
          stretch: {bot:[0xE0F2,SIZE7], ext:[0xE0F3,SIZE7], top:[0xE0F4,SIZE7]}
        },
        0x2B31:
        {
          dir: H,
          HW: [[0.885,SHAPES], [1.351,SIZE1]],
          stretch: {left:[0xE09E,SIZE7], rep:[0xE09F,SIZE7], right:[0xE0A0,SIZE7]}
        }
      }

    }
  });
  MathJax.Hub.Register.LoadHook(HTMLCSS.fontDir+"/Size7/Regular/Main.js",function () {
    var u;
    u = HTMLCSS.FONTDATA.DELIMITERS[0x23DE].stretch.rep[0];
    HTMLCSS.FONTDATA.FONTS[SIZE7][u][0] += 200;  // adjust height for brace extender
    HTMLCSS.FONTDATA.FONTS[SIZE7][u][1] += 200;  // adjust depth for brace extender
    u = HTMLCSS.FONTDATA.DELIMITERS[0x23DF].stretch.rep[0];
    HTMLCSS.FONTDATA.FONTS[SIZE7][u][0] += 200;  // adjust height for brace extender
    HTMLCSS.FONTDATA.FONTS[SIZE7][u][1] += 200;  // adjust depth for brace extender
  });
  MathJax.Hub.Register.LoadHook(HTMLCSS.fontDir+"/Size1/Regular/Main.js",function () {
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x222B][2] -= 425;
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x222B][5] = {rfix:-425};
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x222C][2] -= 425;
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x222C][5] = {rfix:-425};
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x222D][2] -= 425;
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x222D][5] = {rfix:-425};
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x222E][2] -= 425;
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x222E][5] = {rfix:-425};
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x222F][2] -= 425;
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x222F][5] = {rfix:-425};
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x2230][2] -= 425;
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x2230][5] = {rfix:-425};
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x2231][2] -= 425;
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x2231][5] = {rfix:-425};
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x2232][2] -= 425;
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x2232][5] = {rfix:-425};
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x2233][2] -= 425;
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x2233][5] = {rfix:-425};
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x2A0C][2] -= 425;
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x2A0C][5] = {rfix:-425};
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x2A11][2] -= 425;
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x2A11][5] = {rfix:-425}; 
  });
  AJAX.loadComplete(HTMLCSS.fontDir + "/fontdata.js");

})(MathJax.OutputJax["HTML-CSS"],MathJax.ElementJax.mml,MathJax.Ajax);
