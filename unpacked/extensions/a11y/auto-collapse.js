/*************************************************************
 *
 *  [Contrib]/a11y/auto-collapse.js
 *  
 *  Implements the ability to have long expressions collapse
 *  automatically on screen size changes.
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
  var SETTINGS = HUB.config.menuSettings;
  var COOKIE = {};   // replaced when menu is available
  
  //
  //  Set up the a11y path,if it isn't already in place
  //
  var PATH = MathJax.Ajax.config.path;
  if (!PATH.a11y) PATH.a11y = HUB.config.root + "/extensions/a11y";

  var Collapse = MathJax.Extension["auto-collapse"] = {
    version: "1.4.0",
    config: HUB.CombineConfig("auto-collapse",{
      disabled: false
    }),
    dependents: [],  // the extensions that depend on this one

    /*****************************************************************/

    Enable: function (update,menu) {
      SETTINGS.autocollapse = true;
      if (menu) COOKIE.autocollapse = true
      this.config.disabled = false;
      MathJax.Extension.collapsible.Enable(false,menu);
      if (update) {
        HUB.Queue(
          ["Reprocess",HUB],
          ["CollapseWideMath",this]
        );
      }
    },
    Disable: function (update,menu) {
      SETTINGS.autocollapse = false;
      if (menu) COOKIE.autocollapse = false;
      this.config.disabled = true;
      for (var i = this.dependents.length-1; i >= 0; i--) {
        var dependent = this.dependents[i];
        if (dependent.Disable) dependent.Disable(false,menu);
      }
      if (update) HUB.Queue(["Rerender",HUB]);
    },
    
    //
    //  Register a dependent
    //
    Dependent: function (extension) {
      this.dependents.push(extension);
    },

    Startup: function () {
      //
      //  Inform collapsible extension that we are a dependent
      //
      var Collapsible = MathJax.Extension.collapsible;
      if (Collapsible) Collapsible.Dependent(this);
      //
      //  Add the filter into the post-input hooks (priority 150, so other
      //  hooks run first, in particular, the enrichment and complexity hooks).
      //
      HUB.postInputHooks.Add(["Filter",Collapse],150);
      //
      //  Add the auto-collapsing
      //
      HUB.Queue(function () {return Collapse.CollapseWideMath()});
      //
      //  Add a resize handler to check for math that needs
      //  to be collapsed or expanded.
      //
      if (window.addEventListener) window.addEventListener("resize",Collapse.resizeHandler,false);
      else if (window.attachEvent) window.attachEvent("onresize",Collapse.resizeHandler);
      else window.onresize = Collapse.resizeHandler;
    },

    //
    //  If the math is block-level (or in an element "by itself"), then
    //  add the SRE actions for this element.
    //
    Filter: function (jax,id,script) {
      if (!jax.enriched || this.config.disabled) return;
      if (jax.root.Get("display") === "block" ||
          script.parentNode.childNodes.length <= 3) {
        jax.root.SRE = {action: this.Actions(jax.root)};
      }
    },
    //
    //  Produce an array of collapsible actions
    //  sorted by depth and complexity
    //
    Actions: function (node) {
      var actions = [];
      this.getActions(node,0,actions);
      return this.sortActions(actions);
    },
    getActions: function (node,depth,actions) {
      if (node.isToken || !node.data) return;
      depth++;
      for (var i = 0, m = node.data.length; i < m; i++) {
        if (node.data[i]) {
          var child = node.data[i];
          if (child.collapsible) {
            if (!actions[depth]) actions[depth] = [];
            actions[depth].push(child);
            this.getActions(child.data[1],depth,actions);
          } else {
            this.getActions(child,depth,actions);
          }
        }
      }
    },
    sortActions: function (actions) {
      var ACTIONS = [];
      for (var i = 0, m = actions.length; i < m; i++) {
        if (actions[i]) ACTIONS = ACTIONS.concat(actions[i].sort(this.sortActionsBy));
      }
      return ACTIONS;
    },
    sortActionsBy: function (a,b) {
      a = a.data[1].complexity; b = b.data[1].complexity;
      return (a < b ? -1 : a > b ? 1 : 0);
    },
    
    /*****************************************************************/
    /*
     *  These routines implement the automatic collapsing of equations
     *  based on container widths.
     */

    //
    //  Find math that is too wide and collapse it.
    //
    CollapseWideMath: function (element) {
      if (this.config.disabled) return;
      this.GetContainerWidths(element);
      var jax = HUB.getAllJax(element);
      var state = {collapse: [], jax: jax, m: jax.length, i: 0, changed:false};
      return this.collapseState(state);
    },
    collapseState: function (state) {
      var collapse = state.collapse;
      while (state.i < state.m) {
        var jax = state.jax[state.i];
        var SRE = jax.root.SRE; state.changed = false;
        if (SRE && SRE.action.length) {
          if (SRE.cwidth < SRE.m || SRE.cwidth > SRE.M) {
            var restart = this.getActionWidths(jax,state); if (restart) return restart;
            this.collapseActions(SRE,state);
            if (state.changed) collapse.push(jax.SourceElement());
          }
        }
        state.i++;
      }
      if (collapse.length === 0) return;
      if (collapse.length === 1) collapse = collapse[0];
      return HUB.Rerender(collapse);
    },
    
    //
    //  Find the actions that need to be collapsed to acheive
    //  the correct width, and retain the sizes that would cause
    //  the equation to be expanded or collapsed further.
    //
    collapseActions: function (SRE,state) {
      var w = SRE.width, m = w, M = 1000000;
      for (var j = SRE.action.length-1; j >= 0; j--) {
        var action = SRE.action[j], selection = action.selection;
        if (w > SRE.cwidth) {
          action.selection = 1;
          m = action.SREwidth; M = w;
        } else {
          action.selection = 2;
        }
        w = action.SREwidth;
        if (SRE.DOMupdate) {
          document.getElementById(action.id).setAttribute("selection",action.selection);
        } else if (action.selection !== selection) {
          state.changed = true;
        }
      }
      SRE.m = m; SRE.M = M;
    },

    //
    //  Get the widths of the different collapsings,
    //  trapping any restarts, and restarting the process
    //  when the event has occurred.
    //
    getActionWidths: function (jax,state) {
      if (!jax.root.SRE.actionWidths) {
        MathJax.OutputJax[jax.outputJax].getMetrics(jax);
        try {this.computeActionWidths(jax)} catch (err) {
          if (!err.restart) throw err;
          return MathJax.Callback.After(["collapseState",this,state],err.restart);
        }
        state.changed = true;
      }
      return null;
    },
    //
    //  Compute the action widths by collapsing each maction,
    //  and recording the width of the complete equation.
    //
    computeActionWidths: function (jax) {
      var SRE = jax.root.SRE, actions = SRE.action, j, state = {};
      SRE.width = jax.sreGetRootWidth(state);
      for (j = actions.length-1; j >= 0; j--) actions[j].selection = 2;
      for (j = actions.length-1; j >= 0; j--) {
        var action = actions[j];
        if (action.SREwidth == null) {
          action.selection = 1;
          action.SREwidth = jax.sreGetActionWidth(state,action);
        }
      }
      SRE.actionWidths = true;
    },

    //
    //  Get the widths of the containers of tall the math elements
    //  that can be collapsed (so we can tell which ones NEED to be
    //  collapsed).  Do this in a way that only causes two reflows.
    //
    GetContainerWidths: function (element) {
      var JAX = HUB.getAllJax(element);
      var i, m, script, span = MathJax.HTML.Element("span",{style:{display:"block"}});
      var math = [], jax, root;
      for (i = 0, m = JAX.length; i < m; i++) {
        jax = JAX[i], root = jax.root, SRE = root.SRE;
        if (SRE && SRE.action.length) {
          if (SRE.width == null) {
            jax.sreGetMetrics();
            SRE.m = SRE.width; SRE.M = 1000000;
          }
          script = jax.SourceElement();
          script.previousSibling.style.display = "none";
          script.parentNode.insertBefore(span.cloneNode(false),script);
          math.push([jax,script]);
        }
      }
      for (i = 0, m = math.length; i < m; i++) {
        jax = math[i][0], script = math[i][1];
        if (script.previousSibling.offsetWidth)
          jax.root.SRE.cwidth = script.previousSibling.offsetWidth * jax.root.SRE.em;
      }
      for (i = 0, m = math.length; i < m; i++) {
        jax = math[i][0], script = math[i][1];
        script.parentNode.removeChild(script.previousSibling);
        script.previousSibling.style.display = "";
      }
    },

    /*****************************************************************/

    //
    //  A resize handler that can be tied to the window resize event
    //  to collapse math automatically on resize.
    //

    timer: null,
    running: false,
    retry: false,
    saved_delay: 0,
    
    resizeHandler: function (event) {
      if (Collapse.config.disabled) return;
      if (Collapse.running) {Collapse.retry = true; return}
      if (Collapse.timer) clearTimeout(Collapse.timer);
      Collapse.timer = setTimeout(Collapse.resizeAction, 100);
    },
    resizeAction: function () {
      Collapse.timer = null;
      Collapse.running = true;
      HUB.Queue(
        function () {
          //
          //  Prevent flicker between input and output phases.
          //
          Collapse.saved_delay = HUB.processSectionDelay;
          HUB.processSectionDelay = 0;
        },
        ["CollapseWideMath",Collapse],
        ["resizeCheck",Collapse]
      );
    },
    resizeCheck: function () {
      Collapse.running = false;
      HUB.processSectionDelay = Collapse.saved_delay;
      if (Collapse.retry) {
        Collapse.retry = false;
        setTimeout(Collapse.resizeHandler,0);
      }
    }

  };

  HUB.Register.StartupHook("End Extensions", function () {
    if (SETTINGS.autocollapse == null) {
      SETTINGS.autocollapse = !Collapse.config.disabled;
    } else {
      Collapse.config.disabled = !SETTINGS.autocollapse;
    }
    HUB.Register.StartupHook("MathMenu Ready", function () {
      COOKIE = MathJax.Menu.cookie;
      var Switch = function(menu) {
        Collapse[SETTINGS.autocollapse ? "Enable" : "Disable"](true,true);
        MathJax.Menu.saveCookie();
      };
      var ITEM = MathJax.Menu.ITEM,
          MENU = MathJax.Menu.menu;
      var menu = ITEM.CHECKBOX(
        ['AutoCollapse','Auto Collapse'], 'autocollapse', {action: Switch}
      );
      var submenu = (MENU.FindId('Accessibility')||{}).submenu, index;
      if (submenu) {
        index = submenu.IndexOfId('AutoCollapse');
        if (index !== null) {
          submenu.items[index] = menu;
        } else {
          index = submenu.IndexOfId('CollapsibleMath');
          submenu.items.splice(index+1,0,menu);
        }
      } else {
        index = MENU.IndexOfId('CollapsibleMath');
        MENU.items.splice(index+1,0,menu);
      }
      var init = function () {Collapse[SETTINGS.autocollapse ? "Enable" : "Disable"]()};
      if (MathJax.Extension.collapse) init();
        else MathJax.Hub.Register.StartupHook("Auto Collapse Ready", init);
    },25);  // after Assistive-Explore
  },25);

})(MathJax.Hub);


