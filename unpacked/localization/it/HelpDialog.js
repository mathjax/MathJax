/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/it/HelpDialog.js
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

MathJax.Localization.addTranslation("it","HelpDialog",{
  version: "2.2",
  isLoaded: true,
  strings: {

    Help:
      "Aiuto su MathJax",
      //"MathJax Help",

    MathJax: 
      "*MathJax* \u00E8 una libreria JavaScript che permette agli autori di includere " +
      "formule matematiche nelle loro pagine web. Come lettore, non devi " +
      "far nulla perch\u00E9 questo accada.",
      //"*MathJax* is a JavaScript library that allows page authors to include " + // NOTE: Markdown syntax *...*
      //"mathematics within their web pages.  As a reader, you don't need to do " +
      //"anything to make that happen.",

    Browsers:
      "*Browser*: MathJax funziona con tutti i moderni browser inclusi IE6+, " +
      "Firefox 3+, Chrome 0.2+, Safari 2+, Opera 9.6+ e gran parte di quelli per " +
      "cellulare.",
      //"*Browsers*: MathJax works with all modern browsers including IE6+, Firefox 3+, " +
      //"Chrome 0.2+, Safari 2+, Opera 9.6+ and most mobile browsers.",

    Menu:
      "*Menu Formule*: MathJax aggiunge un menu contestuale alle equazioni. Fai click " +
      "col tasto destro del mouse oppure CTRL-click su una qualsiasi formula per " +
      "accedere a tale menu.",
      //"*Math Menu*: MathJax adds a contextual menu to equations.  Right-click or " +
      //"CTRL-click on any mathematics to access the menu.",

    ShowMath:
      "*Mostra formula come* ti permette di visualizzare il codice sorgente " +
      "per il copia e incolla (in formato MathML o in quello originale).",
      //"*Show Math As* allows you to view the formula's source markup " +
      //"for copy & paste (as MathML or in its original format).",

    Settings:
      "*Impostazioni* permette di controllare le caratteristiche di MathJax, " +
      "come la grandezza delle formule e il meccanismo usato per mostrare " +
      "le equazioni.",
      //"*Settings* gives you control over features of MathJax, such as the " +
      //"size of the mathematics, and the mechanism used to display equations.",

    Language:
      "*Lingua* ti permette di selezionare la lingua usata da MathJax nei propri " +
      "menu e nei messaggi d'avviso.",
      //"*Language* lets you select the language used by MathJax for its menus " +
      //"and warning messages.",

    Zoom:
      "*Zoom formula*: se hai difficolt\u00E1 nella lettura di un'equazione, MathJax pu\u00F2 " +
      "ingrandirla per permetterti di vederla meglio.",
      //"*Math Zoom*: If you are having difficulty reading an equation, MathJax can " +
      //"enlarge it to help you see it better.",

    Accessibilty:
      "*Accessibilit\u00E1*: MathJax funzioner\u00E1 automaticamente con gli screen reader " +
      "per rendere le formule accessibili a chi ha problemi di vista.",
      //"*Accessibility*: MathJax will automatically work with screen readers to make " +
      //"mathematics accessible to the visually impaired.",

    Fonts:
      "*Font*: MathJax user\u00E1 certi tipi di font se presenti sul tuo computer; " +
      "altrimenti usera i web font. Sebbene non sia richiesto, font installati " +
      "sul proprio computer velocizzeranno l'esecuzione di MathJax. Ti suggeriamo " +
      "di installare se puoi gli [STIX font](%1)."
      //"*Fonts*: MathJax will use certain math fonts if they are installed on your " +
      //"computer; otherwise, it will use web-based fonts.  Although not required, " +
      //"locally installed fonts will speed up typesetting.  We suggest installing " +
      //"the [STIX fonts](%1)." // NOTE: Markdown syntax for links. %1 is a URL to the STIX fonts

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/it/HelpDialog.js");
