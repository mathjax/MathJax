.. _installation:

******************************
Installing and Testing MathJax
******************************

The easiest way to use MathJax is to link directly to the MathJax
distributed network service (see :ref:`Using the MathJax CDN
<mathjax-CDN>`).  In that case, there is no need to install MathJax
yourself, and you can begin using MathJax right away; skip this document on
installation and go directly to :ref:`Configuring MathJax <loading>`.

MathJax can be loaded from a public web server or privately from your
hard drive or other local media. To use MathJax in either way, you
will need to obtain a copy of MathJax. There are three ways to do
this: via ``git``, ``svn``, or via a pre-packaged archive. We
recommend ``git`` or ``svn``, as it is easier to keep your
installation up to date with these tools.


.. _getting-mathjax-git:

Obtaining MathJax via Git
=========================

The easiest way to get MathJax and keep it up to date is to use the `Git
<http://git-scm.com/>`_ version control system to access our `GitHub repository
<http://github.com/mathjax/MathJax>`_. Use the command

.. code-block:: sh

    git clone git://github.com/mathjax/MathJax.git MathJax

to obtain and set up a copy of MathJax.  (Note that there is no longer
a ``fonts.zip`` file, as there was in v1.0, and that the ``fonts``
directory is now part of the repository itself.)

Whenever you want to update MathJax, you can now use

.. code-block:: sh

    cd MathJax
    git remote show origin

to check if there are updates to MathJax (this will print several
lines of data, but the last line should tell you if your copy is up to
date or out of date). If MathJax needs updating, use

.. code-block:: sh

    cd MathJax
    git pull origin

to update your copy of MathJax to the current release version.  If you
keep MathJax updated in this way, you will be sure that you have the
latest bug fixes and new features as they become available.

This gets you the current development copy of MathJax, which is the version
that contains all the latest changes to MathJax.  Although we try to make
sure this version is a stable and usable version of MathJax, it is under
active development, and at times it may be less stable than the "release"
version.  If you prefer to use the most stable version (that may not
include all the latest patches and features), you will want to get one
of the tagged releases.  Use 

.. code-block:: sh

    cd MathJax
    git tag -l

to see all tagged versions, and use


.. code-block:: sh

    cd MathJax
    git checkout <tag_name>

to checkout the indicated version of MathJax, where ``<tag_name>`` is
the name of the tagged version you want to use.  When you want to
upgrade to a new release, you will need to repeat this for the latest
release tag.

Each of the main releases also has a branch in which critical updates 
are applied (we try hard not to patch the stable releases, but sometimes 
there is a crucial change that needs to be made).  If you want to use the 
patched version of a release, then check out the branch rather than the 
tag.  Use 

.. code-block:: sh

    cd MathJax
    git branch

to get a list of the available branches.  There are separate branches
for the main releases, but with ``-latest`` appended.  These contain
all the patches for that particular release.  You can check out one of
the branches just as you would a tagged copy.  For example, the branch
for the ``v2.0`` tagged release is ``v2.0-latest``.  To get this
release, use

.. code-block:: sh

    cd MathJax
    git checkout v2.0-latest

and to update it when changes occur, use

.. code-block:: sh

    cd MathJax
    git pull origin v2.0-latest


.. _getting-mathjax-svn:

Obtaining MathJax via SVN
=========================

If you are more comfortable with the `subversion
<http://subversion.apache.org/>`_ source control system, you may want
to use GitHub's ``svn`` service to obtain MathJax.  If you want to get the
latest revision using ``svn``, use the command

.. code-block:: sh

    svn checkout http://github.com/mathjax/MathJax/trunk MathJax

to obtain and set up a copy of MathJax.  (Note that there is no longer
a ``fonts.zip`` file as of v1.1, and that the ``fonts`` directory is
now part of the repository itself.)

Whenever you want to update MathJax, you can now use

.. code-block:: sh

    cd MathJax
    svn status -u

