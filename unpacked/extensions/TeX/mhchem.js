/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/extensions/TeX/mhchem.js
 *
 *  Implements the \ce command for handling chemical formulas
 *  from the mhchem LaTeX package.
 *
 *  ---------------------------------------------------------------------
 *
 *  Copyright (c) 2011-2015 The MathJax Consortium
 *  Copyright (c) 2015-2016 Martin Hensel
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

MathJax.Extension["TeX/mhchem"] = {
  version: "2.6.0 succ"
};

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {

  var TEX = MathJax.InputJax.TeX;

  /*
   *  This is the main class for handing the \ce and related commands.
   *  Its main method is Parse() which takes the argument to \ce and
   *  returns the corresponding TeX string.
   */

  var CE = MathJax.Object.Subclass({
    string: '',   // the \ce string being parsed

    //
    //  Store the string when a CE object is created
    //
    Init: function (string) { this.string = string; },

    //
    //  This converts the CE string to a TeX string.
    //
    Parse: function () {
      try {
        return texify.go(mhchemParser.go(this.string));
      } catch (ex) {
        TEX.Error(ex);
      }
    }
  });

  //
  // Core parser for mhchem syntax  (recursive)
  //
  var mhchemParser = {};
  //
  // Parses mchem \ce syntax
  //
  // Call like
  //   go('H2O');
  //
  // Looks through mhchemParser.transitions, to execute a matching action
  // (recursive)
  //
  mhchemParser.go = function(input, stateMachine) {
    if (!input) { return input; }
    if (stateMachine === undefined) { stateMachine = 'ce'; }
    var state = '0';

    //
    // String buffers for parsing:
    //
    // buffer.a == amount
    // buffer.o == element
    // buffer.b == left-side superscript
    // buffer.p == left-side subscript
    // buffer.q == right-side subscript
    // buffer.d == right-side superscript
    //
    // buffer.r == arrow
    // buffer.rdt == arrow, script above, type
    // buffer.rd == arrow, script above, content
    // buffer.rqt == arrow, script below, type
    // buffer.rq == arrow, script below, content
    //
    // buffer.param1
    // buffer.text
    // buffer.rm
    // etc.
    //
    // buffer.parenthesisLevel == int, starting at 0
    // buffer.sb == bool, space before
    // buffer.beginsWithBond == bool
    //
    // These letters are also used as state names.
    //
    // Other states:
    // 0 == begin of main part
    // 1 == next entity
    // 2 == next atom
    // frac, overset, ...
    // c == macro
    //
    var buffer = { parenthesisLevel: 0 };

    input = input.replace(/[\u2212\u2013\u2014\u2010]/g, '-');

    var lastInput, watchdog;
    var output = [];
    while (true) {
      if (lastInput !== input) {
        watchdog = 10;
        lastInput = input;
      } else {
        watchdog--;
      }
      //
      // Look for matching string in transition table
      //
      var machine = mhchemParser.stateMachines[stateMachine];
      var iTmax = machine.transitions.length;
      iterateTransitions:
      for (var iT=0; iT<iTmax; iT++) {
        var t = machine.transitions[iT];
        var matches = mhchemParser.match(t.match, input);
        if (matches) {
          var tasks = t.actions[state]  ||  t.actions['*']  || null;
          if (tasks) {
            //
            // Execute action
            //
            var actions = mhchemParser.concatNotUndefined([], tasks.action);
            var iAmax = actions.length;
            for (var iA=0; iA<iAmax; iA++) {
              var a = actions[iA];
              var o;
              var option = undefined;
              if (a.type) {
                option = a.option;
                a = a.type;
              }
              if (typeof a === 'string') {
                if (machine.actions[a]) {
                  o = machine.actions[a](buffer, matches.match, option);
                } else if (mhchemParser.actions[a]) {
                  o = mhchemParser.actions[a](buffer, matches.match, option);
                } else {
                  throw ['InternalMhchemErrorNonExistingAction', 'Internal mhchem Error \u2013 Trying to use non-existing action (' + a + ')'];
                }
              } else if (typeof a === 'function') {
                o = a(buffer, matches.match);
              }
              output = mhchemParser.concatNotUndefined(output, o);
            }
            //
            // Set next state,
            // Shorten input,
            // Continue with next character
            //   (= apply only one transition per position)
            //
            state = tasks.nextState || state;
            if (input.length > 0) {
              if (!tasks.revisit) {
                input = matches.remainder;
              }
              if (!tasks.toContinue) {
                break iterateTransitions;
              }
            } else {
              return output;
            }
          }
        }
      }
      //
      // Prevent infinite loop
      //
      if (watchdog <= 0) {
        throw ['MhchemErrorUnexpectedCharacter', 'mhchem Error \u2013 Unexpected character'];
      }
    }
  };
  mhchemParser.concatNotUndefined = function(a, b) {
    if (!b) { return a; }
    if (!a) { return [].concat(b); }
    return a.concat(b);
  };

  //
  // Matching patterns
  // either regexps or function that return null or {match:'a', remainder:'bc'}
  //
  mhchemParser.patterns = {
    // property names must not look like integers ('2') for correct property traversal order, later on
    'empty': /^$/,
    'else': /^./,
    'else2': /^./,
    'space': /^\s/,
    'space A': /^\s(?=[A-Z\\$])/,
    'a-z': /^[a-z]+/,
    'letters': /^(?:[a-zA-Z\u03B1-\u03C9\u0391-\u03A9?@]|(?:\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Alpha|Beta|Gamma|Delta|Epsilon|Zeta|Eta|Theta|Iota|Kappa|Lambda|Mu|Nu|Xi|Omicron|Pi|Rho|Sigma|Tau|Upsilon|Phi|Chi|Psi|Omega)(?:\ |(?![a-zA-Z]))))+/,
    '\\greek': /^\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Alpha|Beta|Gamma|Delta|Epsilon|Zeta|Eta|Theta|Iota|Kappa|Lambda|Mu|Nu|Xi|Omicron|Pi|Rho|Sigma|Tau|Upsilon|Phi|Chi|Psi|Omega)(?:\ |(?![a-zA-Z]))/,
    'one lowercase latin letter $': /^(?:([a-z])(?:$|[^a-zA-Z]))$/,
    'one lowercase greek letter $': /^(?:\$?[\u03B1-\u03C9]\$?|\$?\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Alpha|Beta|Gamma|Delta|Epsilon|Zeta|Eta|Theta|Iota|Kappa|Lambda|Mu|Nu|Xi|Omicron|Pi|Rho|Sigma|Tau|Upsilon|Phi|Chi|Psi|Omega)\$?(?:$|[^a-zA-Z]))$/,
    'digits': /^[0-9]+/,
    '-9.,9': /^-?(?:[0-9]+(?:[.,][0-9]+)?|[0-9]*(?:\.[0-9]+))/,
    '-9.,9 no missing 0': /^-?[0-9]+(?:[.,][0-9]+)?/,
    'state of aggregation $':  function (input) {
      var a = this['_findObserveGroups'](input, '', /^\([a-z]{1,3}(?=[\),])/, ')', '');
      if (a  &&  a.remainder.match(/^($|[\s,;])/))  return a;
      return null;
    },
    '\{[(': /^(?:\\\{|\[|\()/,
    ')]\}': /^(?:\)|\]|\\\})/,
    ', ': /^[,;]\s*/,
    ',': /^[,;]/,
    '.': /^[.\u22C5\u00B7\u2022]/,
    '...': /^\.\.\.(?=$|[^.])/,
    '.$': /^\.(?=\s|$|\{\})/,
    "*": /^\*/,
    '^{(...)}': function (input) { return this['_findObserveGroups'](input, '^{', '', '', '}'); },
    '^($...$)': function (input) { return this['_findObserveGroups'](input, '^', '$', '$', ''); },
    '^(...)1': /^\^([0-9]+|[^\\])/,
    '^(...)2': /^\^(\\[a-zA-Z]+)\s?/,
    '_{(...)}': function (input) { return this['_findObserveGroups'](input, '_{', '', '', '}'); },
    '_($...$)': function (input) { return this['_findObserveGroups'](input, '_', '$', '$', ''); },
    '_(...)1': /^_(-?[0-9]+|[^\\])/,
    '_(...)2': /^_(\\[a-zA-Z]+)\s?/,
    '{}': /^\{\}/,
    '{...}': function (input) { return this['_findObserveGroups'](input, '', '{', '}', ''); },
    '{(...)}': function (input) { return this['_findObserveGroups'](input, '{', '', '', '}'); },
    '$...$': function (input) { return this['_findObserveGroups'](input, '', '$', '$', ''); },
    '${(...)}$': function (input) { return this['_findObserveGroups'](input, '${', '', '', '}$'); },
    '$(...)$': function (input) { return this['_findObserveGroups'](input, '$', '', '', '$'); },
    '=<>': /^[=<>]/,
    '#': /^[#\u2261]/,
    '+': /^\+/,
    '-$': /^-(?=[\s_},;/]|$|\([a-z]+\))/,  // -space -, -; -] -$ -state-of-aggregation
    '-9': /^-(?=\d)/,
    '-': /^-/,
    'operator': /^(?:\+|(?:[\-=<>]|<<|>>|\\pm|\$\\pm\$|\\approx|\$\\approx\$)(?=\s|$))/,
    'arrowUpDown': /^(?:v|\(v\)|\^|\(\^\))(?=$|[\s,;])/,
    '\\bond{(...)}': function (input) { return this['_findObserveGroups'](input, '\\bond{', '', '', '}'); },
    '->': /^(?:<->|<-->|->|<-|<=>>|<<=>|<=>|[\u2192\u27F6\u21CC])/,
    'CMT': /^[CMT](?=\[)/,
    '[(...)]': function (input) { return this['_findObserveGroups'](input, '[', '', '', ']'); },
    '&': /^&/,
    '\\\\': /^\\\\/,
    '\\,': /^\\(?:[,\ ;:!_%&]|\{|\})/,
    '\\x': /^\\(?:[a-zA-Z]+)/,
    'orbital': /^[1-9][spdf](?=$|[^a-zA-Z])/,
    'others': /^[:\/'\u2019~|]/,
    '\\frac{(...)}': function (input) { return this['_findObserveGroups'](input, '\\frac{', '', '', '}'); },
    '\\overset{(...)}': function (input) { return this['_findObserveGroups'](input, '\\overset{', '', '', '}'); },
    '\\underset{(...)}': function (input) { return this['_findObserveGroups'](input, '\\underset{', '', '', '}'); },
    '\\underbrace{(...)}': function (input) { return this['_findObserveGroups'](input, '\\underbrace{', '', '', '}_'); },
    '\\ce{(...)}': function (input) { return this['_findObserveGroups'](input, '\\ce{', '', '', '}'); },
    '\\color{(...)}': /^\\color\{?(\\[a-z]+)\}?(?=\{)/,
    'oxidation$': /^-?[IVX]+$/,
    '1/2$': /^[0-9]+\/[0-9]+$/,
    'amount': function (input) {
      var match;
      var a = this['_findObserveGroups'](input, '', '$', '$', '');
      if (a) {
        match = a.match.match(/^\$\(?(?:[0-9]*[a-z]?[+\-])?[0-9]*[a-z](?:[+\-][0-9]*[a-z]?)?\)?\$$/);
        if (match) {
          return { match: match[0], remainder: input.substr(match[0].length) };
        }
      } else {
        match = input.match(/^(?:(?:(?:\([0-9]+\/[0-9]+\)|[0-9]+\/[0-9]+|[0-9]+[.,][0-9]+|\.[0-9]+|[0-9]+|[0-9]+)(?:[a-z](?=\s*[A-Z]))?)|[a-z](?=\s*[A-Z]))/);
        if (match) {
          return { match: match[0], remainder: input.substr(match[0].length) };
        }
      }
      return null;
    },
    'formula$': function (input) {
      if (input.match(/^\([a-z]+\)$/)) {  // state of aggregation = no formula
        return null;
      }
      var match = input.match(/^(?:[a-z]|(?:[0-9\ \+\-\,\.\(\)]+[a-z])+[0-9\ \+\-\,\.\(\)]*|(?:[a-z][0-9\ \+\-\,\.\(\)]+)+[a-z]?)$/);
      if (match) {
        return { match: match[0], remainder: input.substr(match[0].length) };
      }
      return null;
    },
    'entities': /^(?:pH|pOH|pK|iPr|iBu)(?=$|[^a-zA-Z])/,
    '_findObserveGroups': function (input, begExcl, begIncl, endIncl, endExcl) {
      var match = this['__match'](input, begExcl);
      if (match === null)  return null;
      input = input.substr(match.length);
      match = this['__match'](input, begIncl);
      if (match === null)  return null;
      var e = this['__findObserveGroups'](input, match.length, endIncl || endExcl);
      if (e === null)  return null;
      return {
        match: input.substring(0, (endIncl ? e.endMatchEnd : e.endMatchBegin)),
        remainder: input.substr(e.endMatchEnd)
      };
    },
    '__match': function (input, pattern) {
      if (typeof pattern === 'string') {
        if (input.indexOf(pattern) !== 0)  return null;
        return pattern;
      } else {
        var match = input.match(pattern);
        if (!match)  return null;
        return match[0];
      }
    },
    '__findObserveGroups': function (input, i, endChars) {
      var braces = 0;
      while (i < input.length) {
        var a = input.charAt(i);
        var match = this['__match'](input.substr(i), endChars);
        if (match  &&  braces === 0) {
          return { endMatchBegin: i, endMatchEnd: i + match.length };
        } else if (a === '{') {
          braces++;
        } else if (a === '}') {
          if (braces === 0) {
            throw ['ExtraCloseMissingOpen', 'Extra close brace or missing open brace'];
          } else {
            braces--;
          }
        }
        i++;
      }
      if (braces > 0) {
        return null;
      }
      return null;
    }
  };
  
  //
  // Matching function
  // e.g. match('a', input) will look for the regexp called 'a' and see if it matches
  // returns null or {match:'a', remainder:'bc'}
  //
  mhchemParser.match = function (m, input) {
    if (mhchemParser.patterns[m] === undefined) {
      throw ['InternalMhchemErrorNonExistingPattern', 'Internal mhchem Error \u2013 Trying to use non-existing pattern (' + m + ')'];
    } else if (typeof mhchemParser.patterns[m] === 'function') {
      return mhchemParser.patterns[m](input);
    } else {  // RegExp
      var match = input.match(mhchemParser.patterns[m]);
      if (match) {
        var mm = match[1];
        if (mm === undefined) { mm = match[0]; }
        return { match: mm, remainder: input.substr(match[0].length) };
      }
      return null;
    }
  };

  //
  // Generic state machine actions
  //
  mhchemParser.actions = {
    'a=': function (buffer, m) { buffer.a = (buffer.a || '') + m; },
    'b=': function (buffer, m) { buffer.b = (buffer.b || '') + m; },
    'p=': function (buffer, m) { buffer.p = (buffer.p || '') + m; },
    'o=': function (buffer, m) { buffer.o = (buffer.o || '') + m; },
    'q=': function (buffer, m) { buffer.q = (buffer.q || '') + m; },
    'd=': function (buffer, m) { buffer.d = (buffer.d || '') + m; },
    'rm=': function (buffer, m) { buffer.rm = (buffer.rm || '') + m; },
    'text=': function (buffer, m) { buffer.text = (buffer.text || '') + m; },
    'param1=': function (buffer, m) { buffer.param1 = m; },
    'insert': function (buffer, m, a) { return { type: a }; },
    'insert+p': function (buffer, m, a) { return { type: a, p1: m }; },
    'copy': function (buffer, m) { return m; },
    'rm': function (buffer, m) { return { type: 'rm', p1: m }; },
    'text': function (buffer, m) { return mhchemParser.go(m, 'text'); },
    '{text}': function (buffer, m) {
      var ret = [ '{' ];
      ret = mhchemParser.concatNotUndefined(ret, mhchemParser.go(m, 'text'));
      ret = mhchemParser.concatNotUndefined(ret, '}');
      return ret;
    },
    'tex-math': function (buffer, m) { return mhchemParser.go(m, 'tex-math'); },
    'tex-math tight': function (buffer, m) { return mhchemParser.go(m, 'tex-math tight'); },
    'bond': function (buffer, m, k) { return { type: 'bond', kind: k || m }; },
    'ce': function (buffer, m) { return mhchemParser.go(m); },
    '1/2': function (buffer, m) {
      var n = m.match(/^([0-9]+)\/([0-9]+)$/);
      return { type: 'frac', p1: n[1], p2: n[2] };
    },
    '9,9': function (buffer, m) { return mhchemParser.go(m, '9,9'); }
  };

  //
  // State machine definitions
  //
  mhchemParser.stateMachines = {};
  //
  // convert  { 'a': { '*': { action: 'output' } } }  to  [ { match: 'a', actions: { '*': { action: 'output' } } } ]
  // with expansion of 'a|b' to 'a' and 'b' (at 2 places)
  //
  mhchemParser.createTransitions = function (o) {
    //
    // 1. o ==> oo, expanding 'a|b'
    //
    var oo = {};
    for (var a in o) {
      if (a.indexOf('|') !== -1) {
        var s = a.split('|');
        for (var i=0; i<s.length; i++) {
          oo[s[i]] = o[a];
        }
      } else {
        oo[a] = o[a];
      }
    }
    //
    // 2. oo ==> transition array
    //
    var transitions = [];
    for (var a in oo) {
      var actions = {};
      for (var b in oo[a]) {
        //
        // expanding action-state:'a|b' if needed
        //
        if (b.indexOf('|') !== -1) {
          var s = b.split('|');
          for (var i=0; i<s.length; i++) {
            actions[s[i]] = oo[a][b];
          }
        } else {
          actions[b] = oo[a][b];
        }
      }
      transitions.push( { match: a, actions: actions } );
    }
    return transitions;
  };
  //
  // Transitions and actions of main parser
  //
  mhchemParser.stateMachines['ce'] = {
    transitions: mhchemParser.createTransitions({
      'empty': {
        '*': { action: 'output' } },
      'else':  {
        '0|1': { action: 'beginsWithBond=false', revisit: true, toContinue: true } },
      'CMT': {
        'r': { action: 'rdt=', nextState: 'rt' },
        'rd': { action: 'rqt=', nextState: 'rdt' } },
      'arrowUpDown': {
        '0|1|as': { action: [ 'sb=false', 'output', 'operator' ], nextState: '0' } },
      'entities': {
        '0|1': { action: 'o=', nextState: 'o' } },
      'orbital': {
        '0|1|2': { action: 'o=', nextState: 'o' } },
      'amount': {
        '0|1|2': { action: 'a=', nextState: 'a' } },
      'letters': {
        '0|1|2|a|as|b|p|bp|o': { action: 'o=', nextState: 'o' },
        'q|dq': { action: ['output', 'o='], nextState: 'o' },
        'd|D|qd|qD': { action: 'o after d', nextState: 'o' } },
      'digits': {
        'o': { action: 'q=', nextState: 'q' },
        'd|D': { action: 'q=', nextState: 'dq' },
        'q': { action: [ 'output', 'o=' ], nextState: 'o' } },
      'space A': {
        'b|p|bp': {} },
      'space': {
        'a': { nextState: 'as' },
        '0': { action: 'sb=false' },
        '1': { action: 'sb=true' },
        'r|rt|rd|rdt|rdq': { action: 'output', nextState: '0' },
        'c0': { action: [ 'output', { type: 'insert', option: 'space' } ], nextState: '1' },
        '*': { action: [ 'output', 'sb=true' ], nextState: '1'} },
      '&': {
        '*': { action: [ 'output', 'copy' ], nextState: '0' } },
      '\\\\': {
        '*': { action: [ 'output', 'copy', { type: 'insert', option: 'space' } ], nextState: '0' } },  // space, so that we don't get \\[
      '+': {
        'a|as': { action: [ 'sb=false', 'output', 'operator' ], nextState: '0' },
        'o': { action: 'd= kv',  nextState: 'd' },
        'd|D': { action: 'd=', nextState: 'd' },
        'q': { action: 'd=',  nextState: 'qd' },
        'qd|qD': { action: 'd=', nextState: 'qd' },
        'dq': { action: [ 'output', 'd=' ], nextState: 'd' } },
      'operator': {
        '0|1|as': { action: [ 'sb=false', 'output', 'operator' ], nextState: '0' } },
      '->': {
        '0|1|2': { action: 'r=', nextState: 'r' },
        'a|as': { action: [ 'output', 'r=' ], nextState: 'r' },
        '*': { action: [ 'output', 'r=' ], nextState: 'r' } },
      '[(...)]': {
        'r|rt': { action: 'rd=', nextState: 'rd' },
        'rd|rdt': { action: 'rq=', nextState: 'rdq' } },
      '...': {
        'o|d|D|dq|qd|qD': { action: [ 'output', { type: 'bond', option: '...' } ], nextState: '2' },
        '*': { action: [ { type: 'output', option: 1 }, { type: 'insert', option: 'ellipsis' } ], nextState: '1' } },
      '.$|.|*': {
        '*': { action: [ 'output', { type: 'insert', option: 'addition compound' } ], nextState: '0' } },
      'state of aggregation $': {
        '0': { action: [ 'output', 'sb=false', 'o=', 'output' ], nextState: '1' },
        '*': { action: [ 'output', 'state of aggregation' ], nextState: '1' } },
      '\{[(': {
        'a|as|o': { action: [ 'o=', 'output', 'parenthesisLevel++' ], nextState: '1' },
        '0|1|2': { action: [ 'o=', 'output', 'parenthesisLevel++' ], nextState: '1' },
        '*': { action: [ 'output', 'o=', 'output', 'parenthesisLevel++' ], nextState: '1' } },
      ')]\}': {
        '0|1|2|b|p|bp|o': { action: [ 'o=', 'parenthesisLevel--' ], nextState: 'o' },
        'a|as|d|D|q|qd|qD|dq': { action: [ 'output', 'o=', 'parenthesisLevel--' ], nextState: 'o' } },
      ', ': {
        '*': { action: [ 'output', 'comma' ], nextState: '0' } },
      '^{(...)}|^($...$)': {
        '0|1|as': { action: 'b=', nextState: 'b' },
        'p': { action: 'b=', nextState: 'bp' },
        '2|o': { action: 'd= kv', nextState: 'D' },
        'q': { action: 'd=', nextState: 'qD' },
        'd|D|qd|qD|dq': { action: [ 'output', 'd=' ], nextState: 'D' } },
      '^(...)1|^(...)2': {
        '0|1|as': { action: 'b=', nextState: 'b' },
        'p': { action: 'b=', nextState: 'bp' },
        '2|o': { action: 'd= kv', nextState: 'd' },
        'q': { action: 'd=', nextState: 'qd' },
        'd|D|qd|qD|dq': { action: [ 'output', 'd=' ], nextState: 'd' } },
      '_{(...)}|_($...$)|_(...)1|_(...)2': {
        '0|1|as': { action: 'p=', nextState: 'p' },
        'b': { action: 'p=', nextState: 'bp' },
        '2|o': { action: 'q=', nextState: 'q' },
        'd|D': { action: 'q=', nextState: 'dq' },
        'q|qd|qD|dq': { action: [ 'output', 'q=' ], nextState: 'q' } },
      '-$': {
        'o|q': { action: [ 'charge or bond', 'output' ],  nextState: 'qd' },
        'd': { action: 'd=', nextState: 'd' },
        'D': { action: [ 'output', { type: 'bond', option: '-' } ], nextState: '2' },
        'q': { action: 'd=',  nextState: 'qd' },
        'qd': { action: 'd=', nextState: 'qd' },
        'qD|dq': { action: [ 'output', { type: 'bond', option: '-' } ], nextState: '2' } },
      '-9': {
        '2|o': { action: [ 'output', { type: 'insert', option: 'hyphen' } ], nextState: '2' } },
      '-': {
        '0|1': { action: [ 'beginsWithBond=true', { type: 'bond', option: '-' } ], nextState: '2' },
        '2': { action: { type: 'bond', option: '-' } },
        'a': { action: [ 'output', { type: 'insert', option: 'hyphen' } ], nextState: '1' },
        'as': { action: [ { type: 'output', option: 2 }, { type: 'bond', option: '-' } ], nextState: '2' },
        'b': { action: 'b=' },
        'o': { action: '- after o', nextState: '1' },
        'q': { action: '- after o', nextState: '1' },
        'd|qd|dq': { action: '- after d', nextState: '1' },
        'D|qD|p': { action: [ 'output', { type: 'bond', option: '-' } ], nextState: '2' } },
      '=<>': {
        '0|1|2|a|as|o|q|d|D|qd|qD|dq': { action: [ { type: 'output', option: 2 }, 'bond' ], nextState: '2' } },
      '#': {
        '0|1|2|a|as|o': { action: [ { type: 'output', option: 2 }, { type: 'bond', option: '#' } ], nextState: '2' } },
      '{}': {
        '*': { action: { type: 'output', option: 1 },  nextState: '1' } },
      '{(...)}': {
        'frac': { action: 'frac-output', nextState: '1' },
        'overset': { action: 'overset-output', nextState: '1' },
        'underset': { action: 'underset-output', nextState: '1' },
        'underbrace': { action: 'underbrace-output', nextState: '1' },
        'color': { action: 'color-output', nextState: '2' } },
      '{...}': {
        '0|1|2|a|as|b|p|bp': { action: 'o=', nextState: 'o' },
        'o|d|D|q|qd|qD|dq': { action: [ 'output', 'o=' ], nextState: 'o' },
        'c0': { action: 'o=', nextState: 'c1' },
        'c1': { action: [ 'o=', 'output' ], nextState: '2' } },
      '$...$': {
        'a': { action: 'a=' },  // 2$n$
        '0|1|2|as|b|p|bp|o': { action: 'o=', nextState: 'o' },  // not 'amount'
        'as|o': { action: 'o=' },
        'q|d|D|qd|qD|dq': { action: [ 'output', 'o=' ], nextState: 'o' } },
      '\\bond{(...)}': {
        '*': { action: [ { type: 'output', option: 2 }, 'bond' ], nextState: '2' } },
      '\\frac{(...)}': {
        '*': { action: [ { type: 'output', option: 1 }, 'param1=' ], nextState: 'frac' } },
      '\\overset{(...)}': {
        '*': { action: [ { type: 'output', option: 2 }, 'param1=' ], nextState: 'overset' } },
      '\\underset{(...)}': {
        '*': { action: [ { type: 'output', option: 2 }, 'param1=' ], nextState: 'underset' } },
      '\\underbrace{(...)}': {
        '*': { action: [ { type: 'output', option: 2 }, 'param1=' ], nextState: 'underbrace' } },
      '\\color{(...)}': {
        '*': { action: [ { type: 'output', option: 2 }, 'param1=' ], nextState: 'color' } },
      '\\ce{(...)}': {
        '*': { action: [ { type: 'output', option: 2 }, 'ce' ], nextState: '2' } },
      '\\,': {
        '*': { action: [ { type: 'output', option: 1 }, 'copy' ], nextState: '1' } },
      '\\x': {
        '0|1|2|a|as|b|p|bp|o': { action: 'o=', nextState: 'c0' },
        '*': { action: ['output', 'o='], nextState: 'c0' } },
      'others': {
        '*': { action: [ { type: 'output', option: 1 }, 'copy' ], nextState: '1' } },
      'else2': {
        'c0': { action: [ 'o=', 'output' ], nextState: '2' },
        'c1': { action: 'output', nextState: '0', revisit: true },
        'a': { action: 'a to o', nextState: 'o', revisit: true },
        'r|rt|rd|rdt|rdq': { action: [ 'output' ], nextState: '0', revisit: true },
        '*': { action: [ 'output', 'copy' ], nextState: '1' } }
    }),
    actions: {
      'o after d': function (buffer, m) {
        var ret;
        if (buffer.d.match(/^[0-9]+$/)) {
          var tmp = buffer.d;
          buffer.d = undefined;
          ret = this['output'](buffer);
          buffer.b = tmp;
        } else {
          ret = this['output'](buffer);
        }
        mhchemParser.actions['o='](buffer, m);
        return ret;
      },
      'd= kv': function (buffer, m) {
        buffer.d = m;
        buffer['d-type'] = 'kv';
      },
      'charge or bond': function (buffer, m) {
        if (buffer.beginsWithBond) {
          var ret = mhchemParser.concatNotUndefined(ret, this['output'](buffer));
          ret = mhchemParser.concatNotUndefined(ret, mhchemParser.actions['bond'](buffer, m, '-'));
          return ret;
        } else {
          buffer.d = m;
        }
      },
      '- after o': function (buffer, m) {
        var c2 = mhchemParser.match('one lowercase latin letter $', buffer.o || '');
        var c3 = mhchemParser.match('one lowercase greek letter $', buffer.o || '');
        var c4 = mhchemParser.match('orbital', buffer.o || '');
        if (c2 && c2.remainder === '') {
          buffer.o = '$' + buffer.o + '$';
          var ret = mhchemParser.concatNotUndefined(null, this['output'](buffer));
          ret = mhchemParser.concatNotUndefined(ret, { type: 'hyphen' });
        } else if (c3 && c3.remainder === '') {
          var ret = mhchemParser.concatNotUndefined(null, this['output'](buffer));
          ret = mhchemParser.concatNotUndefined(ret, { type: 'hyphen' });
        } else if (c4 && c4.remainder === '') {
          var ret = mhchemParser.concatNotUndefined(null, this['output'](buffer));
          ret = mhchemParser.concatNotUndefined(ret, { type: 'hyphen' });
        } else {
          var ret = mhchemParser.concatNotUndefined(null, this['output'](buffer));
          ret = mhchemParser.concatNotUndefined(ret, mhchemParser.actions['bond'](buffer, m, '-'));
        }
        return ret;
      },
      '- after d': function (buffer, m) {
        var c2 = mhchemParser.match('one lowercase latin letter $', buffer.o || '');
        var c3 = mhchemParser.match('one lowercase greek letter $', buffer.o || '');
        var c4 = mhchemParser.match('orbital', buffer.o || '');
        var c5 = mhchemParser.match('digits', buffer.d);
        var ret;
        if (c2 && c2.remainder === '') {
          buffer.o = '$' + buffer.o + '$';
          ret = mhchemParser.concatNotUndefined(null, this['output'](buffer));
          ret = mhchemParser.concatNotUndefined(ret, { type: 'hyphen' });
        } else if (c3 && c3.remainder === '') {
          ret = mhchemParser.concatNotUndefined(null, this['output'](buffer));
          ret = mhchemParser.concatNotUndefined(ret, { type: 'hyphen' });
        } else if (c4 && c4.remainder === '') {
          var ret = mhchemParser.concatNotUndefined(null, this['output'](buffer));
          ret = mhchemParser.concatNotUndefined(ret, { type: 'hyphen' });
        } else if (c5 && c5.remainder === '') {
          ret = mhchemParser.concatNotUndefined(null, mhchemParser.actions['d='](buffer, m));
          ret = mhchemParser.concatNotUndefined(ret, this['output'](buffer));
        } else {
          ret = mhchemParser.concatNotUndefined(null, this['output'](buffer));
          ret = mhchemParser.concatNotUndefined(ret, mhchemParser.actions['bond'](buffer, m, '-'));
        }
        return ret;
      },
      'a to o': function (buffer, m) {
          buffer.o = buffer.a;
          buffer.a = undefined;
      },
      'sb=true': function (buffer, m) { buffer.sb = true; },
      'sb=false': function (buffer, m) { buffer.sb = false; },
      'beginsWithBond=true': function (buffer, m) { buffer.beginsWithBond = true; },
      'beginsWithBond=false': function (buffer, m) { buffer.beginsWithBond = false; },
      'parenthesisLevel++': function (buffer, m) { buffer.parenthesisLevel++; },
      'parenthesisLevel--': function (buffer, m) { buffer.parenthesisLevel--; },
      'state of aggregation': function (buffer, m) {
          m = mhchemParser.go(m, 'o');
          return { type: 'state of aggregation', p1: m };
      },
      'comma': function (buffer, m) {
        var a = m.replace(/\s*$/, '');
        var withSpace = (a !== m);
        if (withSpace  &&  buffer.parenthesisLevel === 0) {
          return { type: 'comma enumeration L', p1: a };
        } else {
          return { type: 'comma enumeration M', p1: a };
        }
      },
      'output': function (buffer, m, entityFollows) {
        // entityFollows:
        //   undefined = if we have nothing else to output, also ignore the just read space (buffer.sb)
        //   1 = an entity follows, never omit the space if there was one before (can only apply to state 2)
        //   2 = 1 + the entity can have an amount, so output a\, instead of converting it to o (can only apply to states a|as)
        if (!buffer.r) {
          var ret = [];
          if (!buffer.a && !buffer.b && !buffer.p &&
           !buffer.o && !buffer.q && !buffer.d &&
           !entityFollows) {
            ret = null;
          } else {
            if (buffer.sb) {
              ret.push({ type: 'entitySkip' });
            }
            if (!buffer.o && !buffer.q && !buffer.d && !buffer.b && !buffer.p && entityFollows!==2) {
              buffer.o = mhchemParser.go(buffer.a, 'o');
              buffer.a = undefined;
            } else if (!buffer.o && !buffer.q && !buffer.d && (buffer.b || buffer.p)) {
              buffer.o = mhchemParser.go(buffer.a, 'o');
              buffer.d = mhchemParser.go(buffer.b, 'bd');
              buffer.q = mhchemParser.go(buffer.p, 'pq');
              buffer.a = buffer.b = buffer.p = undefined;
            } else {
              if (buffer.o && buffer['d-type']=='kv' && !buffer.q) {
                buffer['d-type'] = undefined;
              }
              buffer.a = mhchemParser.go(buffer.a, 'a');
              buffer.b = mhchemParser.go(buffer.b, 'bd');
              buffer.p = mhchemParser.go(buffer.p, 'pq');
              buffer.o = mhchemParser.go(buffer.o, 'o');
              buffer.d = mhchemParser.go(buffer.d, 'bd');
              buffer.q = mhchemParser.go(buffer.q, 'pq');
            }
            ret.push({
              type: 'chemfive',
              a: buffer.a,
              b: buffer.b,
              p: buffer.p,
              o: buffer.o,
              q: buffer.q,
              d: buffer.d,
              'd-type': buffer['d-type']
            });
          }
          for (var p in buffer) {
            if (p !== 'parenthesisLevel'  &&  p !== 'beginsWithBond') {
              delete buffer[p];
            }
          }
          return ret;
        } else {  // r
          if (buffer.rdt === 'M') {
            buffer.rd = mhchemParser.go(buffer.rd, 'tex-math');
          } else if (buffer.rdt === 'T') {
            buffer.rd = [ { type: 'text', p1: buffer.rd } ];
          } else {
            buffer.rd = mhchemParser.go(buffer.rd);
          }
          if (buffer.rqt === 'M') {
            buffer.rq = mhchemParser.go(buffer.rq, 'tex-math');
          } else if (buffer.rqt === 'T') {
            buffer.rq = [ { type: 'text', p1: buffer.rq } ];
          } else {
            buffer.rq = mhchemParser.go(buffer.rq);
          }
          ret = {
            type: 'arrow',
            r: buffer.r,
            rd: buffer.rd,
            rq: buffer.rq
          };
          for (var p in buffer) {
            if (p !== 'parenthesisLevel') {
              delete buffer[p];
            }
          }
          return ret;
        }
      },
      'frac-output': function (buffer, m) {
        buffer.param1 = mhchemParser.go(buffer.param1);
        return { type: 'frac-ce', p1: buffer.param1, p2: mhchemParser.go(m) };
      },
      'overset-output': function (buffer, m) {
        buffer.param1 = mhchemParser.go(buffer.param1);
        return { type: 'overset', p1: buffer.param1, p2: mhchemParser.go(m) };
      },
      'underset-output': function (buffer, m) {
        buffer.param1 = mhchemParser.go(buffer.param1);
        return { type: 'underset', p1: buffer.param1, p2: mhchemParser.go(m) };
      },
      'underbrace-output': function (buffer, m) {
        buffer.param1 = mhchemParser.go(buffer.param1);
        return { type: 'underbrace', p1: buffer.param1, p2: mhchemParser.go(m) };
      },
      'color-output': function (buffer, m) {
        var color2 = mhchemParser.go(m);
        return { type: 'color', color1: buffer.param1, color2: color2 };
      },
      'r=': function (buffer, m) { buffer.r = (buffer.r || '') + m; },
      'rdt=': function (buffer, m) { buffer.rdt = (buffer.rdt || '') + m; },
      'rd=': function (buffer, m) { buffer.rd = (buffer.rd || '') + m; },
      'rqt=': function (buffer, m) { buffer.rqt = (buffer.rqt || '') + m; },
      'rq=': function (buffer, m) { buffer.rq = (buffer.rq || '') + m; },
      'operator': function (buffer, m) { return { type: 'operator', kind: m }; }
    }
  };
  //
  // Transitions and actions of a parser
  //
  mhchemParser.stateMachines['a'] = {
    transitions: mhchemParser.createTransitions({
      'empty': {
        '*': {} },
      '1/2$': {
        '0': { action: '1/2' } },
      'else': {
        '0': { nextState: '1', revisit: true } },
      '$(...)$': {
        '*': { action:'tex-math tight', nextState: '1' } },
      ',': {
        '*': { action:{ type: 'insert', option: 'commaDecimal' } } },
      'else2': {
        '*': { action: 'copy' } }
    }),
    actions: {}
  };
  //
  // Transitions and actions of o parser
  //
  mhchemParser.stateMachines['o'] = {
    transitions: mhchemParser.createTransitions({
      'empty': {
        '*': {} },
      '1/2$': {
        '0': { action: '1/2' } },
      'orbital': {
        '0': { nextState: 'orbital', revisit: true } },
      'else': {
        '0': { nextState: '1', revisit: true } },
      'letters': {
        'orbital': { action: 'tex-math' },
        '*': { action: 'rm' } },
      '\\x': {
        '*': { action: 'copy', nextState: 'c0' } },
      '${(...)}$|$(...)$': {
        '*': { action: 'tex-math' } },
      '{...}': {
        'c0': { action: 'copy', nextState: 'c1' },
        'c1': { action: 'copy', nextState: '0' } },
      '{(...)}': {
        '*': { action: '{text}' } },
      'else2': {
        'c0': { action: 'copy', nextState: '0' },
        'c1': { nextState: '0', revisit: true },
        '*': { action: 'copy' } }
    }),
    actions: {}
  };
  //
  // Transitions and actions of text parser
  //
  mhchemParser.stateMachines['text'] = {
    transitions: mhchemParser.createTransitions({
      'empty': {
        '*': { action: 'output' } },
      '\\greek': {
        '*': { action: [ 'output', 'rm' ] } },
      '{...}': {
        'c0': { action: 'copy', nextState: 'c1' },
        'c1': { action: 'copy', nextState: '0' },
        '*': { action: 'text=' } },
      '${(...)}$|$(...)$': {
        '*': { action: 'tex-math' } },
      '\\,': {
        '*': { action: [ 'output', 'copy' ], nextState: '0' } },
      '\\x': {
        '*': { action: [ 'output', 'copy' ], nextState: 'c0' } },
      'else': {
        'c0': { action: 'copy', nextState: '0' },
        'c1': { nextState: '0', revisit: true },
        '*': { action: 'text=' } }
    }),
    actions: {
      'output': function (buffer, m) { if (buffer.text) {
          var ret = { type: 'text', p1: buffer.text }; }
          for (var p in buffer) {
            delete buffer[p];
          }
          return ret;
      }
    }
  };
  //
  // Transitions and actions of pq parser
  //
  mhchemParser.stateMachines['pq'] = {
    transitions: mhchemParser.createTransitions({
      'empty': {
        '*': {} },
      'state of aggregation $': {
        '*': { action: 'state of aggregation' } },
      'formula$': {
        '0': { nextState: 'f', revisit: true } },
      '1/2$': {
        '0': { action: '1/2' } },
      'else': {
        '0': { nextState: '!f', revisit: true } },
      '${(...)}$|$(...)$': {
        '*': { action: 'tex-math' } },
      '{...}': {
        'c0': { action: 'copy', nextState: 'c1' },
        'c1': { action: 'copy', nextState: '!f' } },
      '{(...)}': {
        'color': { action: 'color-output', nextState: '!f' },
        '*': { action: 'text' } },
      'a-z': {
        'f': { action: 'tex-math' } },
      'letters': {
        '*': { action: 'rm' } },
      '-9.,9': {
        '*': { action: '9,9'  } },
      ',': {
        '*': { action: { type: 'insert+p', option: 'comma enumeration S' } } },
      '\\color{(...)}': {
        '*': { action: 'param1=', nextState: 'color' } },
      '\\ce{(...)}': {
        '*': { action: 'ce' } },
      '\\,': {
        '*': { action: 'copy', nextState: '0' } },
      '\\x': {
        '!f': { action: 'copy', nextState: 'c0' } },
      'else2': {
        'c0': { action: 'copy', nextState: '0' },
        'c1': { nextState: '0', revisit: true },
        '*': { action: 'copy' } }
    }),
    actions: {
      'state of aggregation': function (buffer, m) {
          m = mhchemParser.go(m, 'o');
          return { type: 'state of aggregation subscript', p1: m };
      },
      'color-output': function (buffer, m) {
        var color2 = mhchemParser.go(m, 'pq');
        return { type: 'color', color1: buffer.param1, color2: color2 };
      }
    }
  };
  //
  // Transitions and actions of bd parser
  //
  mhchemParser.stateMachines['bd'] = {
    transitions: mhchemParser.createTransitions({
      'empty': {
        '*': {} },
      'oxidation$': {
        '0': { action: 'oxidation' } },
      'formula$': {
        '0': { nextState: 'f', revisit: true } },
      'else': {
        '0': { nextState: '1', revisit: true } },
      '-9.,9 no missing 0': {
        '*': { action: '9,9' } },
      '.': {
        '*': { action: { type: 'insert', option: 'electron dot' }, nextState: '1' } },
      'a-z': {
        'f': { action: 'tex-math' } },
      'letters': {
        '*': { action: 'rm' } },
      '${(...)}$|$(...)$': {
        '*': { action: 'tex-math' } },
      '{...}': {
        'c0': { action: 'copy', nextState: 'c1' },
        'c1': { action: 'copy', nextState: '0' } },
      '{(...)}': {
        'color': { action: 'color-output', nextState: '!f' },
        '*': { action: 'text' } },
      '\\color{(...)}': {
        '*': { action: 'param1=', nextState: 'color' } },
      '\\ce{(...)}': {
        '*': { action: 'ce' } },
      '\\,': {
        '*': { action: 'copy' } },
      '\\x': {
        '*': { action: 'copy', nextState: 'c0' } },
      'else2': {
        'c0': { action: 'copy', nextState: '0' },
        'c1': { nextState: '0', revisit: true },
        '*': { action: 'copy' } }
    }),
    actions: {
      'oxidation': function (buffer, m) { return { type: 'oxidation', p1: m }; },
      'color-output': function (buffer, m) {
        var color2 = mhchemParser.go(m, 'bd');
        return { type: 'color', color1: buffer.param1, color2: color2 };
      }
    }
  };
  //
  // Transitions and actions of tex-math parser
  //
  mhchemParser.stateMachines['tex-math'] = {
    transitions: mhchemParser.createTransitions({
      'empty': {
        '*': { action: 'output' } },
      '\\ce{(...)}': {
        '*': { action: [ 'output', 'ce' ] } },
      '{...}|\\,|\\x': {
        '*': { action: 'o=' } },
      'else': {
        '*': { action: 'o=' } }
    }),
    actions: {
      'output': function (buffer, m) {
        if (buffer.o) {
          var ret = { type: 'tex-math', p1: buffer.o };
          for (var p in buffer) {
            delete buffer[p];
          }
          return ret;
        }
        return null;
      }
    }
  };
  //
  // Transitions and actions of tex-math-tight parser
  //
  mhchemParser.stateMachines['tex-math tight'] = {
    transitions: mhchemParser.createTransitions({
      'empty': {
        '*': { action: 'output' } },
      '\\ce{(...)}': {
        '*': { action: [ 'output', 'ce' ] } },
      '{...}|\\,|\\x': {
        '*': { action: 'o=' } },
      '-|+': {
        '*': { action: 'tight operator' } },
      'else': {
        '*': { action: 'o=' } }
    }),
    actions: {
      'tight operator': function (buffer, m) { buffer.o = (buffer.o || '') + '{'+m+'}'; },
      'output': function (buffer, m) {
        if (buffer.o) {
          var ret = { type: 'tex-math', p1: buffer.o };
          for (var p in buffer) {
            delete buffer[p];
          }
          return ret;
        }
        return null;
      }
    }
  };
  //
  // Transitions and actions of 9,9 parser
  //
  mhchemParser.stateMachines['9,9'] = {
    transitions: mhchemParser.createTransitions({
      'empty': {
        '*': {} },
      ',': {
        '*': { action: 'comma' } },
      'else': {
        '*': { action: 'copy' } }
    }),
    actions: {
      'comma': function (buffer, m) { return { type: 'commaDecimal' }; }
    }
  };

  //
  // Take MhchemParser output and convert it to TeX
  // (recursive)
  //
  var texify = {
    types: {
      'chemfive': function (buf) {
        var res = '';
        buf.a = texify.go(buf.a);
        buf.b = texify.go(buf.b);
        buf.p = texify.go(buf.p);
        buf.o = texify.go(buf.o);
        buf.q = texify.go(buf.q);
        buf.d = texify.go(buf.d);
        //
        // a
        //
        if (buf.a) { res += buf.a + '\\,'; }
        //
        // b and p
        //
        if (buf.b || buf.p) {
          res += '{\\vphantom{X}}';
          res += '^{\\hphantom{'+(buf.b||'')+'}}_{\\hphantom{'+(buf.p||'')+'}}';
          res += '{\\vphantom{X}}';
          res += '^{\\smash[t]{\\vphantom{2}}\\llap{'+(buf.b||'')+'}}';
          res += '_{\\vphantom{2}\\llap{\\smash[t]{'+(buf.p||'')+'}}}';
          res += '\\mskip-0mu ';
        }
        //
        // o
        //
        if (buf.o) { res += buf.o; }
        //
        // q and d
        //
        if (buf.d  &&  buf['d-type'] === 'kv') {
          res += '{\\vphantom{X}}';
          res += '^{'+buf.d+'}';
        }
        if (buf.q) {
          res += '{\\vphantom{X}}';
          res += '_{\\smash[t]{'+buf.q+'}}';
        }
        if (buf.d  &&  buf['d-type'] !== 'kv') {
          res += '{\\vphantom{X}}';
          res += '^{'+buf.d+'}';
        }
        return res;
      },
      'rm': function (buf) { return '\\mathrm{'+buf.p1+'}'; },
      'text': function (buf) { return '\\text{'+buf.p1+'}'; },
      'oxidation': function (buf) { return '\\mathrm{'+buf.p1+'}'; },
      'state of aggregation': function (buf) { return '\\mskip3mu '+texify.go(buf.p1); },
      'state of aggregation subscript': function (buf) { return '\\mskip2mu '+texify.go(buf.p1)+'\\mskip1mu '; },
      'bond': function (buf) {
        var ret = texify.bonds[buf.kind]
        if (!ret) {
          throw ['MhchemErrorUnknownBond', 'mhchem Error \u2013 Unknown bond type (' + buf.kind + ')'];
        }
        return ret;
      },
      'frac': function (buf) {
          var c = '\\frac{' + buf.p1 + '}{' + buf.p2 + '}';
          return '\\mathchoice{\\textstyle'+c+'}{'+c+'}{'+c+'}{'+c+'}';
       },
      'tex-math': function (buf) { return buf.p1 + ' '; },
      'frac-ce': function (buf) {
        return '\\frac{' + texify.go(buf.p1) + '}{' + texify.go(buf.p2) + '}';
      },
      'overset': function (buf) {
        return '\\overset{' + texify.go(buf.p1) + '}{' + texify.go(buf.p2) + '}';
      },
      'underset': function (buf) {
        return '\\underset{' + texify.go(buf.p1) + '}{' + texify.go(buf.p2) + '}';
      },
      'underbrace': function (buf) {
        return '\\underbrace{' + texify.go(buf.p1) + '}_{' + texify.go(buf.p2) + '}';
      },
      'color': function (buf) {
        return '{\\color{' + buf.color1 + '}{' + texify.go(buf.color2) + '}}';
      },
      'arrow': function (buf) {
        buf.rd = texify.go(buf.rd);
        buf.rq = texify.go(buf.rq);
        var arrow = texify.arrows[buf.r];
        if (buf.rd || buf.rq) {
          if (buf.rq) {arrow += "[{"+buf.rq+"}]";}
          arrow += "{"+buf.rd+"}";
          arrow = ' \\mkern3mu\\mathrel{\\x'+arrow+'}\\mkern3mu ';
        } else {
          arrow = ' \\mkern3mu\\long'+arrow+'\\mkern3mu ';
        }
        return arrow;
      },
      'operator': function(buf) { return texify.operators[buf.kind]; }
    },
    arrows: {
      '->': 'rightarrow',
      '\u2192': 'rightarrow',
      '\u27F6': 'rightarrow',
      '<-': 'leftarrow',
      '<->': 'leftrightarrow',
      '<-->': 'leftrightarrows',
      '<=>': 'rightleftharpoons',
      '\u21CC': 'rightleftharpoons',
      '<=>>': 'Rightleftharpoons',
      '<<=>': 'Leftrightharpoons'
    },
    bonds: {
      '-': '{-}',
      '1': '{-}',
      '=': '{=}',
      '2': '{=}',
      '#': '{\\equiv}',
      '3': '{\\equiv}',
      '~': '{\\tripledash}',
      '~-': '{\\begin{CEstack}{}\\tripledash\\\\-\\end{CEstack}}',
      '~=': '{\\raise2mu {\\begin{CEstack}{}\\tripledash\\\\-\\\\-\\end{CEstack}}}',
      '~--': '{\\raise2mu {\\begin{CEstack}{}\\tripledash\\\\-\\\\-\\end{CEstack}}}',
      '-~-': '{\\raise2mu {\\begin{CEstack}{}-\\\\\\tripledash\\\\-\\end{CEstack}}}',
      '...': '{{\\cdot}{\\cdot}{\\cdot}}',
      '....': '{{\\cdot}{\\cdot}{\\cdot}{\\cdot}}',
      '->': '{\\rightarrow}',
      '<-': '{\\leftarrow}',
      '<': '{<}',
      '>': '{>}'
    },
    entities: {
      'space': ' ',
      'entitySkip': '~',
      'commaDecimal': '{,}',
      'comma enumeration L': '{{0}}\\mkern6mu ',
      'comma enumeration M': '{{0}}\\mkern3mu ',
      'comma enumeration S': '{{0}}\\mkern1mu ',
      'hyphen': '\\text{-}',
      'addition compound': '\\,{\\cdot}\\,',
      'electron dot': '\\mkern1mu \\bullet\\mkern1mu ',
      '^': 'uparrow',
      'v': 'downarrow',
      'ellipsis': '\\ldots '
    },
    operators: {
      '+': ' \\mkern3mu+\\mkern3mu ',
      '-': ' \\mkern3mu-\\mkern3mu ',
      '=': ' \\mkern3mu=\\mkern3mu ',
      '<': ' \\mkern3mu<\\mkern3mu ',
      '>': ' \\mkern3mu>\\mkern3mu ',
      '<<': ' \\mkern3mu\\ll\\mkern3mu ',
      '>>': ' \\mkern3mu\\gg\\mkern3mu ',
      '\\pm': ' \\mkern3mu\\pm\\mkern3mu ',
      '$\\pm$': ' \\mkern3mu\\pm\\mkern3mu ',
      '\\approx': ' \\mkern3mu\\approx\\mkern3mu ',
      '$\\approx$': ' \\mkern3mu\\approx\\mkern3mu ',
      'v': ' \\downarrow{} ',
      '(v)': ' \\downarrow{} ',
      '^': ' \\uparrow{} ',
      '(^)': ' \\uparrow{} '
    },

    go: function (input) {
      if (!input) { return input; }
      var res = '';
      for (var i=0; i<input.length; i++) {
        if (typeof input[i] === 'string') {
          res += input[i];
        } else if (this.types[input[i].type]) {
          res += this.types[input[i].type](input[i]);
        } else if (this.entities[input[i].type]) {
          if (input[i].p1 !== undefined) {
            res += this.entities[input[i].type].replace('{0}', input[i].p1);
          } else {
            res += this.entities[input[i].type];
          }
        } else {
          throw ['InternalMhchemErrorUnknownMhchemParserOutput', 'Internal mhchem Error \u2013 Unknown MhchemParser output'];
        }
      }
      return res;
    }

  };

  MathJax.Extension["TeX/mhchem"].CE = CE;

  /***************************************************************************/

  TEX.Definitions.Add({
    macros: {
      //
      //  Set up the macros for chemistry
      //
      ce:   'CE',

      //
      //  Make these load AMSmath package (redefined below when loaded)
      //
      xleftrightarrow:    ['Extension','AMSmath'],
      xrightleftharpoons: ['Extension','AMSmath'],
      xRightleftharpoons: ['Extension','AMSmath'],
      xLeftrightharpoons: ['Extension','AMSmath'],

      //  FIXME:  These don't work well in FF NativeMML mode
      longrightleftharpoons: ["Macro","\\stackrel{\\textstyle{{-}\\!\\!{\\rightharpoonup}}}{\\smash{{\\leftharpoondown}\\!\\!{-}}}"],
      longRightleftharpoons: ["Macro","\\stackrel{\\textstyle{-}\\!\\!{\\rightharpoonup}}{\\small\\smash\\leftharpoondown}"],
      longLeftrightharpoons: ["Macro","\\stackrel{\\rightharpoonup}{{{\\leftharpoondown}\\!\\!\\textstyle{-}}}"],

      //
      //  Add \hyphen used in some mhchem examples
      //
      hyphen: ["Macro","\\text{-}"],

      //
      //  Needed for \bond for the ~ forms
      //
      tripledash: ["Macro","\\raise3mu{\\tiny\\text{-}\\kern2mu\\text{-}\\kern2mu\\text{-}}"]
    },

    //
    //  Needed for \bond for the ~ forms
    //
    environment: {
      CEstack:       ['Array',null,null,null,'r',null,"0.001em",'T',1]
    }
  },null,true);

  if (!MathJax.Extension["TeX/AMSmath"]) {
    TEX.Definitions.Add({
      macros: {
        xrightarrow: ['Extension','AMSmath'],
        xleftarrow:  ['Extension','AMSmath']
      }
    },null,true);
  }

  //
  //  These arrows need to wait until AMSmath is loaded
  //
  MathJax.Hub.Register.StartupHook("TeX AMSmath Ready",function () {
    TEX.Definitions.Add({
      macros: {
        //
        //  Some of these are hacks for now
        //
        xleftrightarrow:    ['xArrow',0x2194,6,6],
        xrightleftharpoons: ['xArrow',0x21CC,5,7],  // FIXME:  doesn't stretch in HTML-CSS output
        xRightleftharpoons: ['xArrow',0x21CC,5,7],  // FIXME:  how should this be handled?
        xLeftrightharpoons: ['xArrow',0x21CC,5,7]
      }
    },null,true);
  });

  TEX.Parse.Augment({

    //
    //  Implements \ce and friends
    //
    CE: function (name) {
      var arg = this.GetArgument(name);
      var tex = CE(arg).Parse();
      this.string = tex + this.string.substr(this.i); this.i = 0;
    }

  });

  //
  //  Indicate that the extension is ready
  //
  MathJax.Hub.Startup.signal.Post("TeX mhchem Ready");

});

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/mhchem.js");
