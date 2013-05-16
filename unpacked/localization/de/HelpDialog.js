/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/de/HelpDialog.js
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

MathJax.Localization.addTranslation("de","HelpDialog",{
  version: "2.2",
  isLoaded: true,
  strings: {

    Help:
      "MathJax Hilfe",
//    "MathJax Help",

    MathJax: 
      "*MathJax* ist eine JavaScript-Bibliothek, die Autoren erlaubt, " +
      "Ihren Webseiten mathematische Inhalte hinzuzuf\u00FCgen. Als Besucher " +
      "m\u00FCssen sie nichts zus\u00E4tzliches tun, damit MathJax funktioniert.",
//    "*MathJax* is a JavaScript library that allows page authors to include " +
//    "mathematics within their web pages.  As a reader, you don't need to do " +
//    "anything to make that happen.",

    Browsers:
      "*Browser*: MathJax ist kompatibel zu allen modernen Webbrowsern inklusive " +
      "IE6+, Firefox 3+, Chrome 0.2+, Safari 2+, Opera 9.6+ und g\u00E4ngigen mobilen Browsern.",
//    "*Browsers*: MathJax works with all modern browsers including IE6+, Firefox 3+, " +
//    "Chrome 0.2+, Safari 2+, Opera 9.6+ and most mobile browsers.",

    Menu:
      "*Mathe Men\u00FC*: MathJax f\u00FCgt ein Kontextmen\u00FC bei allen Formeln hinzu. " +
      "Es wird mit Rechtsklick oder STRG+Linksklick auf einer Formel aufgerufen.",
//    "*Math Menu*: MathJax adds a contextual menu to equations.  Right-click or " +
//    "CTRL-click on any mathematics to access the menu.",

    ShowMath:
      "*Zeige Mathe als* erlaubt es, eine Formel im Quellformat anzuzeigen, " + //NOTE needs to match menu item translations!
      "um Kopieren und Einf\u00FCgen (als MathML oder im Originalformat) zu erm00F6glichen.",
//    "*Show Math As* allows you to view the formula's source markup " + 
//    "for copy & paste (as MathML or in its origianl format).",

    Settings:
      "*Einstellungen* erlabut es, das Verhalten von MathJax zu modifizieren, " + //NOTE needs to match menu item translations!
      "so z.B. die Gr\u00F6\u00DFe der Mathematik sowie den Ausgabemechanismus.",
//    "*Settings* gives you control over features of MathJax, such as the " +
//    "size of the mathematics, and the mechanism used to display equations.",

    Language:
      "*Sprache* erlaubt es, die Sprache zu wechseln, die MathJax  im Men\u00FC " + //NOTE needs to match menu item translations!
      "und den Warnmeldungen verwendent.",
//    "*Language* lets you select the language used by MathJax for its menus " +
//    "and warning messages.",

    Zoom:
      "*Zoom*: Falls das Lesen der Formeln schwer f\u00E4llt, kann MathJax diese " + //NOTE needs to match menu item translations!
      "vergr\u00F6\u00DFern, um es zu erleichtern.",
//    "*Math Zoom*: If you are having difficulty reading an equation, MathJax can " +
//    "enlarge it to help you see it better.",

    Accessibilty:
      "*Barrierfreiheit*: MathJax arbeite automatisch mit g\u00E4ngigen Screenreadern " +
      "zusammen, um Mathematik barrierefrei darzustellen.",
//    "*Accessibility*: MathJax will automatically work with screen readers to make " +
//    "mathematics accessible to the visually impaired.",

    Fonts:
      "*Fonts*: MathJax benutzt gewisse mathematische Fonts, falls sie auf dem System" +
      "installiert sind; ansonsten verwendet es Webfonts. Obwohl nicht notwendig, " +
      "k\u00F6nnen installierte Fonts den Textsatz beschleunigen. Wir empfehlen, " +
      "die [STIX fonts](%1) zu installieren."
//    "*Fonts*: MathJax will use certain math fonts if they are installed on your " +
//    "computer; otherwise, it will use web-based fonts.  Although not required, " +
//    "locally installed fonts will speed up typesetting.  We suggest installing " +
//    "the [STIX fonts](%1)."

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/de/HelpDialog.js");
