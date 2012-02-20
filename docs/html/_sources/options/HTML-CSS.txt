.. _configure-HTML-CSS:

*****************************
The HTML-CSS output processor
*****************************

The options below control the operation of the HTML-CSS output
processor that is run when you include ``"output/HTML-CSS"`` in the
`jax` array of your configuration or load a combined configuration
file that includes the HTML-CSS output jax.  They are listed with
their default values.  To set any of these options, include a
``"HTML-CSS"`` section in your :meth:`MathJax.Hub.Config()` call.
Note that, because of the dash, you need to enclose the name in
quotes.  For example

.. code-block:: javascript

    MathJax.Hub.Config({
      "HTML-CSS": {
        preferredFont: "STIX"
      }
    });

would set the ``preferredFont`` option to the :term:`STIX` fonts.

.. describe:: scale: 100

    The scaling factor (as a percentage) of math with respect to the
    surrounding text.  The `HTML-CSS` output processor tries to match
    the ex-size of the mathematics with that of the text where it is
    placed, but you may want to adjust the results using this scaling
    factor.  The user can also adjust this value using the contextual
    menu item associated with the typeset mathematics.

.. describe:: minScaleAdjust: 50

   This gives a minimum scale (as a percent) for the scaling used by 
   MathJax to match the equation to the surrounding text.  This will 
   prevent MathJax from making the mathematics too small.

.. describe:: availableFonts: ["STIX","TeX"]

    This is a list of the fonts to look for on a user's computer in
    preference to using MathJax's web-based fonts.  These must
    correspond to directories available in the
    ``jax/output/HTML-CSS/fonts`` directory, where MathJax stores data
    about the characters available in the fonts.  Set this to
    ``["TeX"]``, for example, to prevent the use of the :term:`STIX`
    fonts, or set it to an empty list, `[]`, if you want to force
    MathJax to use web-based or image fonts.

.. describe:: preferredFont: "TeX"

    Which font to prefer out of the ``availableFonts`` list, when more
    than one is available on the user's computer.

.. describe:: webFont: "TeX"

    This is the web-based font to use when none of the fonts listed
    above are available on the user's computer.  Note that currently
    only the `TeX` font is available in a web-based form (they are
    stored in the ``fonts/HTML-CSS`` folder in the MathJax directory).
    Set this to ``null`` to disable web fonts.
    
.. describe:: imageFont: "TeX"

    This is the font to use for image fallback mode (when none of the
    fonts listed above are available and the browser doesn't support
    web-fonts via the ``@font-face`` CSS directive).  Note that currently
    only the TeX font is available as an image font (they are stored
    in the ``fonts/HTML-CSS`` directory).

    Set this to ``null`` if you want to prevent the use of image fonts
    (e.g., you have deleted or not installed the image fonts on your
    server).  In this case, only browsers that support web-based fonts
    will be able to view your pages without having the fonts installed
    on the client computer.  The browsers that support web-based fonts
    include: IE6 and later, Chrome, Safari3.1 and above, Firefox3.5
    and later, and Opera10 and later.  Note that Firefox3.0 is **not**
    on this list.

.. describe:: undefinedFamily: "STIXGeneral, 'Arial Unicode MS', serif"

    This is the font-family CSS value used for characters that are not
    in the selected font (e.g., for web-based fonts, this is where to
    look for characters not included in the MathJax web fonts).  IE
    will stop looking after the first font that exists on the system
    (even if it doesn't contain the needed character), so order these
    carefully.

.. describe:: mtextFontInherit: false

    This setting controls whether ``<mtext>`` elements will be typeset
    using the math fonts or the font of the surrounding text.  When
    ``false``, the font for ``mathvariant="normal"`` will be used;
    when ``true``, the font will be inherited from the surrounding
    paragraph.

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
    HTML-CSS output.  In order to be backward compatible with earlier
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

    This is a list of CSS declarations for styling the HTML-CSS
    output.  See the definitions in ``jax/output/HTML-CSS/config.js``
    for some examples of what are defined by default.  See :ref:`CSS
    Style Objects <css-style-objects>` for details on how to specify
    CSS style in a JavaScript object.

.. describe:: showMathMenu: true

    This value has been moved to the core configuration block, since
    it applies to all output jax, but it will still be honored (for
    now) if it is set here.  See the :ref:`Core configuration options
    <configure-hub>` for more details.

.. describe:: tooltip: { ... }

    This sets the configuration options for ``<maction>`` elements
    with ``actiontype="tooltip"``.  (See also the ``#MathJax_Tooltip``
    style setting in ``jax/output/HTML-CSS/config.js``, which can be
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
