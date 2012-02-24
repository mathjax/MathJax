.. _AsciiMath-support:

*************************
MathJax AsciiMath Support
*************************

The support for :term:`AsciiMath` in MathJax consists of two parts:
the `asciimath2jax` preprocessor, and the `AsciiMath` input processor.
The first of these looks for mathematics within your web page
(indicated by delimiters like ```...```) and marks the mathematics for
later processing by MathJax.  The AsciiMath input processor is what
converts the AsciiMath notation into MathJax's internal format, where
one of MathJax's output processors then displays it in the web page.

The AsciiMath input jax actually includes a copy of Peter Jipsen's
``ASCIIMathML.js`` file (see the `AsciiMath home page
<http://www1.chapman.edu/~jipsen/mathml/asciimath.html>`_ for
details), and is included by permission of the author.  This means
that the results of MathJax's AsciiMath processing should be the same
as using the actual ``ASCIIMathML.js`` package (at least as far as the
MathML that it generates is concerned).  Thanks go to David Lippman
for writing the initial version of the AsciiMath preprocessor and
input jax.

The `asciimath2jax` preprocessor can be configured to look for whatever
markers you want to use for your math delimiters.  See the
:ref:`asciimath2jax configuration options <configure-asciimath2jax>` section for
details on how to customize the action of `asciimath2jax`.

The AsciiMath input processor handles conversion of your mathematical
notation into MathJax's internal format (which is essentially MathML).
The AsciiMath input processor has few configuration options (see the
:ref:`AsciiMath options <configure-AsciiMath>` section for details).

The AsciiMath input jax handles only the original ASCIIMathML notation
(from ASCIIMathML v1.4.7), not the extened LaTeXMathML notation added
in version 2.0 of ASCIIMathML, though the AsciiMath input jax does
expose the tables that define the symbols that AsciiMath processes,
and so it would be possible to extend them to include additional
symbols.  In general, it is probably better to use MathJax's :ref:`TeX
input jax <TeX-support>` to handle LaTeX notation instead.


AsciiMath delimiters
====================

By default, the `asciimath2jax` preprocessor defines the back-tick
(`````) as the delimiters for mathematics in AsciiMath format.  It
does **not** define ``$...$`` as math delimiters.  That is because
dollar signs appear too often in non-mathematical settings, which
could cause some text to be treated as mathematics unexpectedly.  For
example, with single-dollar delimiters, "... the cost is $2.50 for the
first one, and $2.00 for each additional one ..." would cause the
phrase "2.50 for the first one, and" to be treated as mathematics
since it falls between dollar signs.  For this reason, if you want to
use single-dollars for AsciiMath notation, you must enable that
explicitly in your configuration:

.. code-block:: javascript

    MathJax.Hub.Config({
      asciimath2jax: {
        delimiters: [['$','$'], ['`','`']]
      }
    });

Note that the dollar signs are frequently used as a delimiter for
mathematics in the :term:`TeX` format, and you can not enable the
dollar-sign delimiter for both.  It is probably best to leave dollar
signs for TeX notation.

See the ``config/default.js`` file, or the :ref:`asiimath2jax
configuration options <configure-asciimath2jax>` page, for additional
configuration parameters that you can specify for the `asciimath2jax`
preprocessor, which is the component of MathJax that identifies
AsciiMath notation within the page.


AsciiMath in HTML documents
===============================

The AsciiMath syntax is descibed in the `ASCIIMathML syntax page
<http://www1.chapman.edu/~jipsen/mathml/asciimathsyntax.html>`_.

Keep in mind that your mathematics is part of an HTML document, so you
need to be aware of the special characters used by HTML as part of its
markup.  There cannot be HTML tags within the math delimiters (other
than ``<BR>``) as AsciiMath-formatted math does not include HTML tags.
Also, since the mathematics is initially given as text on the page,
you need to be careful that your mathematics doesn't look like HTML
tags to the browser (which parses the page before MathJax gets to see
it).  In particular, that means that you have to be careful about
things like less-than and greater-than signs (``<`` and ``>``), and
ampersands (``&``), which have special meaning to the browsers.  For
example,

.. code-block:: html

	... when `x<y` we have ...

will cause a problem, because the brower will think ``<y`` is the
beginning of a tag named ``y`` (even though there is no such tag in
HTML).  When this happens, the browser will think the tag continues up
to the next ``>`` in the document (typically the end of the next
actual tag in the HTML file), and you may notice that you are missing
part of the text of the document.  In the example above, the "``we
have ...``" will not be displayed because the browser thinks it is
part of the tag starting at ``<y``.  This is one indication you can
use to spot this problem; it is a common error and should be avoided.

Usually, it is sufficient to simply put spaces around these symbols to
cause the browser to avoid them, so

.. code-block:: html

	... when `x < y` we have ...

should work.  Alternatively, you can use the HTML entities ``&lt;``,
``&gt;`` and ``&amp;`` to encode these characters so that the browser
will not interpret them, but MathJax will.  E.g.,

.. code-block:: html

	  ... when `x &lt; y` we have ...

Keep in mind that the browser interprets your text before MathJax
does.
