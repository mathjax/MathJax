.. _loading:

*******************************
Loading and Configuring MathJax
*******************************

You load MathJax into a web page by including its main JavaScript file
into the page.  That is done via a ``<script>`` tag that links to the
``MathJax.js`` file.  To do that, place the following line in the ``<head>``
section of your document:

.. code-block:: html

    <script type="text/javascript" src="path-to-MathJax/MathJax.js"></script>

where ``path-to-MathJax`` is replaced by the URL of the copy of MathJax
that you are loading.  For example, if you are using the MathJax 
distributed network service, the tag might be

.. code-block:: html

    <script type="text/javascript" 
       src="http://cdn.mathjax.org/mathjax/latest/MathJax.js">
    </script>

If you have installed MathJax yourself, ``path-to-MathJax`` will be the
location of MathJax on your server, or (if you are using MathJax locally
rather than through a server) the location of that directory on your hard
disk.  For example, if the MathJax directory is at the top level of your
web server's directory hierarchy, you might use

.. code-block:: html

    <script type="text/javascript" src="/MathJax/MathJax.js"></script>

to load MathJax.

If you install MathJax on a server in a domain that is different from the
one containing the page that will load MathJax, then there are issues
involved in doing so that you need to take into consideration.  See the
:ref:`Notes About Shared Servers <cross-domain-linking>` for more details.

When you load MathJax, it is common to request a specific
configuration file as discussed in the section on :ref:`Using a
Configuration File <config-files>` below, and in more detail in the
:ref:`Common Configurations <common-configurations>` section.  A
typical invocation of MathJax would be

.. code-block:: html

    <script type="text/javascript" 
       src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    </script>

which loads MathJax with a configuration file that includes everything
you need in order to enter mathematics in either TeX, LaTeX, or MathML
notation, and produces output using MathML if the browser supports
that well enough, or HTML-with-CSS otherwise.  If you **don't** load
an explicit configuration file, you will need to include an in-line
configuration block in order to tell MathJax how to read and display
the mathematics on your pages.  See the section below on :ref:`Using
In-line Configuration Options <inline-config>` for details.

It is best to load MathJax in the document's ``<head>`` block, but it
is also possible to load MathJax into the ``<body>`` section, if
needed.  If you do this, load it as early as possible, as
MathJax will begin to load its components as soon as it is included in
the page, and that will help speed up the processing of the
mathematics on your page.  MathJax does expect there to be a
``<head>`` section to the document, however, so be sure there is one
if you are loading MathJax in the ``<body>``.

It is also possible to load MathJax dynamically after the page has
been prepared, for example, via a `GreaseMonkey
<http://www.greasespot.net/>`_ script, or using a specially prepared
`bookmarklet <http://en.wikipedia.org/wiki/Bookmarklet>`_.  This is an
advanced topic, however; see :ref:`Loading MathJax Dynamically
<ajax-mathjax>` for more details.

.. _loading-CDN:

Loading MathJax from the CDN
============================

MathJax is available as a web service from ``cdn.mathjax.org``, so you 
can obtain MathJax from there without needing to install it on your own 
server.  The CDN is part of a distributed "cloud" network, so it is 
handled by servers around the world.  That means that you should get access 
to a server geographically near you, for a fast, reliable connection.

The CDN hosts the most current version of MathJax, as well as older 
versions, so you can either link to a version that stays up-to-date as 
MathJax is improved, or you can stay with one of the release versions so 
that your pages always use the same version of MathJax.

The URL that you use to obtain MathJax determines the version that you 
get.  The CDN has the following directory structure:

.. code-block::  sh

    mathjax/         # project-name
       1.0-latest/
       1.1-latest/   # the 1.1 release with any ciritical patches
       2.0-beta/     # temporary
       2.0-latest/   # the 2.0 release with any ciritical patches
       ...
       latest/       # the most current version (2.0-latest in this case)