/*****************************************************************/
/*
 *  Add methods to the ElementJax and OutputJax to get the
 *  widths of the collapsed elements.
 */

//
//  Add SRE methods to ElementJax.
//
MathJax.ElementJax.Augment({
  sreGetMetrics: function () {
    MathJax.OutputJax[this.outputJax].sreGetMetrics(this,this.root.SRE);
  },
  sreGetRootWidth: function (state) {
    return MathJax.OutputJax[this.outputJax].sreGetRootWidth(this,state);
  },
  sreGetActionWidth: function (state,action) {
    return MathJax.OutputJax[this.outputJax].sreGetActionWidth(this,state,action);
  }
});

//
//  Add default methods to base OutputJax class.
//
MathJax.OutputJax.Augment({
  getMetrics: function () {},  // make sure it is defined
  sreGetMetrics: function (jax,SRE) {SRE.cwidth = 1000000; SRE.width = 0; SRE.em = 12},
  sreGetRootWidth: function (jax,state) {return 0},
  sreGetActionWidth: function (jax,state,action) {return 0}
});

//
//  Specific implementations for HTML-CSS output.
//
MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function () {
  MathJax.OutputJax["HTML-CSS"].Augment({
    sreGetMetrics: function (jax,SRE) {
      SRE.width = jax.root.data[0].HTMLspanElement().parentNode.bbox.w;
      SRE.em = 1 / jax.HTMLCSS.em / jax.HTMLCSS.scale;
    },
    sreGetRootWidth: function (jax,state) {
      var html = jax.root.data[0].HTMLspanElement();
      state.box = html.parentNode;
      return state.box.bbox.w;
    },
    sreGetActionWidth: function (jax,state,action) {
      return jax.root.data[0].toHTML(state.box).bbox.w;
    }
  });
});

