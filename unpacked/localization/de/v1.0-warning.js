MathJax.Localization.addTranslation("de","v1.0-warning",{
  isLoaded: true,
  strings: {

    MissingConfig: //TODO discuss how to get rid of this
      "MathJax l\u00E4dt keine Standardkonfiguration mehr; " +
      "der Author der Seite muss eine Konfigurationsdatei angeben. " +
      "Diese Seite nutze die alte Standardkonfiguration %1 " +
      "und benoetigt ein Update. Siehe auch: %2"
//    "MathJax no longer loads a default configuration file; " +
//    "you must specify such files explicitly. " +
//    "This page seems to use the older default %1 " +
//    "file, and so needs to be updated.  This is explained further at %2"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/de/v1.0-warning.js");