Each directory corresponds to an official MathJax release; however,
hotfixes (urgent bug fixes) will be applied in each release branch as
necessary, even if new releases are not prepared.  In other words,
``1.1-latest`` will initially point to v1.1, but over time may be updated
with patches that would correspond to releases that might be numbers 1.1a,
1.1b, etc., even if such releases are not actually packaged for
separate distribution (they likely won't be).
We may occasionally introduce directories for betas, as indicated above,
but they will be temporary, and will be removed after the official
release.

To load from a particular release, use the directory for that release.  
For example,

.. code-block:: html

    <script type="text/javascript" src="http://cdn.mathjax.org/mathjax/1.1-latest/MathJax.js"></script>

will load the stable v1.1 version, even after we release v2.0 or other later 
versions, while

.. code-block:: html

    <script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js"></script>

will always be the most current stable release, so it will go from v1.1 to 
v2.0 automatically when that is released.  Note that all the versions 
available on the CDN are stable versions; the development version is not 
hosted on the CDN.  (If you wish to use the development version of
MathJax, you will need to install your own copy; see :ref:`Installing
and Testing MathJax <installation>` for information on how to do that.)

The use of ``cdn.mathjax.org`` is governed by its `terms of service
<http://www.mathjax.org/download/mathjax-cdn-terms-of-service/>`_, so be
sure to read that before linking to the MathJax CDN server.

If you wish to use the MathJax CDN but use your own configuration file
rather than one of the pre-defined ones, see the information at the
end of the :ref:`Using a Local Configuration File
<local-config-files>` section below.


Configuring MathJax
===================

There are two ways to configure MathJax:  via a configuration file, or by 
including configuration commands within the web page itself.  These can be 
used independently, or in combination.  For example, you can load a main 
pre-defined configuration file, but include in-line commands to 
adjust the configuration to your needs.

Note that you must use at least one of these two forms of configuration.
Unlike MathJax v1.0, version 1.1 and higher does not load a default
configuration file.  If you have been using version 1.0's
``config/MathJax.js`` for your configuration, you will need to load that 
configuration file explicitly via a ``config`` parameter, as described 
below.


.. _config-files:

Using a configuration file
==========================

The first way to configure MathJax is to use a configuration file.
MathJax comes with a number of pre-defined configuration files, which are 
stored in the ``MathJax/config`` directory.  Among these are the following

.. describe:: default.js

    A file that contains nearly all the configuration options with comments
    describing them, which you can edit to suit your needs.

.. describe:: TeX-AMS-MML_HTMLorMML.js

    Allows math to be specified in :term:`TeX`, :term:`LaTeX`, or
    :term:`MathML` notation, with the `AMSmath` and `AMSsymbols`
    packages included, producing output using MathML if the browser
    supports it sufficiently, and HTML-with-CSS otherwise.

.. describe:: TeX-AMS_HTML.js

    Allows math to be specified in :term:`TeX` or :term:`LaTeX` notation, with the 
    `AMSmath` and `AMSsymbols` packages included, and produces output 
    using the HTML-CSS output processor.

.. describe:: MML_HTMLorMML.js

    Allows math to be specified using :term:`MathML` notation, and produces MathML 
    output if the browser supports it sufficiently, or HTML-CSS output otherwise.

.. describe:: AM_HTMLorMML.js

    Allows math to be specified using :term:`AsciiMath` notation,
    producing output in MathML if the browser supports it
    sufficiently, or as HTML-with-CSS otherwise.

.. describe:: TeX-AMS-MML_SVG.js

    Allows math to be specified in :term:`TeX`, :term:`LaTeX`, or
    :term:`MathML` notation, with the `AMSmath` and `AMSsymbols`
    packages included, producing output using SVG.

.. describe:: TeX-MML-AM_HTMLorMML.js

    Allows math to be specified in :term:`TeX`, :term:`LaTeX`,
    :term:`MathML`, or :term:`AsciiMath` notation, with the `AMSmath`
    and `AMSsymbols` packages included, producing output using MathML
    if the browser supports it sufficiently, and HTML-with-CSS
    otherwise.

The first of these is a file that you can edit to suit your needs.  It 
contains nearly all the configuration options that MathJax allows, and has 
comments explaining them.  The others are what are called `combined 
configuration files`, which not only configure MathJax, but also pre-load the 
various files that the configuration requires.  (The contents of these 
files are explained in more detail in the `Common Configurations 
<common-configurations>`_ section.)

Usually, MathJax loads its components only when they are needed, but each
component will require a separate file to be loaded, and that can cause
delays before the mathematics is displayed.  The combined configuration
files load the majority of the needed files all as one large file, reducing
the number of network requests that are needed.  That means you will
probably be getting the components that MathJax needs faster than you would
without the combined file, but you may be loading components that are never
actually used; that is the trade off.

Each of the combined configuration files comes in two flavors:  the ones 
listed above, which only configure the output processors but don't include 
the main code, and a "full" version, that also includes the complete 
output processors.  For example, with ``TeX-AMS_HTML.js`` and 
``TeX-AMS_HTML-full.js``, the latter includes the complete HTML-CSS output 
processor.  The "full" configuration files are substantially larger (on 
the order of 70KB more), so you need to decide whether it is worth loading the 
full configuration for your pages.

If most of your pages include mathematics, then it is to your advantage to
load the full version, but if you are including MathJax in a theme file for
a blog or wiki that only includes mathematics occasionally, then perhaps it
is better to use the standard configuration instead, in which case the
output processors are only loaded when they are actually needed, saving the
loading of 70KB for pages that don't.  Of course, if your server is
configured to compress the files it sends, the difference between the two
is considerably reduced.  Furthermore, most browsers will cache the
javascript they receive, so the download cost should only occur on the
first page a user views, so it may be best to use the "full" version after
all.  Note, however, that mobile devices sometimes have limits on the size
of files that they cache, so they may be forced to download the
configuration on every page.  You need to keep these issues in mind as you
decide on which configuration to use.

To load a configuration file, use ``config=filename`` (where ``filename``
is one of the names above without the ``.js``) as a parameter to the URL of
the ``MathJax.js`` file.  For example

.. code-block:: html

    <script type="text/javascript" 
       src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    </script>

loads the ``config/TeX-AMS-MML_HTMLorMML.js`` configuration file from the 
MathJax distributed network service.

You can include more than one configuration file by separating them with
commas.  For example, if you have a locally defined configuration file
called ``MathJax/config/local/local.js`` that modifies the settings for the
``TeX-AMS_HML`` configuration, defines some new TeX macros, and so on, you
can use

.. code-block:: html

    <script type="text/javascript" 
       src="path-to-MathJax/MathJax.js?config=TeX-AMS_HTML,local/local">
    </script>

to first load the main configuration, then the local modifications.


.. _local-config-files:

Using a local configuration file with the CDN
=============================================

You can load MathJax from the MathJax CDN server but still use a
configuration from your own local server.  For example, suppose you
have a configuration file called ``local.js`` on your own server, in a
directory called ``MathJax/config/local``.  Then you can load MathJax
from the CDN and still use your configuration file as follows:

.. code-block:: html

    <script type="text/javascript" 
       src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML,http://myserver.com/MathJax/config/local/local.js">
    </script>

Because the ``local.js`` file is not on the CDN server, you must give
the complete URL to the local configuration file.  Note that you also
have to edit the :meth:`loadComplete()` call that is at the bottom of
the configuration file to change it from
``[MathJax]/config/local/local.js`` to the complete URL as you give it
in the ``config`` parameter.  In the example above, it would be

.. code-block:: javascript

    MathJax.Ajax.loadComplete("http://myserver.com/MathJax/config/local/local.js");

That is because the ``[MathJax]`` in the original URL refers to the
root directory where ``MathJax.js`` was loaded, which is on the CDN,
not your local server, and so you need to tell MathJax the actual
location of your configuration file.


.. _inline-config:

Using in-line configuration options
===================================

The second way to configure MathJax is through `in-line configuration`, 
which puts the configuration options within the web page itself. The use 
of in-line configuration with MathJax requires two separate  ``<script>`` 
tags: one for specifying the configuration settings and one for loading of 
MathJax.  Because MathJax starts its configuration process as soon as it is 
loaded, the configuration script must come **before** the script tag that 
loads ``MathJax.js`` itself.  You do this by including a ``<script>`` with
``type="text/x-mathjax-config"`` whose content will be run when
MathJax performs its configuration.  Generally, this script will
include a :meth:`MathJax.Hub.Config()` call to perform MathJax
configuration, but it can also include other MathJax commands, such as
registering signal actions, or any JavaScript commands that you want.
You can have as many such script tags as you need, and MathJax will
process them in the order in which they appear in the document.

For instance,

.. code-block:: html

    <script type="text/x-mathjax-config">
      MathJax.Hub.Config({
        extensions: ["tex2jax.js"],
        jax: ["input/TeX", "output/HTML-CSS"],
        tex2jax: {
          inlineMath: [ ['$','$'], ["\\(","\\)"] ],
          displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
          processEscapes: true
        },
        "HTML-CSS": { availableFonts: ["TeX"] }
      });
    </script>
    <script type="text/javascript" src="path-to-MathJax/MathJax.js">

This example includes the `tex2jax` preprocessor and configures it to use
both the standard :term:`TeX` and :term:`LaTeX` math delimiters.  It uses
the `TeX` input processor and the `HTML-CSS` output processor, and forces the
HTML-CSS processor to use the TeX fonts rather than other locally installed
fonts (e.g., :term:`STIX` fonts).  See the :ref:`configuration options
<configuration>` section (or the comments in the ``config/default.js``
file) for more information about the configuration options that you can
include in the :meth:`MathJax.Hub.Config()` call.  This 
configuration does **not** load any pre-defined configuration file.

Note that you can combine in-line configuration with file-based 
configuration; simply include ``text/x-mathjax-config`` scripts as above, 
but also include ``config=filename`` when you load the ``MathJax.js`` 
file.  For example, the `tex2jax` preprocessor does **not** enable the TeX 
single-dollar in-line math delimiters by default.  You can load one of the 
pre-defined configuration files that includes the TeX preprocessor, and use 
an in-line configuration block to enable the single-dollar signs, as
in this example:

.. code-block:: html

    <script type="text/x-mathjax-config">
      MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [ ['$','$'], ["\\(","\\)"] ],
          processEscapes: true
        }
      });
    </script>
    <script type="text/javascript" src="path-to-MathJax/MathJax.js?config=TeX-AMS_HTML">
    </script>


