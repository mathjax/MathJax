/*************************************************************
 *
 *  MathJax/extensions/MathML/mml3.js
 *
 *  This file implements an XSLT transform to convert some MathML 3 
 *  constructs to constructs MathJax can render. The transform is
 *  performed in a pre-filter for the MathML input jax, so that the
 *  Show Math As menu will still show the Original MathML correctly,
 *  but the transformed MathML can be obtained from the regular MathML menu.
 *  
 *  To load it, include
 *  
 *      MathML: {
 *        extensions: ["mml3.js"]
 *      }
 *  
 *  in your configuration.
 *
 *  A portion of this file is taken from ctop.xsl which is
 *  Copyright (c) David Carlisle 2001, 2002, 2008, 2009, 2013, 2014
 *  and is used by permission of David Carlisle, who has agreed to allow us
 *  to release it under the Apache2 license (see below).  That portion is
 *  indicated via comments.
 *  
 *  The remainder falls under the copyright that follows.
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2013-2014 The MathJax Consortium
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


MathJax.Extension["MathML/mml3"] = {
  version: "2.4.0"
};

MathJax.Hub.Register.StartupHook("MathML Jax Ready",function () {

  var MATHML = MathJax.InputJax.MathML,
      PARSE = MATHML.Parse.prototype;

  MATHML.prefilterHooks.Add(function (data) {
    if (!MATHML.ctopXSLT) return;

    // Parse the <math> but use MATHML.Parse's preProcessMath to apply the normal preprocessing.
    if (!MATHML.ParseXML) {MATHML.ParseXML = MATHML.createParser()}
    var doc = MATHML.ParseXML(PARSE.preProcessMath(data.math));

    // Now transform the <math> using the ctop stylesheet.
    var newdoc = MATHML.ctopXSLT.transformToDocument(doc);

    if ((typeof newdoc) === "string") {
      // Internet Explorer returns a string, so just use it.
      data.math = newdoc;
    } else if (window.XMLSerializer) {
      // Serialize the <math> again. We could directly provide the DOM content
      // but other prefilterHooks may assume data.math is still a string.
      var serializer = new XMLSerializer();
      data.math = serializer.serializeToString(newdoc.documentElement, doc);
    }
  });

  /*
   *  The following is taken from mml3mj.xsl 
   *  (https://web-xslt.googlecode.com/svn/trunk/ctop/)
   *  which is Copyright (c) David Carlisle 2001, 2002, 2008, 2009, 2013, 2014.
   *  It is used by permission of David Carlisle, who has agreed to allow it to
   *  be released under the Apache License, Version 2.0.
   */
  var ctopStylesheet = '<x:stylesheet version="1.0" xmlns:x="http://www.w3.org/1999/XSL/Transform" xmlns:m="http://www.w3.org/1998/Math/MathML" xmlns="http://www.w3.org/1998/Math/MathML" xmlns:c="http://exslt.org/common" exclude-result-prefixes="m c"><x:output indent="yes" omit-xml-declaration="yes"/><x:template match="*"><x:copy><x:copy-of select="@*"/><x:apply-templates/></x:copy></x:template><x:template match="*[@dir=\'rtl\']"  priority="10"><x:apply-templates mode="rtl" select="."/></x:template><x:template match="@*" mode="rtl"><x:copy-of select="."/></x:template><x:template match="*" mode="rtl"><x:copy><x:apply-templates select="@*" mode="rtl"/><x:for-each select="node()"><x:sort data-type="number" order="descending" select="position()"/><x:text></x:text><x:apply-templates mode="rtl" select="."/></x:for-each></x:copy></x:template><x:template match="@open" mode="rtl"><x:attribute name="close"><x:value-of select="."/></x:attribute></x:template><x:template match="@open[.=\'(\']" mode="rtl"><x:attribute name="close">)</x:attribute></x:template><x:template match="@open[.=\')\']" mode="rtl"><x:attribute name="close">(</x:attribute></x:template><x:template match="@open[.=\'[\']" mode="rtl"><x:attribute name="close">]</x:attribute></x:template><x:template match="@open[.=\']\']" mode="rtl"><x:attribute name="close">[</x:attribute></x:template><x:template match="@open[.=\'{\']" mode="rtl"><x:attribute name="close">}</x:attribute></x:template><x:template match="@open[.=\'}\']" mode="rtl"><x:attribute name="close">{</x:attribute></x:template><x:template match="@close" mode="rtl"><x:attribute name="open"><x:value-of select="."/></x:attribute></x:template><x:template match="@close[.=\'(\']" mode="rtl"><x:attribute name="open">)</x:attribute></x:template><x:template match="@close[.=\')\']" mode="rtl"><x:attribute name="open">(</x:attribute></x:template><x:template match="@close[.=\'[\']" mode="rtl"><x:attribute name="open">]</x:attribute></x:template><x:template match="@close[.=\']\']" mode="rtl"><x:attribute name="open">[</x:attribute></x:template><x:template match="@close[.=\'{\']" mode="rtl"><x:attribute name="open">}</x:attribute></x:template><x:template match="@close[.=\'}\']" mode="rtl"><x:attribute name="open">{</x:attribute></x:template><x:template match="m:mfrac[@bevelled=\'true\']" mode="rtl"><m:mrow><m:msub><m:mi></m:mi><x:apply-templates select="*[2]" mode="rtl"/></m:msub><m:mo>&#x5c;</m:mo><m:msup><m:mi></m:mi><x:apply-templates select="*[1]" mode="rtl"/></m:msup></m:mrow></x:template><x:template match="m:mfrac" mode="rtl"><x:copy><x:apply-templates mode="rtl" select="@*|*"/></x:copy></x:template><x:template match="m:mroot" mode="rtl"><m:msup><m:menclose notation="top right"><x:apply-templates mode="rtl" select="@*|*[1]"/></m:menclose><x:apply-templates mode="rtl" select="*[2]"/></m:msup></x:template><x:template match="m:msqrt" mode="rtl"><m:menclose notation="top right"><x:apply-templates mode="rtl" select="@*|*[1]"/></m:menclose></x:template><x:template match="m:mtable|m:munder|m:mover|m:munderover" mode="rtl" priority="2"><x:copy><x:apply-templates select="@*" mode="rtl"/><x:apply-templates mode="rtl"></x:apply-templates></x:copy></x:template><x:template match="m:msup" mode="rtl" priority="2"><m:mmultiscripts><x:apply-templates select="*[1]" mode="rtl"/><m:mprescripts/><m:none/><x:apply-templates select="*[2]" mode="rtl"/></m:mmultiscripts></x:template><x:template match="m:msub" mode="rtl" priority="2"><m:mmultiscripts><x:apply-templates select="*[1]" mode="rtl"/><m:mprescripts/><x:apply-templates select="*[2]" mode="rtl"/><m:none/></m:mmultiscripts></x:template><x:template match="m:msubsup" mode="rtl" priority="2"><m:mmultiscripts><x:apply-templates select="*[1]" mode="rtl"/><m:mprescripts/><x:apply-templates select="*[2]" mode="rtl"/><x:apply-templates select="*[3]" mode="rtl"/></m:mmultiscripts></x:template><x:template match="m:mmultiscripts" mode="rtl" priority="2"><m:mmultiscripts><x:apply-templates select="*[1]" mode="rtl"/><x:for-each  select="m:mprescripts/following-sibling::*[position() mod 2 = 1]"><x:sort data-type="number" order="descending" select="position()"/><x:apply-templates select="."  mode="rtl"/><x:apply-templates select="following-sibling::*[1]"  mode="rtl"/></x:for-each><m:mprescripts/><x:for-each  select="m:mprescripts/preceding-sibling::*[position()!=last()][position() mod 2 = 0]"><x:sort data-type="number" order="descending" select="position()"/><x:apply-templates select="."  mode="rtl"/><x:apply-templates select="following-sibling::*[1]"  mode="rtl"/></x:for-each></m:mmultiscripts></x:template><x:template match="m:mmultiscripts[not(m:mprescripts)]" mode="rtl" priority="3"><m:mmultiscripts><x:apply-templates select="*[1]" mode="rtl"/><m:mprescripts/><x:for-each  select="*[position() mod 2 = 0]"><x:sort data-type="number" order="descending" select="position()"/><x:apply-templates select="."  mode="rtl"/><x:apply-templates select="following-sibling::*[1]"  mode="rtl"/></x:for-each></m:mmultiscripts></x:template><x:template match="text()[.=\'(\']" mode="rtl">)</x:template><x:template match="text()[.=\')\']" mode="rtl">(</x:template><x:template match="text()[.=\'{\']" mode="rtl">}</x:template><x:template match="text()[.=\'}\']" mode="rtl">{</x:template><x:template match="text()[.=\'&lt;\']" mode="rtl">&gt;</x:template><x:template match="text()[.=\'&gt;\']" mode="rtl">&lt;</x:template><x:template match="text()[.=\'&#x2208;\']" mode="rtl">&#x220b;</x:template><x:template match="text()[.=\'&#x220b;\']" mode="rtl">&#x2208;</x:template><x:template match="text()[.=\'&#x2211;\']|text()[.=\'&#x222b;\']" mode="rtl"><svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(-1 0 0 1 0 0 )"><text id="TextElement" x="-20" y="15" ><x:value-of select="."/></text></g></svg></x:template><x:template match="@notation[.=\'radical\']" mode="rtl"><x:attribute name="notation">top right</x:attribute></x:template><x:template name="mml2attrib"><x:copy-of select="@*[not(local-name()=\'href\')]"/><x:attribute name="style"><x:if test="@style"><x:value-of select="@style"/>;</x:if><x:if test="@mathcolor">color:<x:value-of select="@mathcolor"/>;</x:if><x:if test="@mathbackground">background-color:<x:value-of select="@mathbackground"/>;</x:if></x:attribute></x:template><x:template match="*[@mathcolor|@mathbackground]"><x:copy><x:call-template name="mml2attrib"/><x:apply-templates/></x:copy></x:template><x:template match="m:mstack"><x:variable name="m"><m:mtable columnspacing="0em"><x:copy-of select="@align"/><x:variable name="t"><x:apply-templates select="*" mode="mstack1"><x:with-param name="p" select="0"/></x:apply-templates></x:variable><x:variable name="maxl"><x:for-each select="c:node-set($t)/*/@l"><x:sort data-type="number" order="descending"/><x:if test="position()=1"><x:value-of select="."/></x:if></x:for-each></x:variable><x:for-each select="c:node-set($t)/*[not(@class=\'mscarries\') or following-sibling::*[1]/@class=\'mscarries\']"><x:variable name="c" select="preceding-sibling::*[1][@class=\'mscarries\']"/><x:text>&#10;</x:text><m:mtr><x:copy-of select="@class[.=\'msline\']"/><x:variable name="offset" select="$maxl - @l"/><x:choose><x:when test="@class=\'msline\' and @l=\'*\'"><x:variable name="msl" select="*[1]"/><x:for-each select="(//node())[position()&lt;=$maxl]"><x:copy-of select="$msl"/></x:for-each></x:when><x:when test="$c"><x:variable name="ldiff" select="$c/@l - @l"/><x:variable name="loffset" select="$maxl - $c/@l"/><x:for-each select="(//*)[position()&lt;= $offset]"><x:variable name="pn" select="position()"/><x:variable name="cy" select="$c/*[position()=$pn - $loffset]"/><m:mtd><x:if test="$cy/*"/><m:mover><m:mphantom><m:mn>0</m:mn></m:mphantom><m:mpadded width="0em" lspace="-0.5width"><x:copy-of select="$cy/*/*"/></m:mpadded></m:mover></m:mtd></x:for-each><x:for-each select="*"><x:variable name="pn" select="position()"/><x:variable name="cy" select="$c/*[position()=$pn + $ldiff]"/><x:copy><x:copy-of select="@*"/><x:variable name="b"><x:choose><x:when test="not(string($cy/@crossout) or $cy/@crossout=\'none\')"><x:copy-of select="*"/></x:when><x:otherwise><m:menclose notation="{$cy/@crossout}"><x:copy-of select="*"/></m:menclose></x:otherwise></x:choose></x:variable><x:choose><x:when test="$cy/*/m:none or not($cy/*/*)"><x:copy-of select="$b"/></x:when><x:when test="not(string($cy/@location)) or $cy/@location=\'n\'"><m:mover><x:copy-of select="$b"/><m:mpadded width="0em" lspace="-0.5width"><x:copy-of select="$cy/*/*"/></m:mpadded></m:mover></x:when><x:when test="$cy/@location=\'nw\'"><m:mmultiscripts><x:copy-of select="$b"/><m:mprescripts/><m:none/><m:mpadded lspace="-1width" width="0em"><x:copy-of select="$cy/*/*"/></m:mpadded></m:mmultiscripts></x:when><x:when test="$cy/@location=\'s\'"><m:munder><x:copy-of select="$b"/><m:mpadded width="0em" lspace="-0.5width"><x:copy-of select="$cy/*/*"/></m:mpadded></m:munder></x:when><x:when test="$cy/@location=\'sw\'"><m:mmultiscripts><x:copy-of select="$b"/><m:mprescripts/><m:mpadded lspace="-1width" width="0em"><x:copy-of select="$cy/*/*"/></m:mpadded><m:none/></m:mmultiscripts></x:when><x:when test="$cy/@location=\'ne\'"><m:msup><x:copy-of select="$b"/><m:mpadded width="0em"><x:copy-of select="$cy/*/*"/></m:mpadded></m:msup></x:when><x:when test="$cy/@location=\'se\'"><m:msub><x:copy-of select="$b"/><m:mpadded width="0em"><x:copy-of select="$cy/*/*"/></m:mpadded></m:msub></x:when><x:when test="$cy/@location=\'w\'"><m:msup><m:mrow/><m:mpadded lspace="-1width" width="0em"><x:copy-of select="$cy/*/*"/></m:mpadded></m:msup><x:copy-of select="$b"/></x:when><x:when test="$cy/@location=\'e\'"><x:copy-of select="$b"/><m:msup><m:mrow/><m:mpadded width="0em"><x:copy-of select="$cy/*/*"/></m:mpadded></m:msup></x:when><x:otherwise><x:copy-of select="$b"/></x:otherwise></x:choose></x:copy></x:for-each></x:when><x:otherwise><x:for-each select="(//*)[position()&lt;= $offset]"><m:mtd/></x:for-each><x:copy-of select="*"/></x:otherwise></x:choose></m:mtr></x:for-each></m:mtable></x:variable><x:apply-templates mode="ml" select="c:node-set($m)"/></x:template><x:template match="*" mode="ml"><x:copy><x:copy-of select="@*"/><x:apply-templates mode="ml"/></x:copy></x:template><x:template mode="ml" match="m:mtr[following-sibling::*[1][@class=\'msline\']]"><m:mtr><x:copy-of select="@*"/><x:variable name="m" select="following-sibling::*[1]/m:mtd"/><x:for-each select="m:mtd"><x:variable name="p" select="position()"/><m:mtd><x:copy-of select="@*"/><x:choose><x:when test="$m[$p]/m:mpadded"><m:menclose notation="bottom"><m:mpadded depth=".1em" height="1em" width=".4em"><x:copy-of select="*"/></m:mpadded></m:menclose></x:when><x:otherwise><x:copy-of select="*"/></x:otherwise></x:choose></m:mtd></x:for-each></m:mtr></x:template><x:template mode="ml" match="m:mtr[not(preceding-sibling::*)][@class=\'msline\']" priority="3"><m:mtr><x:copy-of select="@*"/><x:for-each select="m:mtd"><m:mtd><x:copy-of select="@*"/><x:if test="m:mpadded"><m:menclose notation="bottom"><m:mpadded depth=".1em" height="1em" width=".4em"><m:mspace width=".2em"/></m:mpadded></m:menclose></x:if></m:mtd></x:for-each></m:mtr></x:template><x:template mode="ml" match="m:mtr[@class=\'msline\']" priority="2"/><x:template mode="mstack1" match="*"><x:param name="p"/><x:param name="maxl" select="0"/><m:mtr l="{1 + $p}"><x:if test="ancestor::mstack[1]/@stackalign=\'left\'"><x:attribute name="l"><x:value-of  select="$p"/></x:attribute></x:if><m:mtd><x:apply-templates select="."/></m:mtd></m:mtr></x:template><x:template mode="mstack1" match="m:msrow"><x:param name="p"/><x:param name="maxl" select="0"/><x:variable  name="align1" select="ancestor::m:mstack[1]/@stackalign"/><x:variable name="align"><x:choose><x:when test="string($align1)=\'\'">decimalpoint</x:when><x:otherwise><x:value-of select="$align1"/></x:otherwise></x:choose></x:variable><x:variable name="row"><x:apply-templates mode="mstack1" select="*"><x:with-param name="p" select="0"/></x:apply-templates></x:variable><x:text>&#10;</x:text><x:variable name="l1"><x:choose><x:when test="$align=\'decimalpoint\' and m:mn"><x:for-each select="c:node-set($row)/m:mtr[m:mtd/m:mn][1]"><x:value-of select="number(sum(@l))+count(preceding-sibling::*/@l)"/></x:for-each></x:when><x:when test="$align=\'right\' or $align=\'decimalpoint\'"><x:value-of select="count(c:node-set($row)/m:mtr/m:mtd)"/></x:when><x:otherwise><x:value-of select="0"/></x:otherwise></x:choose></x:variable><m:mtr class="msrow" l="{number($l1) + number(sum(@position)) +$p}"><x:copy-of select="c:node-set($row)/m:mtr/*"/></m:mtr></x:template><x:template mode="mstack1" match="m:mn"><x:param name="p"/><x:variable name="align1" select="ancestor::m:mstack[1]/@stackalign"/><x:variable name="dp1" select="ancestor::*[@decimalpoint][1]/@decimalpoint"/><x:variable name="align"><x:choose><x:when test="string($align1)=\'\'">decimalpoint</x:when><x:otherwise><x:value-of select="$align1"/></x:otherwise></x:choose></x:variable><x:variable name="dp"><x:choose><x:when test="string($dp1)=\'\'">.</x:when><x:otherwise><x:value-of select="$dp1"/></x:otherwise></x:choose></x:variable><m:mtr l="$p"><x:variable name="mn" select="normalize-space(.)"/><x:variable name="len" select="string-length($mn)"/><x:choose><x:when test="$align=\'right\' or ($align=\'decimalpoint\' and not(contains($mn,$dp)))"><x:attribute name="l"><x:value-of select="$p + $len"/></x:attribute></x:when><x:when test="$align=\'decimalpoint\'"><x:attribute name="l"><x:value-of select="$p + string-length(substring-before($mn,$dp))"/></x:attribute></x:when></x:choose><x:for-each select="(//node())[position() &lt;=$len]"><x:variable name="pos" select="position()"/><m:mtd><m:mn><x:value-of select="substring($mn,$pos,1)"/></m:mn></m:mtd></x:for-each></m:mtr></x:template><x:template match="m:msgroup" mode="mstack1"><x:param name="p"/><x:variable name="s" select="number(sum(@shift))"/><x:variable name="thisp" select="number(sum(@position))"/><x:for-each select="*"><x:apply-templates mode="mstack1" select="."><x:with-param name="p" select="number($p)+$thisp+(position()-1)*$s"/></x:apply-templates></x:for-each></x:template><x:template match="m:msline" mode="mstack1"><x:param name="p"/><x:variable  name="align1" select="ancestor::m:mstack[1]/@stackalign"/><x:variable name="align"><x:choose><x:when test="string($align1)=\'\'">decimalpoint</x:when><x:otherwise><x:value-of select="$align1"/></x:otherwise></x:choose></x:variable><m:mtr class="msline"><x:attribute name="l"><x:choose><x:when test="not(string(@length)) or @length=0">*</x:when><x:when test="string($align)=\'right\' or string($align)=\'decimalpoint\' "><x:value-of select="$p+ @length"/></x:when><x:otherwise><x:value-of select="$p"/></x:otherwise></x:choose></x:attribute><x:variable name="w"><x:choose><x:when test="@mslinethickness=\'thin\'">0.1em</x:when><x:when test="@mslinethickness=\'medium\'">0.15em</x:when><x:when test="@mslinethickness=\'thick\'">0.2em</x:when><x:when test="@mslinethickness"><x:value-of select="@mslinethickness"/></x:when><x:otherwise>0.15em</x:otherwise></x:choose></x:variable><x:choose><x:when test="not(string(@length)) or @length=0"><m:mtd class="mslinemax"><m:mpadded lspace="-0.2em" width="0em" height="0em"><m:mfrac linethickness="{$w}"><m:mspace width=".4em"/><m:mrow/></m:mfrac></m:mpadded></m:mtd></x:when><x:otherwise><x:variable name="l" select="@length"/><x:for-each select="(//node())[position()&lt;=$l]"><m:mtd class="msline"><m:mpadded lspace="-0.2em" width="0em" height="0em"><m:mfrac linethickness="{$w}"><m:mspace width=".4em"/><m:mrow/></m:mfrac></m:mpadded></m:mtd></x:for-each></x:otherwise></x:choose></m:mtr></x:template><x:template match="m:mscarries" mode="mstack1"><x:param name="p"/><x:variable  name="align1" select="ancestor::m:mstack[1]/@stackalign"/><x:variable name="l1"><x:choose><x:when test="string($align1)=\'left\'">0</x:when><x:otherwise><x:value-of select="count(*)"/></x:otherwise></x:choose></x:variable><m:mtr class="mscarries" l="{$p + $l1 + sum(@position)}"><x:apply-templates select="*" mode="msc"/></m:mtr></x:template><x:template match="*" mode="msc"><m:mtd><x:copy-of select="../@location|../@crossout"/><m:mstyle mathsize="70%"><x:apply-templates select="."/></m:mstyle></m:mtd></x:template><x:template match="m:mscarry" mode="msc"><m:mtd><x:copy-of select="@location|@crossout"/><m:mstyle mathsize="70%"><x:apply-templates select="*"/></m:mstyle></m:mtd></x:template><x:template match="m:mlongdiv"><x:variable name="ms"><m:mstack><x:copy-of select="(ancestor-or-self::*/@decimalpoint)[last()]"/><x:choose><x:when test="@longdivstyle=\'left/\right\'"><m:msrow><m:mrow><x:copy-of select="*[1]"/></m:mrow><m:mo>/</m:mo><x:copy-of select="*[3]"/><m:mo>\</m:mo><x:copy-of select="*[2]"/></m:msrow></x:when><x:when test="@longdivstyle=\'left)(right\'"><m:msrow><m:mrow><x:copy-of select="*[1]"/></m:mrow><m:mo>)</m:mo><x:copy-of select="*[3]"/><m:mo>(</m:mo><x:copy-of select="*[2]"/></m:msrow></x:when><x:when test="@longdivstyle=\':right=right\'"><m:msrow><x:copy-of select="*[3]"/><m:mo>:</m:mo><x:copy-of select="*[1]"/><m:mo>=</m:mo><x:copy-of select="*[2]"/></m:msrow></x:when><x:when test="@longdivstyle=\'stackedrightright\'"><x:attribute name="align">top</x:attribute><x:copy-of select="*[3]"/></x:when><x:otherwise><x:copy-of select="*[2]"/><m:msline length="{string-length(*[3])}"/><m:msrow><m:mrow><x:copy-of select="*[1]"/></m:mrow><m:mo>)</m:mo><x:copy-of select="*[3]"/></m:msrow></x:otherwise></x:choose><x:copy-of select="*[position()&gt;3]"/></m:mstack></x:variable><x:choose><x:when test="@longdivstyle=\'stackedrightright\'"><m:menclose notation="right"><x:apply-templates select="c:node-set($ms)"/></m:menclose><m:mtable align="top"><m:mtr><m:menclose notation="bottom"><x:copy-of select="*[1]"/></m:menclose></m:mtr><m:mtr><mtd><x:copy-of select="*[2]"/></mtd></m:mtr></m:mtable></x:when><x:otherwise><x:apply-templates select="c:node-set($ms)"/></x:otherwise></x:choose></x:template><x:template match="m:menclose[@notation=\'madruwb\']" mode="rtl"><m:menclose notation="bottom right"><x:apply-templates mode="rtl"/></m:menclose></x:template></x:stylesheet>';
  /*
   *  End of mml3mj.xsl material.
   */
  
  var ctop;
  if (window.XSLTProcessor) {
    // standard method: just use an XSLTProcessor and parse the stylesheet
    if (!MATHML.ParseXML) {MATHML.ParseXML = MATHML.createParser()}
    MATHML.ctopXSLT = new XSLTProcessor();
    MATHML.ctopXSLT.importStylesheet(MATHML.ParseXML(ctopStylesheet));
  } else if (MathJax.Hub.Browser.isMSIE) {
    // nonstandard methods for Internet Explorer
    if (MathJax.Hub.Browser.versionAtLeast("9.0") || (document.documentMode||0) >= 9) {
      // For Internet Explorer >= 9, use createProcessor
      ctop = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
      ctop.loadXML(ctopStylesheet);
      var xslt = new ActiveXObject("Msxml2.XSLTemplate");
      xslt.stylesheet = ctop;
      MATHML.ctopXSLT = {
        ctop: xslt.createProcessor(),
        transformToDocument: function(doc) {
          this.ctop.input = doc;
          this.ctop.transform();
          return this.ctop.output;
        }
      }
    } else {
      // For Internet Explorer <= 8, use transformNode
      ctop = MATHML.createMSParser();
      ctop.async = false;
      ctop.loadXML(ctopStylesheet);
      MATHML.ctopXSLT = {
        ctop: ctop,
        transformToDocument: function(doc) {
          return doc.documentElement.transformNode(this.ctop);
        }
      }
    }
  } else {
    // No XSLT support. Do not change the <math> content.
    MATHML.ctopXSLT = null;
  }

  MathJax.Hub.Startup.signal.Post("MathML mml3 Ready");
});

MathJax.Ajax.loadComplete("[MathJax]/extensions/MathML/mml3.js");
