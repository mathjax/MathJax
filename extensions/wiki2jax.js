/**
 * From https://en.wikipedia.org/wiki/User:Nageh/mathJax/config/TeX-AMS-texvc_HTML.js
 */

MathJax.Extension.wiki2jax = {
  version: "1.0",

  config: {
    element: null,    // The ID of the element to be processed
                      //   (defaults to full document)

    preview: "TeX"    // Set to "none" to prevent preview strings from being inserted
                      //   or to an array that specifies an HTML snippet to use for
                      //   the preview.
  },

  PreProcess: function (element) {
    if (!this.configured) {
	  this.config = MathJax.Hub.CombineConfig("wiki2jax", this.config);
      if (this.config.Augment) {MathJax.Hub.Insert(this,this.config.Augment)}

      this.previewClass = MathJax.Hub.config.preRemoveClass;
      this.setupPrefilter();
      this.configured = true;
    }
    var that = this;
    $('span.tex, img.tex', element || document).each(function(i, span) {
		that.ConvertMath(span);
	});
  },

  setupPrefilter: function() {  // used to fix a number of common wiki math hacks
    MathJax.Hub.Register.StartupHook("TeX Jax Ready", function() {
      MathJax.InputJax.TeX.prefilterHooks.Add( function(data) {
        data.math = data.math.replace(/^\s*\\scriptstyle(\W)/,"\\textstyle$1").replace(/^\s*\\scriptscriptstyle(\W)/,"\\scriptstyle$1");
        if (data.script.type.match(/(;|\s|\n)mode\s*=\s*display-nobreak(;|\s|\n|$)/) != null)
          data.math = "\\displaystyle " + data.math;
      });
    });
  },

  ConvertMath: function (node) {
    var parent = node.parentNode,
        mode = parent.tagName === "DD" && parent.childNodes.length === 1 ? "; mode=display" : "",
		tex;
	if (node.nodeName == 'IMG') {
		tex = node.alt;
	} else {
        tex = $(node).text().replace(/^\$/,"").replace(/\$$/,"");
	    tex = tex.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&nbsp;/g," ");
	}

    // We don't allow comments (%) in texvc and escape all literal % by default.
    tex = tex.replace(/([^\\])%/g, "$1\\%" );

    tex = tex.replace(/\\iiint([^!]*)!\\!\\!\\!\\!.*\\subset\\!\\supset/g,"\\iiint$1mkern-2.5em\\subset\\!\\supset").replace(/\\iint([^!]*)!\\!\\!\\!\\!\\!\\!\\!\\!\\!\\!(.*)\\subset\\!\\supset/g,"\\iint$1mkern-1.65em$2\\subset\\!\\!\\supset").replace(/\\int\\!\\!\\!(\\!)+\\int\\!\\!\\!(\\!)+\\int([^!]*)!\\!\\!\\!\\!.*\\bigcirc(\\,)*/g,"\\iiint$3mkern-2.5em\\subset\\!\\supset").replace(/\\int\\!\\!\\!(\\!)+\\int([^!]*)!\\!\\!\\!\\!\\!\\!\\!\\!(.*)\\bigcirc(\\,)*/g,"\\iint$2mkern-1.65em$3\\subset\\!\\!\\supset");

    if (mode === "" && parent.firstChild === node) mode = "; mode=display-nobreak";

    var script = document.createElement("script");
    script.type = "math/tex" + mode;
	MathJax.HTML.setScript(script, tex);

    if (node.nextSibling) {parent.insertBefore(script,node.nextSibling)}
      else {parent.appendChild(script)}
    if (this.config.preview !== "none") {this.createPreview(node)}
    parent.removeChild(node);
  },

  createPreview: function (node) {
    var preview;
    if (this.config.preview === "TeX") {preview = [this.filterPreview($(node).text())]}
    else if (this.config.preview instanceof Array) {preview = this.config.preview}
    if (preview) {
      preview = MathJax.HTML.Element("span",{className: MathJax.Hub.config.preRemoveClass},preview);
      node.parentNode.insertBefore(preview,node);
    }
  },

  filterPreview: function (tex) {return tex}

};

MathJax.Hub.Register.PreProcessor(["PreProcess",MathJax.Extension.wiki2jax]);
MathJax.Ajax.loadComplete("[MathJax]/extensions/wiki2jax.js");
