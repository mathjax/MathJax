/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/en/MathMenu.js
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

MathJax.Localization.addTranslation("en","MathMenu",{
  version: "2.2",
  isLoaded: true,
  strings: {

    Show: "Show Math As",                    // NOTE: MathJax uses 'Math' as a distinct UI choice. Please translate it literally whenever possible.
      MathMLcode:     "MathML Code",         // NOTE: This menu item shows the MathML code that MathJax has produced internally (sanitized, indented etc)
      OriginalMathML: "Original MathML",     // NOTE: This menu item shows the MathML code if that was originally in the page source 
      TeXCommands:    "TeX Commands",        // NOTE: This menu item shows the TeX code if that was originally in the page source 
      AsciiMathInput: "AsciiMathML input",   // NOTE: This menu item shows the asciimath code if that was originally in the page source 
      Original:       "Original Form",       // NOTE: This menu item shows the code that was originally in the page source but has no registered type. This can happen when extensions add new input formats but fail to provide an adequate format name.
      ErrorMessage:   "Error Message",       // NOTE: This menu item shows the error message if MathJax fails to process the source
      texHints:       "Show TeX hints in MathML", // NOTE: This menu option adds comments to the code produced by 'MathMLCode'
    Settings: "Math Settings", 
      ZoomTrigger: "Zoom Trigger",           // NOTE: This menu determines how MathJax's zoom is triggered
        Hover:       "Hover",
        Click:       "Click",
        DoubleClick: "Double-Click",
        NoZoom:      "No Zoom",
      TriggerRequires: "Trigger Requires:",  // NOTE: This menu item determines if the ZoomTrigger requires additional keys
        Option:      "Option",               // NOTE: refers to Apple-style OPTION key
        Alt:         "Alt",                  // NOTE: refers to Windows-style ALT key
        Command:     "Command",              // NOTE: refers to Apple-style COMMAND key
        Control:     "Control",
        Shift:       "Shift",
      ZoomFactor:    "Zoom Factor",
      Renderer: "Math Renderer",             // NOTE: This menu changes the output processor used by MathJax
      MPHandles: "Let MathPlayer Handle:",   // NOTE: MathJax recognizes MathPlayer when present. This submenu deals with MathJax/MathPlayer interaction.
        MenuEvents:    "Menu Events",        // NOTE: refers to contextual menu selections
        MouseEvents:   "Mouse Events",       // NOTE: refers to mouse clicks
        MenuAndMouse:  "Mouse and Menu Events",
      FontPrefs:  "Font Preferences",        // NOTE: This menu item allows selection of the font to use (and is mostly for development purposes)
        ForHTMLCSS: "For HTML-CSS:",
          Auto:         "Auto",
          TeXLocal:     "TeX (local)",       // NOTE: 'TeX' refers to the MathJax fonts
          TeXWeb:       "TeX (web)",
          TeXImage:     "TeX (image)",
          STIXLocal:    "STIX (local)",
      ContextMenu: "Contextual Menu",
        Browser:        "Browser",
      Scale: "Scale All Math ...",           // NOTE: This menu item allows users to set a scaling factor for the MathJax output (relative to the surrounding content)
      Discoverable: "Highlight on Hover",
    Locale: "Language",
      LoadLocale: "Load from URL ...",
    About: "About MathJax",
    Help:  "MathJax Help",
       
    localTeXfonts:  "using local TeX fonts", // NOTE: This section deals with the 'About' overlay popup
    webTeXfonts:    "using web TeX font",
    imagefonts:     "using Image fonts",
    localSTIXfonts: "using local STIX fonts",
    webSVGfonts:    "using web SVG fonts",
    genericfonts:   "using generic unicode fonts",
      
    wofforotffonts: "woff or otf fonts",
    eotffonts:      "eot fonts",
    svgfonts:       "svg fonts",

    WebkitNativeMMLWarning: // NOTE: This section deals with warnings for when a user changes the rendering output via the MathJax menu but a browser does not support the chosen mechanism
      "Your browser doesn't seem to support MathML natively, " +
      "so switching to MathML output may cause the mathematics " +
      "on the page to become unreadable.",

    MSIENativeMMLWarning:
      "Internet Explorer requires the MathPlayer plugin " +
      "in order to process MathML output.",
      
    OperaNativeMMLWarning:
      "Opera's support for MathML is limited, so switching to " +
      "MathML output may cause some expressions to render poorly.",

    SafariNativeMMLWarning:
       "Your browser's native MathML does not implement all the features " +
       "used by MathJax, so some expressions may not render properly.",

    FirefoxNativeMMLWarning:
      "Your browser's native MathML does not implement all the features " +
      "used by MathJax, so some expressions may not render properly.",
      
    MSIESVGWarning:
      "SVG is not implemented in Internet Explorer prior to " +
      "IE9 or when it is emulating IE8 or below. " +
      "Switching to SVG output will cause the mathematics to " +
      "not display properly.",
      
    LoadURL:
      "Load translation data from this URL:",
      
    BadURL:
      "The URL should be for a javascript file that defines MathJax translation data.  " +
      "Javascript file names should end with '.js'",

    BadData:
     "Failed to load translation data from %1",
     
    SwitchAnyway:
      "Switch the renderer anyway?\n\n" +
      "(Press OK to switch, CANCEL to continue with the current renderer)",

    ScaleMath:
      "Scale all mathematics (compared to surrounding text) by", // NOTE: This section deals with 'MathJax menu-> Scale all math'

    NonZeroScale:
      "The scale should not be zero",

    PercentScale:
      "The scale should be a percentage (e.g., 120%%)",

    IE8warning: // NOTE: This section deals with MathPlayer and menu/mouse event handling
      "This will disable the MathJax menu and zoom features, " +
      "but you can Alt-Click on an expression to obtain the MathJax " +
      "menu instead.\n\nReally change the MathPlayer settings?",

    IE9warning:
      "The MathJax contextual menu will be disabled, but you can " +
      "Alt-Click on an expression to obtain the MathJax menu instead.",

    NoOriginalForm:
      "No original form available", // NOTE: This refers to missing source formats when using 'MathJax Menu -> show math as"

    Close:
      "Close", // NOTE: for closing button in the 'MathJax Menu => SHow Math As' window.

    EqSource:
      "MathJax Equation Source"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/en/MathMenu.js");
