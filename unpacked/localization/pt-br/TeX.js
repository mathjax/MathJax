/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/pt-br/TeX.js
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

MathJax.Localization.addTranslation("pt-br", "TeX", {
  version: "2.2",
  isLoaded: true,
  strings: {

    ExtraOpenMissingClose:
      "Sobrou uma chave de abertura ou faltou uma de fechamento",

    ExtraCloseMissingOpen:
      "Sobrou uma chave de fechamento ou faltou uma de abertura",

    MissingLeftExtraRight:
      "Faltou um \\left ou sobrou um \\right",

    MissingScript:
      "Faltou o argumento de um sobrescrito ou de um subscrito",

    ExtraLeftMissingRight:
      "Sobrou um \\left ou faltou um \\right",

    Misplaced:
      "%1 fora do lugar",

    MissingOpenForSub:
      "Faltou uma chave de abertura para o subscrito",

    MissingOpenForSup:
      "Faltou uma chave de abertura para o sobrescrito",

    AmbiguousUseOf:
      "Uso ambíguo de %1",

    EnvBadEnd:
      "\\begin{%1} foi terminado com \\end{%2}",

    EnvMissingEnd:
      "Faltou \\end{%1}",

    MissingBoxFor:
      "Faltou uma caixa para %1",

    MissingCloseBrace:
      "Faltou uma chave de fechamento",

    UndefinedControlSequence:
      "Sequência de controle indefinida %1",

    DoubleExponent:
      "Expoente duplo: utilize chaves para esclarecer",

    DoubleSubscripts:
      "Subscrito duplo: utilize chaves para esclarecer",

    DoubleExponentPrime:
      "Prime causa expoente duplo: utilize chaves para esclarecer",

    CantUseHash1:
      "Você não pode usar o caractere # que indica um parâmetro de macro no modo matemático",

    MisplacedMiddle:
      "%1 deve estar entre \\left e \\right",

    MisplacedLimits:
      "%1 só é permitido nos operadores",

    MisplacedMoveRoot:
      "%1 pode aparecer somente dentro de uma raiz",

    MultipleCommand:
      "Repetição de %1",

    IntegerArg:
      "O argumento de %1 deve ser um inteiro",

    NotMathMLToken:
      "%1 não é um elemento de token",

    InvalidMathMLAttr:
      "Atributo MathML inválido: %1",

    UnknownAttrForElement:
      "%1 não é um atributo reconhecido para %2",

    MaxMacroSub1:
      "Foi excedido o máximo de substituições de macros do MathJax; há alguma chamada a uma macro recursiva?",

    MaxMacroSub2:
      "Foi excedido o máximo de substituições do MathJax; há algum ambiente latex recursivo?",

    MissingArgFor:
      "Faltou um argumento para %1",

    ExtraAlignTab:
      "Sobrou um tab de alinhamento no texto de \\cases",

    BracketMustBeDimension:
      "O argumento nos colchetes de %1 deve ser uma dimensão",

    InvalidEnv:
      "Nome de ambiente inválido '%1'",

    UnknownEnv:
      "Ambiente desconhecido '%1'",

    ExtraClose:
      "Sobrou uma chave de fechamento",

    ExtraCloseLooking:
      "Sobrou uma chave de fechamento ao procurar por %1",

    MissingCloseBracket:
      "Não foi encontrado um ']' de fechamento para o argumento de %1",

    MissingOrUnrecognizedDelim:
      "O delimitador para %1 está ausente ou não foi reconhecido",

    MissingDimOrUnits:
      "Faltou a dimensão ou a unidade de %1",

    TokenNotFoundForCommand:
      "Não foi encontrado %1 para %2",

    MathNotTerminated:
      "A fórmula não foi terminada na caixa de texto",

    IllegalMacroParam:
      "Referência inválida a um parâmetro de macro",

    MaxBufferSize:
      "O tamanho do buffer interno do MathJax foi excedido; há alguma chamada a uma macro recursiva?",

    CommandNotAllowedInEnv:
      "%1 não é permitido no ambiente %2",

    MultipleLabel:
      "O rótulo '%1' foi definido mais de uma vez",

    CommandAtTheBeginingOfLine:
      "%1 deve vir no início da linha",

    IllegalAlign:
      "Foi especificado um alinhamento ilegal em %1",

    BadMathStyleFor:
      "Estilo de fórmulas matemáticas ruim para %1",

    PositiveIntegerArg:
      "O argumento para %1 deve ser um inteiro positivo",

    ErroneousNestingEq:
      "Aninhamento incorreto de estruturas de equações",

    MultlineRowsOneCol:
      "As linhas do ambiente %1 devem ter apenas uma coluna",

    MultipleBBoxProperty:
      "%1 foi especificado duas vezes em %2",

    InvalidBBoxProperty:
      "'%1' não parece ser uma cor, uma dimensão para padding, nem um estilo",

    ExtraEndMissingBegin:
      "Sobrou um %1 ou faltou um \\begingroup",

    GlobalNotFollowedBy:
      "%1 não foi seguido por um \\let, \\def, ou \\newcommand",

    UndefinedColorModel:
      "O modelo de cores '%1' não foi definido",

    ModelArg1:
      "Os valores de cor para o modelo %1 exigem 3 números",

    InvalidDecimalNumber:
      "Número decimal inválido",

    ModelArg2:
      "Os valores de cor para o modelo %1 devem estar entre %2 e %3",

    InvalidNumber:
      "Número inválido",

    NewextarrowArg1:
      "O primeiro argumento de %1 deve ser o nome de uma sequência de controle",

    NewextarrowArg2:
      "O segundo argumento de %1 deve ser composto de dois inteiros separados por uma vírgula",

    NewextarrowArg3:
      "O terceiro argumento de %1 deve ser o número de um caractere unicode",

    NoClosingChar:
      "Não foi possível encontrar um %1 de fechamento",

    IllegalControlSequenceName:
      "Nome ilegal para uma sequência de controle de %1",

    IllegalParamNumber:
      "Número ilegal de parâmetros especificado em %1",

    DoubleBackSlash:
      "\\ deve ser seguido por uma sequência de controle",

    CantUseHash2:
      "Uso ilegal de # em um modelo para %1",

    SequentialParam:
      "Os parâmetros para %1 devem ser numerados sequencialmente",

    MissingReplacementString:
      "Faltou a string de substituição para a definição de %1",

    MismatchUseDef:
      "O uso de %1 não está de acordo com sua definição",

    RunawayArgument:
      "Argumento extra para %1?",

    NoClosingDelim:
      "Não foi encontrado um delimitador de fechamento para %1"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/pt-br/TeX.js");