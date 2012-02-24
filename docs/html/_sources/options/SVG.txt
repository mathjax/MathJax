.. _configure-SVG:

************************
The SVG output processor
************************

The options below control the operation of the SVG output
processor that is run when you include ``"output/SVG"`` in the
`jax` array of your configuration or load a combined configuration
file that includes the SVG output jax.  They are listed with their default
values.  To set any of these options, include an ``SVG`` section
in your :meth:`MathJax.Hub.Config()` call.  Note that, because of the
dash, you need to enclose the name in quotes.  For example

.. code-block:: javascript

    MathJax.Hub.Config({
      "SVG": {
        scale: 120
      }
    });

would set the ``scale`` option to 120%.

.. describe:: scale: 100

    The scaling factor (as a percentage) of math with respect to the
    surrounding text.  The `SVG` output processor tries to match
    the ex-size of the mathematics with that of the text where it is
    placed, but you may want to adjust the results using this scaling
    factor.  The user can also adjust this value using the contextual
    menu item associated with the typeset mathematics.

.. describe:: minScaleAdjust: 50

   This gives a minimum scale (as a percent) for the scaling used by 
   MathJax to match the equation to the surrounding text.  This will 
   prevent MathJax from making the mathematics too small.

.. describe:: font: "TeX"

    This is the font to use for rendering the mathematics.  Note that
    currently only the `TeX` font is available.

.. describe:: blacker: 10

    This is the stroke width to use for all character paths (1em =
    1000 units).  This is a cheap way of getting slightly lighter or
    darker characters, but remember that not all displays will act the
    same, so a value that is good for you may not be good for everyone.
    
.. describe:: undefinedFamily: "STIXGeneral, 'Arial Unicode MS', serif"

    This is the font-family CSS value used for characters that are not
    in the selected font (e.g., this is where to look for characters
    not included in the MathJax TeX fonts).  IE will stop looking
    after the first font that exists on the system (even if it doesn't
    contain the needed character), so order these carefully.

.. describe:: mtextFontInherit: false

    This setting controls whether ``<mtext>`` elements will be typeset
    using the math fonts or the font of the surrounding text.  When
    ``false``, the font for ``mathvariant="normal"`` will be used;
    when ``true``, the font will be inherited from the surrounding
    paragraph.

.. describe:: addMMLclasses: false

    This controls whether the MathML structure is retained and CSS
    classes are added to mark the original MathML elements (as in the
    output from the `HTML-CSS` output jax).  By default, the SVG
    output jax removes unneeded nesting in order to produce a more
    efficient markup, but if you want to use CSS to style the elements
    as if they were MathML, you might need to set this to true.

.. describe:: EqnChunk: 50
              EqnChunkFactor: 1.5
	      EqnChunkDelay: 100

    These values control how "chunky" the display of mathematical
    expressions will be; that is, how often the equations will be
    updated as they are processed.
    
    ``EqnChunk`` is the number of equations that will be typeset before
    they appear on screen.  Larger values make for less visual flicker
    as the equations are drawn, but also mean longer delays before the
    reader sees anything.
    
    ``EqChunkFactor`` is the factor by which the ``EqnChunk`` will
    grow after each chunk is displayed.
    
    ``EqChunkDelay`` is the time (in milliseconds) to delay between
    chunks (to allow the browser to respond to other user
    interaction).
    
    Set ``EqnChunk`` to 1, ``EqnChunkFactor`` to 1, and
    ``EqnChunkDelay`` to 10 to get the behavior from MathJax v1.1 and
    below.

.. describe:: linebreaks: {}

    This is an object that configures automatic linebreaking in the
    SVG output.  In order to be backward compatible with earlier
    versions of MathJax, only explicit line breaks are performed by
    default, so you must enable line breaks if you want automatic
    ones.  The object contains the following values:

    .. describe:: automatic: false

        This controls the automatic breaking of expressions: when
        ``false``, only ``linebreak="newline"`` is processed; when
        ``true``, line breaks are inserted automatically in long
        expressions.

    .. describe:: width: "container"

      This controls how wide the lines of mathematics can be.
      
      Use an explicit width like ``"30em"`` for a fixed width.
      Use ``"container"`` to compute the size from the containing
      element.
      Use ``"nn% container"`` for a portion of the container.
      Use ``"nn%"`` for a portion of the window size.
        
      The container-based widths may be slower, and may not produce
      the expected results if the layout width changes due to the
      removal of previews or inclusion of mathematics during
      typesetting.

.. describe:: styles: {}

    This is a list of CSS declarations for styling the SVG output.
    See the definitions in ``jax/output/SVG/config.js`` for some
    examples of what are defined by default.  See :ref:`CSS Style
    Objects <css-style-objects>` for details on how to specify CSS
    style in a JavaScript object.

.. describe:: tooltip: { ... }

    This sets the configuration options for ``<maction>`` elements
    with ``actiontype="tooltip"``.  (See also the ``#MathJax_Tooltip``
    style setting in ``jax/output/SVG/config.js``, which can be
    overridden using the ``styles`` option above.)

    The ``tooltip`` section can contain the following options:

    .. describe:: delayPost: 600

        The delay (in milliseconds) before the tooltip is posted after
        the mouse is moved over the ``maction`` element.

    .. describe:: delayClear: 600

        The delay (in milliseconds) before the tooltop is cleared
        after the mouse moves out of the ``maction`` element.

    .. describe:: offsetX: 10
                  offsetY: 5

        These are the offset from the mouse position (in pixels) 
	where the tooltip will be placed.
