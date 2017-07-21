/*************************************************************
 *
 *  [Contrib]/a11y/explorer.js
 *
 *  Implements expression exploration via the SRE explorer.
 *
 *  ---------------------------------------------------------------------
 *
 *  Copyright (c) 2016-2017 The MathJax Consortium
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

MathJax.Hub.Register.StartupHook('Sre Ready', function() {
  var FALSE, KEY;
  var SETTINGS = MathJax.Hub.config.menuSettings;
  var COOKIE = {};   // replaced when menu is available

  MathJax.Hub.Register.StartupHook('MathEvents Ready', function() {
    FALSE = MathJax.Extension.MathEvents.Event.False;
    KEY = MathJax.Extension.MathEvents.Event.KEY;
  });

  var Assistive = MathJax.Extension.explorer = {
    version: '1.2.3',
    dependents: [],            // the extensions that depend on this one
    //
    // Default configurations.
    //
    defaults: {
      walker: 'syntactic',
      highlight: 'none',
      background: 'blue',
      foreground: 'black',
      speech: true,
      generation: 'lazy',
      subtitle: false,
      ruleset: 'mathspeak-default'
    },
    eagerComplexity: 80,
    prefix: 'Assistive-',
    hook: null,
    oldrules: null,
    addMenuOption: function(key, value) {
      SETTINGS[Assistive.prefix + key] = value;
    },

    addDefaults: function() {
      var defaults = MathJax.Hub.CombineConfig('explorer', Assistive.defaults);
      var keys = Object.keys(defaults);
      for (var i = 0, key; key = keys[i]; i++) {
        if (typeof(SETTINGS[Assistive.prefix + key]) === 'undefined') {
          Assistive.addMenuOption(key, defaults[key]);
        }
      }
      Assistive.setSpeechOption();
      Explorer.Reset();
    },

    setOption: function(key, value) {
      if (SETTINGS[Assistive.prefix + key] === value) return;
      Assistive.addMenuOption(key, value);
      Explorer.Reset();
    },

    getOption: function(key) {
      return SETTINGS[Assistive.prefix + key];
    },

    speechOption: function(msg) {
      if (Assistive.oldrules === msg.value) return;
      Assistive.setSpeechOption();
      Explorer.Regenerate();
    },

    setSpeechOption: function() {
      var ruleset = SETTINGS[Assistive.prefix + 'ruleset'];
      var cstr = ruleset.split('-');
      sre.System.getInstance().setupEngine({
        domain: Assistive.Domain(cstr[0]),
        style: cstr[1],
        rules: Assistive.RuleSet(cstr[0])
      });
      Assistive.oldrules = ruleset;
    },

    Domain: function(domain) {
      switch (domain) {
        case 'chromevox':
          return 'default';
        case 'mathspeak':
        default:
          return 'mathspeak';
      }
    },

    RuleSet: function(domain) {
      switch (domain) {
        case 'chromevox':
          return ['AbstractionRules', 'SemanticTreeRules'];
        case 'mathspeak':
        default:
          return ['AbstractionRules', 'MathspeakRules'];
      }
    },

    hook: null,
    Enable: function(update, menu) {
      SETTINGS.explorer = true;
      if (menu) COOKIE.explorer = true;
      MathJax.Extension.collapsible.Enable(false, menu);
      if (MathJax.Extension.AssistiveMML) {
        MathJax.Extension.AssistiveMML.config.disabled = true;
        SETTINGS.assistiveMML = false;
        if (menu) COOKIE.assistiveMML = false;
      }
      this.DisableMenus(false);
      if (!this.hook) {
        this.hook = MathJax.Hub.Register.MessageHook(
            'New Math', ['Register', this.Explorer]);
      }
      if (update) MathJax.Hub.Queue(['Reprocess', MathJax.Hub]);
    },
    Disable: function(update, menu) {
      SETTINGS.explorer = false;
      if (menu) COOKIE.explorer = false;
      this.DisableMenus(true);
      if (this.hook) {
        MathJax.Hub.UnRegister.MessageHook(this.hook);
        this.hook = null;
      }
      for (var i = this.dependents.length - 1; i >= 0; i--) {
        var dependent = this.dependents[i];
        if (dependent.Disable) dependent.Disable(false, menu);
      }
      //  Reprocess on update?  I don't think it is necessary
      //    (now that we check for being enabled in the event handlers)
    },
    DisableMenus: function(state) {
      if (MathJax.Menu) {
        var menu = MathJax.Menu.menu.FindId('Accessibility', 'Explorer');
        if (menu) {
          menu = menu.submenu;
          var items = menu.items;
          for (var i = 2, item; item = items[i]; i++) item.disabled = state;
          if (!state && menu.FindId('SpeechOutput') && !SETTINGS[Assistive.prefix + 'speech']) {
            menu.FindId('Subtitles').disabled = true;
            menu.FindId('Generation').disabled = true;
          }
        }
      }
    },
    //
    //  Register a dependent
    //
    Dependent: function(extension) {
      this.dependents.push(extension);
    }
  };

  var LiveRegion = MathJax.Object.Subclass({
    div: null,
    inner: null,
    Init: function() {
      this.div = LiveRegion.Create('assertive');
      this.inner = MathJax.HTML.addElement(this.div, 'div');
    },
    //
    // Adds the speech div.
    //
    Add: function() {
      if (LiveRegion.added) return;
      document.body.appendChild(this.div);
      LiveRegion.added = true;
    },
    //
    // Shows the live region as a subtitle of a node.
    //
    Show: function(node, highlighter) {
      this.div.classList.add('MJX_LiveRegion_Show');
      var rect = node.getBoundingClientRect();
      var bot = rect.bottom + 10 + window.pageYOffset;
      var left = rect.left + window.pageXOffset;
      this.div.style.top = bot + 'px';
      this.div.style.left = left + 'px';
      var color = highlighter.colorString();
      this.inner.style.backgroundColor = color.background;
      this.inner.style.color = color.foreground;
    },
    //
    // Takes the live region out of the page flow.
    //
    Hide: function(node) {
      this.div.classList.remove('MJX_LiveRegion_Show');
    },
    //
    // Clears the speech div.
    //
    Clear: function() {
      this.Update('');
      this.inner.style.top = '';
      this.inner.style.backgroundColor = '';
    },
    //
    // Speaks a string by poking it into the speech div.
    //
    Update: function(speech) {
      if (Assistive.getOption('speech')) {
        LiveRegion.Update(this.inner, speech);
      }
    }
  }, {
    ANNOUNCE: 'Navigatable Math in page. Explore with shift space and arrow' +
        ' keys. Expand or collapse elements hitting enter.',
    announced: false,
    added: false,
    styles: {'.MJX_LiveRegion':
          {
            position: 'absolute', top: '0', height: '1px', width: '1px',
            padding: '1px', overflow: 'hidden'
          },
      '.MJX_LiveRegion_Show':
          {
            top: '0', position: 'absolute', width: 'auto', height: 'auto',
            padding: '0px 0px', opacity: 1, 'z-index': '202',
            left: 0, right: 0, 'margin': '0 auto',
            'background-color': 'white', 'box-shadow': '0px 10px 20px #888',
            border: '2px solid #CCCCCC'
          }
    },
    //
    // Creates a live region with a particular type.
    //
    Create: function(type) {
      var element = MathJax.HTML.Element(
          'div', {className: 'MJX_LiveRegion'});
      element.setAttribute('aria-live', type);
      return element;
    },
    //
    // Updates a live region's text content.
    //
    Update: MathJax.Hub.Browser.isPC ?
        function(div, speech) {
          div.textContent = '';
          setTimeout(function() {div.textContent = speech;}, 100);
        } : function(div, speech) {
          div.textContent = '';
          div.textContent = speech;
        },
    //
    // Speaks the announce string.
    //
    Announce: function() {
      if (!Assistive.getOption('speech')) return;
      LiveRegion.announced = true;
      MathJax.Ajax.Styles(LiveRegion.styles);
      var div = LiveRegion.Create('polite');
      document.body.appendChild(div);
      LiveRegion.Update(div, LiveRegion.ANNOUNCE);
      setTimeout(function() {document.body.removeChild(div);}, 1000);
    }
  });
  MathJax.Extension.explorer.LiveRegion = LiveRegion;

  var A11Y_PATH = MathJax.Ajax.fileURL(MathJax.Ajax.config.path.a11y);
  
  var Explorer = MathJax.Extension.explorer.Explorer = {
    liveRegion: LiveRegion(),
    walker: null,
    highlighter: null,
    hoverer: null,
    flamer: null,
    speechDiv: null,
    earconFile: A11Y_PATH + '/invalid_keypress' +
        (['Firefox', 'Chrome', 'Opera'].indexOf(MathJax.Hub.Browser.name) !== -1 ?
        '.ogg' : '.mp3'),
    expanded: false,
    focusoutEvent: MathJax.Hub.Browser.isFirefox ? 'blur' : 'focusout',
    focusinEvent: 'focus',
    ignoreFocusOut: false,
    jaxCache: {},
    messageID: null,
    //
    // Resets the explorer, rerunning methods not triggered by events.
    //
    Reset: function() {
      Explorer.FlameEnriched();
    },
    //
    // Registers new Maths and adds a key event if it is enriched.
    //
    Register: function(msg) {
      if (!Assistive.hook) return;
      var script = document.getElementById(msg[1]);
      if (script && script.id) {
        var jax = MathJax.Hub.getJaxFor(script.id);
        if (jax && jax.enriched) {
          Explorer.StateChange(script.id, jax);
          Explorer.liveRegion.Add();
          Explorer.AddEvent(script);
        }
      }
    },
    StateChange: function(id, jax) {
      Explorer.GetHighlighter(.2);
      var oldJax = Explorer.jaxCache[id];
      if (oldJax && oldJax === jax.root) return;
      if (oldJax) {
        Explorer.highlighter.resetState(id + '-Frame');
      }
      Explorer.jaxCache[id] = jax.root;
    },
    //
    // Adds Aria attributes.
    //
    AddAria: function(math) {
      math.setAttribute('role', 'application');
      math.setAttribute('aria-label', 'Math');
    },
    //
    // Add hook to run at End Math to restart walking on an expansion element.
    //
    AddHook: function(jax) {
      Explorer.RemoveHook();
      Explorer.hook = MathJax.Hub.Register.MessageHook(
          'End Math', function(message) {
            var newid = message[1].id + '-Frame';
            var math = document.getElementById(newid);
            if (jax && newid === Explorer.expanded) {
              Explorer.ActivateWalker(math, jax);
              math.focus();
              Explorer.expanded = false;
            }
          });
    },
    //
    // Remove and unregister the explorer hook.
    //
    RemoveHook: function() {
      if (Explorer.hook) {
        MathJax.Hub.UnRegister.MessageHook(Explorer.hook);
        Explorer.hook = null;
      }
    },
    AddMessage: function() {
      return MathJax.Message.Set('Generating Speech Output');
    },
    RemoveMessage: function(id) {
      if (id) MathJax.Message.Clear(id);
    },
    //
    // Adds a key event to an enriched jax.
    //
    AddEvent: function(script) {
      var id = script.id + '-Frame';
      var sibling = script.previousSibling;
      if (!sibling) return;
      var math = sibling.id !== id ? sibling.firstElementChild : sibling;
      Explorer.AddAria(math);
      Explorer.AddMouseEvents(math);
      if (math.className === 'MathJax_MathML') {
        math = math.firstElementChild;
      }
      if (!math) return;
      math.onkeydown = Explorer.Keydown;
      Explorer.Flame(math);
      math.addEventListener(
          Explorer.focusinEvent,
          function(event) {
            if (!Assistive.hook) return;
            if (!LiveRegion.announced) LiveRegion.Announce();
          });
      math.addEventListener(
          Explorer.focusoutEvent,
          function(event) {
            if (!Assistive.hook) return;
            // A fix for Edge.
            if (Explorer.ignoreFocusOut) {
              Explorer.ignoreFocusOut = false;
              if (Explorer.walker.moved === 'enter') {
                event.target.focus();
                return;
              }
            }
            if (Explorer.walker) Explorer.DeactivateWalker();
          });
      //
      if (Assistive.getOption('speech')) {
        Explorer.AddSpeech(math);
      }
      //
    },
    //
    // Add speech output.
    //
    AddSpeech: function(math) {
      var id = math.id;
      var jax = MathJax.Hub.getJaxFor(id);
      var mathml = jax.root.toMathML();
      if (!math.getAttribute('haslabel')) {
        Explorer.AddMathLabel(mathml, id);
      }
      if (math.getAttribute('hasspeech')) return;
      switch (Assistive.getOption('generation')) {
        case 'eager':
          Explorer.AddSpeechEager(mathml, id);
          break;
        case 'mixed':
          var complexity = math.querySelectorAll('[data-semantic-complexity]');
          if (complexity.length >= Assistive.eagerComplexity) {
            Explorer.AddSpeechEager(mathml, id);
          }
          break;
        case 'lazy':
        default:
          break;
      }
    },
    AddSpeechLazy: function(math) {
      var generator = new sre.TreeSpeechGenerator();
      generator.setRebuilt(Explorer.walker.rebuilt);
      generator.getSpeech(Explorer.walker.rootNode, Explorer.walker.xml);
      math.setAttribute('hasspeech', 'true');
    },
    //
    //
    // Adds speech strings to the node using a web worker.
    //
    AddSpeechEager: function(mathml, id) {
      Explorer.MakeSpeechTask(
          mathml, id, sre.TreeSpeechGenerator,
          function(math, speech) {math.setAttribute('hasspeech', 'true');}, 5);
    },
    //
    // Attaches the Math expression as an aria label.
    //
    AddMathLabel: function(mathml, id) {
      Explorer.MakeSpeechTask(
          mathml, id, sre.SummarySpeechGenerator,
          function(math, speech) {
            math.setAttribute('haslabel', 'true');
            math.setAttribute('aria-label', speech);},
          5);
    },
    //
    // The actual speech task generator.
    //
    MakeSpeechTask: function(mathml, id, constructor, onSpeech, time) {
      var messageID = Explorer.AddMessage();
      setTimeout(function() {
        var speechGenerator = new constructor();
        var math = document.getElementById(id);
        var dummy = new sre.DummyWalker(
            math, speechGenerator, Explorer.highlighter, mathml);
        var speech = dummy.speech();
        if (speech) {
          onSpeech(math, speech);
        }
        Explorer.RemoveMessage(messageID);
      }, time);
    },
    //
    // Event execution on keydown. Subsumes the same method of MathEvents.
    //
    Keydown: function(event) {
      if (event.keyCode === KEY.ESCAPE) {
        if (!Explorer.walker) return;
        Explorer.RemoveHook();
        Explorer.DeactivateWalker();
        FALSE(event);
        return;
      }
      // If walker is active we redirect there.
      if (Explorer.walker && Explorer.walker.isActive()) {
        var move = Explorer.walker.move(event.keyCode);
        if (move === null) return;
        if (move) {
          if (Explorer.walker.moved === 'expand') {
            Explorer.expanded = Explorer.walker.node.id;
            // This sometimes blurs in Edge and sometimes it does not.
            if (MathJax.Hub.Browser.isEdge) {
              Explorer.ignoreFocusOut = true;
              Explorer.DeactivateWalker();
              return;
            }
            // This does not blur in FF, IE.
            if (MathJax.Hub.Browser.isFirefox || MathJax.Hub.Browser.isMSIE) {
              Explorer.DeactivateWalker();
              return;
            }
          }
          Explorer.liveRegion.Update(Explorer.walker.speech());
          Explorer.Highlight();
        } else {
          Explorer.PlayEarcon();
        }
        FALSE(event);
        return;
      }
      var math = event.target;
      if (event.keyCode === KEY.SPACE) {
        if (event.shiftKey && Assistive.hook) {
          var jax = MathJax.Hub.getJaxFor(math);
          Explorer.ActivateWalker(math, jax);
          Explorer.AddHook(jax);
        } else {
          MathJax.Extension.MathEvents.Event.ContextMenu(event, math);
        }
        FALSE(event);
        return;
      }
    },
    GetHighlighter: function(alpha) {
      Explorer.highlighter = sre.HighlighterFactory.highlighter(
          {color: Assistive.getOption('background'), alpha: alpha},
          {color: Assistive.getOption('foreground'), alpha: 1},
          {renderer: MathJax.Hub.outputJax['jax/mml'][0].id,
            browser: MathJax.Hub.Browser.name}
          );
    },
    //
    // Adds mouse events to maction items in an enriched jax.
    //
    AddMouseEvents: function(node) {
      sre.HighlighterFactory.addEvents(
          node,
          {'mouseover': Explorer.MouseOver,
            'mouseout': Explorer.MouseOut},
          {renderer: MathJax.Hub.outputJax['jax/mml'][0].id,
            browser: MathJax.Hub.Browser.name}
      );
    },
    MouseOver: function(event) {
      if (Assistive.getOption('highlight') === 'none') return;
      if (Assistive.getOption('highlight') === 'hover') {
        var frame = event.currentTarget;
        Explorer.GetHighlighter(.1);
        Explorer.highlighter.highlight([frame]);
        Explorer.hoverer = true;
      }
      FALSE(event);
    },
    MouseOut: function(event) {
      if (Explorer.hoverer) {
        Explorer.highlighter.unhighlight();
        Explorer.hoverer = false;
      }
      return FALSE(event);
    },
    //
    // Activates Flaming
    //
    Flame: function(node) {
      if (Assistive.getOption('highlight') === 'flame') {
        Explorer.GetHighlighter(.05);
        Explorer.highlighter.highlightAll(node);
        Explorer.flamer = true;
        return;
      }
    },
    UnFlame: function() {
      if (Explorer.flamer) {
        Explorer.highlighter.unhighlightAll();
        Explorer.flamer = null;
      }
    },
    FlameEnriched: function() {
      Explorer.UnFlame();
      for (var i = 0, all = MathJax.Hub.getAllJax(), jax; jax = all[i]; i++) {
        Explorer.Flame(jax.SourceElement().previousSibling);
      }
    },
    //
    // Activates the walker.
    //
    Walkers: {
      'syntactic': sre.SyntaxWalker,
      'semantic': sre.SemanticWalker,
      'none': sre.DummyWalker
    },
    ActivateWalker: function(math, jax) {
      var speechOn = Assistive.getOption('speech');
      var constructor = Explorer.Walkers[Assistive.getOption('walker')] ||
          Explorer.Walkers['none'];
      var speechGenerator = speechOn ? new sre.DirectSpeechGenerator() :
          new sre.DummySpeechGenerator();
      Explorer.GetHighlighter(.2);
      Explorer.walker = new constructor(
          math, speechGenerator, Explorer.highlighter, jax.root.toMathML());
      if (speechOn && !math.getAttribute('hasspeech')) {
        Explorer.AddSpeechLazy(math);
      }
      Explorer.walker.activate();
      if (speechOn) {
        if (Assistive.getOption('subtitle')) {
          Explorer.liveRegion.Show(math, Explorer.highlighter);
        }
        Explorer.liveRegion.Update(Explorer.walker.speech());
      }
      Explorer.Highlight();
      // A fix for Edge.
      if (Explorer.ignoreFocusOut) {
        setTimeout(function() {Explorer.ignoreFocusOut = false;}, 500);
      }
    },
    //
    // Deactivates the walker.
    //
    DeactivateWalker: function() {
      Explorer.liveRegion.Clear();
      Explorer.liveRegion.Hide();
      Explorer.Unhighlight();
      Explorer.currentHighlight = null;
      Explorer.walker.deactivate();
      Explorer.walker = null;
    },
    //
    // Highlights the focused nodes.
    //
    Highlight: function() {
      Explorer.Unhighlight();
      Explorer.highlighter.highlight(Explorer.walker.getFocus().getNodes());
    },
    //
    // Unhighlights the old nodes.
    //
    Unhighlight: function() {
      Explorer.highlighter.unhighlight();
    },
    //
    // Plays the earcon.
    //
    // Every time we make new Audio element, as some browsers do not allow to
    // play audio elements more than once (e.g., Safari).
    //
    PlayEarcon: function() {
      var audio = new Audio(Explorer.earconFile);
      audio.play();
    },
    //
    // Toggle speech output.
    //
    SpeechOutput: function() {
      Explorer.Reset();
      var speechItems = ['Subtitles', 'Generation'];
      speechItems.forEach(
          function(x) {
            var item = MathJax.Menu.menu.FindId('Accessibility', 'Explorer', x);
            if (item) {
              item.disabled = !item.disabled;
            }});
      Explorer.Regenerate();
    },
    //
    // Regenerates speech.
    //
    Regenerate: function() {
      for (var i = 0, all = MathJax.Hub.getAllJax(), jax; jax = all[i]; i++) {
        var math = document.getElementById(jax.inputID + '-Frame');
        if (math) {
          math.removeAttribute('hasSpeech');
          Explorer.AddSpeech(math);
        }
      }
    },
    Startup: function() {
      var Collapsible = MathJax.Extension.collapsible;
      if (Collapsible) Collapsible.Dependent(Assistive);
      Assistive.addDefaults();
    }
  };

  MathJax.Hub.Register.StartupHook('End Extensions', function() {
    Assistive[SETTINGS.explorer === false ? 'Disable' : 'Enable']();
    MathJax.Hub.Startup.signal.Post('Explorer Ready');
    MathJax.Hub.Register.StartupHook('MathMenu Ready', function() {
      COOKIE = MathJax.Menu.cookie;
      var Switch = function(menu) {
        Assistive[SETTINGS.explorer ? 'Enable' : 'Disable'](true, true);
        MathJax.Menu.saveCookie();
      };
      var ITEM = MathJax.Menu.ITEM,
          MENU = MathJax.Menu.menu;
      var reset = {action: Explorer.Reset};
      var speech = {action: Assistive.speechOption};
      var explorerMenu =
          ITEM.SUBMENU(['Explorer', 'Explorer'],
              ITEM.CHECKBOX(['Active', 'Active'], 'explorer', {action: Switch}),
              ITEM.RULE(),
              ITEM.SUBMENU(['Walker', 'Walker'],
                  ITEM.RADIO(['nowalker', 'No walker'], 'Assistive-walker', {value:"none"}),
                  ITEM.RADIO(['syntactic', 'Syntax walker'], 'Assistive-walker'),
                  ITEM.RADIO(['semantic', 'Semantic walker'], 'Assistive-walker')
              ),
              ITEM.SUBMENU(['Highlight', 'Highlight'],
                  ITEM.RADIO(['none', 'None'], 'Assistive-highlight', reset),
                  ITEM.RADIO(['hover', 'Hover'], 'Assistive-highlight', reset),
                  ITEM.RADIO(['flame', 'Flame'], 'Assistive-highlight', reset)
              ),
              ITEM.SUBMENU(['Background', 'Background'],
                  ITEM.RADIO(['blue', 'Blue'], 'Assistive-background', reset),
                  ITEM.RADIO(['red', 'Red'], 'Assistive-background', reset),
                  ITEM.RADIO(['green', 'Green'], 'Assistive-background', reset),
                  ITEM.RADIO(['yellow', 'Yellow'], 'Assistive-background', reset),
                  ITEM.RADIO(['cyan', 'Cyan'], 'Assistive-background', reset),
                  ITEM.RADIO(['magenta', 'Magenta'], 'Assistive-background', reset),
                  ITEM.RADIO(['white', 'White'], 'Assistive-background', reset),
                  ITEM.RADIO(['black', 'Black'], 'Assistive-background', reset)
              ),
              ITEM.SUBMENU(['Foreground', 'Foreground'],
                  ITEM.RADIO(['black', 'Black'], 'Assistive-foreground', reset),
                  ITEM.RADIO(['white', 'White'], 'Assistive-foreground', reset),
                  ITEM.RADIO(['magenta', 'Magenta'], 'Assistive-foreground', reset),
                  ITEM.RADIO(['cyan', 'Cyan'], 'Assistive-foreground', reset),
                  ITEM.RADIO(['yellow', 'Yellow'], 'Assistive-foreground', reset),
                  ITEM.RADIO(['green', 'Green'], 'Assistive-foreground', reset),
                  ITEM.RADIO(['red', 'Red'], 'Assistive-foreground', reset),
                  ITEM.RADIO(['blue', 'Blue'], 'Assistive-foreground', reset)
              ),
              ITEM.RULE(),
              ITEM.CHECKBOX(['SpeechOutput', 'Speech Output'],
                            'Assistive-speech', {action: Explorer.SpeechOutput}),
              ITEM.CHECKBOX(['Subtitles', 'Subtitles'], 'Assistive-subtitle',
                            {disabled: !SETTINGS['Assistive-speech']}),
              ITEM.SUBMENU(['Generation', 'Generation'],
                            {disabled: !SETTINGS['Assistive-speech']},
                  ITEM.RADIO(['eager', 'Eager'], 'Assistive-generation',
                             {action: Explorer.Regenerate}),
                  ITEM.RADIO(['mixed', 'Mixed'], 'Assistive-generation',
                             {action: Explorer.Regenerate}),
                  ITEM.RADIO(['lazy', 'Lazy'], 'Assistive-generation',
                             {action: Explorer.Regenerate})
              ),
              ITEM.RULE(),
              ITEM.SUBMENU(['Mathspeak', 'Mathspeak Rules'],
                  ITEM.RADIO(['mathspeak-default', 'Verbose'],
                             'Assistive-ruleset', speech),
                  ITEM.RADIO(['mathspeak-brief', 'Brief'], 'Assistive-ruleset', speech),
                  ITEM.RADIO(['mathspeak-sbrief', 'Superbrief'],
                             'Assistive-ruleset', speech)
              ),
              ITEM.SUBMENU(['Chromevox', 'ChromeVox Rules'],
                  ITEM.RADIO(['chromevox-default', 'Verbose'],
                             'Assistive-ruleset', speech),
                  ITEM.RADIO(['chromevox-short', 'Short'], 'Assistive-ruleset',
                             speech),
                  ITEM.RADIO(['chromevox-alternative', 'Alternative'],
                             'Assistive-ruleset', speech)
              )
          );
      var submenu = (MENU.FindId('Accessibility') || {}).submenu, index;
      if (submenu) {
        index = submenu.IndexOfId('Explorer');
        if (index !== null) {
          submenu.items[index] = explorerMenu;
        } else {
          index = submenu.IndexOfId('CollapsibleMath');
          submenu.items.splice(index + 1, 0, explorerMenu);
        }
      } else {
        index = MENU.IndexOfId('CollapsibleMath');
        MENU.items.splice(index + 1, 0, explorerMenu);
      }
      if (!SETTINGS.explorer) Assistive.DisableMenus(true);
    },20);  // Between collapsible and auto-collapse extensions
  },20);

});

//
//  Patch problem with SVG getJaxForMath when used from explorer
//  (can be removed after the next release of MathJax).
//
MathJax.Hub.Register.StartupHook("SVG Jax Ready",function () {
  MathJax.Hub.Config({SVG: {addMMLclasses: true}});
  var SVG = MathJax.OutputJax.SVG;
  if (parseFloat(SVG.version) < 2.7) {
    var JAXFROMMATH = SVG.getJaxFromMath;
    SVG.Augment({
      getJaxFromMath: function (math) {
        if (math.parentNode.className.match(/MathJax_SVG_Display/)) math = math.parentNode;
        return JAXFROMMATH.call(this,math);
      }
    });
  }
});

//
//  Set up the a11y path,if it isn't already in place
//
if (!MathJax.Ajax.config.path.a11y) {
  MathJax.Ajax.config.path.a11y = MathJax.Hub.config.root + "/extensions/a11y";
}

MathJax.Ajax.Require('[a11y]/collapsible.js');
MathJax.Hub.Register.StartupHook('Collapsible Ready', function() {
  MathJax.Extension.explorer.Explorer.Startup();
  MathJax.Ajax.loadComplete('[a11y]/explorer.js');
});
