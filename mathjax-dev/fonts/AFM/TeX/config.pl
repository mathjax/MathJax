$prefix = "MathJax_";
$fontdir = "TeX";

%ranges = (
  "Main" => [["Main R",
               [0x20,0x7F],                                # basic latin
	       [0xA0,0xBF],0xD7,0xF7,                      # some latin1 supplement
	       0x131,0x237,                                # dotless i and j
               [0x2C6,0x2C7],[0x2C9,0x2CB],[0x2D8,0x2D9],0x02DC,
#                [0x300,0x308],0x30C,0x338,                # Diacriticals
               [0x391,0x3C9],[0x3D1,0x3D6],[0x3F1,0x3F5],  # Greek
	       [0x2000,0x2026],0x2032,0x203E,              # Punctuation
               0x20D7,                                     # over arrow
	       [0x2102,0x2149],                            # letterlike symbols
	       [0x2190,0x2199],0x21A6,[0x21A9,0x21AA],[0x21BC,0x21C1],
 	         [0x21CB,0x21CC],[0x21D0,0x21D5],          # arrows
	       0x2200,[0x2202,0x2203],0x2205,[0x2207,0x2209],[0x220B,0x220D],[0x220F,0x2213],
                 [0x2215,0x221A],[0x221D,0x221E],0x2220,[0x2223,0x2230],[0x2236,0x2237],
	         0x223C,[0x2240,0x2241],[0x2243,0x2249],0x224D,0x2250,[0x2260,0x2262],
	         [0x2264,0x2265],[0x226A,0x226B],[0x226E,0x226F],[0x227A,0x227D],[0x2280,0x2289],
	         0x228E,[0x2291,0x2299],[0x22A2,0x22A5],0x22A8,[0x22C0,0x22C6],0x22C8,
	         [0x22E0,0x22E3],[0x22EE,0x22F1],          # Operators
	       [0x2308,0x230B],[0x2322,0x2323],0x23AF,
                 [0x23B0,0x23B1],0x23D0,                   # Technical
#	       0x25B3,0x25B9,0x25BD,0x25C3,0x25EF,         # circles and triangles
#	       [0x2660,0x2663], [0x266D,0x266F],           # suits and music
	       [0x27E8,0x27E9],                            # angle brackets
	       [0x27EE,0x27EF],[0x27F5,0x27FC],            # more arrows
	       0x29F5,                                     # reverse solidas operator
	       [0x2A00,0x2A06], 0x2A3F, [0x2AAF,0x2AB0],   # large operators
	     ],
	     ["Main B",
	       [0x20,0x7F],                                # basic latin,
               [0x393,0x394],0x398,0x39B,0x39E,0x3A0,0x3A3,
	         [0x3A5,0x3A6],[0x3A8,0x3A9],              # Greek capitals
	     ],
             ["Main I",
	       [0x20,0x7F],                                # basic latin,
	       0xA3,                                       # pound sign
	       0x131,0x237,                                # dotless i and j
               [0x393,0x394],0x398,0x39B,0x39E,0x3A0,0x3A3,
	         [0x3A5,0x3A6],[0x3A8,0x3A9],              # Greek capitals
	     ],
             ["Latin1Supplement",[0xA0,0xFF]],
	     ["LatinExtendedA",[0x100,0x17F]],
	     ["LatinExtendedB",[0x180,0x24F]],
	     ["SpacingModLetters",[0x2B0,0x2FF]],
	     ["CombDiacritMarks",[0x300,0x36F]],
	     ["GreekAndCoptic",[0x370,0x3FF]],
	     ["Cyrillic",[0x400,0x4FF]],
	     ["PhoneticExtensions",[0x1D00,0x1DBF]],
	     ["LatinExtendedAdditional",[0x1E00,0x1EFF]],
	     ["GeneralPunctuation",[0x2000,0x206F]],
	     ["SuperAndSubscripts",[0x2070,0x209F]],
	     ["CurrencySymbols",[0x20A0,0x20CF]],
	     ["CombDiactForSymbols",[0x20D0,0x20FF]],
	     ["LetterlikeSymbols",[0x2100,0x214F]],
	     ["NumberForms",[0x2150,0x218F]],
	     ["Arrows",[0x2190,0x21FF]],
	     ["MathOperators",[0x2200,0x22FF]],
	     ["MiscTechnical",[0x2300,0x23FF]],
	     ["ControlPictures",[0x2400,0x243F]],
	     ["EnclosedAlphanum",[0x2460,0x24FF]],
	     ["BoxDrawing",[0x2500,0x257F]],
	     ["BlockElements",[0x2580,0x259F]],
	     ["GeometricShapes",[0x25A0,0x25FF]],
	     ["MiscSymbols",[0x2600,0x26FF]],
	     ["Dingbats",[0x2700,0x27BF]],
	     ["MiscMathSymbolsA",[0x27C0,0x27EF]],
	     ["SupplementalArrowsA",[0x27F0,0x27FF]],
	     ["SupplementalArrowsB",[0x2900,0x297F]],
	     ["MiscMathSymbolsB",[0x2980,0x29FF]],
	     ["SuppMathOperators",[0x2A00,0x2AFF]],
	     ["MiscSymbolsAndArrows",[0x2B00,0x2BFF]],
	     ["CJK",[0x3000,0x303F]],
	     ["Hiragana",[0x3040,0x209F]],
	     ["AlphaPresentForms",[0xFB00,0xFB4F]],
	     ["Specials",[0xFFF0,0xFFFF]],
	     ["MathBold",[0x1D400,0x1D433],[0x1D7CE,0x1D7D7]],
	     ["MathItalic",[0x1D434,0x1D467]],
	     ["MathBoldItalic",[0x1D468,0x1D49B]],
	     ["MathScript",[0x1D49C,0x1D4CF]],
	     ["MathBoldScript",[0x1D4D0,0x1D503]],
	     ["Fraktur",[0x1D504,0x1D537]],
	     ["BBBold",[0x1D538,0x1D56B],[0x1D7D8,0x1D7E1]],
	     ["BoldFraktur",[0x1D56C,0x1D59F]],
	     ["MathSS",[0x1D5A0,0x1D5D3],[0x1D7E2,0x1D7EB]],
	     ["MathSSBold",[0x1D5D4,0x1D607],[0x1D7EC,0x1D7F6]],
	     ["MathSSItalic",[0x1D608,0x1D63B]],
	     ["MathSSItalicBold",[0x1D63C,0x1D66F]],
	     ["MathTT",[0x1D670,0x1D6A3],[0x1D7F6,0x1D7FF]],
	     ["ij",[0x1D6A4,0x1D6A5]],
	     ["GreekBold",[0x1D6A8,0x1D6E1]],
	     ["GreekItalic",[0x1D6E2,0x1D71B]],
	     ["GreekBoldItalic",[0x1D71C,0x1D755]],
	     ["GreekSSBold",[0x1D756,0x1D78F]],
	     ["GreekSSBoldItalic",[0x1D790,0x1D7C9]]
  ],
  "Size" => [["Main",[0,0x1F000]]],
  "Cali" => [["Main",[0,0x1F000]]],
  "Math" => [["Main",[0,0x1F000]]],
  "Gree" => [["Main",[0,0x1F000]]],
  "WinC" => [["Main",[0,0x1F000]]],
  "WinI" => [["Main",[0x20,0x20],[0xA0,0xA0],[0xE200,0xE23F],[0xE280,0xE2BF]],
             ["Bold",[0xE240,0xE27F]],
             ["AMS",[0xE2C0,0xE2DF]]],
  "AMS"  => [
             ["Main R"],
	     ["BBBold",[0,0x7F]],
	     ["Latin1Supplement",[0x80,0xFF]],
	     ["LatinExtendedA",[0x100,0x17F]],
	     ["SpacingModLetters",[0x2B0,0x2FF]],
	     ["CombDiacritMarks",[0x300,0x36F]],
	     ["GreekAndCoptic",[0x370,0x3FF]],
	     ["GeneralPunctuation",[0x2000,0x206F]],
	     ["LetterlikeSymbols",[0x2100,0x214F]],
	     ["Arrows",[0x2190,0x21FF]],
	     ["MathOperators",[0x2200,0x22FF]],
	     ["MiscTechnical",[0x2300,0x23FF]],
	     ["EnclosedAlphanum",[0x2460,0x24FF]],
	     ["BoxDrawing",[0x2500,0x257F]],
	     ["GeometricShapes",[0x25A0,0x25FF]],
	     ["MiscSymbols",[0x2600,0x26FF]],
	     ["Dingbats",[0x2700,0x27BF]],
	     ["SupplementalArrowsB",[0x2900,0x297F]],
	     ["MiscMathSymbolsB",[0x2980,0x29FF]],
	     ["SuppMathOperators",[0x2A00,0x2AFF]],
	     ["PUA",[0xE000,0xF8FF]]
            ],
  "Frak" => [
	     ["Main R"],
	     ["Main B"],
	     ["BasicLatin",[0,0x7F]],
             ["Other",[0x80,0xDFFF]],
	     ["PUA",[0xE300,0xE310]],
	    ],
  "Sans" => [
	     ["Main R"],
	     ["Main B"],
	     ["Main I"],
	     ["BasicLatin",[0,0x7F]],
	     ["CombDiacritMarks",[0x300,0x36F]],
	     ["Other",[0x80,0xFFFF]],
	    ],
  "Scri" => [
	     ["Main R"],
	     ["Main B"],
	     ["BasicLatin",[0,0x7F]],
	     ["Other",[0x80,0xFFFF]],
	    ],
  "Type" => [
	     ["Main R"],
	     ["BasicLatin",[0,0x7F]],
	     ["CombDiacritMarks",[0x300,0x36F]],
	     ["Other",[0x80,0xFFFF]],
	    ],
);

%test = (
  "Main" => '"MathJax Main"',
  "Math" => '"MathJax Math"',
  "Size" => '"() [] {}"',
  "WinC" => '"> T d "+String.fromCharCode(0x23A6)+" "+String.fromCharCode(0x2A00)',
  "WinI" => 'String.fromCharCode(0xE247)+" "+String.fromCharCode(0xE257)+" "+String.fromCharCode(0xE2CF)',
  "Cali" => '"MATHJAX CALIGRAPHIC"',
  "AMS"  => '"MATHJAX AMS"',
  "Frak" => '"MathJax Fraktur"',
  "Sans" => '"MathJax SansSerif"',
  "Scri" => '"MATHJAX SCRIPT"',
  "Type" => '"MathJax Typewriter"',
  "Gree" => 'String.fromCharCode(0x393)+" "+String.fromCharCode(0x3A5)+" "+String.fromCharCode(0x39B)',
);

