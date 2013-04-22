MathJax.Localization.addTranslation("en","HelpDialog",{
  isLoaded: true,
  strings: {

    MathJax: 
      "*MathJax* is a JavaScript library that allows page authors to include " + //NOTE Markdown syntax *...*
      "mathematics within their web pages.  As a reader, you don't need to do " +
      "anything to make that happen.",

    Browsers:
      "*Browsers*: MathJax works with all modern browsers including IE6+, Firefox 3+, " +
      "Chrome 0.2+, Safari 2+, Opera 9.6+ and most mobile browsers.",

    Menu:
      "*Math Menu*: MathJax adds a contextual menu to equations.  Right-click or " +
      "CTRL-click on any mathematics to access the menu.",

    ShowMath:
      "*Show Math As* allows you to view the formula's source markup " +
      "for copy & paste (as MathML or in its origianl format).",

    Settings:
      "*Settings* gives you control over features of MathJax, such as the " +
      "size of the mathematics, and the mechanism used to display equations.",

    Language:
      "*Language* lets you select the language used by MathJax for its menus " +
      "and warning messages.",

    Zoom:
      "*Math Zoom*: If you are having difficulty reading an equation, MathJax can " +
      "enlarge it to help you see it better.",

    Accessibilty:
      "*Accessibility*: MathJax will automatically work with screen readers to make " +
      "mathematics accessible to the visually impaired.",

    Fonts:
      "*Fonts*: MathJax will use certain math fonts if they are installed on your " +
      "computer; otherwise, it will use web-based fonts.  Although not required, " +
      "locally installed fonts will speed up typesetting.  We suggest installing " +
      "the [STIX fonts](%1)." //NOTE Markdown syntax for links. %1 is a URL to the STIX fonts

  }
});

MathJax.Ajax.loadComplete("[MathJax]/localization/en/HelpDialog.js");
