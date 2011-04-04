.. _platform-movable-type:

=============================
Using MathJax in Movable Type
=============================

1. Open Moveable Type Admin interface for the site on which you want to enable
   MathJax.

2. In the dashboard menu on the left, open up the Design menu. This
   should show you the templates you are currently using on the site.
 
     .. image:: ../images/mt_menu.png
 

3. Scroll down to the Template Modules section in the template list
   and open the `HTML Head` template.
 
     .. image:: ../images/mt_templates.png
 
4. At the end of the file, insert

   .. code-block:: html

       <script type="text/javascript"
         src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
       </script>

   to load MathJax from our distributed network service.
 
     .. image:: ../images/mt_head.png

5. Save the file.  This will enable MathJax with both TeX and MathML
   input, so you should be able to start adding mathematical content to
   your pages.  If you need to adjust the configuration, see
   :ref:`Configuring MathJax <loading>` for more details.


