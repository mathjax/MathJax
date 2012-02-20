// ==UserScript==
// @name           MathJax MathML
// @namespace      http://www.mathjax.org/
// @description    Insert MathJax into pages containing MathML
// @include        *
// ==/UserScript==

if ((window.unsafeWindow == null ? window : unsafeWindow).MathJax == null) {
  if ((document.getElementsByTagName("math").length > 0) ||
      (document.getElementsByTagNameNS == null ? false :
      (document.getElementsByTagNameNS("http://www.w3.org/1998/Math/MathML","math").length > 0))) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML-full";
    var config = 'MathJax.Hub.Startup.onload()';
    document.getElementsByTagName("head")[0].appendChild(script);
  }
}
