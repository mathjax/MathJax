/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/pt/MathMenu.js
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

MathJax.Localization.addTranslation("pt", "MathMenu", {
  version: "2.2",
  isLoaded: true,
  strings: {

    Show: "Mostrar Fórmulas Como",
      MathMLcode: "Código MathML",
      OriginalMathML: "MathML Original",
      TeXCommands: "Comandos TeX",
      AsciiMathInput: "Entrada AsciiMathML",
      Original: "Forma Original",
      ErrorMessage: "Mensagem de Erro",
      texHints: "Mostrar dicas de TeX em MathML",
    Settings: "Configuração das Fórmulas",
      ZoomTrigger: "Disparador do Zoom",
        Hover: "Passagem do Mouse",
        Click: "Clique",
        DoubleClick: "Clique Duplo",
        NoZoom: "Sem Zoom",
      TriggerRequires: "O Disparador Requer:",
        Option: "Opção",
        Alt: "Alt",
        Command: "Command",
        Control: "Control",
        Shift: "Shift",
      ZoomFactor: "Fator de Zoom",
      Renderer: "Renderizador das Fórmulas",
      MPHandles: "Deixe que o MathPlayer resolva:",
        MenuEvents: "Eventos de Menu",
        MouseEvents: "Eventos de Mouse",
        MenuAndMouse: "Eventos de Mouse e de Menu",
      FontPrefs: "Preferências de Fontes",
        ForHTMLCSS: "Para HTML-CSS:",
          Auto: "Automático",
          TeXLocal: "TeX (local)",
          TeXWeb: "TeX (web)",
          TeXImage: "TeX (imagem)",
          STIXLocal: "STIX (local)",
      ContextMenu: "Menu de Contexto",
        Browser: "Navegador",
      Scale: "Redimensionar Todas as Fórmulas ...",
      Discoverable: "Destacar ao Passar o Mouse",
    Locale: "Idioma",
      LoadLocale: "Carregar a partir de URL ...",
    About: "Sobre o MathJax",
    Help: "Ajuda do MathJax",

    localTeXfonts: "usando fontes TeX locais",
    webTeXfonts: "usando fontes TeX da web",
    imagefonts: "usando fontes feitas com imagens",
    localSTIXfonts: "usando fontes STIX",
    webSVGfonts: "usando fontes SVG da web",
    genericfonts: "usando fontes unicode genéricas",

    wofforotffonts: "fontes woff ou otf",
    eotffonts: "fontes eot",
    svgfonts: "fontes svg",

    WebkitNativeMMLWarning: "Não parece haver suporte nativo a MathML em seu navegador, então a mudança para MathML pode tornar ilegíveis as fórmulas matemáticas da página.",

    MSIENativeMMLWarning: "O Internet Explorer requer o plugin MathPlayer para processar MathML.",

    OperaNativeMMLWarning: "O suporte a MathML no Opera é limitado, então a mudança para MathML pode piorar a renderização de algumas expressões.",

    SafariNativeMMLWarning: "O suporte a MathML nativo do seu navegador não implementa todos os recursos usados pelo MathJax, então algumas expressões podem não ser exibidas adequadamente.",

    FirefoxNativeMMLWarning: "O suporte a MathML nativo do seu navegador não implementa todos os recursos usados pelo MathJax, então algumas expressões podem não ser exibidas adequadamente.",

    MSIESVGWarning: "Não há uma implementação de SVG nas versões do Internet Explorer anteriores ao IE9 ou quando ele está emulando o IE8 ou as versões anteriores. A mudança para SVG fará com que as fórmulas não sejam exibidas adequadamente.",

    LoadURL: "Carregar os dados de tradução a partir desta URL:",

    BadURL: "A URL deve ser para um um arquivo de javascript que defina os dados de tradução do MathJax. Os nomes dos arquivos de Javascript devem terminar com '.js'",

    BadData: "Falha ao carregar os dados de tradução de %1",

    SwitchAnyway: "Mudar para este renderizador mesmo assim?\n\n(Pressione OK para mudar, CANCELAR para continuar com o renderizador atual)",

    ScaleMath: "Redimensionar todas as fórmulas matemáticas (em relação ao texto à sua volta) em",

    NonZeroScale: "A escala não deve ser zero",

    PercentScale: "A escala deve ser uma porcentagem (por exemplo, 120%%)",

    IE8warning: "Isto desabilitará o menu MathJax e os recursos de zoom, mas você poderá usar Alt-Clique em uma expressão para obter o menu MathJax em vez disso.\n\nRealmente alterar as configurações do MathPlayer?",

    IE9warning: "O menu de contexto do MathJax será desabilitado, mas você pode usar Alt-Clique em uma expressão para obter o menu MathJax em vez disso.",

    NoOriginalForm: "Sem uma forma original disponível",

    Close: "Fechar",

    EqSource: "Fonte da Equação do MathJax"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/pt/MathMenu.js");