//
//  Specific implementations for SVG output.
//
MathJax.Hub.Register.StartupHook("SVG Jax Ready",function () {
  MathJax.OutputJax.SVG.Augment({
    getMetrics: function (jax) {
      this.em = MathJax.ElementJax.mml.mbase.prototype.em = jax.SVG.em; this.ex = jax.SVG.ex;
      this.linebreakWidth = jax.SVG.lineWidth; this.cwidth = jax.SVG.cwidth;
    },
    sreGetMetrics: function (jax,SRE) {
      SRE.width = jax.root.SVGdata.w/1000;
      SRE.em = 1/jax.SVG.em;
    },
    sreGetRootWidth: function (jax,state) {
      state.span = document.getElementById(jax.inputID+"-Frame");
      return jax.root.SVGdata.w/1000;
    },
    sreGetActionWidth: function (jax,state,action) {
      this.mathDiv = state.span;
      state.span.appendChild(this.textSVG);
      try {var svg = jax.root.data[0].toSVG()} catch(err) {var error = err}
      state.span.removeChild(this.textSVG);
      if (error) throw error;  // can happen when a restart is needed
      return jax.root.data[0].SVGdata.w/1000;
    }
  });
});

//
//  Specific implementations for CommonHTML output.
//
MathJax.Hub.Register.StartupHook("CommonHTML Jax Ready",function () {
  MathJax.OutputJax.CommonHTML.Augment({
    sreGetMetrics: function (jax,SRE) {
      SRE.width = jax.root.CHTML.w;
      SRE.em = 1 / jax.CHTML.em / jax.CHTML.scale;
    },
    sreGetRootWidth: function (jax,state) {
      state.span = document.getElementById(jax.inputID+"-Frame").firstChild;
      state.tmp = document.createElement("span");
      state.tmp.className = state.span.className;
      return jax.root.CHTML.w / jax.CHTML.scale;
    },
    sreGetActionWidth: function (jax,state,action) {
      state.span.parentNode.replaceChild(state.tmp,state.span);
      MathJax.OutputJax.CommonHTML.CHTMLnode = state.tmp;
      try {jax.root.data[0].toCommonHTML(state.tmp)} catch (err) {var error = err}
      state.tmp.parentNode.replaceChild(state.span,state.tmp);
      if (error) throw error;  // can happen when a restart is needed
      return jax.root.data[0].CHTML.w / jax.CHTML.scale;
    }
  });
});

