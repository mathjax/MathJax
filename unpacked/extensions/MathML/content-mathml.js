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


MathJax.Extension["MathML/content-mathml"] = (function(HUB) {
  /* 
   * Content MathML to Presentation MathML conversion
   *
   * based on David Carlisle's ctop.js - https://web-xslt.googlecode.com/svn/trunk/ctop/ctop.js
   *
   */

  var CONFIG = HUB.CombineConfig("MathML.content-mathml",{
		// render `a+(-b)` as `a-b`?
		collapsePlusMinus: true,

		/* mathvariant to use with corresponding <ci> type attribute */
		cistyles: {
			"vector": 'bold-italic',
			"matrix": 'bold-upright'
		},

		/* Symbol names to translate to characters
		 */
		symbols: {
			"gamma": '\u03B3'
		}

	});

  var CToP = {
    version: '2.4',
    settings: CONFIG,

    /* Transform the given <math> elements from Content MathML to Presentation MathML and replace the original elements
     */
    transformElements: function(elements){
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
    getChildren: function(node) {
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
      if(!contentMMLNode) {
        var merror = CToP.createElement('merror');
        CToP.appendToken(merror,'mtext','Missing child node');
        parentNode.appendChild(merror);
        return;
      }
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

    /* Make an mfenced environment
     */
    createmfenced: function(children,open,close) {
      var mf = CToP.createElement('mfenced');
      mf.setAttribute('open',open);
      mf.setAttribute('close',close);
      for(var j=0;j<children.length; j++ ) {
        CToP.applyTransform(mf,children[j],0);
      }
      return mf;
    },

    transforms: {

      /* Transform an identifier symbol
      */
      identifier: function(textContent) {
        return function(parentNode,contentMMLNode,precedence) {
          CToP.appendToken(parentNode,'mi',textContent);
        }
      },

      /* Transform a set or set-like notation
      */
      set: function(open,close) {
        var bindSet = CToP.transforms.bind('',',','|');
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
            parentNode.appendChild(CToP.createmfenced(args,open,close));
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
                  var children = CToP.getChildren(bvar);
                  if(children.length){
                    CToP.applyTransform(mrow1,children[0],0);
                  }
                }
                if(bvars.length){
                  CToP.appendToken(mrow1,"mo",limitSymbol);
                }
              }
              var children = CToP.getChildren(qualifiers[i]);
              for(j=0;j<children.length;j++){
                CToP.applyTransform(mrow1,children[j],0);
              }
            } else {
              var children = CToP.getChildren(qualifiers[i]);
              if (qualifiers[i].localName=='interval' && children.length==2) {
                for(var j=0; j<bvars.length;j++){
                  var bvar = b[j];
                  var children = CToP.getChildren(bvar);
                  if(children.length){
                    CToP.applyTransform(mrow1,children[0],0);
                  }
                }
                if(bvars.length){
                  CToP.appendToken(mrow1,"mo","=");
                }
                CToP.applyTransform(mrow1,CToP.getChildren(qualifiers[i])[0],0);
              }
            }
          }
          munderover.appendChild(mrow1);
          var mjrow = CToP.createElement('mrow');
          for(var i=0; i<qualifiers.length;i++){
            if(qualifiers[i].localName=='uplimit' ||qualifiers[i].localName=='interval' )
            {
              var children = CToP.getChildren(qualifiers[i]);
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
            var children = CToP.getChildren(bvar);
            if(children.length){
              CToP.applyTransform(mrow,children[0],0);
            }
          }

          var conditions_mrow = CToP.createElement('mrow');
          var conditions = false, children;
          for(var i=0; i<qualifiers.length;i++){
            if(qualifiers[i].localName=='condition')	{
              conditions = true;
              children = CToP.getChildren(qualifiers[i]);
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
              children = CToP.getChildren(qualifiers[i]);
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
          mrow.appendChild(CToP.createmfenced(args,'(',')'));
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
  }

  /* Functions to transform variable/atom tokens
   */
  CToP.tokens = {
    "ci": function(parentNode,contentMMLNode,precedence) {
      if(contentMMLNode.childNodes.length==1 && contentMMLNode.childNodes[0].nodeType==document.TEXT_NODE) {
        var mi = CToP.appendToken(parentNode,'mi',contentMMLNode.textContent);
        var type = contentMMLNode.getAttribute('type');
        if(type in CToP.settings.cistyles) {
          mi.setAttribute('mathvariant',CToP.settings.cistyles[type]);
        }
      } else {
        CToP.transforms.token('mi')(parentNode,contentMMLNode,precedence);
      }
    },
    "cs": CToP.transforms.token('ms'),

    "csymbol": function(parentNode,contentMMLNode,precedence) {
      var cd = contentMMLNode.getAttribute('cd');
      if(cd && CToP.contentDictionaries[cd]) {
        CToP.contentDictionaries[cd](parentNode,contentMMLNode,precedence);
      } else if(CToP.settings.symbols[name]){
        CToP.appendToken(parentNode,'mi',CToP.settings.symbols[name]);
      } else {
        CToP.tokens['ci'](parentNode,contentMMLNode);
      }
    },
    "fn": function(parentNode,contentMMLNode,precedence) {
      CToP.applyTransform(parentNode,CToP.getChildren(contentMMLNode)[0],precedence);
    },

    "naturalnumbers": CToP.transforms.identifier('\u2115'),
    "integers": CToP.transforms.identifier('\u2124'),
    "reals": CToP.transforms.identifier('\u211D'),
    "rationals": CToP.transforms.identifier('\u211A'),
    "complexes": CToP.transforms.identifier('\u2102'),
    "primes": CToP.transforms.identifier('\u2119'),
    "exponentiale": CToP.transforms.identifier('e'),
    "imaginaryi": CToP.transforms.identifier('i'),
    "notanumber": CToP.transforms.identifier('NaN'),
    "eulergamma": CToP.transforms.identifier('\u03B3'),
    "gamma": CToP.transforms.identifier('\u0263'),
    "pi": CToP.transforms.identifier('\u03C0'),
    "infinity": CToP.transforms.identifier('\u221E'),
    "emptyset": CToP.transforms.identifier('\u2205'),
    "true": CToP.transforms.identifier('true'),
    "false": CToP.transforms.identifier('false'),
    'set': CToP.transforms.set('{','}'),
    'list': CToP.transforms.set('(',')')
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

    parentNode.appendChild(CToP.createmfenced(CToP.getChildren(contentMMLNode),open,close));
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
        CToP.transforms.fn(name)(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
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
          CToP.transforms.token('mn')(parentNode,contentMMLNode);
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
      CToP.transforms.token('mn')(parentNode,contentMMLNode);
    }
  }

  CToP.tokens['vector'] = function(parentNode,contentMMLNode,precedence) {
    var mrow = CToP.createElement('mrow');
    CToP.appendToken(mrow,'mo','(');

    var mtable = CToP.createElement('mtable');
    var children = CToP.getChildren(contentMMLNode);
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
    var children = CToP.getChildren(contentMMLNode);
    for(var i=0;i<children.length;i++){
      CToP.applyTransform(mtable,children[i],0);
    }
    parentNode.appendChild(mrow);
  }

  CToP.tokens['piece'] = function(parentNode,contentMMLNode,precedence) {
    var mtr = CToP.createElement('mtr');
    var children = CToP.getChildren(contentMMLNode);
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
    var children = CToP.getChildren(contentMMLNode);
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
    var children = CToP.getChildren(contentMMLNode);
    for(var i=0;i<children.length;i++){
      var mtd = CToP.createElement('mtd');
      CToP.applyTransform(mtd,children[i],0);
      mtr.appendChild(mtd);
    }
    parentNode.appendChild(mtr);
  }

  CToP.tokens['condition'] = function(parentNode,contentMMLNode,precedence) {
    var mrow = CToP.createElement('mrow');
    var children = CToP.getChildren(contentMMLNode);
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
          var children = CToP.getChildren(qualifiers[i]);
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
    mi.textContent = "Share " + contentMMLNode.getAttribute('href');
    parentNode.appendChild(mi);
  }

  CToP.tokens["cerror"] = function(parentNode,contentMMLNode,precedence) {
    var merror = CToP.createElement('merror');
    var children = CToP.getChildren(contentMMLNode);
    for(var i=0;i<children.length;i++){
      CToP.applyTransform(merror,children[i],0);
    }
    parentNode.appendChild(merror);
  }

  CToP.tokens["semantics"] = function(parentNode,contentMMLNode,precedence)  {
    var mrow = CToP.createElement('mrow');
    var children = CToP.getChildren(contentMMLNode);
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
    var children = CToP.getChildren(contentMMLNode);
    for(var i=0;i<children.length;i++){
      CToP.applyTransform(mrow,children[i],0);
    }
    parentNode.appendChild(mrow);
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
    "rem": CToP.transforms.binary('mod',3),
    "divide": CToP.transforms.binary('/',3),
    "remainder": CToP.transforms.binary('mod',3),
    "implies": CToP.transforms.binary('\u21D2',3),
    "factorof": CToP.transforms.binary('|',3),
    "in": CToP.transforms.binary('\u2208',3),
    "notin": CToP.transforms.binary('\u2209',3),
    "notsubset": CToP.transforms.binary('\u2288',2),
    "notprsubset": CToP.transforms.binary('\u2284',2),
    "setdiff": CToP.transforms.binary('\u2216',2),
    "eq": CToP.transforms.infix('=',1),
    "compose": CToP.transforms.infix('\u2218',0),
    "left_compose": CToP.transforms.infix('\u2218',1),
    "xor": CToP.transforms.infix('xor',3),
    "neq": CToP.transforms.infix('\u2260',1),
    "gt": CToP.transforms.infix('>',1),
    "lt": CToP.transforms.infix('<',1),
    "geq": CToP.transforms.infix('\u2265',1),
    "leq": CToP.transforms.infix('\u2264',1),
    "equivalent": CToP.transforms.infix('\u2261',1),
    "approx": CToP.transforms.infix('\u2248',1),
    "subset": CToP.transforms.infix('\u2286',2),
    "prsubset": CToP.transforms.infix('\u2282',2),
    "cartesianproduct": CToP.transforms.infix('\u00D7',2),
    "cartesian_product": CToP.transforms.infix('\u00D7',2),
    "vectorproduct": CToP.transforms.infix('\u00D7',2),
    "scalarproduct": CToP.transforms.infix('.',2),
    "outerproduct": CToP.transforms.infix('\u2297',2),
    "sum": CToP.transforms.iteration('\u2211','='),
    "product": CToP.transforms.iteration('\u220F','='),
    "forall": CToP.transforms.bind('\u2200','.',','),
    "exists": CToP.transforms.bind('\u2203','.',','),
    "lambda": CToP.transforms.bind('\u03BB','.',','),
    "limit": CToP.transforms.iteration('lim','\u2192'),
    "sdev": CToP.transforms.fn('\u03c3'),
    "determinant": CToP.transforms.fn('det'),
    "max": CToP.transforms.minmax('max'),
    "min": CToP.transforms.minmax('min'),
    "real": CToP.transforms.fn('\u211b'),
    "imaginary": CToP.transforms.fn('\u2111'),
    "set": CToP.transforms.set('{','}'),
    "list": CToP.transforms.set('(',')')
  }
  CToP.applyTokens['exp'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var msup = CToP.createElement('msup');
    CToP.appendToken(msup,'mi','e');
    CToP.applyTransform(msup,args[0],0);
    parentNode.appendChild(msup);
  }

  CToP.applyTokens['union'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    if(bvars.length) {
      CToP.transforms.iteration('\u22C3','=')(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
    } else {
      CToP.transforms.infix('\u222A',2)(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
    }
  }
  CToP.applyTokens['intersect'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    if(bvars.length) {
      CToP.transforms.iteration('\u22C2','=')(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
    } else {
      var mrow = CToP.createElement('mrow');
      var needsBrackets = precedence>2;
      if(needsBrackets) {
        CToP.appendToken(mrow,'mo','(');
      }
      for(var j=0;j<args.length; j++ ) {
        var argBrackets = false;
        if(j>0) {
          CToP.appendToken(mrow,'mo','\u2229');
          if(args[j].localName=='apply') {
            var child = CToP.getChildren(args[j])[0];
            argBrackets = child.localName == 'union';
          }
        }
        if(argBrackets) {
          CToP.appendToken(mrow,'mo','(');
        }
        CToP.applyTransform(mrow,args[j],2);
        if(argBrackets) {
          CToP.appendToken(mrow,'mo',')');
        }
      }
      if(needsBrackets) {
        CToP.appendToken(mrow,'mo',')');
      }
      parentNode.appendChild(mrow);
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
      CToP.transforms.iteration('\u22c0','=')(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,4);
    } else {
      CToP.transforms.infix('\u2227',2)(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
    }
  }
  CToP.applyTokens['or'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    if(bvars.length || qualifiers.length) {
      CToP.transforms.iteration('\u22c1','=')(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,4);
    } else {
      CToP.transforms.infix('\u2228',2)(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
    }
  }
  CToP.applyTokens['xor'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    if(bvars.length || qualifiers.length) {
      CToP.transforms.iteration('xor','=')(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,4);
    } else {
      CToP.transforms.infix('xor',2)(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
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
      parentNode.appendChild(CToP.createmfenced(args,'\u27e8','\u27e9'));
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
      argrow.appendChild(CToP.createmfenced(args,'(',')'));
    } else {
      CToP.applyTransform(argrow,args[0],0);
    }
    if(degree) {
      var msup = CToP.createElement('msup');
      msup.appendChild(argrow);
      var children = CToP.getChildren(degree);
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
      var children = CToP.getChildren(momentabout);
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
    mrow.appendChild(CToP.createmfenced(args,'(',')'));
    parentNode.appendChild(mrow);
  }
  CToP.applyTokens['grad'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mrow = CToP.createElement('mrow');
    CToP.appendToken(mrow,'mo','\u2207');
    CToP.appendToken(mrow,'mo','\u2061');
    mrow.appendChild(CToP.createmfenced(args,'(',')'));
    parentNode.appendChild(mrow);
  };
  CToP.applyTokens['laplacian'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mrow = CToP.createElement('mrow');
    var msup = CToP.createElement('msup');
    CToP.appendToken(msup,'mo','\u2207');
    CToP.appendToken(msup,'mn','2');
    mrow.appendChild(msup);
    CToP.appendToken(mrow,'mo','\u2061');
    mrow.appendChild(CToP.createmfenced(args,'(',')'));
    parentNode.appendChild(mrow);
  };
  CToP.applyTokens['curl'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var mrow = CToP.createElement('mrow');
    CToP.appendToken(mrow,'mo','\u2207');
    CToP.appendToken(mrow,'mo','\u00d7');
    var needsBrackets = args[0].localName == 'apply';
    if(needsBrackets) {
      mrow.appendChild(CToP.createmfenced(args,'(', ')'));
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
      mrow.appendChild(CToP.createmfenced(args,'(', ')'));
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
    CToP.transforms.binary(name,2)(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence);
  }
  CToP.applyTokens['minus'] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence) {
    var tokenPrecedence = args.length==1 ? 5 : 2;

    var mrow = CToP.createElement('mrow');
    var needsBrackets = tokenPrecedence<precedence;
    if(needsBrackets) {
      CToP.appendToken(mrow,'mo','(');
    }

    if(args.length==1) {
      CToP.appendToken(mrow,'mo','-');
      CToP.applyTransform(mrow,args[0],tokenPrecedence);
    } else {
      CToP.applyTransform(mrow,args[0],tokenPrecedence);
      CToP.appendToken(mrow,'mo','-');
      var bracketArg;
      if(args[1].localName=='apply') {
        var argOp = CToP.getChildren(args[1])[0];
        bracketArg = argOp.localName=='plus' || argOp.localName=='minus';
      }
      if(bracketArg) {
        CToP.appendToken(mrow,'mo','(');
      }
      CToP.applyTransform(mrow,args[1],tokenPrecedence);
      if(bracketArg) {
        CToP.appendToken(mrow,'mo',')');
      }
    }

    if(needsBrackets) {
      CToP.appendToken(mrow,'mo',')');
    }
    parentNode.appendChild(mrow);
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
      var children = CToP.getChildren(arg);
      if(j>0) {
        var n;
        if(CToP.settings.collapsePlusMinus) {
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
      CToP.applyTransform(msub,CToP.getChildren(qualifiers[0])[0],0);
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
        var children = CToP.getChildren(qualifiers[i]);
        for(var j=0;j<children.length;j++){
          CToP.applyTransform(mrow1,children[j],0);
        }
      } else {
        var children = CToP.getChildren(qualifiers[i]);
        if (qualifiers[i].localName=='interval' && children.length==2) {
          CToP.applyTransform(mrow1,children[0],0);
        }
      }
    }
    msubsup.appendChild(mrow1);
    var mrow2 = CToP.createElement('mrow');
    for(var i=0; i<qualifiers.length;i++){
      if(qualifiers[i].localName=='uplimit'){
        var children = CToP.getChildren(qualifiers[i]);
        for(j=0;j<children.length;j++){
          CToP.applyTransform(mrow2,children[j],0);
        }
        break;
      } else if(qualifiers[i].localName=='interval' ){
        var children = CToP.getChildren(qualifiers[i]);
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
      var children = CToP.getChildren(bvar);
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
    if(bvars.length){	// d/dx form
      var outNode;
      var mfrac = CToP.createElement('mfrac');
      var toprow = CToP.createElement('mrow');
      var bottomrow = CToP.createElement('mrow');
      mfrac.appendChild(toprow);
      mfrac.appendChild(bottomrow);

      var bvar;
      var degreeNode;

      var d = CToP.createElement('mi');
      d.textContent = 'd';

      var children = CToP.getChildren(bvars[0]);
      for(var j=0;j<children.length;j++){
        if(children[j].localName=='degree'){
          var childNode = CToP.getChildren(children[j])[0];
          if(childNode.textContent!='1'){
            degreeNode = childNode;
            var msup = CToP.createElement('msup');
            msup.appendChild(d);
            d = msup;
            CToP.applyTransform(d,degreeNode,0);
          }
        } else {
          bvar = children[j];
        }
      }
      toprow.appendChild(d);

      if(args.length){
        switch(args[0].localName) {
          case 'apply':
          case 'bind':
          case 'reln':
            var mrow = CToP.createElement('mrow');
            mrow.appendChild(mfrac);
            CToP.applyTransform(mrow,args[0],3);
            outNode = mrow;
            break;
          default:
            CToP.applyTransform(toprow,args[0],0);
            outNode = mfrac;
        }
      }

      CToP.appendToken(bottomrow,'mi','d');

      if(degreeNode){
        var msup2 = CToP.createElement('msup');
        CToP.applyTransform(msup2,bvar,0);
        CToP.applyTransform(msup2,degreeNode,0);
        bottomrow.appendChild(msup2);
      } else {
        CToP.applyTransform(bottomrow,bvar,0);
      }


      parentNode.appendChild(outNode);
    } else {	// f' form
      var msup = CToP.createElement('msup');
      var mrow = CToP.createElement('mrow');
      msup.appendChild(mrow);
      CToP.applyTransform(mrow,args[0],0); 
      CToP.appendToken(m,'mo','\u2032'); // tick
      parentNode.appendChild(msup);
    }
  }

  CToP.applyTokens["partialdiff"] = function(parentNode,contentMMLNode,firstArg,args,bvars,qualifiers,precedence)  {
    var m, mi, msup, mrow, mo, z;

    var mfrac = CToP.createElement('mfrac');
    var toprow = CToP.createElement('mrow');
    var bottomrow = CToP.createElement('mrow');
    mfrac.appendChild(toprow);
    mfrac.appendChild(bottomrow);

    var degreeNode, differendNode;

    if(bvars.length==0 && args.length==2 && args[0].localName=='list'){
      if(args[1].localName=='lambda') {	// `d^(n+m)/(dx^n dy^m) f` form, through a lambda
        var degree = CToP.getChildren(args[0]).length;
        if(degree!=1) {
          msup = CToP.createElement('msup');
          CToP.appendToken(msup,'mo','\u2202');	// curly d
          CToP.appendToken(msup,'mn',degree);
          toprow.appendChild(msup);
        } else {
          CToP.appendToken(toprow,'mo','\u2202');
        }

        var children = CToP.getChildren(args[1]);

        differendNode = children[children.length - 1];	// thing being differentiated

        var bvarNames = [];
        var lambdaChildren = CToP.getChildren(args[1]);	// names of bound variables
        var lambdaSequence = CToP.getChildren(args[0]);	// indices of bound variable names, in order
        for(var i=0;i<lambdaChildren.length;i++){
          if(lambdaChildren[i].localName=='bvar'){
            bvarNames.push(CToP.getChildren(lambdaChildren[i])[0]);
          }
        }

        var lastN = null, degree = 0;
        function addDiff(n,degree) {
          CToP.appendToken(bottomrow,'mo','\u2202');
          var bvar = bvarNames[n];
          if(degree>1) {
            var msup = CToP.createElement('msup');
            CToP.applyTransform(msup,bvar,0);
            CToP.appendToken(msup,'mn',degree);
            bottomrow.appendChild(msup);
          } else {
            CToP.applyTransform(bottomrow,bvar,0);
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
      } else {	// `D_i_j f` form
        var mrow = CToP.createElement('mrow');
        var msub = CToP.createElement('msub');
        CToP.appendToken(msub,'mi','D');
        var bvar = CToP.getChildren(args[0]);
        msub.appendChild(CToP.createmfenced(bvar,'',''));
        mrow.appendChild(msub);
        CToP.applyTransform(mrow,args[1],0);
        parentNode.appendChild(mrow);
        return;
      }
    } else {	// `d^(n+m)/(dx^n dy^m) f` form, with bvars
      var msup = CToP.createElement('msup');
      toprow.appendChild(msup);
      CToP.appendToken(msup,'mo','\u2202');

      var degreeRow = CToP.createElement('mrow');
      msup.appendChild(degreeRow);

      var qualifier;

      if(qualifiers.length && qualifiers[0].localName=='degree' && CToP.getChildren(qualifiers[0]).length){
        qualifier = CToP.getChildren(qualifiers[0])[0];
        CToP.applyTransform(degreeRow,qualifier,0);
      } else {
        var degree = 0;
        var hadFirst = false;
        for(var i=0;i<bvars.length;i++){
          var children = CToP.getChildren(bvars[i]);
          if(children.length==2){
            for(j=0;j<2;j++){
              if(children[j].localName=='degree') {
                if(/^\s*\d+\s*$/.test(children[j].textContent)){
                  degree += Number(children[j].textContent);
                } else {
                  if(hadFirst){
                    CToP.appendToken(degreeRow,'mo','+');
                  }
                  hadFirst = true;
                  CToP.applyTransform(degreeRow,CToP.getChildren(children[j])[0],0);
                }
              }
            }
          } else {
            degree++;
          }
        }
        if(degree>0){
          if(hadFirst){
            CToP.appendToken(degreeRow,'mo','+');
          }   
          CToP.appendToken(degreeRow,'mn',degree);
        }
      }

      if(args.length){
        differendNode = args[0];
      }

      for(var i=0;i<bvars.length;i++){
        CToP.appendToken(bottomrow,'mo','\u2202');
        var children = CToP.getChildren(bvars[i]);

        if(children.length==2){
          for(j=0;j<2;j++){
            if(children[j].localName=='degree'){
                var msup2 = CToP.createElement('msup');
                CToP.applyTransform(msup2,children[1-j],0);
                var bvarDegreeNode = CToP.getChildren(children[j])[0];
                CToP.applyTransform(msup2,bvarDegreeNode,0);
                bottomrow.appendChild(msup2);
            }
          }
        } else if(children.length==1) {
            CToP.applyTransform(bottomrow,children[0],0);
        }
      }
    }
    if(differendNode) {
      switch(differendNode.localName) {
        case 'apply':
        case 'bind':
        case 'reln':
          var mrow = CToP.createElement('mrow');
          mrow.appendChild(mfrac);
          CToP.applyTransform(mrow,differendNode,3);
          outNode = mrow;
          break;
        default:
          CToP.applyTransform(toprow,differendNode,0);
          outNode = mfrac;
      }
    } else {
      outNode = mfrac;
    }
    parentNode.appendChild(outNode);
  }

  return CToP;
})(MathJax.Hub);


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
