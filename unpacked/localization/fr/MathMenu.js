MathJax.Hub.Insert(MathJax.Localization.strings.fr.domains,{
  MathMenu: {
    isLoaded: true,
    strings: {

      Show: "Voir Maths Comme",
        MathMLcode:     "du Code MathML",
        OriginalMathML: "d'Origine MathML",
        TeXCommands:    "Commandes TeX",
        AsciiMathInput: "AsciiMathml Entrée",
        Original:       "Forme Originale",
        ErrorMessage:   "Message d'Erreur",
        texHints:       "Voir les notes TeX dans MathML",
      Settings: "Paramètres Maths",
         ZoomTrigger: "Trigger Zoom",
           Hover:       "Flotter",
           Click:       "Clic de Souris",
           DoubleClick: "Double-Clic",
           NoZoom:      "Pas de Zoom",
         TriggerRequires: "Trigger Nécessite",
           Option:      "Option",
           Alt:         "Alt",
           Command:     "Command",
           Control:     "Control",
           Shift:       "Shift",
         ZoomFactor:    "Facteur de Zoom",
       Renderer: "Traduire Maths",
       MPHandles: "Laissez MathPlayer Gérer:",
         MenuEvents:    "Sélections du menu",
         MouseEvents:   "Êvénements de la Souris",
         MenuAndMouse:  "Les Êvénements de Menu et de la Souris",
       FontPrefs:  "Préférences des Polices",
         ForHTMLCSS: "Pour le HTML-CSS:",
           Auto:         "Auto",
           TeXLocal:     "TeX (local)",
           TeXWeb:       "TeX (web)",
           TeXImage:     "TeX (image)",
           STIXLocal:    "STIX (local)",
       ContextMenu: "Menu Contextuel",
         Browser:        "Navigateur",
       Scale: "Ajuster tous les Maths ...",
       Discoverable: "Mettez en Surbrillance lors de Survol",
       About: "À propos de MathJax",
       Help:  "Aide MathJax",
       
      localTeXfonts:  "utilisant les polices locales TeX",
      webTeXfonts:    "utilisant les polices internet TeX",
      imagefonts:     "utilisant les polices d'image",
      localSTIXfonts: "utilisant les polices locales STIX",
      webSVGfonts:    "utilisant les polices internet SVG",
      genericfonts:   "utilisant les polices locales génériques",
      
      wofforotffonts: "les polices woff ou otf",
      eotffonts:      "les polices eot",
      svgfonts:       "les polices svg",

      WebkitNativeMMLWarning:
        "Votre navigateur ne semble pas comporter de support MathML, " +
        "changer le mode de rendu pourrait rendre illisibles " +
        "les expressions mathématiques.",

      MSIENativeMMLWarning:
        "Internet Explorer a besoin de module complémentaire MathPlayer " + 
        "pour afficher le MathML.",
      
      OperaNativeMMLWarning:
        "Le support MathML d'Opera est limité, changer le mode de rendu " +
        "pourrait entrainer un affichage médiocre de certaines expressions.",

      SafariNativeMMLWarning:
        "Le support MathML natif de votre navigateur ne comporte pas " +
        "toutes les fonctionnalités requises par MathJax, certaines " +
        "expressions pourront donc ne pas s'afficher correctement.",

      FirefoxNativeMMLWarning:
        "Le support MathML natif de votre navigateur ne comporte pas " +
        "toutes les fonctionnalités requises par MathJax, certaines " +
        "expressions pourront donc ne pas s'afficher correctement.",

      SwitchAnyway:
        "Êtes vous certain de vouloir changer le mode de rendu ?\n\n" +
        "Appuyez sur OK pour valider ou Annuler pour continuer avec le " +
        "mode de rendu actuellement sélectionné.",

      ScaleMath:
        "Mise à l'échelle des expressions mathématiques (par rapport au " +
        "text environnant) de %1%%",

      NonZeroScale:
        "L'échelle ne peut être nulle",

      PercentScale:
        "L'échelle doit être un pourcentage (e.g. 120%%)",

      IE8warning:
        "Ceci désactivera le menu de MathJax et les fonctionalités de " +
        "zoom mais vous pourrez toujours obtenir le menu de MathJax " +
        "en utilisant la commande Alt+Clic sur une expression.\n\n" +
        "Êtes vous certain de vouloir choisir les options de MathPlayer?",

      IE9warning:
        "Le menu contextuel de MathJax sera désactivé, " +
        "mais vous pourrez toujours obtenir le menu de MathJax " +
        "en utilisant la commande Alt-Clic sur une expression.",

      NoOriginalForm:
        "Aucune forme d'origine disponible.",

      Close:
        "Fermer",

      EqSource:
        "Source de l'équation MathJax"
    }
  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/fr/MathMenu.js");