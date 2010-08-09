/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/autoload/menclose.js
 *  
 *  Implements the HTML-CSS output for <mencode> elements.
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
  
  var SVGNS = "http://www.w3.org/2000/svg";
  var VMLNS = "urn:schemas-microsoft-com:vml";
  var vmlns = "mjxvml";

  MML.menclose.Augment({
    toHTML: function (span) {
      var values = this.getValues("notation","thickness","padding","mathcolor","color");
      if (values.color && !this.mathcolor) {values.mathcolor = values.color}
      if (values.thickness == null) {values.thickness = ".075em"}
      if (values.padding == null)   {values.padding   = ".2em"}
      var p = HTMLCSS.length2em(values.padding);
      var t = HTMLCSS.length2em(values.thickness);
      var SOLID = HTMLCSS.Em(t)+" solid";

      span = this.HTMLcreateSpan(span);
      var stack = HTMLCSS.createStack(span);
      var base = HTMLCSS.createBox(stack);
      this.HTMLmeasureChild(0,base);
      var H = base.bbox.h+p+t, D = base.bbox.d+p+t, W = base.bbox.w+2*(p+t);
      var frame = HTMLCSS.createFrame(stack,H+D,0,W,t,"none");
      frame.id = "MathJax-frame-"+this.spanID;
      HTMLCSS.addBox(stack,frame); stack.insertBefore(frame,base); // move base to above background
      var notation = values.notation.split(/ /);
      var T = 0, B = 0, R = 0, L = 0, dx = 0, dy = 0; var svg, vml;
      if (!values.mathcolor) {values.mathcolor = "black"} else {span.style.color = values.mathcolor}
      
      for (var i = 0, m = notation.length; i < m; i++) {
        switch (notation[i]) {
         case MML.NOTATION.BOX:
           frame.style.border = SOLID; if (!HTMLCSS.msieBorderWidthBug) {T = B = L = R = t}
           break;

          case MML.NOTATION.ROUNDEDBOX:
            if (HTMLCSS.useVML) {
              if (!vml) {vml = this.HTMLvml(stack,H,D,W,t,values.mathcolor)}
              this.HTMLvmlElement(vml,"roundrect",{
                style: {width:this.HTMLpx(W-2*t),height:this.HTMLpx(H+D-2*t),
                        left:this.HTMLpx(t)+.5,top:this.HTMLpx(t)+.5},
                arcsize: ".25"
              });
            } else {
              if (!svg) {svg = this.HTMLsvg(stack,H,D,W,t,values.mathcolor)}
              this.HTMLsvgElement(svg.firstChild,"rect",{
                x:1, y:1, width:this.HTMLpx(W-t)-1,
                height:this.HTMLpx(H+D-t)-1, rx:this.HTMLpx(Math.min(H+D,W)/4)
              });
            }
            break;
            
          case MML.NOTATION.CIRCLE:
            if (HTMLCSS.useVML) {
              if (!vml) {vml = this.HTMLvml(stack,H,D,W,t,values.mathcolor)}
              this.HTMLvmlElement(vml,"oval",{
                style: {width:this.HTMLpx(W-2*t),height:this.HTMLpx(H+D-2*t),
                        left:this.HTMLpx(t)+.5,top:this.HTMLpx(t)+.5}
              });
            } else {
              if (!svg) {svg = this.HTMLsvg(stack,H,D,W,t,values.mathcolor)}
              this.HTMLsvgElement(svg.firstChild,"ellipse",{
                rx:this.HTMLpx(W/2-t), ry:this.HTMLpx((H+D)/2-t),
                cx:this.HTMLpx(W/2), cy:this.HTMLpx((H+D)/2)
              });
            }
            break;

          case MML.NOTATION.LEFT:
            frame.style.borderLeft = SOLID; if (!HTMLCSS.msieBorderWidthBug) {L = t}
            break;
            
          case MML.NOTATION.ACTUARIAL:
            frame.style.borderTop = SOLID; if (!HTMLCSS.msieBorderWidthBug) {T = t; frame.bbox.w += p-t}
          case MML.NOTATION.RIGHT:
            frame.style.borderRight = SOLID; if (!HTMLCSS.msieBorderWidthBug) {R = t}
            break;

          case MML.NOTATION.VERTICALSTRIKE:
            var vline = HTMLCSS.createRule(stack,H+D-t/2,0,t);
            HTMLCSS.addBox(stack,vline); HTMLCSS.placeBox(vline,p+t+base.bbox.w/2,-D,true);
            break;
            
          case MML.NOTATION.TOP:
            frame.style.borderTop = SOLID; if (!HTMLCSS.msieBorderWidthBug) {T = t}
            break;
            
          case MML.NOTATION.BOTTOM:
            frame.style.borderBottom = SOLID; if (!HTMLCSS.msieBorderWidthBug) {B = t}
            break;
            
          case MML.NOTATION.HORIZONTALSTRIKE:
            var hline = HTMLCSS.createRule(stack,t,0,W-t/2);
            HTMLCSS.addBox(stack,hline); HTMLCSS.placeBox(hline,0,(H+D)/2-D,true);
            break;

          case MML.NOTATION.UPDIAGONALSTRIKE:
            if (HTMLCSS.useVML) {
              if (!vml) {vml = this.HTMLvml(stack,H,D,W,t,values.mathcolor)}
              this.HTMLvmlElement(vml,"line",{from: "0,"+this.HTMLpx(H+D-t), to: this.HTMLpx(W)+",0"});
            } else {
              if (!svg) {svg = this.HTMLsvg(stack,H,D,W,t,values.mathcolor)}
              this.HTMLsvgElement(svg.firstChild,"line",{
                x1:1, y1:this.HTMLpx(H+D-t), x2:this.HTMLpx(W-t), y2:this.HTMLpx(t)
              });
            }
            break;

          case MML.NOTATION.DOWNDIAGONALSTRIKE:
            if (HTMLCSS.useVML) {
              if (!vml) {vml = this.HTMLvml(stack,H,D,W,t,values.mathcolor)}
              this.HTMLvmlElement(vml,"line",{from: "0,0", to: this.HTMLpx(W)+","+this.HTMLpx(H+D-t)});
            } else {
              if (!svg) {svg = this.HTMLsvg(stack,H,D,W,t,values.mathcolor)}
              this.HTMLsvgElement(svg.firstChild,"line",{
                x1:1, y1:this.HTMLpx(t), x2:this.HTMLpx(W-t), y2:this.HTMLpx(H+D-t)
              });
            }
            break;

          case MML.NOTATION.MADRUWB:
            frame.style.borderBottom = SOLID;
            frame.style.borderRight = SOLID; if (!HTMLCSS.msieBorderWidthBug) {B = R = t}
            break;

          case MML.NOTATION.RADICAL:
            if (HTMLCSS.useVML) {
              if (!vml) {vml = this.HTMLvml(stack,H,D,W,t,values.mathcolor)}
              this.HTMLvmlElement(vml,"polyline",{
                points: this.HTMLpx(t/2)+","+this.HTMLpx(.6*(H+D))+" "+this.HTMLpx(p)+","+this.HTMLpx(H+D-t)+
                  " "+this.HTMLpx(2*p)+","+this.HTMLpx(t/2)+" "+this.HTMLpx(W)+","+this.HTMLpx(t/2)
              });
              dx = p;
            } else {
              if (!svg) {svg = this.HTMLsvg(stack,H,D,W,t,values.mathcolor)}
              this.HTMLsvgElement(svg.firstChild,"path",{
                d: "M 1,"+this.HTMLpx(.6*(H+D)) +
                  " L "+this.HTMLpx(p)+","+this.HTMLpx(H+D) +
                  " L "+this.HTMLpx(2*p)+",1 L "+this.HTMLpx(W)+",1"
              });
              HTMLCSS.placeBox(svg.parentNode,0,p/2-D,true);
              dx = p; dy = t;
            }
            break;
            
          case MML.NOTATION.LONGDIV:
            if (HTMLCSS.useVML) {
              if (!vml) {vml = this.HTMLvml(stack,H,D,W,t,values.mathcolor)}
              this.HTMLvmlElement(vml,"line",{from: "0,"+this.HTMLpx(t/2), to: this.HTMLpx(W-t)+","+this.HTMLpx(t/2)});
              this.HTMLvmlElement(vml,"arc",{
                style: {width:this.HTMLpx(2*p),height:this.HTMLpx(H+D-2*t),
                        left:this.HTMLpx(-p),top:this.HTMLpx(t)},
                startangle:"10", endangle:"170"
              });
              dx = p;
            } else {
              if (!svg) {svg = this.HTMLsvg(stack,H,D,W,t,values.mathcolor)}
              this.HTMLsvgElement(svg.firstChild,"path",{
                d: "M "+this.HTMLpx(W)+",1 L 1,1 "+
                   "a"+this.HTMLpx(p)+","+this.HTMLpx((H+D)/2-t)+" 0 0,1 1,"+this.HTMLpx(H+D-2*t)
              });
              HTMLCSS.placeBox(svg.parentNode,0,t-D,true);
              dx = p; dy = t;
            }
            break;
        }
      }
      frame.style.width = HTMLCSS.Em(W-L-R); frame.style.height = HTMLCSS.Em(H+D-T-B);
      HTMLCSS.placeBox(frame,0,dy-D,true);
      HTMLCSS.placeBox(base,dx+p+t,0);
      this.HTMLhandleSpace(span);
      this.HTMLhandleColor(span);
      return span;
    },
    
    HTMLpx: function (n) {return (n*HTMLCSS.em)},
    
    HTMLhandleColor: function (span) {
      var frame = document.getElementById("MathJax-frame-"+this.spanID);
      if (frame) {
        // mathcolor is handled in toHTML above
        var values = this.getValues("mathbackground","background");
        if (this.style && span.style.backgroundColor) {values.mathbackground = span.style.backgroundColor}
        if (values.background && !this.mathbackground) {values.mathbackground = values.background}
        if (values.mathbackground && values.mathbackground !== MML.COLOR.TRANSPARENT)
          {frame.style.backgroundColor = values.mathbackground}
      } else {this.SUPER(arguments).HTMLhandleColor.call(this,span)}
    },
    
    HTMLsvg: function (stack,H,D,W,t,color) {
      var svg = document.createElementNS(SVGNS,"svg");
      if (svg.style) {svg.style.width = HTMLCSS.Em(W); svg.style.height = HTMLCSS.Em(H+D)}
      var scale = HTMLCSS.createBox(stack); scale.appendChild(svg);
      HTMLCSS.placeBox(scale,0,-D,true);
      this.HTMLsvgElement(svg,"g",{fill:"none", stroke:color, "stroke-width":t*HTMLCSS.em});
      return svg;
    },
    HTMLsvgElement: function (svg,type,def) {
      var obj = document.createElementNS(SVGNS,type);
      if (def) {for (var id in def) {if (def.hasOwnProperty(id)) {obj.setAttributeNS(null,id,def[id].toString())}}}
      svg.appendChild(obj);
      return obj;
    },
    HTMLvml: function (stack,H,D,W,t,color) {
      var vml = HTMLCSS.createFrame(stack,H+D,0,W,0,"none");
      HTMLCSS.addBox(stack,vml); HTMLCSS.placeBox(vml,0,-D,true);
      this.constructor.VMLcolor = color; this.constructor.VMLthickness = this.HTMLpx(t);
      return vml;
    },
    HTMLvmlElement: function (vml,type,def) {
      var obj = HTMLCSS.addElement(vml,vmlns+":"+type,def);
      if (!def.fillcolor) {obj.fillcolor = "none"}
      if (!def.strokecolor) {obj.strokecolor = this.constructor.VMLcolor}
      if (!def.strokeweight) {obj.strokeweight =this.constructor.VMLthickness}
    }
  });
  
  MathJax.Hub.Browser.Select({
    MSIE: function (browser) {
      HTMLCSS.useVML = true;
      if (!document.namespaces[vmlns]) {
        document.namespaces.add(vmlns,VMLNS);
        var sheet = document.createStyleSheet();
        sheet.addRule(vmlns+"\\:*","{behavior: url(#default#VML); position:absolute; top:0; left:0}");
      }
    }
  });

  
  MathJax.Hub.Startup.signal.Post("HTML-CSS menclose Ready");
  MathJax.Ajax.loadComplete(HTMLCSS.autoloadDir+"/menclose.js");
  
})(MathJax.ElementJax.mml,MathJax.OutputJax["HTML-CSS"]);

