.. _getting-started:

***************
Getting Started
***************

MathJax allows you to include mathematics in your web pages, either
using LaTeX, MathML, or AsciiMath notation, and the mathematics
will be processed using javascript to produce HTML, SVG or MathML 
equations for viewing in any modern browser.

There are two ways to access MathJax: the easiest way is to use the
copy of MathJax available from our distributed network service at
``cdn.mathjax.org``, but you can also download and install a copy of
MathJax on your own server, or use it locally on your hard disk
(with no need for network access).  All three of these are described
below, with links to more detailed explanations.  This page gives the
quickest and easiest ways to get MathJax up and running on your web
site, but you may want to read the details in order to customize the
setup for your pages.

.. _mathjax-CDN:

Using the MathJax Content Delivery Network (CDN)
================================================

To use MathJax from our server, you need to do two things:

1.  Link MathJax into the web pages that are to include mathematics.

2.  Put mathematics into your web pages so that MathJax can display
    it.

You accomplish the first step by putting 

.. code-block:: html

    <script type="text/javascript"
      src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    </script>

into the ``<head>`` block of your document.  (It can also go in the
``<body>`` if necessary, but the head is to be preferred.)  This will
load the latest version of MathJax from the distributed server, and
configure it to recognize mathematics in both TeX and MathML notation,
and ask it to generate its output using MathML if the browser supports
that well enough, and otherwise use HTML-with-CSS to display the
mathematics.  This is one of the most general configurations, and
should suffice for most people's needs.  Other configurations are
available, however, and you can also provide additional configuration
parameters to taylor one of the configurations to your needs.  More
details can be found in the :ref:`Loading and Configuring MathJax
<loading>` instructions.

The use of ``cdn.mathjax.org`` is governed by its `terms of service
<http://www.mathjax.org/download/mathjax-cdn-terms-of-service/>`_, so be
sure to read that before linking to the MathJax CDN server.

To see how to enter mathematics in your web pages, see `Putting
mathematics in a web page`_ below.

Secure Access to the CDN
------------------------

When the the MathJax CDN is accessed via the address
``http://cdn.mathjax.org``, data is downloaded over a regular, insecure
HTTP connection.  This introduces a security risk, since it is
possible a hostile 3rd party could intercept the MathJax program data,
and replace it.  This is sometimes called a
`man-in-the-middle <http://en.wikipedia.org/wiki/Man-in-the-middle_attack>`_ attack.

To prevent such attacks, it is necessary to access the MathJax CDN
over a secure HTTPS connection.  This can be done easily by using the
following ``<script>`` tag instead of the one listed above:

.. code-block:: html

    <script type="text/javascript"
      src="https://d3eoax9i5htok0.cloudfront.net/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    </script>

Currently, the Amazon Cloudfront service used by the MathJax CDN does
not support the use of a human-friendly name like ``cdn.mathjax.org``
for secure connections; however, the address given above is stable and
safe to use.


Installing Your Own Copy of MathJax
===================================

We recommend using the CDN service if you can, but you can also install
MathJax on your own server, or locally on your own hard disk.  To do
so you will need to do the following things:

1.  Obtain a copy of MathJax and make it available on your server or
hard disk.

2.  Configure MathJax to suit the needs of your site.

3.  Link MathJax into the web pages that are to include mathematics.

4.  Put mathematics into your web pages so that MathJax can display
    it.


Obtaining and Installing MathJax
--------------------------------

The easiest way to set up MathJax is to obtain the v2.0 archive from
the `MathJax download page <http://www.mathjax.org/download/>`_ (you
should obtain a file named something like
``mathjax-MathJax-v2.0-X-XXXXXXXX.zip`` where the X's are random
looking numbers and letters).  This archive includes both the MathJax
code and the MathJax webfonts, so it is the only file you need.  Note
that this is different from v1.0 and earlier releases, which had the
fonts separate from the rest of the code.

Unpack the archive and place the resulting MathJax folder onto your
web server at a convenient location where you can include it into your
web pages.  For example, making ``MathJax`` a top-level directory on
your server would be one natural way to do this.  That would let you
refer to the main MathJax file via the URL ``/MathJax/MathJax.js``
from within any page on your server.

