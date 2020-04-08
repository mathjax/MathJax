/*************************************************************
 *
 *  MathJax/extensions/TeX/text-macros.js
 *  
 *  Implements the processing of some text-mode macros inside
 *  \text{} and other text boxes.
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2018-2020 The MathJax Consortium
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

MathJax.Extension["TeX/text-macros"] = {
  version: "2.7.8"
};

MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
  var MML = MathJax.ElementJax.mml;
  var TEX = MathJax.InputJax.TeX;
  var TEXDEF = TEX.Definitions;

  TEX.Parse.Augment({
    //
    // Replace InternalMath with parser that handles some text macros
    //
    InternalMath: function(text,level) {
      var mml = TextParser(text, {}).Parse();
      if (level != null) {
        mml = [MML.mstyle.apply(MML,mml).With({displaystyle:false, scriptlevel:level})];
      } else if (mml.length > 1) {
        mml = [MML.mrow.apply(MML,mml)];
      }
      return mml;
    },

    //
    //  Correctly skip newline as well as comment
    //
    Comment: function (c) {
      while (this.i < this.string.length && this.string.charAt(this.i) != "\n") {this.i++}
      this.i++;
    },

    //
    // Correctly skip trailing space as well
    //
    GetCS: function () {
      var CS = this.string.slice(this.i).match(/^([a-z]+|.) ?/i);
      if (CS) {this.i += CS[0].length; return CS[1]} else {this.i++; return " "}
    }

  });

  //
  //  The text parser is a subclass of the math parser, so we can use
  //  some of the existing methods (like GetArgument()), and some of the
  //  control sequence implementations (like Macro, Spacer, etc.)
  //
  var TextParser = TEX.TextParser = TEX.Parse.Subclass({

    Init: function (text, env) {
      this.env = MathJax.Hub.Insert({},env);
      this.stack = {env: this.env};
      this.string = text;
      this.i = 0;
      this.mml = [];  // the accumulated MathML elements
      this.text = ''; // the accumulated text so far
    },

    //
    //  These are the special characters in text mode
    //
    textSpecial: {
      '\\': 'ControlSequence',
      '$': 'Math',
      '%': 'Comment',
      '^': 'MathModeOnly',
      '_': 'MathModeOnly',
      '&': 'Misplaced',
      '#': 'Misplaced',
      '~': 'Tilde',
      ' ': 'Space',
      '\t': 'Space',
      '\r': 'Space',
      '\n': 'Space',
      '\u00A0': 'Tilde',
      '{': 'OpenBrace',
      '}': 'CloseBrace',
      '`': 'OpenQuote',
      "'": 'CloseQuote'
    },

    //
    //  These are text-mode macros we support
    //
    textMacros: {
      '(': 'Math',

      '$': 'SelfQuote',
      '_': 'SelfQuote',
      '%': 'SelfQuote',
      '{': 'SelfQuote',
      '}': 'SelfQuote',
      ' ': 'SelfQuote',
      '&': 'SelfQuote',
      '#': 'SelfQuote',
      '\\': 'SelfQuote',

      "'": ['Accent', '\u00B4'],
      '`': ['Accent', '\u0060'],
      '^': ['Accent', '^'],
      '"': ['Accent', '\u00A8'],
      '~': ['Accent', '~'],
      '=': ['Accent', '\u00AF'],
      '.': ['Accent', '\u02D9'],
      'u': ['Accent', '\u02D8'],
      'v': ['Accent', '\u02C7'],

      emph:      'Emph',
      rm:       ['SetFont',MML.VARIANT.NORMAL],
      mit:      ['SetFont',MML.VARIANT.ITALIC],
      oldstyle: ['SetFont',MML.VARIANT.OLDSTYLE],
      cal:      ['SetFont',MML.VARIANT.CALIGRAPHIC],
      it:       ['SetFont','-tex-mathit'], // needs special handling
      bf:       ['SetFont',MML.VARIANT.BOLD],
      bbFont:   ['SetFont',MML.VARIANT.DOUBLESTRUCK],
      scr:      ['SetFont',MML.VARIANT.SCRIPT],
      frak:     ['SetFont',MML.VARIANT.FRAKTUR],
      sf:       ['SetFont',MML.VARIANT.SANSSERIF],
      tt:       ['SetFont',MML.VARIANT.MONOSPACE],

      tiny:        ['SetSize',0.5],
      Tiny:        ['SetSize',0.6],  // non-standard
      scriptsize:  ['SetSize',0.7],
      small:       ['SetSize',0.85],
      normalsize:  ['SetSize',1.0],
      large:       ['SetSize',1.2],
      Large:       ['SetSize',1.44],
      LARGE:       ['SetSize',1.73],
      huge:        ['SetSize',2.07],
      Huge:        ['SetSize',2.49],

      mathcal:  'MathModeOnly',
      mathscr:  'MathModeOnly',
      mathrm:   'MathModeOnly',
      mathbf:   'MathModeOnly',
      mathbb:   'MathModeOnly',
      mathit:   'MathModeOnly',
      mathfrak: 'MathModeOnly',
      mathsf:   'MathModeOnly',
      mathtt:   'MathModeOnly',
      Bbb:     ['Macro','{\\bbFont #1}',1],
      textrm:  ['Macro','{\\rm #1}',1],
      textit:  ['Macro','{\\it #1}',1],
      textbf:  ['Macro','{\\bf #1}',1],
      textsf:  ['Macro','{\\sf #1}',1],
      texttt:  ['Macro','{\\tt #1}',1],

      dagger:   ['Insert', '\u2020'],
      ddagger:  ['Insert', '\u2021'],
      S:        ['Insert', '\u00A7']
    },

    //
    //  These are the original macros that are allowed in text mode
    //
    useMathMacros: {
      ',':          true,
      ':':          true,
      '>':          true,
      ';':          true,
      '!':          true,
      enspace:      true,
      quad:         true,
      qquad:        true,
      thinspace:    true,
      negthinspace: true,
    
      hskip:        true,
      hspace:       true,
      kern:         true,
      mskip:        true,
      mspace:       true,
      mkern:        true,
      rule:         true,
      Rule:         true,
      Space:        true,

      color:        true,
      href:         true,
      unicode:      true,

      ref:          true,
      eqref:        true
    },

    //
    //  Look through the text for special characters and process them.
    //  Save any accumulated text aat the end and return the MathML
    //   elements produced.
    //
    Parse: function () {
      var c;
      while ((c = this.string.charAt(this.i++))) {
        if (this.textSpecial.hasOwnProperty(c)) {
          this[this.textSpecial[c]](c);
        } else {
          this.text += c;
        }
      }
      this.SaveText();
      return this.mml;
    },

    //
    //  Handle a control sequence name
    //    If it is a text-mode macro, use it.
    //    Otherwise look for it in the math-mode lists
    //      Report an error if it is not there
    //      Otherwise check if it is a macro or one of the allowed control sequences
    //    Run the macro (with arguments if given)
    //
    ControlSequence: function (c) {
      var cs = this.GetCS(), name = c + cs, cmd;
      if (this.textMacros.hasOwnProperty(cs)) {
        cmd = this.textMacros[cs];
      } else {
        cmd = this.LookupCS(cs);
        if (!cmd) {
          this.Error(["UndefinedControlSequence","Undefined control sequence %1",name]);
        }
        if ((!(cmd instanceof Array) || cmd[0] !== 'Macro') &&
             !this.useMathMacros.hasOwnProperty(cs)) {
          this.Error(["MathMacro","'%1' is only supported in math mode",name]);
        }
      }
      if (cmd instanceof Array) {
        if (!this.hasOwnProperty[cmd[0]]) this.SaveText();
        this[cmd[0]].apply(this,[name].concat(cmd.slice(1)));
      } else {
        if (!this.hasOwnProperty[cmd]) this.SaveText();
        this[cmd].call(this,name);
      }
    },

    //
    //  Lookup the CS as a math-mode macro
    //
    LookupCS: function(cs) {
      if (TEXDEF.macros.hasOwnProperty(cs)) return TEXDEF.macros[cs];
      if (TEXDEF.mathchar0mi.hasOwnProperty(cs)) return TEXDEF.mathchar0mi[cs];
      if (TEXDEF.mathchar0mo.hasOwnProperty(cs)) return TEXDEF.mathchar0mo[cs];
      if (TEXDEF.mathchar7.hasOwnProperty(cs)) return TEXDEF.mathchar7[cs];
      if (TEXDEF.delimiter.hasOwnProperty('\\'+cs)) return TEXDEF.delimiter['\\'+cs];
      return null;
    },

    //
    //  Handle internal math mode
    //    Look for the close delimiter and process the contents
    //
    Math: function (open) {
      this.SaveText();
      var i = this.i, j;
      var braces = 0, c;
      while ((c = this.GetNext())) {
        j = this.i++;
        switch(c) {
          case '\\':
            var cs = this.GetCS();
            if (cs === ')') c = '\\(';
          case '$':
            if (braces === 0 && open === c) {
              this.Push(TEX.Parse(this.string.substr(i, j-i),this.env).mml());
              return;
            }
            break;

          case '{':
            braces++;
            break;

          case '}':
            if (braces == 0) {
              this.Error(["ExtraCloseMissingOpen","Extra close brace or missing open brace"]);
            }
            braces--;
            break;
        }
      }
      this.Error(["MathNotTerminated","Math not terminated in text box"]);
    },

    //
    //  Character can only be used in math mode
    //
    MathModeOnly: function (c) {
      this.Error(["MathModeOnly","'%1' allowed only in math mode",c]);
    },

    //
    //  Character is being used out of place
    //
    Misplaced: function (c) {
      this.Error(["Misplaced","'%1' can not be used here",c]);
    },

    //
    //  Braces start new environments
    //
    OpenBrace: function (c) {
      var env = this.env;
      this.env = MathJax.Hub.Insert({}, env);
      this.env.oldEnv = env;
    },
    CloseBrace: function (c) {
      if (this.env.oldEnv) {
        this.SaveText();
        this.env = this.env.oldEnv;
      } else {
        this.Error(["ExtraCloseMissingOpen","Extra close brace or missing open brace"]);
      }
    },

    //
    //  Handle open and close quotes
    //
    OpenQuote: function (c) {
      if (this.string.charAt(this.i) === c) {
        this.text += "\u201C";
        this.i++;
      } else {
        this.text += "\u2018"
      }
    },
    CloseQuote: function (c) {
      if (this.string.charAt(this.i) === c) {
        this.text += "\u201D";
        this.i++;
      } else {
        this.text += "\u2019"
      }
    },

    //
    //  Handle non-breaking and regular spaces
    //
    Tilde: function (c) {
      this.text += '\u00A0';
    },
    Space: function (c) {
      this.text += ' ';
      while (this.GetNext().match(/\s/)) this.i++;
    },

    //
    //  Insert the escaped characer
    //
    SelfQuote: function (name) {
      this.text += name.substr(1);
    },

    //
    //  Insert a given character
    //
    Insert: function (name, c) {
      this.text += c;
    },

    //
    //  Create an accented character using mover
    //
    Accent: function (name, c) {
      this.SaveText();
      var base = this.ParseArg(name);
      var accent = MML.mo(MML.chars(c));
      if (this.env.mathvariant) accent.mathvariant = this.env.mathvariant;
      this.Push(MML.mover(base,accent));
    },

    //
    //  Switch to/from italics
    //
    Emph: function (name) {
      this.UseFont(name, this.env.mathvariant === '-tex-mathit' ? 'normal' : '-tex-mathit');
    },

    //
    //  Use a given font on its argument
    //
    UseFont: function (name, variant) {
      this.SaveText();
      this.Push(this.ParseTextArg(name,{mathvariant: variant}));
    },

    //
    //  Set a font for the rest of the text
    //
    SetFont: function (name, variant) {
      this.SaveText();
      this.env.mathvariant = variant;
    },

    //
    //  Set the size to use
    //
    SetSize: function (name, size) {
      this.SaveText();
      this.env.mathsize = size;
    },

    //
    //  Process the argument as text with the given environment settings
    //
    ParseTextArg: function (name, env) {
      var text = this.GetArgument(name);
      env = MathJax.Hub.Insert(MathJax.Hub.Insert({}, this.env), env);
      delete env.oldEnv;
      return TextParser(text, env).Parse();
    },

    //
    //  Process an argument as text (overrides the math-mode version)
    //
    ParseArg: function (name) {
      var mml = TextParser(this.GetArgument(name), this.env).Parse();
      if (mml.length === 0) return mml[0];
      return MML.mrow.apply(MML.mrow, mml);
    },

    //
    //  Create an mtext element with the accumulated text, if any
    //    and set it variant
    //
    SaveText: function () {
      if (this.text) {
        var text = MML.mtext(MML.chars(this.text));
        if (this.env.mathvariant) text.mathvariant = this.env.mathvariant;
        this.Push(text);
      }
      this.text = "";
    },

    //
    //  Save a MathML element or array, setting its size and color, if any
    //
    Push: function (mml) {
      if (mml instanceof Array) {
        if (this.env.mathsize || this.env.mathcolor) {
          mml = MML.mstyle.apply(MML,mml);
          if (this.env.mathsize) mml.mathsize = this.env.mathsize;
          if (this.env.mathcolor) mml.mathcolor = this.env.mathcolor;
        }
        this.mml.push.apply(this.mml,mml);
      } else {
        if (this.env.mathsize && !mml.mathsize) mml.mathsize = this.env.mathsize;
        if (this.env.mathcolor && !mml.mathcolor) mml.mathcolor = this.env.mathcolor;
        this.mml.push(mml);
      }
    },

    //
    //  Throw an error
    //
    Error: function (message) {
      TEX.Error(message);
    }

  });
  
  MathJax.Hub.Startup.signal.Post('TeX text-macros Ready');

});

MathJax.Ajax.loadComplete('[MathJax]/extensions/TeX/text-macros.js');
