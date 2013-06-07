/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/pt/MathML.js
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

MathJax.Localization.addTranslation("pt", "MathML", {
  version: "2.2",
  isLoaded: true,
  strings: {

    BadMglyph:
      "Mglyph ruim: %1",

    BadMglyphFont:
      "Fonte ruim: %1",

    MathPlayer:
      "O MathJax não foi capaz de configurar o MathPlayer.\n\n"+
      "Se o MathPlayer não estiver instalado, precisará instalá-lo primeiro.\n"+
      "Caso contrário, suas configurações de segurança podem estar prevenindo a execução\n"+
      "de controles ActiveX.  Use as Opções de Internet sob\n"+
      "o menu Ferramentas e selecione a aba de Segurança então pressione o\n"+
      "botão Nível Personalizado. Confira se as configurações para\n"+
      "'Execução de Controles ActiveX', e 'Comportamento de scripts e códigos binários'\n"+
      "estão ativadas.\n\n"+
      "Atualmente você verá mensagens de erro em vez da \n"+
      "diagramação das fórmulas matemáticas.",

    CantCreateXMLParser:
      "O MathJax não pode criar um interpretador de XML para o MathML.  Confira se\n"+
      "a configuração de segurança 'Controles de Script ActiveX marcados como seguros para scripting'\n"+
      "está habilitado (use as Opções de Internet no menu \n"+
      "Ferramentas, e selecione o painel de Segurança, depois pressione o botão Nível Personalizado\n"+
      "para conferir isso).\n\n"+
      "As equações em MathML não poderão ser processadas pelo MathJax.",

    UnknownNodeType:
      "Tipo de nó desconhecido: %1",

    UnexpectedTextNode:
      "Nó de texto inesperado: %1",

    ErrorParsingMathML:
      "Erro ao interpretar MathML",

    ParsingError:
      "Erro ao interpretar MathML: %1",

    MathMLSingleElement:
      "MathML deve ser formado por um único elemento",

    MathMLRootElement:
      "MathML deve ser formado por um elemento <math>, não %1"

  }
});
MathJax.Ajax.loadComplete("[MathJax]/localization/pt/MathML.js");