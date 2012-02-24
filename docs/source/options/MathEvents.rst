.. _configure-MathEvents:

************************
The MathEvents extension
************************

The options below control the operation of the MathEvents component that
allows handles mouse and menu events attached to mathematics that is
typeset by MathJax.  They are listed with their
default values.  To set any of these options, include a ``MathEvents``
section in your :meth:`MathJax.Hub.Config()` call.  For example

.. code-block:: javascript

    MathJax.Hub.Config({
      MathEvents: {
        hover: 400
      }
    });

would set the required delay for hovering over a math element to
400 milliseconds.

.. describe:: hover: 500

    This value is the time (in milliseconds) that a user must hold the
    mouse still over a math element before it is considered to be
    hovering over the math.

.. describe:: styles: {}

    This is a list of CSS declarations for styling the zoomed
    mathematics.  See the definitions in ``extensions/MathEvents.js``
    for details of what are defined by default.  See :ref:`CSS Style
    Objects <css-style-objects>` for details on how to specify CSS
    style in a JavaScript object.

