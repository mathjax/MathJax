MathJax.Localization.addTranslation("en",null,{ // NOTE use correct ISO-639-1 two letter code http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
  menuTitle: "English", // NOTE language name; will appear in the MathJax submenu for switching locales
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
          "Math Processing Error", // NOTE: MathJax uses 'Math' as a distinct UI choice. Please translate it literally whenever possible.

        MathError:
          "Math Error", // generic error message

        LoadFile: "Loading %1", 

        Loading: "Loading", // NOTE followed by growing sequence of dots

        LoadFailed: "File failed to load: %1",

        ProcessMath: "Processing Math: %1%%", //NOTE appears during the conversion process from an input format (e.g., LaTeX, asciimath) to MathJax's internal format

        Processing: "Processing", //NOTE followed by growing sequence of dots

        TypesetMath: "Typesetting Math: %1%%",//NOTE appears during the layout process of converting the internal format to the output format

        Typesetting: "Typesetting", //NOTE followed by growing sequence of dots

        MathJaxNotSupported:
          "Your browser does not support MathJax" //NOTE will load when MathJax determines the browser does not have adequate features

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
