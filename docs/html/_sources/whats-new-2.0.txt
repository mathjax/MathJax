.. _whats-new-2.0:

**************************
What's New in MathJax v2.0
**************************

MathJax version 2.0 includes many new and improved features, including
much better speeds in Internet Explorer, a new AsciiMath input
processor, a new :term:`SVG` output processor, support for additional
LaTeX commands, and many bug fixes, to name just a few of the changes.


Major speed improvement for HTML-CSS output, particularly in IE
===============================================================

The HTML-CSS output processing was redesigned to avoid the page
reflows that were the main source of the speed problem in Internet
Explorer 8 and 9.  For test pages having between 20 and 50 typeset
expressions, we see an 80% reduction in output processing time for
IE8, a 50% reduction for IE9, and between 15% and 25% reduction for
most other browsers over the corresponding v1.1a times.  Since the
processing time in v1.1a grows non-linearly in IE, you should see even
larger savings for pages with more equations when using v2.0.  Forcing
IE7 emulation mode is no longer necessary (and indeed is no longer
recommended).


Reduced flickering during typsetting
====================================

In the past, each expression was displayed as soon as it was typeset,
which caused a lot of visual flickering as MathJax processed the page.
In v2.0, the output is processed in blocks so that typeset expressions
are revealed in groups.  This reduces the visual distraction, and also
speeds up the processing.  The number of equations in a block can be
controlled through the ``EqnChunk`` parameter in the HTML-CSS or SVG
block of your configuration.  See the :ref:`configuration options for
HTML-CSS <configure-HTML-CSS>` and :ref:`configuration options for SVG
<configure-SVG>` pages for details.

If the page URL includes a hash reference (a link to a particular
location within the page), MathJax v2.0 will jump to that location
after the page has finished typsetting.  (Since the size of the page
may have changed due to the mathematical typsetting, that location may
no longer be visible on screen, so MathJax moves there when it is done
with the initial typesetting.)  You can control this behavior with the
``positionToHash`` parameter in the main section of your
configuration.  See the :ref:`core configuration options
<configure-hub>` page for details.


Automatic equation numbering of TeX formulas
============================================

The TeX input jax now can be configured to add equation numbers
(though the default is not to number equations so that existing pages
will not change their appearance).  This is controlled through the
``equationNumbers`` section of the ``TeX`` block of your configuration
(see the :ref:`equation numbering <tex-eq-numbers>` section for
details).  You can request that the numbering follow the AMS-style
numbering of environments, or you can request that every displayed
equation be numbered.  There are now ``\label``, ``\ref``, and
``\eqref`` commands to make it easier to link to particular equations
within the document.


Automatic line breaking of long displayed equations
===================================================

MathJax now implements the MathML3 specification for automatic line
breaking of displayed equations in its HTML-CSS output.  This is
disabled by default, but can be enabled via the ``linebreaks`` section
of the ``HTML-CSS`` or ``SVG`` block of your configuration (see the
:ref:`automatic line breaking <automatic-linebreaking>` section for
details).  Note that automatic line breaking only applies to displayed
equations, not in-line equations, unless they are themselves longer
than a line.  The algorithm uses the nesting depth, the type of
operator, the size of spaces, and other factors to decide on the
breakpoints, but it does not know the meaning of the mathematics, and
may not choose the optimal breakpoints.  We will continue to work on
the algorithm as we gain information from its actual use in the field.


New AsciiMath input jax and SVG output jax
==========================================

MathJax currently processes math in either :term:`TeX` and
:term:`LaTeX` format, or :term:`MathML` notation; version 2.0 augments
that to include :term:`AsciiMath` notation (see `the ASCIIMathML
home page <http://www1.chapman.edu/~jipsen/mathml/asciimath.html>`_
for details on this format).  This is a notation that is easier for
students to use than TeX, and has been requested by the user
community.  See the :ref:`AsciiMath support <AsciiMath-support>` page
for details.

In addition to the HTML-CSS and Native MathML output available in
v1.1, MathJax v2.0 includes an :term:`SVG`-based output jax.  This should
prove to be more reliable than the HTML-CSS output, as it avoids some
CSS, web-font, and printing issues that the HTML-CSS output suffers
from, and it currently has no browser-dependent code.  The SVG mode
even works in some ebook readers (like Apple iBooks and Calibre).  See
the :ref:`output formats <output-formats>` documentation for details.


New combined configuration files
================================

