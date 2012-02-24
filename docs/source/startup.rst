.. _startup-sequence:

****************************
The MathJax Startup Sequence
****************************

When you load ``MathJax.js`` into a web page, it configures itself and
immediately begins loading the components it needs.  As MathJax starts
up, it uses its :ref:`signaling mechanism <synchronization>`
to indicate the actions that it is taking so that MathJax extensions
can tie into the initialization process, and so other applications
within the page can synchronize their actions with MathJax.  

The startup process performs the following actions:

- It creates the ``MathJax`` variable, and defines the following
  subsystems: 

  - ``MathJax.Object`` (object-oriented programming model)
  - ``MathJax.Callback`` (callbacks, signals, and queues)
  - ``MathJax.Ajax`` (file-loading and style-creation code)
  - ``MathJax.HTML`` (support code for creating HTML elements)
  - ``MathJax.Message`` (manages the menu line in the lower left)
  - ``MathJax.Hub`` (the core MathJax functions)

..

- It then creates the base ``MathJax.InputJax``,
  ``MathJax.OutputJax``, and ``MathJax.ElementJax`` objects.

..

- MathJax sets up the default configuration, and creates the
  signal objects used for the startup and hub actions.

..

- MathJax locates the ``<script>`` tag that loaded the ``MathJax.js``
  file, and sets the ``MathJax.Hub.config.root`` value to reflect the
  location of the MathJax root directory.

..

- MathJax determines the browser being used and its version.  It sets
  up the ``MathJax.Hub.Browser`` object, which includes the browser
  name and version, plus ``isMac``, ``isPC``, ``isMSIE``, and so on.

..

- MathJax set up the ``MathJax.Hub.queue`` command queue, and
  populates it with the commands MathJax runs at startup.  This
  includes creating the ``MathJax.Hub.Startup.onload`` onload
  handler that is used to synchronize MathJax's action with the
  loading of the page.

Once the ``MathJax.Hub.queue`` is created, the following actions are
pushed into the queue:

1.  Post the ``Begin`` startup signal

..

2.  Perform the configuration actions:

    - Post the ``Begin Config`` startup signal
    - Load any configuration files specified via ``config=`` as a script parameter
    - Execute the content of the ``<script>`` that loaded MathJax, if it is not empty
    - Wait for the ``delayStartupUntil`` condition to be met, if one was specified
    - Execute any ``text/x-mathjax-config`` script blocks
    - load the files listed in the ``MathJax.Hub.config.config`` array
    - Post the ``End Config`` startup signal

..

3.  Load the cookie values:

    - Post the ``Begin Cookie`` startup signal
    - Load the menu cookie values
    - Use the cookie to set the renderer, if it is set
    - Post the ``End Cookie`` startup signal

..

4.  Define the MathJax styles:

    - Post the ``Begin Styles`` startup signal
    - Load the stylesheet files from the ``MathJax.Hub.config.stylesheets`` array
    - Define the stylesheet described in ``MathJax.Hub.config.styles``
    - Post the ``End Styles`` startup signal

..

5.  Initialize the Message system (the grey information box in the
    lower left)

..

6.  Load the jax configuration files:

    - Post the ``Begin Jax`` startup signal
    - Load the jax config files from the ``MathJax.Hub.config.jax`` array

      - The jax will register themselves when they are loaded

    - Post the ``End Jax`` startup signal

..

7.  Load the extension files:

    - Post the ``Begin Extensions`` startup signal
    - Load the files from the ``MathJax.Hub.config.extensions`` array

      - Most extensions will post a ``[name] Ready`` or ``Extension
        [name] Ready`` startup message when they are loaded (where
        ``[name]`` is the name of the extension)

    - Post the ``End Extensions`` startup signal

..

8.  Set the MathJax menu's renderer value based on the jax that have been 
    loaded

..

9.  Wait for the onload handler to fire (in MathJax v2.0 this can
    occur on the ``DOMContentLoaded`` event rather than the page's
    ``onload`` event, so processing of mathematics can start earlier)

..

10. Set ``MathJax.isReady`` to ``true``

..

11. Perform the typesetting pass (preprocessors and processors)

    - Post the ``Begin Typeset`` startup signal
    - Post the ``Begin PreProcess`` hub signal
    - Run the registered preprocessors
    - Post the ``End PreProcess`` hub signal
    - Clear the hub signal history
    - Post the ``Begin Process`` hub signal
    - Process the math script elements on the page

      - There are a number of Hub signals generated during math
        processing, including a signal that a ``Math`` action is
        starting (with a parameter indicating what action that is),
        ``Begin`` and ``End Math Input`` messages, and ``Begin`` and
        ``End Math Output`` signals.

      - Each new math element generates a ``New Math`` hub signal
        with the math element's ID

    - Post the ``End Process`` hub signal
    - Post the ``End Typeset`` startup signal

..

12. Jump to the location specified in the URL's hash reference, if
    any.

..

13. Initiate timers to load the zoom and menu code, if it hasn't
    already been loading in the configuration (so it will be ready
    when the user needs it).

..

14. Post the ``End`` startup signal


The loading of the jax and extensions in steps 5 and 6 are now done in 
parallel, rather than sequentially.  That is, all the jax and extensions 
are requested simultaneously, so they load concurrently.  That means they 
can load in any order, and that the begin and end signals for the jax and 
extensions can be intermixed.  (In general, you will get `Begin Jax` 
followed by `Begin Extensions`, but the order of `End Jax` and `End 
Extensions` will depend on the files being loaded.)  Both 5 and 6 must 
complete, however, before 7 will be performed.

See the `test/sample-signals.html
<http://cdn.mathjax.org/mathjax/latest/test/sample-signals.html>`_ file
to see the signals in action.
