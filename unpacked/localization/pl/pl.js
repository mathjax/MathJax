/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/pl/pl.js
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

MathJax.Localization.addTranslation("pl",null,{
  menuTitle: "Polski",
  version: "2.2",
  isLoaded: true,
  domains: {
    "_": {
      version: "2.2",
      isLoaded: true,
      strings: {

        CookieConfig:
          "MathJax znalazł konfigurację zapisaną w ciasteczku, która zawiera kod "+
          "do uruchomienia. Czy chcesz go uruchomić?\n\n"+
          "(Powinieneś nacisnąć Anuluj, jeśli to nie Ty stworzyłeś tę konfigurację.)",

        MathProcessingError:
          "Błąd podczas przetwarzania wzorów matematycznych",

        MathError:
          "Błąd we wzorze matematycznym",

        LoadFile:
          "Ładuję %1",

        Loading:
          "Ładuję",

        LoadFailed:
          "Nie udało się załadować pliku: %1",

        ProcessMath:
          "Przetwarzam wzory matematyczne: %1%%",

        Processing:
          "Przetwarzam",

        TypesetMath:
          "Przetwarzam wzory matematyczne: %1%%",

        Typesetting:
          "Przetwarzam",

        MathJaxNotSupported:
          "MathJax nie obsługuje Twojej przeglądarki"

      }
    },
    MathMenu: {},
    FontWarnings: {},
    HelpDialog: {},
    TeX: {},
    MathML: {},
    "HTML-CSS": {}
  },

  plural: function(n) {
    if (n == 1) {
      return 0;
    } else if (n % 10 >=2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      return 1;
    } else {
      return 2;
    }
  },

  number: function(n) {
    return String(n).replace(".", ","); // replace dot by comma
  }

});

MathJax.Ajax.loadComplete("[MathJax]/localization/pl/pl.js");
