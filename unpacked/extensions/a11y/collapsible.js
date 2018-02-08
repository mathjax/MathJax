/*************************************************************
 *
 *  [Contrib]/a11y/collapsible.js
 *  
 *  A filter to add maction elements to the enriched MathML for parts that
 *  can be collapsed.  We determine this based on a "complexity" value and
 *  collapse those terms that exceed a given complexity.
 *
 *  The parameters controlling the complexity measure still need work.
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2016-2018 The MathJax Consortium
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

(function (HUB) {
  var MML;
  
  var SETTINGS = HUB.config.menuSettings;
  var COOKIE = {};   // replaced when menu is available
  
  var NOCOLLAPSE = 10000000; // really big complexity
  var COMPLEXATTR = "data-semantic-complexity";

  //
  //  Set up the a11y path,if it isn't already in place
  //
  var PATH = MathJax.Ajax.config.path;
  if (!PATH.a11y) PATH.a11y = HUB.config.root + "/extensions/a11y";

  var Collapsible = MathJax.Extension.collapsible = {
    version: "1.4.0",
    config: HUB.CombineConfig("collapsible",{
      disabled: false
    }),
    dependents: [],            // the extensions that depend on this one
    COMPLEXATTR: COMPLEXATTR,  // attribute name for the complexity value

    /*****************************************************************/

    //
    //  Complexity values to use for different structures
    //
    COMPLEXITY: {
      TEXT: .5,           // each character of a token element adds this to complexity
      TOKEN: .5,          // each toekn element gets this additional complexity
      CHILD: 1,           // child nodes add this to their parent node's complexity

      SCRIPT: .8,         // script elements reduce their complexity by this factor
      SQRT: 2,            // sqrt adds this extra complexity
      SUBSUP: 2,          // sub-sup adds this extra complexity
      UNDEROVER: 2,       // under-over adds this extra complexity
      FRACTION: 2,        // fractions add this extra complexity
      ACTION: 2,          // maction adds this extra complexity
      PHANTOM: 0,         // mphantom makes complexity 0?
      XML: 2,             // Can't really measure complexity of annotation-xml, so punt
      GLYPH: 2            // Can't really measure complexity of mglyph, to punt
    },
    //
    //  These are the cut-off complexity values for when
    //  the structure should collapse
    //
    COLLAPSE: {
      identifier: 3,
      number: 3,
      text: 10,
      infixop: 15,
      relseq: 15,
      multirel: 15,
      fenced: 18,
      bigop: 20,
      integral: 20,
      fraction: 12,
      sqrt: 9,
      root: 12,
      vector: 15,
      matrix: 15,
      cases: 15,
      superscript: 9,
      subscript: 9,
      subsup: 9,
      punctuated: {
        endpunct: NOCOLLAPSE,
        startpunct: NOCOLLAPSE,
        value: 12
      }
    },
    //
    //  These are the characters to use for the various collapsed elements
    //  (if an object, then semantic-role is used to get the character 
    //  from the object)
    //
    MARKER: {
      identifier: "x",
      number: "#",
      text: "...",
      appl: {
        "limit function": "lim",
        value: "f()"
      },
      fraction: "/",
      sqrt: "\u221A",
      root: "\u221A",
      superscript: "\u25FD\u02D9",
      subscript: "\u25FD.",
      subsup:"\u25FD:",
      vector: {
        binomial: "(:)",
        determinant: "|:|",
        value: "\u27E8:\u27E9"
      },
      matrix: {
        squarematrix: "[::]",
        rowvector: "\u27E8\u22EF\u27E9",
        columnvector: "\u27E8\u22EE\u27E9",
        determinant: "|::|",
        value: "(::)"
      },
      cases: "{:",
      infixop: {
        addition: "+",
        subtraction: "\u2212",
        multiplication: "\u22C5",
        implicit: "\u22C5",
        value: "+"
      },
      punctuated: {
        text: "...",
        value: ","
      }
    },

    /*****************************************************************/

    Enable: function (update,menu) {
      SETTINGS.collapsible = true;
      if (menu) COOKIE.collapsible = true;
      this.config.disabled = false;
      MathJax.Extension["semantic-enrich"].Enable(false,menu);
      if (update) HUB.Queue(["Reprocess",HUB]);
    },
    Disable: function (update,menu) {
      SETTINGS.collapsible = false;
      if (menu) COOKIE.collapsible = false;
      this.config.disabled = true;
      for (var i = this.dependents.length-1; i >= 0; i--) {
        var dependent = this.dependents[i];
        if (dependent.Disable) dependent.Disable(false,menu);
      }
      if (update) HUB.Queue(["Reprocess",HUB]);
    },
    
    //
    //  Register a dependent
    //
    Dependent: function (extension) {
      this.dependents.push(extension);
    },

    Startup: function () {
      MML = MathJax.ElementJax.mml;
      //
      //  Inform semantic-enrich extension that we are a dependent
      //
      var Enrich = MathJax.Extension["semantic-enrich"];
      if (Enrich) Enrich.Dependent(this);
      //
      //  Add the filter into the post-input hooks (priority 100, so other
      //  hooks run first, in particular, the enrichment hook).
      //
      HUB.postInputHooks.Add(["Filter",Collapsible],100);
    },
    
    //
    //  The main filter:  add mactions for collapsing the math.
    //
    Filter: function (jax,id,script) {
      if (!jax.enriched || this.config.disabled) return;
      jax.root = jax.root.Collapse();
      jax.root.inputID = script.id;
    },
    
    /*****************************************************************/

    //
    //  Create a marker from a given string of characters
    //  (several possibilities are commented out)
    //
