/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/it/TeX.js
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

MathJax.Localization.addTranslation("it","TeX",{
  version: "2.2",
  isLoaded: true,
  strings: {

    ExtraOpenMissingClose:
      "Graffa d'apertura in pi\u00F9 o di chiusura mancante",
      //"Extra open brace or missing close brace", // NOTE: TeX commands use braces and brackets as delimiters

    ExtraCloseMissingOpen:
      "Graffa di chiusura in pi\u00F9 o d'apertura mancante",
      //"Extra close brace or missing open brace",

    MissingLeftExtraRight:
      "Comando \\left mancante oppure \\right extra",
      //"Missing \\left or extra \\right", // NOTE: do not translate \\left and \\right; they are TeX commands

    MissingScript:
      "Argomento per l'esponente o per l'indice mancante",
      //"Missing superscript or subscript argument",

    ExtraLeftMissingRight:
      "Comando \\left extra oppure \\right mancante",
      //"Extra \\left or missing \\right", // NOTE: do not translate \\left and \\right; they are TeX commands

    Misplaced:
      "%1 mal posizionato",
      //"Misplaced %1",

    MissingOpenForSub:
      "Graffa d'apertura per l'indice mancante",
      //"Missing open brace for subscript",

    MissingOpenForSup:
      "Graffa d'apertura per l'esponente mancante",
      //"Missing open brace for superscript",

    AmbiguousUseOf:
      "Uso ambiguo di %1",
      //"Ambiguous use of %1",// NOTE: %1 will be a TeX command 

    EnvBadEnd:
      "\\begin{%1} terminato con \\end{%2}",
      //"\\begin{%1} ended with \\end{%2}", // NOTE: do not translate \\begin{%1} and \\end{%1}; they are TeX commands

    EnvMissingEnd:
      "\\end{%1} mancante",
      //"Missing \\end{%1}", // NOTE: do not translate \\end

    MissingBoxFor:
      "Box per %1 mancante",
      //"Missing box for %1", //NOTE: refers to TeX boxes

    MissingCloseBrace:
      "Graffa di chiusura mancante",
      //"Missing close brace",

    UndefinedControlSequence:
      "Sequenza di controllo %1 indefinita",
      //"Undefined control sequence %1", // NOTE: %1 will be a TeX command

    DoubleExponent:
      "Esponente doppio: usa le parentesi per distinguerli",
      //"Double exponent: use braces to clarify", // NOTE: example: x^3^2 should be x^{3^2} or {x^3}^2

    DoubleSubscripts:
      "Doppio indice: usa le parentesi per distinguerli",
      //"Double subscripts: use braces to clarify",

    DoubleExponentPrime:
      "Simbolo di primo visto come secondo esponente: usa le parentesi per chiarire",
      //"Prime causes double exponent: use braces to clarify", // NOTE: example:  x^a' should be {x^a}' or x^{a'}

    CantUseHash1:
      "Non puoi usare il carattere # come parametro delle macro in modalit\u00E1 matematica",
      //"You can't use 'macro parameter character #' in math mode", // NOTE: '#' is used in TeX macros

    MisplacedMiddle:
      "%1 deve trovarsi tra \\left e \\right",
      //"%1 must be within \\left and \\right", // NOTE: do not translate \\left and \\right; they are TeX commands

    MisplacedLimits:
      "%1 \u00E8 consentito solo con operatori",
      //"%1 is allowed only on operators", // NOTE: %1 will be \limits

    MisplacedMoveRoot:
      "%1 pu\u00F2 appare solo sotto radice",
      //"%1 can appear only within a root",  // NOTE: %1 will be \uproot or \leftroot

    MultipleCommand:
      "%1 multipli",
      //"Multiple %1", // NOTE: happens when a command or token can only be present once, e.g., \tag{}

    IntegerArg:
      "L'argomento di %1 deve essere un intero",
      //"The argument to %1 must be an integer",

    NotMathMLToken:
      "%1 non \u00E8 un token",
      //"%1 is not a token element", // NOTE: MathJax has a non-standard \mmltoken command to insert MathML token elements

    InvalidMathMLAttr:
      "Attributo MathML non valido: %1",
      //"Invalid MathML attribute: %1", // NOTE: MathJax has non standard MathML and HTML related commands which can contain attributes

    UnknownAttrForElement:
      "%1 non \u00E8 un attributo riconosciuto per %2",
      //"%1 is not a recognized attribute for %2",

    MaxMacroSub1:
      "Numero massimo per le sostituzioni di macro superato da MathJax; " +
      //"MathJax maximum macro substitution count exceeded; " + // NOTE: MathJax limits the number of macro substitutions to prevent infinite loops
      "forse una chiamata di macro ricorsiva?",
      //"is there a recursive macro call?",

    MaxMacroSub2:
      "Numero massimo per le sostituzioni superato da MathJax; " +
      //"MathJax maximum substitution count exceeded; " + // NOTE: MathJax limits the number of nested environements to prevent infinite loops
      "forse un'ambiente LaTeX ricorsivo?",
      //"is there a recursive latex environment?",

    MissingArgFor:
      "Argomento di %1 mancante",
      //"Missing argument for %1", // NOTE: %1 will be a macro name

    ExtraAlignTab:
      "Tabulazione d'allineamento extra nel testo di \\cases",
      //"Extra alignment tab in \\cases text", // NOTE: do not translate \\cases; it is a TeX command

    BracketMustBeDimension:
      "L'argomento tra parentesi per %1 deve essere una dimensione",
      //"Bracket argument to %1 must be a dimension",

    InvalidEnv:
      "Nome d'ambiente non valido '%1'",
      //"Invalid environment name '%1'",

    UnknownEnv:
      "Ambiente sconosciuto '%1'",
      //"Unknown environment '%1'",

    ExtraClose:
      "Graffa di chiusura extra",
      //"Extra close brace",

    ExtraCloseLooking:
      "Graffa di chiusura extra durante la ricerca di %1",
      //"Extra close brace while looking for %1",

    MissingCloseBracket:
      "Parentesi ] per l'argomento di %1 non trovata",
      //"Couldn't find closing ']' for argument to %1",

    MissingOrUnrecognizedDelim:
      "Delimitatore per %1 mancante o non riconosciuto",
      //"Missing or unrecognized delimiter for %1",

    MissingDimOrUnits:
      "Dimensione o sue unit\u00E1 mancanti per %1",
      //"Missing dimension or its units for %1",

    TokenNotFoundForCommand:
      "Impossibile trovare %1 per %2",
      //"Couldn't find %1 for %2", // NOTE: %1 is a token (e.g.,macro or symbol) and %2 is a macro name

    MathNotTerminated:
      "Formula non terminata in box di testo",
      //"Math not terminated in text box",

    IllegalMacroParam:
      "Riferimento a un parametro di macro illegale",
      //"Illegal macro parameter reference",

    MaxBufferSize:
      "Dimensione del buffer interno di MathJax superato; chiamata di macro ricorsiva?",
      //"MathJax internal buffer size exceeded; is there a recursive macro call?",

 /* AMSmath */

    CommandNotAllowedInEnv:
      "%1 non \u00E8 consentito nell'ambiente %2",
      //"%1 not allowed in %2 environment",

    MultipleLabel:
      "Etichetta '%1' definita pi\u00F9 volte",
      //"Label '%1' multiply defined",

    CommandAtTheBeginingOfLine:
      "%1 deve trovarsi all'inizio della riga",
      //"%1 must come at the beginning of the line", // NOTE: %1 will be a macro name

    IllegalAlign:
      "Allineamento specificato in %1 illegale",
      //"Illegal alignment specified in %1",  // NOTE: %1 will be an environment name

    BadMathStyleFor:
      "Stile math inadatto a %1",
      //"Bad math style for %1",

    PositiveIntegerArg:
      "L'argomento di %1 deve essere un intero positivo",
      //"Argument to %1 must me a positive integer",

    ErroneousNestingEq:
      "Annidamento di strutture di equazioni errato",
      //"Erroneous nesting of equation structures",

    MultlineRowsOneCol:
      "Le righe nell'ambiente %1 devono avere esattamente una colonna",
      //"The rows within the %1 environment must have exactly one column",

/* bbox */

    MultipleBBoxProperty:
      "%1 specificato due volte in %2",
      //"%1 specified twice in %2",

    InvalidBBoxProperty:
      "'%1' non sembra un colore, una spaziatura o uno stile",
      //"'%1' doesn't look like a color, a padding dimension, or a style",

/* begingroup */

    ExtraEndMissingBegin:
      "%1 extra oppure \\begingroup mancante",
      //"Extra %1 or missing \\begingroup", // NOTE:  do not translate \\begingroup

    GlobalNotFollowedBy:
      "%1 non seguito da \\let, \\def o \\newcommand",
      //"%1 not followed by \\let, \\def, or \\newcommand", // NOTE:  do not translate \\let, \\def, or \\newcommand; they are TeX commands

/* color */

    UndefinedColorModel:
      "Modello colore '%1' non definito",
      //"Color model '%1' not defined",

    ModelArg1:
      "I valori di colore per il modello %1 richiedono tre numeri",
      //"Color values for the %1 model require 3 numbers",

    InvalidDecimalNumber:
      "Numero decimale non valido",
      //"Invalid decimal number",

    ModelArg2:
      "I valori di colore per il modello %1 devono essere compresi tra %2 e %3",
      //"Color values for the %1 model must be between %2 and %3",

    InvalidNumber:
      "Numero non valido",
      //"Invalid number",

/* extpfeil */

    NewextarrowArg1:
      "Il primo argomento di %1 deve essere il nome di una sequenza di controllo",
      //"First argument to %1 must be a control sequence name",

    NewextarrowArg2:
      "Il secondo argomento di %1 devono essere due numeri separati da una virgola",
      //"Second argument to %1 must be two integers separated by a comma",

    NewextarrowArg3:
      "Il terzo argomento di %1 deve essere un codice di un carattere unicode",
      //"Third argument to %1 must be a unicode character number",

/* mhchem */

    NoClosingChar:
      "Impossibile trovare la parentesi di chiusura %1",
      //"Can't find closing %1", // NOTE: %1 will be ) or } or ]

/* newcommand */

    IllegalControlSequenceName:
      "Nome sequenza di controllo illegale per %1",
      //"Illegal control sequence name for %1",

    IllegalParamNumber:
      "Numero di parametri specificato in %1 illegale",
      //"Illegal number of parameters specified in %1",

    DoubleBackSlash:
      "\\ deve essere seguito da una sequenza di controllo",
      //"\\ must be followed by a control sequence",

    CantUseHash2:
      "Uso di # non consentito nel modello di %1",
      //"Illegal use of # in template for %1",

    SequentialParam:
      "I parametri per %1 devono essere numerati consecutivamente",
      //"Parameters for %1 must be numbered sequentially",

    MissingReplacementString:
      "Stringa di sostituzione per la definizione di %1 mancante",
      //"Missing replacement string for definition of %1",

    MismatchUseDef:
      "L'uso di %1 non combacia con la sua definizione",
      //"Use of %1 doesn't match its definition",

    RunawayArgument:
      "Perso un argomento per %1?",
      //"Runaway argument for %1?",

/* verb */

    NoClosingDelim:
      "Impossibile trovare delimitatore di chiusura per %1",
      //"Can't find closing delimiter for %1"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/it/TeX.js");
