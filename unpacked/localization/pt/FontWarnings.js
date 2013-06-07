/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/pt/FontWarnings.js
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
 *o
 */

MathJax.Localization.addTranslation("pt", "FontWarnings", {
  version: "2.2",
  isLoaded: true,
  strings: {

    webFont:
      "O MathJax está utilizando fontes baseadas em web para exibir as fórmulas matemáticas desta página. O download delas leva algum tempo, então a página seria renderizada mais rapidamente se você instalasse as fontes para matemática diretamente na pasta de fontes do seu sistema.",

    imageFonts:
      "O MathJax está utilizando fontes feitas com imagens em vez de fontes locais ou baseadas em web. Isso torna a renderização mais lenta do que o de costume, e as fórmulas matemáticas poderão não ser impressas com a maior resolução disponível em sua impressora.",

    noFonts:
      "O MathJax não foi capaz de localizar uma fonte para utilizar ao renderizar as fórmulas matemáticas, e não estão disponíveis fontes feitas com imagens, então serão utilizados caracteres unicode genéricos com a esperança de que o seu navegador seja capaz de exibí-los. Alguns caracteres podem não aparecer como deveriam, ou simplesmente desaparecer.",

    webFonts:
      "A maioria dos navegadores modernos permite que as fontes sejam baixadas a partir da web. Atualizar para uma versão mais recente do seu navegador (ou mudar de navegador) poderia melhorar a qualidade das fórmulas matemáticas desta página.",

    fonts:
      "O MathJax pode usar tanto [fontes STIX](%1) ou as [fontes MathJax TeX](%2). Baixe e instale uma destas fontes para melhorar sua experiência com o MathJax.",

    STIXPage:
      "Esta página foi projetada para utilizar [fontes STIX](%1).  Baixe e instale estas fontes para melhorar sua experiência com o MathJax.",

    TeXPage:
      "Esta página foi projetada para utilizar [fontes MathJax TeX](%1). Baixe e instale estas fontes para melhorar sua experiência com o MathJax."

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/pt/FontWarnings.js");