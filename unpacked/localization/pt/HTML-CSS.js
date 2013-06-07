/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/pt/HTML-CSS.js
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

MathJax.Localization.addTranslation("pt", "HTML-CSS", {
  version: "2.2",
  isLoaded: true,
  strings: {

    LoadWebFont:
      "Carregando fonte baseada em web %1",

    CantLoadWebFont:
      "Não foi possível carregar a fonte baseada em web %1",

    FirefoxCantLoadWebFont:
      "O Firefox Não pode carregar fontes baseadas em web a partir de um host remoto",

    CantFindFontUsing:
      "Não é possível encontrar uma fonte válida usando %1",

    WebFontsNotAvailable:
      "Fontes baseadas em web não estão disponíveis -- usando fontes feitas com imagens em vez disso"

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/pt/HTML-CSS.js");