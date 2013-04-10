MathJax.Localization.addTranslation("de","FontWarnings",{
  isLoaded: true,
  strings: {

    webFont:
      "MathJax nutz web-basierte Fonts zur Darstellung der Mathematik " +
      "auf dieser Seite. Da diese muessen heruntergeladen werden " +
      "laedt die Seite schneller, wenn Mathe-Fonts auf dem System installiert sind.",
//    "MathJax is using web-based fonts to display the mathematics "+
//    "on this page.  These take time to download, so the page would "+
//    "render faster if you installed math fonts directly in your "+
//    "system's font folder.",

    imageFonts:
      "MathJax nutzt Bild-Fonts stall lokaler Fonts oder Webfonts. " +
      "Das Laden dauert laenger als ueblich und Drucken wird " +
      "evtl. nicht auf hoechster Qualitaet moeglich sein.",
//    "MathJax is using its image fonts rather than local or web-based fonts. "+
//    "This will render slower than usual, and the mathematics may not print "+
//    "at the full resolution of your printer.",

    noFonts:
      "MathJax kann keinen Font zur Darstellung der Mathematik finden "+
      "und Bild-Fonts sind nicht verfuegbar. MathJax weicht auf generische "+
      "Unicode-Zeichen aus in der Hoffnung, Ihr Browser kann diese darstellen. "+
      "Einige oder alle Zeichen koennten nicht korrekt dargestellt werden.",
//    "MathJax is unable to locate a font to use to display "+
//    "its mathematics, and image fonts are not available, so it "+
//    "is falling back on generic unicode characters in hopes that "+
//    "your browser will be able to display them.  Some characters "+
//    "may not show up properly, or possibly not at all.",

    webFonts:
      "Die meisten modernen Browser koennen fonts aus dem Web laden. "+
      "Um die Qualitaet der Mathematik auf dieser Seite zu verbessern, "+
      "sollten Sie ein Update auf eine aktuelle Version des Browsers vornehmen "+
      "(oder einen aktuellen Browser installieren).",
//    "Most modern browsers allow for fonts to be downloaded over the web. "+
//    "Updating to a more recent version of your browser (or changing "+
//    "browsers) could improve the quality of the mathematics on this page.",

    fonts:
      "MathJax kann %1 oder %2 verwenden. "+
      "Herunterladen und installieren dieser Fonts wird Ihre MathJax-Erfahrung verbessern.", //TODO ????
//    "MathJax can use either the %1 or the %2.  " +
//    "Download and install one of those fonts to improve your MathJax experience.",

    PageDesigned:
      "Diese Seite ist optimiert fuer %1. " +
      "Herunterladen und installieren dieser Fonts wird Ihre MathJax-Erfahrung verbessern.", //TODO ????
//    "This page is designed to use the %1.  " +
//    "Download and install those fonts to improve your MathJax experience.",

    STIXfonts:
      "STIX Fonts",
//    "STIX fonts",

    TeXfonts:
      "MathJax TeX Fonts"
//    "MathJax TeX fonts"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/de/FontWarnings.js");
