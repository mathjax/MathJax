/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/en/MathML.js
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

MathJax.Localization.addTranslation("en","MathML",{
  version: "2.2",
  isLoaded: true,
  strings: {

    BadMglyph: // NOTE: refers to MathML's mglyph element.
      "Bad mglyph: %1",

    BadMglyphFont:
      "Bad font: %1",

    MathPlayer:
      "MathJax was not able to set up MathPlayer.\n\n"+
      "If MathPlayer is not installed, you need to install it first.\n"+
      "Otherwise, your security settings may be preventing ActiveX     \n"+
      "controls from running.  Use the Internet Options item under\n"+
      "the Tools menu and select the Security tab, then press the\n"+
      "Custom Level button. Check that the settings for\n"+
      "'Run ActiveX Controls', and 'Binary and script behaviors'\n"+
      "are enabled.\n\n"+
      "Currently you will see error messages rather than\n"+
      "typeset mathematics.",

   CantCreateXMLParser:
      "MathJax can't create an XML parser for MathML.  Check that\n"+
      "the 'Script ActiveX controls marked safe for scripting' security\n"+
      "setting is enabled (use the Internet Options item in the Tools\n"+
      "menu, and select the Security panel, then press the Custom Level\n"+
      "button to check this).\n\n"+
      "MathML equations will not be able to be processed by MathJax.",

   UnknownNodeType:
     "Unknown node type: %1", // NOTE: refers to XML nodes

   UnexpectedTextNode:
     "Unexpected text node: %1",

   ErrorParsingMathML:
     "Error parsing MathML",

   ParsingError:
     "Error parsing MathML: %1",

   MathMLSingleElement:
    "MathML must be formed by a single element",

   MathMLRootElement:
     "MathML must be formed by a <math> element, not %1"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/en/MathML.js");
