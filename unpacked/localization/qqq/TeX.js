/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/qqq/TeX.js
 *
 *  Copyright (c) 2009-2013 The MathJax Consortium
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
 *
 */

MathJax.Localization.addTranslation("qqq","TeX",{
        version: "2.2",
        isLoaded: true,
        strings: {
          ExtraOpenMissingClose: "This appears in TeX expressions when open and close braces do not match e.g. \\( { \\)",
          ExtraCloseMissingOpen: "This appears in TeX expressions when open and close braces do not match e.g. \\( } \\)",
          MissingLeftExtraRight: "This appears in TeX expressions when left/right commands do no match e.g. \\( \\right) \\). Do not translate \\left and \\right; they are TeX commands.",
          MissingScript: "This appears in TeX expressions when a superscript or subscript is missing e.g. \\( x^ \\)",
          ExtraLeftMissingRight: "This appears in TeX expressions when left/right commands do no match e.g. \\( \\left( \\). Do not translate \\left and \\right; they are TeX commands",
          Misplaced: "This appears in TeX expressions when an item is misplaced e.g. \\( & \\) since the ampersand is supposed to be used in tabular expressions. The argument is the misplaced item.",
          MissingOpenForSub: "This appears in TeX expressions when an a subscript is missing an open brace",
          MissingOpenForSup: "This appears in TeX expressions when an a supscript is missing an open brace",
          AmbiguousUseOf: "This appears in TeX expressions when a command is used in an ambiguous way e.g. \\( x \\over y \\over z \\). The argument is the name of the TeX command",
          EnvBadEnd: "This appears in TeX expressions when environment names do not match e.g. \\( \\begin{aligned} \\end{eqarray} \\). Do not translate \\begin and \\end; they are TeX commands. The first argument is the environment name used for \\begin and the second argument is the environment name used for \\end.",
          EnvMissingEnd: "This appears in TeX expressions when an environment is not closed e.g. \\( \\begin{aligned} \\). Do not translate \\end, it is a TeX command. The first argulent is the environment name e.g. 'aligned'.",
          MissingBoxFor: "This appears in TeX expressions when a command is missing a TeX box. The argument is the command name.",
          MissingCloseBrace: "This appears in TeX expressions when a close brace is missing e.g. \\( \\array{ \\)",
          UndefinedControlSequence: "This appears in TeX expressions when an undefined control sequence is used. The argument is the name of the TeX command.",
          DoubleExponent: "This appears in TeX expressions when an ambiguous double exponent is used e.g. x^3^2 should be x^{3^2} or {x^3}^2.",
          DoubleSubscripts: "This appears in TeX expressions when an ambiguous double subscripts is used e.g. x_3_2 should be x_{3_2} or {x_3}_2.",
          DoubleExponentPrime: "This appears in TeX expressions when an ambiguous double exponent is caused by a prime e.g. x^a' should be {x^a}' or x^{a'}",
          CantUseHash1: "This appears in TeX expressions when the macro parameter character '#' is used in math mode e.g. \\( # \\)",
          MisplacedMiddle: "This appears in TeX expressions when the middle command is used outside \\left ... \\right e.g. \\( \\middle| \\). Do not translate \\left and \\right; they are TeX commands",
          MisplacedLimits: "This appears in TeX expressions when the limits command is not used on an operator e.g. \\( \\limits \\). The argument is '\\limits'.",
          MisplacedMoveRoot: "This appears in TeX expressions when a move root command is used outside a root e.g. \\( \\uproot \\). The argument is either \\uproot or \\leftroot",
          MultipleCommand: "This happens when a command or token can only be present once, e.g., \\tag{}. The argument is the name of the duplicated command",
          IntegerArg: "This happens when an unexpected non-integer argument is passed to a command e.g. \\uproot. The argument is the name of the command.",
          NotMathMLToken: "MathJax has a non-standard \\mmlToken command to insert MathML token elements. This error happens when the tag name is unknown e.g. \\mmlToken{INVALID}{x}",
          InvalidMathMLAttr: "MathJax has non standard MathML and HTML related commands which can contain attributes. This error happens when the parameter is not a valid attribute e.g. \\( \\mmlToken{mi}[_INVALID_]{x} \\) where underscores are forbidden",
          UnknownAttrForElement: "MathJax has non standard MathML and HTML related commands which can contain attributes. This error happens when the attribute is invalid for the given element e.g. \\( \\mmlToken{mi}[INVALIDATTR='']{x} \\)",
          MaxMacroSub1: "MathJax limits the number of macro substitutions to prevent infinite loops. For example, this error may happen with \\newcommand{\\a}{\\a} \\a ",
          MaxMacroSub2: "MathJax limits the number of nested environements to prevent infinite loops. For example, this error may happen with \\newenvironment{a}{\\begin{a}}{\\end{a}} \\begin{a}\\end{a}",
          MissingArgFor: "This happens when an argument is missing e.g. \\frac{a}. The argument is the command name e.g. '\\frac'.",
          ExtraAlignTab: "Do not translate \\cases; it is a TeX command. This happens when \\cases has two many columns e.g. \\cases{a & b & c}.",
          BracketMustBeDimension: "This happens when a bracket argument of an item is not a dimension e.g. \\begin{array} x \\\\[INVALID] y \\end{array}. The argument is e.g. '\\'",
          InvalidEnv: "This happens with invalid environment name e.g. \\begin{_INVALID_} \\end{_INVALID_} where underscores are forbidden. The argument is the environment name e.g. '_INVALID_'",
          UnknownEnv: "This happens when an unknown environment is used e.g. \\begin{UNKNOWN} \\end{UNKNOWN}. The argument is the environment name e.g. 'UNKNOWN'.",
          ExtraClose: "This happens in some situations when an extra close brace is found.",
          ExtraCloseLooking: "This happens in some situations when an extra close brace while looking for another character, for example \\( \\sqrt[}]x \\). The argument is the character searched e.g. ']'.",
          MissingCloseBracket: "This error happens when a closing ']' is missing e.g. \\( \\sqrt[ \\). The argument is the command name e.g. '\\sqrt'",
          MissingOrUnrecognizedDelim: "This error happens when a delimiter is missing or unrecognized in a TeX expression e.g. \\( \\left \\). The argument is the command name e.g. '\\left'",
          MissingDimOrUnits: "This error happens with some TeX commands that are expecting a unit e.g. \\above. The argument is the command name.",
          TokenNotFoundForCommand: "This happens while processing a TeX command that is expected to contain a token e.g. \\( \\root{x} \\) where '\\of' should be used. The first argument is the token not found e.g. \\of and the second argument the command being processed e.g. \\root.",
          MathNotTerminated: "This happens when a math is not terminated in a text box e.g. \\( \\text{$x} \\) where the closing dollar is missing.",
          IllegalMacroParam: "This error happens when an invalid macro parameter reference is used e.g. \\( \\def\\mymacro#1{#2} \\mymacro{x} \\) where '#2' is invalid since \\mymacro has only one parameter.",
          MaxBufferSize: "The buffer size refers to the memory used by the TeX input processor. This error may happen with recursive calls e.g. \\( \\newcommand{\\a}{\\a\\a} \\a \\). Note that the number of a's is exponential with respect to the number of recursive calls. Hence 'MaxBufferSize' is likely to happen before 'MaxMacroSub1'",
          CommandNotAllowedInEnv: "This appears when the \\tag command is used inside an environment that does not allow labelling e.g. \\begin{split} x \\tag{x} \\end{split}. The first argument is '\\tag' the second is the name of the environment.",
          MultipleLabel: "This happens when TeX labels are duplicated e.g. \\( \\label{x} \\) \\( \\label{x} \\).",
          CommandAtTheBeginingOfLine: "This happens when showleft/showright are misplaced. The argument is the macro name.",
          IllegalAlign: "This happens when an invalid alignment is specified in \\cfrac e.g. \\cfrac[INVALID]{a}{b}. The argument is '\\cfrac'",
          BadMathStyleFor: "This happens when an invalid style is specified in \\genfrac e.g. \\genfrac{\\{}{\\}}{0pt}{INVALID}{a}{b}. The argument is '\\genfrac'.",
          PositiveIntegerArg: "This happens when an invalid alignment is specified in the alignedat environment e.g. \\begin{alignedat}{INVALID}\\end{alignedat}.",
          ErroneousNestingEq: "This happens when some equation structures are nested in a way forbidden by LaTeX e.g. two nested multline environment.",
          MultlineRowsOneCol: "This happens when a row of the multline environment has more than one column e.g. \\begin{multline} x & y \\end{multline}. The argument is the environment name 'multline'.",
          MultipleBBoxProperty: "This appears with the TeX command \\bbox when a property e.g. the background color is specified twice. The first argument is the name of the duplicate property and the second the command name '\\bbox'",
          InvalidBBoxProperty: "This appears with the TeX command \\bbox when a property is not a color, a padding dimension, or a style. 'padding' is a CSS property name for the 'inner margin' of a box. You may verify on MDN how it is translated in your language. The argument is the name of the invalid property specified.",
          ExtraEndMissingBegin: "This appears in TeX expressions when begingroup/endgroup do not match. Do not translate \\begingroup. The argument is the command name '\\endgroup'.",
          GlobalNotFollowedBy: "This appears in TeX expressions when \\global is not followed by \\let, \\def, or \\newcommand. Do not translate \\let, \\def, or \\newcommand; they are TeX expressions",
          UndefinedColorModel: "An invalid color model is used for the \\color command. The argument is the color model specified.",
          ModelArg1: "An invalid color value is used for the \\color command e.g. \\( \\color[RGB]{}{} \\)",
          InvalidDecimalNumber: "An invalid decimal number is used for the \\color command e.g. \\( \\color[rgb]{,,}{} \\)",
          ModelArg2: "An out-of-range number is used for the \\color command e.g. \\( \\color[RGB]{256,,}{} \\). The first argument is the lower bound of the valid interval and the second argument is the upper bound e.g 0 and 255 for the RGB color model.",
          InvalidNumber: "An invalid number is used for the \\color command e.g. \\( \\color[RGB]{,,}{} \\)",
          NewextarrowArg1: "Used when the first argument of \\Newextarrow is invalid. The argument is the command name \\Newextarrow.",
          NewextarrowArg2: "Used when the second argument of \\Newextarrow is invalid. The argument is the command name \\Newextarrow.",
          NewextarrowArg3: "Used when the third argument of \\Newextarrow is invalid. The argument is the command name \\Newextarrow.",
          NoClosingChar: "This is used in TeX mhchem expressions when a closing delimiters is missing e.g. \\( \\ce{ ->[ } \\). The argument will be ) or } or ]",
          IllegalControlSequenceName: "This appears when the \\newcommand TeX command is given an illegal control sequence name. The argument is '\\newcommand'.",
          IllegalParamNumber: "This appears when the \\newcommand TeX command is given an illegal number of parameters. The argument is '\\newcommand'.",
          DoubleBackSlash: "This appears when a TeX definitions is not followed by a control sequence e.g. \\let INVALID.",
          CantUseHash2: "This appears in TeX definitions when the character '#' is used in incorrectly used e.g. \\def\\mycommand#A. The argument is the command used e.g. 'mycommand'.",
          SequentialParam: "This appears in TeX definitions when parameters are not numbered sequentially e.g. \\def\\mycommand#2#1. The argument is the command name e.g. \\def.",
          MissingReplacementString: "This appears in TeX definitions when you don't specify a replacement string e.g. \\def\\mycommand. The argument is the command name e.g. \\def.",
          MismatchUseDef: "This appears in TeX definitions when a TeX command does not match its definition e.g. \\( \\def\\mycommand[#1]#2[#3]{#1+#2+#3} \\mycommand{a}{b}[c] \\). The argument is the command name e.g. \\mycommand",
          RunawayArgument: "This appears in TeX definitions when a TeX command does not match its definition e.g. \\( \\def\\mycommand[#1][#2]#3{#1+#2+#3} \\mycommand[a]{b} \\). The argument is the command name e.g. \\mycommand",
          NoClosingDelim: "This appears in TeX expressions when a \\verb command is not closed e.g. \\( \\verb?... \\) is missing a closing question mark. The argument is the command name."
        }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/qqq/TeX.js");
