/*************************************************************
 *
 *  MathJax/extensions/MathML/mml3.js
 *
 *  This file implements an XSLT transform to convert some MathML 3 
 *  constructs to constructs MathJax can bit render. The transform is
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
 *  A portion of this file is taken from mml3mj.xsl which is
 *  Copyright (c) David Carlisle 2008-2014
 *  and is used by permission of David Carlisle, who has agreed to allow us
 *  to release it under the Apache2 license (see below).  That portion is
 *  indicated via comments.
 *  
 *  The remainder falls under the copyright that follows.
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2013-2015 The MathJax Consortium
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
  version: "2.5.0"
};

MathJax.Hub.Register.StartupHook("MathML Jax Ready",function () {

  var MATHML = MathJax.InputJax.MathML,
      PARSE = MATHML.Parse.prototype;

  MATHML.prefilterHooks.Add(function (data) {
    if (!MATHML.mml3XSLT) return;

    // Parse the <math> but use MATHML.Parse's preProcessMath to apply the normal preprocessing.
    if (!MATHML.ParseXML) {MATHML.ParseXML = MATHML.createParser()}
    var doc = MATHML.ParseXML(PARSE.preProcessMath(data.math));

    // Now transform the <math> using the mml3 stylesheet.
    var newdoc = MATHML.mml3XSLT.transformToDocument(doc);

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
   *  (https://web-xslt.googlecode.com/svn/trunk/ctop/mml3mj.xsl)
   *  which is Copyright (c) David Carlisle 2008-2014.
   *  It is used by permission of David Carlisle, who has agreed to allow it to
   *  be released under the Apache License, Version 2.0.
   */
  var mml3Stylesheet = '<x:stylesheet version="1.0" xmlns:x="http://www.w3.org/1999/XSL/Transform" xmlns:m="http://www.w3.org/1998/Math/MathML" xmlns="http://www.w3.org/1998/Math/MathML" xmlns:c="http://exslt.org/common" exclude-result-prefixes="m c"><ms:script language="JScript" implements-prefix="c" xmlns:ms="urn:schemas-microsoft-com:xslt"> this[\'node-set\'] =  function (x) {  return x;  }</ms:script><x:output indent="yes" omit-xml-declaration="yes"/><x:template match="*"><x:copy><x:copy-of select="@*"/><x:apply-templates/></x:copy></x:template><x:template match="*[@dir=\'rtl\']"  priority="10"><x:apply-templates mode="rtl" select="."/></x:template><x:template match="@*" mode="rtl"><x:copy-of select="."/></x:template><x:template match="*" mode="rtl"><x:copy><x:apply-templates select="@*" mode="rtl"/><x:for-each select="node()"><x:sort data-type="number" order="descending" select="position()"/><x:text></x:text><x:apply-templates mode="rtl" select="."/></x:for-each></x:copy></x:template><x:template match="@open" mode="rtl"><x:attribute name="close"><x:value-of select="."/></x:attribute></x:template><x:template match="@open[.=\'(\']" mode="rtl"><x:attribute name="close">)</x:attribute></x:template><x:template match="@open[.=\')\']" mode="rtl"><x:attribute name="close">(</x:attribute></x:template><x:template match="@open[.=\'[\']" mode="rtl"><x:attribute name="close">]</x:attribute></x:template><x:template match="@open[.=\']\']" mode="rtl"><x:attribute name="close">[</x:attribute></x:template><x:template match="@open[.=\'{\']" mode="rtl"><x:attribute name="close">}</x:attribute></x:template><x:template match="@open[.=\'}\']" mode="rtl"><x:attribute name="close">{</x:attribute></x:template><x:template match="@close" mode="rtl"><x:attribute name="open"><x:value-of select="."/></x:attribute></x:template><x:template match="@close[.=\'(\']" mode="rtl"><x:attribute name="open">)</x:attribute></x:template><x:template match="@close[.=\')\']" mode="rtl"><x:attribute name="open">(</x:attribute></x:template><x:template match="@close[.=\'[\']" mode="rtl"><x:attribute name="open">]</x:attribute></x:template><x:template match="@close[.=\']\']" mode="rtl"><x:attribute name="open">[</x:attribute></x:template><x:template match="@close[.=\'{\']" mode="rtl"><x:attribute name="open">}</x:attribute></x:template><x:template match="@close[.=\'}\']" mode="rtl"><x:attribute name="open">{</x:attribute></x:template><x:template match="m:mfrac[@bevelled=\'true\']" mode="rtl"><mrow><msub><mi></mi><x:apply-templates select="*[2]" mode="rtl"/></msub><mo>&#x5c;</mo><msup><mi></mi><x:apply-templates select="*[1]" mode="rtl"/></msup></mrow></x:template><x:template match="m:mfrac" mode="rtl"><x:copy><x:apply-templates mode="rtl" select="@*|*"/></x:copy></x:template><x:template match="m:mroot" mode="rtl"><msup><menclose notation="top right"><x:apply-templates mode="rtl" select="@*|*[1]"/></menclose><x:apply-templates mode="rtl" select="*[2]"/></msup></x:template><x:template match="m:msqrt" mode="rtl"><menclose notation="top right"><x:apply-templates mode="rtl" select="@*|*[1]"/></menclose></x:template><x:template match="m:mtable|m:munder|m:mover|m:munderover" mode="rtl" priority="2"><x:copy><x:apply-templates select="@*" mode="rtl"/><x:apply-templates mode="rtl"></x:apply-templates></x:copy></x:template><x:template match="m:msup" mode="rtl" priority="2"><mmultiscripts><x:apply-templates select="*[1]" mode="rtl"/><mprescripts/><none/><x:apply-templates select="*[2]" mode="rtl"/></mmultiscripts></x:template><x:template match="m:msub" mode="rtl" priority="2"><mmultiscripts><x:apply-templates select="*[1]" mode="rtl"/><mprescripts/><x:apply-templates select="*[2]" mode="rtl"/><none/></mmultiscripts></x:template><x:template match="m:msubsup" mode="rtl" priority="2"><mmultiscripts><x:apply-templates select="*[1]" mode="rtl"/><mprescripts/><x:apply-templates select="*[2]" mode="rtl"/><x:apply-templates select="*[3]" mode="rtl"/></mmultiscripts></x:template><x:template match="m:mmultiscripts" mode="rtl" priority="2"><mmultiscripts><x:apply-templates select="*[1]" mode="rtl"/><x:for-each  select="m:mprescripts/following-sibling::*[position() mod 2 = 1]"><x:sort data-type="number" order="descending" select="position()"/><x:apply-templates select="."  mode="rtl"/><x:apply-templates select="following-sibling::*[1]"  mode="rtl"/></x:for-each><mprescripts/><x:for-each  select="m:mprescripts/preceding-sibling::*[position()!=last()][position() mod 2 = 0]"><x:sort data-type="number" order="descending" select="position()"/><x:apply-templates select="."  mode="rtl"/><x:apply-templates select="following-sibling::*[1]"  mode="rtl"/></x:for-each></mmultiscripts></x:template><x:template match="m:mmultiscripts[not(m:mprescripts)]" mode="rtl" priority="3"><mmultiscripts><x:apply-templates select="*[1]" mode="rtl"/><mprescripts/><x:for-each  select="*[position() mod 2 = 0]"><x:sort data-type="number" order="descending" select="position()"/><x:apply-templates select="."  mode="rtl"/><x:apply-templates select="following-sibling::*[1]"  mode="rtl"/></x:for-each></mmultiscripts></x:template><x:template match="text()[.=\'(\']" mode="rtl">)</x:template><x:template match="text()[.=\')\']" mode="rtl">(</x:template><x:template match="text()[.=\'{\']" mode="rtl">}</x:template><x:template match="text()[.=\'}\']" mode="rtl">{</x:template><x:template match="text()[.=\'&lt;\']" mode="rtl">&gt;</x:template><x:template match="text()[.=\'&gt;\']" mode="rtl">&lt;</x:template><x:template match="text()[.=\'&#x2208;\']" mode="rtl">&#x220b;</x:template><x:template match="text()[.=\'&#x220b;\']" mode="rtl">&#x2208;</x:template><x:template match="@notation[.=\'radical\']" mode="rtl"><x:attribute name="notation">top right</x:attribute></x:template><x:template match="m:mlongdiv|m:mstack" mode="rtl"><mrow dir="ltr"><x:apply-templates select="."/></mrow></x:template><x:template match="m:mstack" priority="11"><x:variable name="m"><mtable columnspacing="0em"><x:copy-of select="@align"/><x:variable name="t"><x:apply-templates select="*" mode="mstack1"><x:with-param name="p" select="0"/></x:apply-templates></x:variable><x:variable name="maxl"><x:for-each select="c:node-set($t)/*/@l"><x:sort data-type="number" order="descending"/><x:if test="position()=1"><x:value-of select="."/></x:if></x:for-each></x:variable><x:for-each select="c:node-set($t)/*[not(@class=\'mscarries\') or following-sibling::*[1]/@class=\'mscarries\']"><x:variable name="c" select="preceding-sibling::*[1][@class=\'mscarries\']"/><x:text>&#10;</x:text><mtr><x:copy-of select="@class[.=\'msline\']"/><x:variable name="offset" select="$maxl - @l"/><x:choose><x:when test="@class=\'msline\' and @l=\'*\'"><x:variable name="msl" select="*[1]"/><x:for-each select="(//node())[position()&lt;=$maxl]"><x:copy-of select="$msl"/></x:for-each></x:when><x:when test="$c"><x:variable name="ldiff" select="$c/@l - @l"/><x:variable name="loffset" select="$maxl - $c/@l"/><x:for-each select="(//*)[position()&lt;= $offset]"><x:variable name="pn" select="position()"/><x:variable name="cy" select="$c/*[position()=$pn - $loffset]"/><mtd><x:if test="$cy/*"/><mover><mphantom><mn>0</mn></mphantom><mpadded width="0em" lspace="-0.5width"><x:copy-of select="$cy/*/*"/></mpadded></mover></mtd></x:for-each><x:for-each select="*"><x:variable name="pn" select="position()"/><x:variable name="cy" select="$c/*[position()=$pn + $ldiff]"/><x:copy><x:copy-of select="@*"/><x:variable name="b"><x:choose><x:when test="not(string($cy/@crossout) or $cy/@crossout=\'none\')"><x:copy-of select="*"/></x:when><x:otherwise><menclose notation="{$cy/@crossout}"><x:copy-of select="*"/></menclose></x:otherwise></x:choose></x:variable><x:choose><x:when test="$cy/*/m:none or not($cy/*/*)"><x:copy-of select="$b"/></x:when><x:when test="not(string($cy/@location)) or $cy/@location=\'n\'"><mover><x:copy-of select="$b"/><mpadded width="0em" lspace="-0.5width"><x:copy-of select="$cy/*/*"/></mpadded></mover></x:when><x:when test="$cy/@location=\'nw\'"><mmultiscripts><x:copy-of select="$b"/><mprescripts/><none/><mpadded lspace="-1width" width="0em"><x:copy-of select="$cy/*/*"/></mpadded></mmultiscripts></x:when><x:when test="$cy/@location=\'s\'"><munder><x:copy-of select="$b"/><mpadded width="0em" lspace="-0.5width"><x:copy-of select="$cy/*/*"/></mpadded></munder></x:when><x:when test="$cy/@location=\'sw\'"><mmultiscripts><x:copy-of select="$b"/><mprescripts/><mpadded lspace="-1width" width="0em"><x:copy-of select="$cy/*/*"/></mpadded><none/></mmultiscripts></x:when><x:when test="$cy/@location=\'ne\'"><msup><x:copy-of select="$b"/><mpadded width="0em"><x:copy-of select="$cy/*/*"/></mpadded></msup></x:when><x:when test="$cy/@location=\'se\'"><msub><x:copy-of select="$b"/><mpadded width="0em"><x:copy-of select="$cy/*/*"/></mpadded></msub></x:when><x:when test="$cy/@location=\'w\'"><msup><mrow/><mpadded lspace="-1width" width="0em"><x:copy-of select="$cy/*/*"/></mpadded></msup><x:copy-of select="$b"/></x:when><x:when test="$cy/@location=\'e\'"><x:copy-of select="$b"/><msup><mrow/><mpadded width="0em"><x:copy-of select="$cy/*/*"/></mpadded></msup></x:when><x:otherwise><x:copy-of select="$b"/></x:otherwise></x:choose></x:copy></x:for-each></x:when><x:otherwise><x:for-each select="(//*)[position()&lt;= $offset]"><mtd/></x:for-each><x:copy-of select="*"/></x:otherwise></x:choose></mtr></x:for-each></mtable></x:variable><x:apply-templates mode="ml" select="c:node-set($m)"/></x:template><x:template match="*" mode="ml"><x:copy><x:copy-of select="@*"/><x:apply-templates mode="ml"/></x:copy></x:template><x:template mode="ml" match="m:mtr[following-sibling::*[1][@class=\'msline\']]"><mtr><x:copy-of select="@*"/><x:variable name="m" select="following-sibling::*[1]/m:mtd"/><x:for-each select="m:mtd"><x:variable name="p" select="position()"/><mtd><x:copy-of select="@*"/><x:choose><x:when test="$m[$p]/m:mpadded"><menclose notation="bottom"><mpadded depth=".1em" height="1em" width=".4em"><x:copy-of select="*"/></mpadded></menclose></x:when><x:otherwise><x:copy-of select="*"/></x:otherwise></x:choose></mtd></x:for-each></mtr></x:template><x:template mode="ml" match="m:mtr[not(preceding-sibling::*)][@class=\'msline\']" priority="3"><mtr><x:copy-of select="@*"/><x:for-each select="m:mtd"><mtd><x:copy-of select="@*"/><x:if test="m:mpadded"><menclose notation="bottom"><mpadded depth=".1em" height="1em" width=".4em"><mspace width=".2em"/></mpadded></menclose></x:if></mtd></x:for-each></mtr></x:template><x:template mode="ml" match="m:mtr[@class=\'msline\']" priority="2"/><x:template mode="mstack1" match="*"><x:param name="p"/><x:param name="maxl" select="0"/><mtr l="{1 + $p}"><x:if test="ancestor::mstack[1]/@stackalign=\'left\'"><x:attribute name="l"><x:value-of  select="$p"/></x:attribute></x:if><mtd><x:apply-templates select="."/></mtd></mtr></x:template><x:template mode="mstack1" match="m:msrow"><x:param name="p"/><x:param name="maxl" select="0"/><x:variable  name="align1" select="ancestor::m:mstack[1]/@stackalign"/><x:variable name="align"><x:choose><x:when test="string($align1)=\'\'">decimalpoint</x:when><x:otherwise><x:value-of select="$align1"/></x:otherwise></x:choose></x:variable><x:variable name="row"><x:apply-templates mode="mstack1" select="*"><x:with-param name="p" select="0"/></x:apply-templates></x:variable><x:text>&#10;</x:text><x:variable name="l1"><x:choose><x:when test="$align=\'decimalpoint\' and m:mn"><x:for-each select="c:node-set($row)/m:mtr[m:mtd/m:mn][1]"><x:value-of select="number(sum(@l))+count(preceding-sibling::*/@l)"/></x:for-each></x:when><x:when test="$align=\'right\' or $align=\'decimalpoint\'"><x:value-of select="count(c:node-set($row)/m:mtr/m:mtd)"/></x:when><x:otherwise><x:value-of select="0"/></x:otherwise></x:choose></x:variable><mtr class="msrow" l="{number($l1) + number(sum(@position)) +$p}"><x:copy-of select="c:node-set($row)/m:mtr/*"/></mtr></x:template><x:template mode="mstack1" match="m:mn"><x:param name="p"/><x:variable name="align1" select="ancestor::m:mstack[1]/@stackalign"/><x:variable name="dp1" select="ancestor::*[@decimalpoint][1]/@decimalpoint"/><x:variable name="align"><x:choose><x:when test="string($align1)=\'\'">decimalpoint</x:when><x:otherwise><x:value-of select="$align1"/></x:otherwise></x:choose></x:variable><x:variable name="dp"><x:choose><x:when test="string($dp1)=\'\'">.</x:when><x:otherwise><x:value-of select="$dp1"/></x:otherwise></x:choose></x:variable><mtr l="$p"><x:variable name="mn" select="normalize-space(.)"/><x:variable name="len" select="string-length($mn)"/><x:choose><x:when test="$align=\'right\' or ($align=\'decimalpoint\' and not(contains($mn,$dp)))"><x:attribute name="l"><x:value-of select="$p + $len"/></x:attribute></x:when><x:when test="$align=\'decimalpoint\'"><x:attribute name="l"><x:value-of select="$p + string-length(substring-before($mn,$dp))"/></x:attribute></x:when></x:choose><x:for-each select="(//node())[position() &lt;=$len]"><x:variable name="pos" select="position()"/><mtd><mn><x:value-of select="substring($mn,$pos,1)"/></mn></mtd></x:for-each></mtr></x:template><x:template match="m:msgroup" mode="mstack1"><x:param name="p"/><x:variable name="s" select="number(sum(@shift))"/><x:variable name="thisp" select="number(sum(@position))"/><x:for-each select="*"><x:apply-templates mode="mstack1" select="."><x:with-param name="p" select="number($p)+$thisp+(position()-1)*$s"/></x:apply-templates></x:for-each></x:template><x:template match="m:msline" mode="mstack1"><x:param name="p"/><x:variable  name="align1" select="ancestor::m:mstack[1]/@stackalign"/><x:variable name="align"><x:choose><x:when test="string($align1)=\'\'">decimalpoint</x:when><x:otherwise><x:value-of select="$align1"/></x:otherwise></x:choose></x:variable><mtr class="msline"><x:attribute name="l"><x:choose><x:when test="not(string(@length)) or @length=0">*</x:when><x:when test="string($align)=\'right\' or string($align)=\'decimalpoint\' "><x:value-of select="$p+ @length"/></x:when><x:otherwise><x:value-of select="$p"/></x:otherwise></x:choose></x:attribute><x:variable name="w"><x:choose><x:when test="@mslinethickness=\'thin\'">0.1em</x:when><x:when test="@mslinethickness=\'medium\'">0.15em</x:when><x:when test="@mslinethickness=\'thick\'">0.2em</x:when><x:when test="@mslinethickness"><x:value-of select="@mslinethickness"/></x:when><x:otherwise>0.15em</x:otherwise></x:choose></x:variable><x:choose><x:when test="not(string(@length)) or @length=0"><mtd class="mslinemax"><mpadded lspace="-0.2em" width="0em" height="0em"><mfrac linethickness="{$w}"><mspace width=".4em"/><mrow/></mfrac></mpadded></mtd></x:when><x:otherwise><x:variable name="l" select="@length"/><x:for-each select="(//node())[position()&lt;=$l]"><mtd class="msline"><mpadded lspace="-0.2em" width="0em" height="0em"><mfrac linethickness="{$w}"><mspace width=".4em"/><mrow/></mfrac></mpadded></mtd></x:for-each></x:otherwise></x:choose></mtr></x:template><x:template match="m:mscarries" mode="mstack1"><x:param name="p"/><x:variable  name="align1" select="ancestor::m:mstack[1]/@stackalign"/><x:variable name="l1"><x:choose><x:when test="string($align1)=\'left\'">0</x:when><x:otherwise><x:value-of select="count(*)"/></x:otherwise></x:choose></x:variable><mtr class="mscarries" l="{$p + $l1 + sum(@position)}"><x:apply-templates select="*" mode="msc"/></mtr></x:template><x:template match="*" mode="msc"><mtd><x:copy-of select="../@location|../@crossout"/><mstyle mathsize="70%"><x:apply-templates select="."/></mstyle></mtd></x:template><x:template match="m:mscarry" mode="msc"><mtd><x:copy-of select="@location|@crossout"/><mstyle mathsize="70%"><x:apply-templates select="*"/></mstyle></mtd></x:template><x:template match="m:mlongdiv" priority="11"><x:variable name="ms"><mstack><x:copy-of select="(ancestor-or-self::*/@decimalpoint)[last()]"/><x:choose><x:when test="@longdivstyle=\'left)(right\'"><msrow><mrow><x:copy-of select="*[1]"/></mrow><mo>)</mo><x:copy-of select="*[3]"/><mo>(</mo><x:copy-of select="*[2]"/></msrow></x:when><x:when test="@longdivstyle=\'left/\\right\'"><msrow><mrow><x:copy-of select="*[1]"/></mrow><mo>/</mo><x:copy-of select="*[3]"/><mo>\\</mo><x:copy-of select="*[2]"/></msrow></x:when><x:when test="@longdivstyle=\':right=right\'"><msrow><x:copy-of select="*[3]"/><mo>:</mo><x:copy-of select="*[1]"/><mo>=</mo><x:copy-of select="*[2]"/></msrow></x:when><x:when test="@longdivstyle=\'stackedrightright\'               or @longdivstyle=\'mediumstackedrightright\'                    or @longdivstyle=\'shortstackedrightright\'             or @longdivstyle=\'stackedleftleft\'                    "><x:attribute name="align">top</x:attribute><x:copy-of select="*[3]"/></x:when><x:when test="@longdivstyle=\'stackedleftlinetop\'"><x:copy-of select="*[2]"/><msline length="{string-length(*[3])-1}"/><msrow><mrow><menclose notation="bottom right"><x:copy-of select="*[1]"/></menclose></mrow><x:copy-of select="*[3]"/></msrow></x:when><x:when test="@longdivstyle=\'righttop\'"><x:copy-of select="*[2]"/><msline length="{string-length(*[3])}"/><msrow><x:copy-of select="*[3]"/><menclose notation="top left bottom"><x:copy-of select="*[1]"/></menclose></msrow></x:when><x:otherwise><x:copy-of select="*[2]"/><msline length="{string-length(*[3])}"/><msrow><mrow><x:copy-of select="*[1]"/></mrow><mo>)</mo><x:copy-of select="*[3]"/></msrow></x:otherwise></x:choose><x:copy-of select="*[position()&gt;3]"/></mstack></x:variable><x:choose><x:when test="@longdivstyle=\'stackedrightright\'"><menclose notation="right"><x:apply-templates select="c:node-set($ms)"/></menclose><mtable align="top"><mtr><menclose notation="bottom"><x:copy-of select="*[1]"/></menclose></mtr><mtr><mtd><x:copy-of select="*[2]"/></mtd></mtr></mtable></x:when><x:when test="@longdivstyle=\'mediumstackedrightright\'"><x:apply-templates select="c:node-set($ms)"/><menclose notation="left"><mtable align="top"><mtr><menclose notation="bottom"><x:copy-of select="*[1]"/></menclose></mtr><mtr><mtd><x:copy-of select="*[2]"/></mtd></mtr></mtable></menclose></x:when><x:when test="@longdivstyle=\'shortstackedrightright\'"><x:apply-templates select="c:node-set($ms)"/><mtable align="top"><mtr><menclose notation="left bottom"><x:copy-of select="*[1]"/></menclose></mtr><mtr><mtd><x:copy-of select="*[2]"/></mtd></mtr></mtable></x:when><x:when test="@longdivstyle=\'stackedleftleft\'"><mtable align="top"><mtr><menclose notation="bottom"><x:copy-of select="*[1]"/></menclose></mtr><mtr><mtd><x:copy-of select="*[2]"/></mtd></mtr></mtable><menclose notation="left"><x:apply-templates select="c:node-set($ms)"/></menclose></x:when><x:otherwise><x:apply-templates select="c:node-set($ms)"/></x:otherwise></x:choose></x:template><x:template match="m:menclose[@notation=\'madruwb\']" mode="rtl"><menclose notation="bottom right"><x:apply-templates mode="rtl"/></menclose></x:template></x:stylesheet>';
  /*
   *  End of mml3mj.xsl material.
   */
  
  var mml3;
  if (window.XSLTProcessor) {
    // standard method: just use an XSLTProcessor and parse the stylesheet
    if (!MATHML.ParseXML) {MATHML.ParseXML = MATHML.createParser()}
    MATHML.mml3XSLT = new XSLTProcessor();
    MATHML.mml3XSLT.importStylesheet(MATHML.ParseXML(mml3Stylesheet));
  } else if (MathJax.Hub.Browser.isMSIE) {
    // nonstandard methods for Internet Explorer
    if (MathJax.Hub.Browser.versionAtLeast("9.0") || (document.documentMode||0) >= 9) {
      // For Internet Explorer >= 9, use createProcessor
      mml3 = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
      mml3.loadXML(mml3Stylesheet);
      var xslt = new ActiveXObject("Msxml2.XSLTemplate");
      xslt.stylesheet = mml3;
      MATHML.mml3XSLT = {
        mml3: xslt.createProcessor(),
        transformToDocument: function(doc) {
          this.mml3.input = doc;
          this.mml3.transform();
          return this.mml3.output;
        }
      }
    } else {
      // For Internet Explorer <= 8, use transformNode
      mml3 = MATHML.createMSParser();
      mml3.async = false;
      mml3.loadXML(mml3Stylesheet);
      MATHML.mml3XSLT = {
        mml3: mml3,
        transformToDocument: function(doc) {
          return doc.documentElement.transformNode(this.mml3);
        }
      }
    }
  } else {
    // No XSLT support. Do not change the <math> content.
    MATHML.mml3XSLT = null;
  }

  MathJax.Hub.Startup.signal.Post("MathML mml3.js Ready");
});

MathJax.Ajax.loadComplete("[MathJax]/extensions/MathML/mml3.js");
