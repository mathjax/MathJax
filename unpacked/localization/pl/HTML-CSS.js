/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/pl/HTML-CSS.js
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

MathJax.Localization.addTranslation("pl","HTML-CSS",{
  version: "2.2",
  isLoaded: true,
  strings: {

    LoadWebFont:
      "Ładuję czcionkę %1", // NOTE: %1 is the name of a webfont file

    CantLoadWebFont:
      "Nie mogę załadować czcionki %1",

    FirefoxCantLoadWebFont:
      "Firefox nie potrafi załadować czcionki ze zdalnego komputera",

    CantFindFontUsing:
      "Nie mogę znaleźć prawidłowej czcionki używając %1", // Note: %1 is a list of font names

    WebFontsNotAvailable:
      "Czcionki Web nie są dostępne -- używam czcionek obrazkowych"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/pl/HTML-CSS.js");
