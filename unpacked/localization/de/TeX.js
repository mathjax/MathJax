/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/de/TeX.js
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

MathJax.Localization.addTranslation("de","TeX",{
  version: "2.2",
  isLoaded: true,
  strings: {

    ExtraOpenMissingClose:
      "Zus\u00E4tzliche offene oder fehlende schliessende Klammer", //TODO better alternative for "zusaetzlich"? Maybe a good translation of mismatched braces instead?
//    "Extra open brace or missing close brace",

    ExtraCloseMissingOpen:
      "Zus\u00E4tzliche schliessende oder fehlende offene Klammer",
//    "Extra close brace or missing open brace",

    MissingLeftExtraRight:
      "Fehlendes '\\left' oder zus\u00E4tzliches '\\right'", 
//    "Missing \\left or extra \\right",

    MissingScript:
      "Fehlendes Argument im Sub- oder Superskript",
//    "Missing superscript or subscript argument",

    ExtraLeftMissingRight:
      "Zus\u00E4tzliches '\\left' oder fehlendes '\\right'",
//    "Extra \\left or missing \\right",

    Misplaced:
      "%1 falsch plaziert", 
//    "Misplaced %1",

    MissingOpenForSub:
      "Fehlende offende Klammer im Subskript", 
//    "Missing open brace for subscript",  

    MissingOpenForSup:
      "Fehlende offene Klammer im Superskript", 
//    "Missing open brace for superscript",

    AmbiguousUseOf:
      "Mehrdeutige Verwendung von %1",
//    "Ambiguous use of %1",

    EnvBadEnd:
      "\\begin{%1} endet mit \\end{%2}",
//    "\\begin{%1} ended with \\end{%2}",

    EnvMissingEnd:
      "\\end{%1} fehlt",
//    "Missing \\end{%1}",

    MissingBoxFor:
      "Fehlende Box: %1", 
//    "Missing box for %1",

    MissingCloseBrace:
      "Fehlende geschlossene Klammer",
//     "Missing close brace",

    UndefinedControlSequence:
      "Nicht definierter Befehl: %1",
//    "Undefined control sequence %1",

    DoubleExponent:
      "Doppeltes Superskript: verwende Klammern zum Gruppieren",
//    "Double exponent: use braces to clarify",

    DoubleSubscripts:
      "Doppeltes Subskript: verwende Klammern zum Gruppieren",
//    "Double subscripts: use braces to clarify",

    DoubleExponentPrime:
      "Prime f\u00FChrt zu doppeltem Superskript: verwende Klammern zum Gruppieren ",
//    "Prime causes double exponent: use braces to clarify",

    CantUseHash1:
      "Das Zeichen '#' ist ein Makroparameter und kann nicht im Mathematikmodus verwendet werden.", 
//    "You can't use 'macro parameter character #' in math mode", 

    MisplacedMiddle:
      "%1 muss zwischen '\\left' und '\\right' stehen",
//    "%1 must be within \\left and \\right",
 
    MisplacedLimits:
      "%1 ist nur bei Operatoren erlaubt", 
//    "%1 is allowed only on operators",

    MisplacedMoveRoot:
      "%1 muss innerhalb einer Wurzel stehen",
//    "%1 can appear only within a root",

    MultipleCommand:
      "Zu viele %1",
//    "Multiple %1", 

    IntegerArg:
      "Das Argument in %1 muss ganzzahlig sein",
//    "The argument to %1 must be an integer",

    NotMathMLToken:
      "%1 ist kein Token-Element",
//    "%1 is not a token element",

    InvalidMathMLAttr:
      "Unzul\u00E4ssiges MathML-Attribut: %1",
//    "Invalid MathML attribute: %1",

    UnknownAttrForElement:
      "%1 ist kein zul\u00E4ssiges Attribut f\u00FCr %2",
//    "%1 is not a recognized attribute for %2",

    MaxMacroSub1:
      "Maximale Anzahl an Makros ist erreicht; " +
      "wird ein rekursiver Makroaufruf verwendet?",
//    "MathJax maximum macro substitution count exceeded; " +
//    "is there a recursive macro call?", 

    MaxMacroSub2:
      "Maximale Anzahl an Substitutionen ist erreicht; " +
      "wird eine rekursive LaTeX-Umgebung verwendet?",
//    "MathJax maximum substitution count exceeded; " +
//    "is there a recursive latex environment?",

    MissingArgFor:
      "Fehlendes Argument in %1", 
//    "Missing argument for %1", 

    ExtraAlignTab:
      "Zus\u00E4tzliches & im '\\cases' Text",
//    "Extra alignment tab in \\cases text", 

    BracketMustBeDimension:
      "Das geklammerte Argument f\u00FCr %1 muss eine Dimension sein", 
//    "Bracket argument to %1 must be a dimension",

    InvalidEnv:
      "Ung\u00FCltiger Umgebungsname %1",
//    "Invalid environment name '%1'",

    UnknownEnv:
      "Ung\u00FCltige Umgebung %1",
//    "Unknown environment '%1'",

    ExtraClose:
      "Zus\u00E4tzliche geschlossene Klammer", 
//    "Extra close brace",

    ExtraCloseLooking:
      "Zus\u00E4tzliche geschlossene Klammer w\u00E4hrend der Suche nach %1", 
//    "Extra close brace while looking for %1",

    MissingCloseBracket:
      "Argument zu %1 wurde nicht mit ']' geschlossen",
//    "Couldn't find closing ']' for argument to %1",

    MissingOrUnrecognizedDelim:
      "Fehlender oder nichterkannter Delimiter bei %1", 
//    "Missing or unrecognized delimiter for %1",

    MissingDimOrUnits:
      "Fehlende Dimension oder Einheiten bei %1", 
//    "Missing dimension or its units for %1",

    TokenNotFoundForCommand:
      "Konnte %1 nicht f\u00FCr %2 finden",
//    "Couldn't find %1 for %2",

    MathNotTerminated:
      "Formel in Textbox nicht abgeschlossen",
//    "Math not terminated in text box",

    IllegalMacroParam:
      "Ung\u00FC ltiger Makroparameter",
//    "Illegal macro parameter reference",

    MaxBufferSize:
      "Interner Puffergr\u00F6\u00DFe \u00FCberschritten; wird ein rekursiver Makroaufruf verwendet?", 
//    "MathJax internal buffer size exceeded; is there a recursive macro call?", 

 /* AMSmath */
 
    CommandNotAllowedInEnv:
      "%1 ist nicht in Umgebung %2 erlaubt",
//    "%1 not allowed in %2 environment", 

    MultipleLabel:
      "Label '%1' \u00FCberdefiniert",
//    "Label '%1' multiply defined",

    CommandAtTheBeginingOfLine:
      "%1 muss am Zeilenanfang stehen",
//    "%1 must come at the beginning of the line",

    IllegalAlign:
      "Ung\u00FCltige Ausrichtung in %1",
//    "Illegal alignment specified in %1", ?

    BadMathStyleFor:
      "Schlechtes 'math style' Argument: %1", 
//    "Bad math style for %1", 

    PositiveIntegerArg:
      "Argument bei %1 muss positiv und ganzzahlig sein",
//    "Argument to %1 must me a positive integer",

    ErroneousNestingEq:
      "Fehlerhafte Verschachtelung von Gleichungen", 
//    "Erroneous nesting of equation structures", 

    MultlineRowsOneCol:
      "Zeilen in multiline Umgebung m\u00FC ssen genau eine Spalte haben",
//    "The rows within the %1 environment must have exactly one column"

/* bbox */

    MultipleBBoxProperty:
      "%1 wurde zweimal in %2 angegeben",
//    "%1 specified twice in %2",

    InvalidBBoxProperty:
      "'%1' scheint keine Farbe, Padding-Dimension oder Stil zu sein",
//    "'%1' doesn't look like a color, a padding dimension, or a style", 

/* begingroup */

    ExtraEndMissingBegin:
      "Zus\u00E4tzliches oder Fehlendes \\begingroup",
//    "Extra %1 or missing \\begingroup",

    GlobalNotFollowedBy:
      "%1 nicht von '\\let', '\\def' oder '\\newcommand' gefolgt",
//    "%1 not followed by \\let, \\def, or \\newcommand",

/* color */

    UndefinedColorModel:
      "Farbmodell '%1' nicht definiert",
//    "Color model '%1' not defined", 

    ModelArg1:
      "Farbwerte f\u00FCr Farbmodell '%1' ben\u00F6tigen 3 Werte",
//    "Color values for the %1 model require 3 numbers",  // *NEW*

    InvalidDecimalNumber:
      "Ung\u00FCltige Dezimalzahl",
//    "Invalid decimal number",

    ModelArg2:
      "Farbwerte f\u00FCr Farbmodell '%1' m\u00FCssen zwischen %2 und %3 liegen",
//    Color values for the %1 model must be between %2 and %3",  // *NEW*

    InvalidNumber:
      "Ung\u00FCltige Zahl",
//    "Invalid number",

/* extpfeil */

    NewextarrowArg1:
      "Das erste Argument von %1 muss Name einer Befehlsfolge sein",
//    "First argument to %1 must be a control sequence name",

    NewextarrowArg2:
      "Zweites Argument von %1 m\u00FCssen zwei ganze Zahlen, durch Komma getrennt, sein",
//    "Second argument to %1 must be two integers separated by a comma",

    NewextarrowArg3:
      "Drittes argument von %1 m\u00FCssen Unicode-Nummern sein",
//    "Third argument to %1 must be a unicode character number",

/* mhchem */

    NoClosingChar:
      "Kann geschlossene %1 nicht finden",
//    "Can't find closing %1",

/* newcommand */
      
    IllegalControlSequenceName:
      "Ung\u00FCltige Befehlsfolge",
//    "Illegal control sequence name for %1",

    IllegalParamNumber:
      "Ung\u00FCltige Anzahl von Parametern in %1",
//    "Illegal number of parameters specified in %1",

    DoubleBackSlash:
      "\\ muss von Befehlsfolge gefolgt werden",
//    "\\ must be followed by a control sequence",

    CantUseHash2:
      "Ung\u00FCltige Verwendung von # im Template von %1", 
//    "Illegal use of # in template for %1",

    SequentialParam:
      "Parameter von %1 m\u00FCssen durch nummeriert sein",
//    "Parameters for %1 must be numbered sequentially",

    MissingReplacementString:
      "Ersetzende Zeichenkette f\u00FCr Definition von %1 fehlt", 
//    "Missing replacement string for definition of %1", 

    MismatchUseDef:
      "Verwendung von %1 passt nicht zur Definition",
//    "Use of %1 doesn't match its definition",

    RunawayArgument:
      "Nichtgeschlossenes Argument f\u00FCr %1?", 
//    "Runaway argument for %1?"

/* verb */

    NoClosingDelim:
      "Kein schliessender Delimiter f\u00FCr %1"
//    "Can't find closing delimiter for %1"
 
  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/de/TeX.js");