/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/de/HelpDialog.js
 *
 *  Copyright (c) 2009-2013 The MathJax Consortium
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
        version: "2.3",
        isLoaded: true,
        strings: {
          Help: "MathJax Hilfe",
          MathJax: "*MathJax* ist eine JavaScript-Bibliothek, die Autoren erlaubt, Ihren Webseiten mathematische Inhalte hinzuzuf\u00FCgen. Als Besucher m\u00FCssen sie nichts zus\u00E4tzliches tun, damit MathJax funktioniert.",
          Browsers: "*Browser*: MathJax ist kompatibel zu allen modernen Webbrowsern inklusive IE6+, Firefox 3+, Chrome 0.2+, Safari 2+, Opera 9.6+ und g\u00E4ngigen mobilen Browsern.",
          Menu: "*Mathe Men\u00FC*: MathJax f\u00FCgt bei allen Formeln ein Kontextmen\u00FC hinzu. Es wird mit Rechtsklick oder STRG+Linksklick auf einer Formel aufgerufen.",
          ShowMath: "*Zeige Mathe als* erlaubt es, eine Formel im Quellformat anzuzeigen, um Kopieren und Einf\u00FCgen (als MathML oder im Originalformat) zu erm\u00F6glichen.",
          Settings: "*Einstellungen* erlaubt es, das Verhalten von MathJax zu modifizieren, so z.B. die Gr\u00F6\u00DFe der Mathematik sowie den Ausgabemechanismus.",
          Language: "*Sprache* erlaubt es, die Sprache zu wechseln, die MathJax  im Men\u00FC und den Warnmeldungen verwendent.",
          Zoom: "*Zoom*: Falls das Lesen der Formeln schwer f\u00E4llt, kann MathJax diese vergr\u00F6\u00DFern, um es zu erleichtern.",
          Accessibilty: "*Barrierfreiheit*: MathJax arbeite automatisch mit g\u00E4ngigen Screenreadern zusammen, um Mathematik barrierefrei darzustellen.",
          Fonts: "*Fonts*: MathJax benutzt gewisse mathematische Fonts, falls sie auf dem Systeminstalliert sind; ansonsten verwendet es Webfonts. Obwohl nicht notwendig, k\u00F6nnen installierte Fonts den Textsatz beschleunigen. Wir empfehlen, die [STIX fonts](%1) zu installieren."
        }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/de/HelpDialog.js");
