MathJax.Localization.addTranslation("en","HTML-CSS",{
  isLoaded: true,
  strings: {

    LoadWebFont:
      "Loading web-font %1", // NOTE %1 is the name of a webfont file

    CantLoadWebFont:
      "Can't load web font %1",

    FirefoxCantLoadWebFont:
      "Firefox can't load web fonts from a remote host",

    CantFindFontUsing:
      "Can't find a valid font using %1",

    WebFontsNotAvailable:
      "Web-Fonts not available -- using image fonts instead"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/en/HTML-CSS.js");
