MathJax.Localization.addTranslation("fr","MathML",{
  isLoaded: true,
  strings: {

    BadMglyph:
      "\u00C9lement mglyph incorrect: %1",

    BadMglyphFont:
      "Police de caract\u00E8re incorrecte: %1",

    MathPlayer:
      "MathJax n'est pas parvenu \u00E0 configurer MathPlayer.\n\n"+
      "Vous devez d'abord installer MathPlayer. Si c'est d\u00E9j\u00E0 le cas,\n"+
      "vos param\u00E8tres de s\u00E9curit\u00E9s peuvent emp\u00EAcher l'ex\u00E9cution des\n"+
      "contr\u00F4les ActiveX. S\u00E9lectionnez Options Internet dans le menu\n"+
      "Outils et s\u00E9lectionnez l'onglet S\u00E9curit\u00E9. Appuyez ensuite sur\n"+
      "le menu Niveau Personalis\u00E9. Assurez vous que les param\u00E8tres\n"+
      "Ex\u00E9cution des contr\u00F4les ActiveX et Comportements des ex\u00E9cutables\n"+
      "et des scripts sont activ\u00E9s.\n\n"+
      "Actuellement, vous verrez des messages d'erreur \u00E0 la place des\n"+
      "expressions math\u00E9matiques.",

   CantCreateXMLParser:
     "MathJax ne peut cr\u00E9er un analyseur grammatical XML pour le MathML",

   UnknownNodeType:
     "Type de noeud inconnu: %1",

   UnexpectedTextNode:
     "Noeud de texte inattendu: %1",

   ErrorParsingMathML:
     "Erreur lors de l'analyse grammaticale du code MathML",

   ParsingError:
     "Erreur lors de l'analyse du code MathML: %1",

   MathMLSingleElement:
    "Le code MathML doit \u00EAtre form\u00E9 d'un unique \u00E9l\u00E9ment",

   MathMLRootElement:
     "Le code MathML doit \u00EAtre form\u00E9 d'un \u00E9l\u00E9ment <math> et non d'un \u00E9l\u00E9ment %1"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/fr/MathML.js");
