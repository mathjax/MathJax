/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/localization/pl/TeX.js
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

MathJax.Localization.addTranslation("pl","TeX",{
  version: "2.2",
  isLoaded: true,
  strings: {

    ExtraOpenMissingClose:
      "Nadmiarowy nawias otwierający lub brakujący nawias zamykający",

    ExtraCloseMissingOpen:
      "Nadmiarowy nawias zamykający lub brakujący nawias otwierający",

    MissingLeftExtraRight:
      "Brakujący \\left lub nadmiarowy \\right",

    MissingScript:
      "Brakujący argument dla indeksu dolnego lub górnego",

    ExtraLeftMissingRight:
      "Nadmiarowy \\left lub brakujący \\right",

    Misplaced:
      "Źle umiejscowiony %1",

    MissingOpenForSub:
      "Brakujący nawias otwierający dla indeksu dolnego",

    MissingOpenForSup:
      "Brakujący nawias otwierający dla ineksu górnego",

    AmbiguousUseOf:
      "Nieropoznane użycie %1",

    EnvBadEnd:
      "\\begin{%1} został zakończony \\end{%2}",

    EnvMissingEnd:
      "Brakuje \\end{%1}",

    MissingBoxFor:
      "Brakuje pudełka (box) dla %1", 

    MissingCloseBrace:
      "Brakuje nawiasu zamykającego",

    UndefinedControlSequence:
      "Nieznana komenda sterująca %1",

    DoubleExponent:
      "Podwójna potęga: użyj nawiasów, aby uniknąć niejednoznaczności",

    DoubleSubscripts:
      "Podwójny indeks: użyj nawiasów, aby uniknąć niejednoznaczności",

    DoubleExponentPrime:
      "Znak ' oznacza podwójny wykładnik: użyj nawiasów, aby uniknąć niejednoznaczności",

    CantUseHash1:
      "Nie możesz używać znaku # w trybie matematycznym",

    MisplacedMiddle:
      "%1 musi być pomiędzy \\left i \\right",

    MisplacedLimits:
      "%1 jest dozwolony tylko dla operatorów",

    MisplacedMoveRoot:
      "%1 może pojawić się tylko w ramach korzenia (root)",

    MultipleCommand:
      "Wielokrotny %1",

    IntegerArg:
      "Parametr dla %1 musi być liczbą całkowitą",

    NotMathMLToken:
      "%1 nie jest elementem typu token",

    InvalidMathMLAttr:
      "Nieprawidłowy atrybut MathML: %1",

    UnknownAttrForElement:
      "%1 nie jest znanym atrybutem dla %2",

    MaxMacroSub1:
      "Przekroczono maksymalną liczbę wywołań makra; " +
      "czy występuje rekursywne makro?",

    MaxMacroSub2:
      "Przekroczono maksymalną liczbę zastąpień; " +
      "czy występuje rekursywne środowisko latex?",

    MissingArgFor:
      "Brakuje argumentu dla %1",

    ExtraAlignTab:
      "Nadmiarowy tabulator w \\cases",

    BracketMustBeDimension:
      "Argument w nawiasie dla %1 musi być wymiarem",

    InvalidEnv:
      "Nieznane nazwa środowiska '%1'",

    UnknownEnv:
      "Nieznane środowisko '%1'",

    ExtraClose:
      "Nadmiarowy nawias zamykający",

    ExtraCloseLooking:
      "Nadmiarowy nawias zamykający napotkany w czasie poszukiwania %1",

    MissingCloseBracket:
      "Nie odnaleziono zamykającego nawiasu ']' dla argumentu dla %1",

    MissingOrUnrecognizedDelim:
      "Nieodnaleziony lub nieropoznany separator dla %1",

    MissingDimOrUnits:
      "Brakuje wymiaru lub jego jednostki dla %1",

    TokenNotFoundForCommand:
      "Nie odnaleziono %1 dla %2",

    MathNotTerminated:
      "Nie odnaleziono zakończenia w pudełku (box)",

    IllegalMacroParam:
      "Nieprawidłowa referencja do parametru makra",

    MaxBufferSize:
      "Przekroczono rozmiar bufora MathJax, czy istnieje rekursywne wywołanie makra?",

 /* AMSmath */
 
    CommandNotAllowedInEnv:
      "%1 nie jest dozwolony w środowisku %2", 

    MultipleLabel:
      "Wielokrotna definicja etykiety '%1'",

    CommandAtTheBeginingOfLine:
      "%1 musi znajdować się na początku linii",

    IllegalAlign:
      "Nieprawidłowy argument dla %1",

    BadMathStyleFor:
      "Błędny styl dla %1",

    PositiveIntegerArg:
      "Argument dla %1 musi być dodatnią liczbą całkowitą",

    ErroneousNestingEq:
      "Błędne zagnieżdzenie wyrażen",

    MultlineRowsOneCol:
      "Wiersze w środowisku %1 musza mieć dokładnie jedną kolumnę",

/* bbox */

    MultipleBBoxProperty:
      "%1 okreslony dwa razy w %2",

    InvalidBBoxProperty:
      "'%1' nie jest kolorem, wielkością odstępu, ani stylem",

/* begingroup */

    ExtraEndMissingBegin:
      "Nadmiarowy %1 lub brakujący \\begingroup",

    GlobalNotFollowedBy:
      "Po %1 nie występuje \\let, \\def, ani \\newcommand",

/* color */

    UndefinedColorModel:
      "Przetrzeń barw '%1' nie jest zdefiniowana",

    ModelArg1:
      "Wartości kolorów dla przestrzeni %1 wymagają 3 liczb",

    InvalidDecimalNumber:
      "Nieprawidłowe liczba dziesiętna",

    ModelArg2:
      "Wartości kolorów dla przestrzeni %1 muszą być pomiędzy %2 i %3",

    InvalidNumber:
      "Błędna liczba",

/* extpfeil */

    NewextarrowArg1:
      "Pierwszy argument dla %1 musi być nazwą sekwencji kontrolnej",

    NewextarrowArg2:
      "Drugi argumentem dla %1 muszą być dwie liczby całkowite oddzielone przecinkiem",

    NewextarrowArg3:
      "Trzeci argument dla %1 musi być numerem znaku unicode",

/* mhchem */

    NoClosingChar:
      "Nie można odnaleźć zamykającego %1",

/* newcommand */
      
    IllegalControlSequenceName:
      "Nieprawidłowa nazwa sekwencji kontrolnej dla %1",

    IllegalParamNumber:
      "Nieprawidłowa liczba parametrów dla %1",

    DoubleBackSlash:
      "Po \\ musi wystąpić sekwencja kontrolna",

    CantUseHash2:
      "Nieprawidłowe użycie # w szablonie dla %1",

    SequentialParam:
      "Parametry dla %1 muszą być ponumerowane rosnąco",

    MissingReplacementString:
      "Brak łańcucha zamiennego dla definicji %1",

    MismatchUseDef:
      "Użycie %1 niezgodne z definicją",

    RunawayArgument:
      "Zginął argument dla %1?",

/* verb */

    NoClosingDelim:
      "Nie można znaleźć kończącego separatora dla %1"
 
  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/pl/TeX.js");
