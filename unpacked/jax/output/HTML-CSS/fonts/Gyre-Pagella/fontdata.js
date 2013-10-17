/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/Gyre-Pagella/fontdata.js
 *  
 *  Initializes the HTML-CSS OutputJax to use the Gyre-Pagella fonts

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

  var H = "H", V = "V", EXTRAH = {load:"extra", dir:H}, EXTRAV = {load:"extra", dir:V};

  HTMLCSS.Augment({
    FONTDATA: {
      version: VERSION,


      TeX_factor: 1.057,
      baselineskip: 1.200,
      lineH: 0.800, lineD: 0.200,

      hasStyleChar: true,  // char 0xEFFD encodes font style

      FONTS: {
        "GyrePagellaMathJax_Alphabets": "Alphabets/Regular/Main.js",
        "GyrePagellaMathJax_Arrows": "Arrows/Regular/Main.js",
        "GyrePagellaMathJax_DoubleStruck": "DoubleStruck/Regular/Main.js",
        "GyrePagellaMathJax_Fraktur": "Fraktur/Regular/Main.js",
        "GyrePagellaMathJax_Latin": "Latin/Regular/Main.js",
        "GyrePagellaMathJax_Main": "Main/Regular/Main.js",
        "GyrePagellaMathJax_Marks": "Marks/Regular/Main.js",
        "GyrePagellaMathJax_Misc": "Misc/Regular/Main.js",
        "GyrePagellaMathJax_Monospace": "Monospace/Regular/Main.js",
        "GyrePagellaMathJax_NonUnicode": "NonUnicode/Regular/Main.js",
        "GyrePagellaMathJax_Normal": "Normal/Regular/Main.js",
        "GyrePagellaMathJax_Operators": "Operators/Regular/Main.js",
        "GyrePagellaMathJax_SansSerif": "SansSerif/Regular/Main.js",
        "GyrePagellaMathJax_Script": "Script/Regular/Main.js",
        "GyrePagellaMathJax_Shapes": "Shapes/Regular/Main.js",
        "GyrePagellaMathJax_Size1": "Size1/Regular/Main.js",
        "GyrePagellaMathJax_Size2": "Size2/Regular/Main.js",
        "GyrePagellaMathJax_Size3": "Size3/Regular/Main.js",
        "GyrePagellaMathJax_Size4": "Size4/Regular/Main.js",
        "GyrePagellaMathJax_Size5": "Size5/Regular/Main.js",
        "GyrePagellaMathJax_Size6": "Size6/Regular/Main.js",
        "GyrePagellaMathJax_Symbols": "Symbols/Regular/Main.js",
        "GyrePagellaMathJax_Variants": "Variants/Regular/Main.js"
      },

      VARIANT: {
          "normal": {fonts: [MAIN,NORMAL,MONOSPACE,LATIN,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,MISC,VARIANTS,NONUNICODE,SIZE1]},
          "bold": {fonts: [MAIN,NORMAL,MONOSPACE,LATIN,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,MISC,VARIANTS,NONUNICODE,SIZE1], bold:true
, offsetA: 0x1D400, offsetG: 0x1D6A8, offsetN: 0x1D7CE},
          "italic": {fonts: [MAIN,NORMAL,MONOSPACE,LATIN,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,MISC,VARIANTS,NONUNICODE,SIZE1], italic:true, offsetA: 0x1D434, offsetG: 0x1D6E2, remap: {0x1D455: 0x210E}},
          "bolditalic": {fonts: [MAIN,NORMAL,MONOSPACE,LATIN,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,MISC,VARIANTS,NONUNICODE,SIZE1], bold: true, italic:true, offsetA: 0x1D468, offsetG: 0x1D71C},
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
            remap: {0x1D49D: 0x212C, 0x1D4A0: 0x2130, 0x1D4A1: 0x2131, 0x1D4A3: 0x210B, 0x1D4A4: 0x2110, 0x1D4A7: 0x2112, 0x1D4A8: 0x2133, 0x1D4AD: 0x211B, 0x1D4BA: 0x212F, 0x1D4BC: 0x210A, 0x1D4C4: 0x2134}
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
        "-Gyre-Pagella-variant": {fonts: [VARIANTS,MAIN,NORMAL,MONOSPACE,LATIN,ALPHABETS,MARKS,ARROWS,OPERATORS,SYMBOLS,SHAPES,MISC,NONUNICODE,SIZE1]},
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
          HW: [[0.828,MAIN], [0.988,SIZE1], [1.180,SIZE2], [1.410,SIZE3], [1.686,SIZE4], [2.018,SIZE5], [2.416,SIZE6], [2.612,SIZE6,1.081]],
          stretch: {bot:[0x239D,SYMBOLS], ext:[0x239C,SYMBOLS], top:[0x239B,SYMBOLS]}
        },
        0x29:
        {
          dir: V,
          HW: [[0.828,MAIN], [0.988,SIZE1], [1.180,SIZE2], [1.410,SIZE3], [1.686,SIZE4], [2.018,SIZE5], [2.416,SIZE6], [2.612,SIZE6,1.081]],
          stretch: {bot:[0x23A0,SYMBOLS], ext:[0x239F,SYMBOLS], top:[0x239E,SYMBOLS]}
        },
        0x2F:
        {
          dir: V,
          HW: [[0.800,MAIN], [1.048,SIZE1], [1.372,SIZE2], [1.798,SIZE3], [2.356,SIZE4], [3.086,SIZE5], [4.044,SIZE6]]
        },
        0x3D:
        {
          dir: H,
          HW: [[0.600,MAIN]],
          stretch: {left:[0xE000,SIZE6], rep:[0xE001,SIZE6], right:[0xE002,SIZE6]}
        },
        0x5B:
        {
          dir: V,
          HW: [[0.840,MAIN], [1.000,SIZE1], [1.192,SIZE2], [1.422,SIZE3], [1.698,SIZE4], [2.030,SIZE5], [2.428,SIZE6], [2.612,SIZE6,1.076]],
          stretch: {bot:[0x23A3,SYMBOLS], ext:[0x23A2,SYMBOLS], top:[0x23A1,SYMBOLS]}
        },
        0x5C:
        {
          dir: V,
          HW: [[0.800,MAIN], [1.048,SIZE1], [1.372,SIZE2], [1.798,SIZE3], [2.356,SIZE4], [3.086,SIZE5], [4.044,SIZE6]]
        },
        0x5D:
        {
          dir: V,
          HW: [[0.840,MAIN], [1.000,SIZE1], [1.192,SIZE2], [1.422,SIZE3], [1.698,SIZE4], [2.030,SIZE5], [2.428,SIZE6], [2.612,SIZE6,1.076]],
          stretch: {bot:[0x23A6,SYMBOLS], ext:[0x23A5,SYMBOLS], top:[0x23A4,SYMBOLS]}
        },
        0x7B:
        {
          dir: V,
          HW: [[0.838,MAIN], [0.998,SIZE1], [1.190,SIZE2], [1.420,SIZE3], [1.696,SIZE4], [2.028,SIZE5], [2.426,SIZE6], [2.612,SIZE6,1.077]],
          stretch: {bot:[0x23A9,SYMBOLS], ext:[0xE003,SIZE6], mid:[0x23A8,SYMBOLS], top:[0x23A7,SYMBOLS]}
        },
        0x7C:
        {
          dir: V,
          HW: [[0.800,MAIN], [0.960,SIZE1], [1.152,SIZE2], [1.382,SIZE3], [1.658,SIZE4], [1.990,SIZE5], [2.388,SIZE6]],
          stretch: {bot:[0xE004,SIZE6], ext:[0xE005,SIZE6], top:[0xE006,SIZE6]}
        },
        0x7D:
        {
          dir: V,
          HW: [[0.838,MAIN], [0.998,SIZE1], [1.190,SIZE2], [1.420,SIZE3], [1.696,SIZE4], [2.028,SIZE5], [2.426,SIZE6], [2.612,SIZE6,1.077]],
          stretch: {bot:[0x23AD,SYMBOLS], ext:[0xE007,SIZE6], mid:[0x23AC,SYMBOLS], top:[0x23AB,SYMBOLS]}
        },
        0x302:
        {
          dir: H,
          HW: [[0.348,MAIN], [0.613,SIZE1], [0.731,SIZE2], [0.874,SIZE3], [1.045,SIZE4], [1.251,SIZE5], [1.498,SIZE6]]
        },
        0x303:
        {
          dir: H,
          HW: [[0.342,MAIN], [0.608,SIZE1], [0.727,SIZE2], [0.870,SIZE3], [1.042,SIZE4], [1.247,SIZE5], [1.496,SIZE6]]
        },
        0x305:
        {
          dir: H,
          HW: [[0.333,MARKS], [0.500,SIZE1]],
          stretch: {left:[0xE0FB,SIZE6], rep:[0xE0FC,SIZE6], right:[0xE0FD,SIZE6]}
        },
        0x306:
        {
          dir: H,
          HW: [[0.362,MAIN], [0.631,SIZE1], [0.752,SIZE2], [0.897,SIZE3], [1.070,SIZE4], [1.279,SIZE5], [1.528,SIZE6]]
        },
        0x30C:
        {
          dir: H,
          HW: [[0.348,MAIN], [0.613,SIZE1], [0.731,SIZE2], [0.874,SIZE3], [1.045,SIZE4], [1.251,SIZE5], [1.498,SIZE6]]
        },
        0x311:
        {
          dir: H,
          HW: [[0.362,MARKS], [0.631,SIZE1], [0.752,SIZE2], [0.897,SIZE3], [1.070,SIZE4], [1.279,SIZE5], [1.528,SIZE6]]
        },
        0x32C:
        {
          dir: H,
          HW: [[0.348,MARKS], [0.613,SIZE1], [0.731,SIZE2], [0.874,SIZE3], [1.045,SIZE4], [1.251,SIZE5], [1.498,SIZE6]]
        },
        0x32D:
        {
          dir: H,
          HW: [[0.348,MARKS], [0.613,SIZE1], [0.731,SIZE2], [0.874,SIZE3], [1.045,SIZE4], [1.251,SIZE5], [1.498,SIZE6]]
        },
        0x32E:
        {
          dir: H,
          HW: [[0.362,MARKS], [0.631,SIZE1], [0.752,SIZE2], [0.897,SIZE3], [1.070,SIZE4], [1.279,SIZE5], [1.528,SIZE6]]
        },
        0x32F:
        {
          dir: H,
          HW: [[0.362,MARKS], [0.631,SIZE1], [0.752,SIZE2], [0.897,SIZE3], [1.070,SIZE4], [1.279,SIZE5], [1.528,SIZE6]]
        },
        0x330:
        {
          dir: H,
          HW: [[0.342,MARKS], [0.608,SIZE1], [0.727,SIZE2], [0.870,SIZE3], [1.042,SIZE4], [1.247,SIZE5], [1.496,SIZE6]]
        },
        0x332:
        {
          dir: H,
          HW: [[0.333,MARKS], [0.500,SIZE1]],
          stretch: {left:[0xE0F5,SIZE6], rep:[0xE0F6,SIZE6], right:[0xE0F7,SIZE6]}
        },
        0x333:
        {
          dir: H,
          HW: [[0.333,MARKS], [0.500,SIZE1]],
          stretch: {left:[0xE0F8,SIZE6], rep:[0xE0F9,SIZE6], right:[0xE0FA,SIZE6]}
        },
        0x33F:
        {
          dir: H,
          HW: [[0.333,MARKS], [0.500,SIZE1]],
          stretch: {left:[0xE0FE,SIZE6], rep:[0xE0FF,SIZE6], right:[0xE100,SIZE6]}
        },
        0x2016:
        {
          dir: V,
          HW: [[0.800,MARKS], [0.960,SIZE1], [1.152,SIZE2], [1.382,SIZE3], [1.658,SIZE4], [1.990,SIZE5], [2.388,SIZE6]],
          stretch: {bot:[0xE12A,SIZE6], ext:[0xE12B,SIZE6], top:[0xE12C,SIZE6]}
        },
        0x2044:
        {
          dir: V,
          HW: [[0.800,MARKS], [1.048,SIZE1], [1.372,SIZE2], [1.798,SIZE3], [2.356,SIZE4], [3.086,SIZE5], [4.044,SIZE6]]
        },
        0x20D0:
        {
          dir: H,
          HW: [[0.384,MARKS], [0.510,SIZE1]],
          stretch: {left:[0xE008,SIZE6], rep:[0xE009,SIZE6], right:[0xE00A,SIZE6]}
        },
        0x20D1:
        {
          dir: H,
          HW: [[0.384,MARKS], [0.510,SIZE1]],
          stretch: {left:[0xE00B,SIZE6], rep:[0xE00C,SIZE6], right:[0xE00D,SIZE6]}
        },
        0x20D6:
        {
          dir: H,
          HW: [[0.386,MARKS], [0.510,SIZE1]],
          stretch: {left:[0xE00E,SIZE6], rep:[0xE00F,SIZE6], right:[0xE010,SIZE6]}
        },
        0x20D7:
        {
          dir: H,
          HW: [[0.386,MAIN], [0.510,SIZE1]],
          stretch: {left:[0xE011,SIZE6], rep:[0xE012,SIZE6], right:[0xE013,SIZE6]}
        },
        0x20E1:
        {
          dir: H,
          HW: [[0.458,MARKS], [0.582,SIZE1]],
          stretch: {left:[0xE014,SIZE6], rep:[0xE015,SIZE6], right:[0xE016,SIZE6]}
        },
        0x20E9:
        {
          dir: H,
          HW: [[0.367,MARKS], [0.740,SIZE1], [1.113,SIZE2], [1.484,SIZE3], [1.855,SIZE4], [2.226,SIZE5], [2.593,SIZE6]],
          stretch: {left:[0xE11B,SIZE6], rep:[0xE11C,SIZE6], right:[0xE11D,SIZE6]}
        },
        0x20EC:
        {
          dir: H,
          HW: [[0.384,MARKS], [0.510,SIZE1]],
          stretch: {left:[0xE017,SIZE6], rep:[0xE018,SIZE6], right:[0xE019,SIZE6]}
        },
        0x20ED:
        {
          dir: H,
          HW: [[0.384,MARKS], [0.510,SIZE1]],
          stretch: {left:[0xE01A,SIZE6], rep:[0xE01B,SIZE6], right:[0xE01C,SIZE6]}
        },
        0x20EE:
        {
          dir: H,
          HW: [[0.386,MARKS], [0.510,SIZE1]],
          stretch: {left:[0xE01D,SIZE6], rep:[0xE01E,SIZE6], right:[0xE01F,SIZE6]}
        },
        0x20EF:
        {
          dir: H,
          HW: [[0.386,MARKS], [0.510,SIZE1]],
          stretch: {left:[0xE020,SIZE6], rep:[0xE021,SIZE6], right:[0xE022,SIZE6]}
        },
        0x2140:
        {
          dir: V,
          HW: [[1.000,DOUBLESTRUCK], [1.442,SIZE1]]
        },
        0x2190:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE023,SIZE6], rep:[0xE024,SIZE6], right:[0xE025,SIZE6]}
        },
        0x2191:
        {
          dir: V,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {bot:[0xE029,SIZE6], ext:[0xE02A,SIZE6], top:[0xE02B,SIZE6]}
        },
        0x2192:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE026,SIZE6], rep:[0xE027,SIZE6], right:[0xE028,SIZE6]}
        },
        0x2193:
        {
          dir: V,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {bot:[0xE02C,SIZE6], ext:[0xE02D,SIZE6], top:[0xE02E,SIZE6]}
        },
        0x2194:
        {
          dir: H,
          HW: [[0.845,MAIN], [1.295,SIZE1]],
          stretch: {left:[0xE037,SIZE6], rep:[0xE038,SIZE6], right:[0xE039,SIZE6]}
        },
        0x2195:
        {
          dir: V,
          HW: [[0.845,MAIN], [1.295,SIZE1]],
          stretch: {bot:[0xE03A,SIZE6], ext:[0xE03B,SIZE6], top:[0xE03C,SIZE6]}
        },
        0x2196:
        {
          dir: V,
          HW: [[0.558,MAIN], [0.876,SIZE1]]
        },
        0x2197:
        {
          dir: V,
          HW: [[0.558,MAIN], [0.876,SIZE1]]
        },
        0x2198:
        {
          dir: V,
          HW: [[0.558,MAIN], [0.876,SIZE1]]
        },
        0x2199:
        {
          dir: V,
          HW: [[0.558,MAIN], [0.876,SIZE1]]
        },
        0x219A:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE02F,SIZE6], rep:[0xE030,SIZE6], mid:[0xE031,SIZE6], right:[0xE032,SIZE6]}
        },
        0x219B:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE033,SIZE6], rep:[0xE034,SIZE6], mid:[0xE035,SIZE6], right:[0xE036,SIZE6]}
        },
        0x219E:
        {
          dir: H,
          HW: [[0.835,MAIN], [1.285,SIZE1]],
          stretch: {left:[0xE041,SIZE6], rep:[0xE042,SIZE6], right:[0xE043,SIZE6]}
        },
        0x219F:
        {
          dir: V,
          HW: [[0.835,ARROWS], [1.285,SIZE1]],
          stretch: {bot:[0xE047,SIZE6], ext:[0xE048,SIZE6], top:[0xE049,SIZE6]}
        },
        0x21A0:
        {
          dir: H,
          HW: [[0.835,MAIN], [1.285,SIZE1]],
          stretch: {left:[0xE044,SIZE6], rep:[0xE045,SIZE6], right:[0xE046,SIZE6]}
        },
        0x21A1:
        {
          dir: V,
          HW: [[0.835,ARROWS], [1.285,SIZE1]],
          stretch: {bot:[0xE04A,SIZE6], ext:[0xE04B,SIZE6], top:[0xE04C,SIZE6]}
        },
        0x21A2:
        {
          dir: H,
          HW: [[0.845,MAIN], [1.295,SIZE1]],
          stretch: {left:[0xE04D,SIZE6], rep:[0xE04E,SIZE6], right:[0xE04F,SIZE6]}
        },
        0x21A3:
        {
          dir: H,
          HW: [[0.845,MAIN], [1.295,SIZE1]],
          stretch: {left:[0xE050,SIZE6], rep:[0xE051,SIZE6], right:[0xE052,SIZE6]}
        },
        0x21A4:
        {
          dir: H,
          HW: [[0.760,ARROWS], [1.210,SIZE1]],
          stretch: {left:[0xE053,SIZE6], rep:[0xE054,SIZE6], right:[0xE055,SIZE6]}
        },
        0x21A5:
        {
          dir: V,
          HW: [[0.760,ARROWS], [1.210,SIZE1]],
          stretch: {bot:[0xE059,SIZE6], ext:[0xE05A,SIZE6], top:[0xE05B,SIZE6]}
        },
        0x21A6:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE056,SIZE6], rep:[0xE057,SIZE6], right:[0xE058,SIZE6]}
        },
        0x21A7:
        {
          dir: V,
          HW: [[0.760,ARROWS], [1.210,SIZE1]],
          stretch: {bot:[0xE05C,SIZE6], ext:[0xE05D,SIZE6], top:[0xE05E,SIZE6]}
        },
        0x21A9:
        {
          dir: H,
          HW: [[0.790,MAIN], [1.240,SIZE1]],
          stretch: {left:[0xE062,SIZE6], rep:[0xE063,SIZE6], right:[0xE064,SIZE6]}
        },
        0x21AA:
        {
          dir: H,
          HW: [[0.790,MAIN], [1.240,SIZE1]],
          stretch: {left:[0xE05F,SIZE6], rep:[0xE060,SIZE6], right:[0xE061,SIZE6]}
        },
        0x21AB:
        {
          dir: H,
          HW: [[0.790,MAIN], [1.240,SIZE1]],
          stretch: {left:[0xE068,SIZE6], rep:[0xE069,SIZE6], right:[0xE06A,SIZE6]}
        },
        0x21AC:
        {
          dir: H,
          HW: [[0.790,MAIN], [1.240,SIZE1]],
          stretch: {left:[0xE065,SIZE6], rep:[0xE066,SIZE6], right:[0xE067,SIZE6]}
        },
        0x21AD:
        {
          dir: H,
          HW: [[0.845,MAIN], [1.295,SIZE1]]
        },
        0x21AE:
        {
          dir: H,
          HW: [[0.845,MAIN], [1.295,SIZE1]],
          stretch: {left:[0xE03D,SIZE6], rep:[0xE03E,SIZE6], mid:[0xE03F,SIZE6], right:[0xE040,SIZE6]}
        },
        0x21B0:
        {
          dir: V,
          HW: [[0.645,MAIN], [0.915,SIZE1]]
        },
        0x21B1:
        {
          dir: V,
          HW: [[0.644,MAIN], [0.915,SIZE1]]
        },
        0x21B2:
        {
          dir: V,
          HW: [[0.645,ARROWS], [0.915,SIZE1]]
        },
        0x21B3:
        {
          dir: V,
          HW: [[0.644,ARROWS], [0.915,SIZE1]]
        },
        0x21B6:
        {
          dir: H,
          HW: [[0.685,MAIN], [1.023,SIZE1]]
        },
        0x21B7:
        {
          dir: H,
          HW: [[0.685,MAIN], [1.023,SIZE1]]
        },
        0x21BC:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE06B,SIZE6], rep:[0xE06C,SIZE6], right:[0xE06D,SIZE6]}
        },
        0x21BD:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE071,SIZE6], rep:[0xE072,SIZE6], right:[0xE073,SIZE6]}
        },
        0x21BE:
        {
          dir: V,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {bot:[0xE077,SIZE6], ext:[0xE078,SIZE6], top:[0xE079,SIZE6]}
        },
        0x21BF:
        {
          dir: V,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {bot:[0xE07D,SIZE6], ext:[0xE07E,SIZE6], top:[0xE07F,SIZE6]}
        },
        0x21C0:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE06E,SIZE6], rep:[0xE06F,SIZE6], right:[0xE070,SIZE6]}
        },
        0x21C1:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE074,SIZE6], rep:[0xE075,SIZE6], right:[0xE076,SIZE6]}
        },
        0x21C2:
        {
          dir: V,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {bot:[0xE07A,SIZE6], ext:[0xE07B,SIZE6], top:[0xE07C,SIZE6]}
        },
        0x21C3:
        {
          dir: V,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {bot:[0xE080,SIZE6], ext:[0xE081,SIZE6], top:[0xE082,SIZE6]}
        },
        0x21C4:
        {
          dir: H,
          HW: [[0.770,MAIN], [1.220,SIZE1]],
          stretch: {left:[0xE083,SIZE6], rep:[0xE084,SIZE6], right:[0xE085,SIZE6]}
        },
        0x21C5:
        {
          dir: V,
          HW: [[0.770,ARROWS], [1.220,SIZE1]],
          stretch: {bot:[0xE089,SIZE6], ext:[0xE08A,SIZE6], top:[0xE08B,SIZE6]}
        },
        0x21C6:
        {
          dir: H,
          HW: [[0.770,MAIN], [1.220,SIZE1]],
          stretch: {left:[0xE086,SIZE6], rep:[0xE087,SIZE6], right:[0xE088,SIZE6]}
        },
        0x21C7:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE08F,SIZE6], rep:[0xE090,SIZE6], right:[0xE091,SIZE6]}
        },
        0x21C8:
        {
          dir: V,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {bot:[0xE095,SIZE6], ext:[0xE096,SIZE6], top:[0xE097,SIZE6]}
        },
        0x21C9:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE092,SIZE6], rep:[0xE093,SIZE6], right:[0xE094,SIZE6]}
        },
        0x21CA:
        {
          dir: V,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {bot:[0xE098,SIZE6], ext:[0xE099,SIZE6], top:[0xE09A,SIZE6]}
        },
        0x21CB:
        {
          dir: H,
          HW: [[0.769,MAIN], [1.219,SIZE1]],
          stretch: {left:[0xE0A1,SIZE6], rep:[0xE0A2,SIZE6], right:[0xE0A3,SIZE6]}
        },
        0x21CC:
        {
          dir: H,
          HW: [[0.769,MAIN], [1.219,SIZE1]],
          stretch: {left:[0xE0A4,SIZE6], rep:[0xE0A5,SIZE6], right:[0xE0A6,SIZE6]}
        },
        0x21CD:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE0B9,SIZE6], rep:[0xE0BA,SIZE6], mid:[0xE0BB,SIZE6], right:[0xE0BC,SIZE6]}
        },
        0x21CE:
        {
          dir: H,
          HW: [[0.845,MAIN], [1.295,SIZE1]],
          stretch: {left:[0xE0C1,SIZE6], rep:[0xE0C2,SIZE6], mid:[0xE0C3,SIZE6], right:[0xE0C4,SIZE6]}
        },
        0x21CF:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE0BD,SIZE6], rep:[0xE0BE,SIZE6], mid:[0xE0BF,SIZE6], right:[0xE0C0,SIZE6]}
        },
        0x21D0:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE0A7,SIZE6], rep:[0xE0A8,SIZE6], right:[0xE0A9,SIZE6]}
        },
        0x21D1:
        {
          dir: V,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {bot:[0xE0AD,SIZE6], ext:[0xE0AE,SIZE6], top:[0xE0AF,SIZE6]}
        },
        0x21D2:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE0AA,SIZE6], rep:[0xE0AB,SIZE6], right:[0xE0AC,SIZE6]}
        },
        0x21D3:
        {
          dir: V,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {bot:[0xE0B0,SIZE6], ext:[0xE0B1,SIZE6], top:[0xE0B2,SIZE6]}
        },
        0x21D4:
        {
          dir: H,
          HW: [[0.845,MAIN], [1.295,SIZE1]],
          stretch: {left:[0xE0B3,SIZE6], rep:[0xE0B4,SIZE6], right:[0xE0B5,SIZE6]}
        },
        0x21D5:
        {
          dir: V,
          HW: [[0.845,MAIN], [1.295,SIZE1]],
          stretch: {bot:[0xE0B6,SIZE6], ext:[0xE0B7,SIZE6], top:[0xE0B8,SIZE6]}
        },
        0x21D6:
        {
          dir: V,
          HW: [[0.622,ARROWS], [0.940,SIZE1]]
        },
        0x21D7:
        {
          dir: V,
          HW: [[0.622,ARROWS], [0.940,SIZE1]]
        },
        0x21D8:
        {
          dir: V,
          HW: [[0.622,ARROWS], [0.940,SIZE1]]
        },
        0x21D9:
        {
          dir: V,
          HW: [[0.622,ARROWS], [0.940,SIZE1]]
        },
        0x21DA:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE0CB,SIZE6], rep:[0xE0CC,SIZE6], right:[0xE0CD,SIZE6]}
        },
        0x21DB:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]],
          stretch: {left:[0xE0CE,SIZE6], rep:[0xE0CF,SIZE6], right:[0xE0D0,SIZE6]}
        },
        0x21DC:
        {
          dir: H,
          HW: [[0.760,ARROWS], [1.210,SIZE1]]
        },
        0x21DD:
        {
          dir: H,
          HW: [[0.760,MAIN], [1.210,SIZE1]]
        },
        0x21E6:
        {
          dir: H,
          HW: [[0.887,ARROWS], [1.337,SIZE1]],
          stretch: {left:[0xE0D1,SIZE6], rep:[0xE0D2,SIZE6], right:[0xE0D3,SIZE6]}
        },
        0x21E7:
        {
          dir: V,
          HW: [[0.887,ARROWS], [1.337,SIZE1]],
          stretch: {bot:[0xE0D7,SIZE6], ext:[0xE0D8,SIZE6], top:[0xE0D9,SIZE6]}
        },
        0x21E8:
        {
          dir: H,
          HW: [[0.887,ARROWS], [1.337,SIZE1]],
          stretch: {left:[0xE0D4,SIZE6], rep:[0xE0D5,SIZE6], right:[0xE0D6,SIZE6]}
        },
        0x21E9:
        {
          dir: V,
          HW: [[0.887,ARROWS], [1.337,SIZE1]],
          stretch: {bot:[0xE0DA,SIZE6], ext:[0xE0DB,SIZE6], top:[0xE0DC,SIZE6]}
        },
        0x21F3:
        {
          dir: V,
          HW: [[0.910,ARROWS], [1.360,SIZE1]],
          stretch: {bot:[0xE0DD,SIZE6], ext:[0xE0DE,SIZE6], top:[0xE0DF,SIZE6]}
        },
        0x21F5:
        {
          dir: V,
          HW: [[0.770,ARROWS], [1.220,SIZE1]],
          stretch: {bot:[0xE08C,SIZE6], ext:[0xE08D,SIZE6], top:[0xE08E,SIZE6]}
        },
        0x21F6:
        {
          dir: H,
          HW: [[0.760,ARROWS], [1.210,SIZE1]],
          stretch: {left:[0xE09B,SIZE6], rep:[0xE09C,SIZE6], right:[0xE09D,SIZE6]}
        },
        0x220F:
        {
          dir: V,
          HW: [[1.000,OPERATORS], [1.442,SIZE1]]
        },
        0x2210:
        {
          dir: V,
          HW: [[1.000,OPERATORS], [1.442,SIZE1]]
        },
        0x2211:
        {
          dir: V,
          HW: [[1.000,OPERATORS], [1.442,SIZE1]]
        },
        0x2212:
        {
          dir: H,
          HW: [[0.600,MAIN]],
          stretch: {left:[0xE127,SIZE6], rep:[0xE128,SIZE6], right:[0xE129,SIZE6]}
        },
        0x221A:
        {
          dir: V,
          HW: [[0.790,MAIN], [1.150,SIZE1], [1.510,SIZE2], [1.870,SIZE3], [2.230,SIZE4], [2.590,SIZE5], [2.950,SIZE6]],
          stretch: {bot:[0x23B7,SYMBOLS], ext:[0xE133,SIZE6], top:[0xE134,SIZE6]}
        },
        0x2223:
        {
          dir: V,
          HW: [[0.800,MAIN], [0.960,SIZE1], [1.152,SIZE2], [1.382,SIZE3], [1.658,SIZE4], [1.990,SIZE5], [2.388,SIZE6]],
          stretch: {bot:[0xE004,SIZE6], ext:[0xE005,SIZE6], top:[0xE006,SIZE6]}
        },
        0x2225:
        {
          dir: V,
          HW: [[0.800,MAIN], [0.960,SIZE1], [1.152,SIZE2], [1.382,SIZE3], [1.658,SIZE4], [1.990,SIZE5], [2.388,SIZE6]],
          stretch: {bot:[0xE12A,SIZE6], ext:[0xE12B,SIZE6], top:[0xE12C,SIZE6]}
        },
        0x222B:
        {
          dir: V,
          HW: [[1.092,MAIN], [2.026,SIZE1]],
          stretch: {top:[0xE138,SIZE6], ext:[0x23AE,SYMBOLS], bot:[0xE139,SIZE6]}
        },
        0x222C:
        {
          dir: V,
          HW: [[1.092,OPERATORS], [2.026,SIZE1]],
          stretch: {top:[0xE13A,SIZE6], ext:[0xE13B,SIZE6], bot:[0xE13C,SIZE6]}
        },
        0x222D:
        {
          dir: V,
          HW: [[1.092,OPERATORS], [2.026,SIZE1]],
          stretch: {top:[0xE13D,SIZE6], ext:[0xE13E,SIZE6], bot:[0xE13F,SIZE6]}
        },
        0x222E:
        {
          dir: V,
          HW: [[1.092,OPERATORS,null,0x222F], [2.026,SIZE1]]
        },
        0x222F:
        {
          dir: V,
          HW: [[1.092,OPERATORS], [2.026,SIZE1]]
        },
        0x2230:
        {
          dir: V,
          HW: [[1.092,OPERATORS], [2.026,SIZE1]]
        },
        0x2231:
        {
          dir: V,
          HW: [[1.092,OPERATORS], [2.026,SIZE1]]
        },
        0x2232:
        {
          dir: V,
          HW: [[1.092,OPERATORS], [2.026,SIZE1]]
        },
        0x2233:
        {
          dir: V,
          HW: [[1.092,OPERATORS], [2.026,SIZE1]]
        },
        0x2261:
        {
          dir: H,
          HW: [[0.600,MAIN]],
          stretch: {left:[0xE12D,SIZE6], rep:[0xE12E,SIZE6], right:[0xE12F,SIZE6]}
        },
        0x2263:
        {
          dir: H,
          HW: [[0.600,OPERATORS]],
          stretch: {left:[0xE130,SIZE6], rep:[0xE131,SIZE6], right:[0xE132,SIZE6]}
        },
        0x22A2:
        {
          dir: V,
          HW: [[0.650,MAIN], [0.800,SIZE1]]
        },
        0x22A3:
        {
          dir: V,
          HW: [[0.650,MAIN], [0.800,SIZE1]]
        },
        0x22A4:
        {
          dir: V,
          HW: [[0.650,MAIN], [0.800,SIZE1]]
        },
        0x22A5:
        {
          dir: V,
          HW: [[0.650,MAIN], [0.800,SIZE1]]
        },
        0x22C0:
        {
          dir: V,
          HW: [[0.974,OPERATORS], [1.411,SIZE1]]
        },
        0x22C1:
        {
          dir: V,
          HW: [[0.974,OPERATORS], [1.411,SIZE1]]
        },
        0x22C2:
        {
          dir: V,
          HW: [[0.978,OPERATORS], [1.402,SIZE1]]
        },
        0x22C3:
        {
          dir: V,
          HW: [[0.978,OPERATORS], [1.402,SIZE1]]
        },
        0x2308:
        {
          dir: V,
          HW: [[0.820,MAIN], [0.980,SIZE1], [1.172,SIZE2], [1.402,SIZE3], [1.678,SIZE4], [2.010,SIZE5], [2.408,SIZE6], [2.612,SIZE6,1.085]],
          stretch: {ext:[0x23A2,SYMBOLS], top:[0x23A1,SYMBOLS]}
        },
        0x2309:
        {
          dir: V,
          HW: [[0.820,MAIN], [0.980,SIZE1], [1.172,SIZE2], [1.402,SIZE3], [1.678,SIZE4], [2.010,SIZE5], [2.408,SIZE6], [2.612,SIZE6,1.085]],
          stretch: {ext:[0x23A5,SYMBOLS], top:[0x23A4,SYMBOLS]}
        },
        0x230A:
        {
          dir: V,
          HW: [[0.820,MAIN], [0.980,SIZE1], [1.172,SIZE2], [1.402,SIZE3], [1.678,SIZE4], [2.010,SIZE5], [2.408,SIZE6], [2.612,SIZE6,1.085]],
          stretch: {bot:[0x23A3,SYMBOLS], ext:[0x23A2,SYMBOLS]}
        },
        0x230B:
        {
          dir: V,
          HW: [[0.820,MAIN], [0.980,SIZE1], [1.172,SIZE2], [1.402,SIZE3], [1.678,SIZE4], [2.010,SIZE5], [2.408,SIZE6], [2.612,SIZE6,1.085]],
          stretch: {bot:[0x23A6,SYMBOLS], ext:[0x23A5,SYMBOLS]}
        },
        0x2329:
        {
          dir: V,
          HW: [[0.816,SYMBOLS], [1.062,SIZE1], [1.386,SIZE2], [1.810,SIZE3], [2.366,SIZE4], [3.095,SIZE5], [4.050,SIZE6]]
        },
        0x232A:
        {
          dir: V,
          HW: [[0.816,SYMBOLS], [1.062,SIZE1], [1.386,SIZE2], [1.810,SIZE3], [2.366,SIZE4], [3.095,SIZE5], [4.050,SIZE6]]
        },
        0x23B4:
        {
          dir: H,
          HW: [[0.367,MAIN], [0.740,SIZE1], [1.113,SIZE2], [1.484,SIZE3], [1.855,SIZE4], [2.226,SIZE5], [2.593,SIZE6]],
          stretch: {left:[0xE11B,SIZE6], rep:[0xE11C,SIZE6], right:[0xE11D,SIZE6]}
        },
        0x23B5:
        {
          dir: H,
          HW: [[0.367,MAIN], [0.740,SIZE1], [1.113,SIZE2], [1.484,SIZE3], [1.855,SIZE4], [2.226,SIZE5], [2.593,SIZE6]],
          stretch: {left:[0xE11E,SIZE6], rep:[0xE11F,SIZE6], right:[0xE120,SIZE6]}
        },
        0x23D0:
        {
          dir: V,
          HW: [[0.800,MAIN,null,0x7C], [1.269,MAIN,1.586,0x7C], [1.717,MAIN,2.146,0x7C], [2.164,MAIN,2.705,0x7C], [2.612,MAIN,3.265,0x7C]],
          stretch: {ext:[0x7C,MAIN]}
        },
        0x23DC:
        {
          dir: H,
          HW: [[0.528,MAIN], [1.028,SIZE1], [1.528,SIZE2], [2.028,SIZE3], [2.528,SIZE4], [3.028,SIZE5], [3.528,SIZE6]],
          stretch: {left:[0xE115,SIZE6], rep:[0xE116,SIZE6], right:[0xE117,SIZE6]}
        },
        0x23DD:
        {
          dir: H,
          HW: [[0.528,MAIN], [1.028,SIZE1], [1.528,SIZE2], [2.028,SIZE3], [2.528,SIZE4], [3.028,SIZE5], [3.528,SIZE6]],
          stretch: {left:[0xE118,SIZE6], rep:[0xE119,SIZE6], right:[0xE11A,SIZE6]}
        },
        0x23DE:
        {
          dir: H,
          HW: [[0.540,MAIN], [1.038,SIZE1], [1.538,SIZE2], [2.038,SIZE3], [2.538,SIZE4], [3.038,SIZE5], [3.538,SIZE6]],
          stretch: {left:[0xE10D,SIZE6], rep:[0xE10E,SIZE6], mid:[0xE10F,SIZE6], right:[0xE110,SIZE6]}
        },
        0x23DF:
        {
          dir: H,
          HW: [[0.540,MAIN], [1.038,SIZE1], [1.538,SIZE2], [2.038,SIZE3], [2.538,SIZE4], [3.038,SIZE5], [3.538,SIZE6]],
          stretch: {left:[0xE111,SIZE6], rep:[0xE112,SIZE6], mid:[0xE113,SIZE6], right:[0xE114,SIZE6]}
        },
        0x23E0:
        {
          dir: H,
          HW: [[0.560,MAIN], [1.064,SIZE1], [1.566,SIZE2], [2.070,SIZE3], [2.572,SIZE4], [3.076,SIZE5], [3.580,SIZE6]],
          stretch: {left:[0xE121,SIZE6], rep:[0xE122,SIZE6], right:[0xE123,SIZE6]}
        },
        0x23E1:
        {
          dir: H,
          HW: [[0.560,MAIN], [1.064,SIZE1], [1.566,SIZE2], [2.070,SIZE3], [2.572,SIZE4], [3.076,SIZE5], [3.580,SIZE6]],
          stretch: {left:[0xE124,SIZE6], rep:[0xE125,SIZE6], right:[0xE126,SIZE6]}
        },
        0x27A1:
        {
          dir: H,
          HW: [[0.835,MISC], [1.285,SIZE1]],
          stretch: {left:[0xE0E6,SIZE6], rep:[0xE0E7,SIZE6], right:[0xE0E8,SIZE6]}
        },
        0x27E6:
        {
          dir: V,
          HW: [[0.840,SYMBOLS], [1.000,SIZE1], [1.192,SIZE2], [1.422,SIZE3], [1.698,SIZE4], [2.030,SIZE5], [2.428,SIZE6]],
          stretch: {bot:[0xE107,SIZE6], ext:[0xE108,SIZE6], top:[0xE109,SIZE6]}
        },
        0x27E7:
        {
          dir: V,
          HW: [[0.840,SYMBOLS], [1.000,SIZE1], [1.192,SIZE2], [1.422,SIZE3], [1.698,SIZE4], [2.030,SIZE5], [2.428,SIZE6]],
          stretch: {bot:[0xE10A,SIZE6], ext:[0xE10B,SIZE6], top:[0xE10C,SIZE6]}
        },
        0x27E8:
        {
          dir: V,
          HW: [[0.816,MAIN], [1.062,SIZE1], [1.386,SIZE2], [1.810,SIZE3], [2.366,SIZE4], [3.095,SIZE5], [4.050,SIZE6]]
        },
        0x27E9:
        {
          dir: V,
          HW: [[0.816,MAIN], [1.062,SIZE1], [1.386,SIZE2], [1.810,SIZE3], [2.366,SIZE4], [3.095,SIZE5], [4.050,SIZE6]]
        },
        0x27EA:
        {
          dir: V,
          HW: [[0.816,SYMBOLS], [1.062,SIZE1], [1.386,SIZE2], [1.810,SIZE3], [2.366,SIZE4], [3.095,SIZE5], [4.050,SIZE6]]
        },
        0x27EB:
        {
          dir: V,
          HW: [[0.816,SYMBOLS], [1.062,SIZE1], [1.386,SIZE2], [1.810,SIZE3], [2.366,SIZE4], [3.095,SIZE5], [4.050,SIZE6]]
        },
        0x27EE:
        {
          dir: V,
          HW: [[0.828,MAIN], [0.988,SIZE1], [1.180,SIZE2], [1.410,SIZE3], [1.686,SIZE4], [2.018,SIZE5], [2.416,SIZE6]],
          stretch: {bot:[0xE101,SIZE6], ext:[0xE102,SIZE6], top:[0xE103,SIZE6]}
        },
        0x27EF:
        {
          dir: V,
          HW: [[0.828,MAIN], [0.988,SIZE1], [1.180,SIZE2], [1.410,SIZE3], [1.686,SIZE4], [2.018,SIZE5], [2.416,SIZE6]],
          stretch: {bot:[0xE104,SIZE6], ext:[0xE105,SIZE6], top:[0xE106,SIZE6]}
        },
        0x2906:
        {
          dir: H,
          HW: [[0.835,ARROWS], [1.285,SIZE1]],
          stretch: {left:[0xE0C5,SIZE6], rep:[0xE0C6,SIZE6], right:[0xE0C7,SIZE6]}
        },
        0x2907:
        {
          dir: H,
          HW: [[0.835,ARROWS], [1.285,SIZE1]],
          stretch: {left:[0xE0C8,SIZE6], rep:[0xE0C9,SIZE6], right:[0xE0CA,SIZE6]}
        },
        0x2A00:
        {
          dir: V,
          HW: [[0.916,OPERATORS], [1.188,SIZE1]]
        },
        0x2A01:
        {
          dir: V,
          HW: [[0.916,OPERATORS], [1.188,SIZE1]]
        },
        0x2A02:
        {
          dir: V,
          HW: [[0.916,OPERATORS], [1.188,SIZE1]]
        },
        0x2A03:
        {
          dir: V,
          HW: [[0.978,OPERATORS], [1.402,SIZE1]]
        },
        0x2A04:
        {
          dir: V,
          HW: [[0.978,OPERATORS], [1.402,SIZE1]]
        },
        0x2A05:
        {
          dir: V,
          HW: [[0.960,OPERATORS], [1.384,SIZE1]]
        },
        0x2A06:
        {
          dir: V,
          HW: [[0.960,OPERATORS], [1.384,SIZE1]]
        },
        0x2A09:
        {
          dir: V,
          HW: [[0.770,OPERATORS], [0.974,SIZE1]]
        },
        0x2A0C:
        {
          dir: V,
          HW: [[1.092,OPERATORS], [2.026,SIZE1]],
          stretch: {top:[0xE135,SIZE6], ext:[0xE136,SIZE6], bot:[0xE137,SIZE6]}
        },
        0x2A11:
        {
          dir: V,
          HW: [[1.092,OPERATORS], [2.026,SIZE1]]
        },
        0x2B04:
        {
          dir: H,
          HW: [[0.909,SHAPES], [1.359,SIZE1]],
          stretch: {left:[0xE0E0,SIZE6], rep:[0xE0E1,SIZE6], right:[0xE0E2,SIZE6]}
        },
        0x2B05:
        {
          dir: H,
          HW: [[0.835,SHAPES], [1.285,SIZE1]],
          stretch: {left:[0xE0E3,SIZE6], rep:[0xE0E4,SIZE6], right:[0xE0E5,SIZE6]}
        },
        0x2B06:
        {
          dir: V,
          HW: [[0.835,SHAPES], [1.285,SIZE1]],
          stretch: {bot:[0xE0E9,SIZE6], ext:[0xE0EA,SIZE6], top:[0xE0EB,SIZE6]}
        },
        0x2B07:
        {
          dir: V,
          HW: [[0.835,SHAPES], [1.285,SIZE1]],
          stretch: {bot:[0xE0EC,SIZE6], ext:[0xE0ED,SIZE6], top:[0xE0EE,SIZE6]}
        },
        0x2B0C:
        {
          dir: H,
          HW: [[0.845,SHAPES], [1.295,SIZE1]],
          stretch: {left:[0xE0EF,SIZE6], rep:[0xE0F0,SIZE6], right:[0xE0F1,SIZE6]}
        },
        0x2B0D:
        {
          dir: V,
          HW: [[0.845,SHAPES], [1.295,SIZE1]],
          stretch: {bot:[0xE0F2,SIZE6], ext:[0xE0F3,SIZE6], top:[0xE0F4,SIZE6]}
        },
        0x2B31:
        {
          dir: H,
          HW: [[0.760,SHAPES], [1.210,SIZE1]],
          stretch: {left:[0xE09E,SIZE6], rep:[0xE09F,SIZE6], right:[0xE0A0,SIZE6]}
        }
      }

    }
  });
  MathJax.Hub.Register.LoadHook(HTMLCSS.fontDir+"/Size1/Regular/Main.js",function () {
    var i;
    for (i = 0x222B; i <= 0x222D; i++) {
      HTMLCSS.FONTDATA.FONTS[SIZE1][i][2] -= 190;
      HTMLCSS.FONTDATA.FONTS[SIZE1][i][5] = {rfix:-190};
    }
    for (i = 0x222E; i <= 0x2231; i++) {
      HTMLCSS.FONTDATA.FONTS[SIZE1][i][2] -= 100;
      HTMLCSS.FONTDATA.FONTS[SIZE1][i][5] = {rfix:-100};
    }
  });
  AJAX.loadComplete(HTMLCSS.fontDir + "/fontdata.js");

})(MathJax.OutputJax["HTML-CSS"],MathJax.ElementJax.mml,MathJax.Ajax);
