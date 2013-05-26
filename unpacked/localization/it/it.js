/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/it/it.js
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

MathJax.Localization.addTranslation("it",null,{ // NOTE use correct ISO-639-1 two letter code http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
  menuTitle: "Italiano", // NOTE language name; will appear in the MathJax submenu for switching locales
  version: "2.2",
  isLoaded: true,
  domains: {
    "_": {
      version: "2.2",
      isLoaded: true,
      strings: {

        CookieConfig:
          "MathJax ha trovato un cookie di configurazione utente che include del "+
          "codice eseguibile. Vuoi eseguirlo?\n\n"+
          "(Premi Annulla a meno che non l'abbia effettivamente impostato tu.)",
          //"MathJax has found a user-configuration cookie that includes code to "+
          //"be run. Do you want to run it?\n\n"+
          //"(You should press Cancel unless you set up the cookie yourself.)",

        MathProcessingError:
          "Errore elaborazione della formula",
          //"Math Processing Error", // NOTE: MathJax uses 'Math' as a distinct UI choice. Please translate it literally whenever possible.

        MathError:
          "Errore nella formula"
          //"Math Error", // Error message used in obsolete Accessible configurations

        LoadFile:
          "Caricamento %1",
          //"Loading %1",

        Loading:
          "Caricamento",
          //"Loading", // NOTE: followed by growing sequence of dots

        LoadFailed:
          "Caricamento del file fallito: %1",
          //"File failed to load: %1",

        ProcessMath:
          "Elaborazione formula: %1%%",
          //"Processing Math: %1%%", // NOTE: appears during the conversion process from an input format (e.g., LaTeX, asciimath) to MathJax's internal format

        Processing:
          "Elaborazione in corso",
          //"Processing", // NOTE: followed by growing sequence of dots

        TypesetMath:
          "Composizione della formula: %1%%",
          //"Typesetting Math: %1%%", // NOTE: appears during the layout process of converting the internal format to the output format

        Typesetting:
          "Composizione",
          //"Typesetting", // NOTE: followed by growing sequence of dots

        MathJaxNotSupported:
          "Il tuo browser non supporta MathJax"
          //"Your browser does not support MathJax" // NOTE: will load when MathJax determines the browser does not have adequate features

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
//    return String(n).replace(".", ","); // replace dot by comma
    return n;
  }

});

MathJax.Ajax.loadComplete("[MathJax]/localization/it/it.js");
