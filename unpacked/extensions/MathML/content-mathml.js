/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/extensions/MathML/content-mathml.js
 *
 *  This file implements an XSLT transform to convert Content-MathML to
 *  Presentation MathML for processing by MathJax.  The transform is
 *  performed in a pre-filter for the MathML input jax, so that the
 *  Show Math As menu will still show the Original MathML as Content MathML,
 *  but the Presentation MathML can be obtained from the main MathML menu.
 *  
 *  To load it, include
 *  
 *      MathML: {
 *        extensions: ["content-mathml.js"]
 *      }
 *  
 *  in your configuration.
 *
 *  A portion of this file is taken from ctop.xsl which is
 *  Copyright (c) David Carlisle 2001, 2002, 2008, 2009, 2013,
 *  and is used by permission of David Carlisle, who has agreed to allow us
 *  to release it under the Apache2 license (see below).  That portion is
 *  indicated via comments.
 *  
 *  The remainder falls under the copyright that follows.
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2013 The MathJax Consortium
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


MathJax.Extension["MathML/content-mathml"] = (function() {
  /* 
   * Content MathML to Presentation MathML conversion
   *
   * based on David Carlisle's ctop.js - https://web-xslt.googlecode.com/svn/trunk/ctop/ctop.js
   *
   */

  var CToP = {
    version: "2.4",

    /* Transform the given <math> elements from Content MathML to Presentation MathML and replace the original elements
     */
    transform: function(elements){
      for (var i = 0; i< elements.length;i++){
        var mathNode = CToP.transformElement(elements[i]);
        elements[i].parentNode.replaceChild(mathNode,elements[i]); 
      }
    },
    
    /* Transform a Content MathML element into Presentation MathML, and return the new element
     */
    transformElement: function(element) {
      var mathNode = element.cloneNode(false);
      for(var j=0;j<element.childNodes.length; j++ ) {
        CToP.applyTransform(mathNode,element.childNodes[j],0);
      }
      return mathNode;
    },

    /* Create an element with given name, belonging to the MathML namespace
     */
    createElement: function(name) {
      return document.createElementNS("http://www.w3.org/1998/Math/MathML",name);
    },

    /* Get node's children
     */
    children: function(node) {
      var children=[];
      for(var j=0;j<node.childNodes.length; j++ ) {
        if(node.childNodes[j].nodeType==document.ELEMENT_NODE) {
          children.push(node.childNodes[j]);
        }
      }
      return children;
    },

    /* Classify node's children as argumentss, variable bindings, or qualifiers
     */
    classifyChildren: function(contentMMLNode) {
      var args = [], bvars = [], qualifiers = [];
      for(var j=0;j<contentMMLNode.childNodes.length; j++ ) {
        if(contentMMLNode.childNodes[j].nodeType==document.ELEMENT_NODE) {
          var childNode = contentMMLNode.childNodes[j], name = childNode.localName;
          if(name=='bvar'){
            bvars.push(childNode);
          } else if(name=='condition'||
              name=='degree'||
              name=='momentabout'||
              name=='logbase'||
              name=='lowlimit'||
              name=='uplimit'||
              (name=='interval' && args.length<2)||
              name=='domainofapplication') {
                qualifiers.push(childNode);
          } else {
            args.push(childNode);
          }
        }
      }
      return {
        args:args, 
        bvars:bvars, 
        qualifiers:qualifiers
      };
    },

    /* Add an element with given name and text content
     */
    appendToken: function(parentNode,name,textContent) {
      var element = CToP.createElement(name);
      element.textContent = textContent;
      parentNode.appendChild(element);
      return element;
    },

    /* Transform a Content MathML node to Presentation MathML node(s), and attach it to the parent
     */
    applyTransform: function(parentNode,contentMMLNode,precedence) {
      if (contentMMLNode.nodeType==document.ELEMENT_NODE) {
        if(CToP.tokens[contentMMLNode.localName]) {
          CToP.tokens[contentMMLNode.localName](parentNode,contentMMLNode,precedence);
        } else if (contentMMLNode.childNodes.length==0) {
          CToP.appendToken(parentNode,'mi',contentMMLNode.localName);
        } else {
          var clonedChild = contentMMLNode.cloneNode(false);
          parentNode.appendChild(clonedChild);
          for(var j=0;j<contentMMLNode.childNodes.length; j++ ) {
            CToP.applyTransform(clonedChild,contentMMLNode.childNodes[j],precedence);
          }
        }
      } else if (contentMMLNode.nodeType==document.TEXT_NODE) {
        parentNode.appendChild(contentMMLNode.cloneNode(false));
      }
    },

    /* Transform an identifier symbol
     */
    identifier: function(textContent) {
      return function(parentNode,contentMMLNode,precedence) {
        CToP.appendToken(parentNode,'mi',textContent);
      }
    },

    /* Make an mfenced environment
     */
    mfenced: function(children,open,close) {
      var mf = CToP.createElement('mfenced');
      mf.setAttribute('open',open);
      mf.setAttribute('close',close);
      for(var j=0;j<children.length; j++ ) {
        CToP.applyTransform(mf,children[j],0);
      }
      return mf;
    },

    /* Transform a set or set-like notation
     */
    set: function(open,close) {
      var bindSet = CToP.bind('',',','|');
      return function(parentNode,contentMMLNode) {
        var children = CToP.classifyChildren(contentMMLNode);

        var args = children.args, bvars = children.bvars, qualifiers = children.qualifiers;
        if(bvars.length) {
          var firstArg=children.args[0];
          args = args.slice(1);
          var mfenced = CToP.createElement('mfenced');
          mfenced.setAttribute('open',open);
          mfenced.setAttribute('close',close);
          bindSet(mfenced,contentMMLNode,firstArg,args,bvars,qualifiers,0);
          parentNode.appendChild(mfenced);
        } else {
          parentNode.appendChild(CToP.mfenced(args,open,close));
        }
      }
    },

    /* Transform a content token to a presentation token
     *
     * (function factory)
     * @param {string} name - name of the corresponding presentation MML tag
     */
    token: function(name) {
      return function(parentNode,contentMMLNode) {
        if(contentMMLNode.childNodes.length==1 && contentMMLNode.childNodes[0].nodeType==document.TEXT_NODE) {
          CToP.appendToken(parentNode,name,contentMMLNode.textContent);
        } else {
          var mrow = CToP.createElement('mrow');
          for(var j=0;j<contentMMLNode.childNodes.length; j++ ) {
            if (contentMMLNode.childNodes[j].nodeType==document.TEXT_NODE) {
              CToP.appendToken(parentNode,name,contentMMLNode.childNodes[j].textContent);
            }else{
              CToP.applyTransform(mrow,contentMMLNode.childNodes[j],0);
            }
          }
          if(mrow.childNodes.length) {
            parentNode.appendChild(mrow);
          }
        }
      }
    },

    /* Transform a binary operation
     *
     * (function factory)
     */
    binary: function(name,tokenPrecedence) {
      return function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
        var mrow = CToP.createElement('mrow');
        var needsBrackets = tokenPrecedence<precedence || (tokenPrecedence==precedence && name=="-");
        if(needsBrackets) {
          CToP.appendToken(mrow,'mo','(');
        }
        if(args.length>1){
          CToP.applyTransform(mrow,args[0],tokenPrecedence);
        }
        CToP.appendToken(mrow,'mo',name);
        if(args.length>0){
          var z = args[(args.length==1)?0:1];
          CToP.applyTransform(mrow,z,tokenPrecedence);
        }	
        if(needsBrackets) {
          CToP.appendToken(mrow,'mo',')');
        }
        parentNode.appendChild(mrow);
      }
    },

    /* Transform an infix operator
     *
     * (function factory)
     */
    infix: function(name,tokenPrecedence) {
      return function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
        var mrow = CToP.createElement('mrow');
        var needsBrackets = precedence>tokenPrecedence;
        if(needsBrackets) {
          CToP.appendToken(mrow,'mo','(');
        }
        for(var j=0;j<args.length; j++ ) {
          if(j>0) {
            CToP.appendToken(mrow,'mo',name);
          }
          CToP.applyTransform(mrow,args[j],tokenPrecedence);
        }
        if(needsBrackets) {
          CToP.appendToken(mrow,'mo',')');
        }
        parentNode.appendChild(mrow);
      }
    },

    /* Transform an iterated operation, e.g. summation
     *
     * (function factory
     */
    iteration: function(name,limitSymbol) {
      return function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
        var mrow = CToP.createElement('mrow');
        var mo = CToP.createElement('mo');
        mo.textContent = name;
        var munderover = CToP.createElement('munderover');
        munderover.appendChild(mo);
        var mrow1 = CToP.createElement('mrow');
        for(var i=0; i<qualifiers.length;i++){
          if(qualifiers[i].localName=='lowlimit'||
              qualifiers[i].localName=='condition'||
              qualifiers[i].localName=='domainofapplication')
          {
            if(qualifiers[i].localName=='lowlimit'){
              for(var j=0; j<bvars.length;j++){
                var bvar = bvars[j];
                var children = CToP.children(bvar);
                if(children.length){
                  CToP.applyTransform(mrow1,children[0],0);
                }
              }
              if(bvars.length){
                CToP.appendToken(mrow1,"mo",limitSymbol);
              }
            }
            var children = CToP.children(qualifiers[i]);
            for(j=0;j<children.length;j++){
              CToP.applyTransform(mrow1,children[j],0);
            }
          } else {
            var children = CToP.children(qualifiers[i]);
            if (qualifiers[i].localName=='interval' && children.length==2) {
              for(var j=0; j<bvars.length;j++){
                var bvar = b[j];
                var children = CToP.children(bvar);
                if(children.length){
                  CToP.applyTransform(mrow1,children[0],0);
                }
              }
              if(bvars.length){
                CToP.appendToken(mrow1,"mo","=");
              }
              CToP.applyTransform(mrow1,CToP.children(qualifiers[i])[0],0);
            }
          }
        }
        munderover.appendChild(mrow1);
        var mjrow = CToP.createElement('mrow');
        for(var i=0; i<qualifiers.length;i++){
          if(qualifiers[i].localName=='uplimit' ||qualifiers[i].localName=='interval' )
          {
            var children = CToP.children(qualifiers[i]);
            for(j=0;j<children.length;j++){
              CToP.applyTransform(mjrow,children[j],0);
            }
          }
        }
        munderover.appendChild(mjrow);
        mrow.appendChild(munderover);

        for(var i=0; i<args.length;i++){
          CToP.applyTransform(mrow,args[i],precedence);
        }

        parentNode.appendChild(mrow);
      }
    },

    /* Transform something which binds a variable, e.g. forall or lambda
     *
     * (function factory)
     */
    bind: function(name,argSeparator,conditionSeparator) {
      return function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
        var mrow = CToP.createElement('mrow');
        if(name) {
          CToP.appendToken(mrow,'mo',name);
        }
        for(var j=0; j<bvars.length;j++){
          var bvar = bvars[j];
          if(j>0) {
            CToP.appendToken(mrow,'mo',',');
          }
          var children = CToP.children(bvar);
          if(children.length){
            CToP.applyTransform(mrow,children[0],0);
          }
        }

        var conditions_mrow = CToP.createElement('mrow');
        var conditions = false, children;
        for(var i=0; i<qualifiers.length;i++){
          if(qualifiers[i].localName=='condition')	{
            conditions = true;
            children = CToP.children(qualifiers[i]);
            for(var j=0;j<children.length;j++){
              CToP.applyTransform(conditions_mrow,children[j],0);
            }
          }
        }
        if(conditions){
          CToP.appendToken(mrow,'mo',conditionSeparator);
        }
        mrow.appendChild(conditions_mrow);
        for(var i=0; i<qualifiers.length;i++){
          if(qualifiers[i].localName!='condition')	{
            CToP.appendToken(mrow,'mo','\u2208');
            children = CToP.children(qualifiers[i]);
            for(var j=0;j<children.length;j++){
              CToP.applyTransform(mrow,children[j],0);
            }
          }
        }
        if(args.length && (bvars.length||children.length)) {
          CToP.appendToken(mrow,'mo',argSeparator);
        }
        for(var i=0; i<args.length;i++){
          CToP.applyTransform(mrow,args[i],0);
        }
        parentNode.appendChild(mrow);
      }
    },

    /** Transform a function application
     *
     * i.e. something which ends up looking like `f(x,y,z)`, where `f` is a string
     *
     * (function factory)
     */
    fn: function(name) {
      return function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
        var mrow = CToP.createElement('mrow');
        if(firstArg.childNodes.length){
          CToP.applyTransform(mrow,firstArg,1);
        } else {
          CToP.appendToken(mrow,'mi',name);
        }
        CToP.appendToken(mrow,'mo','\u2061');
        mrow.appendChild(CToP.mfenced(args,'(',')'));
        parentNode.appendChild(mrow);
      }
    },

    /** Transform a min/max operation
     *
     * (function factory)
     */
    minmax: function(name) {
      return function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
        var mrow = CToP.createElement('mrow');
        CToP.appendToken(mrow,'mi',name);
        var mrow2 = CToP.createElement('mrow');
        CToP.appendToken(mrow2,'mo','{');
        for(var i=0;i<args.length;i++) {
          if(i>0) {
            CToP.appendToken(mrow2,'mo',',');
          }
          CToP.applyTransform(mrow2,args[i],0);
        }
        if(qualifiers.length) {
          CToP.appendToken(mrow2,'mo','|');
          for(var i=0;i<qualifiers.length;i++) {
            CToP.applyTransform(mrow2,qualifiers[i],0);
          }
        }
        CToP.appendToken(mrow2,'mo','}');
        mrow.appendChild(mrow2);
        parentNode.appendChild(mrow);
      }
    }
  }

  /* mathvariant to use with corresponding <ci> type attribute */
  CToP.cistyles = {
    "vector": 'bold-italic',
    "matrix": 'bold-upright'
  }

  /* Functions to transform variable/atom tokens
   */
  CToP.tokens = {
    "ci": function(parentNode,contentMMLNode,precedence) {
      if(contentMMLNode.childNodes.length==1 && contentMMLNode.childNodes[0].nodeType==document.TEXT_NODE) {
        var mi = CToP.appendToken(parentNode,'mi',contentMMLNode.textContent);
        var type = contentMMLNode.getAttribute('type');
        if(type in CToP.cistyles) {
          mi.setAttribute('mathvariant',CToP.cistyles[type]);
        }
      } else {
        CToP.token('mi')(parentNode,contentMMLNode,precedence);
      }
    },
    "cs": CToP.token('ms'),

    "csymbol": function(parentNode,contentMMLNode,precedence) {
      var cd = contentMMLNode.getAttribute('cd');
      if(cd && CToP.contentDictionaries[cd]) {
        CToP.contentDictionaries[cd](parentNode,contentMMLNode,precedence);
      } else if(CToP.symbols[name]){
        CToP.appendToken(parentNode,'mi',CToP.symbols[name]);
      } else {
        CToP.tokens['ci'](parentNode,contentMMLNode);
      }
    },
    "fn": function(parentNode,contentMMLNode,precedence) {
      CToP.applyTransform(parentNode,CToP.children(contentMMLNode)[0],precedence);
    },

    "naturalnumbers": CToP.identifier('\u2115'),
    "integers": CToP.identifier('\u2124'),
    "reals": CToP.identifier('\u211D'),
    "rationals": CToP.identifier('\u211A'),
    "complexes": CToP.identifier('\u2102'),
    "primes": CToP.identifier('\u2119'),
    "exponentiale": CToP.identifier('e'),
    "imaginaryi": CToP.identifier('i'),
    "notanumber": CToP.identifier('NaN'),
    "eulergamma": CToP.identifier('\u03B3'),
    "gamma": CToP.identifier('\u0263'),
    "pi": CToP.identifier('\u03C0'),
    "infinity": CToP.identifier('\u221E'),
    "emptyset": CToP.identifier('\u2205'),
    "true": CToP.identifier('true'),
    "false": CToP.identifier('false'),
    'set': CToP.set('{','}'),
    'list': CToP.set('(',')')
  }

  CToP.tokens['interval'] = function(parentNode,contentMMLNode,precedence) {
    var closure = contentMMLNode.getAttribute('closure');

    var open, close;
    switch(closure) {
      case 'open':
        open = '(';
        close = ')';
        break;
      case 'open-closed':
        open = '(';
        close = ']';
        break;
      case 'closed-open':
        open = '[';
        close = ')';
        break;
      case 'closed':
      default:
        open = '[';
        close = ']';
    }

    parentNode.appendChild(CToP.mfenced(CToP.children(contentMMLNode),open,close));
  }
  CToP.tokens['apply'] = CToP.tokens['reln'] = CToP.tokens['bind'] = function(parentNode,contentMMLNode,precedence) {
    var children = CToP.classifyChildren(contentMMLNode);

    var firstArg=children.args[0];
    var args = children.args.slice(1), bvars = children.bvars, qualifiers = children.qualifiers;

    if(firstArg) {
      var name = firstArg.localName;
      name = (name=="csymbol") ? firstArg.textContent.toLowerCase() : name;
      if(CToP.applyTokens[name]) {
        CToP.applyTokens[name](parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
      } else {
        CToP.fn(name)(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
      }
    } else {
      parentNode.appendChild(CToP.createElement('mrow'));
    }
  }

  CToP.tokens['cn'] = function(parentNode,contentMMLNode,precedence) {
    var type = contentMMLNode.getAttribute("type");
    var base = contentMMLNode.getAttribute("base");
    if(type || base) {
      if(base) {
        type = 'based-integer';
      }
      switch(type) {
        case 'integer':
        case 'real':
        case 'double':
        case 'constant':
          CToP.token('mn')(parentNode,contentMMLNode);
          break;
        case 'hexdouble':
          CToP.appendToken(parentNode,'mn','0x'+contentMMLNode.textContent);
          break;
        default:
          var apply = CToP.createElement('apply');
          var mrow = CToP.createElement('mrow');
          var c = CToP.createElement(type);
          apply.appendChild(c);
          if(base) {
            CToP.appendToken(apply,'mn',base);
          }
          for(var j=0;j<contentMMLNode.childNodes.length; j++ ) {
            if (contentMMLNode.childNodes[j].nodeType==document.TEXT_NODE) {
              CToP.appendToken(mrow,'cn',contentMMLNode.childNodes[j].textContent);
            }else if (contentMMLNode.childNodes[j].localName=='sep'){
              apply.appendChild(mrow);
              mrow = CToP.createElement('mrow');
            } else {
              mrow.appendChild(contentMMLNode.childNodes[j].cloneNode(true));
            }
          }
          apply.appendChild(mrow);
          CToP.applyTransform(parentNode,apply,0);
      }
    } else {  
      CToP.token('mn')(parentNode,contentMMLNode);
    }
  }

  CToP.tokens['vector'] = function(parentNode,contentMMLNode,precedence) {
    var mrow = CToP.createElement('mrow');
    CToP.appendToken(mrow,'mo','(');

    var mtable = CToP.createElement('mtable');
    var children = CToP.children(contentMMLNode);
    for(var i=0;i<children.length;i++) {
      var mtr = CToP.createElement('mtr');
      var mtd = CToP.createElement('mtd');
      CToP.applyTransform(mtd,children[i],0);
      mtr.appendChild(mtd);
      mtable.appendChild(mtr);
    }

    mrow.appendChild(mtable);
    CToP.appendToken(mrow,'mo',')');
    parentNode.appendChild(mrow);
  }

  CToP.tokens['piecewise'] = function(parentNode,contentMMLNode,precedence) {
    var mrow = CToP.createElement('mrow');
    CToP.appendToken(mrow,'mo','{');
    var mtable = CToP.createElement('mtable');
    mrow.appendChild(mtable);
    var children = CToP.children(contentMMLNode);
    for(var i=0;i<children.length;i++){
      CToP.applyTransform(mtable,children[i],0);
    }
    parentNode.appendChild(mrow);
  }

  CToP.tokens['piece'] = function(parentNode,contentMMLNode,precedence) {
    var mtr = CToP.createElement('mtr');
    var children = CToP.children(contentMMLNode);
    for(i=0;i<children.length;i++){
      var mtd = CToP.createElement('mtd');
      mtr.appendChild(mtd);
      CToP.applyTransform(mtd,children[i],0);
      if(i==0){
        var mtd = CToP.createElement('mtd');
        CToP.appendToken(mtd,"mtext","\u00A0if\u00A0");
        mtr.appendChild(mtd);
      }
    }
    parentNode.appendChild(mtr);
  }

  CToP.tokens['otherwise'] = function(parentNode,contentMMLNode,precedence) {
    var mtr = CToP.createElement('mtr');
    var children = CToP.children(contentMMLNode);
    if(children.length){
      var mtd = CToP.createElement('mtd');
      mtr.appendChild(mtd);
      CToP.applyTransform(mtd,children[0],0);
      var mtd = CToP.createElement('mtd');
      mtd.setAttribute('columnspan','2');
      CToP.appendToken(mtd,"mtext","\u00A0otherwise");
      mtr.appendChild(mtd);
    }
    parentNode.appendChild(mtr);
  }

  CToP.tokens['matrix'] = function(parentNode,contentMMLNode,precedence) {
    var children = CToP.classifyChildren(contentMMLNode);
    var args = children.args, bvars = children.bvars, qualifiers = children.qualifiers;

    if(bvars.length || qualifiers.length) {
      var mrow = CToP.createElement('mrow');
      CToP.appendToken(mrow,"mo","[");
      var msub = CToP.createElement('msub');
      CToP.appendToken(msub,'mi','m');
      var mrow2 = CToP.createElement('mrow');
      for(var i=0;i<bvars.length;i++){
        if(i!=0){
          CToP.appendToken(mrow2,'mo',',');
        }	
        CToP.applyTransform(mrow2,bvars[i].childNodes[0],0);
      }
      msub.appendChild(mrow2);
      mrow.appendChild(msub);
      var msub2 = msub.cloneNode(true);
      CToP.appendToken(mrow,'mo','|');
      mrow.appendChild(msub2);
      CToP.appendToken(mrow,'mo','=');
      for(var i=0;i<args.length;i++){
        if(i!=0){
          CToP.appendToken(mrow,'mo',',');
        }	
        CToP.applyTransform(mrow,args[i],0);
      }
      CToP.appendToken(mrow,'mo',';');
      for(var i=0;i<qualifiers.length;i++){
        if(i!=0){
          CToP.appendToken(mrow,'mo',',');
        }	
        CToP.applyTransform(mrow,qualifiers[i],0);
      }
      CToP.appendToken(mrow,'mo',']');
      parentNode.appendChild(mrow);
    } else {
      var mfenced = CToP.createElement('mfenced');
      var mtable = CToP.createElement('mtable');
      for(var i=0;i<args.length;i++){
        CToP.applyTransform(mtable,args[i],0);
      }
      mfenced.appendChild(mtable);
      parentNode.appendChild(mfenced);
    }
  }

  CToP.tokens['matrixrow'] = function(parentNode,contentMMLNode,precedence) {
    var mtr = CToP.createElement('mtr');
    var children = CToP.children(contentMMLNode);
    for(var i=0;i<children.length;i++){
      var mtd = CToP.createElement('mtd');
      CToP.applyTransform(mtd,children[i],0);
      mtr.appendChild(mtd);
    }
    parentNode.appendChild(mtr);
  }

  CToP.tokens['condition'] = function(parentNode,contentMMLNode,precedence) {
    var mrow = CToP.createElement('mrow');
    var children = CToP.children(contentMMLNode);
    for(var i=0;i<children.length;i++){
      CToP.applyTransform(mrow,children[i],0);
    }
    parentNode.appendChild(mrow);
  }
  CToP.tokens['lambda'] = function(parentNode,contentMMLNode,precedence) {
    var firstArg = CToP.createElement('lambda');
    var children = CToP.classifyChildren(contentMMLNode);
    var args = children.args, bvars = children.bvars, qualifiers = children.qualifiers;

    if(bvars.length){
      CToP.applyTokens["lambda"](parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
    } else {
      var mrow=CToP.createElement('mrow');
      for(var i=0;i<args.length;i++){
        CToP.applyTransform(mrow,args[i],0);
      }
      if(qualifiers.length){
        var msub = CToP.createElement('msub');
        CToP.appendToken(msub,'mo','|');
        var mrow2 = CToP.createElement('mrow');
        for(var i=0;i<qualifiers.length;i++){
          var children = CToP.children(qualifiers[i]);
          for(var j=0;j<children.length;j++){
            CToP.applyTransform(mrow2,children[j],0);
          }
        }
        msub.appendChild(mrow2);
        mrow.appendChild(msub);
      }
      parentNode.appendChild(mrow);
    }
  }
  CToP.tokens["ident"] = function(parentNode,contentMMLNode,precedence) {
    CToP.appendToken(parentNode,"mi","id")
  }

  CToP.tokens["domainofapplication"] = function(parentNode,contentMMLNode,precedence) {
    var merror = CToP.createElement('merror');
    CToP.appendToken(merror,'mtext','unexpected domainofapplication');
    parentNode.appendChild(merror);
  }

  CToP.tokens["share"] = function(parentNode,contentMMLNode,precedence) {
    var mi = CToP.createElement('mi');
    mi.setAttribute('href',contentMMLNode.getAttribute('href'));
    mi.textContent = "share" + contentMMLNode.getAttribute('href');
    parentNode.appendChild(mi);
  }

  CToP.tokens["cerror"] = function(parentNode,contentMMLNode,precedence) {
    var merror = CToP.createElement('merror');
    var children = CToP.children(contentMMLNode);
    for(var i=0;i<children.length;i++){
      CToP.applyTransform(merror,children[i],0);
    }
    parentNode.appendChild(merror);
  }

  CToP.tokens["semantics"] = function(parentNode,contentMMLNode,precedence)  {
    var mrow = CToP.createElement('mrow');
    var children = CToP.children(contentMMLNode);
    if(children.length){
      var z = children[0];
      for(var i=0;i<children.length;i++){
        if(children[i].localName=='annotation-xml' && children[i].getAttribute('encoding')=='MathML-Presentation'){
          z = children[i];
          break;
        }
      }
      CToP.applyTransform(mrow,z,0);
    }
    parentNode.appendChild(mrow);
  }

  CToP.tokens["annotation-xml"] = function(parentNode,contentMMLNode,precedence)  {
    var mrow = CToP.createElement('mrow');
    var children = CToP.children(contentMMLNode);
    for(var i=0;i<children.length;i++){
      CToP.applyTransform(mrow,children[i],0);
    }
    parentNode.appendChild(mrow);
  }


  /* Symbol names to translate to characters
   */
  CToP.symbols = {
    "gamma": '\u03B3'
  }
  CToP.contentDictionaries = {
    "setname1": function(parentNode,contentMMLNode,precedence) {
      var sets = {
        "C": '\u2102',
        "N": '\u2115',
        "P": '\u2119',
        "Q": '\u211A',
        "R": '\u211D',
        "Z": '\u2124'
      }
      var name = contentMMLNode.textContent;
      CToP.appendToken(parentNode,'mi',sets[name]);
    },
    "aritherror": function(parentNode,contentMMLNode,precedence) {
      var name = contentMMLNode.textContent;
      CToP.appendToken(parentNode,'mi',name+':');
    }
  }

  /* Functions to transform function/operation application tokens
   */
  CToP.applyTokens = {
    "rem": CToP.binary('mod',3),
    "divide": CToP.binary('/',3),
    "remainder": CToP.binary('mod',3),
    "implies": CToP.binary('\u21D2',3),
    "factorof": CToP.binary('|',3),
    "in": CToP.binary('\u2208',3),
    "notin": CToP.binary('\u2209',3),
    "notsubset": CToP.binary('\u2288',2),
    "notprsubset": CToP.binary('\u2284',2),
    "setdiff": CToP.binary('\u2216',2),
    "eq": CToP.infix('=',1),
    "compose": CToP.infix('\u2218',0),
    "left_compose": CToP.infix('\u2218',1),
    "xor": CToP.infix('xor',3),
    "neq": CToP.infix('\u2260',1),
    "gt": CToP.infix('>',1),
    "lt": CToP.infix('<',1),
    "geq": CToP.infix('\u2265',1),
    "leq": CToP.infix('\u2264',1),
    "equivalent": CToP.infix('\u2261',1),
    "approx": CToP.infix('\u2248',1),
    "subset": CToP.infix('\u2286',2),
    "prsubset": CToP.infix('\u2282',2),
    "cartesianproduct": CToP.infix('\u00D7',2),
    "cartesian_product": CToP.infix('\u00D7',2),
    "vectorproduct": CToP.infix('\u00D7',2),
    "scalarproduct": CToP.infix('.',2),
    "outerproduct": CToP.infix('\u2297',2),
    "sum": CToP.iteration('\u2211','='),
    "product": CToP.iteration('\u220F','='),
    "forall": CToP.bind('\u2200',',',','),
    "exists": CToP.bind('\u2203','\u007c',','),
    "lambda": CToP.bind('\u03BB','.',','),
    "limit": CToP.iteration('lim','\u2192'),
    "sdev": CToP.fn('\u03c3'),
    "determinant": CToP.fn('det'),
    "max": CToP.minmax('max'),
    "min": CToP.minmax('min'),
    "real": CToP.fn('\u211b'),
    "imaginary": CToP.fn('\u2111'),
    "set": CToP.set('{','}'),
    "list": CToP.set('(',')')
  }
  CToP.applyTokens['exp'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var msup = CToP.createElement('msup');
    CToP.appendToken(msup,'mi','e');
    CToP.applyTransform(msup,args[0],0);
    parentNode.appendChild(msup);
  }

  CToP.applyTokens['union'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    if(bvars.length) {
      CToP.iteration('\u22C3','=')(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
    } else {
      CToP.infix('\u222A',2)(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
    }
  }
  CToP.applyTokens['intersect'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    if(bvars.length) {
      CToP.iteration('\u22C2','=')(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
    } else {
      CToP.infix('\u2229',2)(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
    }
  }

  CToP.applyTokens['floor'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mrow = CToP.createElement('mrow');
    CToP.appendToken(mrow,'mo','\u230a');
    CToP.applyTransform(mrow,args[0],0);
    CToP.appendToken(mrow,'mo','\u230b');
    parentNode.appendChild(mrow);
  }
  CToP.applyTokens['conjugate'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mover = CToP.createElement('mover');
    CToP.applyTransform(mover,args[0],0);
    CToP.appendToken(mover,'mo','\u00af');
    parentNode.appendChild(mover);
  }
  CToP.applyTokens['abs'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mrow = CToP.createElement('mrow');
    CToP.appendToken(mrow,'mo','|');
    CToP.applyTransform(mrow,args[0],0);
    CToP.appendToken(mrow,'mo','|');
    parentNode.appendChild(mrow);
  }
  CToP.applyTokens['and'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    if(bvars.length || qualifiers.length) {
      CToP.iteration('\u22c0','=')(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,4);
    } else {
      CToP.infix('\u2227',2)(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
    }
  }
  CToP.applyTokens['or'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    if(bvars.length || qualifiers.length) {
      CToP.iteration('\u22c1','=')(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,4);
    } else {
      CToP.infix('\u2228',2)(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
    }
  }
  CToP.applyTokens['xor'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    if(bvars.length || qualifiers.length) {
      CToP.iteration('xor','=')(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,4);
    } else {
      CToP.infix('xor',2)(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
    }
  }
  CToP.applyTokens['card'] = CToP.applyTokens['size'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mrow = CToP.createElement('mrow');
    CToP.appendToken(mrow,'mo','|');
    CToP.applyTransform(mrow,args[0],0);
    CToP.appendToken(mrow,'mo','|');
    parentNode.appendChild(mrow);
  }
  CToP.applyTokens['mean'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    if(args.length==1) {
      var mover = CToP.createElement('mover');
      CToP.applyTransform(mover,args[0],0);
      CToP.appendToken(mover,'mo','\u00af');
      parentNode.appendChild(mover);
    } else {
      parentNode.appendChild(CToP.mfenced(args,'\u27e8','\u27e9'));
    }
  }
  CToP.applyTokens['moment'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var degree,momentabout;

    for(var i=0; i<qualifiers.length;i++){
      if(qualifiers[i].localName=='degree') {
        degree = qualifiers[i];
      } else if(qualifiers[i].localName=='momentabout') {
        momentabout = qualifiers[i];
      }
    }

    var mrow = CToP.createElement('mrow');
    CToP.appendToken(mrow,'mo','\u27e8');
    var argrow = CToP.createElement('mrow');
    if(args.length>1) {
      argrow.appendChild(CToP.mfenced(args,'(',')'));
    } else {
      CToP.applyTransform(argrow,args[0],0);
    }
    if(degree) {
      var msup = CToP.createElement('msup');
      msup.appendChild(argrow);
      var children = CToP.children(degree);
      for(var j=0;j<children.length;j++){
        CToP.applyTransform(msup,children[j],0);
      }
      mrow.appendChild(msup);
    } else {
      mrow.appendChild(argrow);
    }
    CToP.appendToken(mrow,'mo','\u27e9');

    if(momentabout) {
      var msub = CToP.createElement('msub');
      msub.appendChild(mrow);
      var children = CToP.children(momentabout);
      for(var j=0;j<children.length;j++){
        CToP.applyTransform(msub,children[j],0);
      }
      parentNode.appendChild(msub);
    } else {
      parentNode.appendChild(mrow);
    }
  }

  CToP.applyTokens['variance'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mrow = CToP.createElement('mrow');
    var msup = CToP.createElement('msup');
    CToP.appendToken(msup,'mo','\u03c3');
    CToP.appendToken(msup,'mn','2');
    mrow.appendChild(msup);
    CToP.appendToken(mrow,'mo','\u2061');
    mrow.appendChild(CToP.mfenced(args,'(',')'));
    parentNode.appendChild(mrow);
  }
  CToP.applyTokens['grad'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mrow = CToP.createElement('mrow');
    CToP.appendToken(mrow,'mo','\u2207');
    CToP.appendToken(mrow,'mo','\u2061');
    mrow.appendChild(CToP.mfenced(args,'(',')'));
    parentNode.appendChild(mrow);
  };
  CToP.applyTokens['laplacian'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mrow = CToP.createElement('mrow');
    var msup = CToP.createElement('msup');
    CToP.appendToken(msup,'mo','\u2207');
    CToP.appendToken(msup,'mn','2');
    mrow.appendChild(msup);
    CToP.appendToken(mrow,'mo','\u2061');
    mrow.appendChild(CToP.mfenced(args,'(',')'));
    parentNode.appendChild(mrow);
  };
  CToP.applyTokens['curl'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mrow = CToP.createElement('mrow');
    CToP.appendToken(mrow,'mo','\u2207');
    CToP.appendToken(mrow,'mo','\u00d7');
    var needsBrackets = args[0].localName == 'apply';
    if(needsBrackets) {
      mrow.appendChild(CToP.mfenced(args,'(', ')'));
    }
    else {
      CToP.applyTransform(mrow,args[0],precedence);
    }
    parentNode.appendChild(mrow);
  };
  CToP.applyTokens['divergence'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mrow = CToP.createElement('mrow');
    CToP.appendToken(mrow,'mo','\u2207');
    CToP.appendToken(mrow,'mo','\u22c5');
    var needsBrackets = args[0].localName == 'apply';
    if(needsBrackets) {
      mrow.appendChild(CToP.mfenced(args,'(', ')'));
    }
    else {
      CToP.applyTransform(mrow,args[0],precedence);
    }
    parentNode.appendChild(mrow);
  };
  CToP.applyTokens['not'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mrow = CToP.createElement('mrow');
    CToP.appendToken(mrow,'mo','\u00ac');
    var needsBrackets = args[0].localName=='apply' || args[0].localName=='bind';
    if(needsBrackets) {
      CToP.appendToken(mrow,'mo','(');
    }
    CToP.applyTransform(mrow,args[0],precedence);
    if(needsBrackets) {
      CToP.appendToken(mrow,'mo',')');
    }
    parentNode.appendChild(mrow)
  }
  CToP.applyTokens['divide'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mfrac = CToP.createElement('mfrac');
    CToP.applyTransform(mfrac,args[0],0);
    CToP.applyTransform(mfrac,args[1],0);
    parentNode.appendChild(mfrac);
  }
  CToP.applyTokens['tendsto'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var type;
    if(firstArg.localName=='tendsto') {
      type = firstArg.getAttribute('type');
    } else {
      type = args[0].textContent;
      args = args.slice(1);
    }
    var name = (type=='above')? '\u2198' :
      (type=='below') ? '\u2197' : '\u2192' ;
    CToP.binary(name,2)(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
  }
  CToP.applyTokens['minus'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    if(args.length==1) {
      CToP.binary('-',5)(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
    } else {
      CToP.binary('-',2)(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
    }
  }
  CToP.applyTokens['complex-cartesian'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mrow = CToP.createElement('mrow');
    CToP.applyTransform(mrow,args[0],0);
    CToP.appendToken(mrow,'mo','+');
    CToP.applyTransform(mrow,args[1],0);
    CToP.appendToken(mrow,'mo','\u2062');
    CToP.appendToken(mrow,'mi','i');
    parentNode.appendChild(mrow);
  }

  CToP.applyTokens['complex-polar'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mrow = CToP.createElement('mrow');
    CToP.applyTransform(mrow,args[0],0);
    CToP.appendToken(mrow,'mo','\u2062');
    var msup = CToP.createElement('msup');
    CToP.appendToken(msup,'mi','e');
    var exponent = CToP.createElement('mrow');
    CToP.applyTransform(exponent,args[1],0);
    CToP.appendToken(exponent,'mo','\u2062');
    CToP.appendToken(exponent,'mi','i');
    msup.appendChild(exponent);
    mrow.appendChild(msup);
    parentNode.appendChild(mrow);
  }

  CToP.applyTokens['integer'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    CToP.applyTransform(parentNode,args[0],0);
  }

  CToP.applyTokens['based-integer'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var msub = CToP.createElement('msub');
    CToP.applyTransform(msub,args[1],0);
    CToP.applyTransform(msub,args[0],0);
    parentNode.appendChild(msub);
  }

  CToP.applyTokens['rational'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mfrac = CToP.createElement('mfrac');
    CToP.applyTransform(mfrac,args[0],0);
    CToP.applyTransform(mfrac,args[1],0);
    parentNode.appendChild(mfrac);
  }

  CToP.applyTokens['times'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mrow = CToP.createElement('mrow');
    var needsBrackets = precedence>3;
    if(needsBrackets) {
      CToP.appendToken(mrow,'mo','(');
    }
    for(var j=0;j<args.length; j++ ) {
      if(j>0) {
        CToP.appendToken(mrow,'mo',(args[j].localName=='cn') ? "\u00D7" :"\u2062");
      }
      CToP.applyTransform(mrow,args[j],3);
    }
    if(needsBrackets) {
      CToP.appendToken(mrow,'mo',')');
    }
    parentNode.appendChild(mrow);
  }

  CToP.applyTokens["plus"] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mrow = CToP.createElement('mrow');
    var needsBrackets = precedence>2;
    if(needsBrackets) {
      CToP.appendToken(mrow,'mo','(');
    }
    for(var j=0;j<args.length; j++ ) {
      var arg = args[j];
      var children = CToP.children(arg);
      if(j>0) {
        var n;
        if(arg.localName=='cn' && !(children.length) && (n=Number(arg.textContent)) <0) {
          CToP.appendToken(mrow,'mo','\u2212');
          CToP.appendToken(mrow,'mn', -n);
        } else if(arg.localName=='apply' && children.length==2 && children[0].localName=='minus') {
          CToP.appendToken(mrow,'mo','\u2212');
          CToP.applyTransform(mrow,children[1],2);
        } else if(arg.localName=='apply' && children.length>2 && children[0].localName=='times' && children[1].localName=='cn' && ( n=Number(children[1].textContent) < 0)) {
          CToP.appendToken(mrow,'mo','\u2212');
          children[1].textContent=-n;// fix me: modifying document
          CToP.applyTransform(mrow,arg,2);
        } else{
          CToP.appendToken(mrow,'mo','+');
          CToP.applyTransform(mrow,arg,2);
        }
      } else {
        CToP.applyTransform(mrow,arg,2);	
      }
    }
    if(needsBrackets) {
      CToP.appendToken(mrow,'mo',')');
    }
    parentNode.appendChild(mrow);
  }

  CToP.applyTokens['transpose'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var msup = CToP.createElement('msup');
    CToP.applyTransform(msup,args[0],precedence);
    CToP.appendToken(msup,'mi','T');
    parentNode.appendChild(msup);
  }

  CToP.applyTokens['power'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var msup = CToP.createElement('msup');
    CToP.applyTransform(msup,args[0],3);
    CToP.applyTransform(msup,args[1],precedence);
    parentNode.appendChild(msup);
  }

  CToP.applyTokens['selector'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var msub = CToP.createElement('msub');
    var mrow = args ? args[0]: CToP.createElement('mrow');
    CToP.applyTransform(msub,mrow,0);
    var mrow2 = CToP.createElement('mrow');
    for(var i=1;i<args.length;i++){
      if(i!=1){
        CToP.appendToken(mrow2,'mo',',');
      }	
      CToP.applyTransform(mrow2,args[i],0);
    }
    msub.appendChild(mrow2);
    parentNode.appendChild(msub);
  }

  CToP.applyTokens["log"] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence)  {
    var mrow = CToP.createElement('mrow');
    var mi = CToP.createElement('mi');
    mi.textContent = 'log';
    if(qualifiers.length && qualifiers[0].localName=='logbase'){
      var msub = CToP.createElement('msub');
      msub.appendChild(mi);
      CToP.applyTransform(msub,CToP.children(qualifiers[0])[0],0);
      mrow.appendChild(msub);
    } else {
      mrow.appendChild(mi);
    }
    CToP.applyTransform(mrow,args[0],7);
    parentNode.appendChild(mrow);
  }

  CToP.applyTokens["int"] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence)  {
    var mrow = CToP.createElement('mrow');
    var mo = CToP.createElement('mo');
    mo.textContent='\u222B';
    var msubsup = CToP.createElement('msubsup');
    msubsup.appendChild(mo);
    var mrow1 = CToP.createElement('mrow');
    for(var i=0; i<qualifiers.length;i++){
      if(qualifiers[i].localName=='lowlimit'||
          qualifiers[i].localName=='condition'||
          qualifiers[i].localName=='domainofapplication')
      {
        var children = CToP.children(qualifiers[i]);
        for(var j=0;j<children.length;j++){
          CToP.applyTransform(mrow1,children[j],0);
        }
      } else {
        var children = CToP.children(qualifiers[i]);
        if (qualifiers[i].localName=='interval' && children.length==2) {
          CToP.applyTransform(mrow1,children[0],0);
        }
      }
    }
    msubsup.appendChild(mrow1);
    var mrow2 = CToP.createElement('mrow');
    for(var i=0; i<qualifiers.length;i++){
      if(qualifiers[i].localName=='uplimit'){
        var children = CToP.children(qualifiers[i]);
        for(j=0;j<children.length;j++){
          CToP.applyTransform(mrow2,children[j],0);
        }
        break;
      } else if(qualifiers[i].localName=='interval' ){
        var children = CToP.children(qualifiers[i]);
        CToP.applyTransform(mrow2,children[children.length-1],0);
        break;
      }
    }
    msubsup.appendChild(mrow2);
    mrow.appendChild(msubsup);
    for(var i=0; i<args.length;i++){
      CToP.applyTransform(mrow,args[i],0);
    }
    for(var i=0; i<bvars.length;i++){
      var bvar = bvars[i];
      var children = CToP.children(bvar);
      if(children.length){
        var mrow3 = CToP.createElement("mrow");
        CToP.appendToken(mrow3,'mi','d');
        CToP.applyTransform(mrow3,children[0],0);
        mrow.appendChild(mrow3);
      }
    }
    parentNode.appendChild(mrow);
  }

  CToP.applyTokens["inverse"] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence)  {
    var msup = CToP.createElement('msup');
    var arg = (args.length) ? args[0] : CToP.createElement('mrow');
    CToP.applyTransform(msup,arg,precedence);
    var mfenced = CToP.createElement('mfenced');
    CToP.appendToken(mfenced,'mn','-1');
    msup.appendChild(mfenced);
    parentNode.appendChild(msup);
  }

  CToP.applyTokens["quotient"] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence)  {
    var mrow = CToP.createElement('mrow');
    CToP.appendToken(mrow,'mo','\u230A');
    if(args.length) {
      CToP.applyTransform(mrow,args[0],0);
      CToP.appendToken(mrow,'mo','/');
      if(args.length>1){
        CToP.applyTransform(mrow,args[1],0);
      }
    }
    CToP.appendToken(mrow,'mo','\u230B');
    parentNode.appendChild(mrow);
  }

  CToP.applyTokens["factorial"] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence)  {
    var mrow = CToP.createElement('mrow');
    CToP.applyTransform(mrow,args[0],4);
    CToP.appendToken(mrow,'mo','!');
    parentNode.appendChild(mrow);
  }

  CToP.applyTokens["root"] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence)  {
    var mr;
    if(firstArg.localName=='root' && (qualifiers.length==0 || (qualifiers[0].localName=='degree' && qualifiers[0].textContent=='2'))){
      mr = CToP.createElement('msqrt');
      for(var i=0;i<args.length;i++){
        CToP.applyTransform(mr,args[i],0);
      }
    } else {
      mr = CToP.createElement('mroot');
      CToP.applyTransform(mr,args[0],0);
      var arg = (firstArg.localName=='root') ? qualifiers[0].childNodes[0] : args[1];
      CToP.applyTransform(mr,arg,0);
    }
    parentNode.appendChild(mr);
  }

  CToP.applyTokens["diff"] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence)  {
    var m;
    var mrow1 = CToP.createElement('mrow');
    if(bvars.length){
      m = CToP.createElement('mfrac');
      var msup, bvar;
      var mi = CToP.createElement('mi');
      mi.textContent = 'd';
      var children = CToP.children(bvars[0]);
      for(var j=0;j<children.length;j++){
        if(children[j].localName=='degree'){
          var childNode = CToP.children(children[j])[0];
          if(childNode.textContent!='1'){
            msup = CToP.createElement('msup');
            msup.appendChild(mi);
            CToP.applyTransform(msup,childNode,0);
          }
        } else {
          bvar = CToP.children(bvars[0])[j];
        }
      }
      mrow1.appendChild(msup || mi);
      if(args.length){
        CToP.applyTransform(mrow1,args[0],0);
      }
      m.appendChild(mrow1);
      mrow1 = CToP.createElement('mrow');
      CToP.appendToken(mrow1,'mi','d');
      if(msup){
        var msup2 = msup.cloneNode(true);
        msup2.replaceChild(bvar,msup2.childNodes[0]); // fix me
        mrow1.appendChild(msup2);
        //CToP.applyTransform(bv,0);
      } else {
        CToP.applyTransform(mrow1,bvar,0);
      }
      m.appendChild(mrow1);
    } else {
      m = CToP.createElement('msup');
      m.appendChild(mrow1);
      CToP.applyTransform(mrow1,args[0],0); 
      CToP.appendToken(m,'mo','\u2032');
    }
    parentNode.appendChild(m);
  }

  CToP.applyTokens["partialdiff"] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence)  {
    var m, mi, msup, mrow, mo, z;

    if(bvars.length==0 && args.length==2 && args[0].localName=='list'){
      if(args[1].localName=='lambda') {
        m = CToP.createElement('mfrac');
        msup = CToP.createElement('msup');
        CToP.appendToken(msup,'mo','\u2202');
        var degree = CToP.children(args[0]).length;
        CToP.appendToken(msup,'mn',degree);
        mrow = CToP.createElement('mrow');
        mrow.appendChild(msup);
        var children = CToP.children(args[1]);
        z = children[children.length - 1];
        CToP.applyTransform(mrow,z,0);
        m.appendChild(mrow);
        mrow = CToP.createElement('mrow');
        var bvarNames = [];
        var lambdaChildren = CToP.children(args[1]);	// names of bound variables
        var lambdaSequence = CToP.children(args[0]);	// indices of bound variable names, in order
        for(var i=0;i<lambdaChildren.length;i++){
          if(lambdaChildren[i].localName=='bvar'){
            bvarNames.push(CToP.children(lambdaChildren[i])[0]);
          }
        }
        var lastN = null, degree = 0;
        function addDiff(n,degree) {
          CToP.appendToken(mrow,'mo','\u2202');
          var bvar = bvarNames[n];
          if(degree>1) {
            var msup = CToP.createElement('msup');
            CToP.applyTransform(msup,bvar,0);
            CToP.appendToken(msup,'mn',degree);
            mrow.appendChild(msup);
          } else {
            CToP.applyTransform(mrow,bvar,0);
          }
        }
        for(var i=0;i<lambdaSequence.length;i++){
          var n = Number(lambdaSequence[i].textContent)-1;
          if(lastN!==null && n!=lastN) {
            addDiff(lastN,degree);
            degree = 0;
          }
          lastN = n;
          degree += 1;
        }
        if(lastN) {
          addDiff(lastN,degree);
        }
        m.appendChild(mrow);
        parentNode.appendChild(m);
      } else {
        m = CToP.createElement('mrow');
        var msub = CToP.createElement('msub');
        CToP.appendToken(msub,'mi','D');
        var bvar = CToP.children(args[0]);
        msub.appendChild(CToP.mfenced(bvar,'',''));
        m.appendChild(msub);
        CToP.applyTransform(m,args[1],0);
        parentNode.appendChild(m);
      }
    } else {
      m = CToP.createElement('mfrac');
      msup = CToP.createElement('msup');
      CToP.appendToken(msup,'mo','\u2202');
      mrow = CToP.createElement('mrow');
      if(qualifiers.length && qualifiers[0].localName=='degree' && CToP.children(qualifiers[0]).length){
        var qualifier = CToP.children(qualifiers[0])[0];
        CToP.applyTransform(mrow,qualifier,0);
      } else {
        var degree = 0;
        var hadFirst = false;
        for(var i=0;i<bvars.length;i++){
          var children = CToP.children(bvars[i]);
          if(children.length==2){
            for(j=0;j<2;j++){
              if(children[j].localName=='degree') {
                if(/^\s*\d+\s*$/.test(children[j].textContent)){
                  degree += Number(children[j].textContent);
                } else {
                  if(hadFirst){
                    CToP.appendToken(mrow,'mo','+');
                  }
                }
                hadFirst = true;
                var degreeNode = CToP.children(children[j])[0];
                CToP.applyTransform(mrow,degreeNode,0);
              }
            }
          } else {
            degree++;
          }
        }
        if(degree>0){
          if(hadFirst){
            CToP.appendToken(mrow,'mo','+');
          }   
          CToP.appendToken(mrow,'mn',degree);
        }
      }
      msup.appendChild(mrow);
      mrow = CToP.createElement('mrow');
      mrow.appendChild(msup);
      if(args.length){
        CToP.applyTransform(mrow,args[0],0);
      }
      m.appendChild(mrow);
      mrow = CToP.createElement('mrow');
      for(var i=0;i<bvars.length;i++){
        CToP.appendToken(mrow,'mo','\u2202');
        var children = CToP.children(bvars[i]);
        if(children.length==2){
          for(j=0;j<2;j++){
            if(children[j].localName=='degree'){
              msup = CToP.createElement('msup');
              CToP.applyTransform(msup,children[1-j],0);
              var degreeNode = CToP.children(children[j])[0];
              CToP.applyTransform(msup,degreeNode,0);
              mrow.appendChild(msup);
            }
          }
        } else if(children.length==1) {
          CToP.applyTransform(mrow,children[0],0);
        }
      }
      m.appendChild(mrow);
      parentNode.appendChild(m);
    }
  }
  return CToP;
  })();


MathJax.Hub.Register.StartupHook("MathML Jax Ready",function () {

  var MATHML = MathJax.InputJax.MathML,
      PARSE = MATHML.Parse.prototype;
      var CToP = MathJax.Extension["MathML/content-mathml"];

  MATHML.DOMfilterHooks.Add(function (data) {
    data.math = CToP.transformElement(data.math);
  });

  MathJax.Hub.Startup.signal.Post("MathML content-mathml Ready");
});

MathJax.Ajax.loadComplete("[MathJax]/extensions/MathML/content-mathml.js");