//    Marker: function (c) {return MML.mtext("\u25C3"+c+"\u25B9").With({mathcolor:"blue",attr:{},attrNames:[]})},
//    Marker: function (c) {return MML.mtext("\u25B9"+c+"\u25C3").With({mathcolor:"blue",attr:{},attrNames:[]})},
    Marker: function (c) {return MML.mtext("\u25C2"+c+"\u25B8").With({mathcolor:"blue",attr:{},attrNames:[]})},
//    Marker: function (c) {return MML.mtext("\u25B8"+c+"\u25C2").With({mathcolor:"blue",attr:{},attrNames:[]})},
//    Marker: function (c) {return MML.mtext("\u27EA"+c+"\u27EB").With({mathcolor:"blue",attr:{},attrNames:[]})},



    /*****************************************************************/

    //
    //  Make a collapsible element using maction that contains
    //  an appropriate marker, and the expanded MathML.
    //  If the MathML is a <math> node, make an mrow to use instead,
    //    and move the semantic data to it (I guess it would have been
    //    easier to have had that done initially, oh well).
    //
    MakeAction: function (collapse,mml) {
      var maction = MML.maction(collapse).With({
        id:this.getActionID(), actiontype:"toggle",
        complexity:collapse.getComplexity(), collapsible:true,
        attrNames:["id","actiontype","selection",COMPLEXATTR], attr:{}, selection:2
      });
      maction.attr[COMPLEXATTR] = maction.complexity;
      if (mml.type === "math") {
        var mrow = MML.mrow().With({
          complexity: mml.complexity,
          attrNames: [], attr: {}
        });
        mrow.Append.apply(mrow,mml.data);
        for (var i = mml.attrNames.length-1, name; name = mml.attrNames[i]; i--) {
          if (name.substr(0,14) === "data-semantic-") {
            mrow.attr[name] = mml.attr[name];
            mrow.attrNames.push(name);
            delete mml.attr[name];
            mml.attrNames.splice(i,1);
          }
        }
        mrow.complexity = mml.complexity;
        maction.Append(mrow); mml.data = []; mml.Append(maction);
        mml.complexity = maction.complexity; maction = mml;
      } else {
        maction.Append(mml);
      }
      return maction;
    },
    
    actionID: 1,
    getActionID: function () {return "MJX-Collapse-"+this.actionID++},

    /*****************************************************************/

    //
    //  If there is a specific routine for the type, do that, otherwise
    //  check if there is a complexity cut-off and marker for this type.
    //  If so, check if the complexity exceeds the cut off, and
    //    collapse using the appropriate marker for the type
    //  Return the (possibly modified) MathML
    //
    Collapse: function (mml) {
      mml.getComplexity();
      var type = (mml.attr||{})["data-semantic-type"];
      if (type) {
        if (this["Collapse_"+type]) mml = (this["Collapse_"+type])(mml);
        else if (this.COLLAPSE[type] && this.MARKER[type]) {
          var role = mml.attr["data-semantic-role"];
          var complexity = this.COLLAPSE[type];
          if (typeof(complexity) !== "number") complexity = complexity[role] || complexity.value;
          if (mml.complexity > complexity) {
            var marker = this.MARKER[type];
            if (typeof(marker) !== "string") marker = marker[role] || marker.value;
            mml = this.MakeAction(this.Marker(marker),mml);
          }
        }
      }
      return mml;
    },

    //
    //  If a parent is going to be collapsible, if can call this
    //  to put back a collapsed child (rather than have too many 
    //  nested collapsings)
    //
    UncollapseChild: function (mml,n,m) {
      if (m == null) m = 1;
      if (this.SplitAttribute(mml,"children").length === m) {
        var child = (mml.data.length === 1 && mml.data[0].inferred ? mml.data[0] : mml);
        if (child && child.data[n] && child.data[n].collapsible) {
          child.SetData(n,child.data[n].data[1]);
          mml.complexity = child.complexity = null; mml.getComplexity();
          return 1;
        }
      }
      return 0;
    },
    
    //
    //  Locate child node and return its text
    //
    FindChildText: function (mml,id) {
      var child = this.FindChild(mml,id);
      return (child ? (child.CoreMO()||child).data.join("") : "?");
    },
    FindChild: function (mml,id) {
      if (mml) {
        if (mml.attr && mml.attr["data-semantic-id"] === id) return mml;
        if (!mml.isToken) {
          for (var i = 0, m = mml.data.length; i < m; i++) {
            var child = this.FindChild(mml.data[i],id);
            if (child) return child;
          }
        }
      }
      return null;
    },
    
    //
    //  Split a data attribute at commas
    //
    SplitAttribute: function (mml,id) {
      return (mml.attr["data-semantic-"+id]||"").split(/,/);
    },

    /*****************************************************************/
    /*
     *  These routines implement the collapsing of the various semantic types
     */

    //
    //  For fenced elements, if the contents are collapsed,
    //    collapse the fence instead.
    //
    Collapse_fenced: function (mml) {
      this.UncollapseChild(mml,1);
      if (mml.complexity > this.COLLAPSE.fenced) {
        if (mml.attr["data-semantic-role"] === "leftright") {
          var marker = mml.data[0].data.join("") + mml.data[mml.data.length-1].data.join("");
          mml = this.MakeAction(this.Marker(marker),mml);
        }
      }
      return mml;
    },
    
    //
    //  Collapse function applications if the argument is collapsed
    //  (Handle role="limit function" a bit better?)
    //
    Collapse_appl: function (mml) {
      if (this.UncollapseChild(mml,2,2)) {
        var marker = this.MARKER.appl;
        marker = marker[mml.attr["data-semantic-role"]] || marker.value;
        mml = this.MakeAction(this.Marker(marker),mml);
      }
      return mml;
    },

    //
    //  For sqrt elements, if the contents are collapsed,
    //    collapse the sqrt instead.
    //
    Collapse_sqrt: function (mml) {
      this.UncollapseChild(mml,0);
      if (mml.complexity > this.COLLAPSE.sqrt)
        mml = this.MakeAction(this.Marker(this.MARKER.sqrt),mml);
      return mml;
    },
    Collapse_root: function (mml) {
      this.UncollapseChild(mml,0);
      if (mml.complexity > this.COLLAPSE.sqrt)
        mml = this.MakeAction(this.Marker(this.MARKER.sqrt),mml);
      return mml;
    },

    //
    //  For enclose, include enclosure in collapsed child, if any
    //
    Collapse_enclose: function (mml) {
      if (this.SplitAttribute(mml,"children").length === 1) {
        var child = (mml.data.length === 1 && mml.data[0].inferred ? mml.data[0] : mml);
        if (child.data[0] && child.data[0].collapsible) {
          //
          //  Move menclose into the maction element
          //
          var maction = child.data[0];
          child.SetData(0,maction.data[1]);
          maction.SetData(1,mml);
          mml = maction;
        }
      }
      return mml;
    },

    //
    //  For bigops, get the character to use from the largeop at its core.
    //
    Collapse_bigop: function (mml) {
      if (mml.complexity > this.COLLAPSE.bigop || mml.data[0].type !== "mo") {
        var id = this.SplitAttribute(mml,"content").pop();
        var op = Collapsible.FindChildText(mml,id);
        mml = this.MakeAction(this.Marker(op),mml);
      }
      return mml;
    },
    Collapse_integral: function (mml) {
      if (mml.complexity > this.COLLAPSE.integral || mml.data[0].type !== "mo") {
        var id = this.SplitAttribute(mml,"content")[0];
        var op = Collapsible.FindChildText(mml,id);
        mml = this.MakeAction(this.Marker(op),mml);
      }
      return mml;
    },
    
    //
    //  For multirel and relseq, use proper symbol
    //
    Collapse_relseq: function (mml) {
      if (mml.complexity > this.COLLAPSE.relseq) {
        var content = this.SplitAttribute(mml,"content");
        var marker = Collapsible.FindChildText(mml,content[0]);
        if (content.length > 1) marker += "\u22EF";
        mml = this.MakeAction(this.Marker(marker),mml);
      }
      return mml;
    },
    Collapse_multirel: function (mml) {
      if (mml.complexity > this.COLLAPSE.multirel) {
        var content = this.SplitAttribute(mml,"content");
        var marker = Collapsible.FindChildText(mml,content[0]) + "\u22EF";
        mml = this.MakeAction(this.Marker(marker),mml);
      }
      return mml;
    },

    //
    //  Include super- and subscripts into a collapsed base
    //
    Collapse_superscript: function (mml) {
      this.UncollapseChild(mml,0,2);
      if (mml.complexity > this.COLLAPSE.superscript)
        mml = this.MakeAction(this.Marker(this.MARKER.superscript),mml);
      return mml;
    },
    Collapse_subscript: function (mml) {
      this.UncollapseChild(mml,0,2);
      if (mml.complexity > this.COLLAPSE.subscript)
        mml = this.MakeAction(this.Marker(this.MARKER.subscript),mml);
      return mml;
    },
    Collapse_subsup: function (mml) {
      this.UncollapseChild(mml,0,3);
      if (mml.complexity > this.COLLAPSE.subsup)
        mml = this.MakeAction(this.Marker(this.MARKER.subsup),mml);
      return mml;
    }
  };

  HUB.Register.StartupHook("End Extensions", function () {
    if (SETTINGS.collapsible == null) {
      SETTINGS.collapsible = !Collapsible.config.disabled;
    } else {
      Collapsible.config.disabled = !SETTINGS.collapsible;
    }
    HUB.Register.StartupHook("MathMenu Ready", function () {
      COOKIE = MathJax.Menu.cookie;
      var Switch = function(menu) {
        Collapsible[SETTINGS.collapsible ? "Enable" : "Disable"](true,true);
        MathJax.Menu.saveCookie();
      };
      var ITEM = MathJax.Menu.ITEM,
          MENU = MathJax.Menu.menu;
      var menu = ITEM.CHECKBOX(
        ['CollapsibleMath','Collapsible Math'], 'collapsible', {action: Switch}
      );
      var submenu = (MENU.FindId('Accessibility')||{}).submenu, index;
      if (submenu) {
        index = submenu.IndexOfId('CollapsibleMath');
        if (index !== null) {
          submenu.items[index] = menu;
        } else {
          submenu.items.push(ITEM.RULE(),menu);
        }
      } else {
        index = MENU.IndexOfId('About');
        MENU.items.splice(index,0,menu,ITEM.RULE());
      }
    },15);  // before explorer extension
  },15);

})(MathJax.Hub);


