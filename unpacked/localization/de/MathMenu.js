MathJax.Localization.addTranslation("de","MathMenu",{
  isLoaded: true,
  strings: {

    Show: "Zeige Mathe als",                 // "Show Math As", TODO THAT's WEIRD
      MathMLcode:     "MathML Code",
      OriginalMathML: "Original MathML",
      TeXCommands:    "Original TeX",          // "TeX Commands", TODO ENGLISH?
      AsciiMathInput: "Original AsciiMathML",  // "AsciiMathML input", TODO ENGLISH?
      Original:       "Originalform",          // "Original Form",
      ErrorMessage:   "Fehlermeldung",         // "Error Message",
      texHints:       "Bette TeX Tipps in MathML ein", // "Show TeX hints in MathML",
    Settings: "Einstellungen",               // "Math Settings",
      ZoomTrigger: "Zoom ausloesen",           // "Zoom Trigger",
        Hover:       "Hover",
        Click:       "Klick",                    // "Click",
        DoubleClick: "Doppelklick",              // "Double-Click",
        NoZoom:      "Kein Zoom",                // "No Zoom",
      TriggerRequires: "Ausloeser benoetigt:", // "Trigger Requires:",
        Option:      "Option",
        Alt:         "Alt",
        Command:     "Command",
        Control:     "Steuerung",                // "Control",
        Shift:       "Shift",
      ZoomFactor:    "Zoomfaktor",             // "Zoom Factor",
      Renderer: "Mathe Renderer",              // "Math Renderer",
      MPHandles: "An MathPlayer uebergeben:",  // "Let MathPlayer Handle:",
        MenuEvents:    "Menue Events",           // "Menu Events",
        MouseEvents:   "Maus Events",            // "Mouse Events",
        MenuAndMouse:  "Maus und Menue Events",  // "Mouse and Menu Events",
      FontPrefs:  "Font Einstellungen",        // "Font Preferences",
        ForHTMLCSS: "Fuer HTML-CSS",             // "For HTML-CSS:",
          Auto:         "Auto",
          TeXLocal:     "TeX (lokal)",             // "TeX (local)",
          TeXWeb:       "TeX (Web)",               // "TeX (web)",
          TeXImage:     "TeX (Bild)",              // "TeX (image)",
          STIXLocal:    "STIX (lokal)",            // "STIX (local)",
      ContextMenu: "Kontextmenue",             // "Contextual Menu",
        Browser:        "Browser",
      Scale: "Alle Mathe skalieren",           // "Scale All Math ...",
      Discoverable: "Highlight durch Hovern",  // "Highlight on Hover",
    Locale: "Sprache",                       // "Language",
      LoadLocale: "Von URL laden",             // "Load from URL ...",
    About: "Ueber MathJax",                  // "About MathJax",
    Help:  "MathJax Hilfe",                  // "MathJax Help",
       
    localTeXfonts:  "Lokale TeX-Fonts werden verwendet",         // "using local TeX fonts",
    webTeXfonts:    "Web TeX-Fonts werden verwendet",            // "using web TeX font",
    imagefonts:     "Bild-Fonts werden verwendet",               // "using Image fonts",
    localSTIXfonts: "Lokale STIX-Fonts werden verwendet",        // "using local STIX fonts",
    webSVGfonts:    "Web SVG-fonts werden verwendet",            // "using web SVG fonts",
    genericfonts:   "Generische Unicode-Fonts werden verwendet", // "using generic unicode fonts",
      
    wofforotffonts: "WOFF- oder OTF-Fonts", // "woff or otf fonts",
    eotffonts:      "EOT-Fonts",            // "eot fonts",
    svgfonts:       "SVG-Fonts",            // "svg fonts",

    WebkitNativeMMLWarning:
      "Ihr Browser scheint MathML nicht zu unterstuetzen, " +
      "so dass ein Wechsel zur MathML-Ausgabe die Mathematik " +
      "auf der Seite unlesbar machen koennte."
//    "Your browser doesn't seem to support MathML natively, " +
//    "so switching to MathML output may cause the mathematics " +
//    "on the page to become unreadable.",

    MSIENativeMMLWarning:
      "Internet Explorer benoetigt das MathPlayer Plugin " +
      "um MathML-Ausgabe verarbeiten zu koennen."
//    "Internet Explorer requires the MathPlayer plugin " +
//    "in order to process MathML output.",
      
    OperaNativeMMLWarning:
      "Opera's MathML unterstuetzung ist beschraenkt, so dass beim Wechsel " +
      "zur MathML-Ausgabe einige Ausdruecke schlecht gerendert werden."
//    "Opera's support for MathML is limited, so switching to " +
//    "MathML output may cause some expressions to render poorly.",

    SafariNativeMMLWarning:
       "Die MathML-Unterstuetzung Ihres Browsers beherrscht nicht alle " +
       "MathJax-Features, so dass einige Ausdruecke schlecht gerendert werden."
//     "Your browser's native MathML does not implement all the features " +
//     "used by MathJax, so some expressions may not render properly.",

    FirefoxNativeMMLWarning:
       "Die MathML-Unterstuetzung Ihres Browsers beherrscht nicht alle " +
       "MathJax-Features, so dass einige Ausdruecke schlecht gerendert werden."
//     "Your browser's native MathML does not implement all the features " +
//     "used by MathJax, so some expressions may not render properly.",
      
    MSIESVGWarning:
      "Internet Explorer unterstuetzt SVG erst ab IE9 und " + 
      "nicht im IE8-Emulationsmodus. Beim Wechsel zur " +
      "SVG-Ausgabe wird die Mathematik nicht richtig dargestellt.",
//    "SVG is not implemented in Internet Explorer prior to " +
//    "IE9 or when it is emulating IE8 or below. " +
//    "Switching to SVG output will cause the mathemtics to " + TODO TYPO IN ENGLISH
//    "not display properly.",
      
    LoadURL:
      "Sprachschema-Daten von URL laden:",
//    "Load translation data from this URL:",
      
    BadURL:
      "URL muss zu einer JavaScript-Datei fuer MathJax Sprachschema fuehren. " +
      "JavaScript Dateinamen sollten auf '.js' enden.",
//    "The URL should be for a javascript file that defines MathJax translation data.  " +
//    "Javascript file names should end with '.js'",

    BadData:
     "Fehler beim Laden des Sprachschema von %1",
//   "Failed to load translation data from %1",
     
    SwitchAnyway:
      "Renderer trotzdem aendern?\n\n" +
      "(Mit OK wechseln, mit ABBRECHEN den aktuellen Renderer verwenden)",
//    "Switch the renderer anyway?\n\n" +
//    "(Press OK to switch, CANCEL to continue with the current renderer)",

    ScaleMath:
      "Alle Mathematik skalieren (relativ zum Umgebenden Text)",
//    "Scale all mathematics (compared to surrounding text) by",

    NonZeroScale:
      "Skalierung darf nicht Null sein",
//    "The scale should not be zero",

    PercentScale:
      "Skalierung muss in Prozent sein",
//    "The scale should be a percentage (e.g., 120%%)",

    IE8warning:
      "Dies Deaktiviert das MathJax Menue und den MathJax Zoom " +
      "Alt+Klick auf eine Formel zeigt weiter das MathJax-Menue.\n\n" +
      "Wirklich MathPlayer Einstellungen aendern?"
//    "This will disable the MathJax menu and zoom features, " +
//    "but you can Alt-Click on an expression to obtain the MathJax " +
//    "menu instead.\n\nReally change the MathPlayer settings?",

    IE9warning:
      "Das MathJax Menue wird deaktiviert und kann nur durch " +
      "Alt+Klick auf eine Formel angezeigt werden."
//    "The MathJax contextual menu will be disabled, but you can " +
//    "Alt-Click on an expression to obtain the MathJax menu instead.",

    NoOriginalForm:
      "Keine Originalform verfuegbar",
//    "No original form available", TODO???

    Close:
      "Schliessen",
//    "Close",

    EqSource:
      "Original MathJax Formel"
//    "MathJax Equation Source"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/de/MathMenu.js");
