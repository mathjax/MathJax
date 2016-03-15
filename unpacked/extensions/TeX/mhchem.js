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
        var a = (new this.MhchemParser()).parse(this.string);
        return this.texify(a);
      } catch (ex) {
        TEX.Error(ex);
      }
    },

    //
    // Core parser for mhchem syntax  (recursive)
    //
    MhchemParser: function MhchemParser() {
      'use strict';
      var that = {};

      //
      // Parses mchem \ce syntax
      //
      // Call like
      //   parse('H2O');
      //
      // Looks through that.transitions, to execute a matching action
      // (recursive)
      //
      that.parse = function(input, stateMachine) {
        if (!input) { return input; }
        if (stateMachine === undefined) { stateMachine = 'ce'; }
        var state = '0';

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
          iterateTransitions:
          for (var iT=0; iT<that.stateMachines[stateMachine].transitions.length; iT++) {
            var t = that.stateMachines[stateMachine].transitions[iT];
            var matchArray = [].concat(t.match);
            for (var iM=0; iM<matchArray.length; iM++) {
              var matches = that.match(matchArray[iM], input);
              if (matches) {
                //
                // Look for matching state
                //
                for (var iA=0; iA<t.actions.length; iA++) {
                  if (('|'+t.actions[iA].state+'|').indexOf('|'+state+'|') !== -1  ||
                   t.actions[iA].state === '*') {
                    //
                    // Execute action  (recursive)
                    //
                    var actions = [].concat(t.actions[iA].action);
                    for (var iAA=0; iAA<actions.length; iAA++) {
                      var a = actions[iAA];
                      var o;
                      if (typeof a === 'string') {
                        if (that.stateMachines[stateMachine].actions[a]) {
                          o = that.stateMachines[stateMachine].actions[a](matches.match);
                        } else if (that.actions[a]) {
                          o = that.actions[a](matches.match);
                        } else {
                          throw ['InternalMhchemErrorNonExistingAction', 'Internal mhchem Error – Trying to use non-existing action'];
                        }
                        output = that.concatNotUndefined(output, o);
                      } else if (typeof a === 'function') {
                        o = a(matches.match);
                        output = that.concatNotUndefined(output, o);
                      } else if (a  &&  a.type) {
                        if (that.stateMachines[stateMachine].actions[a.type]) {
                          o = that.stateMachines[stateMachine].actions[a.type](matches.match, a.option);
                        } else if (that.actions[a.type]) {
                          o = that.actions[a.type](matches.match, a.option);
                        } else {
                          throw ['InternalMhchemErrorNonExistingAction', 'Internal mhchem Error – Trying to use non-existing action'];
                        }
                        output = that.concatNotUndefined(output, o);
                      }
                    }
                    //
                    // Set next state,
                    // Shorten input,
                    // Continue with next character
                    //   (= apply only one transition per position)
                    //
                    state = t.actions[iA].nextState || state;
                    if (input.length > 0) {
                      if (!t.actions[iA].revisit) {
                        input = matches.remainder;
                      }
                      if (!t.actions[iA].toContinue) {
                        break iterateTransitions;
                      }
                    } else {
                      return output;
                    }
                  }
                }
              }
            }
          }
          //
          // Prevent infinite loop
          //
          if (watchdog <= 0) {
            throw ['MhchemErrorUnexpectedCharacter', 'mhchem Error – Unexpected character'];
          }
        }
      };
      that.concatNotUndefined = function(a, b) {
        if (!b) { return a; }
        if (!a) { return [].concat(b); }
        return a.concat(b);
      };

      //
      // Matching helpers (mostly RegExps)
      //
      that.match = function (m, input) {
        var f = {
          'empty': /^$/,
          'else': /^./,
          'space': /^\s+/,
          'a-z': /^[a-z]/,
          'letters': /^(?:[a-zA-Zα-ωΑ-Ω]|(?:\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Alpha|Beta|Gamma|Delta|Epsilon|Zeta|Eta|Theta|Iota|Kappa|Lambda|Mu|Nu|Xi|Omicron|Pi|Rho|Sigma|Tau|Upsilon|Phi|Chi|Psi|Omega)(?:\ |(?![a-zA-Z]))))+/,
          '\\greek': /^\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Alpha|Beta|Gamma|Delta|Epsilon|Zeta|Eta|Theta|Iota|Kappa|Lambda|Mu|Nu|Xi|Omicron|Pi|Rho|Sigma|Tau|Upsilon|Phi|Chi|Psi|Omega)(?:\ |(?![a-zA-Z]))/,
          'one lowercase letter $': /^(?:\$?[a-zα-ω]\$?|\$?\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Alpha|Beta|Gamma|Delta|Epsilon|Zeta|Eta|Theta|Iota|Kappa|Lambda|Mu|Nu|Xi|Omicron|Pi|Rho|Sigma|Tau|Upsilon|Phi|Chi|Psi|Omega)\$?(?:\ |(?![a-zA-Z])))$/,
          'digits': /^[0-9]+/,
          '-9.,9': /^-?(?:[0-9]+(?:[.,][0-9]+)?|[0-9]*(?:\.[0-9]+))/,
          '-9.,9 no missing 0': /^-?[0-9]+(?:[.,][0-9]+)?/,
          'state of aggregation $':  function (input) {
            var a = this['_findObserveGroups'](input, '', /^\([a-z]{1,3}(?=[\),])/, ')', '');
            if (a  &&  a.remainder.match(/^(\s|$)/))  return a;
            return null;
          },
          '\{[(': /^(?:\\\{|\[|\()/,
          ')]\}': /^(?:\)|\]|\\\})/,
          ',': /^,/,
          '.': /^\./,
          '.$': /^\.(?=\s|$|\{\})/,
          "*": /^\*/,
          '^{(...)}': function (input) { return this['_findObserveGroups'](input, '^{', '', '', '}'); },
          '^($...$)': function (input) { return this['_findObserveGroups'](input, '^', '$', '$', ''); },
          '^(...)': /^\^([0-9]+|[^\\]|\\(?:[a-zA-Z]+(?=\s|$|\{|\})|[^a-zA-Z]))/,
          '_{(...)}': function (input) { return this['_findObserveGroups'](input, '_{', '', '', '}'); },
          '_($...$)': function (input) { return this['_findObserveGroups'](input, '_', '$', '$', ''); },
          '_(...)': /^_(-?[0-9]+|[^\\]|\\(?:[a-zA-Z]+(?=\s|$|\{|\})|[^a-zA-Z]))/,
          '{}': /^\{\}/,
          '{...}': function (input) { return this['_findObserveGroups'](input, '', '{', '}', ''); },
          '{(...)}': function (input) { return this['_findObserveGroups'](input, '{', '', '', '}'); },
          '$...$': function (input) { return this['_findObserveGroups'](input, '', '$', '$', ''); },
          '${(...)}$': function (input) { return this['_findObserveGroups'](input, '${', '', '', '}$'); },
          '$(...)$': function (input) { return this['_findObserveGroups'](input, '$', '', '', '$'); },
          '=': /^=/,
          '#': /^#/,
          '+': /^\+/,
          '-$': /^-(?=[\s_{},/]|$|\([a-z]+\))/,  // end = space, {, }, $, state-of-aggregation
          '-9': /^-(?=\d)/,
          '-': /^-/,
          'operator': /^(?:\+|(?:-|=|\\pm|\$\\pm\$)(?=\s|$))/,
          'arrowUpDown': /^(?:v|\(v\)|\^|\(\^\))(?=\s|$)/,
          '\\bond{(...)}': function (input) { return this['_findObserveGroups'](input, '\\bond{', '', '', '}'); },
          '->': /^(?:<->|<-->|->|<-|<=>>|<<=>|<=>)/,
          'CMT': /^[CMT](?=\[)/,
          '[(...)]': function (input) { return this['_findObserveGroups'](input, '[', '', '', ']'); },
          '&': /^&/,
          '\\\\': /^\\\\/,
          '\\,': /^\\(?:[,\ $])/,
          '\\x': /^\\(?:[a-zA-Z]+|\{|\}|[_])/,
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
              match = input.match(/^(?:\([0-9]+\/[0-9]+\)|[0-9]+\/[0-9]+|[0-9]+[.,][0-9]+|\.[0-9]+|[0-9]+|[a-z](?=\s|$)|[0-9]*n(?=[A-Z]))/);
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
        if (f[m] === undefined) {
          throw ['InternalMhchemErrorNonExistingPattern', 'Internal mhchem Error – Trying to use non-existing pattern'];
        } else if (typeof f[m] === 'function') {
          return f[m](input);
        } else {  // RegExp
          var match = input.match(f[m]);
          if (match) {
            var mm = match[1];
            if (mm === undefined) { mm = match[0]; }
            return { match: mm, remainder: input.substr(match[0].length) };
          }
          return null;
        }
      };

      //
      // String buffers for parsing:
      //
      // that.buffer.a = amount
      // that.buffer.o = element
      // that.buffer.b = left-side superscript
      // that.buffer.p = left-side subscript
      // that.buffer.q = right-side subscript
      // that.buffer.d = right-side superscript
      //
      // that.buffer.r = arrow
      // that.buffer.rdt = arrow, script above, type
      // that.buffer.rd = arrow, script above, content
      // that.buffer.rqt = arrow, script below, type
      // that.buffer.rq = arrow, script below, content
      //
      // that.buffer.param1
      // that.buffer.text
      // that.buffer.rm
      // etc.
      //
      // that.buffer.sb = bool, space before
      //
      // that.buffer.beginsWithBond = bool
      //
      // These letters are also used as state names.
      //
      // Other states:
      // 0 - begin of main part
      // 1 - next entity
      // 2 - next atom
      // frac, overset, ...
      // c - macro
      //
      that.buffer = {};

      //
      // Generic state machine actions
      //
      that.actions = {
        'a=': function (m) { that.buffer.a = (that.buffer.a || '') + m; },
        'b=': function (m) { that.buffer.b = (that.buffer.b || '') + m; },
        'p=': function (m) { that.buffer.p = (that.buffer.p || '') + m; },
        'o=': function (m) { that.buffer.o = (that.buffer.o || '') + m; },
        'q=': function (m) { that.buffer.q = (that.buffer.q || '') + m; },
        'd=': function (m) { that.buffer.d = (that.buffer.d || '') + m; },
        'rm=': function (m) { that.buffer.rm = (that.buffer.rm || '') + m; },
        'text=': function (m) { that.buffer.text = (that.buffer.text || '') + m; },
        'color1=': function(m) { that.buffer.color1 = m; },
        'insert': function (m, a) { return { type: a }; },
        'copy': function (m) { return m; },
        'rm': function (m) { return { type: 'rm', p1: m }; },
        'text': function (m) { return (new MhchemParser()).parse(m, 'text'); },
        '{text}': function (m) {
          var ret = [ '{' ];
          ret = that.concatNotUndefined(ret, (new MhchemParser()).parse(m, 'text'));
          ret = that.concatNotUndefined(ret, '}');
          return ret;
        },
        'tex-math': function (m) { return (new MhchemParser()).parse(m, 'tex-math'); },
        'tex-math tight': function (m) { return (new MhchemParser()).parse(m, 'tex-math tight'); },
        'bond': function (m, k) { return { type: 'bond', kind: k || m }; },
        'ce': function (m) { return (new MhchemParser()).parse(m); },
        '1/2': function (m) {
          var n = m.match(/^([0-9]+)\/([0-9]+)$/);
          return { type: 'frac', p1: n[1], p2: n[2] };
        },
        '9,9': function (m) { return (new MhchemParser()).parse(m, '9,9'); }
      };

      //
      // State machine definitions
      //
      that.stateMachines = {};
      //
      // State machine transitions of main parser
      //
      that.stateMachines['ce'] = {};
      that.stateMachines['ce'].transitions = [
        {
          match: 'empty',
          actions: [ { state: '*', action: 'output' } ]
        }, {
          match: 'else',
          actions: [ { state: '0|1', action: 'beginsWithBond=false', revisit: true, toContinue: true } ]
        }, {
          match: 'space',
          actions: [ { state: 'a', nextState: 'as' },
                     { state: '0|2', action: 'sb=false' },
                     { state: '1', action: 'sb=true' },
                     { state: 'r|rt|rd|rdt|rdq', action: 'output', nextState: '0' },
                     { state: '*', action: [ 'output', 'sb=true' ], nextState: '1'} ]
        }, {
          match: '&',
          actions: [ { state: '*', action: [ 'output', 'copy' ], nextState: '0' } ]
        }, {
          match: '\\\\',
          actions: [ { state: '*', action: [ 'output', 'copy', { type: 'insert', option: 'space' } ], nextState: '0' } ]  // space, so that we don't get \\[
        }, {
          match: [ 'operator', 'arrowUpDown' ],
          actions: [ { state: '0|1|2', action: [ 'operator' ], nextState: '0' } ]
        }, {
          match: '->',
          actions: [ { state: '0|1|2', action: 'r=', nextState: 'r' },
                     { state: '*', action: [ 'output', 'r=' ], nextState: 'r' } ]
        }, {
          match: 'CMT',
          actions: [ { state: 'r', action: 'rdt=', nextState: 'rt' },
                     { state: 'rd', action: 'rqt=', nextState: 'rdt' }]
        }, {
          match: '[(...)]',
          actions: [ { state: 'r|rt', action: 'rd=', nextState: 'rd' },
                     { state: 'rd|rdt', action: 'rq=', nextState: 'rdq' }]
        }, {
          match: 'amount',
          actions: [ { state: '0|1|2|a', action: 'a=', nextState: 'a' } ]
        }, {
          match: [ '.$', '.', '*' ],
          actions: [ { state: '*', action: [ 'output', { type: 'insert', option: 'addition compound' } ], nextState: '2' } ]
        }, {
          match: 'letters',
          actions: [ { state: '0|1|2|a|as|b|p|bp', action: 'o=', nextState: 'o' },
                     { state: 'o', action: 'o=' },
                     { state: 'q|dq', action: ['output', 'o='], nextState: 'o' },
                     { state: 'd|D|qd|qD', action: 'o after d', nextState: 'o'} ]
        }, {
          match: 'digits',
          actions: [ { state: 'o', action: 'q=', nextState: 'q' },
                     { state: 'd|D', action: 'q=', nextState: 'dq' } ]
        }, {
          match: 'state of aggregation $',
          actions: [ { state: '0', action: [ 'output', 'sb=false', 'o=', 'output' ], nextState: '1' },
                     { state: '*', action: [ 'output', 'state of aggregation' ], nextState: '1' } ]
        }, {
          match: '\{[(',
          actions: [ { state: 'a|as|o', action: [ 'o=', 'output' ], nextState: '1' },
                     { state: '0|1|2', action: [ 'o=', 'output' ], nextState: '1' },
                     { state: '*', action: [ 'output', 'o=', 'output' ], nextState: '1' } ]
        }, {
          match: ')]\}',
          actions: [ { state: '0|1|2|b|p|bp|o', action: 'o=', nextState: 'o' },
                     { state: 'd|D|q|qd|qD|dq', action: [ 'output', 'o=' ], nextState: 'o' } ]
        }, {
          match: ',',
          actions: [ { state: 'o|q|d|D|qd|qD|dq', action: [ 'output', { type: 'insert', option: 'comma enumeration' } ], nextState: '0' } ]
        }, {
          match: [ '^{(...)}', '^($...$)' ],
          actions: [ { state: '0|1|2|as', action: 'b=', nextState: 'b' },
                     { state: 'p', action: 'b=', nextState: 'bp' },
                     { state: 'o', action: 'd= kv', nextState: 'D' },
                     { state: 'q', action: 'd=', nextState: 'qD' },
                     { state: 'd|D|qd|qD|dq', action: [ 'output', 'd=' ], nextState: 'D' } ]
        }, {
          match: [ '^(...)' ],
          actions: [ { state: '0|1|2|as', action: 'b=', nextState: 'b' },
                     { state: 'p', action: 'b=', nextState: 'bp' },
                     { state: 'o', action: 'd= kv', nextState: 'd' },
                     { state: 'q', action: 'd=', nextState: 'qd' },
                     { state: 'd|D|qd|qD|dq', action: [ 'output', 'd=' ], nextState: 'd' } ]
        }, {
          match: [ '_{(...)}', '_($...$)', '_(...)' ],
          actions: [ { state: '0|1|2|as', action: 'p=', nextState: 'p' },
                     { state: 'b', action: 'p=', nextState: 'bp' },
                     { state: 'o', action: 'q=', nextState: 'q' },
                     { state: 'd|D', action: 'q=', nextState: 'dq' },
                     { state: 'q|qd|qD|dq', action: [ 'output', 'q=' ], nextState: 'q' } ]
        }, {
          match: '+',
          actions: [ { state: 'o',  action: 'd= kv',  nextState: 'd' },
                     { state: 'd|D',  action: 'd=', nextState: 'd' },
                     { state: 'q',  action: 'd=',  nextState: 'qd' },
                     { state: 'qd|qD', action: 'd=', nextState: 'qd' },
                     { state: 'dq', action: [ 'output', 'd=' ], nextState: 'd' } ]
        }, {
          match: '-$',
          actions: [ { state: 'o|q',  action: [ 'charge or bond', 'output' ],  nextState: 'qd' },
                     { state: 'd',  action: 'd=', nextState: 'd' },
                     { state: 'D',  action: [ 'output', { type: 'bond', option: '-' } ], nextState: '2' },
                     { state: 'q',  action: 'd=',  nextState: 'qd' },
                     { state: 'qd', action: 'd=', nextState: 'qd' },
                     { state: 'qD|dq', action: [ 'output', { type: 'bond', option: '-' } ], nextState: '2' } ]
        }, {
          match: '-9',
          actions: [ { state: '2|o',  action: [ 'output', { type: 'insert', option: 'hyphen' } ], nextState: '2' } ]
        }, {
          match: '-',
          actions: [ { state: '0|1',  action: [ 'beginsWithBond=true', { type: 'bond', option: '-' } ], nextState: '2' },
                     { state: '2',  action: { type: 'bond', option: '-' } },
                     { state: 'a',  action: [ 'output', { type: 'insert', option: 'hyphen' } ], nextState: '1' },
                     { state: 'b',  action: 'b=' },
                     { state: 'o',  action: '- after o', nextState: '1' },
                     { state: 'q',  action: '- after o', nextState: '1' },
                     { state: 'd|qd|dq',  action: '- after d', nextState: '1' },
                     { state: 'D|qD',  action: [ 'output', { type: 'bond', option: '-' } ], nextState: '2' } ]
        }, {
          match: '=',
          actions: [ { state: '0|1|2|o|q|d|D|qd|qD|dq', action: [ 'output', { type: 'bond', option: '=' } ], nextState: '1' } ]
        }, {
          match: '#',
          actions: [ { state: '0|1|2|o', action: [ 'output', { type: 'bond', option: '#' } ], nextState: '1' } ]
        }, {
          match: '{}',
          actions: [ { state: '*',  action: 'output',  nextState: '1' } ]
        }, {
          match: '{(...)}',
          actions: [ { state: 'frac', action: 'frac-output', nextState: '1' },
                     { state: 'overset', action: 'overset-output', nextState: '1' },
                     { state: 'underset', action: 'underset-output', nextState: '1' },
                     { state: 'underbrace', action: 'underbrace-output', nextState: '1' },
                     { state: 'color', action: 'color-output', nextState: '1' } ]
        }, {
          match: '{...}',
          actions: [ { state: '0|1|2|a|as|b|p|bp', action: 'o=', nextState: 'o' },
                     { state: 'o|d|D|q|qd|qD|dq', action: [ 'output', 'o=' ], nextState: 'o' },
                     { state: 'c0', action: 'copy', nextState: 'c1' },
                     { state: 'c1', action: 'copy', nextState: '1' } ]
        }, {
          match: '$...$',
          actions: [ { state: '0|1|2', action: 'o=', nextState: 'o' },  // not 'amount'
                     { state: 'as|o', action: 'o=' },
                     { state: 'b|p|bp|q|d|D|qd|qD|dq', action: [ 'output', 'o=' ], nextState: 'o' } ]
        }, {
          match: '\\bond{(...)}',
          actions: [ { state: '*', action: [ 'output', 'bond' ], nextState: '1' } ]
        }, {
          match: '\\frac{(...)}',
          actions: [ { state: '*', action: [ 'output', 'param1=' ], nextState: 'frac' } ]
        }, {
          match: '\\overset{(...)}',
          actions: [ { state: '*', action: [ 'output', 'param1=' ], nextState: 'overset' } ]
        }, {
          match: '\\underset{(...)}',
          actions: [ { state: '*', action: [ 'output', 'param1=' ], nextState: 'underset' } ]
        }, {
          match: '\\underbrace{(...)}',
          actions: [ { state: '*', action: [ 'output', 'param1=' ], nextState: 'underbrace' } ]
        }, {
          match: '\\color{(...)}',
          actions: [ { state: '*', action: [ 'output', 'param1=' ], nextState: 'color' } ]
        }, {
          match: '\\ce{(...)}',
          actions: [ { state: '*', action: [ 'output', 'ce' ], nextState: '1' } ]
        }, {
          match: '\\,',
          actions: [ { state: '*', action: [ 'output', 'copy' ], nextState: '1' } ]
        }, {
          match: '\\x',
          actions: [ { state: '*', action: [ 'output', 'copy' ], nextState: 'c0' } ]
        }, {
          match: 'else',
          actions: [ { state: 'c0', action: 'copy', nextState: '1' },
                     { state: 'c1', nextState: '0', revisit: true },
                     { state: 'a', action: 'a to o', nextState: 'o', revisit: true },
                     { state: 'r|rt|rd|rdt|rdq', action: [ 'output' ], nextState: '0', revisit: true },
                     { state: '*', action: [ 'output', 'copy' ], nextState: '1' } ]
        }
      ];
      //
      // Parsing actions (e.g. store a value into a buffer) for main parser
      //
      that.stateMachines['ce'].actions = {
        'o after d': function (m) {
          var ret;
          if (that.buffer.d.match(/^[0-9]+$/)) {
            var tmp = that.buffer.d;
            that.buffer.d = undefined;
            ret = this['output']();
            that.buffer.b = tmp;
          } else {
            ret = this['output']();
          }
          that.actions['o='](m);
          return ret;
        },
        'd= kv': function (m) {
          that.buffer.d = m;
          that.buffer['d-type'] = 'kv';
        },
        'charge or bond': function (m) {
          if (that.buffer.beginsWithBond) {
            var ret = that.concatNotUndefined(ret, this['output']());
            ret = that.concatNotUndefined(ret, that.actions['bond'](m, '-'));
            return ret;
          } else {
            that.buffer.d = m;
          }
        },
        '- after o': function (m) {
          var e = !that.buffer.b && !that.buffer.p;
          var n = that.match('one lowercase letter $', that.buffer.o || '');
          var ret = that.concatNotUndefined(null, this['output']());
          if (e && n && n.remainder === '') {
            ret = that.concatNotUndefined(ret, { type: 'hyphen' });
          } else {
            ret = that.concatNotUndefined(ret, that.actions['bond'](m, '-'));
          }
          return ret;
        },
        '- after d': function (m) {
          var c1 = !that.buffer.b && !that.buffer.p;
          var c2 = that.match('one lowercase letter $', that.buffer.o || '');
          var c3 = that.match('digits', that.buffer.d);
          var ret;
          if (c1  &&  c2  &&  c2.remainder === '') {
            ret = that.concatNotUndefined(null, this['output']());
            ret = that.concatNotUndefined(ret, { type: 'hyphen' });
          } else if (c3  &&  c3.remainder === '') {
            ret = that.concatNotUndefined(null, that.actions['d='](m));
            ret = that.concatNotUndefined(ret, this['output']());
          } else {
            ret = that.concatNotUndefined(null, this['output']());
            ret = that.concatNotUndefined(ret, that.actions['bond'](m, '-'));
          }
          return ret;
        },
        'a to o': function (m) {
            that.buffer.o = that.buffer.a;
            that.buffer.a = undefined;
        },
        'sb=true': function (m) { that.buffer.sb = true; },
        'sb=false': function (m) { that.buffer.sb = false; },
        'beginsWithBond=true': function (m) { that.buffer.beginsWithBond = true; },
        'beginsWithBond=false': function (m) { that.buffer.beginsWithBond = false; },
        'state of aggregation': function (m) {
            m = (new MhchemParser()).parse(m, 'o');
            return { type: 'state of aggregation', p1: m };
        },
        'output': function (m) {
          if (!that.buffer.r) {
            var ret = [];
            if (!that.buffer.a && !that.buffer.b && !that.buffer.p &&
             !that.buffer.o && !that.buffer.q && !that.buffer.d) {
              ret = null;
            } else {
              if (that.buffer.sb) {
                ret.push({ type: 'entitySkip' });
              }
              if (!that.buffer.o && !that.buffer.q && !that.buffer.d &&
               !that.buffer.b && !that.buffer.p) {
                that.buffer.o = (new MhchemParser()).parse(that.buffer.a, 'o');
                that.buffer.a = undefined;
              } else if (!that.buffer.o && !that.buffer.q && !that.buffer.d) {
                that.buffer.o = (new MhchemParser()).parse(that.buffer.a, 'o');
                that.buffer.d = (new MhchemParser()).parse(that.buffer.b, 'bd');
                that.buffer.q = (new MhchemParser()).parse(that.buffer.p, 'pq');
                that.buffer.a = that.buffer.b = that.buffer.p = undefined;
              } else {
                if (that.buffer.o && that.buffer['d-type']=='kv' && !that.buffer.q) {
                  that.buffer['d-type'] = undefined;
                }
                that.buffer.a = (new MhchemParser()).parse(that.buffer.a, 'a');
                that.buffer.b = (new MhchemParser()).parse(that.buffer.b, 'bd');
                that.buffer.p = (new MhchemParser()).parse(that.buffer.p, 'pq');
                that.buffer.o = (new MhchemParser()).parse(that.buffer.o, 'o');
                that.buffer.d = (new MhchemParser()).parse(that.buffer.d, 'bd');
                that.buffer.q = (new MhchemParser()).parse(that.buffer.q, 'pq');
              }
              ret.push({
                type: 'chemfive',
                a: that.buffer.a,
                b: that.buffer.b,
                p: that.buffer.p,
                o: that.buffer.o,
                q: that.buffer.q,
                d: that.buffer.d,
                'd-type': that.buffer['d-type']
              });
            }
            that.buffer = { beginsWithBond: that.buffer.beginsWithBond };
            return ret;
          } else {  // r
            if (that.buffer.rdt === 'M') {
              that.buffer.rd = (new MhchemParser()).parse(that.buffer.rd, 'tex-math');
            } else if (that.buffer.rdt === 'T') {
              that.buffer.rd = [ { type: 'text', p1: that.buffer.rd } ];
            } else {
              that.buffer.rd = (new MhchemParser()).parse(that.buffer.rd);
            }
            if (that.buffer.rqt === 'M') {
              that.buffer.rq = (new MhchemParser()).parse(that.buffer.rq, 'tex-math');
            } else if (that.buffer.rqt === 'T') {
              that.buffer.rq = [ { type: 'text', p1: that.buffer.rq } ];
            } else {
              that.buffer.rq = (new MhchemParser()).parse(that.buffer.rq);
            }
            ret = {
              type: 'arrow',
              r: that.buffer.r,
              rd: that.buffer.rd,
              rq: that.buffer.rq
            };
            that.buffer = {};
            return ret;
          }
        },
        'param1=': function (m) { that.buffer.param1 = m; },
        'frac-output': function (m) {
          that.buffer.param1 = (new MhchemParser()).parse(that.buffer.param1);
          return { type: 'frac-ce', p1: that.buffer.param1, p2: (new MhchemParser()).parse(m) };
        },
        'overset-output': function (m) {
          that.buffer.param1 = (new MhchemParser()).parse(that.buffer.param1);
          return { type: 'overset', p1: that.buffer.param1, p2: (new MhchemParser()).parse(m) };
        },
        'underset-output': function (m) {
          that.buffer.param1 = (new MhchemParser()).parse(that.buffer.param1);
          return { type: 'underset', p1: that.buffer.param1, p2: (new MhchemParser()).parse(m) };
        },
        'underbrace-output': function (m) {
          that.buffer.param1 = (new MhchemParser()).parse(that.buffer.param1);
          return { type: 'underbrace', p1: that.buffer.param1, p2: (new MhchemParser()).parse(m) };
        },
        'color-output': function (m) {
          var color2 = (new MhchemParser()).parse(m);
          return { type: 'color', color1: that.buffer.param1, color2: color2 };
        },
        'r=': function (m) { that.buffer.r = (that.buffer.r || '') + m; },
        'rdt=': function (m) { that.buffer.rdt = (that.buffer.rdt || '') + m; },
        'rd=': function (m) { that.buffer.rd = (that.buffer.rd || '') + m; },
        'rqt=': function (m) { that.buffer.rqt = (that.buffer.rqt || '') + m; },
        'rq=': function (m) { that.buffer.rq = (that.buffer.rq || '') + m; },
        'operator': function (m) {
          var ret = that.concatNotUndefined(null, this['output']());
          return that.concatNotUndefined(ret, { type: 'operator', kind: m });
        }
      };
      //
      // Transitions and actions of a parser
      //
      that.stateMachines['a'] = {};
      that.stateMachines['a'].transitions = [
        {
          match: 'empty',
          actions: [ { state: '*' } ]
        }, {
          match: '1/2$',
          actions: [ { state: '0', action: '1/2' } ]
        }, {
          match: 'else',
          actions: [ { state: '0', nextState: '1', revisit: true } ]
        }, {
          match: '$(...)$',
          actions: [ { state: '*', action: 'tex-math tight', nextState: '1' } ]
        }, {
          match: ',',
          actions: [ { state: '*', action: { type: 'insert', option: 'commaDecimal' } } ]
        }, {
          match: 'else',
          actions: [ { state: '*', action: 'copy' } ]
        }
      ];
      that.stateMachines['a'].actions = {};
      //
      // Transitions and actions of o parser
      //
      that.stateMachines['o'] = {};
      that.stateMachines['o'].transitions = [
        {
          match: 'empty',
          actions: [ { state: '*' } ]
        }, {
          match: '1/2$',
          actions: [ { state: '0', action: '1/2' } ]
        }, {
          match: 'else',
          actions: [ { state: '0', nextState: '1', revisit: true } ]
        }, {
          match: 'letters',
          actions: [ { state: '*', action: 'rm' } ]
        }, {
          match: '\\x',
          actions: [ { state: '*', action: 'copy' } ]
        }, {
          match: [ '${(...)}$', '$(...)$' ],
          actions: [ { state: '*', action: 'tex-math' } ]
        }, {
          match: '{(...)}',
          actions: [ { state: '*',  action: '{text}' } ]
        }, {
          match: 'else',
          actions: [ { state: '*', action: 'copy' } ]
        }
      ];
      that.stateMachines['o'].actions = {};
      //
      // Transitions and actions of text parser
      //
      that.stateMachines['text'] = {};
      that.stateMachines['text'].transitions = [
        {
          match: 'empty',
          actions: [ { state: '*', action: 'output' } ]
        }, {
          match: '\\greek',
          actions: [ { state: '*', action: [ 'output', 'rm' ] } ]
        }, {
          match: '{...}',
          actions: [ { state: 'c0', action: 'copy', nextState: 'c1' },
                     { state: 'c1', action: 'copy', nextState: '0' },
                     { state: '*', action: 'text=' } ]
        }, {
          match: [ '${(...)}$', '$(...)$' ],
          actions: [ { state: '*', action: 'tex-math' } ]
        }, {
          match: '\\,',
          actions: [ { state: '*', action: [ 'output', 'copy' ], nextState: '0' } ]
        }, {
          match: '\\x',
          actions: [ { state: '*', action: [ 'output', 'copy' ], nextState: 'c0' } ]
        }, {
          match: 'else',
          actions: [ { state: 'c0', action: 'copy', nextState: '0' },
                     { state: 'c1', nextState: '0', revisit: true },
                     { state: '*', action: 'text=' } ]
        }
      ];
      that.stateMachines['text'].actions = {
        'output': function (m) { if (that.buffer.text) {
            var ret = { type: 'text', p1: that.buffer.text }; }
            that.buffer = {};
            return ret;
        }
      };
      //
      // Transitions and actions of pq parser
      //
      that.stateMachines['pq'] = {};
      that.stateMachines['pq'].transitions = [
        {
          match: 'empty',
          actions: [ { state: '*' } ]
        }, {
          match: 'state of aggregation $',
          actions: [ { state: '*', action: 'state of aggregation' } ]
        }, {
          match: 'formula$',
          actions: [ { state: '0', nextState: 'f', revisit: true } ]
        }, {
          match: '1/2$',
          actions: [ { state: '0', action: '1/2' } ]
        }, {
          match: 'else',
          actions: [ { state: '0', nextState: '!f', revisit: true } ]
        }, {
          match: [ '${(...)}$', '$(...)$' ],
          actions: [ { state: '*', action: 'tex-math' } ]
        }, {
          match: '{...}',
          actions: [ { state: 'c0', action: 'copy', nextState: 'c1' },
                     { state: 'c1', action: 'copy', nextState: '!f' } ]
        }, {
          match: '{(...)}',
          actions: [ { state: '*', action: 'text' } ]
        }, {
          match: 'a-z',
          actions: [ { state: 'f',  action: 'tex-math' } ]
        }, {
          match: 'letters',
          actions: [ { state: '*', action: 'rm' } ]
        }, {
          match: '-9.,9',
          actions: [ { state: '*', action: '9,9'  } ]
        },{
          match: ',',
          actions: [ { state: '*', action: { type: 'insert', option: 'comma enumeration small' } } ]
        }, {
          match: '\\ce{(...)}',
          actions: [ { state: '*', action: 'ce' } ]
        }, {
          match: '\\,',
          actions: [ { state: '*', action: 'copy', nextState: '0' } ]
        }, {
          match: '\\x',
          actions: [ { state: '!f', action: 'copy', nextState: 'c0' } ]
        }, {
          match: 'else',
          actions: [ { state: 'c0', action: 'copy', nextState: '0' },
                     { state: 'c1', nextState: '0', revisit: true },
                     { state: '*', action: 'copy' } ]
        }
      ];
      that.stateMachines['pq'].actions = {
        'state of aggregation': function (m) {
            m = (new MhchemParser()).parse(m, 'o');
            return { type: 'state of aggregation subscript', p1: m };
        }
      };
      //
      // Transitions and actions of bd parser
      //
      that.stateMachines['bd'] = {};
      that.stateMachines['bd'].transitions = [
        {
          match: 'empty',
          actions: [ { state: '*' } ]
        }, {
          match: 'oxidation$',
          actions: [ { state: '0', action: 'oxidation' } ]
        }, {
          match: 'else',
          actions: [ { state: '0', nextState: '1', revisit: true } ]
        }, {
          match: '-9.,9 no missing 0',
          actions: [ { state: '*', action: '9,9' } ]
        }, {
          match: '.',
          actions: [ { state: '*', action: { type: 'insert', option: 'electron dot' }, nextState: '1' } ]
        }, {
          match: 'a-z',
          actions: [ { state: '*',  action: 'tex-math' } ]
        }, {
          match: 'letters',
          actions: [ { state: '*',  action: 'rm' } ]
        }, {
          match: [ '${(...)}$', '$(...)$' ],
          actions: [ { state: '*', action: 'tex-math' } ]
        }, {
          match: '{...}',
          actions: [ { state: 'c0', action: 'copy', nextState: 'c1' },
                     { state: 'c1', action: 'copy', nextState: '0' } ]
        }, {
          match: '{(...)}',
          actions: [ { state: '*', action: 'text' } ]
        }, {
          match: '\\ce{(...)}',
          actions: [ { state: '*', action: 'ce' } ]
        }, {
          match: '\\,',
          actions: [ { state: '*', action: 'copy' } ]
        }, {
          match: '\\x',
          actions: [ { state: '*', action: 'copy', nextState: 'c0' } ]
        }, {
          match: 'else',
          actions: [ { state: 'c0', action: 'copy', nextState: '0' },
                     { state: 'c1', nextState: '0', revisit: true },
                     { state: '*', action: 'copy' } ]
        }
      ];
      that.stateMachines['bd'].actions = {
        'oxidation': function (m) { return { type: 'oxidation', p1: m }; }
      };
      //
      // Transitions and actions of tex-math parser
      //
      that.stateMachines['tex-math'] = {};
      that.stateMachines['tex-math'].transitions = [
        {
          match: 'empty',
          actions: [ { state: '*', action: 'output' } ]
        }, {
          match: '\\ce{(...)}',
          actions: [ { state: '*', action: [ 'output', 'ce' ] } ]
        }, {
          match: [ '{...}', '\\,', '\\x' ],
          actions: [ { state: '*', action: 'o=' } ]
        }, {
          match: 'else',
          actions: [ { state: '*', action: 'o=' } ]
        }
      ];
      that.stateMachines['tex-math'].actions = {
        'output': function (m) {
          if (that.buffer.o) {
            var ret = { type: 'tex-math', p1: that.buffer.o };
            that.buffer = {};
            return ret;
          }
          return null;
        }
      };
      //
      // Transitions and actions of tex-math-tight parser
      //
      that.stateMachines['tex-math tight'] = {};
      that.stateMachines['tex-math tight'].transitions = [
        {
          match: 'empty',
          actions: [ { state: '*', action: 'output' } ]
        }, {
          match: '\\ce{(...)}',
          actions: [ { state: '*', action: [ 'output', 'ce' ] } ]
        }, {
          match: [ '{...}', '\\,', '\\x' ],
          actions: [ { state: '*', action: 'o=' } ]
        }, {
          match: [ '-', '+' ],
          actions: [ { state: '*', action: 'tight operator' } ]
        }, {
          match: 'else',
          actions: [ { state: '*', action: 'o=' } ]
        }
      ];
      that.stateMachines['tex-math tight'].actions = {
        'tight operator': function (m) { that.buffer.o = (that.buffer.o || '') + '{'+m+'}'; },
        'output': function (m) {
          if (that.buffer.o) {
            var ret = { type: 'tex-math', p1: that.buffer.o };
            that.buffer = {};
            return ret;
          }
          return null;
        }
      };
      //
      // Transitions and actions of 9,9 parser
      //
      that.stateMachines['9,9'] = {};
      that.stateMachines['9,9'].transitions = [
        {
          match: 'empty',
          actions: [ { state: '*' } ]
        }, {
          match: ',',
          actions: [ { state: '*', action: 'comma' } ]
        }, {
          match: 'else',
          actions: [ { state: '*', action: 'copy' } ]
        }
      ];
      that.stateMachines['9,9'].actions = {
        'comma': function (m) { return { type: 'commaDecimal' }; }
      };

      return that;
    },

    //
    // Take MhchemParser output and convert it to TeX
    // (recursive)
    //
    texify: function texify(input) {
      if (!input) { return input; }
      var types = {
        'chemfive': function (buf) {
          var res = '';
          buf.a = texify(buf.a);
          buf.b = texify(buf.b);
          buf.p = texify(buf.p);
          buf.o = texify(buf.o);
          buf.q = texify(buf.q);
          buf.d = texify(buf.d);
          //
          // a
          //
          if (buf.a) { res += buf.a + '\\,'; }
          //
          // b and p
          //
          if (buf.b || buf.p) {
            res += '\\mskip1.5mu ';
            res += '{\\vphantom{X}}';
            res += '^{\\hphantom{'+(buf.b||'')+'}}_{\\hphantom{'+(buf.p||'')+'}}';
            res += '\\mskip-1mu ';
            res += '{\\vphantom{X}}';
            res += '^{\\smash[t]{\\vphantom{2}}\\llap{'+(buf.b||'')+'}}';
            res += '_{\\vphantom{2}\\llap{\\smash[t]{'+(buf.p||'')+'}}}';
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
        'state of aggregation': function (buf) { return '\\mskip3mu '+texify(buf.p1); },
        'state of aggregation subscript': function (buf) { return '\\mskip2mu '+texify(buf.p1)+'\\mskip1mu '; },
        'bond': function (buf) {
          var bonds = {
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
            '<-': '{\\leftarrow}'
          };
          if (!bonds[buf.kind]) {
            throw ['MhchemErrorUnknownBond', 'mhchem Error – Unknown bond type'];
          }
          return bonds[buf.kind];
        },
        'frac': function (buf) {
            var c = '\\frac{' + buf.p1 + '}{' + buf.p2 + '}';
            return '\\mathchoice{\\textstyle'+c+'}{'+c+'}{'+c+'}{'+c+'}';
         },
        'tex-math': function (buf) { return buf.p1 + '{}'; },
        'frac-ce': function (buf) {
          return '\\frac{' + texify(buf.p1) + '}{' + texify(buf.p2) + '}';
        },
        'overset': function (buf) {
          return '\\overset{' + texify(buf.p1) + '}{' + texify(buf.p2) + '}';
        },
        'underset': function (buf) {
          return '\\underset{' + texify(buf.p1) + '}{' + texify(buf.p2) + '}';
        },
        'underbrace': function (buf) {
          return '\\underbrace{' + texify(buf.p1) + '}_{' + texify(buf.p2) + '}';
        },
        'color': function (buf) {
          return '\\color{' + buf.color1 + '}{' + texify(buf.color2) + '}';
        },
        'arrow': function (buf) {
          var arrows = {
            '->': 'rightarrow',
            '<-': 'leftarrow',
            '<->': 'leftrightarrow',
            '<-->': 'leftrightarrows',
            '<=>': 'rightleftharpoons',
            '<=>>': 'Rightleftharpoons',
            '<<=>': 'Leftrightharpoons'
          };
          buf.rd = texify(buf.rd);
          buf.rq = texify(buf.rq);
          var arrow = arrows[buf.r];
          if (buf.rd || buf.rq) {
            if (buf.rq) {arrow += "[{"+buf.rq+"}]";}
            arrow += "{"+buf.rd+"}";
            arrow = ' \\mkern3mu\\mathrel{\\x'+arrow+'}\\mkern3mu ';
          } else {
            arrow = ' \\mkern3mu\\long'+arrow+'\\mkern3mu ';
          }
          return arrow;
        },
        'operator': function(buf) {
          var operators = {
            '+': ' \\mkern3mu+\\mkern3mu ',
            '-': ' \\mkern3mu-\\mkern3mu ',
            '=': ' \\mkern3mu=\\mkern3mu ',
            '\\pm': ' \\mkern3mu\\pm\\mkern3mu ',
            '$\\pm$': ' \\mkern3mu\\pm\\mkern3mu ',
            'v': ' \\downarrow{} ',
            '(v)': ' \\downarrow{} ',
            '^': ' \\uparrow{} ',
            '(^)': ' \\uparrow{} '
          };
          return operators[buf.kind];
        }
      };
      var entities = {
        'space': ' ',
        'entitySkip': '\\,',
        'commaDecimal': '{,}',
        'comma enumeration': '{,}\\mkern3mu ',
        'comma enumeration small': '{,}\\mkern1mu ',
        'hyphen': '\\text{-}',
        'addition compound': '\\,{\\cdot}\\,',
        'electron dot': '\\mkern1mu \\bullet\\mkern1mu ',
        '^': 'uparrow',
        'v': 'downarrow'
      };

      var res = '';
      for (var i=0; i<input.length; i++) {
        if (typeof input[i] === 'string') {
          res += input[i];
        } else if (types[input[i].type]) {
          res += types[input[i].type](input[i]);
        } else if (entities[input[i].type]) {
          res += entities[input[i].type];
        } else {
          throw ['InternalMhchemErrorUnknownMhchemParserOutput', 'Internal mhchem Error – Unknown MhchemParser output'];
        }
      }
      return res;
    }
    
  });
  
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
