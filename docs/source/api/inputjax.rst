.. _api-input-jax:

**************************
The MathJax.InputJax Class
**************************

Input jax are the components of MathJax that translate
mathematics from its original format (like :term:`TeX` or
:term:`MathML`) to the MathJax internal format (an `element jax`).

An input jax is stored as a pair of files in a subdirectory of the
``jax/input`` directory, with the subdirectory name being the name of
the input jax.  For example, the TeX input jax is stored in
`jax/input/TeX`.  The first file, ``config.js``, is loaded when
MathJax is being loaded and configured, and is indicated by listing
the input jax directory in the `jax` array of the MathJax
configuration.  The ``config.js`` file creates a subclass of the
`MathJax.InputJax` object for the new input jax and registers that
with MathJax, along with the MIME-type that will be used to indicate
the mathematics that is to be processed by the input jax.

The main body of the input jax is stored in the second file,
``jax.js``, which is loaded when the input jax is first called on to
translate some mathematics.  This file augments the original input jax
subclass with the additional methods needed to do the translation.
MathJax calls the input jax's :meth:`Translate()` method when it needs
the input jax to translate the contents of a math ``<script>`` tag.

The `MathJax.InputJax` class is a subclass of the :ref:`MathJax Jax
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

    The directory where the jax files are stored (e.g., ``"[MathJax]/jax/input/TeX"``).

.. describe:: elementJax

    The name of the ElementJax class that this input jax will produce 
    (typically ``mml``, as that is the only ElementJax at the moment).


Methods
=======

.. Method:: Process(script,state)
    :noindex:

    This is the method that the ``MathJax.Hub`` calls when it needs
    the input jax to process the given math ``<script>``.  Its default
    action is to do the following:

    1. Start loading any element jax  specified in the ``elementJax`` array;
    2. Start loading the jax's ``jax.js`` file;
    3. Start loading the required output jax (so it is ready when needed); and
    4. Redefine itself to simply return the callback for the load operation 
       (so that further calls to it will cause the processing to wait for the 
       callback).

    Once the ``jax.js`` file has loaded, this method is replaced by
    the jax's ``Translate()`` method (see below), so that
    subsequent calls to ``Process()`` will perform the appropriate
    translation.

    :Parameters:
        - **script** --- reference to the DOM ``<script>`` object for
                         the mathematics to be translated
        - **state** --- a structure containing information about the
                        current proccessing state of the mathematics
                        (internal use)
    :Returns: an `ElementJax` object, or ``null``

.. Method:: Translate(script,state)
    :noindex:

    This is the main routine called by MathJax when a ``<script>`` of the
    appropriate type is found.  The default :meth:`Translate()` method
    throws an error indicating that :meth:`Translate()` hasn't been
    defined, so when the ``jax.js`` file loads, it should override the
    default :meth:`Translate()` with its own version that does the actual
    translation. 

    The translation process should include the creation of an
    :ref:`Element Jax <api-element-jax>` that stores the data needed
    for this element.

    :Parameters:
        - **script**  --- the ``<script>`` element to be translated
        - **state** --- a structure containing information about the
                        current proccessing state of the mathematics
                        (internal use)
    :Returns: the `element jax` resulting from the translation
 
.. Method:: Register(mimetype)
    :noindex:

    This registers the MIME-type associated with this input jax so
    that MathJax knows to call this input jax when it sees a
    ``<script>`` of that type.  An input jax can register more than
    one type, but it will be responsible for distinguishing elements
    of the various types from one another.

    :Parameters:
        - **mimetype** --- the MIME-type of the input this jax processes
    :Returns: ``null``

.. Method:: needsUpdate(jax)
    :noindex:

    This implements the element jax's ``needsUpdate()`` method, and
    returns ``true`` if the ``jax`` needs to be rerendered (i.e., the
    text has changed), and ``false`` otherwise.

    :Perameters:
        - **jax** --- the element jax to be checked
    :Returns: ``true`` if the jax's text has changed, ``false`` otherwise