Pre-defined configuration files that include the AsciiMath and SVG
processors are now available with MathJax v2.0. These include
``AM_HTMLorMML``, ``TeX-AMS-MML_SVG``, and ``TeX-MML-AM_HTMLorMML``.
See the :ref:`common configurations <config-files>` section for details.


MathJax contextual menu now available on mobile devices
=======================================================

MathJax v2.0 provides access to its contextual menu in mobile devices
that are based on the WebKit (Safari) and Gecko (Firefox) engines.
For Mobile Firefox, the menu is accessed by a tap-and-hold on any
expression rendered by MathJax (this is Mobile Firefox's standard
method of triggering a contextual menu).  In Mobile Safari, use a
double-tap-and-hold (you may need to zoom in a bit to be able to
accomplish this).  This is the first step toward providing a better
interface for mobile devices.


Improved support for screen readers
===================================

Some issues surrounding the use of screen readers and their
interaction with MathPlayer have been resolved in MathJax v2.0.  In
particular, there are additional menu items that allow the user finer
control over some aspects of MathJax's interface that were interfering
with some screen readers' ability to properly identify the
mathematics.  Several stability issues with MathPlayer have also been
addressed.  In Internet Explorer when MathPlayer is installed, there
is now a new contextual menu item to allow you to specify what events
are handled by MathJax and what should be handled by MathPlayer.  This
gives you finer control over MathPlayer's interaction with some screen
readers.


Many new TeX additions and enhancements
=======================================

* New `mhchem` chemistry extension (adds ``\ce``, ``\cf``, and ``\cee`` macros)

* New `cancel` extension (adds ``\cancel``, ``\bcancel``, ``\xcancel``, and ``\cancelto`` macros)

* New `extpfeil` extension (adds more stretchy arrows)

* New `color` extension (makes ``\color`` work as a switch, as in LaTeX).
  Adds ``\definecolor``, other color models, LaTeX named colors,
  ``\colorbox``, ``\fcolorbox``, etc.

* New `begingroup` extension to allow macro definitions to be
  localized. Adds ``\begingroup`` and ``\endgroup`` for isolating macro
  declarations, and defines ``\let``, ``\renewenvironment``, ``\global``, and
  ``\gdef``.

* New `enclose` extension to give TeX access to ``<menclose>`` elements.
  Adds ``\enclose{type}[attributes]{math}`` macro.

* New `action` extension to give TeX access to ``<maction>`` elements.
  Adds ``\mathtip{math}{tip}``, ``\texttip{math}{tip}``, and
  ``\toggle{math1}{math2}...\endtoggle`` macros.

* New ``\mmToken{type}[attributes]{text}`` macro for producing ``<mo>``,
  ``<mi>``, ``<mtext>``, and other token MathML elements directly.

* New ``\bbox[color;attributes]{math}`` macro to add background color,
  padding, borders, etc.

* New ``\middle`` macro for stretchy delimiters between ``\left`` and ``\right``.

* New ``\label``, ``\ref``, and ``\eqref`` macros for numbered equations.

* Better implementation of ``\not`` so it produces proper MathML when possible.

* Better implementation of ``\dots`` that selects ``\ldots`` or ``\cdots``
  depending on the context.

* Better implementation of ``\cases`` that automatically uses ``\text`` on
  the second entry in each row.

* Safer implementation of ``\require`` that only allows loading from
  extensions directory.

* Allow ``\newcomand`` to provide a default parameter.

* Allow ``\\`` to take an optional argument that specifies additional
  space between lines.

* Allow ``\\`` to be used anywhere (to force a line break), not just in
  arrays.

* Allow optional alignment parameter for array, aligned, and gathered
  environments.

See the :ref:`TeX support <TeX-support>` page for details on these
extensions and macros.


Font enhancements
=================

*  Work around for the OS X Lion STIX font problem.

*  Support for STIX-1.1 fonts (detection of which version you have,
   and use data appropriate for that).

*  New WOFF versions of the web fonts (smaller, so faster to
   download).

*  Data for more stretchy characters in HTML-CSS output.

*  Add support for Unicode planes 1 through 10 (not just the Math
   Alphabet block) in HTML-CSS output.

*  Increased timeout for web fonts (since it was switching to image
   fonts too often, especially for mobile devices).

*  Only switch to image fonts if the first web font fails to load (if
   we can access one, assume we can access them all).

*  Allow ``<mtext>`` elements to use the page font rather than MathJax
   fonts (optionally).  This is controlled by the ``mtextFontInerhit``
   configuration parameter for HTML-CSS and SVG output jax.

