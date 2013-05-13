/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/de/MathML.js
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

MathJax.Localization.addTranslation("de","MathML",{
  version: "2.2",
  isLoaded: true,
  strings: {

    BadMglyph:
      "Schlechter mglpyh: %1",
//    "Bad mglyph: %1",

    BadMglyphFont:
      "Schlechter Font: %1",
//    "Bad font: %1",

    MathPlayer: //TODO check names of German Windows settings http://support.microsoft.com/
      "MathJax konnnte MathPlayer nicht einrichten.\n\n"+
      "Falls MathPlayer nicht installiert ist,  muss es erst installiert werden.\n"+
      "Eventuell blockieren die Sicherheitsoptionen ActiveX; \u00FCberpr\u00FCfen Sie\n"+
      "unter 'Internetoptionen' -> 'Sicherheit' -> 'Stufe Anpassen',\n"+
      "ob ActiveX aktiviert ist.\n\n"+
      "Bei der jetzigen Konfiguration wird MathJax nur Fehlermeldungen anzeigen.",
//    "MathJax was not able to set up MathPlayer.\n\n"+
//    "If MathPlayer is not installed, you need to install it first.\n"+
//    "Otherwise, your security settings may be preventing ActiveX     \n"+
//    "controls from running.  Use the Internet Options item under\n"+
//    "the Tools menu and select the Security tab, then press the\n"+
//    "Custom Level button. Check that the settings for\n"+
//    "'Run ActiveX Controls', and 'Binary and script behaviors'\n"+
//    "are enabled.\n\n"+
//    "Currently you will see error messages rather than\n"+
//    "typeset mathematics.",

   CantCreateXMLParser://TODO check name of German Windows settings
         "MathJax kann keinen XML-Parser f\u00FC r MathML erzeugen. "+
	 "\u00DC berpr\u00FC fen Sie die Einstellungen unter\n"+
	 "'Internetoptionen'-> 'Werkzeuge' -> 'Sicherheit' -> 'Stufe Anpassen'\n"+
	 "und aktivieren sie ActiveX.\n\n"+
	 "MathJax kann sonst kein MathML verarbeiten.",
//       "MathJax can't create an XML parser for MathML.  Check that\n"+
//       "the 'Script ActiveX controls marked safe for scripting' security\n"+
//       "setting is enabled (use the Internet Options item in the Tools\n"+
//       "menu, and select the Security panel, then press the Custom Level\n"+
//       "button to check this).\n\n"+
//       "MathML equations will not be able to be processed by MathJax.",

   UnknownNodeType:
     "Unbekannter Knotentyp: %1",
//   "Unknown node type: %1",

   UnexpectedTextNode:
     "Unbekannter Textknoten: %1",
//   "Unexpected text node: %1",

   ErrorParsingMathML:
     "Fehler beim Parsen von MathML",
//   "Error parsing MathML",

   ParsingError:
     "Fehler beim Parsen von MathML: %1",
//   "Error parsing MathML: %1",

   MathMLSingleElement:
    "MathML muss ein einzelnes <math> Element sein",
//  "MathML must be formed by a single element",

   MathMLRootElement:
     "MathML muss ein einzelnes <math> Element sein, nicht %1"
//   "MathML must be formed by a <math> element, not %1"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/de/MathML.js");
