/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/it/MathMenu.js
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

MathJax.Localization.addTranslation("it","MathMenu",{
  version: "2.2",
  isLoaded: true,
  strings: {

    Show: "Mostra formula come",
      MathMLcode:     "Codice MathML",         // NOTE: This menu item shows the MathML code that MathJax has produced internally (sanitized, indented etc)
      OriginalMathML: "MathML originale",     // NOTE: This menu item shows the MathML code if that was originally in the page source 
      TeXCommands:    "Comandi TeX",        // NOTE: This menu item shows the TeX code if that was originally in the page source 
      AsciiMathInput: "Input AsciiMathML",   // NOTE: This menu item shows the asciimath code if that was originally in the page source 
      Original:       "Modulo originale",       // NOTE: This menu item shows the code that was originally in the page source but has no registered type. This can happen when extensions add new input formats but fail to provide an adequate format name.
      ErrorMessage:   "Messaggio d'errore",       // NOTE: This menu item shows the error message if MathJax fails to process the source
      texHints:       "Aggiungi suggerimenti Tex a MathML", // NOTE: This menu option adds comments to the code produced by 'MathMLCode'
    Settings: "Impostazioni formule", 
      ZoomTrigger: "Attivazione zoom",           // NOTE: This menu determines how MathJax's zoom is triggered
        Hover:       "Sopra",
        Click:       "Click",
        DoubleClick: "Doppio-Click",
        NoZoom:      "Niente zoom",
      TriggerRequires: "L'attivazione richiede:",  // NOTE: This menu item determines if the ZoomTrigger requires additional keys
        Option:      "Option",               // NOTE: refers to Apple-style OPTION key
        Alt:         "Alt",                  // NOTE: refers to Windows-style ALT key
        Command:     "Command",              // NOTE: refers to Apple-style COMMAND key
        Control:     "Control",
        Shift:       "Shift",
      ZoomFactor:    "Fattore di zoom",
      Renderer: "Processore per le formule",             // NOTE: This menu changes the output processor used by MathJax
      MPHandles: "Affida a MathPlayer",   // NOTE: MathJax recognizes MathPlayer when present. This submenu deals with MathJax/MathPlayer interaction.
        MenuEvents:    "Eventi menu",        // NOTE: refers to contextual menu selections
        MouseEvents:   "Eventi mouse",       // NOTE: refers to mouse clicks
        MenuAndMouse:  "Eventi mouse e menu",
      FontPrefs:  "Preferenze font",        // NOTE: This menu item allows selection of the font to use (and is mostly for development purposes)
        ForHTMLCSS: "Per HTML-CSS:",
          Auto:         "Auto",
          TeXLocal:     "TeX (locale)",       // NOTE: 'TeX' refers to the MathJax fonts
          TeXWeb:       "TeX (web)",
          TeXImage:     "TeX (immagini)",
          STIXLocal:    "STIX (locale)",
      ContextMenu: "Menu contestuale",
        Browser:        "Browser",
      Scale: "Scala tutte le formule...",           // NOTE: This menu item allows users to set a scaling factor for the MathJax output (relative to the surrounding content)
      Discoverable: "Evidenzia al passaggio",
    Locale: "Lingua",
      LoadLocale: "Scarica dall'URL ...",
    About: "Informazioni su MathJax",
    Help:  "Aiuto di MathJax",

    localTeXfonts:  "usare font TeX locale", // NOTE: This section deals with the 'About' overlay popup
    webTeXfonts:    "usare font Tex dal web",
    imagefonts:     "usare font immagine",
    localSTIXfonts: "usare font STIX locale",
    webSVGfonts:    "usare font SVG dal web",
    genericfonts:   "usare generici font unicode",

    wofforotffonts: "font woff oppure otf",
    eotffonts:      "font eot",
    svgfonts:       "font svg",

    WebkitNativeMMLWarning: // NOTE: This section deals with warnings for when a user changes the rendering output via the MathJax menu but a browser does not support the chosen mechanism
      "Il tuo browser non sembra supportare MathML nativamente, "+
      "perci\u00F2 il passaggio ora all'output MathML potrebbe rendere "+
      "illegibili le formule della pagina.",
      //"Your browser doesn't seem to support MathML natively, " +
      //"so switching to MathML output may cause the mathematics " +
      //"on the page to become unreadable.",

    MSIENativeMMLWarning:
      "Internet Explorer richiede il plugin MathPlayer " +
      "per processare output MathML.",
      //"Internet Explorer requires the MathPlayer plugin " +
      //"in order to process MathML output.",

    OperaNativeMMLWarning:
      "Il supporto di Opera a MathML \u00E8 limitato, perci\u00F2 passando ora " +
      "all'output MathML potrebbe succedere che alcune espressioni " +
      "siano rese in modo scadente.",
      //"Opera's support for MathML is limited, so switching to " +
      //"MathML output may cause some expressions to render poorly.",

    SafariNativeMMLWarning:
       "L'implementazione di MathML del tuo browser non comprende tutte " +
       "le caratteristiche usate da MathJax, perci\u00F2 alcune espressioni " +
       "potrebbero non essere visualizzate perfettamente.",
       //"Your browser's native MathML does not implement all the features " +
       //"used by MathJax, so some expressions may not render properly.",

    FirefoxNativeMMLWarning:
      "L'implementazione di MathML del tuo browser non comprende tutte " +
      "le caratteristiche usate da MathJax, perci\u00F2 alcune espressioni " +
      "potrebbero non essere visualizzate perfettamente.",
      //"Your browser's native MathML does not implement all the features " +
      //"used by MathJax, so some expressions may not render properly.",

    MSIESVGWarning:
      "SVG non \u00E8 implementato nelle versioni precedenti IE9 " +
      "oppure quando si sta emulando IE8 o precedenti. " +
      "Passando all'output SVG le formule non saranno " +
      "visualizzate correttamente.",
      //"SVG is not implemented in Internet Explorer prior to " +
      //"IE9 or when it is emulating IE8 or below. " +
      //"Switching to SVG output will cause the mathematics to " +
      //"not display properly.",

    LoadURL:
      "Scaricamento traduzione da questo indirizzo:",
      //"Load translation data from this URL:",

    BadURL:
      "L'indirizzo dovrebbe puntare a un file Javascript con una traduzione di MathJax.  " +
      "I nomi di file Javascript dovrebbero avere estensione '.js'",
      //"The URL should be for a javascript file that defines MathJax translation data.  " +
      //"Javascript file names should end with '.js'",

    BadData:
     "Impossibile scaricare la traduzione da %1",
     //"Failed to load translation data from %1",

    SwitchAnyway:
      "Passare comunque a questo interprete?\n\n" +
      "(Premi OK per cambiare, ANNULLA per continuare con la modalit\u00E1 corrente",
      //"Switch the renderer anyway?\n\n" +
      //"(Press OK to switch, CANCEL to continue with the current renderer)",

    ScaleMath:
      "Scala tutte le formule (comparate al testo circostante) del",
      //"Scale all mathematics (compared to surrounding text) by", // NOTE: This section deals with 'MathJax menu-> Scale all math'

    NonZeroScale:
      "Il fattore di scala non deve essere zero",
      //"The scale should not be zero",

    PercentScale:
      "Il fattore di scala deve essere in percentuale (es. 120%%)",
      //"The scale should be a percentage (e.g., 120%%)",

    IE8warning: // NOTE: This section deals with MathPlayer and menu/mouse event handling
      "Questo disabiliter\u00E1 il menu di MathJax e la possibilit\u00E1 di zoom, " +
      "puoi per\u00F2 accedere lo stesso al menu con Alt-Click su una formula.\n\n" +
      "Cambiare davvero le impostazioni di MathPlayer?",
      //"This will disable the MathJax menu and zoom features, " +
      //"but you can Alt-Click on an expression to obtain the MathJax " +
      //"menu instead.\n\nReally change the MathPlayer settings?",

    IE9warning:
      "Il menu contestuale di MathJax verr\u00E1 disabilitato, ma puoi " +
      "sempre premere Alt-Click sopra una formula per accedervi comunque.",
      //"The MathJax contextual menu will be disabled, but you can " +
      //"Alt-Click on an expression to obtain the MathJax menu instead.",

    NoOriginalForm:
      "Modulo originale non disponibile",
      //"No original form available", // NOTE: This refers to missing source formats when using 'MathJax Menu -> show math as"

    Close:
      "Chiudi",
      //"Close", // NOTE: for closing button in the 'MathJax Menu => SHow Math As' window.

    EqSource:
      "Codice sorgente formula MathJax"
      //"MathJax Equation Source"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/it/MathMenu.js");
