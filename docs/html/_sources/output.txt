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

The HTML-CSS output processor produces high-quality output in all
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
computers; but this does introduce some printing issues in some
browsers.

The SVG output processor is new in MathJax version 2.0, and it uses
`Scalable Vector Graphics` to render the mathematics on the page.  SVG
is supported in all the major browsers and most mobile devices; note,
however, that Internet Explorer prior to IE9 does not support SVG, and
IE9 only does in "IE9 standards mode", not its emulation modes for
earlier versions.  The SVG output mode is high quality and slightly
faster than HTML-CSS, and it does not suffer from some of the
font-related issues that HTML-CSS does, so prints well in all
browsers.  This format also works well in some ebook readers (e.g.,
iBooks).  The disadvantage of this mode is that it does not take
advantage of STIX fonts, and so only has access to the characters in
the web-based fonts, and it variable-width tables become fixed size
once they are typeset, and don't rescale if the window size changes
(for example).  Since equation numbers are handled through
variable-width tables, that means equation numbers may not stay at the
edge of the window if it is resized.

The NativeMML output processor uses the browser's internal MathML
support (if any) to render the mathematics.  Currently, Firefox has
native support for MathML, and IE has the `MathPlayer plugin
<http://www.dessci.com/en/products/mathplayer/>`_ for rendering
MathML.  Opera has some built-in support for MathML that works well
with simple equations, but fails with more complex formulas, so we
don't recommend using the NativeMML output processor with Opera.
Safari has some support for MathML since version 5.1, but the quality
is not as high as either Firefox's implementation or IE with MathPlayer.
Chrome, Konqueror, and most other browsers don't support MathML
natively, but may in the future, since MathML is part of the HTML5
specification.

The advantage of the NativeMML output Processor is its speed, since
native MathML support is much faster than using complicated HTML and
CSS to lay out mathematics, as the HTML-CSS output processor does.
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


.. _html-css-with-ie8:

HTML-CSS with IE8 and IE9
=========================

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
