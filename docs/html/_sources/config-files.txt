.. _common-configurations:

*********************
Common Configurations
*********************

MathJax comes with a number of pre-defined configuration files in the
``MathJax/config`` directory.  The ``default.js`` file contains nearly all
the possible configuration options together with comments explaining them, 
so you can use that file to customize MathJax to your needs.  Simply load 
it via

.. code-block:: html

    <script type="text/javascript" src="path-to-MathJax/MathJax.js?config=default"></script>

where ``path-to-MathJax`` is the URL to the MathJax directory on your 
server or hard disk.  If you are using MathJax from the CDN, you can
view the contents of `default.js
<http://cdn.mathjax.org/mathjax/latest/config/default.js>`_ as a
reference, but you will not be able to edit the CDN copy.  It is
possible to use the CDN copy of MathJax with your own configuration
file, however; see :ref:`Using a Local Configuration File with the CDN
<local-config-files>` for details.

The remaining files in the `MathJax/config
<http://cdn.mathjax.org/mathjax/latest/config/>`_ directory are
combined configuration files that include not just configuration
parameters but also the files that MathJax would need to load for
those configurations.  This means MathJax will have to load fewer
files, and since each file access requires establishing connections
over the network, it can be faster to load one larger file than
several smaller ones.  See :ref:`Loading and Configuring MathJax
<loading>` for more details about how to load configurations, and how
to modify the parameters for a configuration file.

The following sections describe the contents of the combined configuration
files.  Each comes in two flavors: a standard version and a "full" version.
The standard version simply defines the output processor(s) that are part
of the configuration, but doesn't load the code that implements the output
processor.  The full version loads the complete output processors, so
everything that MathJax needs for the page should be loaded up front, and 
there will be no delay once the page is ready to be processed.  To obtain 
the "full" version, add ``-full`` to the end of the configuration file 
name.


The ``TeX-MML-AM_HTMLorMML`` configuration file
================================================

This configuration file is the most general of the pre-defined
configurations.  It loads all the main MathJax components, including
the TeX, MathML, and AsciiMath preprocessors and input processors, the
AMSmath, AMSsymbols, noErrors, and noUndefined TeX extensions, both
the native MathML and HTML-with-CSS output processor definitions, and
the MathMenu and MathZoom extensions.  It is equivalent to the
following configuration:

.. code-block:: javascript

    MathJax.Hub.Config({
      config: ["MMLorHTML.js"],
      jax: ["input/TeX","input/MathML","input/AsciiMath","output/HTML-CSS","output/NativeMML"],
      extensions: ["tex2jax.js","mml2jax.js","asciimath2jax.js","MathMenu.js","MathZoom.js"],
      TeX: {
        extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]
      }
    });

In addition, it loads the mml Element Jax, the TeX, MathML, and
AsciiMath input jax main code (not just the definition files), as well
as the `toMathML` extension, which is used by the Show Source option
in the MathJax contextual menu.  The `-full` version also loads both the
HTML-CSS and NativeMML output jax main code, plus the HTML-CSS
`mtable` extension, which is normally loaded on demand.

See the :ref:`tex2jax configuration <configure-tex2jax>` section for
other configuration options for the ``tex2jax`` preprocessor, and the
:ref:`TeX input jax configuration <configure-TeX>` section for options
that control the TeX input processor.
See the :ref:`mml2jax configuration <configure-mml2jax>` section for
other configuration options for the ``mml2jax`` preprocessor, and the
:ref:`MathML input jax configuration <configure-MathML>` section for
options that control the MathML input processor.
See the :ref:`asciimath2jax configuration <configure-asciimath2jax>` section for
other configuration options for the ``asciimath2jax`` preprocessor, and the
:ref:`AsciiMath input jax configuration <configure-AsciiMath>` section for
options that control the AsciiMath input processor.
See :ref:`MathJax Output Formats <output-formats>` for more
information on the NativeMML and HTML-CSS output processors.  See the
:ref:`MMLorHTML configuration <configure-MMLorHTML>` section for
details on the options that control the ``MMLorHTML`` configuration.


The ``TeX-AMS-MML_HTMLorMML`` configuration file
================================================

This configuration file is the most commonly used of the pre-defined
configurations.  It loads all the main MathJax components, including
the TeX and MathML preprocessors and input processors, the AMSmath,
AMSsymbols, noErrors, and noUndefined TeX extensions, both the native
MathML and HTML-with-CSS output processor definitions, and the
MathMenu and MathZoom extensions.  It is equivalent to the following
configuration:

.. code-block:: javascript

    MathJax.Hub.Config({
      config: ["MMLorHTML.js"],
      jax: ["input/TeX","input/MathML","output/HTML-CSS","output/NativeMML"],
      extensions: ["tex2jax.js","mml2jax.js","MathMenu.js","MathZoom.js"],
      TeX: {
        extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]
      }
    });