**Note:** While this is the easiest way to set up MathJax initially, there
is a better way to do it if you want to be able to keep your copy of
MathJax up-to-date. That uses the `Git <http://git-scm.com/>`_ version
control system, and is described in the :ref:`Installing MathJax
<getting-mathjax-git>` document. If you prefer using `Subversion
<http://subversion.apache.org/>`_, you can also use that to get a copy
of MathJax (see :ref:`Installing MathJax via SVN
<getting-mathjax-svn>`).

Once you have MathJax set up on your server, you can test it using the
files in the ``MathJax/test`` directory.  If you are putting MathJax
on a server, load them in your browser using their web addresses
rather than opening them locally (i.e., use an ``http://`` URL rather
than a ``file://`` URL).  When you view the ``index.html`` file, after
a few moments you should see a message indicating that MathJax appears
to be working.  If not, check that the files have been transferred to
the server completely and that the permissions allow the server to
access the files and folders that are part of the MathJax directory.
(Be sure to verify the MathJax folder's permissions as well.)  Check
the server log files for any errors that pertain to the MathJax
installation; this may help locate problems in the permission or
locations of files.


Configuring your copy of MathJax
--------------------------------

When you include MathJax into your web pages as described below, it
will load the file ``config/TeX-AMS-MML_HTMLorMML.js`` (i.e., the file
named ``TeX-AMS-MML_HTMLorMML.js`` in the ``config`` folder of the
main ``MathJax`` folder).  This file preloads all the most
commonly-used components of MathJax, allowing it to process
mathematics that is in the TeX or LaTeX format, or in MathML notation.
It will produce output in MathML form if the user's browser supports
that sufficiently, and will use HTML-with-CSS to render the
mathematics otherwise.

There are a number of other prebuilt configuration files that you can
choose from as well, or you could use the ``config/default.js`` file and
customize the settings yourself.  The combined configuration files are
described more fully in :ref:`Common Configurations
<common-configurations>`, and the configuration options are described in
:ref:`Configuration Options <configuration>`.

Note: The configuration process changed between MathJax v1.0 and v1.1,
so if you have existing pages that use MathJax v1.0, you may need to
modify the tag that loads MathJax so that it conforms with the new
configuration process.  See :ref:`Installing and Configuring MathJax
<installation>` for more details.


Linking your copy of MathJax into a web page
--------------------------------------------

You can include MathJax in your web page by putting

.. code-block:: html

    <script type="text/javascript" src="path-to-MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

in your document's ``<head>`` block.  Here, ``path-to-MathJax`` should
be replaced by the URL for the main MathJax directory, so if you have
put the ``MathJax`` directory at the top level of you server's web
site, you could use

.. code-block:: html

    <script type="text/javascript" src="/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

to load MathJax in your page.  For example, your page could look like

.. code-block:: html

    <html>
        <head>
            ...
            <script type="text/javascript" src="/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
        </head>
        <body>
            ...
        </body>
    </html>

If you have installed MathJax on a server that is in a different
domain from the one serving the page that loads MathJax, be sure to
read the :ref:`Notes About Shared Servers <cross-domain-linking>` for
more details.  In that case, you may wish to consider using the
:ref:`MathJax CDN <mathjax-cdn>` rather than installing your own copy
of MathJax.


Putting mathematics in a web page
=================================

To put mathematics in your web page, you can use :term:`TeX` and
:term:`LaTeX` notation, :term:`MathML` notation, :term:`AsciiMath`
notation, or a combination of all three within the same page; the
MathJax configuration tells MathJax which you want to use, and how you
plan to indicate the mathematics when you are using TeX notation. The
configuration file used in the examples above tells MathJax to look
for both TeX and MathML notation within your pages.  Other
configuration files tell MathJax to use AsciiMath input.  These three
formats are described in more detail below.


.. _tex-and-latex-input:

TeX and LaTeX input
-------------------

Mathematics that is written in :term:`TeX` or :term:`LaTeX` format is
indicated using *math delimiters* that surround the mathematics,
telling MathJax what part of your page represents mathematics and what
is normal text.  There are two types of equations: ones that occur
within a paragraph (in-line mathematics), and larger equations that
appear separated from the rest of the text on lines by themselves
(displayed mathematics).

The default math delimiters are ``$$...$$`` and ``\[...\]`` for
displayed mathematics, and ``\(...\)`` for in-line mathematics.  Note
in particular that the ``$...$`` in-line delimiters are **not** used
by default.  That is because dollar signs appear too often in
non-mathematical settings, which could cause some text to be treated
as mathematics unexpectedly.  For example, with single-dollar
delimiters, "... the cost is $2.50 for the first one, and $2.00 for
each additional one ..." would cause the phrase "2.50 for the first
one, and" to be treated as mathematics since it falls between dollar
signs.  For this reason, if you want to use single-dollars for in-line
math mode, you must enable that explicitly in your configuration:

.. code-block:: html

    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
    });
    </script>
    <script type="text/javascript" src="path-to-mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

