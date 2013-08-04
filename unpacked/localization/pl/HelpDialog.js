/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/pl/HelpDialog.js
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

MathJax.Localization.addTranslation("pl","HelpDialog",{
  version: "2.2",
  isLoaded: true,
  strings: {

    Help:
      "Pomoc MathJax",

    MathJax: 
      "*MathJax* to biblioteka Javascript umożliwiająca autorom stron Web na " +
      "zapisywanie wzorów matematycznych. Jako użytkownik, nie musisz robić nic " +
      "dodatkowo, aby wzory były poprawnie wyświetlane.",

    Browsers:
      "*Przeglądarki*: MathJax działa z nowymi przeglądarkami, m.in. IE6+, Firefox 3+, " +
      "Chrome 0.2+, Safari 2+, Opera 9.6+ i większością przeglądarek mobilnych.",

    Menu:
      "*Menu*: MathJax dodaje menu kontekstowe do wzorów matematycznych. Kliknij prawym " +
      "klawiszem myszki (lub lewy klawisz i Ctrl), aby je otworzyć.",

    ShowMath:
      "Opcja *Pokaż wzory jako* pozwala zobaczyć źródłową postać wzorów, aby można " +
      "było je skopiować do schowka.",

    Settings:
      "Opcja *Ustawienia* pozwala kontrolować MathJax, m.in. ustawiać wielkość " +
      "wzorów i zmieniać mechanizm ich wyświetlania.",

    Language:
      "*Język* pozwala wybrać język, w jakim wyświetlane jest menu oraz komunikaty o błędach.",

    Zoom:
      "*Powiększanie*: Jeżeli masz problem z odczytaniem wzoru, MathJax może zwiększyć " +
      "wielkość liter, aby łatwiej było go odczytać.",

    Accessibilty:
      "*Dostępność*: MathJax działa automatycznie z czytnikami ekranowymi, aby wzory " +
      "matematyczne były dostępne dla niedowidzących.",

    Fonts:
      "*Czcionki*: MathJax użyje czcionek matematycznych zainstalowanych w Twoim systemie. " +
      "Jeżeli ich nie masz, to użyje czcionek Web. Nie jest to wymagane, ale lokalnie dostępne " +
      "czcionki przyspieszą działanie MathJax. Sugerujemy zainstalowanie " +
      "czcionek [STIX](%1)."

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/pl/HelpDialog.js");
