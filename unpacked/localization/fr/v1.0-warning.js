MathJax.Hub.Insert(MathJax.Localization.strings.fr.domains,{
  "v1.0-warning": {
    isLoaded: true,
    strings: {
      MissingConfig:
        "%1 MathJax ne charge plus de fichier de configuration par défaut; "+
        "vous devez spécifier ces fichiers de façons explicites. Cette "+
        "page semble utiliser l'ancien fichier de configuration par "+
        "défaut %2 and doit donc être mise à jour. Ceci est expliqué "+
        "en détails à l'addresse suivante: %3"
    }
  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/fr/v1.0-warning.js");