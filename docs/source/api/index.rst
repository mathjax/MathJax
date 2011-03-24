.. _mathjax-api:

===============
The MathJax API
===============

The following links document the various components that make up
MathJax.  These are implemented as JavaScript objects contained within
the single global variable, ``MathJax``.  Although JavaScript includes
an object system with some inheritance capabilities, they do not
constitute a full object-oriented programming model, so MathJax
implements its own object library.  This means there is an ambiguity
when we speak of an "object", as it could be either a native
JavaScript object, or a MathJax object.  When the distinction is
importat, we will use `Object` (capitalized) or `MathJax.Object` for
the latter; the javascript object will always be listed in lower
case.

You may also want to view the :ref:`advanced topics <advanced-topics>`
on the main MathJax documentation page.


.. toctree::
    :maxdepth: 1
   
    The MathJax variable <variable>
    The MathJax.Hub object <hub>
    The MathJax.Ajax object <ajax>
    The MathJax.Message object <message>
    The MathJax.HTML object <html>
    The MathJax.CallBack class <callback>
    The MathJax.CallBack.Queue class <queue>
    The MathJax.CallBack.Signal class <signal>

.. toctree::
    :maxdepth: 1

    The MathJax.InputJax class <inputjax>
    The MathJax.OutputJax class <outputjax>
    The MathJax.ElementJax class <elementjax>
    The base Jax class <jax>
   
.. toctree::
    :maxdepth: 1
   
    The MathJax Object-Oriented Programming Model <object>
