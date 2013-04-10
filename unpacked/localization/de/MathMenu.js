MathJax.Localization.addTranslation("de","MathMenu",{
  isLoaded: true,
  strings: {

    Show: "Zeige Mathe als",                 // "Show Math As", TODO It's a bit weird to have "Math" instead of "equation" "formula" etc but if we keep it we should follow this "globally"
      MathMLcode:     "MathML Code",
      OriginalMathML: "Original MathML",
      TeXCommands:    "Original TeX",          // "TeX Commands",
      AsciiMathInput: "Original AsciiMathML",  // "AsciiMathML input"
      Original:       "Originalform",          // "Original Form", TODO What is that referring to?
      ErrorMessage:   "Fehlermeldung",         // "Error Message",
      texHints:       "TeX Tipps in MathML", // "Show TeX hints in MathML", TODO I left out "show" -- seemed redundant; "embed" or "add" is more appropriate.
    Settings: "Einstellungen",               // "Math Settings", //TODO I dropped the "Math", is that ok? Should we do this in general?
      ZoomTrigger: "Zoom ausl\u00F6sen",           // "Zoom Trigger",
        Hover:       "Hover",
        Click:       "Klick",                    // "Click",
        DoubleClick: "Doppelklick",              // "Double-Click",
        NoZoom:      "Kein Zoom",                // "No Zoom",
      TriggerRequires: "Ausl\u00F6ser ben\u00F6tigt:", // "Trigger Requires:",
        Option:      "Option",
        Alt:         "Alt",
        Command:     "Command",
        Control:     "Steuerung",                // "Control",
        Shift:       "Shift",
      ZoomFactor:    "Zoomfaktor",             // "Zoom Factor",
      Renderer: "Mathe Renderer",              // "Math Renderer",
      MPHandles: "An MathPlayer \u00FCbergeben:",  // "Let MathPlayer Handle:",
        MenuEvents:    "Men\u00FC Events",          // "Menu Events", //TODO not sure about "Events" jargon. what are these?
        MouseEvents:   "Maus Events",            // "Mouse Events",
        MenuAndMouse:  "Maus und Men\u00FC Events",  // "Mouse and Menu Events",
      FontPrefs:  "Font Einstellungen",        // "Font Preferences", //TODO  What's this?
        ForHTMLCSS: "F\u00FCr HTML-CSS",             // "For HTML-CSS:",
          Auto:         "Auto",
          TeXLocal:     "TeX (lokal)",             // "TeX (local)",
          TeXWeb:       "TeX (Web)",               // "TeX (web)",
          TeXImage:     "TeX (Bild)",              // "TeX (image)",
          STIXLocal:    "STIX (lokal)",            // "STIX (local)",
      ContextMenu: "Kontextmen\u00FC ",             // "Contextual Menu",
        Browser:        "Browser",
      Scale: "Alle Mathe skalieren ...",       // "Scale All Math ...",
      Discoverable: "Highlight durch Hovern",  // "Highlight on Hover",
    Locale: "Sprache",                       // "Language",
      LoadLocale: "Von URL laden ...",         // "Load from URL ...",
    About: "\u00DCber MathJax",                  // "About MathJax", TODO should be a line lower before the rest of the about box?
    Help:  "MathJax Hilfe",                  // "MathJax Help",
/* About MathJax dialogue ? */ 
    localTeXfonts:  "Lokale TeX-Fonts verwendet",         // "using local TeX fonts",
    webTeXfonts:    "Web TeX-Fonts verwendet",            // "using web TeX font",
    imagefonts:     "Bild-Fonts verwendet",               // "using Image fonts",
    localSTIXfonts: "Lokale STIX-Fonts verwendet",        // "using local STIX fonts",
    webSVGfonts:    "Web SVG-fonts verwendet",            // "using web SVG fonts",
    genericfonts:   "Generische Unicode-Fonts verwendet", // "using generic unicode fonts",
      
    wofforotffonts: "WOFF- oder OTF-Fonts", // "woff or otf fonts", TODO capitalize English?
    eotffonts:      "EOT-Fonts",            // "eot fonts",
    svgfonts:       "SVG-Fonts",            // "svg fonts",

    WebkitNativeMMLWarning:
      "Ihr Browser scheint MathML nicht zu unterst\u00FCtzen, " +
      "so dass ein Wechsel zur MathML-Ausgabe die Mathematik " +
      "auf der Seite unlesbar machen k\u00F6nnte.",
//    "Your browser doesn't seem to support MathML natively, " +
//    "so switching to MathML output may cause the mathematics " +
//    "on the page to become unreadable.",

    MSIENativeMMLWarning:
      "Internet Explorer ben\u00F6tigt das MathPlayer Plugin, " +
      "um MathML-Ausgabe darstellen zu k\u00F6nnen.",
//    "Internet Explorer requires the MathPlayer plugin " +
//    "in order to process MathML output.",
      
    OperaNativeMMLWarning:
      "Opera's MathML unterst\u00FCtzung ist beschr\u00E4nkt, so dass beim Wechsel " +
      "zur MathML-Ausgabe einige Ausdr\u00FCcke schlecht gerendert werden.",
//    "Opera's support for MathML is limited, so switching to " +
//    "MathML output may cause some expressions to render poorly.",

    SafariNativeMMLWarning:
       "Die MathML-Unterst\u00FCtzung Ihres Browsers beherrscht nicht alle " +
       "MathJax-Features, so dass einige Ausdr\u00FCcke schlecht gerendert werden.",
//     "Your browser's native MathML does not implement all the features " +
//     "used by MathJax, so some expressions may not render properly.",

    FirefoxNativeMMLWarning:
       "Die MathML-Unterst\u00FCtzung Ihres Browsers beherrscht nicht alle " +
       "MathJax-Features, so dass einige Ausdr\u00FCcke schlecht gerendert werden.",
//     "Your browser's native MathML does not implement all the features " +
//     "used by MathJax, so some expressions may not render properly.",
      
    MSIESVGWarning:
      "Internet Explorer unterst\u00FCtzt SVG erst ab IE9 und " + 
      "nicht im IE8-Emulationsmodus. Beim Wechsel zur " +
      "SVG-Ausgabe wird die Mathematik nicht richtig dargestellt.",
//    "SVG is not implemented in Internet Explorer prior to " +
//    "IE9 or when it is emulating IE8 or below. " +
//    "Switching to SVG output will cause the mathemtics to " + TODO TYPO IN ENGLISH
//    "not display properly.",
      
    LoadURL:
      "Sprachschema von URL laden:",
//    "Load translation data from this URL:",
      
    BadURL:
      "URL muss eine JavaScript-Datei f\u00FCr MathJax Sprachschema verlinken. " +
      "JavaScript Dateinamen sollten auf '.js' enden.",
//    "The URL should be for a javascript file that defines MathJax translation data.  " +
//    "Javascript file names should end with '.js'",

    BadData:
     "Fehler beim Laden des Sprachschema von %1",
//   "Failed to load translation data from %1",
     
    SwitchAnyway:
      "Renderer trotzdem \u00E4ndern?\n\n" +
      "(Mit OK wechseln, mit ABBRECHEN den akt\u00FCllen Renderer verwenden)", //TODO check German browser lingo OK // Abbrechen
//    "Switch the renderer anyway?\n\n" +
//    "(Press OK to switch, CANCEL to continue with the current renderer)",

    ScaleMath:
      "Alle Mathematik skalieren (relativ zum umgebenden Text)",
//    "Scale all mathematics (compared to surrounding text) by",

    NonZeroScale:
      "Skalierung darf nicht Null sein",
//    "The scale should not be zero",

    PercentScale:
      "Skalierung muss in Prozent sein (z.B. 120%%)",
//    "The scale should be a percentage (e.g., 120%%)",

    IE8warning:
      "Dies Deaktiviert das MathJax Men\u00FC und den MathJax Zoom. " +
      "Alt+Klick auf eine Formel zeigt weiter das MathJax-Men\u00FC.\n\n" +
      "Wirklich MathPlayer Einstellungen \u00E4ndern?",
//    "This will disable the MathJax menu and zoom features, " +
//    "but you can Alt-Click on an expression to obtain the MathJax " +
//    "menu instead.\n\nReally change the MathPlayer settings?",

    IE9warning:
      "Das MathJax Men\u00FC wird deaktiviert und kann nur durch " +
      "Alt+Klick auf eine Formel angezeigt werden.",
//    "The MathJax contextual menu will be disabled, but you can " +
//    "Alt-Click on an expression to obtain the MathJax menu instead.",

    NoOriginalForm:
      "Keine Originalform verf\u00FCgbar",
//    "No original form available",

    Close:
      "Schliessen",
//    "Close",

    EqSource:
      "Original MathJax Formel"
//    "MathJax Equation Source"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/de/MathMenu.js");
