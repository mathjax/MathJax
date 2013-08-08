/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/qqq/HelpDialog.js
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

MathJax.Localization.addTranslation("qqq","HelpDialog",{
        version: "2.3",
        isLoaded: true,
        strings: {
          Help: "This is the title displayed at the top of the MathJax Help dialog.",
          MathJax: "First paragraph of the MathJax Help dialog. Stars around 'MathJax' is the Markdown syntax to put it in emphasis.",
          Browsers: "Second paragraph of the MathJax Help dialog. Stars around 'Browsers' is the Markdown syntax to put it in emphasis.",
          Menu: "Third paragraph of the MathJax Help dialog. Stars around 'Math Menu' the Markdown syntax to put it in emphasis.",
          ShowMath: "First item of the the 'Math Menu' paragraph. Stars around 'Show Math As' is the Markdown syntax to put it in emphasis. 'Show Math as' needs to be translated consistently.",
          Settings: "Second item of the the 'Math Menu' paragraph. Stars around 'Settings' is the Markdown syntax to put it in emphasis. 'Settings' needs to be translated consistently.",
          Language: "Third item of the the 'Math Menu' paragraph. Stars around 'Language' is the Markdown syntax to put it in emphasis. 'Language' needs to be translated consistently.",
          Zoom: "Fourth paragraph of the MathJax Help dialog. Stars around 'Math Zoom' is the Markdown syntax to put it in emphasis. 'Math Zoom' need to be translated consistently.",
          Accessibilty: "Fifth paragraph of the MathJax Help dialog. Stars around 'Accessibility' is the Markdown syntax to put it in emphasis.",
          Fonts: "Sixth paragraph of the MathJax Help dialog. Stars around 'Fonts' is the Markdown syntax to put it in emphasis. [STIX fonts](%%1) is the Markdown syntax for links. The argument is a URL the STIX fonts."
        }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/qqq/HelpDialog.js");
