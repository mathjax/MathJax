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
      "Loading web-font %1", // NOTE: %1 is the name of a webfont file

    CantLoadWebFont:
      "Can't load web font %1",

    FirefoxCantLoadWebFont:
      "Firefox can't load web fonts from a remote host",

    CantFindFontUsing:
      "Can't find a valid font using %1", // Note: %1 is a list of font names

    WebFontsNotAvailable:
      "Web-Fonts not available -- using image fonts instead"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/pl/HTML-CSS.js");
