.. _whats-new-1.1:

**************************
What's New in MathJax v1.1
**************************

MathJax version 1.1 includes a number of important improvements and
enhancements over version 1.0.  We have worked hard to fix bugs, improve
support for browsers and mobile devices, process TeX and MathML better, and
increase MathJax's performance.

In addition to these changes, MathJax.org now offers MathJax as a network
service.  Instead of having to install MathJax on your own server, you can
link to our content delivery network (CDN) to get fast access to 
up-to-date and past versions of MathJax.  See :ref:`Loading MathJax from 
the CDN <loading-CDN>` for more details.

The following sections outline the changes in v1.1:

Optimization
============

* Combined configuration files that load all the needed files in one piece 
  rather than loading them individually.  This simplifies configuration 
  and speeds up typesetting of the mathematics on the page.

* Improved responsiveness to mouse events during typesetting.

* Parallel downloading of files needed by MathJax, for faster startup 
  times.

* Shorter timeout for web fonts, so if they can't be downloaded, you don't 
  have to wait so long.

* Rollover to image fonts if a web font fails to load (so you don't have 
  to wait for *every* font to fail.

* The MathJax files are now packed only with `yuicompressor` rather than a 
  custom compressor.  The CDN serves gzipped versions, which end up being
  smaller than the gzipped custom-packed files.

* Improved rendering speed in IE by removing ``position:relative`` from 
  the style for mathematics.

* Improved rendering speed for most browsers by isolating the mathematics
  from the page during typesetting (avoids full page reflows).


Enhancements
============

* Allow the input and output jax configuration blocks to specify extensions
  to be loaded when the jax is loaded (this avoids needing to load them up 
  front, so they don't have to be loaded on pages that don't include 
  mathematics, for example).

* Better handling of background color from style attributes.

* Ability to pass configuration parameters via script URL.

* Support HTML5 compliant configuration syntax.

* Switch the Git repository from storing the fonts in `fonts.zip` to 
  storing the `fonts/` directory directly.

* Improved About box.

* Added a minimum scaling factor (so math won't get too small).


TeX Support
============

* Added support for ``\href``, ``\style``, ``\class``, ``\cssId``.
* Avoid recursive macro definitions and other resource consumption possibilities.
* Fix for ``\underline`` bug.
* Fix for bug with ``\fbox``.
* Fix height problem with ``\raise`` and ``\lower``.
* Fix problem with ``\over`` used inside array entries.
* Fix problem with nesting of math delimiters inside text-mode material.
* Fix single digit super- and subscripts followed by punctuation.
* Make sure `movablelimits` is off for ``\underline`` and related macros.
* Fix problem with dimensions given with ``pc`` units.


MathML Support
==============

* Fix ``&lt;`` and ``&amp;`` being translated too early.
* Handle self-closing tags in HTML files better.
* Combine adjacent relational operators in ``<mo>`` tags.
* Fix entity name problems.
* Better support for MathML namespaces.
* Properly handle comments within MathML in IE.
* Properly consider ``<mspace>`` and ``<mtext>`` as space-like.
* Improved support for ``<maction>`` with embellished operators.


Other Bug Fixes
===============

* Fixed CSS bleed through with zoom and other situations.
* Fixed problems with ``showMathMenuMSIE`` when set to ``false``.
* Replaced illegal prefix characters in cookie name.
* Improved placement of surd for square roots and n-th roots.
* Fixed layer obscuring math from MathPlayer for screen readers.
* Newlines in CDATA comments are now handled properly.
* Resolved conflict between `jsMath2jax` and `tex2jax` both processing the 
  same equation.
* Fixed problem with ``class="tex2jax_ignore"`` affecting the processing of 
  sibling elements.


Browser Support
===============

**Android**

* Added detection and configuration for Android browser.
* Allow use of OTF web fonts in Android 2.2.


**Blackberry**

* MathJax now works with OS version 6.


**Chrome**

* Use OTF web fonts rather than SVG fonts for version 4 and above.


**Firefox**

* Added Firefox 4 detection and configuration.
* Fix for extra line-break bug when displayed equations are in 
  preformatted text.
* Updated fonts so that FF 3.6.13 and above can read them.


**Internet Explorer**

* Changes for compatibility with IE9.
* Fix for IE8 incorrectly parsing MathML.
* Fix for IE8 namespace problem.
* Fix for null ``parentNode`` problem.
* Fix for ``outerHTML`` not quoting values of attributes.

**iPhone/iPad**

* Added support for OTF web fonts in iOS4.2.

**Nokia**

* MathJax now works with Symbian\ :sup:`3`\ .

**Opera**

* Prevent Opera from using STIX fonts unless explicitly requested via the 
  font menu (since Opera can't display many of the characters).
* Fixed bad em-size detection in 10.61.
* Fixed a problem with the About dialog in Opera 11.


**Safari**

* Use OTF web fonts for Safari/PC.


**WebKit**

* Better version detection.
