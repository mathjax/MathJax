/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/pl/MathML.js
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

MathJax.Localization.addTranslation("pl","MathML",{
  version: "2.2",
  isLoaded: true,
  strings: {

    BadMglyph:
      "Błąd w elemencie mglyph: %1",

    BadMglyphFont:
      "Błędna czcionka: %1",

    MathPlayer:
      "MathJax nie mógł uruchomić MathPlayer.\n\n" +
      "Jeśli MathPlayer nie jest zainstalowany, musisz go najpierw zainstalować.\n" +
      "W przeciwnym razie, twoje ustawienia bezpieczeństwa mogą blokować działanie\n" +
      "formantów ActiveX. W Opcjach internetowych, w menu Narzędzia wybierz zakładkę\n" +
      "Zabezpieczenia i naciśnij przycisk Poziom niestandardowy. Upewnij się, że ustawienia\n" +
      "dotyczące ActiveX oraz skryptów są włączone.\n\n" +
      "Do tego czasu będą wyświetlane błędy zamiast wzorów matematycznych.",

   CantCreateXMLParser:
      "MathJax nie może utworzyć parsera XML dla MathML. Upewnij się, że\n" +
      "opcja 'Wykonywanie skryptów formantów ActiveX' jest włączona\n" +
      "(sprawdź to w Opcjach internetowych w menu Narzędzia,\n" +
      "w zakładce Zabezpieczenia kliknij na przycisk Poziom niestandardowy).\n\n" +
      "Do tego czasu będą wyświetlane błędy zamiast wzorów matematycznych.",

   UnknownNodeType:
     "Nieznany typ elementu: %1",

   UnexpectedTextNode:
     "Nieoczekiwany element tekstowy: %1",

   ErrorParsingMathML:
     "Błąd podczas przetwarzania MathML",

   ParsingError:
     "Błąd podczas przetwarzania MathML: %1",

   MathMLSingleElement:
     "MathML musi być zamknięty w pojedynczym elemencie",

   MathMLRootElement:
     "MathML musi być zamknięty w elemencie <math>, a nie %1"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/pl/MathML.js");
