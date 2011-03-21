.. _upgrade:

***********************************
Migrating from MathJax v1.0 to v1.1
***********************************

MathJax v1.1 fixes a number of bugs in v1.0, and improves support for 
new versions of browsers and mobile devices.  It includes changes to 
increase its performance, and to make it more compliant with HTML5.  It 
has more flexible configuration options, and the ability to load 
configuration files that combine multiple files into a single one to 
increase loading speed when MathJax starts up.  Finally, MathJax.org now 
offers MathJax as a web service through a distributed "cloud" server.

This document describes the changes you may need to make to your MathJax 
configurations in order to take advantage of these improvements.


Configuration Changes
=====================

The main changes that you will see as a page author are in the way that
MathJax can be loaded and configured.  If you have been using in-line
configuration by putting a :meth:`MathJax.Hub.Config()` call in the body of
the ``<script>`` tag that loads MathJax, then your site should work
unchanged with version 1.1 of MathJax.  You may wish to consider moving to
the new HTML5-compliant method of configuring MathJax, however, which uses
a separate ``<script>`` tag to specify the configuration.  That tag should
come **before** the one that loads ``Mathjax.js``, and should have
``type="text/x-mathjax-config"`` rather than ``type="text/javascript"``.
For example, 

.. code-block:: html

    <script type="text/javascript" src="/MathJax/MathJax.js">
      MathJax.Hub.Config({
        jax: ["input/TeX","output/HTML-CSS"],
        extensions: ["tex2jax.js"]
      });
    </script>

would become

.. code-block:: html

    <script type="text/x-mathjax-config">
      MathJax.Hub.Config({
        jax: ["input/TeX","output/HTML-CSS"],
        extensions: ["tex2jax.js"]
      });
    </script>
    <script type="text/javascript" src="/MathJax/MathJax.js"></script>

instead.  This will make sure your pages pass HTML5 validation.  Be sure 
that you put the configuration block **before** the script that loads 
MathJax.  See :ref:`Loading and Configuring MathJax <loading>` for more 
details.

If your page simply loads ``MathJax.js`` and relies on
``config/MathJax.js``, then you will need to modify your ``<script>`` tag
in order to use MathJax v1.1.  This is because MathJax no longer loads a
default configuration file; you are required to explicitly specify the
configuration file if you use one.  Furthermore, the name of the
``config/MathJax.js`` file was a source of confusion, so it has been 
renamed ``config/default.js`` instead.  Thus, if you used

.. code-block:: html

    <script type="text/javascript" src="/MathJax/MathJax.js"></script>

in the past, you should replace it with

.. code-block:: html

    <script type="text/javascript" src="/MathJax/MathJax.js?config=default"></script>

instead.  If you don't do this, you will receive a warning message that 
directs you to a page that explains how to update your script tags to use 
the new configuration format.


Combined Configurations
=======================

New with version 1.1 is the ability to combine several files into a single 
configuration file, and to load that via the same script that loads 
MathJax.  This should make configuring MathJax easier, and also helps to 
speed up the initial loading of MathJax's components, since only one file 
needs to be downloaded.

MathJax comes with four pre-built configurations, and our hope is that one
of these will suit your needs.  They are described in more detail in the
:ref:`Using a Configuration File  <config-files>` section.  To load one,
add ``?config=filename`` (where ``filename`` is the name of the
configuration file without the ``.js``) to the URL that loads
``MathJax.js``.  For example

.. code-block:: html

    <script type="text/javascript" src="/MathJax/MathJax.js">
      MathJax.Hub.Config({
        jax: ["input/TeX","output/HTML-CSS"],
        extensions: ["tex2jax.js","AMSmath.js","AMSsymbols.js"]
      });
    </script>

could be replaced by the single line

.. code-block:: html

    <script type="text/javascript" src="/MathJax/MathJax.js?config=TeX-AMS_HTML"></script>

In this way, you don't have to include the in-line configuration, and all 
the needed files will be downloaded when MathJax starts up.  For complete 
details about the contents of the combined configuration files, see the 
:ref:`Common Configurations <common-configurations>` section.

If you want to use a pre-defined configuration file, but want to modify some 
of the configuration parameters, you can use both a 
``text/x-mathjax-config`` block and a ``config=filename`` parameter in 
combination.  For example,

.. code-block:: html

    <script type="text/x-mathjax-config">
      MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [ ['$','$'], ['\\(','\\)'] ],
          processEscapes: true
        }
      });
    </script>
    <script type="text/javascript" src="/MathJax/MathJax.js?config=TeX-AMS_HTML"></script>

