/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/fr/HTML-CSS.js
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

MathJax.Localization.addTranslation("fr","HTML-CSS",{
  version: "2.2",
  isLoaded: true,
  strings: {

    LoadWebFont:
      "T\u00E9l\u00E9chargement de la police Web %1",

    CantLoadWebFont:
      "Impossible de t\u00E9l\u00E9charger la police Web %1",

    FirefoxCantLoadWebFont:
      "Firefox ne peut t\u00E9l\u00E9charger les polices Web \u00E0 partir d'un h\u00F4te "+
      "distant",

    CantFindFontUsing:
      "Impossible de trouver une police valide en utilisant %1",

    WebFontsNotAvailable:
      "Polices Web non disponibles -- des images de caract\u00E8res vont \u00EAtre "+
      "utilis\u00E9es \u00E0 la place"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/fr/HTML-CSS.js");
