MathJax.Localization.addTranslation("fr","MathML",{
  isLoaded: true,
  strings: {

    BadMglyph:
      "Élement mglyph incorrect: %1",

    BadMglyphFont:
      "Police de caractère incorrecte: %1",

    MathPlayer:
      "MathJax n'est pas parvenu à configurer MathPlayer.\n\n"+
      "Vous devez d'abord installer MathPlayer. Si c'est déjà le cas,\n"+
      "vos paramètres de sécurités peuvent empêcher l'exécution des\n"+
      "contrôles ActiveX. Sélectionnez Options Internet dans le menu\n"+
      "Outils et sélectionnez l'onglet Sécurité. Appuyez ensuite sur\n"+
      "le menu Niveau Personalisé. Assurez vous que les paramètres\n"+
      "Exécution des contrôles ActiveX et Comportements des exécutables\n"+
      "et des scripts sont activés.\n\n"+
      "Actuellement, vous verrez des messages d'erreur à la place des\n"+
      "expressions mathématiques.",

   CantCreateXMLParser:
     "MathJax ne peut créer un analyseur grammatical XML pour le MathML",

   UnknownNodeType:
     "Type de noeud inconnu: %1",

   UnexpectedTextNode:
     "Noeud de texte inattendu: %1",

   ErrorParsingMathML:
     "Erreur lors de l'analyse grammaticale du code MathML",

   ParsingError:
     "Erreur lors de l'analyse du code MathML: %1",

   MathMLSingleElement:
    "Le code MathML doit être formé d'un unique élément",

   MathMLRootElement:
     "Le code MathML doit être formé d'un élément <math> et non d'un élément %1"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/fr/MathML.js");
