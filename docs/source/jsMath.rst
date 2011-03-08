.. _jsMath-support:

*********************************
Converting to MathJax from jsMath
*********************************

MathJax is the successor to the popular `jsMath
<http://www.math.union.edu/locate/jsMath/>`_ package for rendering
mathematics in web pages.  Like jsMath, MathJax works by locating and
processing the mathematics within the webpage once it has been loaded
in the browser by a user viewing your web pages.  If you are using
jsMath with its ``tex2math`` preprocessor, then switching to MathJax
should be easy, and is simply a matter of configuring MathJax
appropriately.  See the section on :ref:`Loading and Configuring MathJax
<loading>` for details.

On the other hand, if you are using jsMath's ``<span
class="math">...</span>`` and ``<div class="math">...</div>`` tags to
mark the mathematics in your document, then you should use MathJax's
``jsMath2jax`` preprocessor when you switch to MathJax.  To do this,
include ``"jsMath2jax.js"`` in the `extensions` array of your
configuration, with the `jax` array set to include ``"input/TeX"``.  For 
example,

.. code-block:: html

    <script type="text/x-mathjax-config">
       MathJax.Hub.Config({
        extensions: ["jsMath2jax.js"]
      });
    </script>
    <script
      src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML">
    </script>

would load the ``jsMath2jax`` preprocessor, along with a configuration 
file that processes TeX input and produces HTML-with-CSS output.

There are a few configuration options for ``jsMath2jax``, which you
can find in the ``config/default.js`` file, or in the :ref:`jsMath
configuration options <configure-jsMath2jax>` section.

If you are generating your jsMath documents programmatically, it would be
better to convert from generating the jsMath ``<span>`` and ``<div>`` tags
to producing the corresponding MathJax ``<script>`` tags.  You would use
``<script type="math/tex">`` in place of ``<span class="math">`` and
``<script type="math/tex; mode=display">`` in place of ``<div
class="math">``.  See the section on :ref:`How mathematics is stored in the
page <mathjax-script-tags>` for more details.
