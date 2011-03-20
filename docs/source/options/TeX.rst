.. _configure-TeX:

***********************
The TeX input processor
***********************

The options below control the operation of the TeX input processor
that is run when you include ``"input/TeX"`` in the `jax` array of
your configuration.  They are listed with their default values.  To
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
    
.. describe:: Macros: {}

   This lists macros to define before the TeX input processor begins.
   These are name:value pairs where the `name` gives the name of the TeX
   macro to be defined, and `value` gives the replacement text for the
   macro.  The `value` can be an array of the form `[value,n]`, where
   `value` is the replacement text and `n` is the number of parameters
   for the macro.  Note that since the `value` is a javascript string,
   backslashes in the replacement text must be doubled to prevent them
   from acting as javascript escape characters.

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
