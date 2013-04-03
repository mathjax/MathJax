MathJax.Hub.Insert(MathJax.Localization.strings.fr,{
  isLoaded: true,
  domains: {
    "_": {
      isLoaded: true,
      strings: {

        CookieConfig:
          "MathJax a trouvé un cookie de configuration utilisateur qui inclut"+
          "du code à exécuter. Souhaitez vous l'exécuter?\n\n"+
          "(Choisissez Annuler sauf si vous avez créé ce cookie vous-même",

        MathProcessingError:
          "Erreur de traitement de la formule mathématique",

        MathProcessingErrorHTML:
          ["[Erreur de traitement de la formule mathématique]"],

        MathErrorHTML:
          ["[Erreur dans la formule mathématique]"],

        LoadFile: "Téléchargement %1",

        Loading: "Téléchargement",

        LoadFailed: "Échec du téléchargement de %1",

        CantLoadWebFont: "Impossible de télécharcharger la police Web %1",

        ProcessMath: "Traitement des maths: %1%%",

        Processing: "Traitement",

        TypesetMath: "Composition des maths: %1%%",

        Typesetting: "Composition",

        FirefoxCantLoadWebFont:
          "Firefox ne peut télécharger les polices Web à partir d'un hôte"+
          "distant",

        CantFindFontUsing:
          "Impossible de trouver une police valide en utilisant %1",

        WebFontsNotAvailable:
          "Polices Web non disponibles -- des images de caractères vont être"+
          "utilisées à la place",

        MathJaxNotSupported:
          "Votre navigateur ne supporte pas MathJax"

      }
    },
    MathMenu: {},
    FontWarnings: {},
    "v1.0-warning": {},
    TeX: {},
    MathML: {}
  },

  plural: function(n) {
    if (0 <= n && n < 2) {return 1} // one
    return 2; // other
  },

  number: function(n) {
    return n.replace(".", ","); // replace dot by comma
  }

});

MathJax.Ajax.loadComplete("[MathJax]/localization/fr/fr.js");