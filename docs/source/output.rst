.. _output-formats:

**********************
MathJax Output Formats
**********************

Currently, MathJax can render math in three ways:

- Using HTML-with-CSS to lay out the mathematics,
- Using :term:`SVG` to lay out the mathematics, or
- Using a browser's native MathML support.

These are implemented by the `HTML-CSS`, `SVG` and `NativeMML` output
processors.

If you are using one of the combined configuration files, then this will 
select one of these output processors for you.  If the config file ends in 
``_HTML``, then it is the HTML-CSS output processor, and if it ends in
``_SVG`` then the SVG output processor will be used.  If it ends in 
``_HTMLorMML``, then the NativeMML output processor will be chosen if the 
browser supports it well enough, otherwise HTML-CSS output will be used.

If you are performing your own in-line or file-based configuration,
you select which one you want to use by including either
``"output/HTML-CSS"``, ``"output/SVG"``, or ``"output/NativeMML"`` in
the `jax` array of your MathJax configuration.  For example

.. code-block:: javascript

    jax: ["input/TeX","output/HTML-CSS"]

would specify TeX input and HTML-with-CSS output for the mathematics
in your document.

The **HTML-CSS output processor** produces high-quality output in all
major browsers, with results that are consistent across browsers and
operating systems.  This is MathJax's primary output mode.  Its major
advantage is its quality and consistency; its drawback is that it is
slower than the NativeMML mode at rendering the mathematics.
Historically, the performance in Internet Explorer (and IE8 in
particular) was quite poor, with the page getting slower and slower as
more math is processed.  MathJax version 2.0 includes a number of
optimizations to improve the display performance in IE, and it is now
more comparable to other browsers.  The HTML-CSS output uses web-based
fonts so that users don't have to have math fonts installed on their
computers, which introduces some printing issues in certain browsers.

The **SVG output processor** is new in MathJax version 2.0, and it
uses `Scalable Vector Graphics` to render the mathematics on the page.
SVG is supported in all the major browsers and most mobile devices;
note, however, that Internet Explorer prior to IE9 does not support
SVG, and IE9 only does in "IE9 standards mode", not its emulation
modes for earlier versions.  The SVG output mode is high quality and
slightly faster than HTML-CSS, and it does not suffer from some of the
font-related issues that HTML-CSS does, so prints well in all
browsers.  This format also works well in some ebook readers (e.g.,
iBooks).  The disadvantages of this mode are the following: first,
Internet Explorer only supports SVG in IE9 and later versions (and
then only in IE9 standards mode or above), and some versions of the
Android Internet browser don't have SVG enabled. Second, it does not
take advantage of STIX fonts, and so only has access to the characters
in the web-based fonts, and third, its variable-width tables become
fixed size once they are typeset, and don't rescale if the window size
changes (for example).  Since equation numbers are handled through
variable-width tables, that means equation numbers may not stay at the
edge of the window if it is resized.  For these reasons it is probably
best not to force the use of SVG output unless you have some control
over the browsers that are used to view your documents.

The **NativeMML output processor** uses the browser's internal MathML
support (if any) to render the mathematics.  Currently, Firefox has
native support for MathML, and IE has the `MathPlayer plugin
<http://www.dessci.com/en/products/mathplayer/>`_ for rendering
MathML.  Opera has some built-in support for MathML that works well
with simple equations, but fails with more complex formulas, so we
don't recommend using the NativeMML output processor with Opera.
Safari has some support for MathML since version 5.1, but the quality
is not as high as either Firefox's implementation or IE with MathPlayer.
Chrome, Konqueror, and most other browsers don't support MathML
natively, but this may change in the future, since MathML is part of 
the HTML5 specification.

The advantage of the NativeMML output Processor is its speed, since
native MathML support is much faster than using complicated HTML and
CSS to typeset mathematics, as the HTML-CSS output processor does.
The disadvantage is that you are dependent on the browser's MathML
implementation for your rendering, and these vary in quality of output
and completeness of implementation.  MathJax relies on features that
are not available in some renderers (for example, Firefox's MathML
support does not implement the features needed for labeled equations).
The results using the NativeMML output processor may have spacing or
other rendering problems that are outside of MathJax's control.


Automatic Selection of the Output Processor
===========================================

Since not all browsers support MathML natively, it would be unwise to
choose the NativeMML output processor unless you are sure of your
audience's browser capabilities.  MathJax can help with that, however,
since a number of its combined configuration files will select
NativeMML output when the browser supports it well enough, and
HTML-CSS output otherwise.  These are the configuration files that end
in ``_HTMLorMML``.

If you are doing your own configuration, there is a special configuration
file that you can include that will choose between NativeMML and HTML-CSS
depending on the browser in use.  To invoke it, add ``"MMLorHTML.js"`` to
your configuration's `config` array, and **do not** include an output
processor in your `jax` array; MathJax will fill that in for you based on
the abilities of your user's browser.

.. code-block:: javascript

   config: ["MMLorHTML.js"],
   jax: ["input/TeX"]


