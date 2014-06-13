/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/sv/TeX.js
 *
 *  Copyright (c) 2009-2014 The MathJax Consortium
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

MathJax.Localization.addTranslation("sv","TeX",{
        version: "2.4.0",
        isLoaded: true,
        strings: {
          ExtraOpenMissingClose: "Extra v\u00E4nsterparentes eller h\u00F6gerparentes saknas",
          ExtraCloseMissingOpen: "Extra h\u00F6gerparentes eller v\u00E4nsterparentes saknas",
          MissingLeftExtraRight: "Saknar \\left eller en extra \\right",
          ExtraLeftMissingRight: "Extra \\left eller en \\right saknas",
          Misplaced: "Felplacerad %1",
          MissingOpenForSub: "Saknar v\u00E4nsterparentes f\u00F6r underskript",
          MissingOpenForSup: "Saknar v\u00E4nsterparentes f\u00F6r superskript",
          AmbiguousUseOf: "Tvetydig anv\u00E4ndning av %1",
          EnvBadEnd: "\\begin{%1} slutade med \\end{%2}",
          EnvMissingEnd: "Saknar \\end{%1}",
          MissingBoxFor: "Saknad l\u00E5da f\u00F6r %1",
          MissingCloseBrace: "H\u00F6gerparentes saknas",
          UndefinedControlSequence: "Odefinierad kontrollsekvens %1",
          DoubleExponent: "Dubbel exponent: anv\u00E4nd parenteser f\u00F6r att klarg\u00F6ra",
          DoubleSubscripts: "Dubbla underskript: anv\u00E4nd parenteser f\u00F6r att klarg\u00F6ra",
          MisplacedMiddle: "%1 m\u00E5ste vara inom \\left och \\right",
          MisplacedLimits: "%1 till\u00E5ts endast p\u00E5 operat\u00F6rer",
          MisplacedMoveRoot: "%1 kan endast visas inom en rot",
          MultipleCommand: "Flera %1",
          IntegerArg: "Argumentet till %1 m\u00E5ste vara ett heltal",
          NotMathMLToken: "%1 \u00E4r inte ett nyckelelement",
          InvalidMathMLAttr: "Ogiltig MathML-attribut: %1",
          UnknownAttrForElement: "%1 \u00E4r inte en igenk\u00E4nd attribut f\u00F6r %2",
          MissingArgFor: "Argument saknas f\u00F6r %1",
          InvalidEnv: "Ogiltigt milj\u00F6namn '%1'",
          UnknownEnv: "Ok\u00E4nd milj\u00F6 '%1'",
          ExtraCloseLooking: "Extra h\u00F6gerparentes n\u00E4r %1 s\u00F6ktes",
          MissingCloseBracket: "Kunde inte hitta avslutande ']' f\u00F6r argumentet till %1",
          TokenNotFoundForCommand: "Kunde inte hitta %1 f\u00F6r %2",
          CommandNotAllowedInEnv: "%1 till\u00E5ts inte i milj\u00F6n %2",
          MultipleLabel: "Etiketten '%1' definierades flera g\u00E5nger",
          CommandAtTheBeginingOfLine: "%1 m\u00E5ste vara i b\u00F6rjan p\u00E5 raden",
          IllegalAlign: "Ogiltig justering anges i %1",
          MultipleBBoxProperty: "%1 anges tv\u00E5 g\u00E5nger i %2",
          ExtraEndMissingBegin: "Extra %1 eller en \\begingroup saknas",
          GlobalNotFollowedBy: "%1 f\u00F6ljs inte \u00E5t av \\let, \\def eller \\newcommand",
          UndefinedColorModel: "F\u00E4rgmodellen '%1' \u00E4r inte definierad",
          InvalidDecimalNumber: "Ogiltig decimaltal",
          InvalidNumber: "Ogiltigt nummer",
          NoClosingChar: "Kan inte hitta avslutande %1",
          IllegalControlSequenceName: "Ogiltigt kontrollsekvensnamn f\u00F6r %1",
          IllegalParamNumber: "Ogiltigt antal parenteser anges i %1"
        }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/sv/TeX.js");