*  Provide better control over the font used for characters that are
   not in the MathJax fonts.

*  Allow Firefox to use web-based fonts when a local URL uses MathJax
   from the CDN (in the past it would force image fonts when that was
   not necessary).


Interface improvements
======================

*  The MathJax contextual menu has been reorganized to make it easier
   to get the source view, and to control the parameters for
   MathPlayer in IE.

*  The MathJax contextual menu is available in mobile devices (see
   description above).

*  Warning messages are issued if you switch renderers to one that is
   inappropriate for your browser.

*  MathJax now starts processing the page on the ``DOMContentLoaded``
   event rather than the page ``onload`` event (this allows the
   mathematics to appear sooner).

*  Native MathML output is now scaled to better match the surrounding
   font (like it is for HTML-CSS output).

*  Better CSS styling for NativeMML output in Firefox in order to
   handle ``\cal`` and other fonts.

*  MathML output now (optionally) includes class names to help mark
   special situations generated by the TeX input jax.  (This lets the
   MathML from the Show Source menu item better reproduce the original
   TeX output.)

*  MathJax now loads the menu and zoom code (if they haven't been
   loaded already) after the initial typesetting has occured so that
   they will be available immediately when a user needs those
   features, but do not delay the initial typesetting of the
   mathematics.

*  For the `tex2jax` preprocessor, the ``processClass`` can now be
   used to override the ``skipTags`` to force a tag that is usually
   skipped to have its contents be processed.

*  The `noErrors` and `noUndefined` extensions can now be disabled via
   a configuration option (since they are included in many of the
   combined configuration files).  See the `noErrors` and
   `noUndefined` sections of the :ref:`TeX support
   <TeX-support>` page for more information.

*  There is a new :meth:`MathJax.Hub.setRenderer()` function that can
   be used to switch the current renderer.  See the :ref:`MathJax Hub
   API <api-hub>` documentation for details.

*  A user-defined macros is no longer overridden if an extension is
   loaded that redefines that macro.

*  Improved web-font detection reliability.


.. _important-changes-2.0:

Important changes from previous versions
========================================

*  The default renderer for Firefox has been changed from `NativeMML` to
   `HTML-CSS` (in those configurations that choose between the two).
   The only browser that defaults to `NativeMML` is now IE with
   MathPlayer installed.  You can configure this to your liking using
   the :ref:`MMLorHTML configuration options <configure-MMLorHTML>`.

*  `NativeMML` output will now be selected in IE9 when MathPlayer is
   present (since IE9 was released the same day as MathJax v1.1a, and
   there had been problems with IE9 beta releases, we weren't sure if
   MathPlayer would work with the official release, and so did not
   select NativeMML by default.)

*  The performance improvements in IE8 and IE9 now make it unnecessary
   to use a ``<meta>`` tag to force IE7 emulation mode.  In fact IE9 in
   IE9 standards mode now runs faster than IE9 in IE7 standards mode,
   and IE8 in IE8 standards mode is comparable to IE8 in IE7 standards
   mode.  We now recommend that you use 

   .. code-block:: html

       <meta http-equiv="X-UA-Compatible" content="IE=edge">

   to obtain the highest emulation mode available in IE, which
   will be the fastest one for MathJax 2.0.

*  The `tex2jax` preprocessor now balances braces when looking for the
   closing math delimiter.  That allows expressions like

   .. code-block:: latex

       $y = x^2 \hbox{ when $x > 2$}$

   to be properly parsed as a single math expression rather than two
   separate ones with unbalanced braces.  The old behavior can be
   obtained by setting ``balanceBraces`` to false in the ``tex2jax``
   block of your configuration.  (See the :ref:`tex2jax configuration
   options <configure-tex2jax>` for details.)

