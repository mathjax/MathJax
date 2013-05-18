/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/en/TeX.js
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
 *
 */

MathJax.Localization.addTranslation("en","TeX",{
  version: "2.2",
  isLoaded: true,
  strings: {

    ExtraOpenMissingClose:
      "Extra open brace or missing close brace", // NOTE: TeX commands use braces and brackets as delimiters

    ExtraCloseMissingOpen:
      "Extra close brace or missing open brace",

    MissingLeftExtraRight:
      "Missing \\left or extra \\right", // NOTE: do not translate \\left and \\right; they are TeX commands

    MissingScript:
      "Missing superscript or subscript argument",

    ExtraLeftMissingRight:
      "Extra \\left or missing \\right", // NOTE: do not translate \\left and \\right; they are TeX commands

    Misplaced:
      "Misplaced %1",

    MissingOpenForSub:
      "Missing open brace for subscript",

    MissingOpenForSup:
      "Missing open brace for superscript",

    AmbiguousUseOf:
      "Ambiguous use of %1", // NOTE: %1 will be a TeX command 

    EnvBadEnd:
      "\\begin{%1} ended with \\end{%2}", // NOTE: do not translate \\begin{%1} and \\end{%1}; they are TeX commands

    EnvMissingEnd:
      "Missing \\end{%1}", // NOTE: do not translate \\end

    MissingBoxFor:
      "Missing box for %1", //NOTE: refers to TeX boxes

    MissingCloseBrace:
      "Missing close brace",

    UndefinedControlSequence:
      "Undefined control sequence %1", // NOTE: %1 will be a TeX command

    DoubleExponent:
      "Double exponent: use braces to clarify", // NOTE: example: x^3^2 should be x^{3^2} or {x^3}^2

    DoubleSubscripts:
      "Double subscripts: use braces to clarify",

    DoubleExponentPrime:
      "Prime causes double exponent: use braces to clarify", // NOTE: example:  x^a' should be {x^a}' or x^{a'}

    CantUseHash1:
      "You can't use 'macro parameter character #' in math mode", // NOTE: '#' is used in TeX macros

    MisplacedMiddle:
      "%1 must be within \\left and \\right", // NOTE: do not translate \\left and \\right; they are TeX commands

    MisplacedLimits:
      "%1 is allowed only on operators", // NOTE: %1 will be \limits

    MisplacedMoveRoot:
      "%1 can appear only within a root",  // NOTE: %1 will be \uproot or \leftroot

    MultipleCommand:
      "Multiple %1", // NOTE: happens when a command or token can only be present once, e.g., \tag{}

    IntegerArg:
      "The argument to %1 must be an integer",

    NotMathMLToken:
      "%1 is not a token element", // NOTE: MathJax has a non-standard \mmltoken command to insert MathML token elements

    InvalidMathMLAttr:
      "Invalid MathML attribute: %1", // NOTE: MathJax has non standard MathML and HTML related commands which can contain attributes

    UnknownAttrForElement:
      "%1 is not a recognized attribute for %2",

    MaxMacroSub1:
      "MathJax maximum macro substitution count exceeded; " + // NOTE: MathJax limits the number of macro substitutions to prevent infinite loops
      "is there a recursive macro call?",

    MaxMacroSub2:
      "MathJax maximum substitution count exceeded; " + // NOTE: MathJax limits the number of nested environements to prevent infinite loops
      "is there a recursive latex environment?",

    MissingArgFor:
      "Missing argument for %1", // NOTE: %1 will be a macro name

    ExtraAlignTab:
      "Extra alignment tab in \\cases text", // NOTE: do not translate \\cases; it is a TeX command

    BracketMustBeDimension:
      "Bracket argument to %1 must be a dimension",

    InvalidEnv:
      "Invalid environment name '%1'",

    UnknownEnv:
      "Unknown environment '%1'",

    ExtraClose:
      "Extra close brace",

    ExtraCloseLooking:
      "Extra close brace while looking for %1",

    MissingCloseBracket:
      "Couldn't find closing ']' for argument to %1",

    MissingOrUnrecognizedDelim:
      "Missing or unrecognized delimiter for %1",

    MissingDimOrUnits:
      "Missing dimension or its units for %1",

    TokenNotFoundForCommand:
      "Couldn't find %1 for %2", // NOTE: %1 is a token (e.g.,macro or symbol) and %2 is a macro name

    MathNotTerminated:
      "Math not terminated in text box",

    IllegalMacroParam:
      "Illegal macro parameter reference",

    MaxBufferSize:
      "MathJax internal buffer size exceeded; is there a recursive macro call?",

 /* AMSmath */
 
    CommandNotAllowedInEnv:
      "%1 not allowed in %2 environment", 

    MultipleLabel:
      "Label '%1' multiply defined",

    CommandAtTheBeginingOfLine:
      "%1 must come at the beginning of the line", // NOTE: %1 will be a macro name

    IllegalAlign:
      "Illegal alignment specified in %1",  // NOTE: %1 will be an environment name

    BadMathStyleFor:
      "Bad math style for %1",

    PositiveIntegerArg:
      "Argument to %1 must me a positive integer",

    ErroneousNestingEq:
      "Erroneous nesting of equation structures",

    MultlineRowsOneCol:
      "The rows within the %1 environment must have exactly one column",

/* bbox */

    MultipleBBoxProperty:
      "%1 specified twice in %2",

    InvalidBBoxProperty:
      "'%1' doesn't look like a color, a padding dimension, or a style",

/* begingroup */

    ExtraEndMissingBegin:
      "Extra %1 or missing \\begingroup", // NOTE:  do not translate \\begingroup

    GlobalNotFollowedBy:
      "%1 not followed by \\let, \\def, or \\newcommand", // NOTE:  do not translate \\let, \\def, or \\newcommand; they are TeX commands

/* color */

    UndefinedColorModel:
      "Color model '%1' not defined",

    ModelArg1:
      "Color values for the %1 model require 3 numbers",

    InvalidDecimalNumber:
      "Invalid decimal number",

    ModelArg2:
      "Color values for the %1 model must be between %2 and %3",

    InvalidNumber:
      "Invalid number",

/* extpfeil */

    NewextarrowArg1:
      "First argument to %1 must be a control sequence name",

    NewextarrowArg2:
      "Second argument to %1 must be two integers separated by a comma",

    NewextarrowArg3:
      "Third argument to %1 must be a unicode character number",

/* mhchem */

    NoClosingChar:
      "Can't find closing %1", // NOTE: %1 will be ) or } or ]

/* newcommand */
      
    IllegalControlSequenceName:
      "Illegal control sequence name for %1",

    IllegalParamNumber:
      "Illegal number of parameters specified in %1",

    DoubleBackSlash:
      "\\ must be followed by a control sequence",

    CantUseHash2:
      "Illegal use of # in template for %1",

    SequentialParam:
      "Parameters for %1 must be numbered sequentially",

    MissingReplacementString:
      "Missing replacement string for definition of %1",

    MismatchUseDef:
      "Use of %1 doesn't match its definition",

    RunawayArgument:
      "Runaway argument for %1?",

/* verb */

    NoClosingDelim:
      "Can't find closing delimiter for %1"
 
  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/en/TeX.js");
