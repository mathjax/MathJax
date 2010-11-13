/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/autoload/maction.js
 *  
 *  Implements the HTML-CSS output for <maction> elements.
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2010 Design Science, Inc.
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

(function (MML,HTMLCSS) {
  var VERSION = "1.0";
  
  var currentTip, hover, clear;

  //
  //  Add configuration for tooltips
  //
  var CONFIG = HTMLCSS.config.tooltip = MathJax.Hub.Insert({
    delayPost: 600, delayClear: 600,
    offsetX: 10, offsetY: 5
  },HTMLCSS.config.tooltip||{});
  
  
  MML.maction.Augment({
    HTMLtooltip: HTMLCSS.addElement(document.body,"div",{id:"MathJax_Tooltip"}),
    
    toHTML: function (span) {
      span = this.HTMLhandleSize(this.HTMLcreateSpan(span)); span.bbox = null;
      var values = this.getValues("actiontype","selection"), frame;
      if (this.data[values.selection-1]) {
        HTMLCSS.Measured(this.data[values.selection-1].toHTML(span),span);
        if (HTMLCSS.msieHitBoxBug) {
          // margin-left doesn't work on inline-block elements in IE, so put it in a SPAN
          var box = HTMLCSS.addElement(span,"span");
          frame = HTMLCSS.createFrame(box,span.bbox.h,span.bbox.d,span.bbox.w,0,"none");
          span.insertBefore(box,span.firstChild); // move below the content
          box.style.marginRight = HTMLCSS.Em(-span.bbox.w);
          if (HTMLCSS.msieInlineBlockAlignBug)
            {frame.style.verticalAlign = HTMLCSS.Em(HTMLCSS.getHD(span).d-span.bbox.d)}
        } else {
          frame = HTMLCSS.createFrame(span,span.bbox.h,span.bbox.d,span.bbox.w,0,"none");
          span.insertBefore(frame,span.firstChild); // move below the content
          frame.style.marginRight = HTMLCSS.Em(-span.bbox.w);
        }
        frame.className = "MathJax_HitBox";
        frame.id = "MathJax-HitBox-"+this.spanID;
      
        if (this.HTMLaction[values.actiontype])
          {this.HTMLaction[values.actiontype].call(this,span,frame,values.selection)}
      }
      this.HTMLhandleSpace(span);
      this.HTMLhandleColor(span);
      return span;
    },
    
    //
    //  Implementations for the various actions
    //
    HTMLaction: {
      toggle: function (span,frame,selection) {
        this.selection = selection;
        frame.onclick = span.childNodes[1].onclick = MathJax.Callback(["HTMLclick",this]);
        frame.style.cursor = span.childNodes[1].style.cursor="pointer";
      },
      
      statusline: function (span,frame,selection) {
        frame.onmouseover = span.childNodes[1].onmouseover = MathJax.Callback(["HTMLsetStatus",this]);
        frame.onmouseout  = span.childNodes[1].onmouseout  = MathJax.Callback(["HTMLclearStatus",this]);
        frame.onmouseover.autoReset = frame.onmouseout.autoReset = true;
      },
      
      tooltip: function(span,frame,selection) {
        if (this.data[1] && this.data[1].isToken) {
          frame.title = frame.alt = span.childNodes[1].title =
            span.childNodes[1].alt = this.data[1].data.join("");
        } else {
          frame.onmouseover = span.childNodes[1].onmouseover = MathJax.Callback(["HTMLtooltipOver",this]);
          frame.onmouseout  = span.childNodes[1].onmouseout  = MathJax.Callback(["HTMLtooltipOut",this]);
          frame.onmouseover.autoReset = frame.onmouseout.autoReset = true;
        }
      }
    },
    
    //
    //  Handle a click on the maction element
    //    (remove the original rendering and rerender)
    //
    HTMLclick: function (event) {
      this.selection++;
      if (this.selection > this.data.length) {this.selection = 1}
      var obj = this; while (obj.type !== "math") {obj = obj.inherit}
      var nobr = obj.HTMLspanElement();
      while (nobr.nodeName.toLowerCase() !== "nobr") {nobr = nobr.parentNode}
      var span = nobr.parentNode; span.removeChild(nobr);
      var div = span; if (span.parentNode.className === "MathJax_Display") {div = span.parentNode}
      obj.toHTML(span,div);
      if (!event) {event = window.event}
      if (event.preventDefault) {event.preventDefault()}
      if (event.stopPropagation) {event.stopPropagation()}
      event.cancelBubble = true;
      event.returnValue = false;
      return false;
    },
    
    //
    //  Set/Clear the window status message
    //
    HTMLsetStatus: function (event) {
      // FIXME:  Do something better with non-token elements
      window.status =
        ((this.data[1] && this.data[1].isToken) ?
             this.data[1].data.join("") : this.data[1].toString());
    },
    HTMLclearStatus: function (event) {window.status = ""},
    
    //
    //  Handle tooltips
    //
    HTMLtooltipOver: function (event) {
      if (!event) {event = window.event}
      if (clear) {clearTimeout(clear); clear = null}
      if (hover) {clearTimeout(hover)}
      var x = event.clientX; var y = event.clientY;
      var callback = MathJax.Callback(["HTMLtooltipPost",this,x+CONFIG.offsetX,y+CONFIG.offsetY])
      hover = setTimeout(callback,CONFIG.delayPost);
    },
    HTMLtooltipOut: function (event) {
      if (hover) {clearTimeout(hover); hover = null}
      if (clear) {clearTimeout(clear)}
      var callback = MathJax.Callback(["HTMLtooltipClear",this,80]);
      clear = setTimeout(callback,CONFIG.delayClear);
    },
    HTMLtooltipPost: function (x,y) {
      hover = null; if (clear) {clearTimeout(clear); clear = null}
      var tip = this.HTMLtooltip;
      tip.style.display = "block"; tip.style.opacity = "";
      tip.style.filter = HTMLCSS.config.styles["#MathJax_Tooltip"].filter;
      if (this === currentTip) return;
      tip.style.left = x+"px"; tip.style.top = y+"px";
      tip.innerHTML = '<span class="MathJax"><nobr></nobr></span>';
      HTMLCSS.getScales(tip.firstChild,tip.firstChild);
      var stack = HTMLCSS.createStack(tip.firstChild.firstChild);
      var box = HTMLCSS.createBox(stack);
      try {HTMLCSS.Measured(this.data[1].toHTML(box),box)} catch(err) {
        if (!err.restart) {throw err}
        tip.style.display = "none";
        MathJax.Callback.After(["HTMLtooltipPost",this,x,y],err.restart);
      }
      HTMLCSS.placeBox(box,0,0);
      HTMLCSS.createRule(tip.firstChild.firstChild,box.bbox.h,box.bbox.d,0);
      currentTip = this;
    },
    HTMLtooltipClear: function (n) {
      var tip = this.HTMLtooltip;
      if (n <= 0) {
        tip.style.display = "none";
        tip.style.opacity = tip.style.filter = "";
        clear = null;
      } else {
        tip.style.opacity = n/100;
        tip.style.filter = "alpha(opacity="+n+")";
        clear = setTimeout(MathJax.Callback(["HTMLtooltipClear",this,n-20]),50);
      }
    }
  });

  //
  //  Do browser-specific setup
  //
  MathJax.Hub.Browser.Select({
    MSIE: function (browser) {
      HTMLCSS.msieHitBoxBug = true;
    }
  });


  MathJax.Hub.Startup.signal.Post("HTML-CSS maction Ready");
  MathJax.Ajax.loadComplete(HTMLCSS.autoloadDir+"/maction.js");
  
})(MathJax.ElementJax.mml,MathJax.OutputJax["HTML-CSS"]);

