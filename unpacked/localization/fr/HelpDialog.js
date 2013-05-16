/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/fr/HelpDialog.js
 *  
 *  Copyright (c) 2013 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

MathJax.Localization.addTranslation("fr","HelpDialog",{
  version: "2.2",
  isLoaded: true,
  strings: {

    Help: "Aide MathJax",

    MathJax: 
     "*MathJax* est une librairie Javascript qui permet aux auteurs " +
     "d'inclure des formules math\u00E9matiques au sein de leurs pages Web. " +
     "Aucune action suppl\u00E9mentaire n'est n\u00E9cessaire de la part des visiteurs.", 

    Browsers:
      "*Navigateurs*: MathJax fonctionne avec tous les navigateurs modernes " +
      "y compris Internet Explorer 6, Firefox 3, " +
      "Chrome 0.2, Safari 2, Opera 9.6 et leurs versions sup\u00E9rieures ainsi " +
      "que la plupart des navigateurs pour mobiles et tablettes.",

    Menu:
      "*Menu Math\u00E9matiques*: MathJax ajoute un menu contextuel aux \u00E9quations. "+
      "Acc\u00E9dez au menu en effectuant un clic droit ou un Ctrl+clic sur " +
      "n'importe quelle formule math\u00E9matique.",

    ShowMath:
      "Le menu *Afficher sous forme* vous permet de voir le code source de la "+
      "formule pour la copier et coller (sous forme MathML ou sous son format "+
      "d'origine).",

    Settings:
      "Le menu *Param\u00E8tres* vous permet de contr\u00F4ler diverses "+
      "caract\u00E9ristiques de MathJax, telles que la taille des formules "+
      "math\u00E9matiques ou le m\u00E9canisme utilis\u00E9 pour afficher ces formules.",

    Language:
      "Le menu *Langue* vous permet de s\u00E9lectionnez la langue utilis\u00E9e par "+
      "MathJax pour ses menus et messages d'avertissement.",

    Zoom:
      "*Math Zoom*: si vous rencontrez des difficult\u00E9s pour lire les formules "+
      "math\u00E9matiques, MathJax peut les agrandir de fa\u00E7on \u00E0 ce qu'elles soient "+
      "plus lisibles.",

    Accessibilty:
      "*Accessibilit\u00E9*: MathJax fonctionnera automatiquement avec les "+
      "lecteurs d'\u00E9cran pour rendre les expressions math\u00E9matiques accessibles "+
      "aux personnes malvoyantes.",

    Fonts:
      "*Polices*: MathJax utilisera certaines polices math\u00E9matiques si elles "+
      "sont intall\u00E9es sur votre syst\u00E8me ou bien des polices Web dans le cas "+
      "contraire. Bien que non recquises, ces polices install\u00E9es sur votre "+
      "syst\u00E8me acc\u00E9lereront le rendu des expressions math\u00E9matiques. Nous "+
      "recommandons d'installer les [Polices STIX](%1)."

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/fr/HelpDialog.js");
