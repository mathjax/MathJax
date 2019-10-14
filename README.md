# Simple Math

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

See <http://www.mathjax.org/> for additional details about MathJax,
and <https://docs.mathjax.org> for the MathJax documentation.

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
source code for MathJax (which are available in a separate [MathJax
source repository](https://github.com/mathjax/MathJax-src/)).  These
component files are the ones served by the CDNs that offer MathJax to
the web.  In version 2, the files used on the web were also the source
files for MathJax, but in version 3, the source files are no longer on
the CDN, as they are not what are run in the browser.

The components are stored in the `es5` director, and are in ES5 format
for the widest possible compatibility.  In the future, we may make an
`es6` directory containing ES6 versions of the components.

## Installation and Use

### Using MathJax components from a CDN on the web

If you are loading MathJax from a CDN into a web page, there is no
need to install anything.  Simply use a `script` tag that loads
MathJax from the CDN.  E.g.,

    <script id="MathJax-script" async
      src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
    </script>

See the
[documentation](https//docs.mathjax.org/en/latest/index.html#browser-components)
for more details.

### Hosting your own copy of the MathJax Components

If you want to host MathJax from your own server, you can do so by
installing the `mathjax` package using `npm` and moving the `es5`
directory to an appropriate location on your server:

    npm install mathjax
    mv node_modules/mathjax/es5 <path-to-server-location>/mathjax

Alternatively, you can get the files via github:

    git clone https://github.com/mathjax/MathJax.git mj-tmp
    mv mj-tmp/es5 <path-to-server-location>/mathjax
    rm -rf mj-tmp

Then (in either case) you can use a script tag like the following:

    <script id="MathJax-script" async
        src="<url-to-your-site>/mathjax/tex-chtml.js"></script>

where `<url-to-your-site>` is replaced by the URL to the location
where you moved the MathJax files above.

See the
[documentation](https://docs.mathjax.org/en/latest/web/hosting.html)
for details.

### Using MathJax components in a node application

To use MathJax components in a node application, install the `mathjax`
package:

    npm install mathjax

and require `mathjax` within your application:

    require('mathjax').init({ ... }).then((MathJax) => { ... });
    
where the first `{ ... }` is a MathJax configuration, and the second
`{ ... }` is the code to run after MathJax has been loaded.  E.g.

    require('mathjax').init({
      loader: {load: ['input/tex', 'output/svg']}
    }).then((MathJax) => {
      const svg = MathJax.tex2svg('\\frac{1}{x^2-1}', {display: true});
      console.log(MathJax.startup.adaptor.outerHTML(svg));
    }).catch((err) => console.log(err.message));

    
See the
[documentation](https//docs.mathjax.org/en/latest/index.html#server-nodejs)
for more details.

## Reducing the Size of the Components Directory

Since the `es5` directory contains *all* the component files, so if
you are only planning one use one configuration, you can reduce the
size of the MathJax directory by removing unused components. For
example, if you are using the `tex-chtml.js` component, then you can
remove the `tex-mml-chtml.js`, `tex-svg.js`, `tex-mml-svg.js`,
`tex-chtml-full.js`, and `tex-svg-full.js` configurations, which will
save considerable space.  Indeed, you should be able to remove
everything other than `tex-chtml.js`, and the `input/tex/extensions`, `output/chtml/fonts/woff-v2`, `adaptors`, `a11y`, and `sre` directories.  If you are using the results only on the web, you can remove `adaptors` as well.  

If you are not using A11Y support (e.g., speech generation, or semantic enrichment), then you can remove `a11y` and `sre` as well (though in this case you may need to disable the assistive tools in the MathJax contextual menu in order to avoid MathJax trying to load them when they aren't there).

If you are using SVG rather that CommonHTML output (e.g., `tex-svg.js` rather than `tex-chtml.js`), you can remove the `output/chtml/fonts/woff-v2` directopry.  If you are using MathML input rather than TeX (e.g., `mml-chtml.js` rather than `tex-chtml.js`), then you can remove `input/tex/extensions` as well.


## The Component Files and Pull Requests

The `es5` directory is generated automatically from the contents of the
MathJax source repository.  You can rebuild the components using the
command

    npm run make-es5 --silent

Note that since the contents of this repository are generated
automatically, you should not submit pull requests that modify the
contents of the `es5` directory.  If you wish to submit a modification
to MathJax, you should make a pull request in the [MathJax source
repository](https://github.com/mathjax/MathJax-src).

## MathJax Community

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

## MathJax Resources

* [MathJax Documentation](https://docs.mathjax.org)
* [MathJax Components](https://github.com/mathjax/MathJax)
* [MathJax Source Code](https://github.com/mathjax/MathJax-src)
* [MathJax Web Examples](https://github.com/mathjax/MathJax-demos-web)
* [MathJax Node Examples](https://github.com/mathjax/MathJax-demos-node)
* [MathJax Bug Tracker](https://github.com/mathjax/MathJax/issues)
* [MathJax Users' Group](http://groups.google.com/group/mathjax-users)



Apache License
                           Version 2.0, January 2004
                        https://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright 2019 Rolando Gopez Lacuata 

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       https://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.


