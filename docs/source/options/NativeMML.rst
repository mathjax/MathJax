.. _configure-NativeMML:

******************************
The NativeMML output processor
******************************

The options below control the operation of the NativeMML output
processor that is run when you include ``"output/NativeMML"`` in the
`jax` array of your configuration or load a combined configuration
file taht includes the NativeMML output jax.  They are listed with
their default values.  To set any of these options, include a
``NativeMML`` section in your :meth:`MathJax.Hub.Config()` call.  For
example

.. code-block:: javascript

    MathJax.Hub.Config({
      NativeMML: {
        scale: 105
      }
    });

would set the ``scale`` option to 105 percent.

.. describe:: scale: 100

    The scaling factor (as a percentage) of math with respect to the
    surrounding text.  The `NativeMML` output processor tries to match
    the ex-size of the mathematics with that of the text where it is
    placed, but you may want to adjust the results using this scaling
    factor.  The user can also adjust this value using the contextual
    menu item associated with the typeset mathematics.

.. describe:: minScaleAdjust: 50

   This gives a minimum scale (as a percent) for the scaling used by 
   MathJax to match the equation to the surrounding text.  This will 
   prevent MathJax from making the mathematics too small.

.. describe:: showMathMath: true
              showMathMenuMSIE: true

    These values have been moved to the core configuration block, since
    it applies to all output jax, but they will still be honored (for
    now) if it is set here.  See the :ref:`Core configuration options
    <configure-hub>` for more details.

.. describe:: styles: {}

    This is a list of CSS declarations for styling the NativeMML
    output.  See the definitions in ``jax/output/NativeMML/config.js``
    for some examples of what are defined by default.  See :ref:`CSS
    Style Objects <css-style-objects>` for details on how to specify
    CSS style in a JavaScript object.