to check if there are updates to MathJax.  If MathJax needs updating,
use

.. code-block:: sh

    cd MathJax
    svn update

to update your copy of MathJax to the current release version.  If you
keep MathJax updated in this way, you will be sure that you have the
latest bug fixes and new features as they become available.

This gets you the current development copy of MathJax, which is the version
that contains all the latest changes to MathJax.  Although we try to make
sure this version is a stable and usable version of MathJax, it is under
active development, and at times it may be less stable than the "release"
version.  If you prefer to use one of the tagged releases instead,
then use

.. code-block:: sh

    svn checkout http://github.com/mathjax/MathJax/branch/[name] MathJax

where ``[name]`` is replaced by the name of the branch you want to
check out; e.g., ``2.0-latest``.  The branch names can be found on the
`GitHub MathJax page <http://github.com/mathjax/MathJax/>`_ under the
`branches <https://github.com/mathjax/MathJax/branches>`_ tab.


.. _getting-mathjax-zip:

Obtaining MathJax via an archive
================================

Release versions of MathJax are available in archive files from the
`MathJax download page <http://www.mathjax.org/download/>`_ or the
`MathJax GitHub page <http://github.com/mathjax/mathjax/>`_ (via the
"zip" button, or the "downloads" tab), where you can download the archive
that you need.

You should download the v2.0 archive (which will get you a file with a
name like ``mathjax-MathJax-v2.0-X-XXXXXXXX.zip``, where the X's are
some sequence of random-looking letters and numbers), then simply unzip
it.  Once the MathJax directory is unpacked, you should move it to the
desired location on your server (or your hard disk, if you are using
it locally rather then through a web server).  One natural location is
to put it at the top level of your web server's hierarchy.  That would
let you refer to the main MathJax file as ``/MathJax/MathJax.js`` from
within any page on your server.

From the `MathJax GitHub download link
<http://github.com/mathjax/mathjax/downloads>`_, you can also select
the ``Download .tar.gz`` or ``Download .zip`` buttons to get a copy of
the current development version of MathJax that contains all the
latest changes and bug-fixes.

If a packaged release receives any important updates, then those
updates will be part of the `branch` for that version.  The link to
the ``.zip`` file in the download list will be the original release
version, not the patched version.  To obtain the patched version, use
the `Branches` drop down menu (at the far left of the menus within the
page) to select the release branch that you want (for example
``v2.0-latest``), and then use the "zip" button just above it to get
the latest patched version of that release.


Testing your installation
=========================

Use the HTML files in the ``test`` directory to see if your
installation is working properly::

    test/
        index.html          # Tests default configuration
        index-images.html   # Tests image-font fallback display
        sample.html         # Sample page with lots of pretty equations
	examples.html       # Page with links to all sample pages

