/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/de/de.js
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

MathJax.Localization.addTranslation("de",null,{
  menuTitle: "Deutsch",
  version: "2.2",
  isLoaded: true,
  domains: {
    "_": {
      isLoaded: true,
      version: "2.2",
      strings: {

        CookieConfig:
          "MathJax hat eine Cookie mit ausf\u00FChrbaren Code gefunden. " +
          "Soll dieser Code ausgef\u00FChrt werden?\n\n" +
          "(Klicken Sie 'Abbrechen' falls Sie das Cookie nicht selber akzeptiert haben.)",
//        "MathJax has found a user-configuration cookie that includes code to " +
//        "be run. Do you want to run it?\n\n" +
//        "(You should press Cancel unless you set up the cookie yourself.)",

        MathProcessingError:
          "Mathe Verarbeitungsfehler",
//        "Math Processing Error",

        MathError:
          "Mathe Fehler",
//        "Math Error",

        LoadFile:
          "Lade %1",
//        "Loading %1",

        Loading:
          "Laden", //TODO could also be "Lade" 
//        "Loading", 

        LoadFailed:
          "Datei konnte nicht geladen werden: %1",
//        "File failed to load: %1",

        ProcessMath:
          "Mathe Verarbeitung: %1%%",
//        "Processing Math: %1%%",

        Processing:
          "Verarbeiten",
//        "Processing", 

        TypesetMath:
          "Mathe wird gesetzt: %1%%",
//        "Typesetting Math: %1%%",

        Typesetting:
          "Setzen",
//        "Typesetting", 

        MathJaxNotSupported:
          "Ihr Webbrowser unterst\u00FCtzt MathJax nicht"
//        "Your browser does not support MathJax"

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
  }

});

MathJax.Ajax.loadComplete("[MathJax]/localization/de/de.js");
