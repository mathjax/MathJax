.. _configure-asciimath2jax:

******************************
The asciimath2jax Preprocessor
******************************

The options below control the operation of the `asciimath2jax` preprocessor
that is run when you include ``"asciimath2jax.js"`` in the `extensions` array
of your configuration.  They are listed with their default values.  To
set any of these options, include a ``asciimath2jax`` section in your
:meth:`MathJax.Hub.Config()` call.  For example

.. code-block:: javascript

    MathJax.Hub.Config({
      asciimath2jax: {
        delimiters: [['`','`'], ['$','$']]
      }
    });

would set the ASCIIMath delimiters for the `asciimath2jax`
preprocessor to include dollar signs as well as back-ticks.


.. describe:: delimiters: [['`','`']]

    Array of pairs of strings that are to be used as math
    delimiters.  The first in each pair is the initial delimiter and
    the second is the terminal delimiter.  You can have as many pairs
    as you want.  For example,

    .. code-block:: javascript

        inlineMath: [ ['$','$'], ['`','`'] ]

    would cause `asciimath2jax` to look for ``$...$`` and ```...``` as
    delimiters for inline mathematics.  (Note that the single dollar
    signs are not enabled by default because they are used too
    frequently in normal text, so if you want to use them for math
    delimiters, you must specify them explicitly.)

    Note that the delimiters can't look like HTML tags (i.e., can't
    include the less-than sign), as these would be turned into tags by
    the browser before MathJax has the chance to run.  You can only
    include text, not tags, as your math delimiters.

.. describe:: preview: "AsciiMath"

    This controls whether `asciimath2jax` inserts ``MathJax_Preview``
    spans to make a preview available, and what preview to use, when
    it locates in-line or display mathematics in the page.  The
    default is ``"AsciiMath"``, which means use the ASCIIMath code as
    the preview (which will be visible until it is processed by
    MathJax).  Set to ``"none"`` to prevent previews from being
    inserted (the math will simply disappear until it is typeset).
    Set to an array containing the description of an HTML snippet in
    order to use the same preview for all equations on the page.

    Examples:

    .. code-block:: javascript

        preview: ["[math]"],     //  insert the text "[math]" as the preview

    .. code-block:: javascript

        preview: [["img",{src: "/images/mypic.jpg"}]],  // insert an image as the preview

    See the :ref:`description of HTML snippets <html-snippets>` for
    details on how to represent HTML code in this way.

.. describe:: skipTags: ["script","noscript","style","textarea","pre","code"]

    This array lists the names of the tags whose contents should not
    be processed by `asciimath2jax` (other than to look for
    ignore/process classes as listed below).  You can add to (or
    remove from) this list to prevent MathJax from processing
    mathematics in specific contexts.

.. describe:: ignoreClass: "asciimath2jax_ignore"

    This is the class name used to mark elements whose contents should
    not be processed by asciimath2jax (other than to look for the
    ``processClass`` pattern below).  Note that this is a regular
    expression, and so you need to be sure to quote any `regexp`
    special characters.  The pattern is inserted into one that
    requires your pattern to match a complete word, so setting
    ``ignoreClass: "class2"`` would cause it to match an element with
    ``class="class1 class2 class3"`` but not ``class="myclass2"``.
    Note that you can assign several classes by separating them by the
    vertical line character (``|``).  For instance, with
    ``ignoreClass: "class1|class2"`` any element assigned a class of
    either ``class1`` or ``class2`` will be skipped.

.. describe:: processClass: "asciimath2jax_process"

    This is the class name used to mark elements whose contents
    *should* be processed by `asciimath2jax`.  This is used to restart
    processing within tags that have been marked as ignored via the
    ``ignoreClass`` or to cause a tag that appears in the ``skipTags``
    list to be processed rather than skipped.  Note that this is a
    regular expression, and so you need to be sure to quote any
    `regexp` special characters.  The pattern is inserted into one
    that requires your pattern to match a complete word, so setting
    ``processClass: "class2"`` would cause it to match an element with
    ``class="class1 class2 class3"`` but not ``class="myclass2"``.
    Note that you can assign several classes by separating them by the
    vertical line character (``|``).  For instance, with
    ``processClass: "class1|class2"`` any element assigned a class of
    either ``class1`` or ``class2`` will have its contents processed.
