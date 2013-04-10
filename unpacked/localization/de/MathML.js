MathJax.Localization.addTranslation("de","MathML",{
  isLoaded: true,
  strings: {

    BadMglyph:
      "Schlechter mglpyh: %1",
//    "Bad mglyph: %1",

    BadMglyphFont:
      "Schlechter Font: %1",
//    "Bad font: %1",

    MathPlayer: //TODO CHECK WINDOWS IN GERMAN :(
      "MathJax konnnte MathPlayer nicht einrichten.\n\n"+
      "Falls MathPlayer nicht installiert ist,  muss es erst installiert werden.\n"+
      "Eventuell blockieren die Sicherheitsoptionen ActiveX; ueberpruefen Sie\n"+
      "unter 'Interneteinstellungen' -> 'Werkzeuge' -> 'Sicherheit' -> 'Anpassen' ob\n"+
      "ob 'ActiveX aktivieren' und 'Binaer und Skriptverhalten' aktiviert sind.\n\n"+
      "Bei der jetzigen Konfiguration wird MathJax nur Fehlermeldungen anzeigen.",
//    "MathJax was not able to set up MathPlayer.\n\n"+
//    "If MathPlayer is not installed, you need to install it first.\n"+
//    "Otherwise, your security settings may be preventing ActiveX     \n"+
//    "controls from running.  Use the Internet Options item under\n"+
//    "the Tools menu and select the Security tab, then press the\n"+
//    "Custom Level button. Check that the settings for\n"+
//    "'Run ActiveX Controls', and 'Binary and script behaviors'\n"+
//    "are enabled.\n\n"+
//    "Currently you will see error messages rather than\n"+
//    "typeset mathematics.",

   CantCreateXMLParser:
      "MathJax can't create an XML parser for MathML.  Check that\n"+
      "the 'Script ActiveX controls marked safe for scripting' security\n"+
      "setting is enabled (use the Internet Options item in the Tools\n"+
      "menu, and select the Security panel, then press the Custom Level\n"+
      "button to check this).\n\n"+
      "MathML equations will not be able to be processed by MathJax.",

   UnknownNodeType:
     "Unknown node type: %1",

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

MathJax.Ajax.loadComplete("[MathJax]/localization/de/MathML.js");
