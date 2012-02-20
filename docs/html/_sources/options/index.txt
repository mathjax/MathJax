.. _configuration:

*********************
Configuration Objects
*********************

The various components of MathJax, including its input and output
processors, its preprocessors, its extensions, and the MathJax core,
all can be configured through the ``config/default.js`` file, or via a
:meth:`MathJax.Hub.Config()` call (indeed, if you look closely, you
will see that ``config/default.js`` is itself one big call to
:meth:`MathJax.Hub.Config()`).  Anything that is in
``config/default.js`` can be included in-line to configure MathJax.

The structure that you pass to :meth:`MathJax.Hub.Config()` is a
JavaScript object that includes `name:value` pairs giving the names of
parameters and their values, with pairs separated by commas.  Be
careful not to include a comma after the last value, however, as some
browsers (namely Internet Explorer) will fail to process the
configuration if you do.

The MathJax components, like the TeX input processor, have their own
sections in the configuration object labeled by the component name,
and using an object as its value.  That object is itself
a configuration object made up of `name:value` pairs that give the
configuration options for the component.

For example,

.. code-block:: javascript

    MathJax.Hub.Config({
      showProcessingMessages: false,
      jax: ["input/TeX", "output/HTML-CSS"],
      TeX: {
        TagSide: "left",
        Macros: {
	  RR: '{\\bf R}',
	  bold: ['{\\bf #1}',1]
	}
      }
    });

is a configuration that includes two settings for the MathJax Hub (one
for `showProcessingMessages` and one for the `jax` array), and a
configuration object for the TeX input processor.  The latter includes
a setting for the TeX input processor's `TagSide` option (to set tags
on the left rather than the right) and a setting for `Macros`, which
defines new TeX macros (in this case, two macros, one called ``\RR``
that produces a bold "R", and one called ``\bold`` that puts is
argument in bold face).

The ``config/default.js`` file is another example that shows nearly
all the configuration options for all of MathJax's components.


Configuration Options by Component
==================================

The individual options are explained in the following sections, which
are categorized by the component they affect.

.. toctree::
    :maxdepth: 1

    The core options <hub>

.. toctree::
    :maxdepth: 1

    The tex2jax preprocessor options <tex2jax>
    The mml2jax preprocessor options <mml2jax>
    The asciimath2jax preprocessor options <asciimath2jax>
    The jsMath2jax preprocessor options <jsMath2jax>

.. toctree::
    :maxdepth: 1

    The TeX input processor options <TeX>
    The MathML input processor options <MathML>
    The AsciiMath input processor options <AsciiMath>
    The HTML-CSS output processor options <HTML-CSS>
    The NativeMML output processor options <NativeMML>
    The SVG output processor options <SVG>
    The MMLorHTML configuration options <MMLorHTML>
    
.. toctree::
    :maxdepth: 1

    The MathMenu options <MathMenu>
    The MathZoom options <MathZoom>
    The MathEvents options <MathEvents>
    The FontWarnings options <FontWarnings>

    
