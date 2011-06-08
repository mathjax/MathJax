.. _api-message:

**************************
The MathJax.Message Object
**************************

The ``MathJax.Message`` object contains the methods used to manage the
small message area that appears at the lower-left corner of the
window.  MathJax uses this area to inform the user of time-consuming
actions, like loading files and fonts, or how far along in the
typesetting process it is.

The page author can customize the look of the message window by
setting styles for the ``#MathJax_Message`` selector (which can be
set via 

.. code-block:: javascript

    MathJax.Hub.Config({
      styles: {
        "#MathJax_Message": {
	  ...
	}
      }
    });

Because of a bug in Internet Explorer, in order to change the side of
the screen where the message occurs, you must also set the side
for ``#MathJax_MSIE_Frame``, as in

.. code-block:: javascript

    MathJax.Hub.Config({
      styles: {
        "#MathJax_Message": {left: "", right: 0},
	"#MathJax_MSIE_Frame": {left: "", right: 0}
      }
    });


It is possible that a message is already being displayed when another
message needs to be posted.  For this reason, when a message is
displayed on screen, it gets an id number that is used when you want
to remove or change that message.  That way, when a message is
removed, the previous message (if any) can be redisplayed if it hasn't
been removed.  This allows for intermittent messages (like file
loading messages) to obscure longer-term messages (like "Processing
Math" messages) temporarily.


Methods
=======

.. method:: Set(message,[n,[delay]])

    This sets the message being displayed to the given `message`
    string.  If `n` is not ``null``, it represents a message id
    number and the text is set for that message id, otherwise a new id
    number is created for this message.  If `delay` is provided, it is
    the time (in milliseconds) to display the message before it is
    cleared.  If `delay` is not provided, the message will not be
    removed automatically; you must call the
    :meth:`MathJax.Messsage.Clear()` method by hand to remove it.

    :Parameters:
        - **message** --- the text to display in the message area
        - **n** --- the message id number
        - **delay** --- amout of time to display the message
    :Returns: the message id number for this message.

.. method:: Clear(n[,delay])

    This causes the message with id `n` to be removed after the given
    `delay`, in milliseconds.  The default delay is 600 milliseconds.

    :Parameters:
        - **n** --- the message id number
        - **delay** --- the delay before removing the message
    :Returns: ``null``

.. method:: Remove()

    This removes the message frame from the window (it will reappear when 
    future messages are set, however).

    :Returns: ``null``

.. method:: File(file)

    This sets the message area to a "Loading *file*" message, where *file* 
    is the name of the file (with ``[MathJax]`` representing the root 
    directory).

    :Parameters:
        - **file** --- the name of the file being loaded
    :Returns: the message id number for the message created

.. method:: filterText(text,n)

    This method is called on each message before it is displayed.  It can 
    be used to modify (e.g., shorten) the various messages before they are 
    displayed.  The default action is to check if the ``messageStyle`` 
    configuration parameter is ``simple``, and if so, convert loading and 
    processing messages to a simpler form.  This method can be overridden 
    to perform other sanitization of the message strings.

    :Parameters:
        - **text** --- the text of the message to be posted
        - **n** --- the id number of the message to be posted
    :Returns: the modified message text

.. method:: Log()

    Returns a string of all the messages issued so far, separated by
    newlines.  This is used in debugging MathJax operations.

    :Returns: string of all messages so far


