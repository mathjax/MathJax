MathJax.Localization.addTranslation("fr",null,{
  menuTitle: "Fran\u00E7ais",
  isLoaded: true,
  domains: {
    "_": {
      isLoaded: true,
      strings: {

        CookieConfig:
          "MathJax a trouv\u00E9 un cookie de configuration utilisateur qui inclut "+
          "du code ex\u00E9cutable. Souhaitez vous l'ex\u00E9cuter?\n\n"+
          "(Choisissez Annuler sauf si vous avez cr\u00E9\u00E9 ce cookie vous-m\u00EAme)",

        MathProcessingError:
          "Erreur de traitement de la formule math\u00E9matique",

        MathError:
          "Erreur dans la formule math\u00E9matique",

        LoadFile: "T\u00E9l\u00E9chargement de %1",

        Loading: "T\u00E9l\u00E9chargement",

        LoadFailed: "\u00C9chec du t\u00E9l\u00E9chargement de %1",

        ProcessMath: "Traitement des formules: %1%%",

        Processing: "Traitement",

        TypesetMath: "Composition des formules: %1%%",

        Typesetting: "Composition",

        MathJaxNotSupported:
          "Votre navigateur ne supporte pas MathJax"

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
    if (0 <= n && n < 2) {return 1} // one
    return 2; // other
  },

  number: function(n) {
    return String(n).replace(".", ","); // replace dot by comma
  }

});

MathJax.Ajax.loadComplete("[MathJax]/localization/fr/fr.js");