.. _delayStartupUntil:

Configuring MathJax after it is loaded
======================================

Because MathJax begins its configuration process immediately after it is
loaded (so that it can start loading files as quickly as it can), the
configuration blocks for MathJax must come before ``MathJax.js`` is loaded,
so they will be available to MathJax when it starts up.  There are
situations, however, when you might want to put off configuring MathJax
until later in the page.

One such situation is when you have a site that loads MathJax as part of a
theme or template, but want to be able to modify the configuration on
specific pages of the site.  To accomplish this, you need to ask MathJax 
to delay its startup configuration until some later time.  MathJax uses 
the ``delayStartupUntil`` parameter to control the timing of the startup 
sequence.  By default, it is set to ``none``, meaning there is no delay 
and MathJax starts configuration right away.  

You can set ``delayStartupUntil=onload`` in order to prevent MathJax from
continuing its startup process until the page's onLoad handler fires.  This
allows MathJax to find the ``text/x-mathjax-config`` blocks that occur
anywhere on the page, not just the ones that appear above the ``<script>``
that loads ``MathJax.js``.  It also means that MathJax will not begin 
loading any of the files that it needs until then as well, which may delay 
the displaying of your mathematics, since the onLoad handler doesn't 
execute until all the images and other media are available.  (If you have 
used a combined configuration file, however, it already includes all the 
main files that MathJax needs, so there is not much loss in delaying the 
startup.)

