// ==UserScript==
// @name           MathJax in Wikipedia
// @namespace      http://www.mathjax.org/
// @description    Insert MathJax into Wikipedia pages
// @include        http://en.wikipedia.org/wiki/*
// ==/UserScript==

if ((window.unsafeWindow == null ? window : unsafeWindow).MathJax == null) {
  //
  //  Replace the images with MathJax scripts of type math/tex
  //
  var images = document.getElementsByTagName('img'), count = 0;
  for (var i = images.length - 1; i >= 0; i--) {
    var img = images[i];
    if (img.className === "tex") {
      var script = document.createElement("script"); script.type = "math/tex";
      if (window.opera) {script.innerHTML = img.alt} else {script.text = img.alt}
      img.parentNode.replaceChild(script,img); count++;
    }
  }
  if (count) {
    //
    //  Load MathJax and have it process the page
    //
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML-full";
    document.getElementsByTagName("head")[0].appendChild(script);
  }
}
