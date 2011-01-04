/*
 *  imagedata.js
 *  
 *  Copyright (c) 2010 Design Science, Inc.
 *
 *  Part of the MathJax library.
 *  See http://www.mathjax.org for details.
 * 
 *  Licensed under the Apache License, Version 2.0;
 *  you may not use this file except in compliance with the License.
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */

(function (HTMLCSS) {

  //
  //  Since this is the new font data, reset the 
  //  flag and the imgPacked values
  //
  HTMLCSS.config.useOldImageData = false;
  HTMLCSS.imgPacked = (MathJax.isPacked ? "" : "/unpacked");

  //
  //  Load the actual image data file
  //  before loadComplete is called
  //
  MathJax.Callback.Queue(
    ["Require",MathJax.Ajax,HTMLCSS.imgDir+HTMLCSS.imgPacked+"/imagedata.js"],
    ["loadComplete",MathJax.Ajax,HTMLCSS.webfontDir+"/imagedata.js"]
  );

})(MathJax.OutputJax["HTML-CSS"]);