By default, MathJax will choose HTML-CSS in all browsers except for
one case:  Internet Explorer when the MathPlayer plugin is present.
In the past, MathJax selected NativeMML output for Firefox as well,
but we have found that there are too many rendering issues with
Firefox's native MathML implementation, and so MathJax now selects
HTML-CSS output for Firefox by default as well.  Users can still use
the Mathjax contextual menu to select the NativeMML renderer if they
wish to choose greater speed at the expense of some quality.

You can customize which choice MathJax makes on a browser-by-browser
basis or a global basis.  See the ``config/default.js`` file or the
:ref:`Configuring MMLorHTML <configure-MMLorHTML>` section for further
details.  As an example, this configuration tells MathJax to use
native MathML support rather than HTML-CSS output for Firefox:

.. code-block:: html

    <script type="text/x-mathjax-config">
      MathJax.Hub.Config({
        MMLorHTML: { prefer: { Firefox: "MML" } }
      });
    </script>
    <script type="text/javascript"
      src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    </script>

With this configuration, MathML output will be used for both Firefox
and IE with the MathPlayer plugin.  Note, however, that a user can
employ the MathJax contextual menu to select the other renderer if he
or she wishes.

MathJax produces MathML that models the underlying mathematics as best
it can, rather than using complicated hacks to improve output for a
particular MathML implementation.  When you make the choice to use the
NativeMML output processor, you are making a trade-off: gaining speed
at the expense of quality and reliability, a decision that should not
be taken lightly.

.. _automatic-linebreaking:

Automatic Line Breaking
=======================

The HTML-CSS and SVG output processors implement (most of) the MathML3
automatic line-breaking specification.  (The NativeMML output
processor relies on the browser's native MathML support to handle line
breaking when it is used.)  Since line-breaking takes extra processing
and so can slow down the mathematical output, it is off by default,
but you can enable it by adding

.. code-block:: html

    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      "HTML-CSS": { linebreaks: { automatic: true } },
             SVG: { linebreaks: { automatic: true } }
    });
    </script>

to your page just before the ``<script>`` tag that loads
``MathJax.js`` itself.

Note that line breaking only applies to displayed equations, not
in-line equations (unless the in-line euqation is itself longer than a
line), and that the line-breaks are only computed once when the
equation is initially typeset, and do not change if the user changes
the window size, or if the container changes size for some other
reason.

You can control what width is used to determine where the line breaks
shoud occur using the ``container`` parameter of the ``linebreaks``
block.  By default it is the width of the containing element, but you
can make it a fixed width, or make it a percentage of the container.
See the :ref:`HTML-CSS configuration <configure-HTML-CSS>` or
:ref:`SVG configuration <configure-SVG>` pages for more details.

The linbe-breaking algorithm uses the nesting depth, the type of
operator, the size of spaces, and other factors to decide on the
breakpoints, but it does not know the meaning of the mathematics, and
may not choose the optimal breakpoints. We will continue to work on
the algorithm as we gain information from its actual use in the field.
If you are using :term:`MathML` as your input format, you can use the
``linebreak="goodbreak"`` and ``linebreak="badbreak"`` attributes on
``<mo>`` elements to help MathJax pick the best breakpoints for your
mathematics.


.. _html-css-with-ie8:

HTML-CSS with IE
================

The performance of MathJax in Internet Explorer 8 and 9 has been
substantially improved in version 2.0.  The HTML-CSS output processing
was redesigned to avoid the page reflows that were the main source of
the speed problem in I8 and IE9.  For test pages having between 20 and
50 typeset expressions, we see an 80% reduction in output processing
time for IE8, a 50% reduction for IE9, and between 15% and 25%
reduction for most other browsers over the v1.1a times.  Since the
processing time in v1.1a grows non-linearly in IE, you should see even
larger savings for pages with more equations when using v2.0.

In the past, we recommended forcing IE8 and IE9 into IE7-emulation
mode in order to get better performance.  That is no longer necessary.
Indeed, the fastest modes in IE8 and IE9 now are their IE8 standards
and IE9 standards modes, so it is best to force the highest mode
possible.  That can be accomplished by adding

.. code-block:: html

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

at the top of the ``<head>`` section of your HTML documents.  Note
that this line must come at the beginning of the ``<head>``, before
any stylesheets, scripts, or other content are loaded.

.. _html-css-extensions:

HTML-CSS Extensions
===================

The HTML-CSS output jax uses elements with width set to 100% when it
typesets displayed equations.  If there are floating elements on the
left or right, this can mean that displayed mathematics isn't properly
centered, and can cause equation numbers to overlap the floating
content.  To avoid this, you can specify the `handle-floats` extension
in the `extensions` array of your `HTML-CSS` configuration block.

.. code-block:: javascript

    "HTML-CSS": {
      extensions: ["handle-floats.js"]
    }

This will use CSS that puts the displayed equations into elements that
work like tabel cells, and won't overlap the floaring content.
Because this is somewhat of a misuse of CSS, it is not used by
default, but it has proved successful in most situations, so you may
consider using it in pages that include material that floats to the
left or right of text containing displayed mathematics, especially
when equation numbers or tags are used.

See the :ref:`HTML-CSS configuration options <configure-HTML-CSS>` for
other options of the HTML-CSS output jax.
