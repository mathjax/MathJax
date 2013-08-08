/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/de/MathML.js
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

MathJax.Localization.addTranslation("de","MathML",{
        version: "2.2",
        isLoaded: true,
        strings: {
          BadMglyph: "Schlechter mglyph: %1",
          BadMglyphFont: "Schlechter Font: %1",
          MathPlayer: "MathJax konnnte MathPlayer nicht einrichten.\n\nFalls MathPlayer nicht installiert ist,  muss es erst installiert werden.\nEventuell blockieren die Sicherheitsoptionen ActiveX; \u00FCberpr\u00FCfen Sie unter \n'Internetoptionen' -> 'Sicherheit' -> 'Stufe Anpassen',\nob ActiveX aktiviert ist.\n\nBei der jetzigen Konfiguration wird MathJax nur Fehlermeldungen anzeigen.",
          CantCreateXMLParser: "MathJax kann keinen XML-Parser f\u00FCr MathML erzeugen. \u00DCberpr\u00FCfen Sie die Einstellungen unter\n'Internetoptionen'-> 'Werkzeuge' -> 'Sicherheit' -> 'Stufe Anpassen'\nund aktivieren sie ActiveX.\n\nMathJax kann sonst kein MathML verarbeiten.",
          UnknownNodeType: "Unbekannter Knotentyp: %1",
          UnexpectedTextNode: "Unbekannter Textknoten: %1",
          ErrorParsingMathML: "Fehler beim Parsen von MathML",
          ParsingError: "Fehler beim Parsen von MathML: %1",
          MathMLSingleElement: "MathML muss ein einzelnes <math> Element sein",
          MathMLRootElement: "MathML muss ein einzelnes <math> Element sein, nicht %1"
        }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/de/MathML.js");