would load the ``TeX-AMS_HTML`` configuration file, but would reconfigure 
the inline math delimiters to include ``$...$`` in addition to 
``\(...\)``, and would set the ``processEscapes`` parameter to ``true``.


Loading MathJax from the CDN
============================

The MathJax installation is fairly substantial (due to the large number of 
images needed for the image fonts), and so you may not want to (or be able 
to) store MathJax on your own server.  Keeping MathJax up to date can also 
be a maintenance problem, and you might prefer to let others handle that 
for you.  In either case, using the MathJax distributed network service may be 
the best way for you to obtain MathJax.  That way you can be sure you are 
using an up-to-date version of MathJax, and that the server will be fast 
and reliable.

To use the MathJax CDN service, simply load MathJax as follows:

.. code-block:: html

    <script type="text/javascript"
       src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    </scrip>

Of course, you can load any configuration file that you wish, or use a 
``text/x=mathajx-config`` block to configure MathJax in-line. 
:ref:`More details <loading-CDN>` are available, if you need them.

The use of ``cdn.mathjax.org`` is governed by its `terms of service
<http://www.mathjax.org/download/mathjax-cdn-terms-of-service/>`_, so be
sure to read that before linking to the MathJax CDN server.


Change in default TeX delimiters
================================

In addition to the fact that MathJax v1.1 no longer loads a default 
configuration file, there is a second configuration change that could 
affect your pages.  The ``config/MathJax.js`` file properly configured the 
`tex2jax` preprocessor to use only ``\(...\)`` and not ``$...$`` for in-line 
math delimiters, but the `tex2jax` preprocessor itself incorrectly 
defaulted to including ``$...$`` as in-line math delimiters.  The result 
was that if you used in-line configuration to specify the ``tex2jax`` 
preprocessor, single-dollar delimiters were enabled by default, while if 
you used file-based configuration, they weren't.

This inconsistency was an error, and the correct behavior was supposed to 
have the single-dollar delimiters disabled in both cases.  This is now 
true in v1.1 of MathJax.  This means that if you used in-line 
configuration to specify the `tex2jax` preprocessor, you will need to 
change your configuration to explicitly enable the single-dollar 
delimiters if you want to use them.

For example, if you had

.. code-block:: html

    <script type="text/javascript" src="/MathJax/MathJax.js">
      MathJax.Hub.Config({
        jax: ["input/TeX","output/HTML-CSS"],
        extensions: ["tex2jax.js"]
      });
    </script>

and you want to use single-dollar delimiters for in-line math, then you
should replace this with

.. code-block:: html

    <script type="text/x-mathjax-config">
      MathJax.Hub.Config({
        jax: ["input/TeX","output/HTML-CSS"],
        extensions: ["tex2jax.js"],
        tex2jax: {
          inlineMath: [ ['$','$'], ['\\(','\\)'] ],
          processEscapes: true
        }
      });
    </script>
    <script type="text/javascript" src="/MathJax/MathJax.js"></script>

The same technique can be used in conjunction with a combined 
configuration file.  For example

.. code-block:: html

    <script type="text/x-mathjax-config">
      MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [ ['$','$'], ['\\(','\\)'] ],
          processEscapes: true
        }
      });
    </script>
    <script type="text/javascript" src="/MathJax/MathJax.js?config=TeX-AMS_HTML"></script>

will load the pre-defined ``TeX-AMS_HTML`` configuration, but will modify 
the settings to allow ``$...$`` delimiters, and to process ``\$`` to 
produce dollar signs within the text of the page.


New Distribution Location
=========================

Version 1.0 of MathJax was distributed through `SourceForge`, but the
development of MathJax has switched to `GitHub
<https://github.com/mathjax/MathJax/>`_, which is now the primary location
for MathJax source code and distributions.  The SourceForge repository will
no longer be actively maintained (and hasn't been since November 2010), and
so you will not be able to obtain updates through ``svn`` if you checked
out MathJax from there.

You may be able to switch to using the MathJax CDN (see above) rather than 
hosting your own copy of MathJax, and avoid the problem of updates all 
together.  If you must install your own copy, however, you should follow 
the instructions at :ref:`Installing and Testing MathJax <installation>`, 
using either ``git`` or ``svn`` as described to obtain your copy from 
GitHub.  This will allow you to keep your copy of MathJax up to date as 
development continues.

We apologize for the inconvenience of having to switch distributions, but 
the git-to-svn bridge we tried to implement to keep both copies in synch 
turned out to be unreliable, and so the SourceForge distribution was 
retired in favor of the GitHub site.
