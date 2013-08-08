/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/qqq/MathMenu.js
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

MathJax.Localization.addTranslation("qqq","MathMenu",{
        version: "2.3",
        isLoaded: true,
        strings: {
          Show: "'Show Math As' menu item. MathJax uses 'Math' as a distinct UI choice. Please translate it literally whenever possible.",
          MathMLcode: "This menu item from 'Show Math As' shows the MathML code that MathJax has produced internally (sanitized, indented etc)",
          OriginalMathML: "This menu item from 'Show Math As' shows the MathML code if that was originally in the page source",
          TeXCommands: "This menu item from 'Show Math As' shows the TeX code if that was originally in the page source",
          AsciiMathInput: "This menu item from 'Show Math As' shows the asciimath code if that was originally in the page source",
          Original: "This menu item from 'Show Math As' shows the code that was originally in the page source but has no registered type. This can happen when extensions add new input formats but fail to provide an adequate format name.",
          ErrorMessage: "This menu item from 'Show Math As' shows the error message if MathJax fails to process the source",
          Annotation: "This menu item from 'Show Math As' allows to access possible annotations attached to a MathML formula.",
          TeX: "This is a menu item from the 'Annotation Menu' to show a TeX annotation.",
          StarMath: "This is a menu item from the 'Annotation Menu' to show a StarMath annotation (StarOffice, OpenOffice, LibreOffice).",
          Maple: "This is a menu item from the 'Annotation Menu' to show a Maple annotation.",
          ContentMathML: "This is a menu item from the 'Annotation Menu' to show a Content MathML annotation. The MathML specification defines two versions: 'presentation' MathML (used in MathJax) and 'content' MathML (describes the semantics of the formula).",
          OpenMath: "This is a menu item from the 'Annotation Menu' to show the OpenMath annotation, an XML representation similar to Content MathML.",
          texHints: "This menu option from 'Show Math As' adds comments to the code produced by 'MathMLCode'",
          Settings: "'Math Settings' menu item.",
          ZoomTrigger: "This menu from 'Math Settings' determines how MathJax's zoom is triggered",
          Hover: "This menu option from 'ZoomTrigger' indicates that the zoom is triggered when the mouse pass over a formula.",
          Click: "This menu option from 'ZoomTrigger' indicates that the zoom is triggered when one clicks on a formula.",
          DoubleClick: "This menu option from 'ZoomTrigger' indicates that the zoom is triggered when one double-clicks on a formula.",
          NoZoom: "This menu option from 'ZoomTrigger' indicates that the zoom is never triggered.",
          TriggerRequires: "This menu text from 'ZoomTrigger' describes if the ZoomTrigger requires additional keys",
          Option: "This menu option from 'ZoomTrigger' indicates that the OPTION key is needed (Apple-style)",
          Alt: "This menu option from 'ZoomTrigger' indicates that the ALT key is needed (Windows-style)",
          Command: "This menu option from 'ZoomTrigger' indicates that the COMMAND key is needed (Apple-style)",
          Control: "This menu option from 'ZoomTrigger' indicates that the CONTROL key is needed",
          Shift: "This menu option from 'ZoomTrigger' indicates that the SHIFT key is needed",
          ZoomFactor: "This menu item from 'Math Settings' describes the Zoom Factor. It will open a submenu with percentage values like 150%% etc",
          Renderer: "This menu item from 'Math Settings' changes the output processor used by MathJax e.g. HTML-CSS, SVG",
          MPHandles: "MathJax recognizes MathPlayer when present. This submenu from 'Math Settings' deals with MathJax/MathPlayer interaction.",
          MenuEvents: "Option to let MathPlayer handle the contextual menu selections",
          MouseEvents: "Option to let MathPlayer handle the mouse clicks",
          MenuAndMouse: "Option to let MathPlayer handle Mouse and Menu Events",
          FontPrefs: "This menu item from 'Math Settings' allows selection of the font to use (and is mostly for development purposes) e.g. STIX",
          ForHTMLCSS: "FontPrefs Submenu for font to use with the HTML-CSS output processor",
          Auto: "Automatic selection of the font",
          TeXLocal: "Local MathJax TeX fonts",
          TeXWeb: "Web version of TeX MathJax TeX fonts",
          TeXImage: "Image MathJax TeX fonts",
          STIXLocal: "Local STIX fonts",
          ContextMenu: "This menu from 'Math Settings' allows to choose the contextual menu to use",
          Browser: "Menu option from ContextMenu to indicate that the browser contextual menu should be used.",
          Scale: "This menu item from 'Math Settings' allows users to set a scaling factor for the MathJax output (relative to the surrounding content).",
          Discoverable: "This menu option indicates whether the formulas should be highlighted when you pass the mouse over them.",
          Locale: "This menu item from 'Math Settings' allows to select a language. The language names are specified by the 'menuTitle' properties.",
          LoadLocale: "This allows the user to load the translation from a given URL",
          About: "This opens the 'About MathJax' popup",
          Help: "This opens the 'MathJax Help' popup",
          localTeXfonts: "This is from the 'About MathJax' popup and is displayed when MathJax uses local MathJax TeX fonts",
          webTeXfonts: "This is from the 'About MathJax' popup and is displayed when MathJax uses Web versions of MathJax TeX fonts",
          imagefonts: "This is from the 'About MathJax' popup and is displayed when MathJax uses Image versions of MathJax TeX fonts",
          localSTIXfonts: "This is from the 'About MathJax' popup and is displayed when MathJax uses local MathJax STIX fonts",
          webSVGfonts: "This is from the 'About MathJax' popup and is displayed when MathJax uses SVG MathJax TeX fonts",
          genericfonts: "This is from the 'About MathJax' popup and is displayed when MathJax uses local generic fonts",
          wofforotffonts: "This is from the 'About MathJax' popup. woff/otf are names of font formats",
          eotffonts: "This is from the 'About MathJax' popup. eot is a name of font format",
          svgfonts: "This is from the 'About MathJax' popup. svg is a name of font format",
          WebkitNativeMMLWarning: "This is the WebKit warning displayed when a user changes the rendering output to native MathML via the MathJax menu.",
          MSIENativeMMLWarning: "This is the IE warning displayed when a user changes the rendering output to native MathML via the MathJax menu and does not have MathPlayer installed.",
          OperaNativeMMLWarning: "This is the Opera warning displayed when a user changes the rendering output to native MathML via the MathJax menu.",
          SafariNativeMMLWarning: "This is the Safari warning displayed when a user changes the rendering output to native MathML via the MathJax menu.",
          FirefoxNativeMMLWarning: "This is the Firefox warning displayed when a user changes the rendering output to native MathML via the MathJax menu.",
          MSIESVGWarning: "This is the IE warning displayed when a user changes the rendering output to SVG via the MathJax menu and uses an versions of IE.",
          SwitchAnyway: "This is appended at the end of switch warnings. The character '\\n' forces a new line.",
          LoadURL: "This is the prompt message for the 'LoadLocale' menu entry",
          BadURL: "This is the alert message when a bad URL is specified for 'LoadLocale'.",
          BadData: "This is the alert message when the translation data specified 'LoadLocale' fails to be loaded. The argument is the URL specified.",
          ScaleMath: "This is the prompt message for the 'Scale all math' menu entry",
          NonZeroScale: "This is the alert message when the scale specified to 'ScaleMath' is zero",
          PercentScale: "This is the alert message when the scale specified to 'ScaleMath' is not a percentage",
          IE8warning: "This this the confirm message displayed for when the user chooses to let MathPlayer control the contextual menu (IE8) ",
          IE9warning: "This this the alert message displayed for when the user chooses to let MathPlayer control the contextual menu (IE9) ",
          NoOriginalForm: "This is the alert box displayed when there are missing source formats for 'Show math as'",
          Close: "Closing button in the 'Show Math As' window.",
          EqSource: "This is the title of the 'Show Math As' button."
        }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/qqq/MathMenu.js");
