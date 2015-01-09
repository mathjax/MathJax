/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/ru/TeX.js
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

MathJax.Localization.addTranslation("ru","TeX",{
        version: "2.5.0-beta",
        isLoaded: true,
        strings: {
          ExtraOpenMissingClose: "\u041B\u0438\u0448\u043D\u044F\u044F \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u044E\u0449\u0430\u044F \u0441\u043A\u043E\u0431\u043A\u0430 \u0438\u043B\u0438 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0430\u044F \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u044E\u0449\u0430\u044F \u0441\u043A\u043E\u0431\u043A\u0430",
          ExtraCloseMissingOpen: "\u041B\u0438\u0448\u043D\u044F\u044F \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u044E\u0449\u0430\u044F \u0441\u043A\u043E\u0431\u043A\u0430 \u0438\u043B\u0438 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0430\u044F \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u044E\u0449\u0430\u044F \u0441\u043A\u043E\u0431\u043A\u0430",
          MissingLeftExtraRight: "\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \\left \u0438\u043B\u0438 \u043B\u0438\u0448\u043D\u0438\u0439 \\right",
          MissingScript: "\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u043D\u0430\u0434\u0441\u0442\u0440\u043E\u0447\u043D\u044B\u0439 \u0438\u043B\u0438 \u043F\u043E\u0434\u0441\u0442\u0440\u043E\u0447\u043D\u044B\u0439 \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442",
          ExtraLeftMissingRight: "\u041B\u0438\u0448\u043D\u0438\u0439 \\left \u0438\u043B\u0438 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \\right",
          Misplaced: "%1 \u043D\u0435\u00A0\u043D\u0430\u00A0\u043C\u0435\u0441\u0442\u0435",
          MissingOpenForSub: "\u041D\u0435\u0442\u00A0\u043E\u0442\u043A\u0440\u044B\u0432\u0430\u044E\u0449\u0435\u0439 \u0441\u043A\u043E\u0431\u043A\u0438 \u0432\u00A0\u043D\u0438\u0436\u043D\u0435\u043C \u0438\u043D\u0434\u0435\u043A\u0441\u0435",
          MissingOpenForSup: "\u041D\u0435\u0442\u00A0\u043E\u0442\u043A\u0440\u044B\u0432\u0430\u044E\u0449\u0435\u0439 \u0441\u043A\u043E\u0431\u043A\u0438 \u0432\u00A0\u043D\u0438\u0436\u043D\u0435\u043C \u0438\u043D\u0434\u0435\u043A\u0441\u0435",
          AmbiguousUseOf: "\u041D\u0435\u043E\u0434\u043D\u043E\u0437\u043D\u0430\u0447\u043D\u043E\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 %1",
          EnvBadEnd: "\\begin{%1} \u0437\u0430\u043A\u0440\u044B\u0442\u043E \u0441\u00A0\u043F\u043E\u043C\u043E\u0449\u044C\u044E \\end{%2}",
          EnvMissingEnd: "\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D \\end{%1}",
          MissingBoxFor: "\u0423\u00A0%1 \u043D\u0435\u0442 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0433\u043E",
          MissingCloseBrace: "\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u044E\u0449\u0430\u044F \u0441\u043A\u043E\u0431\u043A\u0430",
          UndefinedControlSequence: "\u041D\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0451\u043D\u043D\u0430\u044F \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u044E\u0449\u0430\u044F \u043F\u043E\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C %1",
          DoubleExponent: "\u0414\u0432\u043E\u0439\u043D\u0430\u044F \u044D\u043A\u0441\u043F\u043E\u043D\u0435\u043D\u0442\u0430: \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0441\u043A\u043E\u0431\u043A\u0438 \u0434\u043B\u044F \u0443\u0442\u043E\u0447\u043D\u0435\u043D\u0438\u044F",
          DoubleSubscripts: "\u0414\u0432\u0430 \u043D\u0438\u0436\u043D\u0438\u0445 \u0438\u043D\u0434\u0435\u043A\u0441\u0430 \u043F\u043E\u0434\u0440\u044F\u0434: \u043F\u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0444\u0438\u0433\u0443\u0440\u043D\u044B\u0435 \u0441\u043A\u043E\u0431\u043A\u0438",
          DoubleExponentPrime: "\u0428\u0442\u0440\u0438\u0445 \u043F\u043E\u0441\u043B\u0435\u00A0\u0432\u0435\u0440\u0445\u043D\u0435\u0433\u043E \u0438\u043D\u0434\u0435\u043A\u0441\u0430: \u0443\u0442\u043E\u0447\u043D\u0438\u0442\u0435, \u043A\u00A0\u0447\u0435\u043C\u0443 \u043E\u043D \u043E\u0442\u043D\u043E\u0441\u0438\u0442\u0441\u044F, \u0444\u0438\u0433\u0443\u0440\u043D\u044B\u043C\u0438 \u0441\u043A\u043E\u0431\u043A\u0430\u043C\u0438",
          CantUseHash1: "\u0412\u00A0\u0440\u0435\u0436\u0438\u043C\u0435 \u00ABmath\u00BB \u043D\u0435\u043B\u044C\u0437\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u0438\u043C\u0432\u043E\u043B \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0430 \u043C\u0430\u043A\u0440\u043E\u0441\u0430 #",
          MisplacedMiddle: "%1 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u043D\u0443\u0442\u0440\u0438 \\left \u0438\u00A0\\right",
          MisplacedLimits: "%1 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u00A0\u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430\u043C\u0438",
          MisplacedMoveRoot: "%1 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u00A0\u043A\u043E\u0440\u043D\u044F\u0445",
          MultipleCommand: "\u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E %1",
          IntegerArg: "\u0410\u0440\u0433\u0443\u043C\u0435\u043D\u0442 \u0434\u043B\u044F %1 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0446\u0435\u043B\u044B\u043C \u0447\u0438\u0441\u043B\u043E\u043C",
          NotMathMLToken: "%1\u00A0\u2014 \u043D\u0435\u00A0\u0441\u0438\u043C\u0432\u043E\u043B MML",
          InvalidMathMLAttr: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0430\u0442\u0440\u0438\u0431\u0443\u0442 MathML: %1",
          UnknownAttrForElement: "%1\u00A0\u2014 \u043D\u0435\u00A0\u0430\u0442\u0440\u0438\u0431\u0443\u0442 \u0442\u0435\u0433\u0430 MML %2",
          MaxMacroSub1: "\u041F\u0440\u0435\u0432\u044B\u0448\u0435\u043D\u043E \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0447\u0438\u0441\u043B\u043E \u043F\u043E\u0434\u0441\u0442\u0430\u043D\u043E\u0432\u043E\u043A \u043C\u0430\u043A\u0440\u043E\u0441\u0430: \u043D\u0435\u00A0\u0440\u0435\u043A\u0443\u0440\u0441\u0438\u044F\u00A0\u043B\u0438 \u044D\u0442\u043E?",
          MaxMacroSub2: "\u041F\u0440\u0435\u0432\u044B\u0448\u0435\u043D\u043E \u043F\u0440\u0435\u0434\u0435\u043B\u044C\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E \u043F\u043E\u0434\u0441\u0442\u0430\u043D\u043E\u0432\u043E\u043A MathJax. \u041D\u0435\u0442\u00A0\u043B\u0438 \u0440\u0435\u043A\u0443\u0440\u0441\u0438\u0438 \u0432\u00A0\u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u0438 LaTeX?",
          MissingArgFor: "\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442 \u0434\u043B\u044F %1",
          ExtraAlignTab: "\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u043D\u043E\u0433\u043E \u0441\u0442\u043E\u043B\u0431\u0446\u043E\u0432 \u0432\u00A0\\cases",
          BracketMustBeDimension: "\u0420\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C (?) %1 \u043D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C",
          InvalidEnv: "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F \u00AB%1\u00BB",
          UnknownEnv: "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E\u0435 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u0435 \u00AB%1\u00BB",
          ExtraCloseLooking: "\u041B\u0438\u0448\u043D\u044F\u044F \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u044E\u0449\u0430\u044F \u0441\u043A\u043E\u0431\u043A\u0430, \u043A\u043E\u0433\u0434\u0430 \u043E\u0436\u0438\u0434\u0430\u043B\u0430\u0441\u044C %1",
          MissingCloseBracket: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043D\u0430\u0439\u0442\u0438 \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u044E\u0449\u0443\u044E ']' \u0434\u043B\u044F \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u0430 \u043A %1",
          MissingOrUnrecognizedDelim: "\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u043B\u0438 \u043D\u0435 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D \u0440\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u0434\u043B\u044F %1",
          MissingDimOrUnits: "\u041D\u0435\u0442\u00A0\u0435\u0434\u0438\u043D\u0438\u0446\u044B \u0438\u0437\u043C\u0435\u0440\u0435\u043D\u0438\u044F \u0432\u00A0%1",
          TokenNotFoundForCommand: "\u041D\u0435 \u0443\u0434\u0430\u0451\u0442\u0441\u044F \u043D\u0430\u0439\u0442\u0438 %1 \u0434\u043B\u044F %2",
          MathNotTerminated: "\u041D\u0435\u0437\u0430\u043A\u0440\u044B\u0442\u0430\u044F \u0444\u043E\u0440\u043C\u0443\u043B\u0430 \u0432\u00A0\\text{}",
          IllegalMacroParam: "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430\u00A0\u043D\u0435\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u043C\u0430\u043A\u0440\u043E\u0441\u0430",
          MaxBufferSize: "\u0418\u0441\u0447\u0435\u0440\u043F\u0430\u043D \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0439 \u0431\u0443\u0444\u0435\u0440 MathJax: \u043D\u0435\u0442\u00A0\u043B\u0438 \u0440\u0435\u043A\u0443\u0440\u0441\u0438\u0432\u043D\u043E\u0433\u043E \u043C\u0430\u043A\u0440\u043E\u0441\u0430?",
          CommandNotAllowedInEnv: "%1 \u043D\u0435\u00A0\u043F\u043E\u0437\u0432\u043E\u043B\u0435\u043D \u0432\u00A0\u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u0438 %2",
          MultipleLabel: "\u041C\u0435\u0442\u043A\u0430 \u00AB%1\u00BB \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0440\u0430\u0437",
          CommandAtTheBeginingOfLine: "%1 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0432\u00A0\u043D\u0430\u0447\u0430\u043B\u0435 \u0441\u0442\u0440\u043E\u043A\u0438",
          IllegalAlign: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0432\u044B\u0440\u0430\u0432\u043D\u0438\u0432\u0430\u043D\u0438\u0435 \u0432\u00A0%1",
          BadMathStyleFor: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0441\u0442\u0438\u043B\u044C \u0434\u043B\u044F\u00A0%1",
          PositiveIntegerArg: "\u0410\u0440\u0433\u0443\u043C\u0435\u043D\u0442 %1 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u044B\u043C \u0447\u0438\u0441\u043B\u043E\u043C",
          ErroneousNestingEq: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0432\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440",
          MultlineRowsOneCol: "\u0412 \u0441\u0442\u0440\u043E\u043A\u0430\u0445 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F %1 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043F\u043E\u00A0\u043E\u0434\u043D\u043E\u043C\u0443 \u0441\u0442\u043E\u043B\u0431\u0446\u0443",
          MultipleBBoxProperty: "%1 \u0443\u043A\u0430\u0437\u0430\u043D\u043E \u0434\u0432\u0430\u0436\u0434\u044B \u0432 %2",
          InvalidBBoxProperty: "'%1'\u00A0\u2014 \u043D\u0435\u00A0\u0446\u0432\u0435\u0442, \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0439 \u043E\u0442\u0441\u0442\u0443\u043F \u0438\u043B\u0438\u00A0\u0441\u0442\u0438\u043B\u044C",
          ExtraEndMissingBegin: "\u041B\u0438\u0448\u043D\u0435\u0435 %1 \u0438\u043B\u0438\u00A0\u043F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u043E \\begingroup",
          GlobalNotFollowedBy: "\u041F\u043E\u0441\u043B\u0435 %1 \u043D\u0435\u0442 \\let, \\def \u0438\u043B\u0438\u00A0\\newcommand",
          UndefinedColorModel: "\u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043C\u043E\u0434\u0435\u043B\u044C \u00AB%1\u00BB \u043D\u0435\u00A0\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0430",
          ModelArg1: "\u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043C\u043E\u0434\u0435\u043B\u044C %1 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u0442\u0440\u0451\u0445\u00A0\u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432",
          InvalidDecimalNumber: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0434\u0435\u0441\u044F\u0442\u0438\u0447\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E",
          ModelArg2: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432 \u0446\u0432\u0435\u0442\u0430 \u0432\u00A0\u043C\u043E\u0434\u0435\u043B\u0438 %1 \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u043C\u0435\u0436\u0434\u0443 %2 \u0438 %3",
          InvalidNumber: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0447\u0438\u0441\u043B\u043E",
          NewextarrowArg1: "\u041F\u0435\u0440\u0432\u044B\u043C \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u043E\u043C %1 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0430\u0431\u043E\u0440 \u043A\u043E\u043C\u0430\u043D\u0434",
          NewextarrowArg2: "\u0412\u0442\u043E\u0440\u044B\u043C \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u043E\u043C %1 \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u043F\u0430\u0440\u0430 \u0446\u0435\u043B\u044B\u0445 \u0447\u0438\u0441\u0435\u043B, \u0440\u0430\u0437\u0434\u0435\u043B\u0451\u043D\u043D\u0430\u044F \u0437\u0430\u043F\u044F\u0442\u043E\u0439",
          NewextarrowArg3: "\u0422\u0440\u0435\u0442\u044C\u0438\u043C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u043C %1 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043A\u043E\u0434 \u0441\u0438\u043C\u0432\u043E\u043B\u0430 \u042E\u043D\u0438\u043A\u043E\u0434",
          NoClosingChar: "\u041D\u0435 \u0443\u0434\u0430\u0451\u0442\u0441\u044F \u043D\u0430\u0439\u0442\u0438 \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u044E\u0449\u0438\u0439 \u0441\u0438\u043C\u0432\u043E\u043B %1",
          IllegalControlSequenceName: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u044B %1",
          IllegalParamNumber: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0447\u0438\u0441\u043B\u043E \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u0432 %1",
          MissingCS: "\u041F\u043E\u0441\u043B\u0435 %1 \u0434\u043E\u043B\u0436\u043D\u044B \u0438\u0434\u0442\u0438 \u043A\u043E\u043C\u0430\u043D\u0434\u044B",
          CantUseHash2: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 # \u0432\u00A0\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0438 %1",
          SequentialParam: "\u041D\u043E\u043C\u0435\u0440\u0430 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u0432 %1 \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C\u00A0\u043F\u043E\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u044B",
          MissingReplacementString: "\u041D\u0435\u0442\u00A0\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u044F %1",
          MismatchUseDef: "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u0432\u044B\u0437\u043E\u0432 %1",
          RunawayArgument: "\u0412\u00A0\u0432\u044B\u0437\u043E\u0432\u0435 %1 \u043F\u0440\u043E\u043F\u0443\u0449\u0435\u043D \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440?",
          NoClosingDelim: "%1 \u043D\u0435 \u0437\u0430\u043A\u0440\u044B\u0442\u043E"
        }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/ru/TeX.js");
