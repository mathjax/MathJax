/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/ja/MathML.js
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

MathJax.Localization.addTranslation("ja","MathML",{
        version: "2.3",
        isLoaded: true,
        strings: {
          BadMglyph: "\u8AA4\u3063\u305F mglyph: %1",
          BadMglyphFont: "\u8AA4\u3063\u305F\u30D5\u30A9\u30F3\u30C8: %1",
          UnknownNodeType: "\u4E0D\u660E\u306A\u7A2E\u985E\u306E\u30CE\u30FC\u30C9: %1",
          UnexpectedTextNode: "\u4E88\u671F\u3057\u306A\u3044\u30C6\u30AD\u30B9\u30C8 \u30CE\u30FC\u30C9: %1",
          ErrorParsingMathML: "MathML \u306E\u69CB\u6587\u89E3\u6790\u30A8\u30E9\u30FC",
          ParsingError: "MathML \u306E\u69CB\u6587\u89E3\u6790\u30A8\u30E9\u30FC: %1",
          MathMLSingleElement: "MathML \u306F\u5358\u4E00\u306E\u8981\u7D20\u3067\u69CB\u6210\u3057\u3066\u304F\u3060\u3055\u3044",
          MathMLRootElement: "MathML \u306F %1 \u3067\u306F\u306A\u304F \u003Cmath\u003E \u8981\u7D20\u3067\u69CB\u6210\u3057\u3066\u304F\u3060\u3055\u3044"
        }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/ja/MathML.js");
