.. _glossary:

********
Glossary
********

.. if you add new entries, keep the alphabetical sorting!

.. glossary::

    AsciiMath
        A notation for mathematics that uses characters commonly
        available on all computer keyboards to represent the math in
        an algebra-like syntax that should be intuitive and easily
        read. 

        .. seealso::
            
	    `AsciiMath home page <http://www1.chapman.edu/~jipsen/mathml/asciimath.html>`_

    Callback
        A JavaScript function that is used to perform actions that
        must wait for other actions to complete before they are
        performed.
    
    Callback Queue
        MathJax uses `Queues` to synchronize its activity so that
        actions that operate asynchronously (like loading files) will
        be performed in the right order.  :term:`Callback` functions
        are pushed onto the queue, and are performed in order, with
        MathJax handling the synchronization if operations need to
        wait for other actions to finish.
    
    Callback Signal
        A JavaScript object that acts as a mailbox for MathJax events.
        Like an event handler, but it also keeps a history of
        messages.  Your code can register an "interest" in a signal,
        or can register a :term:`callback` to be called when a
        particular message is sent along the signal channel.
    
    HTML-CSS
        MathJax output form that relys only on HTML and CSS 2.1,
        allowing MathJax to remain compatible across all browsers.
    
    jax
        MathJax's input and output processors are called "jax", as is
        its internal format manager.  The code for the jax are in the
        ``MathJax/jax`` directory.

    LaTeX
        LaTeX is a variant of :term:`TeX` that is now the dominant TeX style.
        
        .. seealso::
            
            `LaTeX Wikipedia entry <http://en.wikipedia.org/wiki/LaTeX>`_
    
    Markdown
        A text format commonly used in blogs and wikis for creating
        web pages without the need for complicated markup notation.
        It is intended to be an easy-to-read and easy-to-write format
        that still gives you the ability to specify a rich text result
        (including things like bold, italics, bullet lists, and so
        on).

        .. seealso::
            
	    `Markdown home page <http://daringfireball.net/projects/markdown/>`_

    MathML
        An XML specification created to describe mathematical
        notations and capture both its structure and content. MathML
        is much more verbose than :term:`TeX`, but is much more
        machine-readable.
        
        .. seealso::
            
            `MathML Wikipedia entry <http://en.wikipedia.org/wiki/MathML>`_
    
    STIX
        The Scientific and Technical Information Exchange font
        package. A comprehensive set of scientific glyphs.
        
        .. seealso::
            
            `STIX project <http://stixfonts.org/>`_
    
    SVG
        Acronym for `Scalable Vector Graphics`.  SVG is a graphics
        format that allows images to be described as a collection of
        graphics objects (like lines, rectangles, etc) rather than as
        a bitmap of colored pixels.  MathJax can use this format to
        display mathematics as an alterantive to its HTML-CSS or
        NativeMML output.

	.. seealso::

	    `SVG Wilipedia entry <http://en.wikipedia.org/wiki/Scalable_Vector_Graphics>`_

    TeX
        A document markup language with robust math markup commands
        developed by Donald Knuth in the late 1970's, but still in
        extensive use today.  It became the industry standard for
        typesetting of mathematics, and is one of the most common
        formats for mathematical journals, articles, and books.
        
        .. seealso::
            
            `TeX Wikipedia entry <http://en.wikipedia.org/wiki/TeX>`_
    
