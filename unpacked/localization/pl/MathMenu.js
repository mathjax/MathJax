/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/pl/MathMenu.js
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

MathJax.Localization.addTranslation("pl","MathMenu",{
  version: "2.2",
  isLoaded: true,
  strings: {

    Show: "Pokaż wzory jako",
      MathMLcode:     "Kod MathML",
      OriginalMathML: "Oryginalny kod MathML",
      TeXCommands:    "Komendy TeX",
      AsciiMathInput: "Kod AsciiMathML",
      Original:       "Postać oryginalna",
      ErrorMessage:   "Komunikat Błędu",
      texHints:       "Pokaż dodatki TeX w MathML",
    Settings: "Ustawienia",
      ZoomTrigger: "Powiększanie po...",
        Hover:       "Najechaniu myszką",
        Click:       "Kliknięciu",
        DoubleClick: "Podwójnym kliknięciu",
        NoZoom:      "Nie powiększaj",
      TriggerRequires: "Wymaga przycisku:",
        Option:      "Option",
        Alt:         "Alt",
        Command:     "Command",
        Control:     "Control",
        Shift:       "Shift",
      ZoomFactor:    "Współczynnik powiększenia",
      Renderer: "Mechanizm wyświetlania",
      MPHandles: "Pozwól, aby MathPlayer obsługiwał:",
        MenuEvents:    "Menu",
        MouseEvents:   "Myszkę",
        MenuAndMouse:  "Menu oraz myszkę",
      FontPrefs:  "Wybór czcionek",
        ForHTMLCSS: "HTML-CSS:",
          Auto:         "Automatyczny",
          TeXLocal:     "TeX (lokalne czcionki)",
          TeXWeb:       "TeX (czcionki Web)",
          TeXImage:     "TeX (czcionki obrazkowe)",
          STIXLocal:    "STIX (czcionki lokalne)",
      ContextMenu: "Menu kontekstowe",
        Browser:        "Przeglądarka",
      Scale: "Przeskaluj wszystkie wzory...",
      Discoverable: "Podświetl po najechaniu",
    Locale: "Język",
      LoadLocale: "Załaduj z URL ...",
    About: "O MathJax",
    Help:  "Pomoc MathJax",
       
    localTeXfonts:  "używam lokalnych czcionek TeX",
    webTeXfonts:    "używam czcionek TeX Web",
    imagefonts:     "używam czcionek obrazkowych",
    localSTIXfonts: "używam lokalnych czcionek STIX",
    webSVGfonts:    "używam czcionek SVG Web",
    genericfonts:   "używam ogólnych czcionek Unicode",
      
    wofforotffonts: "czcionki woff lub otf",
    eotffonts:      "czcionki eot",
    svgfonts:       "czcionki svg",

    WebkitNativeMMLWarning:
      "Twoja przeglądarka nie obsługuje natywnie MathML, " +
      "więc przełączenie na MathML może spowodować błędne " +
      "wyświetlanie wzorów.",

    MSIENativeMMLWarning:
      "Internet Explorer wymaga wtyczki MathPlayer, aby obsługiwać " +
      "wyświetlanie MathML.",
      
    OperaNativeMMLWarning:
      "Wsparcie w przeglądarce Opera dla MathML jest ograniczone, więc " +
      "przełączenie na wyświetlanie MathML może spowodować błędne " +
      "wyświetlanie wzorów.",

    SafariNativeMMLWarning:
      "Twoja przeglądarka nie ma pełnego wsparcia dla MathML, więc " +
      "niektóre wzory mogą nie wyświetlać się poprawnie.",

    FirefoxNativeMMLWarning:
      "Twoja przeglądarka nie ma pełnego wsparcia dla MathML, więc " +
      "niektóre wzory mogą nie wyświetlać się poprawnie.",
      
    MSIESVGWarning:
      "Obsługa SVG nie jest dostępna w Internet Explorer do wersji 9 ani " +
      "w trybie emulacji IE8 lub niższego. Tryb wyświetlania w SVG może nie " +
      "działać poprawnie.",
      
    LoadURL:
      "Załaduj tłumaczenie z tego adresu URL:",
      
    BadURL:
      "Adres URL powinien wskazywać na plik Javascript z tłumaczeniem dla MathJax. " +
      "Plik Javascript powinien mieć rozszerzenie '.js'",

    BadData:
      "Nie udało się pobrać tłumaczenia z %1",
     
    SwitchAnyway:
      "Czy mimo wszystko przełączyć wyświetlanie?\n\n" +
      "(Naciśnij OK, aby przełączyć, a Anuluj, aby pozostawić obecny tryb wyświetlania)",

    ScaleMath:
      "Przeskaluj wzory (w odniesieniu do otaczającego ich tekstu) o",

    NonZeroScale:
      "Skala nie może być zerowa",

    PercentScale:
      "Skala powinna być wyrażona w procentach (np. 120%%)",

    IE8warning:
      "Ta opcja wyłączy obsługę menu i powiększania w MathJax, " +
      "ale możesz kliknąć z Altem na wzór, aby otworzyć menu MathJax.\n\n" +
      "Czy na pewno chcesz zmienić ustawienia MathPlayer?",

    IE9warning:
      "Menu kontekstowe MathJax zostanie wyłączone, ale możesz kliknąć " +
      "z Altem na wzór, aby otworzyć menu.",

    NoOriginalForm:
      "Brak wzorów w oryginalnej postaci",

    Close:
      "Zamknij",

    EqSource:
      "Źródło wzoru MathJax"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/pl/MathMenu.js");
