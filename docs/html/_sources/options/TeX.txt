.. _configure-TeX:

***********************
The TeX input processor
***********************

The options below control the operation of the TeX input processor
that is run when you include ``"input/TeX"`` in the `jax` array of
your configuration or load a combined configuration file that includes
the TeX input jax.  They are listed with their default values.  To
set any of these options, include a ``TeX`` section in your
:meth:`MathJax.Hub.Config()` call.  For example

.. code-block:: javascript

    MathJax.Hub.Config({
      TeX: {
        Macros: {
	  RR: '{\\bf R}',
	  bold: ['{\\bf #1}', 1]
	}
      }
    });

would set the ``Macros`` configuration option to cause two new macros
to be defined within the TeX input processor.

.. describe:: TagSide: "right"

    This specifies the side on which ``\tag{}`` macros will place the
    tags.  Set it to ``"left"`` to place the tags on the left-hand side.

.. describe:: TagIndent: ".8em"

    This is the amount of indentation (from the right or left) for the
    tags produced by the ``\tag{}`` macro.

.. describe:: MultLineWidth: "85%"

    The width to use for the `multline` environment that is part of
    the ``AMSmath`` extension.  This width gives room for tags at
    either side of the equation, but if you are displaying mathematics
    in a small area or a thin column of text, you might need to change
    the value to leave sufficient margin for tags.

.. describe:: equationNumbers: {}

    This object controls the automatic equation numbering and the
    equation referencing.  It contains the following values:

    .. describe:: autoNumber: "none"

        This controls whether equations are numbered and how.  By
        default it is set to ``"none"`` to be compatible with earlier
        versions of MathJax where auto-numbering was not performed (so
        pages will not change their appearance).  You can change
        this to ``"AMS"`` for equations numbered as the `AMSmath`
        package would do, or ``"all"`` to get an equation number for
        every displayed equation.

    .. describe:: formatNumber: function (n) {return n}

        A function that tells MathJax what tag to use for equation
        number ``n``.  This could be used to have the equations labeled
        by a sequence of symbols rather than numbers, or to use section
        and subsection numbers instead.

    .. describe:: formatTag: function (n) {return '('+n+')'}

        A function that tells MathJax how to format an equation number
        for displaying as a tag for an equation.  This is what appears
	in the margin of a tagged or numbered equation.

    .. describe:: formatID: function {return 'mjx-eqn-'+String(n).replace(/[:'"<>&]/g,"")}

        A function that rells MathJax what ID to use as an anchor for
        the equation (so that it can be used in URL references).

    .. describe:: formatURL: function (id) {return '#'+escape(id)}

        A function that takes an equation ID and returns the URL to
        link to it.

    .. describe:: useLabelIds: true

        This controls whether element ID's use the ``\label`` name or
        the equation number.  When ``true``, use the label, when
        ``false``, use the equation number.

    See the `MathJax examples page
    <http://cdn.mathjax.org/mathjax/latest/test/examples.html>`_ for
    some examples of equation numbering.
    
.. describe:: Macros: {}

    This lists macros to define before the TeX input processor begins.
    These are `name:value` pairs where the `name` gives the name of
    the TeX macro to be defined, and `value` gives the replacement
    text for the macro.  The `value` can be an array of the form
    `[value,n]`, where `value` is the replacement text and `n` is the
    number of parameters for the macro.  Note that since the `value`
    is a javascript string, backslashes in the replacement text must
    be doubled to prevent them from acting as javascript escape
    characters.

    For example,

    .. code-block:: javascript
 
        Macros: {
          RR: '{\\bf R}',
	  bold: ['{\\bf #1}', 1]
        }

    would ask the TeX processor to define two new macros:  ``\RR``,
    which produces a bold-face "R", and ``\bold{...}``, which takes one
    parameter and sets it in the bold-face font.

.. describe:: MAXMACROS: 10000

    Because a definition of the form ``\def\x{\x} \x`` would cause MathJax 
    to loop infinitely, the `MAXMACROS` constant will limit the number of 
    macro substitutions allowed in any expression processed by MathJax.  

.. describe:: MAXBUFFER: 5*1024

    Because a definition of the form ``\def\x{\x aaa} \x`` would loop 
    infinitely, and at the same time stack up lots of a's in MathJax's 
    equation buffer, the `MAXBUFFER` constant is used to limit the size of 
    the string being processed by MathJax.  It is set to 5KB, which should 
    be sufficient for any reasonable equation.
