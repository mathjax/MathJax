/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/sv/sv.js
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

MathJax.Localization.addTranslation("sv",null,{
  menuTitle: "svenska",
  version: "2.3",
  isLoaded: true,
  domains: {
    "_": {
        version: "2.3",
        isLoaded: true,
        strings: {
          CookieConfig: "MathJax har hittat en anv\u00E4ndarkonfigurationscookie som inneh\u00E5ller kod som kan k\u00F6ras. Vill du k\u00F6ra den?\n\n(Du b\u00F6r trycka p\u00E5 Avbryt om du inte sj\u00E4lv har lagt upp denna cookie.)",
          MathProcessingError: "Matematikbearbetningsfel",
          MathError: "Matematikfel",
          LoadFile: "L\u00E4ser in %1",
          Loading: "L\u00E4ser in",
          LoadFailed: "Misslyckades att l\u00E4sa in: %1",
          ProcessMath: "Bearbetar matematik: %1 %%",
          Processing: "Bearbetar",
          MathJaxNotSupported: "Din webbl\u00E4sare st\u00F6der inte MathJax",
          Typesetting: "S\u00E4ttning"
        }
    },
    "FontWarnings": {},
    "HTML-CSS": {},
    "HelpDialog": {},
    "MathML": {},
    "MathMenu": {},
    "TeX": {}
  },
  plural: function (n) {
      if (n === 1) return 1; // one
      return 2; // other
    },
  number: function (n) {
      return n;
    }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/sv/sv.js");