In addition, it loads the mml Element Jax, the TeX and MathML input
jax main code (not just the definition files), as well as the
`toMathML` extension, which is used by the Show Source option in the
MathJax contextual menu.  The ``-full`` version also loads both the
HTML-CSS and NativeMML output jax main code, plus the HTML-CSS
`mtable` extension, which is normally loaded on demand.

See the :ref:`tex2jax configuration <configure-tex2jax>` section for
other configuration options for the ``tex2jax`` preprocessor, and the
:ref:`TeX input jax configuration <configure-TeX>` section for options
that control the TeX input processor.
See the :ref:`mml2jax configuration <configure-mml2jax>` section for
other configuration options for the ``mml2jax`` preprocessor, and the
:ref:`MathML input jax configuration <configure-MathML>` section for
options that control the MathML input processor.
See :ref:`MathJax Output Formats <output-formats>` for more
information on the NativeMML and HTML-CSS output processors.  See the
:ref:`MMLorHTML configuration <configure-MMLorHTML>` section for
details on the options that control the ``MMLorHTML`` configuration.


The ``TeX-AMS_HTML`` configuration file
================================================

This configuration file is for sites that only use TeX format for their 
mathematics, and that want the output to be as close to TeX output as 
possible.  This uses the HTML-CSS output jax (even when the user's browser 
understands MathML).  The user can still use the MathJax contextual menu 
to select the NativeMML output jax if they desire.  

This file includes all the important MathJax components for TeX input and
output, including the `tex2jax` preprocessor and TeX input jax, the
AMSmath, AMSsymbols, noErrors, and noUndefined TeX extensions, the
HTML-with-CSS output processor definition, and the MathMenu and MathZoom
extensions.  It is equivalent to the following configuration:

.. code-block:: javascript

    MathJax.Hub.Config({
      jax: ["input/TeX","output/HTML-CSS"],
      extensions: ["tex2jax.js","MathMenu.js","MathZoom.js"],
      TeX: {
        extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]
      }
    });

In addition, it loads the mml Element Jax and the TeX input jax main code
(not just the definition file), as well as the `toMathML` extension, which
is used by the Show Source option in the MathJax contextual menu.  The ``-full``
version also loads the HTML-CSS output jax main code, plus the HTML-CSS
`mtable` extension, which is normally loaded on demand.

See the :ref:`tex2jax configuration <configure-tex2jax>` section for
other configuration options for the ``tex2jax`` preprocessor, and the
:ref:`TeX input jax configuration <configure-TeX>` section for options
that control the TeX input processor.
See :ref:`MathJax Output Formats <output-formats>` for more
information on the HTML-CSS output processor.


The ``MML_HTMLorMML`` configuration file
================================================

This configuration file is for sites that only use MathML format for their
mathematics.  It will use MathML output in browsers where that is
supported well, and HTML-CSS output otherwise.  The user can still use the
MathJax contextual menu to select the other output format if they desire.

This file includes all the important MathJax components for MathML input
and output, including the `mml2jax` preprocessor and MathML input jax, the
NativeMML and HTML-CSS output processor definition files, and the MathMenu
and MathZoom extensions.  It is equivalent to the following configuration:

.. code-block:: javascript

    MathJax.Hub.Config({
      config: ["MMLorHTML.js"],
      jax: ["input/MathML","output/HTML-CSS","output/NativeMML"],
      extensions: ["mml2jax.js","MathMenu.js","MathZoom.js"]
    });

In addition, it loads the mml Element Jax and the MathML input jax main
code (not just the definition file), as well as the `toMathML` extension,
which is used by the Show Source option in the MathJax contextual menu.
The ``-full`` version also loads both the HTML-CSS and NativeMML output jax main
code files, plus the HTML-CSS `mtable` extension, which is normally loaded
on demand.

See the :ref:`mml2jax configuration <configure-mml2jax>` section for
other configuration options for the ``mml2jax`` preprocessor, and the
:ref:`MathML input jax configuration <configure-MathML>` section for
options that control the MathML input processor.
See :ref:`MathJax Output Formats <output-formats>` for more
information on the NativeMML and HTML-CSS output processors.  See the
:ref:`MMLorHTML configuration <configure-MMLorHTML>` section for
details on the options that control the ``MMLorHTML`` configuration.


The ``AM_HTMLorMML`` configuration file
================================================

This configuration file is for sites that only use AsciiMath format for their 
mathematics.  It will use MathML output in browsers where that is
supported well, and HTML-CSS output otherwise.  The user can still use the
MathJax contextual menu to select the other output format if they desire.

