/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/pt-br/HelpDialog.js
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

MathJax.Localization.addTranslation("pt-br", "HelpDialog", {
  version: "2.2",
  isLoaded: true,
  strings: {

    Help:
      "Ajuda do MathJax",

    MathJax:
      "*MathJax* é uma biblioteca em JavaScript que permite aos autores a inclusão de conteúdo matemático em suas páginas web. Como um renderizador, você não precisa fazer qualquer coisa para que isso ocorra.",

    Browsers:
      "*Navegadores*: O MathJax funciona em todos os navegadores modernos incluindo IE6+, Firefox 3+, Chrome 0.2+, Safari 2+, Opera 9.6+ e a maioria dos navegadores para dispositivos móveis.",

    Menu:
      "*Menu de Fórmulas*: O MathJax acrescenta um menu de contexto às equações. Clique com o botão direito ou pressione CTRL ao clicar em qualquer fórmula matemática para acessar o menu.",

    ShowMath:
      "*Mostrar Fórmulas Como* permite que visualize o código da fórmula para copiar e colar (como MathML ou em seu formato original).",

    Settings:
      "*Configurações* oferecem a você o controle sobre os recursos do MathJax, tais como o tamanho das fórmulas, e o mecanismo utilizado para exibir equações.",

    Language:
      "*Idioma* permite que escolha o idioma que o MathJax utiliza em seus menus e mensagens de aviso.",

    Zoom:
      "*Zoom nas Fórmulas*: Se você tem dificuldade para ler uma equação, o MathJax pode ampliá-la para ajudá-lo a visualizá-la melhor.",

    Accessibilty:
      "*Acessibilidade*: O MathJax funcionará automaticamente em leitores de tela para tornar as fórmulas matemáticas acessíveis aos que possuem problemas de visão.",

    Fonts:
      "*Fontes*: O MathJax utilizará certas fontes para fórmulas matemáticas se elas estiverem instaladas no seu computador; caso contrário, ele utilizará fontes baseadas em web. Embora não seja obrigatório, o uso de fontes instaladas localmente acelerará a diagramação. Sugerimos que instale [fontes STIX](%1)."

  }
});
MathJax.Ajax.loadComplete("[MathJax]/localization/pt-br/HelpDialog.js");