*  If you are hosting your own copy of MathJax on your server, and
   that copy is being used from pages in a different domain, you will
   have set up the access control paramters for the font directory to
   allow Firefox to access the font files properly.  Since MathJax 2.0
   includes fonts in WOFF format, you will need to include ``woff`` in
   you access control declaration for the fonts.  E.g., use
   ::

       <FilesMatch "\.(ttf|otf|eot|woff)$">
       <IfModule mod_headers.c>
       Header set Access-Control-Allow-Origin "*"
       </IfModule>
       </FilesMatch>

   in the ``.htaccess` file for the ``Mathjax/fonts`` directory if you
   are using the Apache web server.  See :ref:`Notes about shared
   installations <cross-domain-linking>` for details.

*  The ``\cases`` macro now properly places the second column in text
   mode not math mode.  In the past, one needed to use ``\text`` in
   the second column to achieve the proper results; pages that did
   this will still work properly in v2.0.  Pages that took advantage
   of the math mode in the second column will need to be adjusted.

*  The ``\dots`` macro now produces ``\ldots`` or ``\cdots`` depending
   on the context (in the past, ``\dots`` always produced ``\ldots``).

*  A one pixel padding has been added above and below HTML-CSS and SVG
   output so that math on successive lines of a paragraph won't bump
   into each other.

*  There is a new `MathPlayer` submenu of the `Math Settings` menu in
   the MathJax contextual menu that allows the user to control what
   events are passed on to MathPlayer.  This allows better control for
   those using assistive devices like screen readers.  When menu
   events are being passed on to MathPlayer, the MathJax menu can be
   obtained by ALT-clicking on a typeset expression (so the user can
   still access MathJax's other features).

*  In order to improve stability with IE when MathPlayer is installed,
   MathJax now adds the namespace and object bindings that are needed
   for MathPlayer at the time that Mathjax is first loaded, rather
   than waiting for the `NativeMML` output jax to be loaded.  Since
   this is before the configuration information has been obtained,
   this will happen regardless of whether the `NativeMML` output jax
   is requested.  This means that IE may ask the user to allow
   MathPlayer to be used, and may show the MathPlayer splash dialog
   even when MathPlayer is not in the end used by MathJax.  Note that
   this setup can only be performed if MathJax is loaded explicitly as
   part of the initial web page; if it is injected into the page later
   by adding a ``<script>`` tag to the page dynamically, then
   MathPlayer will be set up when the `NativeMML` jax is loaded as in
   the past, and some stability issues may occur if events are passed
   to MathPlayer.

*  The MathJax typesetting is now started on ``DOMContentLoaded``
   rather than at the page ``onload`` event, when possible, so that
   means MathJax may start typesetting the page earlier than in the
   past.  This should speed up typesetting one pages with lots of
   images or side-bar content, for example.

*  MathJax now attempts to determine whether the page's ``onload``
   event had already occurred, and if it has, it does not try to wait
   for the ``DOMContentLoaded`` or ``onload`` event before doing its
   initial typeset pass.  This means that it is no longer necessary to
   call ``MathJax.Hub.Startup.onload()`` by hand if you insert MathJax
   into the page dynamically (e.g., from a GreaseMonkey script).

*  If the page URL includes a hash reference (a link to a particular
   location within the page), MathJax v2.0 will jump to that location
   after the page has finished typsetting.  Since the size of the page
   may have changed due to the mathematical typsetting, that location
   may no longer be visible on screen, so MathJax moves there when it
   is done with the initial typesetting.  You can control this
   behavior with the ``positionToHash`` parameter in the main section
   of your configuration (see :ref:`core configuration options
   <configure-hub>`).

*  In the event that MathJax is not able to load the configuration file
   you have specified in the script tag that loads ``MathJax.js`` via
   ``config=filename``, it will no longer issue the warning message
   about a missing configuration.  The configuration process changed
   in v1.1, and that message was to help page maintainers update their
   configurations, but it turns out that for users with slow network
   connections, MathJax could time out waiting for the configuration
   file and would issue the warning message in that case, even though
   the page included the proper configuration.  That should no longer
   occur in MathJax v2.0.


Other enhancements
==================

*  Use prioritized lists of callbacks for StartupHooks, MessageHooks,
   LoadHooks, PreProcessors, and pre- and post-filters on the input jax.

*  Updated operator dictionary to correspond to current W3C version.

*  Improved browser detection for Gecko and WebKit browsers.

*  Make prefilters and postfilters for all input jax, and make them into
   hook lists rather than a single hook.

*  Use ``<mi>`` rather than ``<mo>`` for ``\sin``, ``\cos``, and other
   such functions, for ``\mathop{\rm...}`` and ``\operatorname``.

*  Add ``&ApplyFunction;`` after ``\mathop{}`` and other macros that are
   functions (e.g., ``\sin``).

*  The ``MathJax_Preview`` style has been moved from ``HTML-CSS/jax.js`` to
   ``MathJax.js``, since it is common to all output.

*  The `autobold` extension now uses ``\boldsymbol`` rather than
   ``\bf`` so that it will affect more characters.

*  Make units of ``mu``'s be relative to the scriptlevel (as they
   are supposed to be).

*  Reorganized the event-handling code to make it more modular and reduce
   redundancy in the different output jax.

*  Modified CSS in `NativeMML` output for Firefox to use local copies of
   the web fonts, if they are available.

*  Error messages now have the MathJax contextual menu.

*  Better handling of some characters not in the web fonts (remap to
   locations where they exist, when possible).

*  Better choice of accent characters in some cases.

*  Better handling of pseudo-scripts (like primes).

*  Better sizing of characters introduced by ``\unicode{}``, or
   otherwise outside of the fonts known to MathJax.

*  Provide a new extension to handle tagged equations better in
   `HTML-CSS` output when there are floating elements that might
   reduce the area available to displayed equations.  (See the
   HTML-CSS extensions section of the :ref:`output formats
   <output-formats>` documentation for detais.)

*  Use a text font for ``\it`` rather than the math italics, so
   spacing is better.

*  Handle italic correction better in `HTML-CSS` output

*  Handle ``href`` attributes better, especially when on ``<math>``
   elements.

*  Allow ``\sqrt\frac{}{}`` without producing an error.


Other bug fixes
===============

*  MathPlayer setup changed to prevent crashes.

*  Moved remapping of ``<mo>`` contents to the output jax so that the
   original contents aren't changed.

*  Don't combine ``mathvariant`` with ``fontstyle`` or ``fontweight``
   (as per the MathML specification).

*  Isolate non-standard attributes on MathML elements so that they don't
   interfere with the inner workings of MathJax.

*  Properly handle width of border and padding in merrors in `HTML-CSS`
   output.

*  Properly handle lower-case Greek better.

*  Process weight and style of unknown characters properly.

*  Fixed spacing problems with ``\cong`` in MathJax web fonts .

*  Choose better sizes for ``\widehat`` and ``\widetilde``

*  Fixed problem with detecting em/ex sizes when uses in mobile devices
   with small screen widths.

*  Fixed MathML output when dimensions of ``mu``'s are used in TeX input.

*  Better handling of table borders from TeX.

*  Fixed some problems with table widths and heights, and spacing.

*  Better handling of colored backgrounds in `HTML-CSS` output.

*  Handle border and padding CSS styles better in `HTML-CSS` output.

*  Fixed multline environment to put tags on bottom row when
   ``TagSide`` is set to ``right``.

*  Force reflow after equations are typeset so that some rendering
   problems in tables are corrected in Firefox and WebKit browsers.

*  Fixed a number of bugs with the size of zoom boxes and the size of their
   content.

*  Have equations with tags zoom into a full-width zoom box to
   accommodate the tag.

*  Fixed positioning problem with zoom boxes in NativeMML mode.

*  Don't allow mouse events on zoomed math.

*  Fixed ``MathJax.Hub.getJaxFor()`` and ``MathJax.Hub.isJax()`` to
   properly handle elements that are part of an output jax's output
   (in particular, you can find the element jax from any DOM element
   in the output).

*  Fixed a number of font anomalies (problems in the data files).

*  Fixed problem where ``<mspace>`` with a background color would not
   always overlay previous items.

*  Fixed a problem with colored ``<mspace>`` elements being too tall in
   IE/quirks mode.

*  Fixed problem where ``<mtable>`` with ``equalrows="true"`` would
   not produce equal height rows.

*  Allow ``<mpadded>`` background color to be specified exactly (i.e.,
   without the 1px padding) when one of its dimensions is given
   explicitly (or there is no content).

*  Avoiding flicker problem with hover zoom trigger in Firefox.

*  Fix ``\unicode`` bug with font names that include spaces.

*  Remove internal multiple spaces in token elements as per the MathML
   specification.

*  Work around HTML5 removing namespaces, so that ``xmlns:xlink``
   becomes ``xlink`` with no namespace, which confuses the XML parsers.

*  Fix ``MathJax.Message.Set()`` and ``MathJax.Message.Clear()`` so
   that a delay of 0 is properly handled.

*  Produce better MathML for ``\bmod``, ``\mod``, and ``\pmod``.

*  Don't allow Safari/Windows to use STIX fonts since it can't access
   characters in Plane1 (the mathematical alphabets).

*  Fix ``\thickapprox`` to use the correct glyph in `HTML-CSS` output
   with MathJax web fonts.

*  Make style attributes work on ``<mstyle>`` elements.

*  Better handling of border and padding on MathML elements in
   `HTML-CSS` output.

*  Fixed error with size of ``\:`` space.

*  Allow delimiter of ``.`` on ``\genfrac`` (it was accidentally rejected).

*  Handle AMSmath control sequences with stars better (``\cs{*}`` no longer
   counts as ``\cs*``).

*  Fixed wrong character number in stretchy data for `U+221A`.

*  Fixed ``<annotation-xml>`` to use the proper scaling in `HTML-CSS`
   output.

*  Fixed a problem with combining characters when they are used as
   accents.

*  Fixed a problem in Firefox with ``\mathchoice`` when the contents have
   negative width.

*  TeX input jax no longer incorrectly combines ``<mo>`` elements that have
   different variants, styles, classes, or id's.

*  Fixed the ``scriptlevel`` when ``<munderover>`` has base with
   ``movablelimits="true"`` in non-display mode.

*  Fixed typo in implementation of ``SimpleSUPER``.

*  Fixed typo in self-closing flag for ``<mprescript>`` tag.

*  Prevent infinite loop if one of the jax fails to load (due to failure
   to compile or timeout waiting for it to load).

*  Fixed a whitespace issue in token elements with IE/quirks mode in
   the `MathML` input jax.

*  Make sure height is above depth when making spaces and rules in
   `HTML-CSS` and `SVG` output.

*  Fixed `HTML-CSS` tooltip to be work properly when a restart occurs
   within the tooltip.

*  Fixed problem with size of colored backgrounds on ``<mo>`` in some
   circumstances in `HTML-CSS` output.

*  Make ``\ulcorner``, etc. use more approprate unicode positions, and remap
   those positions to the locations in the MathJax web fonts.


Some technical changes
======================

*  Break the processing phase into two separate phases to do input
   processing separately from output processing (they used to be
   interleaved).  This makes it easier to implement forward references
   for the ``\ref`` macro.

*  Make ``Font Preference`` menu honor the ``imageFont`` setting.

*  Changed the name of the preview filter commands to ``previewFilter``
   in all preprocessors.

*  Make ``^`` and ``_`` be stretchy even though that isn't in the W3C
   dictionary.

*  Fixed `HTML-CSS` output problem when a multi-character token element has
   characters taken from multiple fonts.

*  Force message text to be black in FontWarnings and configuration
   warnings.

*  Added ``Find()`` and ``IndexOf()`` commands to menus to locate menu items.

*  Added menu signals for post/unpost and activation of menu items.

*  Added signals for typesetting of unknown characters.

*  Added signals for zoom/unzoom.

*  Added More signals for error conditions.

*  Allow preferences to select MathML output for Safari with late enough
   version.

*  Improved `About MathJax` box.

*  Have `tex2jax` handle empty delimiter arrays and don't scan page if
   there is nothing to look for.

*  Make delay following a `processing` message configurable and lengthen
   it to make browser more responsive during typesetting.

*  Make thin rules be in pixels to try to improve results in IE
   (disappearing division lines).

*  Mark all output elements as ``isMathJax``, so it can be used to identify
   what elements are part of mathematical output.

*  Force MathZoom and MathMenu to wait for the ``Begin Styles`` message
   before inserting their styles so when they are included in the
   combined files, the author can still configure them.

*  Add default id's to the jax base object classes.

*  Mark top-level math element as having a ``texError`` when it is one (to
   make it easier to recognize).

*  Have ``Update()`` method ask ElementJax to determine if it needs updating
   (which in turn asks the associated input jax).

*  Make ``Remove()`` work for just clearing output (without detaching) if
   desired.

*  Have ElementJax store input and output jax ID's rather than pointers
   (to help avoid circular references for cleanup purposes).

*  Move input/output jax and preprocessor registries from ``Hub.config`` to
   Hub itself (they are not user configurable through ``Hub.Config``, and so
   even though they are configurations, they don't belong there).

*  Make sure embelished large ops are type ``OP`` not ``ORD`` to get spacing
   right.

*  Added ``MathJax.HTML.getScript()`` to get the contents of a script (needed
   since it works differently in different browsers).

*  Move code that prevents numbers from being treated as a unit for
   super- and subscripts to the super- and subscript routine in the
   `TeX` input jax (prevents making changes to ``\text{}``,
   ``\hbox{}``, ``\href{}``, etc.).

*  Make `mml2jax` work better with IE namespaces (IE9 no longer seems to
   list the ``xmlns`` entries on the ``<html>`` element).
