/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/pl/FontWarnings.js
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

MathJax.Localization.addTranslation("pl","FontWarnings",{
  version: "2.2",
  isLoaded: true,
  strings: {

    webFont:
      "MathJax używa czcionek Web, aby wyświetlić wzory matematyczne " +
      "na tej stronie. Pobranie czcionek z sieci zajmuje chwilę. " +
      "Strona ta mogłaby załadować się szybciej, jesli zainstalowałbyś " +
      "czcionki lokalnie w swoim systemie.",

    imageFonts:
      "MathJax używa czcionek obrazkowych zamiast lokalnych lub pobranych z sieci. " +
      "To powoduje wolniejsze wyświetlanie strony oraz uniemożliwia wydruk w pełnej " +
      "rozdzielczości Twojej drukarki.",

    noFonts:
      "MathJax nie może zlokalizować czcionek potrzebnych do wyświetlenia wzorów, " +
      "a czcionki obrazkowe nie są dostępne. Używane są więc znaki Unicode z nadzieją, " +
      "że Twoja przeglądarka wyświeli je poprawnie. Niektóre znaki mogą jednak nie wyglądać " +
      "prawidłowo lub mogą nie być w ogóle wyświetlane.",

    webFonts:
      "Większość nowych przeglądarek umożliwia pobieranie czcionek z sieci Web. " +
      "Aktualizacja Twojej przeglądarki (lub wybór innej) może polepszyć jakość " +
      "wyświetlanych wzorów matematycznych na tej stronie.",

    fonts:
      "MathJax może użyc albo [czcionek STIX](%1) lub [czcionek MathJax Tex](%2). " +      
      "Pobierz i zainstaluj te czcionki, aby ulepszyć działanie MathJax.",

    STIXPage:
      "Ta strona wymaga [czcionek STIX](%1). " +
      "Pobierz i zainstaluj te czcionki, aby ulepszyć działanie MathJax.",

    TeXPage:
      "Ta strona wymaga [czcionek MathJax Tex](%1). " +
      "Pobierz i zainstaluj te czcionki, aby ulepszyć działanie MathJax.",

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/pl/FontWarnings.js");