This file includes all the important MathJax components for AsciiMath
input and output, including the `asciimath2jax` preprocessor and
AsciiMath input jax, the NativeMML and HTML-CSS output processor
definition files, and the MathMenu and MathZoom extensions.  It is
equivalent to the following configuration:

.. code-block:: javascript

    MathJax.Hub.Config({
      config: ["MMLorHTML.js"],
      jax: ["input/AsciiMath","output/HTML-CSS","output/NativeMML"],
      extensions: ["asciimath2jax.js","MathMenu.js","MathZoom.js"]
    });

In addition, it loads the mml Element Jax and the TeX input jax main code
(not just the definition file), as well as the `toMathML` extension, which
is used by the Show Source option in the MathJax contextual menu.  The ``-full``
version also loads the HTML-CSS output jax main code, plus the HTML-CSS
`mtable` extension, which is normally loaded on demand.

See the :ref:`asciimath2jax configuration <configure-asciimath2jax>`
section for other configuration options for the ``asciimath2jax``
preprocessor, and the :ref:`AsciiMath input jax configuration
<configure-AsciiMath>` section for options that control the AsciiMath
input processor.  See :ref:`MathJax Output Formats <output-formats>`
for more information on the HTML-CSS and NativeMML output processors.
See the :ref:`MMLorHTML configuration <configure-MMLorHTML>` section
for details on the options that control the ``MMLorHTML``
configuration.


The ``TeX-AMS-MML_SVG`` configuration file
================================================

This configuration file is the same as `TeX-AMS-MML_HTMLorMML` except
that it uses the SVG output renderer rather than the NativeMML or
HTML-CSS ones.  It loads all the main MathJax components, including
the TeX and MathML preprocessors and input processors, the AMSmath,
AMSsymbols, noErrors, and noUndefined TeX extensions, the SVG output
processor definitions, and the MathMenu and MathZoom extensions.  It
is equivalent to the following configuration:

.. code-block:: javascript

    MathJax.Hub.Config({
      jax: ["input/TeX","input/MathML","output/SVG"],
      extensions: ["tex2jax.js","mml2jax.js","MathMenu.js","MathZoom.js"],
      TeX: {
        extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]
      }
    });

In addition, it loads the mml Element Jax, the TeX and MathML input
jax main code (not just the definition files), as well as the
`toMathML` extension, which is used by the Show Source option in the
MathJax contextual menu.  The ``-full`` version also loads both the
SVG output jax main code, plus the SVG `mtable` extension, which
is normally loaded on demand.

See the :ref:`tex2jax configuration <configure-tex2jax>` section for
other configuration options for the ``tex2jax`` preprocessor, and the
:ref:`TeX input jax configuration <configure-TeX>` section for options
that control the TeX input processor.
See the :ref:`mml2jax configuration <configure-mml2jax>` section for
other configuration options for the ``mml2jax`` preprocessor, and the
:ref:`MathML input jax configuration <configure-MathML>` section for
options that control the MathML input processor.
See :ref:`MathJax Output Formats <output-formats>` for more
information on the SVG output processor.


The ``Accessible`` configuration file
================================================

This configuration file is essentially the same as 
``TeX-AMS-MML_HTMLorMML`` except that it includes options that are 
designed for assistive technology, particularly for those with visual 
challenged.  *This file is deprecated* since the controls that make
MathJax work with screen readers are now available in the MathJax
contextual menu, and so there is no need to set them in the
configuration file any longer.  So you can use any of the other
pre-defined configurations and readers with special needs should be
able to change the MathJax settings themselves to be appropriate for
their software.

The Accessible configuration is equivalent to the following:

.. code-block:: javascript

    MathJax.Hub.Config({
      config: ["MMLorHTML.js"],
      jax: ["input/TeX","input/MathML","output/HTML-CSS","output/NativeMML"],
      extensions: ["tex2jax.js","mml2jax.js","MathMenu.js","MathZoom.js"],
      TeX: {
        extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]
      },
      menuSettings: {
        zoom: "Double-Click",
	mpContext: true,
	mpMouse: true
      },
      errorSettings: { message: ["[Math Error]"] }
    });

This turns off the MathJax contextual menu for IE when MathPlayer is
active, and passes mouse events on to MathPlayer to allow screen
readers full access to MathPlayer.  It also sets the zoom trigger 
to double-click, so that readers can see a larger version of the 
mathematics but double-clicking on any equation.

In addition, it loads the mml Element Jax, the TeX and MathML input jax
main code (not just the definition files), as well as the `toMathML`
extension, which is used by the Show Source option in the MathJax
contextual menu.  The ``-full`` version also loads both the HTML-CSS and
NativeMML output jax main code, plus the HTML-CSS `mtable` extension, which
is normally loaded on demand.

