/**
 * From https://en.wikipedia.org/wiki/User:Nageh/mathJax/config/TeX-AMS-texvc_HTML.js
 */

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  var VERSION = "1.0";

  var MML = MathJax.ElementJax.mml;

  MathJax.Hub.Insert(MathJax.InputJax.TeX.Definitions,{

    mathchar0mi: {
      // Lowercase Greek letters
      thetasym:     '03B8',  // theta
      koppa:        '03DF',
      stigma:       '03DB',
      coppa:        '03D9',  // archaic koppa

      // Ord symbols
      C:            ['0043',{mathvariant: MML.VARIANT.DOUBLESTRUCK}],
      cnums:        ['0043',{mathvariant: MML.VARIANT.DOUBLESTRUCK}],
      Complex:      ['0043',{mathvariant: MML.VARIANT.DOUBLESTRUCK}],
      H:            ['210D',{mathvariant: MML.VARIANT.DOUBLESTRUCK}],
      N:            ['004E',{mathvariant: MML.VARIANT.DOUBLESTRUCK}],
      natnums:      ['004E',{mathvariant: MML.VARIANT.DOUBLESTRUCK}],
      Q:            ['0051',{mathvariant: MML.VARIANT.DOUBLESTRUCK}],
      R:            ['0052',{mathvariant: MML.VARIANT.DOUBLESTRUCK}],
      reals:        ['0052',{mathvariant: MML.VARIANT.DOUBLESTRUCK}],
      Reals:        ['0052',{mathvariant: MML.VARIANT.DOUBLESTRUCK}],
      Z:            ['005A',{mathvariant: MML.VARIANT.DOUBLESTRUCK}],
      sect:         '00A7',  // S
      P:            '00B6',
      AA:           ['00C5',{mathvariant: MML.VARIANT.NORMAL}],  // Å, used for Angstrom
      alef:         ['2135',{mathvariant: MML.VARIANT.NORMAL}],  // aleph
      alefsym:      ['2135',{mathvariant: MML.VARIANT.NORMAL}],  // aleph
      weierp:       ['2118',{mathvariant: MML.VARIANT.NORMAL}],  // wp
      real:         ['211C',{mathvariant: MML.VARIANT.NORMAL}],  // Re
      part:         ['2202',{mathvariant: MML.VARIANT.NORMAL}],  // partial
      infin:        ['221E',{mathvariant: MML.VARIANT.NORMAL}],  // infty
      empty:        ['2205',{mathvariant: MML.VARIANT.NORMAL}],  // emptyset
      O:            ['2205',{mathvariant: MML.VARIANT.NORMAL}],  // emptyset (but should probably be Swedish O)
      ang:          ['2220',{mathvariant: MML.VARIANT.NORMAL}],  // angle
      exist:        ['2203',{mathvariant: MML.VARIANT.NORMAL}],  // exists
      clubs:        ['2663',{mathvariant: MML.VARIANT.NORMAL}],  // clubsuit
      diamonds:     ['2662',{mathvariant: MML.VARIANT.NORMAL}],  // diamondsuit
      hearts:       ['2661',{mathvariant: MML.VARIANT.NORMAL}],  // heartsuit
      spades:       ['2660',{mathvariant: MML.VARIANT.NORMAL}],  // spadesuit
      textvisiblespace: '2423'
    },

    mathchar0mo: {
      // Binary operators
      and:          '2227',  // land
      or:           '2228',  // lor
      bull:         '2219',  // bullet
      plusmn:       '00B1',  // pm
      sdot:         '22C5',  // cdot

      // Binary relations
      sup:          '2283',  // supset
      sub:          '2282',  // subset
      supe:         '2287',  // supseteq
      sube:         '2286',  // subseteq
      isin:         '2208',  // in

      hAar:               '21D4',  // Leftrightarrow [sic]
      hArr:               '21D4',  // Leftrightarrow
      Harr:               '21D4',  // Leftrightarrow
      Lrarr:              '21D4',  // Leftrightarrow
      lrArr:              '21D4',  // Leftrightarrow
      lArr:               '21D0',  // Leftarrow
      Larr:               '21D0',  // Leftarrow
      rArr:               '21D2',  // Rightarrow
      Rarr:               '21D2',  // Rightarrow
      harr:               '2194',  // leftrightarrow
      lrarr:              '2194',  // leftrightarrow
      larr:               '2190',  // leftarrow
      gets:               '2190',  // leftarrow
      rarr:               '2192',   // rightarrow

      // big ops
      oiint:              ['222F',{texClass: MML.TEXCLASS.OP}],  // not part of texvc but nice to have
      oiiint:             ['2230',{texClass: MML.TEXCLASS.OP}]
    },

    mathchar7: {
      // Uppercase Greek letters
      Alpha:        '0391',
      Beta:         '0392',
      Epsilon:      '0395',
      Zeta:         '0396',
      Eta:          '0397',
      Iota:         '0399',
      Kappa:        '039A',
      Mu:           '039C',
      Nu:           '039D',
      Omicron:      '039F',
      Rho:          '03A1',
      Tau:          '03A4',
      Chi:          '03A7',

      Koppa:        '03DE',
      Stigma:       '03DA',
      Coppa:        '03D8'  // archaic Koppa
    },

    delimiter: {
      '\\uarr':           '2191',  // uparrow
      '\\darr':           '2193',  // downarrow
      '\\Uarr':           '21D1',  // Uparrow
      '\\uArr':           '21D1',  // Uparrow
      '\\Darr':           '21D3',  // Downarrow
      '\\dArr':           '21D3',  // Downarrow
      '\\rang':           '27E9',  // rangle
      '\\lang':           '27E8'   // langle
    },

    macros: {
      sgn:                'NamedFn',
      arccot:             'NamedFn',
      arcsec:             'NamedFn',
      arccsc:             'NamedFn',
      bold:               ['Macro','\\mathbf{#1}',1],  // boldsymbol
      href:               'NamedFn', // disable dangerous command
      style:              'NamedFn', // disable dangerous command
      pagecolor:          ['Macro','',1],  // ignore \pagecolor{}
      vline:              ['Macro','\\smash{\\large\\lvert}',0],
      image:              ['Macro','\\Im']
    }

  });
});

MathJax.Hub.Startup.signal.Post("TeX texvc Ready");

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/texvc.js");
