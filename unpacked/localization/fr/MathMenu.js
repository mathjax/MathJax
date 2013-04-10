MathJax.Localization.addTranslation("fr","MathMenu",{
  isLoaded: true,
  strings: {

    Show: "Afficher sous forme",
      MathMLcode:     "de code MathML",
      OriginalMathML: "de code MathML originel",
      TeXCommands:    "de commandes TeX",
      AsciiMathInput: "de code AsciiMathML",
      Original:       "originelle",
      ErrorMessage:   "de message d'erreur",
      texHints:       "Inclure les données TeX dans le MathML",
    Settings: "Paramètres",
       ZoomTrigger: "Déclenchement du zoom",
         Hover:       "Survol de la souris",
         Click:       "Clic de souris",
         DoubleClick: "Double-clic",
         NoZoom:      "Pas de zoom",
       TriggerRequires: "Le déclenchement nécessite la touche",
         Option:      "Option",
         Alt:         "Alt",
         Command:     "Command",
         Control:     "Control",
         Shift:       "Shift",
       ZoomFactor:    "Facteur de zoom",
       Renderer: "Mode de rendu",
       MPHandles: "Laissez MathPlayer gérer les",
         MenuEvents:    "Évènements du menu",
         MouseEvents:   "Évènements de la souris",
         MenuAndMouse:  "Évènements de menu et de la souris",
       FontPrefs:  "Préférences des polices",
         ForHTMLCSS: "Pour le HTML-CSS:",
           Auto:         "Auto",
           TeXLocal:     "TeX (locales)",
           TeXWeb:       "TeX (web)",
           TeXImage:     "TeX (image)",
           STIXLocal:    "STIX (locales)",
       ContextMenu: "Menu contextuel",
         Browser:        "Navigateur",
       Scale: "Mise à l'échelle ...",
       Discoverable: "Mettez en surbrillance lors du survol",
     Locale: "Langue",
       LoadLocale: "Charger à partir de l'URL...",
     About: "À propos de MathJax",
     Help:  "Aide MathJax",
       
    localTeXfonts:  "utilisant les polices TeX locales",
    webTeXfonts:    "utilisant les polices TeX Web",
    imagefonts:     "utilisant les images de caractères",
    localSTIXfonts: "utilisant les polices STIX locales",
    webSVGfonts:    "utilisant les polices SVG Web",
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

    LoadURL:
      "Charger les données de traduction à partir de cette addresse URL:",
      
    BadURL:
      "L'adresse URL doit être un fichier Javascript contenant des données de traduction MathJax." +
      "Les noms de fichier Javascript doivent se terminer par '.js'",

    BadData:
     "Échec du chargement des données de traduction à partir de %1",
     
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
      "Aucune forme originelle disponible.",

    Close:
      "Fermer",

    EqSource:
      "Source de l'équation MathJax"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/fr/MathMenu.js");
