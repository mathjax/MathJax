/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/jax/input/AsciiMath/jax.js
 *  
 *  An Input Jax for AsciiMath notation 
 *  (see http://www1.chapman.edu/~jipsen/mathml/asciimath.html).
 *  
 *  Originally adapted for MathJax by David Lippman.
 *  Additional work done by Davide P. Cervone.
 *  
 *  A portion of this file is taken from
 *  ASCIIMathML.js Version 1.4.7 Aug 30, 2005, (c) Peter Jipsen http://www.chapman.edu/~jipsen
 *  and is used by permission of Peter Jipsen, who has agreed to allow us to
 *  release it under the Apache2 license (see below).  That portion is indicated
 *  via comments.
 *  
 *  The remainder falls under the copyright that follows.
 *  
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2012-2014 The MathJax Consortium
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

(function (ASCIIMATH) {

  var MML;  // Filled in later

  //
  //  Make a documentFragment work-alike that uses MML objects
  //  rather than DOM objects.
  //
  var DOCFRAG = MathJax.Object.Subclass({
    firstChild: null,
    lastChild: null,
    Init: function () {
      this.childNodes = [];
    },
    appendChild: function (node) {
      if (node.parent) {node.parent.removeChild(node)}
      if (this.lastChild) {this.lastChild.nextSibling = node}
      if (!this.firstChild) {this.firstChild = node}
      this.childNodes.push(node); node.parent = this;
      this.lastChild = node;
      return node;
    },
    removeChild: function (node) {
      for (var i = 0, m = this.childNodes.length; i < m; i++)
        {if (this.childNodes[i] === node) break}
      if (i === m) return;
      this.childNodes.splice(i,1);
      if (node === this.firstChild) {this.firstChild = node.nextSibling}
      if (node === this.lastChild) {
        if (!this.childNodes.length) {this.lastChild = null}
          else {this.lastChild = this.childNodes[this.childNodes.length-1]}
      }
      if (i) {this.childNodes[i-1].nextSibling = node.nextSibling}
      node.nextSibling = node.parent = null;
      return node;
    },
    replaceChild: function (node,old) {
      for (var i = 0, m = this.childNodes.length; i < m; i++)
        {if (this.childNodes[i] === old) break}
      if (i) {this.childNodes[i-1].nextSibling = node} else {this.firstChild = node}
      if (i >= m-1) {this.lastChild = node}
      this.childNodes[i] = node; node.nextSibling = old.nextSibling;
      old.nextSibling = old.parent = null;
      return old;
    },
    toString: function () {return "{"+this.childNodes.join("")+"}"}
  });
  
  var INITASCIIMATH = function () {
    MML = MathJax.ElementJax.mml;
    var MBASEINIT = MML.mbase.prototype.Init;
    
    //
    //  Make MML elements looks like DOM elements (add the
    //  methods that AsciiMath needs)
    //
    MML.mbase.Augment({
      firstChild: null,
      lastChild: null,
      nodeValue: null,
      nextSibling: null,
      Init: function () {
        var obj = MBASEINIT.apply(this,arguments) || this;
        obj.childNodes = obj.data;
        obj.nodeName = obj.type;
        return obj;
      },
      appendChild: function (node) {
        if (node.parent) {node.parent.removeChild(node)}
        var nodes = arguments;
        if (node.isa(DOCFRAG)) {
          nodes = node.childNodes;
          node.data = node.childNodes = [];
          node.firstChild = node.lastChild = null;
        }
        for (var i = 0, m = nodes.length; i < m; i++) {
          node = nodes[i];
          if (this.lastChild) {this.lastChild.nextSibling = node}
          if (!this.firstChild) {this.firstChild = node}
          this.Append(node);
          this.lastChild = node;
        }
        return node;
      },
      removeChild: function (node) {
        for (var i = 0, m = this.childNodes.length; i < m; i++)
          {if (this.childNodes[i] === node) break}
        if (i === m) return;
        this.childNodes.splice(i,1);
        if (node === this.firstChild) {this.firstChild = node.nextSibling}
        if (node === this.lastChild) {
          if (!this.childNodes.length) {this.lastChild = null}
            else {this.lastChild = this.childNodes[this.childNodes.length-1]}
        }
        if (i) {this.childNodes[i-1].nextSibling = node.nextSibling}
        node.nextSibling = node.parent = null;
        return node;
      },
      replaceChild: function (node,old) {
        for (var i = 0, m = this.childNodes.length; i < m; i++)
          {if (this.childNodes[i] === old) break}
        // FIXME:  make this work with DOCFRAG's?
        if (i) {this.childNodes[i-1].nextSibling = node} else {this.firstChild = node}
        if (i >= m-1) {this.lastChild = node}
        this.SetData(i,node); node.nextSibling = old.nextSibling;
        old.nextSibling = old.parent = null;
        return old;
      },
      setAttribute: function (name,value) {this[name] = value}
    });
  };
  
  //
  //  Set up to isolate ASCIIMathML.js
  //
  
  var window = {};  // hide the true window
  
  //
  //  Hide the true document, and add functions that
  //  use and produce MML objects instead of DOM objects
  //
  var document = {
    getElementById: true,
    createElementNS: function (ns,type) {
      var node = MML[type]();
      if (type === "mo" && ASCIIMATH.config.useMathMLspacing) {node.useMMLspacing = 0x80}
      return node;
    },
    createTextNode: function (text) {return MML.chars(text).With({nodeValue:text})},
    createDocumentFragment: function () {return DOCFRAG()}
  };
  
  var navigator = {appName: "MathJax"};  // hide the true navigator object
  
  var i; // avoid global variable used in code below
  
/******************************************************************
 *
 *   The following section is ASCIIMathML.js Version 1.4.7
 *   (c) Peter Jipsen, used with permission.
 *   
 *   Some sections are commented out to save space in the
 *   minified version (but that is not strictly necessary).
 *   A few items are commented out and marked with DPVC comments
 *   in order to keep the minifier from complaining about the
 *   coding practices in ASCIIMathML.js
 *   
 *   Two sections are modified to include changes from version 2.0.1 of
 *   ASCIIMathML.js and are marked with comments to that effect.  This
 *   makes this version effectively the same as version 2.0.1, but 
 *   without the overhead of the LaTeX-processing code.
 *
 ******************************************************************/

/*
ASCIIMathML.js
==============
This file contains JavaScript functions to convert ASCII math notation
to Presentation MathML. The conversion is done while the (X)HTML page 
loads, and should work with Firefox/Mozilla/Netscape 7+ and Internet 
Explorer 6+MathPlayer (http://www.dessci.com/en/products/mathplayer/).
Just add the next line to your (X)HTML page with this file in the same folder:
<script type="text/javascript" src="ASCIIMathML.js"></script>
This is a convenient and inexpensive solution for authoring MathML.

Version 1.4.7 Aug 30, 2005, (c) Peter Jipsen http://www.chapman.edu/~jipsen
Latest version at http://www.chapman.edu/~jipsen/mathml/ASCIIMathML.js
For changes see http://www.chapman.edu/~jipsen/mathml/asciimathchanges.txt
If you use it on a webpage, please send the URL to jipsen@chapman.edu

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or (at
your option) any later version.

This program is distributed in the hope that it will be useful, 
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
General Public License (at http://www.gnu.org/copyleft/gpl.html) 
for more details.
*/

//var checkForMathML = true;   // check if browser can display MathML
//var notifyIfNoMathML = true; // display note if no MathML capability
//var alertIfNoMathML = true;  // show alert box if no MathML capability
var mathcolor = "red";       // change it to "" (to inherit) or any other color
var mathfontfamily = "serif"; // change to "" to inherit (works in IE) 
                              // or another family (e.g. "arial")
var displaystyle = true;      // puts limits above and below large operators
var showasciiformulaonhover = true; // helps students learn ASCIIMath
var decimalsign = ".";        // change to "," if you like, beware of `(1,2)`!
//var AMdelimiter1 = "`", AMescape1 = "\\\\`"; // can use other characters
//var AMdelimiter2 = "$", AMescape2 = "\\\\\\$", AMdelimiter2regexp = "\\$";
//var doubleblankmathdelimiter = false; // if true,  x+1  is equal to `x+1`
                                      // for IE this works only in <!--   -->
//var separatetokens;// has been removed (email me if this is a problem)
var isIE = document.createElementNS==null;

/* 
 * if (document.getElementById==null) 
 *   alert("This webpage requires a recent browser such as\
 * \nMozilla/Netscape 7+ or Internet Explorer 6+MathPlayer")
 */

// all further global variables start with "AM"

function AMcreateElementXHTML(t) {
  if (isIE) return document.createElement(t);
  else return document.createElementNS("http://www.w3.org/1999/xhtml",t);
}

/* 
 * function AMnoMathMLNote() {
 *   var nd = AMcreateElementXHTML("h3");
 *   nd.setAttribute("align","center")
 *   nd.appendChild(AMcreateElementXHTML("p"));
 *   nd.appendChild(document.createTextNode("To view the "));
 *   var an = AMcreateElementXHTML("a");
 *   an.appendChild(document.createTextNode("ASCIIMathML"));
 *   an.setAttribute("href","http://www.chapman.edu/~jipsen/asciimath.html");
 *   nd.appendChild(an);
 *   nd.appendChild(document.createTextNode(" notation use Internet Explorer 6+"));  
 *   an = AMcreateElementXHTML("a");
 *   an.appendChild(document.createTextNode("MathPlayer"));
 *   an.setAttribute("href","http://www.dessci.com/en/products/mathplayer/download.htm");
 *   nd.appendChild(an);
 *   nd.appendChild(document.createTextNode(" or Netscape/Mozilla/Firefox"));
 *   nd.appendChild(AMcreateElementXHTML("p"));
 *   return nd;
 * }
 * 
 * function AMisMathMLavailable() {
 *   if (navigator.appName.slice(0,8)=="Netscape") 
 *     if (navigator.appVersion.slice(0,1)>="5") return null;
 *     else return AMnoMathMLNote();
 *   else if (navigator.appName.slice(0,9)=="Microsoft")
 *     try {
 *         var ActiveX = new ActiveXObject("MathPlayer.Factory.1");
 *         return null;
 *     } catch (e) {
 *         return AMnoMathMLNote();
 *     }
 *   else return AMnoMathMLNote();
 * }
 */

// character lists for Mozilla/Netscape fonts
var AMcal = [0xEF35,0x212C,0xEF36,0xEF37,0x2130,0x2131,0xEF38,0x210B,0x2110,0xEF39,0xEF3A,0x2112,0x2133,0xEF3B,0xEF3C,0xEF3D,0xEF3E,0x211B,0xEF3F,0xEF40,0xEF41,0xEF42,0xEF43,0xEF44,0xEF45,0xEF46];
var AMfrk = [0xEF5D,0xEF5E,0x212D,0xEF5F,0xEF60,0xEF61,0xEF62,0x210C,0x2111,0xEF63,0xEF64,0xEF65,0xEF66,0xEF67,0xEF68,0xEF69,0xEF6A,0x211C,0xEF6B,0xEF6C,0xEF6D,0xEF6E,0xEF6F,0xEF70,0xEF71,0x2128];
var AMbbb = [0xEF8C,0xEF8D,0x2102,0xEF8E,0xEF8F,0xEF90,0xEF91,0x210D,0xEF92,0xEF93,0xEF94,0xEF95,0xEF96,0x2115,0xEF97,0x2119,0x211A,0x211D,0xEF98,0xEF99,0xEF9A,0xEF9B,0xEF9C,0xEF9D,0xEF9E,0x2124];

var CONST = 0, UNARY = 1, BINARY = 2, INFIX = 3, LEFTBRACKET = 4, 
    RIGHTBRACKET = 5, SPACE = 6, UNDEROVER = 7, DEFINITION = 8,
    LEFTRIGHT = 9, TEXT = 10; // token types

var AMsqrt = {input:"sqrt", tag:"msqrt", output:"sqrt", tex:null, ttype:UNARY},
  AMroot  = {input:"root", tag:"mroot", output:"root", tex:null, ttype:BINARY},
  AMfrac  = {input:"frac", tag:"mfrac", output:"/",    tex:null, ttype:BINARY},
  AMdiv   = {input:"/",    tag:"mfrac", output:"/",    tex:null, ttype:INFIX},
  AMover  = {input:"stackrel", tag:"mover", output:"stackrel", tex:null, ttype:BINARY},
  AMsub   = {input:"_",    tag:"msub",  output:"_",    tex:null, ttype:INFIX},
  AMsup   = {input:"^",    tag:"msup",  output:"^",    tex:null, ttype:INFIX},
  AMtext  = {input:"text", tag:"mtext", output:"text", tex:null, ttype:TEXT},
  AMmbox  = {input:"mbox", tag:"mtext", output:"mbox", tex:null, ttype:TEXT},
  AMquote = {input:"\"",   tag:"mtext", output:"mbox", tex:null, ttype:TEXT};

var AMsymbols = [
//some greek symbols
{input:"alpha",  tag:"mi", output:"\u03B1", tex:null, ttype:CONST},
{input:"beta",   tag:"mi", output:"\u03B2", tex:null, ttype:CONST},
{input:"chi",    tag:"mi", output:"\u03C7", tex:null, ttype:CONST},
{input:"delta",  tag:"mi", output:"\u03B4", tex:null, ttype:CONST},
{input:"Delta",  tag:"mo", output:"\u0394", tex:null, ttype:CONST},
{input:"epsi",   tag:"mi", output:"\u03B5", tex:"epsilon", ttype:CONST},
{input:"varepsilon", tag:"mi", output:"\u025B", tex:null, ttype:CONST},
{input:"eta",    tag:"mi", output:"\u03B7", tex:null, ttype:CONST},
{input:"gamma",  tag:"mi", output:"\u03B3", tex:null, ttype:CONST},
{input:"Gamma",  tag:"mo", output:"\u0393", tex:null, ttype:CONST},
{input:"iota",   tag:"mi", output:"\u03B9", tex:null, ttype:CONST},
{input:"kappa",  tag:"mi", output:"\u03BA", tex:null, ttype:CONST},
{input:"lambda", tag:"mi", output:"\u03BB", tex:null, ttype:CONST},
{input:"Lambda", tag:"mo", output:"\u039B", tex:null, ttype:CONST},
{input:"mu",     tag:"mi", output:"\u03BC", tex:null, ttype:CONST},
{input:"nu",     tag:"mi", output:"\u03BD", tex:null, ttype:CONST},
{input:"omega",  tag:"mi", output:"\u03C9", tex:null, ttype:CONST},
{input:"Omega",  tag:"mo", output:"\u03A9", tex:null, ttype:CONST},
{input:"phi",    tag:"mi", output:"\u03C6", tex:null, ttype:CONST},
{input:"varphi", tag:"mi", output:"\u03D5", tex:null, ttype:CONST},
{input:"Phi",    tag:"mo", output:"\u03A6", tex:null, ttype:CONST},
{input:"pi",     tag:"mi", output:"\u03C0", tex:null, ttype:CONST},
{input:"Pi",     tag:"mo", output:"\u03A0", tex:null, ttype:CONST},
{input:"psi",    tag:"mi", output:"\u03C8", tex:null, ttype:CONST},
{input:"Psi",    tag:"mi", output:"\u03A8", tex:null, ttype:CONST},
{input:"rho",    tag:"mi", output:"\u03C1", tex:null, ttype:CONST},
{input:"sigma",  tag:"mi", output:"\u03C3", tex:null, ttype:CONST},
{input:"Sigma",  tag:"mo", output:"\u03A3", tex:null, ttype:CONST},
{input:"tau",    tag:"mi", output:"\u03C4", tex:null, ttype:CONST},
{input:"theta",  tag:"mi", output:"\u03B8", tex:null, ttype:CONST},
{input:"vartheta", tag:"mi", output:"\u03D1", tex:null, ttype:CONST},
{input:"Theta",  tag:"mo", output:"\u0398", tex:null, ttype:CONST},
{input:"upsilon", tag:"mi", output:"\u03C5", tex:null, ttype:CONST},
{input:"xi",     tag:"mi", output:"\u03BE", tex:null, ttype:CONST},
{input:"Xi",     tag:"mo", output:"\u039E", tex:null, ttype:CONST},
{input:"zeta",   tag:"mi", output:"\u03B6", tex:null, ttype:CONST},

//binary operation symbols
{input:"*",  tag:"mo", output:"\u22C5", tex:"cdot", ttype:CONST},
{input:"**", tag:"mo", output:"\u22C6", tex:"star", ttype:CONST},
{input:"//", tag:"mo", output:"/",      tex:null, ttype:CONST},
{input:"\\\\", tag:"mo", output:"\\",   tex:"backslash", ttype:CONST},
{input:"setminus", tag:"mo", output:"\\", tex:null, ttype:CONST},
{input:"xx", tag:"mo", output:"\u00D7", tex:"times", ttype:CONST},
{input:"-:", tag:"mo", output:"\u00F7", tex:"divide", ttype:CONST},
{input:"@",  tag:"mo", output:"\u2218", tex:"circ", ttype:CONST},
{input:"o+", tag:"mo", output:"\u2295", tex:"oplus", ttype:CONST},
{input:"ox", tag:"mo", output:"\u2297", tex:"otimes", ttype:CONST},
{input:"o.", tag:"mo", output:"\u2299", tex:"odot", ttype:CONST},
{input:"sum", tag:"mo", output:"\u2211", tex:null, ttype:UNDEROVER},
{input:"prod", tag:"mo", output:"\u220F", tex:null, ttype:UNDEROVER},
{input:"^^",  tag:"mo", output:"\u2227", tex:"wedge", ttype:CONST},
{input:"^^^", tag:"mo", output:"\u22C0", tex:"bigwedge", ttype:UNDEROVER},
{input:"vv",  tag:"mo", output:"\u2228", tex:"vee", ttype:CONST},
{input:"vvv", tag:"mo", output:"\u22C1", tex:"bigvee", ttype:UNDEROVER},
{input:"nn",  tag:"mo", output:"\u2229", tex:"cap", ttype:CONST},
{input:"nnn", tag:"mo", output:"\u22C2", tex:"bigcap", ttype:UNDEROVER},
{input:"uu",  tag:"mo", output:"\u222A", tex:"cup", ttype:CONST},
{input:"uuu", tag:"mo", output:"\u22C3", tex:"bigcup", ttype:UNDEROVER},

//binary relation symbols
{input:"!=",  tag:"mo", output:"\u2260", tex:"ne", ttype:CONST},
{input:":=",  tag:"mo", output:":=",     tex:null, ttype:CONST},
{input:"lt",  tag:"mo", output:"<",      tex:null, ttype:CONST},
{input:"<=",  tag:"mo", output:"\u2264", tex:"le", ttype:CONST},
{input:"lt=", tag:"mo", output:"\u2264", tex:"leq", ttype:CONST},
{input:">=",  tag:"mo", output:"\u2265", tex:"ge", ttype:CONST},
{input:"geq", tag:"mo", output:"\u2265", tex:null, ttype:CONST},
{input:"-<",  tag:"mo", output:"\u227A", tex:"prec", ttype:CONST},
{input:"-lt", tag:"mo", output:"\u227A", tex:null, ttype:CONST},
{input:">-",  tag:"mo", output:"\u227B", tex:"succ", ttype:CONST},
{input:"in",  tag:"mo", output:"\u2208", tex:null, ttype:CONST},
{input:"!in", tag:"mo", output:"\u2209", tex:"notin", ttype:CONST},
{input:"sub", tag:"mo", output:"\u2282", tex:"subset", ttype:CONST},
{input:"sup", tag:"mo", output:"\u2283", tex:"supset", ttype:CONST},
{input:"sube", tag:"mo", output:"\u2286", tex:"subseteq", ttype:CONST},
{input:"supe", tag:"mo", output:"\u2287", tex:"supseteq", ttype:CONST},
{input:"-=",  tag:"mo", output:"\u2261", tex:"equiv", ttype:CONST},
{input:"~=",  tag:"mo", output:"\u2245", tex:"cong", ttype:CONST},
{input:"~~",  tag:"mo", output:"\u2248", tex:"approx", ttype:CONST},
{input:"prop", tag:"mo", output:"\u221D", tex:"propto", ttype:CONST},

//logical symbols
{input:"and", tag:"mtext", output:"and", tex:null, ttype:SPACE},
{input:"or",  tag:"mtext", output:"or",  tex:null, ttype:SPACE},
{input:"not", tag:"mo", output:"\u00AC", tex:"neg", ttype:CONST},
{input:"=>",  tag:"mo", output:"\u21D2", tex:"implies", ttype:CONST},
{input:"if",  tag:"mo", output:"if",     tex:null, ttype:SPACE},
{input:"<=>", tag:"mo", output:"\u21D4", tex:"iff", ttype:CONST},
{input:"AA",  tag:"mo", output:"\u2200", tex:"forall", ttype:CONST},
{input:"EE",  tag:"mo", output:"\u2203", tex:"exists", ttype:CONST},
{input:"_|_", tag:"mo", output:"\u22A5", tex:"bot", ttype:CONST},
{input:"TT",  tag:"mo", output:"\u22A4", tex:"top", ttype:CONST},
{input:"|--",  tag:"mo", output:"\u22A2", tex:"vdash", ttype:CONST},
{input:"|==",  tag:"mo", output:"\u22A8", tex:"models", ttype:CONST},

//grouping brackets
{input:"(", tag:"mo", output:"(", tex:null, ttype:LEFTBRACKET},
{input:")", tag:"mo", output:")", tex:null, ttype:RIGHTBRACKET},
{input:"[", tag:"mo", output:"[", tex:null, ttype:LEFTBRACKET},
{input:"]", tag:"mo", output:"]", tex:null, ttype:RIGHTBRACKET},
{input:"{", tag:"mo", output:"{", tex:null, ttype:LEFTBRACKET},
{input:"}", tag:"mo", output:"}", tex:null, ttype:RIGHTBRACKET},
{input:"|", tag:"mo", output:"|", tex:null, ttype:LEFTRIGHT},
//{input:"||", tag:"mo", output:"||", tex:null, ttype:LEFTRIGHT},
{input:"(:", tag:"mo", output:"\u2329", tex:"langle", ttype:LEFTBRACKET},
{input:":)", tag:"mo", output:"\u232A", tex:"rangle", ttype:RIGHTBRACKET},
{input:"<<", tag:"mo", output:"\u2329", tex:null, ttype:LEFTBRACKET},
{input:">>", tag:"mo", output:"\u232A", tex:null, ttype:RIGHTBRACKET},
{input:"{:", tag:"mo", output:"{:", tex:null, ttype:LEFTBRACKET, invisible:true},
{input:":}", tag:"mo", output:":}", tex:null, ttype:RIGHTBRACKET, invisible:true},

//miscellaneous symbols
{input:"int",  tag:"mo", output:"\u222B", tex:null, ttype:CONST},
{input:"dx",   tag:"mi", output:"{:d x:}", tex:null, ttype:DEFINITION},
{input:"dy",   tag:"mi", output:"{:d y:}", tex:null, ttype:DEFINITION},
{input:"dz",   tag:"mi", output:"{:d z:}", tex:null, ttype:DEFINITION},
{input:"dt",   tag:"mi", output:"{:d t:}", tex:null, ttype:DEFINITION},
{input:"oint", tag:"mo", output:"\u222E", tex:null, ttype:CONST},
{input:"del",  tag:"mo", output:"\u2202", tex:"partial", ttype:CONST},
{input:"grad", tag:"mo", output:"\u2207", tex:"nabla", ttype:CONST},
{input:"+-",   tag:"mo", output:"\u00B1", tex:"pm", ttype:CONST},
{input:"O/",   tag:"mo", output:"\u2205", tex:"emptyset", ttype:CONST},
{input:"oo",   tag:"mo", output:"\u221E", tex:"infty", ttype:CONST},
{input:"aleph", tag:"mo", output:"\u2135", tex:null, ttype:CONST},
{input:"...",  tag:"mo", output:"...",    tex:"ldots", ttype:CONST},
{input:":.",  tag:"mo", output:"\u2234",  tex:"therefore", ttype:CONST},
{input:"/_",  tag:"mo", output:"\u2220",  tex:"angle", ttype:CONST},
{input:"\\ ",  tag:"mo", output:"\u00A0", tex:null, ttype:CONST},
{input:"quad", tag:"mo", output:"\u00A0\u00A0", tex:null, ttype:CONST},
{input:"qquad", tag:"mo", output:"\u00A0\u00A0\u00A0\u00A0", tex:null, ttype:CONST},
{input:"cdots", tag:"mo", output:"\u22EF", tex:null, ttype:CONST},
{input:"vdots", tag:"mo", output:"\u22EE", tex:null, ttype:CONST},
{input:"ddots", tag:"mo", output:"\u22F1", tex:null, ttype:CONST},
{input:"diamond", tag:"mo", output:"\u22C4", tex:null, ttype:CONST},
{input:"square", tag:"mo", output:"\u25A1", tex:null, ttype:CONST},
{input:"|__", tag:"mo", output:"\u230A",  tex:"lfloor", ttype:CONST},
{input:"__|", tag:"mo", output:"\u230B",  tex:"rfloor", ttype:CONST},
{input:"|~", tag:"mo", output:"\u2308",  tex:"lceiling", ttype:CONST},
{input:"~|", tag:"mo", output:"\u2309",  tex:"rceiling", ttype:CONST},
{input:"CC",  tag:"mo", output:"\u2102", tex:null, ttype:CONST},
{input:"NN",  tag:"mo", output:"\u2115", tex:null, ttype:CONST},
{input:"QQ",  tag:"mo", output:"\u211A", tex:null, ttype:CONST},
{input:"RR",  tag:"mo", output:"\u211D", tex:null, ttype:CONST},
{input:"ZZ",  tag:"mo", output:"\u2124", tex:null, ttype:CONST},
{input:"f",   tag:"mi", output:"f",      tex:null, ttype:UNARY, func:true},
{input:"g",   tag:"mi", output:"g",      tex:null, ttype:UNARY, func:true},

//standard functions
{input:"lim",  tag:"mo", output:"lim", tex:null, ttype:UNDEROVER},
{input:"Lim",  tag:"mo", output:"Lim", tex:null, ttype:UNDEROVER},
{input:"sin",  tag:"mo", output:"sin", tex:null, ttype:UNARY, func:true},
{input:"cos",  tag:"mo", output:"cos", tex:null, ttype:UNARY, func:true},
{input:"tan",  tag:"mo", output:"tan", tex:null, ttype:UNARY, func:true},
{input:"sinh", tag:"mo", output:"sinh", tex:null, ttype:UNARY, func:true},
{input:"cosh", tag:"mo", output:"cosh", tex:null, ttype:UNARY, func:true},
{input:"tanh", tag:"mo", output:"tanh", tex:null, ttype:UNARY, func:true},
{input:"cot",  tag:"mo", output:"cot", tex:null, ttype:UNARY, func:true},
{input:"sec",  tag:"mo", output:"sec", tex:null, ttype:UNARY, func:true},
{input:"csc",  tag:"mo", output:"csc", tex:null, ttype:UNARY, func:true},
{input:"log",  tag:"mo", output:"log", tex:null, ttype:UNARY, func:true},
{input:"ln",   tag:"mo", output:"ln",  tex:null, ttype:UNARY, func:true},
{input:"det",  tag:"mo", output:"det", tex:null, ttype:UNARY, func:true},
{input:"dim",  tag:"mo", output:"dim", tex:null, ttype:CONST},
{input:"mod",  tag:"mo", output:"mod", tex:null, ttype:CONST},
{input:"gcd",  tag:"mo", output:"gcd", tex:null, ttype:UNARY, func:true},
{input:"lcm",  tag:"mo", output:"lcm", tex:null, ttype:UNARY, func:true},
{input:"lub",  tag:"mo", output:"lub", tex:null, ttype:CONST},
{input:"glb",  tag:"mo", output:"glb", tex:null, ttype:CONST},
{input:"min",  tag:"mo", output:"min", tex:null, ttype:UNDEROVER},
{input:"max",  tag:"mo", output:"max", tex:null, ttype:UNDEROVER},

//arrows
{input:"uarr", tag:"mo", output:"\u2191", tex:"uparrow", ttype:CONST},
{input:"darr", tag:"mo", output:"\u2193", tex:"downarrow", ttype:CONST},
{input:"rarr", tag:"mo", output:"\u2192", tex:"rightarrow", ttype:CONST},
{input:"->",   tag:"mo", output:"\u2192", tex:"to", ttype:CONST},
{input:"|->",  tag:"mo", output:"\u21A6", tex:"mapsto", ttype:CONST},
{input:"larr", tag:"mo", output:"\u2190", tex:"leftarrow", ttype:CONST},
{input:"harr", tag:"mo", output:"\u2194", tex:"leftrightarrow", ttype:CONST},
{input:"rArr", tag:"mo", output:"\u21D2", tex:"Rightarrow", ttype:CONST},
{input:"lArr", tag:"mo", output:"\u21D0", tex:"Leftarrow", ttype:CONST},
{input:"hArr", tag:"mo", output:"\u21D4", tex:"Leftrightarrow", ttype:CONST},

//commands with argument
AMsqrt, AMroot, AMfrac, AMdiv, AMover, AMsub, AMsup,
{input:"hat", tag:"mover", output:"\u005E", tex:null, ttype:UNARY, acc:true},
{input:"bar", tag:"mover", output:"\u00AF", tex:"overline", ttype:UNARY, acc:true},
{input:"vec", tag:"mover", output:"\u2192", tex:null, ttype:UNARY, acc:true},
{input:"dot", tag:"mover", output:".",      tex:null, ttype:UNARY, acc:true},
{input:"ddot", tag:"mover", output:"..",    tex:null, ttype:UNARY, acc:true},
{input:"ul", tag:"munder", output:"\u0332", tex:"underline", ttype:UNARY, acc:true},
AMtext, AMmbox, AMquote,
{input:"bb", tag:"mstyle", atname:"fontweight", atval:"bold", output:"bb", tex:null, ttype:UNARY},
{input:"mathbf", tag:"mstyle", atname:"fontweight", atval:"bold", output:"mathbf", tex:null, ttype:UNARY},
{input:"sf", tag:"mstyle", atname:"fontfamily", atval:"sans-serif", output:"sf", tex:null, ttype:UNARY},
{input:"mathsf", tag:"mstyle", atname:"fontfamily", atval:"sans-serif", output:"mathsf", tex:null, ttype:UNARY},
{input:"bbb", tag:"mstyle", atname:"mathvariant", atval:"double-struck", output:"bbb", tex:null, ttype:UNARY, codes:AMbbb},
{input:"mathbb", tag:"mstyle", atname:"mathvariant", atval:"double-struck", output:"mathbb", tex:null, ttype:UNARY, codes:AMbbb},
{input:"cc",  tag:"mstyle", atname:"mathvariant", atval:"script", output:"cc", tex:null, ttype:UNARY, codes:AMcal},
{input:"mathcal", tag:"mstyle", atname:"mathvariant", atval:"script", output:"mathcal", tex:null, ttype:UNARY, codes:AMcal},
{input:"tt",  tag:"mstyle", atname:"fontfamily", atval:"monospace", output:"tt", tex:null, ttype:UNARY},
{input:"mathtt", tag:"mstyle", atname:"fontfamily", atval:"monospace", output:"mathtt", tex:null, ttype:UNARY},
{input:"fr",  tag:"mstyle", atname:"mathvariant", atval:"fraktur", output:"fr", tex:null, ttype:UNARY, codes:AMfrk},
{input:"mathfrak",  tag:"mstyle", atname:"mathvariant", atval:"fraktur", output:"mathfrak", tex:null, ttype:UNARY, codes:AMfrk}
];

function compareNames(s1,s2) {
  if (s1.input > s2.input) return 1
  else return -1;
}

var AMnames = []; //list of input symbols

function AMinitSymbols() {
  var texsymbols = [], i;
  for (i=0; i<AMsymbols.length; i++)
    if (AMsymbols[i].tex) 
      texsymbols[texsymbols.length] = {input:AMsymbols[i].tex, 
        tag:AMsymbols[i].tag, output:AMsymbols[i].output, ttype:AMsymbols[i].ttype};
  AMsymbols = AMsymbols.concat(texsymbols);
  AMsymbols.sort(compareNames);
  for (i=0; i<AMsymbols.length; i++) AMnames[i] = AMsymbols[i].input;
}

var AMmathml = "http://www.w3.org/1998/Math/MathML";

function AMcreateElementMathML(t) {
  if (isIE) return document.createElement("m:"+t);
  else return document.createElementNS(AMmathml,t);
}

function AMcreateMmlNode(t,frag) {
//  var node = AMcreateElementMathML(name);
  if (isIE) var node = document.createElement("m:"+t);
  else /*var*//*DPVC*/ node = document.createElementNS(AMmathml,t);
  node.appendChild(frag);
  return node;
}

function newcommand(oldstr,newstr) {
  AMsymbols = AMsymbols.concat([{input:oldstr, tag:"mo", output:newstr, 
                                 tex:null, ttype:DEFINITION}]);
  // ####  Added from Version 2.0.1 #### //
  AMsymbols.sort(compareNames);
  for (i=0; i<AMsymbols.length; i++) AMnames[i] = AMsymbols[i].input;
  // ####  End of Addition #### //
}

function AMremoveCharsAndBlanks(str,n) {
//remove n characters and any following blanks
  var st;
  if (str.charAt(n)=="\\" && str.charAt(n+1)!="\\" && str.charAt(n+1)!=" ") 
    st = str.slice(n+1);
  else st = str.slice(n);
  for (var i=0; i<st.length && st.charCodeAt(i)<=32; i=i+1);
  return st.slice(i);
}

function AMposition(arr, str, n) { 
// return position >=n where str appears or would be inserted
// assumes arr is sorted
  if (n==0) {
    var h,m;
    n = -1;
    h = arr.length;
    while (n+1<h) {
      m = (n+h) >> 1;
      if (arr[m]<str) n = m; else h = m;
    }
    return h;
  } else
    for (var i=n; i<arr.length && arr[i]<str; i++);
  return i; // i=arr.length || arr[i]>=str
}

function AMgetSymbol(str) {
//return maximal initial substring of str that appears in names
//return null if there is none
  var k = 0; //new pos
  var j = 0; //old pos
  var mk; //match pos
  var st;
  var tagst;
  var match = "";
  var more = true;
  for (var i=1; i<=str.length && more; i++) {
    st = str.slice(0,i); //initial substring of length i
    j = k;
    k = AMposition(AMnames, st, j);
    if (k<AMnames.length && str.slice(0,AMnames[k].length)==AMnames[k]){
      match = AMnames[k];
      mk = k;
      i = match.length;
    }
    more = k<AMnames.length && str.slice(0,AMnames[k].length)>=AMnames[k];
  }
  AMpreviousSymbol=AMcurrentSymbol;
  if (match!=""){
    AMcurrentSymbol=AMsymbols[mk].ttype;
    return AMsymbols[mk]; 
  }
// if str[0] is a digit or - return maxsubstring of digits.digits
  AMcurrentSymbol=CONST;
  k = 1;
  st = str.slice(0,1);
  var integ = true;
  while ("0"<=st && st<="9" && k<=str.length) {
    st = str.slice(k,k+1);
    k++;
  }
  if (st == decimalsign) {
    st = str.slice(k,k+1);
    if ("0"<=st && st<="9") {
      integ = false;
      k++;
      while ("0"<=st && st<="9" && k<=str.length) {
        st = str.slice(k,k+1);
        k++;
      }
    }
  }
  if ((integ && k>1) || k>2) {
    st = str.slice(0,k-1);
    tagst = "mn";
  } else {
    k = 2;
    st = str.slice(0,1); //take 1 character
    tagst = (("A">st || st>"Z") && ("a">st || st>"z")?"mo":"mi");
  }
  // #### Replaced by lines from Version 2.0.1 #### //
  if (st=="-" && AMpreviousSymbol==INFIX) {
    AMcurrentSymbol = INFIX;  //trick "/" into recognizing "-" on second parse
    return {input:st, tag:tagst, output:st, ttype:UNARY, func:true};
  }
  // #### End of Replacement #### //
  return {input:st, tag:tagst, output:st, ttype:CONST};
}

function AMremoveBrackets(node) {
  var st;
  if (node.nodeName=="mrow") {
    st = node.firstChild.firstChild.nodeValue;
    if (st=="(" || st=="[" || st=="{") node.removeChild(node.firstChild);
  }
  if (node.nodeName=="mrow") {
    st = node.lastChild.firstChild.nodeValue;
    if (st==")" || st=="]" || st=="}") node.removeChild(node.lastChild);
  }
}

/*Parsing ASCII math expressions with the following grammar
v ::= [A-Za-z] | greek letters | numbers | other constant symbols
u ::= sqrt | text | bb | other unary symbols for font commands
b ::= frac | root | stackrel         binary symbols
l ::= ( | [ | { | (: | {:            left brackets
r ::= ) | ] | } | :) | :}            right brackets
S ::= v | lEr | uS | bSS             Simple expression
I ::= S_S | S^S | S_S^S | S          Intermediate expression
E ::= IE | I/I                       Expression
Each terminal symbol is translated into a corresponding mathml node.*/

var AMnestingDepth,AMpreviousSymbol,AMcurrentSymbol;

function AMparseSexpr(str) { //parses str and returns [node,tailstr]
  var symbol, node, result, i, st,// rightvert = false,
    newFrag = document.createDocumentFragment();
  str = AMremoveCharsAndBlanks(str,0);
  symbol = AMgetSymbol(str);             //either a token or a bracket or empty
  if (symbol == null || symbol.ttype == RIGHTBRACKET && AMnestingDepth > 0) {
    return [null,str];
  }
  if (symbol.ttype == DEFINITION) {
    str = symbol.output+AMremoveCharsAndBlanks(str,symbol.input.length); 
    symbol = AMgetSymbol(str);
  }
  switch (symbol.ttype) {
  case UNDEROVER:
  case CONST:
    str = AMremoveCharsAndBlanks(str,symbol.input.length); 
    return [AMcreateMmlNode(symbol.tag,        //its a constant
                             document.createTextNode(symbol.output)),str];
  case LEFTBRACKET:   //read (expr+)
    AMnestingDepth++;
    str = AMremoveCharsAndBlanks(str,symbol.input.length); 
    result = AMparseExpr(str,true);
    AMnestingDepth--;
    if (typeof symbol.invisible == "boolean" && symbol.invisible) 
      node = AMcreateMmlNode("mrow",result[0]);
    else {
      node = AMcreateMmlNode("mo",document.createTextNode(symbol.output));
      node = AMcreateMmlNode("mrow",node);
      node.appendChild(result[0]);
    }
    return [node,result[1]];
  case TEXT:
      if (symbol!=AMquote) str = AMremoveCharsAndBlanks(str,symbol.input.length);
      if (str.charAt(0)=="{") i=str.indexOf("}");
      else if (str.charAt(0)=="(") i=str.indexOf(")");
      else if (str.charAt(0)=="[") i=str.indexOf("]");
      else if (symbol==AMquote) i=str.slice(1).indexOf("\"")+1;
      else i = 0;
      if (i==-1) i = str.length;
      st = str.slice(1,i);
      if (st.charAt(0) == " ") {
        node = AMcreateElementMathML("mspace");
        node.setAttribute("width","1ex");
        newFrag.appendChild(node);
      }
      newFrag.appendChild(
        AMcreateMmlNode(symbol.tag,document.createTextNode(st)));
      if (st.charAt(st.length-1) == " ") {
        node = AMcreateElementMathML("mspace");
        node.setAttribute("width","1ex");
        newFrag.appendChild(node);
      }
      str = AMremoveCharsAndBlanks(str,i+1);
      return [AMcreateMmlNode("mrow",newFrag),str];
  case UNARY:
      str = AMremoveCharsAndBlanks(str,symbol.input.length); 
      result = AMparseSexpr(str);
      if (result[0]==null) return [AMcreateMmlNode(symbol.tag,
                             document.createTextNode(symbol.output)),str];
      if (typeof symbol.func == "boolean" && symbol.func) { // functions hack
        st = str.charAt(0);
        if (st=="^" || st=="_" || st=="/" || st=="|" || st==",") {
          return [AMcreateMmlNode(symbol.tag,
                    document.createTextNode(symbol.output)),str];
        } else {
          node = AMcreateMmlNode("mrow",
           AMcreateMmlNode(symbol.tag,document.createTextNode(symbol.output)));
          node.appendChild(result[0]);
          return [node,result[1]];
        }
      }
      AMremoveBrackets(result[0]);
      if (symbol.input == "sqrt") {           // sqrt
        return [AMcreateMmlNode(symbol.tag,result[0]),result[1]];
      } else if (typeof symbol.acc == "boolean" && symbol.acc) {   // accent
        node = AMcreateMmlNode(symbol.tag,result[0]);
        node.appendChild(AMcreateMmlNode("mo",document.createTextNode(symbol.output)));
        return [node,result[1]];
      } else {                        // font change command
        if (!isIE && typeof symbol.codes != "undefined") {
          for (i=0; i<result[0].childNodes.length; i++)
            if (result[0].childNodes[i].nodeName=="mi" || result[0].nodeName=="mi") {
              st = (result[0].nodeName=="mi"?result[0].firstChild.nodeValue:
                              result[0].childNodes[i].firstChild.nodeValue);
              var newst = [];
              for (var j=0; j<st.length; j++)
                if (st.charCodeAt(j)>64 && st.charCodeAt(j)<91) newst = newst +
                  String.fromCharCode(symbol.codes[st.charCodeAt(j)-65]);
                else newst = newst + st.charAt(j);
              if (result[0].nodeName=="mi")
                result[0]=AMcreateElementMathML("mo").
                          appendChild(document.createTextNode(newst));
              else result[0].replaceChild(AMcreateElementMathML("mo").
          appendChild(document.createTextNode(newst)),result[0].childNodes[i]);
            }
        }
        node = AMcreateMmlNode(symbol.tag,result[0]);
        node.setAttribute(symbol.atname,symbol.atval);
        return [node,result[1]];
      }
  case BINARY:
    str = AMremoveCharsAndBlanks(str,symbol.input.length); 
    result = AMparseSexpr(str);
    if (result[0]==null) return [AMcreateMmlNode("mo",
                           document.createTextNode(symbol.input)),str];
    AMremoveBrackets(result[0]);
    var result2 = AMparseSexpr(result[1]);
    if (result2[0]==null) return [AMcreateMmlNode("mo",
                           document.createTextNode(symbol.input)),str];
    AMremoveBrackets(result2[0]);
    if (symbol.input=="root" || symbol.input=="stackrel") 
      newFrag.appendChild(result2[0]);
    newFrag.appendChild(result[0]);
    if (symbol.input=="frac") newFrag.appendChild(result2[0]);
    return [AMcreateMmlNode(symbol.tag,newFrag),result2[1]];
  case INFIX:
    str = AMremoveCharsAndBlanks(str,symbol.input.length); 
    return [AMcreateMmlNode("mo",document.createTextNode(symbol.output)),str];
  case SPACE:
    str = AMremoveCharsAndBlanks(str,symbol.input.length); 
    node = AMcreateElementMathML("mspace");
    node.setAttribute("width","1ex");
    newFrag.appendChild(node);
    newFrag.appendChild(
      AMcreateMmlNode(symbol.tag,document.createTextNode(symbol.output)));
    node = AMcreateElementMathML("mspace");
    node.setAttribute("width","1ex");
    newFrag.appendChild(node);
    return [AMcreateMmlNode("mrow",newFrag),str];
  case LEFTRIGHT:
//    if (rightvert) return [null,str]; else rightvert = true;
    AMnestingDepth++;
    str = AMremoveCharsAndBlanks(str,symbol.input.length); 
    result = AMparseExpr(str,false);
    AMnestingDepth--;
    /*var*//*DPVC*/ st = "";
    if (result[0].lastChild!=null)
      st = result[0].lastChild.firstChild.nodeValue;
//alert(result[0].lastChild+"***"+st);
    if (st == "|") { // its an absolute value subterm
      node = AMcreateMmlNode("mo",document.createTextNode(symbol.output));
      node = AMcreateMmlNode("mrow",node);
      node.appendChild(result[0]);
      return [node,result[1]];
    } else { // the "|" is a \mid
      node = AMcreateMmlNode("mo",document.createTextNode(symbol.output));
      node = AMcreateMmlNode("mrow",node);
      return [node,str];
    }
  default:
//alert("default");
    str = AMremoveCharsAndBlanks(str,symbol.input.length); 
    return [AMcreateMmlNode(symbol.tag,        //its a constant
                             document.createTextNode(symbol.output)),str];
  }
}

function AMparseIexpr(str) {
  var symbol, sym1, sym2, node, result, underover;
  str = AMremoveCharsAndBlanks(str,0);
  sym1 = AMgetSymbol(str);
  result = AMparseSexpr(str);
  node = result[0];
  str = result[1];
  symbol = AMgetSymbol(str);
  if (symbol.ttype == INFIX && symbol.input != "/") {
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
//    if (symbol.input == "/") result = AMparseIexpr(str); else ...
    result = AMparseSexpr(str);
    if (result[0] == null) // show box in place of missing argument
      result[0] = AMcreateMmlNode("mo",document.createTextNode("\u25A1"));
    else AMremoveBrackets(result[0]);
    str = result[1];
//    if (symbol.input == "/") AMremoveBrackets(node);
    if (symbol.input == "_") {
      sym2 = AMgetSymbol(str);
      underover = (sym1.ttype == UNDEROVER);
      if (sym2.input == "^") {
        str = AMremoveCharsAndBlanks(str,sym2.input.length);
        var res2 = AMparseSexpr(str);
        AMremoveBrackets(res2[0]);
        str = res2[1];
        node = AMcreateMmlNode((underover?"munderover":"msubsup"),node);
        node.appendChild(result[0]);
        node.appendChild(res2[0]);
        node = AMcreateMmlNode("mrow",node); // so sum does not stretch
      } else {
        node = AMcreateMmlNode((underover?"munder":"msub"),node);
        node.appendChild(result[0]);
      }
    } else {
      node = AMcreateMmlNode(symbol.tag,node);
      node.appendChild(result[0]);
    }
  }
  return [node,str];
}

function AMparseExpr(str,rightbracket) {
  var symbol, node, result, i, /*nodeList = [],*//*DPVC*/
  newFrag = document.createDocumentFragment();
  do {
    str = AMremoveCharsAndBlanks(str,0);
    result = AMparseIexpr(str);
    node = result[0];
    str = result[1];
    symbol = AMgetSymbol(str);
    if (symbol.ttype == INFIX && symbol.input == "/") {
      str = AMremoveCharsAndBlanks(str,symbol.input.length);
      result = AMparseIexpr(str);
      if (result[0] == null) // show box in place of missing argument
        result[0] = AMcreateMmlNode("mo",document.createTextNode("\u25A1"));
      else AMremoveBrackets(result[0]);
      str = result[1];
      AMremoveBrackets(node);
      node = AMcreateMmlNode(symbol.tag,node);
      node.appendChild(result[0]);
      newFrag.appendChild(node);
      symbol = AMgetSymbol(str);
    } 
    else if (node!=undefined) newFrag.appendChild(node);
  } while ((symbol.ttype != RIGHTBRACKET && 
           (symbol.ttype != LEFTRIGHT || rightbracket)
           || AMnestingDepth == 0) && symbol!=null && symbol.output!="");
  if (symbol.ttype == RIGHTBRACKET || symbol.ttype == LEFTRIGHT) {
//    if (AMnestingDepth > 0) AMnestingDepth--;
    var len = newFrag.childNodes.length;
    if (len>0 && newFrag.childNodes[len-1].nodeName == "mrow" && len>1 &&
      newFrag.childNodes[len-2].nodeName == "mo" &&
      newFrag.childNodes[len-2].firstChild.nodeValue == ",") { //matrix
      var right = newFrag.childNodes[len-1].lastChild.firstChild.nodeValue;
      if (right==")" || right=="]") {
        var left = newFrag.childNodes[len-1].firstChild.firstChild.nodeValue;
        if (left=="(" && right==")" && symbol.output != "}" || 
            left=="[" && right=="]") {
        var pos = []; // positions of commas
        var matrix = true;
        var m = newFrag.childNodes.length;
        for (i=0; matrix && i<m; i=i+2) {
          pos[i] = [];
          node = newFrag.childNodes[i];
          if (matrix) matrix = node.nodeName=="mrow" && 
            (i==m-1 || node.nextSibling.nodeName=="mo" && 
            node.nextSibling.firstChild.nodeValue==",")&&
            node.firstChild.firstChild.nodeValue==left &&
            node.lastChild.firstChild.nodeValue==right;
          if (matrix) 
            for (var j=0; j<node.childNodes.length; j++)
              if (node.childNodes[j].firstChild.nodeValue==",")
                pos[i][pos[i].length]=j;
          if (matrix && i>1) matrix = pos[i].length == pos[i-2].length;
        }
        if (matrix) {
          var row, frag, n, k, table = document.createDocumentFragment();
          for (i=0; i<m; i=i+2) {
            row = document.createDocumentFragment();
            frag = document.createDocumentFragment();
            node = newFrag.firstChild; // <mrow>(-,-,...,-,-)</mrow>
            n = node.childNodes.length;
            k = 0;
            node.removeChild(node.firstChild); //remove (
            for (j=1; j<n-1; j++) {
              if (typeof pos[i][k] != "undefined" && j==pos[i][k]){
                node.removeChild(node.firstChild); //remove ,
                row.appendChild(AMcreateMmlNode("mtd",frag));
                k++;
              } else frag.appendChild(node.firstChild);
            }
            row.appendChild(AMcreateMmlNode("mtd",frag));
            if (newFrag.childNodes.length>2) {
              newFrag.removeChild(newFrag.firstChild); //remove <mrow>)</mrow>
              newFrag.removeChild(newFrag.firstChild); //remove <mo>,</mo>
            }
            table.appendChild(AMcreateMmlNode("mtr",row));
          }
          node = AMcreateMmlNode("mtable",table);
          if (typeof symbol.invisible == "boolean" && symbol.invisible) node.setAttribute("columnalign","left");
          newFrag.replaceChild(node,newFrag.firstChild);
        }
       }
      }
    }
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    if (typeof symbol.invisible != "boolean" || !symbol.invisible) {
      node = AMcreateMmlNode("mo",document.createTextNode(symbol.output));
      newFrag.appendChild(node);
    }
  }
  return [newFrag,str];
}

function AMparseMath(str) {
  var /*result,*//*DPVC*/ node = AMcreateElementMathML("mstyle");
  if (mathcolor != "") node.setAttribute("mathcolor",mathcolor);
  if (displaystyle) node.setAttribute("displaystyle","true");
  if (mathfontfamily != "") node.setAttribute("fontfamily",mathfontfamily);
  AMnestingDepth = 0;
  node.appendChild(AMparseExpr(str.replace(/^\s+/g,""),false)[0]);
  node = AMcreateMmlNode("math",node);
  if (showasciiformulaonhover)                      //fixed by djhsu so newline
    node.setAttribute("title",str.replace(/\s+/g," "));//does not show in Gecko
  if (mathfontfamily != "" && (isIE || mathfontfamily != "serif")) {
    var fnode = AMcreateElementXHTML("font");
    fnode.setAttribute("face",mathfontfamily);
    fnode.appendChild(node);
    return fnode;
  }
  return node;
}

/* 
 * function AMstrarr2docFrag(arr, linebreaks) {
 *   var newFrag=document.createDocumentFragment();
 *   var expr = false;
 *   for (var i=0; i<arr.length; i++) {
 *     if (expr) newFrag.appendChild(AMparseMath(arr[i]));
 *     else {
 *       var arri = (linebreaks ? arr[i].split("\n\n") : [arr[i]]);
 *       newFrag.appendChild(AMcreateElementXHTML("span").
 *       appendChild(document.createTextNode(arri[0])));
 *       for (var j=1; j<arri.length; j++) {
 *         newFrag.appendChild(AMcreateElementXHTML("p"));
 *         newFrag.appendChild(AMcreateElementXHTML("span").
 *         appendChild(document.createTextNode(arri[j])));
 *       }
 *     }
 *     expr = !expr;
 *   }
 *   return newFrag;
 * }
 * 
 * function AMprocessNodeR(n, linebreaks) {
 *   var mtch, str, arr, frg, i;
 *   if (n.childNodes.length == 0) {
 *    if ((n.nodeType!=8 || linebreaks) &&
 *     n.parentNode.nodeName!="form" && n.parentNode.nodeName!="FORM" &&
 *     n.parentNode.nodeName!="textarea" && n.parentNode.nodeName!="TEXTAREA" &&
 *     n.parentNode.nodeName!="pre" && n.parentNode.nodeName!="PRE") {
 *     str = n.nodeValue;
 *     if (!(str == null)) {
 *       str = str.replace(/\r\n\r\n/g,"\n\n");
 *       if (doubleblankmathdelimiter) {
 *         str = str.replace(/\x20\x20\./g," "+AMdelimiter1+".");
 *         str = str.replace(/\x20\x20,/g," "+AMdelimiter1+",");
 *         str = str.replace(/\x20\x20/g," "+AMdelimiter1+" ");
 *       }
 *       str = str.replace(/\x20+/g," ");
 *       str = str.replace(/\s*\r\n/g," ");
 *       mtch = false;
 *       str = str.replace(new RegExp(AMescape2, "g"),
 *               function(st){mtch=true;return "AMescape2"});
 *       str = str.replace(new RegExp(AMescape1, "g"),
 *               function(st){mtch=true;return "AMescape1"});
 *       str = str.replace(new RegExp(AMdelimiter2regexp, "g"),AMdelimiter1);
 *       arr = str.split(AMdelimiter1);
 *       for (i=0; i<arr.length; i++)
 *         arr[i]=arr[i].replace(/AMescape2/g,AMdelimiter2).
 *                       replace(/AMescape1/g,AMdelimiter1);
 *       if (arr.length>1 || mtch) {
 *         if (checkForMathML) {
 *           checkForMathML = false;
 *           var nd = AMisMathMLavailable();
 *           AMnoMathML = nd != null;
 *           if (AMnoMathML && notifyIfNoMathML) 
 *             if (alertIfNoMathML)
 *               alert("To view the ASCIIMathML notation use Internet Explorer 6 +\nMathPlayer (free from www.dessci.com)\n\
 *                 or Firefox/Mozilla/Netscape");
 *             else AMbody.insertBefore(nd,AMbody.childNodes[0]);
 *         }
 *         if (!AMnoMathML) {
 *           frg = AMstrarr2docFrag(arr,n.nodeType==8);
 *           var len = frg.childNodes.length;
 *           n.parentNode.replaceChild(frg,n);
 *           return len-1;
 *         } else return 0;
 *       }
 *     }
 *    } else return 0;
 *   } else if (n.nodeName!="math") {
 *     for (i=0; i<n.childNodes.length; i++)
 *       i += AMprocessNodeR(n.childNodes[i], linebreaks);
 *   }
 *   return 0;
 * }
 * 
 * function AMprocessNode(n, linebreaks, spanclassAM) {
 *   var frag,st;
 *   if (spanclassAM!=null) {
 *     frag = document.getElementsByTagName("span")
 *     for (var i=0;i<frag.length;i++)
 *       if (frag[i].className == "AM")
 *         AMprocessNodeR(frag[i],linebreaks);
 *   } else {
 *     try {
 *       st = n.innerHTML;
 *     } catch(err) {}
 *     if (st==null || 
 *         st.indexOf(AMdelimiter1)!=-1 || st.indexOf(AMdelimiter2)!=-1) 
 *       AMprocessNodeR(n,linebreaks);
 *   }
 *   if (isIE) { //needed to match size and font of formula to surrounding text
 *     frag = document.getElementsByTagName('math');
 *     for (var i=0;i<frag.length;i++) frag[i].update()
 *   }
 * }
 * 
 * var AMbody;
 * var AMnoMathML = false, AMtranslated = false;
 * 
 * function translate(spanclassAM) {
 *   if (!AMtranslated) { // run this only once
 *     AMtranslated = true;
 *     AMinitSymbols();
 *     AMbody = document.getElementsByTagName("body")[0];
 *     AMprocessNode(AMbody, false, spanclassAM);
 *   }
 * }
 * 
 * if (isIE) { // avoid adding MathPlayer info explicitly to each webpage
 *   document.write("<object id=\"mathplayer\"\
 *   classid=\"clsid:32F66A20-7614-11D4-BD11-00104BD3F987\"></object>");
 *   document.write("<?import namespace=\"m\" implementation=\"#mathplayer\"?>");
 * }
 * 
 * // GO1.1 Generic onload by Brothercake 
 * // http://www.brothercake.com/
 * //onload function (replaces the onload="translate()" in the <body> tag)
 * function generic()
 * {
 *   translate();
 * };
 * //setup onload function
 * if(typeof window.addEventListener != 'undefined')
 * {
 *   //.. gecko, safari, konqueror and standard
 *   window.addEventListener('load', generic, false);
 * }
 * else if(typeof document.addEventListener != 'undefined')
 * {
 *   //.. opera 7
 *   document.addEventListener('load', generic, false);
 * }
 * else if(typeof window.attachEvent != 'undefined')
 * {
 *   //.. win/ie
 *   window.attachEvent('onload', generic);
 * }
 * //** remove this condition to degrade older browsers
 * else
 * {
 *   //.. mac/ie5 and anything else that gets this far
 *   //if there's an existing onload function
 *   if(typeof window.onload == 'function')
 *   {
 *     //store it
 *     var existing = onload;
 *     //add new onload handler
 *     window.onload = function()
 *     {
 *       //call existing onload function
 *       existing();
 *       //call generic onload function
 *       generic();
 *     };
 *   }
 *   else
 *   {
 *     //setup onload function
 *     window.onload = generic;
 *   }
 * }
 */

/******************************************************************
 *
 *   The previous section is ASCIIMathML.js Version 1.4.7
 *   (c) Peter Jipsen, used with permission.
 *
 ******************************************************************/

showasciiformulaonhover = false;
mathfontfamily = "";
mathcolor = "";

//
//  Remove remapping of mathvariants to plane1 (MathJax handles that)
//  Change functions to mi rather than mo (to get spacing right)
//
(function () {
  for (var i = 0, m = AMsymbols.length; i < m; i++) {
    if (AMsymbols[i].codes) {delete AMsymbols[i].codes}
    if (AMsymbols[i].func) {AMsymbols[i].tag = "mi"}
    if (AMsymbols[i].atname === "fontfamily" || AMsymbols[i].atname === "fontweight")
      {AMsymbols[i].atname = "mathvariant"}
  }
})();

//
//  Add some missing symbols
//
AMsymbols.push(
  {input:"gt",  tag:"mo", output:">",      tex:null, ttype:CONST},
  {input:"gt=", tag:"mo", output:"\u2265", tex:"geq", ttype:CONST},
  {input:"-<=", tag:"mo", output:"\u2AAF", tex:"preceq", ttype:CONST},
  {input:">-=", tag:"mo", output:"\u2AB0", tex:"succeq", ttype:CONST},
  {input:"'",   tag:"mo", output:"\u2032", tex:"prime", ttype:CONST},
  {input:"arcsin",  tag:"mi", output:"arcsin", tex:null, ttype:UNARY, func:true},
  {input:"arccos",  tag:"mi", output:"arccos", tex:null, ttype:UNARY, func:true},
  {input:"arctan",  tag:"mi", output:"arctan", tex:null, ttype:UNARY, func:true},
  {input:"coth",  tag:"mi", output:"coth", tex:null, ttype:UNARY, func:true},
  {input:"sech",  tag:"mi", output:"sech", tex:null, ttype:UNARY, func:true},
  {input:"csch",  tag:"mi", output:"csch", tex:null, ttype:UNARY, func:true},
  {input:"abs",   tag:"mi", output:"abs",  tex:null, ttype:UNARY, func:true},
  {input:"exp",   tag:"mi", output:"exp",  tex:null, ttype:UNARY, func:true},
  {input:"tilde", tag:"mover", output:"~", tex:null, ttype:UNARY, acc:true}
)

//
//  Access to AsciiMath functions and values
//
ASCIIMATH.Augment({
  AM: {
    Init: function () {
      displaystyle = ASCIIMATH.config.displaystyle;
      // Old versions use the "decimal" option, so take it into account if it
      // is defined by the user. See issue 384.
      decimalsign  = (ASCIIMATH.config.decimal || ASCIIMATH.config.decimalsign);
      // fix phi and varphi, if requested
      if (ASCIIMATH.config.fixphi) {
        for (var i = 0, m = AMsymbols.length; i < m; i++) {
          if (AMsymbols[i].input === "phi")    {AMsymbols[i].output = "\u03D5"}
          if (AMsymbols[i].input === "varphi") {AMsymbols[i].output = "\u03C6"; i = m}
        }
      }
      INITASCIIMATH();
      AMinitSymbols();
    },
    Augment: function (def) {
      for (var id in def) {if (def.hasOwnProperty(id)) {
	switch (id) {
	 case "displaystyle": displaystyle = def[id]; break;
	 case "decimal": decimal = def[id]; break;
	 case "parseMath": AMparseMath = def[id]; break;
	 case "parseExpr": AMparseExpr = def[id]; break;
	 case "parseIexpr": AMparseIexpr = def[id]; break;
	 case "parseSexpr": AMparseSexpr = def[id]; break;
	 case "removeBrackets": AMremoveBrackets = def[id]; break;
	 case "getSymbol": AMgetSymbol = def[id]; break;
	 case "position": AMposition = def[id]; break;
	 case "removeCharsAndBlanks": AMremoveCharsAndBlanks = def[id]; break;
	 case "createMmlNode": AMcreateMmlNode = def[id]; break;
	 case "createElementMathML": AMcreateElementMathML = def[id]; break;
	 case "createElementXHTML": AMcreateElementXHTML = def[id]; break;
	 case "initSymbols": AMinitSymbols = def[id]; break;
	 case "compareNames": comareNames = def[id]; break;
	};
        this[id] = def[id];
      }};
    },
    parseMath:  AMparseMath,
    parseExpr:  AMparseExpr,
    parseIexpr: AMparseIexpr,
    parseSexr:  AMparseSexpr,
    removeBrackets: AMremoveBrackets,
    getSymbol:  AMgetSymbol,
    position:   AMposition,
    removeCharsAndBlanks: AMremoveCharsAndBlanks,
    createMmlNode: AMcreateMmlNode,
    createElementMathML: AMcreateElementMathML,
    createElementXHTML:  AMcreateElementXHTML,
    initSymbols: AMinitSymbols,
    compareNames: compareNames,
    
    createDocumentFragment: DOCFRAG,
    document: document,
    
    define: newcommand,
    symbols: AMsymbols,
    names: AMnames,
        
    TOKEN: {
      CONST:CONST, UNARY:UNARY, BINARY:BINARY, INFIX:INFIX,
      LEFTBRACKET:LEFTBRACKET, RIGHTBRACKET:RIGHTBRACKET, SPACE:SPACE,
      UNDEROVER:UNDEROVER, DEFINITION:DEFINITION, LEFTRIGHT:LEFTRIGHT, TEXT:TEXT
    }
  }
});

//
//  Make minimizer think these have been used
var junk = [
  window, navigator //,
//  checkForMathML, notifyIfNoMathML, alertIfNoMathML, AMdelimiter1, AMescape1,
//  AMdelimiter2, AMescape2, AMdelimiter2regexp, doubleblankmathdelimiter
];
junk = null;
  
})(MathJax.InputJax.AsciiMath);


/************************************************************************/

(function (ASCIIMATH) {
  var MML;
  
  ASCIIMATH.Augment({
    sourceMenuTitle: /*_(MathMenu)*/ ["AsciiMathInput","AsciiMath Input"],
    annotationEncoding: "text/x-asciimath",

    prefilterHooks:    MathJax.CallBack.Hooks(true),   // hooks to run before processing AsciiMath
    postfilterHooks:   MathJax.CallBack.Hooks(true),   // hooks to run after processing AsciiMath

    Translate: function (script) {
      var mml, math = MathJax.HTML.getScript(script);
      var data = {math:math, script:script};
      this.prefilterHooks.Execute(data); math = data.math;
      try {
        mml = this.AM.parseMath(math);
      } catch(err) {
        if (!err.asciimathError) {throw err}
        mml = this.formatError(err,math);
      }
      data.math = MML(mml); this.postfilterHooks.Execute(data);
      return data.math;
    },
    formatError: function (err,math,script) {
      var message = err.message.replace(/\n.*/,"");
      MathJax.Hub.signal.Post(["AsciiMath Jax - parse error",message,math,script]);
      return MML.Error(message);
    },
    Error: function (message) {
      throw MathJax.Hub.Insert(Error(message),{asciimathError: true});
    },
    //
    //  Initialize the MML variable and AsciiMath itself
    //
    Startup: function () {
      MML = MathJax.ElementJax.mml;
      this.AM.Init();
    }
  });

  ASCIIMATH.loadComplete("jax.js");
  
})(MathJax.InputJax.AsciiMath);



