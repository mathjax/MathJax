.. _configure-MathZoom:

**********************
The MathZoom extension
**********************

The options below control the operation of the Math-Zoom feature that
allows users to see an enlarged version of the mathematics when they
click or hover over typeset mathematics.  They are listed with their
default values.  To set any of these options, include a ``MathZoom``
section in your :meth:`MathJax.Hub.Config()` call.  For example

.. code-block:: javascript

    MathJax.Hub.Config({
      MathZoom: {
        styles: {
          "#MathJax_Zoom": {
	    "background-color": "#0000F0"
          }
        }
      }
    });

would set the background color of the Zoom box to a very light blue.

Mathematics is zoomed when the user "triggers" the zoom by an action,
either clicking on the mathematics, double-clicking on it, or holding
the mouse still over it (i.e., "hovering").  Which trigger is used is
set by the user via the math contextual menu (or by the author using
the ``menuSettings`` configuration section of the `core configuration
options <configure-hub>`).

.. describe:: delay: 500

   This value is now stored as the ``hover`` parameter in the
   :ref:`MathEvents <configure-MathEvents>` configuration options, and
   will have no effect if given here.

.. describe:: styles: {}

    This is a list of CSS declarations for styling the zoomed
    mathematics.  See the definitions in ``extensions/MathZoom.js``
    for details of what are defined by default.  See :ref:`CSS Style
    Objects <css-style-objects>` for details on how to specify CSS
    style in a JavaScript object.

