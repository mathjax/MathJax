/*
 *  ../SourceForge/trunk/mathjax/extensions/TeX/newcommand.js
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

MathJax.Unpack([
  ['MathJax.Hub.','Register.StartupHook("TeX Jax Ready",function(){var b=MathJax.InputJax.TeX;var a=b.Definitions;',0,'Insert(a,{macros:{','newcommand',':"','NewCommand','",renewcommand:"',6,'",newenvironment:"','NewEnvironment','",def:"MacroDef"}});b.Parse.Augment({',6,':function(','c){','var d=this.','trimSpaces(','this.GetArgument','(c)),f','=this.trimSpaces(this.GetBrackets(','c)),e=',17,'(c);if(f===""){f=null}if(d.charAt(0)==="\\\\"){d=d.substr(1)}if(!d.match(/^(.|[a-z]+)$/i)){','b.Error("Illegal ','control sequence',' name for "+c)}if(f!=null&&!f','.match(/^[0-9]+$/)){b.Error("Illegal number of parameters specified in "+','c)}','a.macros[d]=["Macro",e,f',']},',10,13,'d){var e=this.trimSpaces(',17,'(d)),g',19,'d)),f=',17,'(d),c=',17,'(d);if(g===""){g=null}if(g!=null&&!g',26,'d)}','a.environment[','e',']=["BeginEnv","EndEnv','",f,c,g]},MacroDef',13,'c){',15,'GetCSname','(c),f=this.','GetTemplate','(c,"\\\\"+d),e=',17,'(c);if(!(f instanceof Array)){',28,']}else{a.macros[d]=["','MacroWithTemplate','",e,f[0],f[1]]}},',50,13,'e){var f=','this.GetNext();','if(f!=="\\\\"){b.Error("\\\\ must be followed by a ',24,'")}',15,'trimSpaces(',17,'(e));return d.substr(1)},',52,13,'f,e){var j,g=[],h=0;j=',63,15,'i',';while(this.i<this.string.length){','j=',63,'if(j==="#"){','if(d!==this.i){g[h]=this.string.substr(d,this.i-d)}','j=','this.string.','charAt(++this.i);if(!j.match(/^[1-9]$/)){',23,'use of # in template for "+e)}if(parseInt(j)!=++h){b.Error("Parameters for "+e+" must be numbered sequentially")}d=this.i+1}else{if(j==="{"){',81,'if(g.length>0){return[h,g]}else{return h}}}this.i++}b.Error("Missing replacement string for definition of "+f)},',58,13,'d,g,h,f){if(h){var c=[];',63,'if(f[0]&&!this.','MatchParam','(f[0])){b.Error("Use of "+d+" doesn\'t match its definition")}','for(var e=0;e<','h;e++){c.push(this.','GetParameter','(d,f[e+1]))}g','=this.SubstituteArgs(','c,g)}','this.string=this.AddArgs(','g',',this.string.slice(this.i));this.i=0','},BeginEnv',13,'f,h,c,g){if(g){var d=[];',96,'g;e++){d.push(',17,'("\\\\begin{"+name+"}"))}h',100,'d,h);c',100,'d,c)}f.edef=c;',102,'h',104,';return ','f},EndEnv',13,'c,d){',102,'c.edef',104,119,'d},',98,13,'d,g){if(g==null){return ',17,'(d)}var f=this.i,c=0,e=0',77,'if(',83,'charAt(this.i)==="{"){if(this.i===f){e=1}',17,'(d);c=this.i-f}else{if(this.',94,'(g)){if(e){f++;c-=2}return ',83,'substr(f,c)}else{this.i++;c++;e=0}}}b.Error("Runaway argument for "+d+"?")},',94,13,'c){if(',83,'substr(this.i,c.length)!==c){return 0}this.i+=c.length',119,'1}});b.Environment=function(c){',43,'c',45,'"].concat([].slice.call(arguments,1))};',0,'Startup.signal.Post("TeX ',4,' Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/',4,'.js");']
]);

