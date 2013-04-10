MathJax.Localization.addTranslation("de",null,{
  menuTitle: "Deutch",
  isLoaded: true,
  domains: {
    "_": {
      isLoaded: true,
      strings: {

        CookieConfig:
          "MathJax hat eine Cookie mit ausfuehrbaren Code gefunden. " +
          "Soll dieser Code ausgefuehrt werden?\n\n" +
          "(Klicken Sie 'Abbrechen' falls Sie nicht selber das Cookie akzeptiert haben.)",
//        "MathJax has found a user-configuration cookie that includes code to " +
//        "be run. Do you want to run it?\n\n" +
//        "(You should press Cancel unless you set up the cookie yourself.)",

        MathProcessingError:
          "Mathe Verarbeitungsfehler ",
//        "Math Processing Error",

        MathError:
          "Mathe Fehler",
//        "Math Error",

        LoadFile:
          "Lade %1",
//        "Loading %1",

        Loading:
          "Laden",
//        "Loading", TODO???

        LoadFailed:
          "Datei konnte nicht geladen werden: %1",
//        "File failed to load: %1",

        ProcessMath:
          "Mathe Verarbeitung: %1%%",
//        "Processing Math: %1%%",

        Processing:
          "Verarbeiten",
//        "Processing", TODO???

        TypesetMath:
          "Mathe Textsatz: %1%%",
//        "Typesetting Math: %1%%",

        Typesetting:
          "Setzen",
//        "Typesetting", TODO???

        MathJaxNotSupported:
          "Ihr Webbrowser unterstuetzt MathJax nicht"
//        "Your browser does not support MathJax"

      }
    },
    
    MathMenu: {},
    FontWarnings: {},
    "v1.0-warning": {},
    TeX: {},
    MathML: {},
    "HTML-CSS": {}
  },

  plural: function(n) {
    if (n === 1) {return 1} // one
    return 2; // other
  },

  number: function(n) {
    return String(n).replace(".", ","); // replace dot by comma
  }

});

MathJax.Ajax.loadComplete("[MathJax]/localization/de/de.js");
