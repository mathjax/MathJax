/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/qqq/MathML.js
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

MathJax.Localization.addTranslation("qqq","MathML",{
        version: "2.2",
        isLoaded: true,
        strings: {
          BadMglyph: "This error is displayed when processing a MathML mglyph element with a bad URL. The argument is the value of the src attribute.",
          BadMglyphFont: "This error is displayed when processing a MathML mglyph element with a bad font family. The argument is the value of the fontfamily attribute",
          MathPlayer: "This alert is displayed when the Native MathML output Jax fails to set up MathPlayer. The '\\n' character is used to force new lines in the alert box",
          CantCreateXMLParser: "This alert is displayed when the MathML input Jax fails to create an XML parser. The '\\n' character is used to force new lines in the alert box",
          UnknownNodeType: "This error is displayed when an unknown XML node is found in the MathML source. The argument is the node name.",
          UnexpectedTextNode: "This error is displayed when a text node is found at an unexpected place in the MathML source. The argument is the content of the text node.",
          ErrorParsingMathML: "This error is displayed when a MathML element fails to be parsed.",
          ParsingError: "This error is displayed when an XML parsing error happens. The argument is the error returned by the XML parser.",
          MathMLSingleElement: "This error is displayed when a MathML input Jax contains have a root other than <math>",
          MathMLRootElement: "This error is displayed when a MathML input Jax contains have a root other than <math>. The argument is the root name."
        }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/qqq/MathML.js");
