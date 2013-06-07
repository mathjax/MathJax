/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/pt-br/pt-br.js
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

MathJax.Localization.addTranslation("pt-br", null, { // IETF language tag
  menuTitle: "português do Brasil",
  version: "2.2",
  isLoaded: true,
  domains: {
    _: {
      version: "2.2",
      isLoaded: true,
      strings: {

        CookieConfig:
          "O MathJax encontrou um cookie com configurações de usuário que inclui código a ser executado. Deseja executá-lo?\n\n(Você deve pressionar Cancelar a não ser que você mesmo tenha criado o cookie.)",

        MathProcessingError:
          "Erro no Processamento das Fórmulas",

        MathError:
          "Erro nas Fórmulas",

        LoadFile:
          "Carregando %1",

        Loading:
          "Carregando",

        LoadFailed:
          "O arquivo não pode ser carregado: %1",

        ProcessMath:
          "Processando Fórmula: %1%%",

        Processing:
          "Processando",

        TypesetMath:
          "Realizando a Diagramação das Fórmulas: %1%%",

        Typesetting:
          "Realizando a Diagramação",

        MathJaxNotSupported:
          "Seu navegador não suporta MathJax"
      }
    },
    MathMenu: {},
    FontWarnings: {},
    HelpDialog: {},
    TeX: {},
    MathML: {},
    "HTML-CSS": {}
  },
  plural: function (n) {
    if (n === 1) {return 1}
    return 2;
  },
  number: function (n) {
    return n;
  }

});

MathJax.Ajax.loadComplete("[MathJax]/localization/pt-br/pt-br.js");