Open these files in your browser to see that they appear to be working
properly.  If you have installed MathJax on a server, use the web
address for those files rather than opening them locally.  When you
view the ``index.html`` file, you should see (after a few moments) a
message that MathJax appears to be working.  If not, you should check
that the files have been transferred to the server completely, and that
the permissions allow the server to access the files and folders that
are part of the MathJax directory (be sure to verify the MathJax
folder's permissions as well).  Checking the server logs may help
locate problems with the installation.


.. _cross-domain-linking:

Notes about shared installations
================================

Typically, you want to have MathJax installed on the same server as
your web pages that use MathJax.  There are times, however, when that
may be impractical, or when you want to use a MathJax installation at
a different site.  For example, a departmental server at
``www.math.yourcollege.edu`` might like to use a college-wide
installation at ``www.yourcollege.edu`` rather than installing a
separate copy on the departmental machine.  MathJax can certainly
be loaded from another server, but there is one important caveat ---
Firefox's and IE9's same-origin security policy for cross-domain scripting.

Firefox's interpretation of the same-origin policy is more strict than most
other browsers, and it affects how fonts are loaded with the `@font-face`
CSS directive.  MathJax uses this directive to load web-based math fonts
into a page when the user doesn't have them installed locally on their own
computer.  Firefox's security policy, however, only allows this when the
fonts come from the same server as the web page itself, so if you load
MathJax (and hence its web fonts) from a different server, Firefox won't be
able to access those web fonts.  In this case, MathJax will pause while
waiting for the font to download (which will never happen); it will time
out after about 5 seconds and switch to image fonts as a fallback.  
Similarly, IE9 has a similar same-origin policy in its `IE9 standards 
mode`, so it exhibits this same behavior.

There is a solution to this, however, if you manage the server where
MathJax is installed, and if that server is running the `Apache web
server <http://www.apache.org/>`_.  In the remote server's
``MathJax/fonts/`` folder, create a file called
``.htaccess`` that contains the following lines:
::

   <FilesMatch "\.(ttf|otf|eot|woff)$">
   <IfModule mod_headers.c>
   Header set Access-Control-Allow-Origin "*"
   </IfModule>
   </FilesMatch>

and make sure the permissions allow the server to read this file.  (The
file's name starts with a period, which causes it to be an "invisible" file
on unix-based operating systems.  Some systems, particularly those with
graphical user interfaces, may not allow you to create such files, so you
might need to use the command-line interface to accomplish this.)

This file should make it possible for pages at other sites to load MathJax
from this server in such a way that Firefox and IE9 will be able to
download the web-based fonts.  If you want to restrict the sites that can
access the web fonts, change the ``Access-Control-Allow-Origin`` line to
something like::

   Header set Access-Control-Allow-Origin "http://www.math.yourcollege.edu"

so that only pages at ``www.math.yourcollege.edu`` will be able to
download the fonts from this site.  See the open font library
discussion of `web-font linking
<http://openfontlibrary.org/wiki/Web_Font_linking_and_Cross-Origin_Resource_Sharing>`_
for more details.


.. _ff-local-fonts:

Firefox and local fonts
=======================

Firefox's same-origin security policy affects its ability to load
web-based fonts, as described above.  This has implications not only
to cross-domain loading of MathJax, but also to using MathJax locally
from your hard disk.  Firefox's interpretation of the same-origin
policy for local files is that the "same domain" for a page is the
directory where that page exists, or any of its subdirectories.  So if
you use MathJax in a page with a ``file://`` URL, and if MathJax is
loaded from a directory other than the one containing the original
page, then MathJax will not be able to access the web-based fonts in
Firefox.  In that case, MathJax will fall back on image fonts to
display the mathematics.

In order for Firefox to be able to load the fonts properly for a local
file, your MathJax installation must be in a subdirectory of the one
containing the page that uses MathJax.  This is an unfortunate
restriction, but it is a limitiation imposed by Firefox's security
model that MathJax can not circumvent.  Currently, this is not a
problem for other browsers.

One solution to this problem is to install the MathJax fonts locally, so
that Firefox will not have to use web-based fonts in the first place.  To
do that, either install the `STIX fonts <http://stixfonts.org>`_, or copy
the fonts from ``MathJax/fonts/HTML-CSS/TeX/otf`` into your systems fonts
directory and restart your browser (see the `MathJax fonts help page 
<http://www.mathjax.org/help/fonts>`_ for details).


IE9 and remote fonts
====================

IE9's same-origin policy affects its ability to load web-based fonts, as
described above.  This has implications not ony to cross-domain loading of
MathJax, but also to the case where you view a local page (with a
``file://`` URL) that accesses MathJax from a remote site such as the MathJax
CDN service.  In this case, IE9 does **not** honor the
``Access-Control-Allow-Origin`` setting of the remote server (as it would
if the web page came from an ``http://`` URL), and so it **never** allows the
font to be accessed.

One solution to this problem is to install the MathJax fonts locally so
that MathJax doesn't have to use web-based fonts in the first place.  Your
best bet is to install the `STIX fonts`_ on your system (see the `MathJax
fonts help page`_ for details).
