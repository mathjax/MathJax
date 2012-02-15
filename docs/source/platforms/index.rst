.. _platforms:

======================================
Using MathJax in popular web platforms
======================================

MathJax plugins are available for a growing number of wikis, blogs,
and other content-management systems.  These include WordPress,
Blogger, Sphinx, TiddlyWiki, and MathEL-Wiki.  A list of these is
available in the `web applications
<http://www.mathjax.org/community/mathjax-in-use>`_ list of the
`MathJax web site <http://www.mathjax.org>`_.

If the program you are using is not one of these, you may still be able to 
use MathJax by modifying the theme or template for your wiki or blog,
as explained below.


Using MathJax in a Theme File
=============================

Most web-based content-management systems include a theme or template
layer that determines how the pages look, and that loads information
common to all pages.  Such theme files provide one popular way to
include MathJax in your web templates in the absence of
MathJax-specific plugins for the system you are using.  To take
advantage of this approach, you will need access to your theme files,
which probably means you need to be an administrator for the site; if
you are not, you may need to have an administrator do these steps for
you.

To enable MathJax in your web platform, add the line::

    <script type="text/javascript" 
       src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

either just before the ``</head>`` tag in your theme file, or at the end of
the file if it contains no ``</head>``.

The theme files for various popular platforms are:

    `WordPress <http://wordpress.org/>`_
        ``wp-content/themes/[current_theme]/header.php``

    `Movable Type <http://www.movabletype.org/>`_
        ``[current_theme_templates]/html_head.mhtml``

    `Drupal <http://drupal.org/>`_
        ``themes/[current_theme]/page.tpl.php``

    `Joomla <http://www.joomla.org/>`_
        ``templates/[current_theme]/index.php``

    `MediaWiki <http://www.mediawiki.org/>`_
        ``skins/[current_skin].php``

    `TiddlyWiki <http://www.tiddlywiki.com/>`_
        ``*.php`` (Whatever you call your TiddlyWiki php file)

    `Moodle <http://moodle.org/>`_
        ``theme/[current_theme]/header.html``

Keep in mind that this will enable MathJax for your current
theme/template only.  If you change themes or update your theme, you
will have to repeat these steps.


Instructions for Specific Platforms
===================================

Some programs, such as WordPress and Moveable Type, allow you to edit
template files from inside their administrator interfaces.  Specific
instructions for these are given via the links below.

.. toctree::
    :maxdepth: 1

    Wordpress <wordpress>
    Movable Type <movable-type>
