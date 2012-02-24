.. _api-output-jax:

***************************
The MathJax.OutputJax Class
***************************

Output jax are the components of MathJax that translate
mathematics from the MathJax internal format (an `element jax`)
to whatever output is required to represent the mathematics (e.g.,
MathML elements, or HTML-with-CSS that formats the mathematics on screen).

An output jax is stored as a pair of files in a subdirectory of the
the ``jax/output`` directory, with the subdirectory name being the
name of the output jax.  For example, the NativeMML output jax is
stored in `jax/output/NativeMML`.  The first file, ``config.js``, is
loaded when MathJax is being loaded and configured, and is indicated
by listing the input jax directory in the `jax` array of the MathJax
configuration.  The ``config.js`` file creates a subclass of the
`MathJax.OutputJax` object for the new output jax and registers it
with MathJax, along with the MIME-type of the element jax that it can
process.

The main body of the output jax is stored in the second file, ``jax.js``,
which is loaded when the output jax is first called on to translate
some mathematics.  This file augments the original output jax
subclass with the additional methods needed to produce the output.
MathJax calls the input jax's :meth:`Translate()` method when it needs
the output jax to translate an element jax to produce output.

The `MathJax.OutputJax` class is a subclass of the :ref:`MathJax Jax
<api-jax>` class, and inherits the properties and methods of that
class.  Those listed below are the additional or overridden ones from
that class.


Properties
==========

.. describe:: id

    The name of the jax.

.. describe:: version

    The version number of the jax.

.. describe:: directory

    The directory where the jax files are stored (e.g., ``"[MathJax]/jax/output/HTML-CSS"``);

.. describe:: fontDir

    The directory where the fonts are stored (e.g., ``"[MathJax]/fonts"``)

.. describe:: imageDir

    The directory where MathJax images are found (e.g. ``"[MathJax]/images"``)


Methods
=======

.. Method:: preProcess(state)

    This is called by ``MathJax.Hub`` to ask the output processor to
    prepare to process math scripts.  Its default action is to start
    loading the jax's ``jax.js`` file, and redefine itself to simply
    return the callback for the load operation (so that further calls
    to it will cause the processing to wait for the callback).

    Once the ``jax.js`` file has loaded, this method is replaced by
    the jax's :meth:`preTranslate()` method, so that subsequent calls
    to :meth:`preProcess()` will perform the appropriate translation.

    :Parameters:
        - **state** --- a structure containing information about the
                        current proccessing state of the mathematics
    :Returns: ``null``

.. Method:: preTranslate(state)

    This routine replaces :meth:`preProcess()` above when the jax's
    ``jax.js`` file is loaded.  It is called by ``MathJax.Hub`` to ask
    the output processor to prepare to process math scripts.  (For
    example, the HTML-CSS output jax uses this to determine em-sizes
    for all the mathematics at once, to minimize page reflows that
    slow down Internet Explorer.)

    The routine can use ``state.jax[this.id]`` to obtain the array of
    element jax that are to be processed.  The output jax can use the
    ``state`` variable to maintain its own state information, but
    any properties that it adds to the variable should have a prefix
    that is the output jax's ID.  For example, the HTML-CSS output jax
    might use ``state.HTMLCSSlast`` to keep track of the last equation
    it processed, or could add ``state.HTMLCSS = {...}`` to create an
    object of its own within the state variable.

    :Parameters:
        - **state** --- a structure containing information about the
                        current proccessing state of the mathematics
    :Returns: ``null``

.. Method:: Translate(script,state)
    :noindex:

    This is the main routine called by MathJax when an element jax is
    to be converted to output.  The default :meth:`Translate()`
    method throws an error indicating that :meth:`Translate()` hasn't been
    defined, so when the ``jax.js`` file loads, it should override the
    default :meth:`Translate()` with its own version that does the actual
    translation.

    You should use ``MathJax.Hub.getJaxFor(script)`` to obtain the
    element jax for the given script.  The translation process may 
    modify the element jax (e.g., if it has data that needs to be
    stored with the jax), and may insert DOM elements into the
    document near the jax's ``<script>`` tag.  The output jax can use
    the ``state`` variable to maintain information about its
    processing state, but see :meth:`preTranslate()` above for naming
    conventions for properties that are added.

    :Parameters:
        - **script**  --- the ``<script>`` element to be translated
        - **state** --- a structure containing information about the
                        current proccessing state of the mathematics
    :Returns: the `element jax` resulting from the translation
 
.. Method:: postTranslate(state)

    This routines is called by ``MathJax.Hub`` when the translation
    of math elements is complete, and can be used by the output
    processor to finalize any actions that it needs to complete.
    (For example, making the mathematics visible, or forcing a reflow
    of the page.)

    The routine can use ``state.jax[this.id]`` to obtain the array of
    element jax that were processed, or can use the ``state`` variable
    to store its own state information (see :meth:`preProcess()`
    above for caveats about naming properties).

    :Parameters:
        - **state** --- a structure containing information about the
                        current proccessing state of the mathematics
    :Returns: ``null``

.. Method:: Register(mimetype)
    :noindex:

    This registers the MIME-type for the element jax associated with
    this output jax so that MathJax knows to call this jax when it
    wants to display an element jax of that type.  Several output jax
    may register for the same input jax, in which case the first one
    to register will be the default one for that type.

    :Parameters:
        - **mimetype** --- the MIME-type of the input this jax processes
    :Returns: ``null``

.. Method:: Remove(jax)
    :noindex:

    Removes the output associated with the given element jax.  The
    routine can use ``jax.SourceElement()`` to locate the ``<script>``
    tag associated with the element jax.

    :Parameters:
        - **jax** --- the element jax whose display should be removed
    :Returns: ``null``


If an output jax wants its output to handle the contextual menu item
and zooming, then it needs to tie into the event-handling code
(`MathEvents`) and the zoom-handling code (`MathZoom`).  That requires
the following methods.

.. Method:: getJaxFromMath(math)

    This is called by the event-handling code (`MathEvents`) to get
    the element jax associated with the DOM element that caused an
    event to occur.  The output jax will have attached event handlers
    to some DOM element that is part of its output, and the
    `MathEvents` code uses this routine to map back to the jax
    associated with that output.

    :Parameters:
        - **math** --- a DOM element that triggered a DOM event
                       (e.g., a mouse click)
    :Returns: the `ElementJax` structure associated with the DOM element

.. Method:: Zoom(jax,span,math,Mw,Mh)

    This routine is called by the zoom-handling code (`MathZoom`)
    when an expression has received its zoom trigger event (e.g., a
    double-click).  The ``jax`` is the math that needs to be zoomed,
    ``span`` is a ``<span>`` element in which the zoomed version of
    the math should be placed, ``math`` is the DOM element that
    received the zoom trigger event, and ``Mw`` and ``Mh`` are the
    maximum width and height allowed for the zoom box (the ``span``).

    The return value is an object with the following properties:

    - ``Y`` --- the vertical offset from the top of the ``span`` to
                the baseline of the mathematics
    - ``mW`` --- the width of the original mathematics element
    - ``mH`` --- the height of the original mathematics element
    - ``zW`` --- the width of the zoomed math
    - ``zH`` --- the height of the zoomed math

    All of these values are in pixels.

    :Parameters:
        - **jax** --- the jax to be zoomed
	- **span** --- the ``<span>`` in which to place the zoomed math
    	- **math** --- the DOM element generating the zoom event
	- **Mw** --- the maximum width of the zoom box
	- **Mh** --- the maximum height of the zoom box
    :Returns: a structure as described above