You can set ``delayStartupUntil=configured`` in order to delay the
startup configuration until the :meth:`MathJax.Hub.Configured()`
method is called.  This allows you to delay startup until later on the
page, but then restart the MathJax configuration process as soon as
possible rather than waiting for the entire page to load.  For
example, you could use

.. code-block:: html

    <script type="text/javascript"
       src="path-to-MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML&delayStartupUntil=configured">
    </script>

in your theme's header file, and

.. code-block:: html

    <script type="text/javascript">
      MathJax.Hub.Configured()
    </script>

in its footer, so that MathJax will delay setting up until the footer
is reached, but will not have to wait until images and other files are
loaded.  In this way, if you have ``text/x-mathjax-config`` script
tags within the main body of the document, MathJax will read and
process those before continuing its startup.  In this way you can use
a default configuration that can be modified on a page-by-page basis.

Note that :meth:`MathJax.Hub.Configured()` is not called by MathJax;
you must make that call somewhere within the page yourself after the
configuration blocks are set up.  If you do not execute this function,
MathJax will not process any of the math on the page.


Details of the MathJax configuration process
============================================

Since there are a number of different ways to configure MathJax, it is 
important to know how they interact.  The configuration actions are the 
following:

1.  Process any configuration file explicitly specified as a script parameter.
2.  Process the in-line script body (deprecated), if present.
3.  If delayed startup is requested, wait for the indicated signal.
4.  Process ``text/x-mathjax-config`` config blocks.  
5.  Process any config files queued in the configuration's `config` array 
    by earlier config code.

Note that ``text/x-mathjax-config`` script blocks must either precede the
``MathJax.js`` script element, or startup must be delayed.  Otherwise, blocks
that follow the ``MathJax.js`` script element may or may not be available 
when MathJax runs, and browser-dependent erratic behavior will result.