/*****************************************************************/
/*
 *  Add Collapse() and getComplexity() methods to the internal
 *  MathML elements, and override these in the elements that need
 *  special handling.
 */

MathJax.Ajax.Require("[a11y]/semantic-enrich.js");
MathJax.Hub.Register.StartupHook("Semantic Enrich Ready", function () {
  var MML = MathJax.ElementJax.mml,
      Collapsible = MathJax.Extension.collapsible,
      COMPLEXITY = Collapsible.COMPLEXITY,
      COMPLEXATTR = Collapsible.COMPLEXATTR;
      
  Collapsible.Startup(); // Initialize the collapsing process

  MML.mbase.Augment({
    //
    //  Just call the Collapse() method from the extension by default
    //  (but can be overridden)
    //
    Collapse: function () {return Collapsible.Collapse(this)},
    //
    //  If we don't have a cached complexity value,
    //    For token elements, just use the data length,
    //    Otherwise
    //      Add up the complexities of the (collapsed) children
    //      and add the child complexity based on the number of children
    //    Cache the complexity result
    //  return the complexity
    //
    getComplexity: function () {
      if (this.complexity == null) {
        var complexity = 0;
        if (this.isToken) {
          complexity = COMPLEXITY.TEXT * this.data.join("").length + COMPLEXITY.TOKEN;
        } else {
          for (var i = 0, m = this.data.length; i < m; i++) {
            if (this.data[i]) {
              this.SetData(i,this.data[i].Collapse());
              complexity += this.data[i].complexity;
            }
          }
          if (m > 1) complexity += m * COMPLEXITY.CHILD;
        }
        if (this.attrNames && !("complexity" in this)) this.attrNames.push(COMPLEXATTR);
        if (this.attr) this.attr[COMPLEXATTR] = complexity;
        this.complexity = complexity;
      }
      return this.complexity;
    },
    reportComplexity: function () {
      if (this.attr && this.attrNames && !(COMPLEXATTR in this.attr)) {
        this.attrNames.push(COMPLEXATTR);
        this.attr[COMPLEXATTR] = this.complexity;
      }
    }
  });

  //
  //  For fractions, scale the complexity of the parts, and add
  //  a complexity for fractions.
  //
  MML.mfrac.Augment({
    getComplexity: function () {
      if (this.complexity == null) {
        this.SUPER(arguments).getComplexity.call(this);
        this.complexity *= COMPLEXITY.SCRIPT;
        this.complexity += COMPLEXITY.FRACTION;
        this.attr[COMPLEXATTR] = this.complexity;
      }
      return this.complexity;
    }
  });
  
  //
  //  Square roots add extra complexity
  //
  MML.msqrt.Augment({
    getComplexity: function () {
      if (this.complexity == null) {
        this.SUPER(arguments).getComplexity.call(this);
        this.complexity += COMPLEXITY.SQRT;
        this.attr[COMPLEXATTR] = this.complexity;
      }
      return this.complexity;
    }
  });
  MML.mroot.Augment({
    getComplexity: function () {
      if (this.complexity == null) {
        this.SUPER(arguments).getComplexity.call(this);
        this.complexity -= (1-COMPLEXITY.SCRIPT) * this.data[1].getComplexity();
        this.complexity += COMPLEXITY.SQRT;
        this.attr[COMPLEXATTR] = this.complexity;
      }
      return this.complexity;
    }
  });
  
  //
  //  For msubsup, use the script complexity factor,
  //    take the maximum of the scripts,
  //    and add the sub-sup complexity
  //
  MML.msubsup.Augment({
    getComplexity: function () {
      if (this.complexity == null) {
        var C = 0;
        if (this.data[this.sub]) C = this.data[this.sub].getComplexity() + COMPLEXITY.CHILD;
        if (this.data[this.sup]) C = Math.max(this.data[this.sup].getComplexity(),C);
        C *= COMPLEXITY.SCRIPT;
        if (this.data[this.sub]) C += COMPLEXITY.CHILD;
        if (this.data[this.sup]) C += COMPLEXITY.CHILD;
        if (this.data[this.base]) C += this.data[this.base].getComplexity() + COMPLEXITY.CHILD;
        this.complexity = C + COMPLEXITY.SUBSUP;
        this.reportComplexity();
      }
      return this.complexity;
    }
  });

  //
  //  For munderover, use the script complexity factor,
  //    take the maximum of the scripts and the base,
  //    and add the under-over complexity
  //
  MML.munderover.Augment({
    getComplexity: function () {
      if (this.complexity == null) {
        var C = 0;
        if (this.data[this.sub]) C = this.data[this.sub].getComplexity() + COMPLEXITY.CHILD;
        if (this.data[this.sup]) C = Math.max(this.data[this.sup].getComplexity(),C);
        C *= COMPLEXITY.SCRIPT;
        if (this.data[this.base]) C = Math.max(this.data[this.base].getComplexity(),C);
        if (this.data[this.sub])  C += COMPLEXITY.CHILD;
        if (this.data[this.sup])  C += COMPLEXITY.CHILD;
        if (this.data[this.base]) C += COMPLEXITY.CHILD;
        this.complexity = C + COMPLEXITY.UNDEROVER;
        this.reportComplexity();
      }
      return this.complexity;
    }
  });
  
  //
  //  For mphantom, complexity is 0?
  //
  MML.mphantom.Augment({
    getComplexity: function () {
      this.complexity = COMPLEXITY.PHANTOM;
      this.reportComplexity();
      return this.complexity;
    }
  });
  
  //
  //  For ms, add width of quotes.  Don't cache the result, since
  //  mstyle above it could affect the result.
  //
  MML.ms.Augment({
    getComplexity: function () {
      this.SUPER(arguments).getComplexity.call(this);
      this.complexity += this.Get("lquote").length * COMPLEXITY.TEXT;
      this.complexity += this.Get("rquote").length * COMPLEXITY.TEXT;
      this.attr[COMPLEXATTR] = this.complexity;
      return this.complexity;
    }
  });

// ### FIXME:  getComplexity special cases: 
//             mtable, mfenced, mmultiscript

  //
  //  For menclose, complexity goes up by a fixed amount
  //
  MML.menclose.Augment({
    getComplexity: function () {
      if (this.complexity == null) {
        this.SUPER(arguments).getComplexity.call(this);
        this.complexity += COMPLEXITY.ACTION;
        this.attr[COMPLEXATTR] = this.complexity;
      }
      return this.complexity;
    }
  });

  //
  //  For maction, complexity is complexity of selected element
  //
  MML.maction.Augment({
    getComplexity: function () {
      //
      //  Don't cache it, since selection can change.
      //
      this.complexity = (this.collapsible ? this.data[0] : this.selected()).getComplexity();
      this.reportComplexity();
      return this.complexity;
    }
  });

  //
  //  For semantics, complexity is complexity of first child
  //
  MML.semantics.Augment({
    getComplexity: function () {
      if (this.complexity == null) {
        this.complexity = (this.data[0] ? this.data[0].getComplexity() : 0);
        this.reportComplexity();
      }
      return this.complexity;
    }
  });

  //
  //  Use fixed complexity, since we can't really measure it
  //
  MML["annotation-xml"].Augment({
    getComplexity: function () {
      this.complexity = COMPLEXITY.XML;
      this.reportComplexity();
      return this.complexity;
    }
  });
  MML.annotation.Augment({
    getComplexity: function () {
      this.complexity = COMPLEXITY.XML;
      this.reportComplexity();
      return this.complexity;
    }
  });

  //
  //  Use fixed complexity, since we can't really measure it
  //
  MML.mglyph.Augment({
    getComplexity: function () {
      this.complexity = COMPLEXITY.GLYPH;
      this.reportComplexity();
      return this.complexity;
    }
  });

  //
  //  Signal that we are ready
  //
  MathJax.Hub.Startup.signal.Post("Collapsible Ready");
  MathJax.Ajax.loadComplete("[a11y]/collapsible.js");
});