See the ``config/default.js`` file, or the :ref:`tex2jax configuration
options <configure-tex2jax>` page, for additional configuration
parameters that you can specify for the `tex2jax` preprocessor,
which is the component of MathJax that identifies TeX notation within
the page.  See the :ref:`TeX and LaTeX <TeX-support>` page for 
more on MathJax's support for TeX, and in particular how to deal with
single dollar signs in your text when you have enabled single
dollar-sign delimiters.

Here is a complete sample page containing TeX mathematics (also
available in the `test/sample-tex.html
<http://cdn.mathjax.org/mathjax/2.0-latest/test/sample-tex.html>`_
file):

.. code-block:: html

    <!DOCTYPE html>
    <html>
    <head>
    <title>MathJax TeX Test Page</title>
    <script type="text/x-mathjax-config">
      MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
    </script>
    <script type="text/javascript"
      src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    </script>
    </head>
    <body>
    When $a \ne 0$, there are two solutions to \(ax^2 + bx + c = 0\) and they are
    $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$
    </body>
    </html>

Since the TeX notation is part of the text of the page, there are some
caveats that you must keep in mind when you enter your mathematics.
In particular, you need to be careful about the use of less-than
signs, since those are what the browser uses to indicate the start of
a tag in HTML.  Putting a space on both sides of the less-than sign
should be sufficient, but see :ref:`TeX and LaTeX support
<TeX-support>` for details.

If you are using MathJax within a blog, wiki, or other content
management system, the markup language used by that system may
interfere with the TeX notation used by MathJax.  For example, if your
blog uses :term:`Markdown` notation for authoring your pages, the
underscores used by TeX to indicate subscripts may be confused with
the use of underscores by Markdown to indicate italics, and the two
uses may prevent your mathematics from being displayed.  See :ref:`TeX
and LaTeX support <TeX-support>` for some suggestions about how to
deal with the problem.

There are a number of extensions for the TeX input processor that are
loaded by the ``TeX-AMS-MML_HTMLorMML`` configuration.  These include:

- `TeX/AMSmath.js`, which defines the AMS math environments and
  macros,

- `TeX/AMSsymbols.js`, which defines the macros for the symbols in
  the `msam10` and `msbm10` fonts,

- `TeX/noErrors.js`, which shows the original TeX code rather than
  an error message when there is a problem processing the TeX, and

- `TeX/noUndefined.js`, which prevents undefined macros from
  producing an error message, and instead shows the macro name in red.

Other extensions may be loaded automatically when needed.  See
:ref:`TeX and LaTeX support <TeX-support>` for details on the other
TeX extensions that are available.


.. _mathml-input:

MathML input
------------

For mathematics written in :term:`MathML` notation, you mark your
mathematics using standard ``<math>`` tags, where ``<math
display="block">`` represents displayed mathematics and ``<math
display="inline">`` or just ``<math>`` represents in-line mathematics.

Note that this will work in HTML files, not just XHTML files (MathJax
works with both), and that the web page need not be served with any
special MIME-type.  Also note that, unless you are using XHTML rather
than HTML, you should not include a namespace prefix for your
``<math>`` tags; for example, you should not use ``<m:math>`` except
in a file where you have tied the ``m`` namespace to the MathML DTD by
adding the ``xmlns:m="http://www.w3.org/1998/Math/MathML"`` attribtue
to your file's ``<html>`` tag.

Although it is not required, it is recommended that you include the
``xmlns="http://www.w3.org/1998/Math/MathML"`` attribute on all
``<math>`` tags in your document (and this is preferred to the use of
a namespace prefix like ``m:`` above, since those are deprecated in
HTML5) in order to make your MathML work in the widest range of
situations.

Here is a complete sample page containing MathML mathematics (also
available in the `test/sample-mml.html
<http://cdn.mathjax.org/mathjax/2.0-latest/test/sample-mml.html>`_
file):

