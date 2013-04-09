MathJax.Localization.addTranslation("en","FontWarnings",{
  isLoaded: true,
  strings: {

    webFont:
      "MathJax is using web-based fonts to display the mathematics "+
      "on this page.  These take time to download, so the page would "+
      "render faster if you installed math fonts directly in your "+
      "system's font folder.",

    imageFonts:
      "MathJax is using its image fonts rather than local or web-based fonts. "+
      "This will render slower than usual, and the mathematics may not print "+
      "at the full resolution of your printer.",

    noFonts:
      "MathJax is unable to locate a font to use to display "+
      "its mathematics, and image fonts are not available, so it "+
      "is falling back on generic unicode characters in hopes that "+
      "your browser will be able to display them.  Some characters "+
      "may not show up properly, or possibly not at all.",

    webFonts:
      "Most modern browsers allow for fonts to be downloaded over the web. "+
      "Updating to a more recent version of your browser (or changing "+
      "browsers) could improve the quality of the mathematics on this page.",

    fonts:
      "MathJax can use either the %1 or the %2.  " +
      "Download and install one of those fonts to improve your MathJax experience.",

    PageDesigned:
      "This page is designed to use the %1.  " +
      "Download and install those fonts to improve your MathJax experience.",

    STIXfonts:
      "STIX fonts",

    TeXfonts:
      "MathJax TeX fonts"
  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/en/FontWarnings.js");
