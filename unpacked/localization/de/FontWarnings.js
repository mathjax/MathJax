/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/de/FontWarnings.js
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

MathJax.Localization.addTranslation("de","FontWarnings",{
  version: "2.2",
  isLoaded: true,
  strings: {

    webFont:
      "MathJax nutz web-basierte Fonts zur Darstellung der Mathematik " +
      "auf dieser Seite. Da diese heruntergeladen werden m\u00FCssen, " +
      "l\u00E4dt die Seite schneller, wenn Mathe-Fonts auf dem System installiert sind.",
//    "MathJax is using web-based fonts to display the mathematics "+
//    "on this page.  These take time to download, so the page would "+
//    "render faster if you installed math fonts directly in your "+
//    "system's font folder.",

    imageFonts:
      "MathJax nutzt Bild-Fonts stall lokaler Fonts oder Webfonts. " +
      "Das Laden dauert l\u00E4nger als erwartet und Drucken wird " + // translated "expected" rather than "usual"
      "evtl. nicht in bester Qualit\u00E4t m\u00F6glich sein.", // translated 'best quality' rather than 'full resolution'
//    "MathJax is using its image fonts rather than local or web-based fonts. "+
//    "This will render slower than usual, and the mathematics may not print "+
//    "at the full resolution of your printer.",

    noFonts:
      "MathJax kann keinen Font zur Darstellung der Mathematik finden "+
      "und Bild-Fonts sind nicht verf\u00FCgbar. MathJax weicht auf generische "+
      "Unicode-Zeichen aus in der Hoffnung, der Browser kann diese darstellen. "+
      "Einige oder alle Zeichen k\u00F6nnten nicht korrekt dargestellt werden.",
//    "MathJax is unable to locate a font to use to display "+
//    "its mathematics, and image fonts are not available, so it "+
//    "is falling back on generic unicode characters in hopes that "+
//    "your browser will be able to display them.  Some characters "+
//    "may not show up properly, or possibly not at all.",

    webFonts:
      "Die meisten modernen Browser k\u00F6nnen Fonts aus dem Web laden. "+
      "Um die Qualit\u00E4t der Mathematik auf dieser Seite zu verbessern, "+
      "sollten Sie ein Update auf eine aktuelle Version des Browsers vornehmen "+
      "(oder einen aktuellen Browser installieren).",
//    "Most modern browsers allow for fonts to be downloaded over the web. "+
//    "Updating to a more recent version of your browser (or changing "+
//    "browsers) could improve the quality of the mathematics on this page.",

    fonts:
      "MathJax kann [STIX Fonts](%1) oder [MathJax TeX Fonts](%2) verwenden. "+
      "Herunterladen und installieren dieser Fonts wird Ihre MathJax-Erfahrung verbessern.", 
//    "MathJax can use either the [STIX Fonts](%1) or the [MathJax TeX fonts](%2).  " +
//    "Download and install one of those fonts to improve your MathJax experience.",

    STIXPage:
      "Diese Seite ist optimiert fuer [STIX Fonts](%1). " +
      "Herunterladen und installieren dieser Fonts wird Ihre MathJax-Erfahrung verbessern.", 
//    "This page is designed to use the %1.  " +
//    "Download and install those fonts to improve your MathJax experience.",

    TeXPage:
      "Diese Seite ist optimiert fuer [MathJax TeX Fonts](%1). " +
      "Herunterladen und installieren dieser Fonts wird Ihre MathJax-Erfahrung verbessern." 
//    "This page is designed to use the %1.  " +
//    "Download and install those fonts to improve your MathJax experience."

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/de/FontWarnings.js");
