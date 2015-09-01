;(function () {
    var ArabicMathFont = 'Amiri'; // TODO: Make this configurable

    MathJax.Hub.Config({
        'HTML-CSS': {
            undefinedFamily: ArabicMathFont,
        },
        styles: {
            '.mfliph, .mfliphchild > span': {
                'display': 'inline-block !important',
                '-moz-transform': 'scaleX(-1)',
                '-webkit-transform': 'scaleX(-1)',
                '-o-transform': 'scaleX(-1)',
                'transform': 'scaleX(-1)',
                '-ms-filter': 'fliph',
                'filter': 'fliph'
            },
            '.mar, .marchild > span': {
                'font-family': ArabicMathFont + ' !important',
                'font-style': 'normal !important'
            }
        },
        TeX: {
            Macros: {
                'ar': '',
                'alwaysar': ''
            }
        }
    });

    MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
        MathJax.InputJax.TeX.postfilterHooks.Add(function (data) {
            var rawMath = data.script.innerHTML;

            var isConditionalArabic = (rawMath.indexOf('\\ar') > -1);

            var isAlwaysArabic = (rawMath.indexOf('\\alwaysar') > -1);

            var pageLang = document.documentElement.lang;

            var doMakeArabic = (
                // Make `pageLang === 'ar'` configurable
                isAlwaysArabic || (isConditionalArabic && pageLang === 'ar')
            );

            if (!doMakeArabic) {
                return data.math;
            }

            var mapNumbers = function(string) {
                var numbers = [
                    '٠',  // 0
                    '١',  // 1
                    '٢',  // 2
                    '٣',  // 3
                    '٤',  // 4
                    '٥',  // 5
                    '٦',  // 6
                    '٧',  // 7
                    '٨',  // 8
                    '٩'  // 9
                ];

                if ('0' === string) {
                    // Special case for the Arabic zero
                    return 'صفر';
                }

                numbers.forEach(function (hindiNumber, arabicNumber) {
                    var regex = new RegExp('' + arabicNumber, 'g');
                    string = string.replace(regex, hindiNumber);
                });

                return string;
            }

            var mapChars = function(string) {
                // Perhaps even this should be configurable!
                var enToArChars = {
                    'a': 'ا',
                    'b': 'ب', // TODO: Use Arabic letter dotless beh 0x66e instead
                    'c': 'حـ', // With Unicdoe Arabic tatweel 0x0640
                    'd': 'د',
                    'e': 'هـ', // With Unicdoe Arabic tatweel 0x0640
                    'f': 'ق', // TODO: Use dotless qaf (ٯ) instead
                    'g': 'د',
                    'n': 'ن',
                    'x': 'س',
                    'y': 'ص',
                    'z': 'ع'
                };

                for (var enChar in enToArChars) {
                    if (enToArChars.hasOwnProperty(enChar)) {
                        var arChar = enToArChars[enChar];
                        var regex = new RegExp(enChar, 'g');
                        string = string.replace(regex, arChar);
                    }
                }

                return string;
            }

            var markRTL = function(node) {
                if (!node) return;

                if ('mi' === node.type) {
                    // English Symbols
                    if ('chars' === node.data[0].type) {
                        var textContent = node.data[0].data[0];
                        var mapped = mapChars(textContent);

                        // TODO: Handle entities like PI
                        if (mapped != textContent) {
                            node['class'] = ' mfliphchild marchild';
                            node.data[0].data[0] = mapped;
                        }
                    } else if ('entity' === node.data[0].type) {
                        node['class'] = ' mfliph';
                    }
                } else if ('mn' === node.type) {
                    // Numbers
                    var textContent = node.data[0].data[0];

                    node['class'] = 'mfliphchild marchild';

                    if ('0' === textContent) {
                        node.type = 'mi'; // TODO: Not sure if this is a good idea!
                    }

                    node.data[0].data[0] = mapNumbers(textContent);
                }
            }

            var traverseMML = function(node, func) {
                try {
                    if (!node) {
                        return;
                    }

                    func(node);

                    if (node.data) {
                        node.data.forEach(function (subNode) {
                            // Going on step down in the object tree!!
                            traverseMML(subNode, func);
                        });
                    }
                } catch (e) {
                    console.error(e);
                }
            }

            data.math.root.class = 'mfliph'; // Flip the root element
            traverseMML(data.math.root, markRTL);

            return data.math;
        });
    });

}());
