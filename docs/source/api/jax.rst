.. _api-jax:

******************
The Base Jax Class
******************

The `MathJax.InputJax`, `MathJax.OutputJax` and `MathJax.ElementJax`
classes are all subclasses of the base `Jax` class in MathJax.  This
is a private class that implements the methods common to all three
other jax classes.

Unlike most MathJax.Object classes, calling the class object creates a
*subclass* of the class, rather than an instance of the class.  E.g., 

.. code-block:: javascript

    MathJax.InputJax.MyInputJax = MathJax.InputJax({
      id: "MyInputJax",
      version: "1.0",
      ...
    });

creates ``MathJax.InputJax.MyInputJax`` as a subclass of ``MathJax.InputJax``.


Class Properties
================

.. describe:: directory

    The name of the jax directory (usually ``"[MathJax]/jax"``).
    Overridden in the subclass to be the specific directory for the
    class, e.g. ``"[MathJax]/jax/input"``.

.. describe:: extensionDir

    The name of the extensions directory (usually ``"[MathJax]/extensions"``).
  

Instance Properties
===================

.. describe:: id

    The name of the jax.

.. describe:: version

    The version number of the jax.

.. describe:: directory

    The directory for the jax (e.g., ``"[MathJax]/jax/input/TeX"``).

.. describe:: require: null

    An array of files to load before the ``jax.js`` file calls the
    :meth:`MathJax.Ajax.loadComplete()` method.

.. describe:: config: {}

    An object that contains the default configuration options for the
    jax.  These can be modified by the author by including a
    configuration subsection for the specific jax in question.

.. describe:: JAXFILE: "jax.js"

    The name of the file that contains the main code for the jax.

Methods
=======

.. Method:: Translate(script)

    This is a stub for a routine that should be defined by the jax's
    ``jax.js`` file when it is loaded.  It should perform the translation
    action for the specific jax.  For an input jax, it should return the
    `ElementJax` object that it created.  The :meth:`Translate()` method is
    never called directly by MathJax; during the ``loadComplete()``
    call, this function is copied to the :meth:`Process()` method, and is
    called via that name.  The default :meth:`Translate()` method throws an
    error indicating that the :meth:`Translate()` method was not
    redefined.  That way, if the ``jax.js`` file fails to load for some
    reason, you will receive an error trying to process mathematics with
    this jax.

    :Parameters:
        - **script** --- reference to the DOM ``<script>`` object for
                         the mathematics to be translated
    :Returns: an `ElementJax` object, or ``null``

.. Method:: Register(mimetype)

    This method is overridden in the `InputJax`, `OutputJax` and
    `ElementJax` subclasses to handle the registration of those
    classes of jax.

    :Parameters:
        - **mimetype** --- the MIME-type to be associated with the jax
    :Returns: ``null``

.. Method:: Config()
    :noindex:

    Inserts the configuration block for this jax from the author's
    configuration specification into the jax's ``config`` property.
    If the configuration includes an ``Augment`` object, that is used
    to augment the jax (that is, the configuration can override the
    methods of the object, as well as the data).  This is called
    automatically during the loading of the ``jax.js`` file.

.. Method:: Startup()

    This is a method that can be overridden in the subclasses to
    perform initialization at startup time (after the configuration
    has occurred).

.. Method:: loadComplete (file)
    :noindex:

    This is called by the ``config.js`` and ``jax.js`` files when they
    are completely loaded and are ready to signal that fact to
    MathJax.  For ``config.js``, this simply calls the
    :meth:`MathJax.Ajax.loadComplete()` method for the ``config.js``
    file.  For ``jax.js``, the actions performed here are the
    following:

       1. Post the "[name] Jax Config" message to the startup signal.
       2. Perform the jax's :meth:`Config()` method.
       3. Post the "[name] Jax Require" message to the startup signal.
       4. Load the files from the jax's ``require`` and 
          ``config.extensions`` arrays.
       5. Post the "[name] Jax Startup" message to the startup signal.
       6. Perform the jax's :meth:`Startup()` method.
       7. Post the "[name] Jax Ready" message to the startup signal.
       8. Copy the ``preTranslate``, ``Translate``, and
          ``postTranslate`` functions to ``preProcess``, ``Process``,
	  and ``postProcess``.
       9. Perform the :meth:`MathJax.Ajax.loadComplete()` call for the
          ``jax.js`` file.

    Note that the configuration process (the :meth:`Config()` call) can 
    modify the ``require`` or ``config.extensions`` arrays to add more 
    files that need to be loaded, and that the :meth:`Startup()` method 
    isn't called until those files are completely loaded.