.. code-block:: html

    <!DOCTYPE html>
    <html>
    <head>
    <title>MathJax MathML Test Page</title>
    <script type="text/javascript"
      src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    </script>
    </head>
    <body>

    <p>
    When
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <mi>a</mi><mo>&#x2260;</mo><mn>0</mn>
    </math>,
    there are two solutions to
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <mi>a</mi><msup><mi>x</mi><mn>2</mn></msup>
      <mo>+</mo> <mi>b</mi><mi>x</mi>
      <mo>+</mo> <mi>c</mi> <mo>=</mo> <mn>0</mn>
    </math>
    and they are
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <mi>x</mi> <mo>=</mo> 
      <mrow>
        <mfrac>
          <mrow>
            <mo>&#x2212;</mo>
            <mi>b</mi>
            <mo>&#x00B1;</mo>
            <msqrt>
              <msup><mi>b</mi><mn>2</mn></msup>
              <mo>&#x2212;</mo>
              <mn>4</mn><mi>a</mi><mi>c</mi>
            </msqrt>
          </mrow>
          <mrow> <mn>2</mn><mi>a</mi> </mrow>
        </mfrac>
      </mrow>
      <mtext>.</mtext>
    </math>
    </p>
    
    </body>
    </html>

When entering MathML notation in an HTML page (rather than an XHTML
page), you should **not** use self-closing tags, but should use explicit
open and close tags for all your math elements.  For example, you
should use 

.. code-block:: html

    <mspace width="5pt"></mspace>

rather than ``<mspace width="5pt" />`` in an HTML document.  If you
use the self-closing form, some browsers will not build the math tree
properly, and MathJax will receive a damaged math structure, which
will not be rendered as the original notation would have been.
Typically, this will cause parts of your expression to not be
displayed.  Unfortunately, there is nothing MathJax can do about that,
since the browser has incorrectly interpreted the tags long before
MathJax has a chance to work with them.

The component of MathJax that recognizes MathML notation within the
page is called the `mml2jax` extension, and it has only a few
configuration options; see the ``config/default.js`` file or the
:ref:`mml2jax configuration options <configure-mml2jax>` page for more
details.  See the :ref:`MathML <MathML-support>` page for more on
MathJax's MathML support.


.. _asciimath-input:

AsciiMath input
---------------

MathJax v2.0 includes a new input format: :term:`AsciiMath` notation.
For mathematics written in this form, you mark your mathematical
expressions by surrounding them in "back-ticks", i.e., ```...```.

Here is a complete sample page containing AsciiMath notation (also
available in the `test/sample-asciimath.html
<http://cdn.mathjax.org/mathjax/2.0-latest/test/sample-asciimath.html>`_
file):

.. code-block:: html

    <!DOCTYPE html>
    <html>
    <head>
    <title>MathJax AsciiMath Test Page</title>
    <script type="text/javascript"
      src="../MathJax.js?config=AM_HTMLorMML-full"></script>
    </head>
    <body>
    
    <p>When `a != 0`, there are two solutions to `ax^2 + bx + c = 0` and
    they are</p>
    <p style="text-align:center">
      `x = (-b +- sqrt(b^2-4ac))/(2a) .`
    </p>

    </body>
    </html>

The component of MathJax that recognizes asciimath notation within the
page is called the `asciimath2jax` extension, and it has only a few
configuration options; see the ``config/default.js`` file or the
:ref:`asciimath2jax configuration options <configure-asciimath2jax>` page for more
details.  See the :ref:`AsciiMath support <AsciiMath-support>` page for more on
MathJax's AsciiMath support.



Where to go from here?
======================

If you have followed the instructions above, you should now have
MathJax installed and configured on your web server, and you should be
able to use it to write web pages that include mathematics.  At this
point, you can start making pages that contain mathematical content!

You could also read more about the details of how to :ref:`customize
MathJax <loading>`.

If you are trying to use MathJax in blog or wiki software or in some
other content-management system, you might want to read about :ref:`using
MathJax in popular platforms <platforms>`.

If you are working on dynamic pages that include mathematics, you
might want to read about the :ref:`MathJax Application Programming
Interface <mathjax-api>` (its API), so you know how to include
mathematics in your interactive pages.

If you are having trouble getting MathJax to work, you can read more
about :ref:`installing MathJax <installation>`, or :ref:`loading and
configuring MathJax <loading>`.

Finally, if you have questions or comments, or want to help support
MathJax, you could visit the :ref:`MathJax community forums
<community-forums>` or the :ref:`MathJax bug tracker
<community-tracker>`.
