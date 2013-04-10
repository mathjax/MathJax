MathJax.Localization.addTranslation("fr","FontWarnings",{
  isLoaded: true,
  strings: {

    webFont:
      "MathJax utilise les polices Web pour afficher les expressions " +
      "mathématiques sur cette page. Celles-ci mettent du temps à être "+
      "téléchargées et la page serait affichée plus rapidement si vous "+
      "installiez les polices mathématiques directement dans le dossier "+
      "des polices de votre système.",

    imageFonts:
      "MathJax utilise des images de caractères plutôt que les polices "+
      "Web ou locales. Ceci rend le rendu plus lent que la normale et "+
      "les expressions mathématiques peuvent ne pas s'imprimer à la "+
      "résolution maximale de votre imprimante",

    noFonts:
      "MathJax n'est pas parvenu à localiser une police pour afficher "+
      "les expressions mathématiques et les images de caractères ne "+
      "sont pas disponibles. Comme solution de dernier recours, il "+
      "utilise des caractères Unicode génériques en espérant que votre "+
      "navigateur sera capable de les afficher. Certains pourront "+
      "être rendus de façon incorrect voire pas du tout.",

    webFonts:
      "La plupart des navigateurs modernes permettent de télécharger "+
      "des polices à partir du Web. En mettant à jour votre navigateur "+
      "vers une version plus récente (ou en changeant de navigateur) "+
      "la qualité des expressions mathématiques sur cette page pourrait "+
      "être améliorée.",

    fonts:
      "MathJax peut utiliser les [Polices STIX](%1) ou bien les " +
      "[Polices TeX de MathJax](%2). Téléchargez et installez " +
      "l'une de ces familles de polices pour améliorer votre "+
      "expérience avec MathJax.",

    TeXPage:
      "Cette page est conçue pour utiliser les [Polices STIX](%1). " +
      "Téléchargez et installez ces polices pour améliorer votre " +
      "expérience avec MathJax",

    TeXPage:
      "Cette page est conçue pour utiliser les [Polices TeX de MathJax](%1). " +
      "Téléchargez et installez ces polices pour améliorer votre " +
      "expérience avec MathJax"
      
  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/fr/FontWarnings.js");
