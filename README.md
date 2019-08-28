# MathJax

## Beautiful math in all browsers

MathJax is an open-source JavaScript display engine for LaTeX, MathML,
andAsciiMath notation that works in all modern browsers.  It was
designed with the goal of consolidating the recent advances in web
technologies into a single, definitive, math-on-the-web platform
supporting the major browsers and operating systems.  It requires no
setup on the part of the user (no plugins to download or software to
install), so the page author can write web documents that include
mathematics and be confident that users will be able to view it
naturally and easily.  Simply include MathJax and some mathematics in
a web page, and MathJax does the rest.

Some of the main features of MathJax include:

- High-quality display of LaTeX, MathML, and AsciiMath notation in HTML pages

- Supported in most browsers with no plug-ins, extra fonts, or special
  setup for the reader

- Easy for authors, flexible for publishers, extensible for developers

- Supports math accessibility, cut-and-paste interoperability, and other
  advanced functionality

- Powerful API for integration with other web applications

See <http://www.mathjax.org/> for additional details.

## MathJax Components

MathJax version 3 uses files called *components* that contain the
various MathJax modules that you can include in your web pages or
access on a server through NodeJS.  Some components combine all the
pieces you need to run MathJax with one or more input formats and a
particular output format, while other components are pieces that can
be loaded on demand when needed, or by a configuration that specifies
the pieces you want to combine in a custom way.  For usage
instructions, see the [MathJax documentation](https://docs.mathjax.org).

Components provide a convenient packaging of MathJax's modules, but it
is possible for you to form your own custom components, or to use
MathJax's modules directly in a node application on a server.  There
are [web examples](https://github.com/mathjax/MathJax-demos-web)
showing how to use MathJax in web pages and how to build your own
components, and [node
examples](https://github.com/mathjax/MathJax-demos-node) illustrating
how to use components in node applications or call MathJax modules
directly.

## What's in this Repository

This repository contains only the component files for MathJax, not the
source code for MathJax.  These are the files served by the CDNs that
offer MathJax to the web.  In version 2, the files used on the web
were also the source files for MathJax, but in version 3, the source
files are no longer on the CDN, as they are not what are run in the
browser.  Instead, the source files are available in a separate
[MathJax source repository](https://github.com/mathjax/MathJax-src/).

The components are stored in the `es5` director, and are in ES5 format
for the widest possible compatibility.  In the future, we are likely
to make an `es6` directory for ES6 versions of the components.  The
`es5` directory is generated automatically from the contents of the
MathJax source repository.  You can rebuild the components using the
command

    npm run make-es5 --silent

Note that since the contents of this repository are generated
automatically, you should not submit pull requests that modify the
contents of the `es5` directory.  If you wish to submit a modification
to MathJax, you should make a pull request in the [MathJax source
repository](https://github.com/mathjax/MathJax-src).

## Community

The main MathJax website is <http://www.mathjax.org>, and it includes
announcements and other important information.  A [MathJax user
forum](http://groups.google.com/group/mathjax-users) for asking
questions and getting assistance is hosted at Google, and the [MathJax
bug tracker](https://github.com/mathjax/MathJax/issues) is hosted
at GitHub.

Before reporting a bug, please check that it has not already been
reported.  Also, please use the bug tracker (rather than the help
forum) for reporting bugs, and use the user's forum (rather than the
bug tracker) for questions about how to use MathJax.

## Resources

* [MathJax Documentation](https://docs.mathjax.org)
* [MathJax Components](https://github.com/mathjax/MathJax)
* [MathJax Source Code](https://github.com/mathjax/MathJax-src)
* [MathJax Web Examples](https://github.com/mathjax/MathJax-demos-web)
* [MathJax Node Examples](https://github.com/mathjax/MathJax-demos-node)
* [MathJax Bug Tracker](https://github.com/mathjax/MathJax/issues)
* [MathJax Users' Group](http://groups.google.com/group/mathjax-users)

