!function(t){var e={};function a(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=e,a.d=function(t,e,s){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(s,r,function(e){return t[e]}.bind(null,r));return s},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=10)}([function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.MathML=void 0;const s=a(5),r=a(3),i=a(6),o=a(1),n=a(2);class l extends s.AbstractInputJax{constructor(t={}){let[e,a,s]=r.separateOptions(t,o.FindMathML.OPTIONS,n.MathMLCompile.OPTIONS);super(e),this.findMathML=this.options.FindMathML||new o.FindMathML(a),this.mathml=this.options.MathMLCompile||new n.MathMLCompile(s),this.mmlFilters=new i.FunctionList}setAdaptor(t){super.setAdaptor(t),this.findMathML.adaptor=t,this.mathml.adaptor=t}setMmlFactory(t){super.setMmlFactory(t),this.mathml.setMmlFactory(t)}get processStrings(){return!1}compile(t,e){let a=t.start.node;if(!a||!t.end.node||this.options.forceReparse||"#text"===this.adaptor.kind(a)){let s=this.executeFilters(this.preFilters,t,e,t.math||"<math></math>"),r=this.checkForErrors(this.adaptor.parse(s,"text/"+this.options.parseAs)),i=this.adaptor.body(r);1!==this.adaptor.childNodes(i).length&&this.error("MathML must consist of a single element"),a=this.adaptor.remove(this.adaptor.firstChild(i)),"math"!==this.adaptor.kind(a).replace(/^[a-z]+:/,"")&&this.error("MathML must be formed by a <math> element, not <"+this.adaptor.kind(a)+">")}return a=this.executeFilters(this.mmlFilters,t,e,a),this.executeFilters(this.postFilters,t,e,this.mathml.compile(a))}checkForErrors(t){let e=this.adaptor.tags(this.adaptor.body(t),"parsererror")[0];return e&&(""===this.adaptor.textContent(e)&&this.error("Error processing MathML"),this.options.parseError.call(this,e)),t}error(t){throw new Error(t)}findMath(t){return this.findMathML.findMath(t)}}e.MathML=l,l.NAME="MathML",l.OPTIONS=r.defaultOptions({parseAs:"html",forceReparse:!1,FindMathML:null,MathMLCompile:null,parseError:function(t){this.error(this.adaptor.textContent(t).replace(/\n.*/g,""))}},s.AbstractInputJax.OPTIONS)},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.FindMathML=void 0;const s=a(7),r="http://www.w3.org/1998/Math/MathML";class i extends s.AbstractFindMath{findMath(t){let e=new Set;this.findMathNodes(t,e),this.findMathPrefixed(t,e);const a=this.adaptor.root(this.adaptor.document);return"html"===this.adaptor.kind(a)&&0===e.size&&this.findMathNS(t,e),this.processMath(e)}findMathNodes(t,e){for(const a of this.adaptor.tags(t,"math"))e.add(a)}findMathPrefixed(t,e){let a=this.adaptor.root(this.adaptor.document);for(const s of this.adaptor.allAttributes(a))if("xmlns:"===s.name.substr(0,6)&&s.value===r){let a=s.name.substr(6);for(const s of this.adaptor.tags(t,a+":math"))e.add(s)}}findMathNS(t,e){for(const a of this.adaptor.tags(t,"math",r))e.add(a)}processMath(t){let e=[];for(const a of Array.from(t)){let t="block"===this.adaptor.getAttribute(a,"display")||"display"===this.adaptor.getAttribute(a,"mode"),s={node:a,n:0,delim:""},r={node:a,n:0,delim:""};e.push({math:this.adaptor.outerHTML(a),start:s,end:r,display:t})}return e}}e.FindMathML=i,i.OPTIONS={}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.MathMLCompile=void 0;const s=a(8),r=a(3),i=a(9);class o{constructor(t={}){const e=this.constructor;this.options=r.userOptions(r.defaultOptions({},e.OPTIONS),t)}setMmlFactory(t){this.factory=t}compile(t){let e=this.makeNode(t);return e.verifyTree(this.options.verify),e.setInheritedAttributes({},!1,0,!1),e.walkTree(this.markMrows),e}makeNode(t){const e=this.adaptor;let a=!1,r=e.kind(t).replace(/^.*:/,""),i=e.getAttribute(t,"data-mjx-texclass")||"";i&&(i=this.filterAttribute("data-mjx-texclass",i)||"");let o=i&&"mrow"===r?"TeXAtom":r;for(const s of this.filterClassList(e.allClasses(t)))s.match(/^MJX-TeXAtom-/)?(i=s.substr(12),o="TeXAtom"):"MJX-fixedlimits"===s&&(a=!0);this.factory.getNodeClass(o)||this.error('Unknown node type "'+o+'"');let n=this.factory.create(o);return"TeXAtom"===o?this.texAtom(n,i,a):i&&(n.texClass=s.TEXCLASS[i],n.setProperty("texClass",n.texClass)),this.addAttributes(n,t),this.checkClass(n,t),this.addChildren(n,t),n}addAttributes(t,e){let a=!1;for(const s of this.adaptor.allAttributes(e)){let e=s.name,r=this.filterAttribute(e,s.value);if(null===r)return;if("data-mjx-"===e.substr(0,9))"data-mjx-alternate"===e?t.setProperty("variantForm",!0):"data-mjx-variant"===e&&(t.attributes.set("mathvariant",r),a=!0);else if("class"!==e){let s=r.toLowerCase();"true"===s||"false"===s?t.attributes.set(e,"true"===s):a&&"mathvariant"===e||t.attributes.set(e,r)}}}filterAttribute(t,e){return e}filterClassList(t){return t}addChildren(t,e){if(0===t.arity)return;const a=this.adaptor;for(const s of a.childNodes(e)){const e=a.kind(s);if("#comment"!==e)if("#text"===e)this.addText(t,s);else if(t.isKind("annotation-xml"))t.appendChild(this.factory.create("XML").setXML(s,a));else{let e=t.appendChild(this.makeNode(s));0===e.arity&&a.childNodes(s).length&&(this.options.fixMisplacedChildren?this.addChildren(t,s):e.mError("There should not be children for "+e.kind+" nodes",this.options.verify,!0))}}}addText(t,e){let a=this.adaptor.value(e);(t.isToken||t.getProperty("isChars"))&&t.arity?(t.isToken&&(a=i.translate(a),a=this.trimSpace(a)),t.appendChild(this.factory.create("text").setText(a))):a.match(/\S/)&&this.error('Unexpected text node "'+a+'"')}checkClass(t,e){let a=[];for(const s of this.filterClassList(this.adaptor.allClasses(e)))"MJX-"===s.substr(0,4)?"MJX-variant"===s?t.setProperty("variantForm",!0):"MJX-TeXAtom"!==s.substr(0,11)&&t.attributes.set("mathvariant",this.fixCalligraphic(s.substr(3))):a.push(s);a.length&&t.attributes.set("class",a.join(" "))}fixCalligraphic(t){return t.replace(/caligraphic/,"calligraphic")}texAtom(t,e,a){t.texClass=s.TEXCLASS[e],t.setProperty("texClass",t.texClass),"OP"!==e||a||(t.setProperty("movesupsub",!0),t.attributes.setInherited("movablelimits",!0))}markMrows(t){if(t.isKind("mrow")&&!t.isInferred&&t.childNodes.length>=2){let e=t.childNodes[0],a=t.childNodes[t.childNodes.length-1];e.isKind("mo")&&e.attributes.get("fence")&&a.isKind("mo")&&a.attributes.get("fence")&&(e.childNodes.length&&t.setProperty("open",e.getText()),a.childNodes.length&&t.setProperty("close",a.getText()))}}trimSpace(t){return t.replace(/[\t\n\r]/g," ").replace(/^ +/,"").replace(/ +$/,"").replace(/  +/g," ")}error(t){throw new Error(t)}}e.MathMLCompile=o,o.OPTIONS={MmlFactory:null,fixMisplacedChildren:!0,verify:Object.assign({},s.AbstractMmlNode.verifyDefaults),translateEntities:!0}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.APPEND=MathJax._.util.Options.APPEND,e.REMOVE=MathJax._.util.Options.REMOVE,e.Expandable=MathJax._.util.Options.Expandable,e.expandable=MathJax._.util.Options.expandable,e.makeArray=MathJax._.util.Options.makeArray,e.keys=MathJax._.util.Options.keys,e.copy=MathJax._.util.Options.copy,e.insert=MathJax._.util.Options.insert,e.defaultOptions=MathJax._.util.Options.defaultOptions,e.userOptions=MathJax._.util.Options.userOptions,e.selectOptions=MathJax._.util.Options.selectOptions,e.selectOptionsFromKeys=MathJax._.util.Options.selectOptionsFromKeys,e.separateOptions=MathJax._.util.Options.separateOptions},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isObject=MathJax._.components.global.isObject,e.combineConfig=MathJax._.components.global.combineConfig,e.combineDefaults=MathJax._.components.global.combineDefaults,e.combineWithMathJax=MathJax._.components.global.combineWithMathJax,e.MathJax=MathJax._.components.global.MathJax},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.AbstractInputJax=MathJax._.core.InputJax.AbstractInputJax},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.FunctionList=MathJax._.util.FunctionList.FunctionList},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.AbstractFindMath=MathJax._.core.FindMath.AbstractFindMath},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TEXCLASS=MathJax._.core.MmlTree.MmlNode.TEXCLASS,e.TEXCLASSNAMES=MathJax._.core.MmlTree.MmlNode.TEXCLASSNAMES,e.indentAttributes=MathJax._.core.MmlTree.MmlNode.indentAttributes,e.AbstractMmlNode=MathJax._.core.MmlTree.MmlNode.AbstractMmlNode,e.AbstractMmlTokenNode=MathJax._.core.MmlTree.MmlNode.AbstractMmlTokenNode,e.AbstractMmlLayoutNode=MathJax._.core.MmlTree.MmlNode.AbstractMmlLayoutNode,e.AbstractMmlBaseNode=MathJax._.core.MmlTree.MmlNode.AbstractMmlBaseNode,e.AbstractMmlEmptyNode=MathJax._.core.MmlTree.MmlNode.AbstractMmlEmptyNode,e.TextNode=MathJax._.core.MmlTree.MmlNode.TextNode,e.XMLNode=MathJax._.core.MmlTree.MmlNode.XMLNode},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.options=MathJax._.util.Entities.options,e.entities=MathJax._.util.Entities.entities,e.add=MathJax._.util.Entities.add,e.remove=MathJax._.util.Entities.remove,e.translate=MathJax._.util.Entities.translate,e.numeric=MathJax._.util.Entities.numeric},function(t,e,a){"use strict";a.r(e);var s=a(4),r=a(0),i=a(1),o=a(2);Object(s.combineWithMathJax)({_:{input:{mathml_ts:r,mathml:{FindMathML:i,MathMLCompile:o}}}}),MathJax.startup&&(MathJax.startup.registerConstructor("mml",r.MathML),MathJax.startup.useInput("mml"))}]);