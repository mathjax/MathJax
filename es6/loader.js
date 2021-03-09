!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.CONFIG=t.MathJax=t.Loader=void 0;const a=n(1),o=n(2);var i,s=n(2);Object.defineProperty(t,"Package",{enumerable:!0,get:function(){return s.Package}}),Object.defineProperty(t,"PackageError",{enumerable:!0,get:function(){return s.PackageError}}),function(n){n.ready=function(...e){0===e.length&&(e=Array.from(o.Package.packages.keys()));const t=[];for(const n of e){const e=o.Package.packages.get(n)||new o.Package(n,!0);t.push(e.promise)}return Promise.all(t)},n.load=function(...e){if(0===e.length)return Promise.resolve();const n=[];for(const a of e){let e=o.Package.packages.get(a);e||(e=new o.Package(a),e.provides(t.CONFIG.provides[a])),e.checkNoLoad(),n.push(e.promise)}return o.Package.loadAll(),Promise.all(n)},n.preLoad=function(...e){for(const n of e){let e=o.Package.packages.get(n);e||(e=new o.Package(n,!0),e.provides(t.CONFIG.provides[n])),e.loaded()}},n.defaultReady=function(){void 0!==t.MathJax.startup&&t.MathJax.config.startup.ready()},n.getRoot=function(){let t=e+"/../../es6";if("undefined"!=typeof document){const e=document.currentScript||document.getElementById("MathJax-script");e&&(t=e.src.replace(/\/[^\/]*$/,""))}return t}}(i=t.Loader||(t.Loader={})),t.MathJax=a.MathJax,void 0===t.MathJax.loader&&(a.combineDefaults(t.MathJax.config,"loader",{paths:{mathjax:i.getRoot()},source:{},dependencies:{},provides:{},load:[],ready:i.defaultReady.bind(i),failed:e=>console.log(`MathJax(${e.package||"?"}): ${e.message}`),require:null}),a.combineWithMathJax({loader:i})),t.CONFIG=t.MathJax.config.loader}).call(this,"/")},function(e,t,n){"use strict";(function(e){function n(e){return"object"==typeof e&&null!==e}function a(e,t){for(const o of Object.keys(t))"__esModule"!==o&&(!n(e[o])||!n(t[o])||t[o]instanceof Promise?null!==t[o]&&void 0!==t[o]&&(e[o]=t[o]):a(e[o],t[o]));return e}Object.defineProperty(t,"__esModule",{value:!0}),t.MathJax=t.combineWithMathJax=t.combineDefaults=t.combineConfig=t.isObject=void 0,t.isObject=n,t.combineConfig=a,t.combineDefaults=function e(t,a,o){t[a]||(t[a]={}),t=t[a];for(const a of Object.keys(o))n(t[a])&&n(o[a])?e(t,a,o[a]):null==t[a]&&null!=o[a]&&(t[a]=o[a]);return t},t.combineWithMathJax=function(e){return a(t.MathJax,e)},void 0===e.MathJax&&(e.MathJax={}),e.MathJax.version||(e.MathJax={version:"3.1.2",_:{},config:e.MathJax}),t.MathJax=e.MathJax}).call(this,n(3))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Package=t.PackageError=void 0;const a=n(0);class o extends Error{constructor(e,t){super(e),this.package=t}}t.PackageError=o;class i{constructor(e,t=!1){this.isLoaded=!1,this.isLoading=!1,this.hasFailed=!1,this.dependents=[],this.dependencies=[],this.dependencyCount=0,this.provided=[],this.name=e,this.noLoad=t,i.packages.set(e,this),this.promise=this.makePromise(this.makeDependencies())}get canLoad(){return 0===this.dependencyCount&&!this.noLoad&&!this.isLoading&&!this.hasFailed}static resolvePath(e,t=!0){let n,o=a.CONFIG.source[e]||e;for(o.match(/^(?:[a-z]+:\/)?\/|[a-z]:\\|\[/i)||(o="[mathjax]/"+o.replace(/^\.\//,"")),t&&!o.match(/\.[^\/]+$/)&&(o+=".js");(n=o.match(/^\[([^\]]*)\]/))&&a.CONFIG.paths.hasOwnProperty(n[1]);)o=a.CONFIG.paths[n[1]]+o.substr(n[0].length);return o}static loadAll(){for(const e of this.packages.values())e.canLoad&&e.load()}makeDependencies(){const e=[],t=i.packages,n=this.noLoad,o=this.name,s=[];a.CONFIG.dependencies.hasOwnProperty(o)?s.push(...a.CONFIG.dependencies[o]):"core"!==o&&s.push("core");for(const a of s){const o=t.get(a)||new i(a,n);this.dependencies.indexOf(o)<0&&(o.addDependent(this,n),this.dependencies.push(o),o.isLoaded||(this.dependencyCount++,e.push(o.promise)))}return e}makePromise(e){let t=new Promise((e,t)=>{this.resolve=e,this.reject=t});const n=a.CONFIG[this.name]||{};return n.ready&&(t=t.then(e=>n.ready(this.name))),e.length&&(e.push(t),t=Promise.all(e).then(e=>e.join(", "))),n.failed&&t.catch(e=>n.failed(new o(e,this.name))),t}load(){if(!this.isLoaded&&!this.isLoading&&!this.noLoad){this.isLoading=!0;const e=i.resolvePath(this.name);a.CONFIG.require?this.loadCustom(e):this.loadScript(e)}}loadCustom(e){try{const t=a.CONFIG.require(e);t instanceof Promise?t.then(()=>this.checkLoad()).catch(t=>this.failed("Can't load \""+e+'"\n'+t.message.trim())):this.checkLoad()}catch(e){this.failed(e.message)}}loadScript(e){const t=document.createElement("script");t.src=e,t.charset="UTF-8",t.onload=e=>this.checkLoad(),t.onerror=t=>this.failed("Can't load \""+e+'"'),document.head.appendChild(t)}loaded(){this.isLoaded=!0,this.isLoading=!1;for(const e of this.dependents)e.requirementSatisfied();for(const e of this.provided)e.loaded();this.resolve(this.name)}failed(e){this.hasFailed=!0,this.isLoading=!1,this.reject(new o(e,this.name))}checkLoad(){((a.CONFIG[this.name]||{}).checkReady||(()=>Promise.resolve()))().then(()=>this.loaded()).catch(e=>this.failed(e))}requirementSatisfied(){this.dependencyCount&&(this.dependencyCount--,this.canLoad&&this.load())}provides(e=[]){for(const t of e){let e=i.packages.get(t);e||(a.CONFIG.dependencies[t]||(a.CONFIG.dependencies[t]=[]),a.CONFIG.dependencies[t].push(t),e=new i(t,!0),e.isLoading=!0),this.provided.push(e)}}addDependent(e,t){this.dependents.push(e),t||this.checkNoLoad()}checkNoLoad(){if(this.noLoad){this.noLoad=!1;for(const e of this.dependencies)e.checkNoLoad()}}}t.Package=i,i.packages=new Map},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";n.r(t);var a=n(1),o=n(0),i=n(2);Object(a.combineWithMathJax)({_:{components:{loader:o,package:i}}});var s,r={tex:"[mathjax]/input/tex/extensions",sre:"[mathjax]/sre/"+("undefined"==typeof window?"sre-node":"sre_browser")},c=["[tex]/action","[tex]/ams","[tex]/amscd","[tex]/bbox","[tex]/boldsymbol","[tex]/braket","[tex]/bussproofs","[tex]/cancel","[tex]/color","[tex]/configmacros","[tex]/enclose","[tex]/extpfeil","[tex]/html","[tex]/mhchem","[tex]/newcommand","[tex]/noerrors","[tex]/noundefined","[tex]/physics","[tex]/require","[tex]/tagformat","[tex]/textmacros","[tex]/unicode","[tex]/verb"],d={startup:["loader"],"input/tex":["input/tex-base","[tex]/ams","[tex]/newcommand","[tex]/noundefined","[tex]/require","[tex]/autoload","[tex]/configmacros"],"input/tex-full":["input/tex-base","[tex]/all-packages"].concat(c),"[tex]/all-packages":c};function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}Object(a.combineDefaults)(MathJax.config.loader,"dependencies",{"a11y/semantic-enrich":["input/mml","[sre]"],"a11y/complexity":["a11y/semantic-enrich"],"a11y/explorer":["a11y/semantic-enrich","ui/menu"],"[tex]/all-packages":["input/tex-base"],"[tex]/action":["input/tex-base","[tex]/newcommand"],"[tex]/autoload":["input/tex-base","[tex]/require"],"[tex]/ams":["input/tex-base"],"[tex]/amscd":["input/tex-base"],"[tex]/bbox":["input/tex-base","[tex]/ams","[tex]/newcommand"],"[tex]/boldsymbol":["input/tex-base"],"[tex]/braket":["input/tex-base"],"[tex]/bussproofs":["input/tex-base"],"[tex]/cancel":["input/tex-base","[tex]/enclose"],"[tex]/color":["input/tex-base"],"[tex]/colorv2":["input/tex-base"],"[tex]/configmacros":["input/tex-base","[tex]/newcommand"],"[tex]/enclose":["input/tex-base"],"[tex]/extpfeil":["input/tex-base","[tex]/newcommand","[tex]/ams"],"[tex]/html":["input/tex-base"],"[tex]/mhchem":["input/tex-base","[tex]/ams"],"[tex]/newcommand":["input/tex-base"],"[tex]/noerrors":["input/tex-base"],"[tex]/noundefined":["input/tex-base"],"[tex]/physics":["input/tex-base"],"[tex]/require":["input/tex-base"],"[tex]/tagformat":["input/tex-base"],"[tex]/textmacros":["input/tex-base"],"[tex]/unicode":["input/tex-base"],"[tex]/verb":["input/tex-base"]}),Object(a.combineDefaults)(MathJax.config.loader,"paths",r),Object(a.combineDefaults)(MathJax.config.loader,"provides",d),o.Loader.load.apply(o.Loader,(s=o.CONFIG.load,function(e){if(Array.isArray(e))return u(e)}(s)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(s)||function(e,t){if(e){if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0}}(s)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())).then((function(){return o.CONFIG.ready()})).catch((function(e,t){return o.CONFIG.failed(e,t)}))}]);