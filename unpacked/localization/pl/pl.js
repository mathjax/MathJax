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

MathJax.Localization.addTranslation("pl",null,{ // NOTE use correct ISO-639-1 two letter code http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
  menuTitle: "Polski", // NOTE language name; will appear in the MathJax submenu for switching locales
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
          "(Powinienieś nacisnąć Anuluj, jeśli to nie Ty stworzyłeś tę konfigurację.)",

        MathProcessingError:
          "Błąd podczas przetwarzania wzorów matematycznych", // NOTE: MathJax uses 'Math' as a distinct UI choice. Please translate it literally whenever possible.

        MathError:
          "Błąd we wzorze matematycznym", // Error message used in obsolete Accessible configurations

        LoadFile:
          "Ładuję %1",

        Loading:
          "Ładuję", // NOTE: followed by growing sequence of dots

        LoadFailed:
          "Nie udało się załadować pliku: %1",

        ProcessMath:
          "Przetwarzam wzory matematyczne: %1%%", // NOTE: appears during the conversion process from an input format (e.g., LaTeX, asciimath) to MathJax's internal format

        Processing:
          "Przetwarzam", // NOTE: followed by growing sequence of dots

        TypesetMath:
          "Przetwarzam wzory matematyczne: %1%%", // NOTE: appears during the layout process of converting the internal format to the output format

        Typesetting:
          "Przetwarzam", // NOTE: followed by growing sequence of dots

        MathJaxNotSupported:
          "Twoja przeglądarka nie obsługuje MathJax" // NOTE: will load when MathJax determines the browser does not have adequate features

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
    if (n === 1) {return 1} // one
    return 2; // other
  },

  number: function(n) {
    return String(n).replace(".", ","); // replace dot by comma
    return n;
  }

});

MathJax.Ajax.loadComplete("[MathJax]/localization/pl/pl.js");
