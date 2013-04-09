MathJax.Localization.addTranslation("en","v1.0-warning",{
  isLoaded: true,
  strings: {

    MissingConfig:
      "MathJax no longer loads a default configuration file; " +
      "you must specify such files explicitly. " +
      "This page seems to use the older default %1 " +
      "file, and so needs to be updated.  This is explained further at %2"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/en/v1.0-warning.js");
