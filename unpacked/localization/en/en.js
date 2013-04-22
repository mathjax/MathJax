MathJax.Localization.addTranslation("en",null,{
  menuTitle: "English",
  isLoaded: true,
  domains: {
    "_": {
      isLoaded: true,
      strings: {

        CookieConfig:
          "MathJax has found a user-configuration cookie that includes code to "+
          "be run. Do you want to run it?\n\n"+
          "(You should press Cancel unless you set up the cookie yourself.)",

        MathProcessingError:
          "Math Processing Error",

        MathError:
          "Math Error",

        LoadFile: "Loading %1",

        Loading: "Loading",

        LoadFailed: "File failed to load: %1",

        ProcessMath: "Processing Math: %1%%",

        Processing: "Processing",

        TypesetMath: "Typesetting Math: %1%%",

        Typesetting: "Typesetting",

        MathJaxNotSupported:
          "Your browser does not support MathJax"

      }
    },
    MathMenu: {},
    FontWarnings: {},
    HelpDialog: {},
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

MathJax.Ajax.loadComplete("[MathJax]/localization/en/en.js");
