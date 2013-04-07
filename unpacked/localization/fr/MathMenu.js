MathJax.Localization.addTranslation("fr","MathMenu",{
  isLoaded: true,
  strings: {

    Show: "Afficher la Formule sous Forme",
      MathMLcode:     "de Code MathML",
      OriginalMathML: "de Code MathML d'Origine",
      TeXCommands:    "de Commandes TeX",
      AsciiMathInput: "de code AsciiMathml",
      Original:       "d'Origine",
      ErrorMessage:   "de Message d'Erreur",
      texHints:       "Afficher les indications TeX dans le code MathML",
    Settings: "Paramètres des formules",
       ZoomTrigger: "Déclenchement du Zoom par",
         Hover:       "Survol de la Souris",
         Click:       "Clic de Souris",
         DoubleClick: "Double-Clic",
         NoZoom:      "Pas de Zoom",
       TriggerRequires: "Le déclenchement nécessite l'appui sur la touche",
         Option:      "Option",
         Alt:         "Alt",
         Command:     "Command",
         Control:     "Control",
         Shift:       "Shift",
       ZoomFactor:    "Facteur de Zoom",
       Renderer: "Mode de Rendu",
       MPHandles: "Laissez MathPlayer Gérer les",
         MenuEvents:    "Êvénements du menu",
         MouseEvents:   "Êvénements de la Souris",
         MenuAndMouse:  "Êvénements de Menu et de la Souris",
       FontPrefs:  "Préférences des Polices",
         ForHTMLCSS: "Pour le HTML-CSS:",
           Auto:         "Auto",
           TeXLocal:     "TeX (locales)",
           TeXWeb:       "TeX (web)",
           TeXImage:     "TeX (image)",
           STIXLocal:    "STIX (locales)",
       ContextMenu: "Menu Contextuel",
         Browser:        "Navigateur",
       Scale: "Mise à l'échelle des formules ...",
       Discoverable: "Mettez en Surbrillance lors du Survol",
       Locale: "Locales",
         en: "Anglais (en)",
         fr: "Français (fr)",
         LoadLocale: "Charger à partir d'URL ...",
     About: "À Propos de MathJax",
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
      "Internet Explorer a besoin du module complémentaire MathPlayer " + 
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
      "text environnant) de",

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
});

MathJax.Ajax.loadComplete("[MathJax]/localization/fr/MathMenu.js");