//
//  Specific implementations for NativeMML output.
//
MathJax.Hub.Register.StartupHook("NativeMML Jax Ready",function () {
  MathJax.OutputJax.NativeMML.Augment({
    sreGetMetrics: function (jax,SRE) {
      var span = document.getElementById(jax.inputID+"-Frame");
      SRE.width = span.offsetWidth;
      SRE.em = 1; SRE.DOMupdate = true;
    },
    sreGetRootWidth: function (jax,state) {
      state.span = document.getElementById(jax.inputID+"-Frame").firstChild;
      return state.span.offsetWidth;
    },
    sreGetActionWidth: function (jax,state,action) {
      var maction = document.getElementById(action.id);
      maction.setAttribute("selection",1);
      var w = state.span.offsetWidth;
      return w;
    }
  });
});


/*****************************************************************/

//
//  Load the collapsible extension and
//  signal the start up when that has loaded.
//
MathJax.Ajax.Require("[a11y]/collapsible.js");
MathJax.Hub.Register.StartupHook("Collapsible Ready", function () {
  MathJax.Extension["auto-collapse"].Startup(); // Initialize the collapsing process
  MathJax.Hub.Startup.signal.Post("Auto Collapse Ready");
  MathJax.Ajax.loadComplete("[a11y]/auto-collapse.js");
});

