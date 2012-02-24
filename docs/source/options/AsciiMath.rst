.. _configure-AsciiMath:

*****************************
The AsciiMath input processor
*****************************

The options below control the operation of the AsciiMath input
processor that is run when you include ``"input/AsciiMath"`` in the
`jax` array of your configuration or load a combined configuration
file that includes the AsciiMath input jax.  They are listed with
their default values.  To set any of these options, include a
``AsciiMath`` section in your :meth:`MathJax.Hub.Config()` call.  For
example

.. code-block:: javascript

    MathJax.Hub.Config({
      AsciiMath: {
        displaystyle: false
      }
    });

would set the ``displaystyle`` configuration option so that the limits
for operators like summation symbols will appear next to them rather
than above and below.

.. describe:: displaystyle: true

    Determines whether operators like summation symbols will have
    their limits above and below the operators (true) or to their
    right (false).  The former is how they would appear in displayed
    equations that appear on their own lines, while the latter is
    better suited to in-line equations so that they don't interfere
    with the line spacing so much.

.. describe:: decimal: "."

    This is the character to be used for decimal points in numbers.
    if you change this to ``","``, then you need to be careful about
    entering points or intervals.  E.g., use ``(1, 2)`` rather than
    ``(1,2)`` in that case.
