;(function () {
    var ArabicMathFont = 'Amiri'; // TODO: Make this configurable

    var macros = {
        base: {
        },
        translatable: [],
        add: function (command, en, ar) {
            this.translatable.push({
                command: command,
                en: en,
                ar: ar
            });

            return this;
        },
        // Add Arabic text
        addat: function (command, en, arabicText) {
            var ar = '\\fliph{\\text{' + arabicText + '}}';
            return this.add(command, en, ar);
        },
        addas: function (command, en, arabicSymb) {
            // TODO: Implement Arabic symobls method
        },
        build: function () {
            var baseMacros = this.base;
            var macros = {};

            Object.keys(baseMacros).forEach(function (cmd) {
                macros[cmd] = baseMacros[cmd];
            });

            this.translatable.forEach(function (cmd) {
                macros[cmd.command] = cmd.en;
            });

            return macros;
        },
        buildArabic: function () {
            var commands = [];

            this.translatable.forEach(function (cmd) {
                var ar = [
                    '\\renewcommand{',
                    '\\', cmd.command,
                    '}{',
                    cmd.ar,
                    '}',
                ];

                commands.push(ar.join(''));
            });

            return commands.join('\n');
        }
    };

    macros.addat('lspeed', 'c', 'سرعة الضوء')
        .addat('Planck', '\\hbar', 'ثابت بلانك')
        .addat('Boltzmann', 'k', 'ثابت بولتزمان')
        .addat('zero', '0', '0')
        // TODO: Refactor to `addas` method to call it with the
        // Arabic variable: .addas('rad', 'l', 'ع')
        .add('rad', 'l', 'z') // z --> ع
        .addat('AM', 'AM', 'كتلة هواء')
        .addat('Mega', 'M', 'ميجا')
        .addat('nano', 'n', 'نانو')
        .addat('Giga', 'G', 'جيجا')
        .addat('kilo', 'k', 'كيلو')
        .addat('volt', 'v', 'فولت')
        .addat('Amp', 'A', 'امبير')
        .addat('micro', '\\mu', 'مايكرو')
        .add('Tmpr', 'T', 'd') // d --> د
        .addat('Klvn', 'K', 'كلفن')
        .addat('cm', '\\text{cm}', 'سم')
        .addat('scnd', 's', 'ث')
        .add('current', 'I', 't') // t --> ت
        .add('er', 'ϵr', '\\fliph{ϵr}')
        .addat('J', 'J', 'ك.ت')
        .addat('ph', 'ph', 'ف')
        .add('Voc', 'V_{oc}', 'c_m')
        .add('NA', 'NA', 'n_f') // n --> ن, f --> ق
        .add('ND', 'ND', 'n_m') // n --> ن, m --> م
        .add('nii', 'ni', 'n_k') // n --> ن, k --> ك
        .add('Wd', 'W', 'l_n') // l --> ل, n --> ن
        .addat('F', 'F', 'فاراد')
        .add('Ld', 'Ld', 'l_r') // l --> ل, r --> ر
        .add('D', 'D', 'm')
        .addat('ek', 'e', 'انتشار،ك')
        .addat('hole', 'p', 'ثقب')
        .addat('elctrn', 'n', 'الكترون')
        .addat('hour', 'h', 'ساعة')
        .addat('Watt', 'W', 'واط')
        .addat('max', 'p', 'اقصى')
        .addat('day', '\\text{day}', 'يوم')
        .addat('year', '\\text{year}', 'سنة')
        .add('sc', 'sc', 'f') // f --> ق
        .addat('FF', 'FF', 'ع.ت')
        .add('P', 'P', 't') // t --> ط
        .addat('inn', 'in', 'd'); // d --> د

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
            // TODO: Review the dependecies!
            extensions: ["newcommand.js", "HTML.js"],
            Macros: {
                'fliph': ['\\class{mfliph}{#1}', 1]
            }
        }
    });

    // MathJax.Hub.Register.StartupHook('TeX newcommand Ready', function () {
    //     // Makes it easier if you want to do several definitions
    //     var TEX = MathJax.InputJax.TeX;
    //     TEX.Environment(
    //         'ar',
    //         '\\require{begingroup} \\begingroup ' + macros.buildArabic(),
    //         '\\endgroup'
    //     );
    // });

    MathJax.Hub.Register.StartupHook("TeX HTML Ready", function () {
        var TEX = MathJax.InputJax.TeX;

        var TEXDEF = TEX.Definitions;

        TEXDEF.Add({
            macros: {
                'ar': 'HandleArabic',
                'alwaysar': 'HandleAlwaysArabic',
                'lspeed': 'LightSpeedAr',
                'scnd': 'SecondsAr',
                'Planck': 'PlancksAr',
                'Boltzmann': 'BoltzmannsAr',
            }
        });

        var ArabicText = function (english, arabicText) {
            return function (name) {
                var tex;
                if (this.stack.env.isArabic) {
                    tex = '\\fliph{\\text{' + arabicText + '}}';
                } else {
                    tex = english;
                }

                this.Push(TEX.Parse(tex).mml());
            };
        };


        // TODO: Remove this hack
        // MathJax.InputJax.TeX.postfilterHooks.Add(function (data) {
        //     data.math.root.class = 'mfliph'; // Flip the root element
        //     window.omardo = data.math.root;
        // });

        TEX.Parse.Augment({
            HandleArabic: function (name) {
                // TODO: Make this configurable
                var pageLang = document.documentElement.lang;
                if (pageLang === 'ar') {
                    this.HandleAlwaysArabic(name);
                }
            },
            HandleAlwaysArabic: function (name) {
                // TODO: Consider changing this to `this.stack.env.language`
                // For more modular work
                this.stack.env.isArabic = true;

                var CLASS = 'mfliph';

                var arg = this.GetArgumentMML(name);

                if (arg["class"] != null) {
                    CLASS = arg["class"] + " " + CLASS
                }

                this.Push(arg.With({"class":CLASS}));
            },
            LightSpeedAr: ArabicText('c', 'سرعة الضوء'),
            SecondsAr: ArabicText('s', 'ث'),
            PlancksAr: ArabicText('\\hbar', 'ثابت بلانك'),
            BoltzmannsAr: ArabicText('k', 'ثابت بولتزمان'),
        });
    });

    // MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
    //     MathJax.InputJax.TeX.postfilterHooks.Add(function (data) {
    //         var rawMath = data.script.innerHTML;
    //
    //         // TODO: Change this into environment check
    //         var isConditionalArabic = (rawMath.indexOf('\\begin{ar}') > -1);
    //
    //         var isAlwaysArabic = (rawMath.indexOf('\\alwaysar') > -1);
    //
    //         var pageLang = document.documentElement.lang;
    //
    //         var doMakeArabic = (
    //             // Make `pageLang === 'ar'` configurable
    //             isAlwaysArabic || (isConditionalArabic && pageLang === 'ar')
    //         );
    //
    //         if (!doMakeArabic) {
    //             return data.math;
    //         }
    //
    //         var mapNumbers = function(string) {
    //             var numbers = [
    //                 '٠',  // 0
    //                 '١',  // 1
    //                 '٢',  // 2
    //                 '٣',  // 3
    //                 '٤',  // 4
    //                 '٥',  // 5
    //                 '٦',  // 6
    //                 '٧',  // 7
    //                 '٨',  // 8
    //                 '٩'  // 9
    //             ];
    //
    //             if ('0' === string) {
    //                 // Special case for the Arabic zero
    //                 return 'صفر';
    //             }
    //
    //             numbers.forEach(function (hindiNumber, arabicNumber) {
    //                 var regex = new RegExp('' + arabicNumber, 'g');
    //                 string = string.replace(regex, hindiNumber);
    //             });
    //
    //             return string;
    //         };
    //
    //         var mapChars = function(string) {
    //             // Perhaps even this should be configurable!
    //             var enToArChars = {
    //                 // Variable naem
    //                 'a': 'ا',
    //
    //                 // Variable naem
    //                 // TODO: Use Arabic letter dotless beh 0x66e instead
    //                 'b': 'ب',
    //
    //                 // Variable naem.
    //                 // Suffixed with Unicdoe Arabic tatweel 0x0640
    //                 'c': 'حـ',
    //
    //                 // Mixed use (Function, variable and (dx))
    //                 'd': 'د',
    //
    //                 // Mixed use. With Unicdoe Arabic tatweel 0x0640
    //                 'e': 'هـ',
    //
    //                 // Energy
    //                 'E': 'ط',
    //
    //                 // Function name
    //                 // TODO: Use dotless qaf (ٯ) instead
    //                 'f': 'ق',
    //
    //                 // Function name
    //                 'g': 'د',
    //
    //                 // Mixed use
    //                 'k': 'ك',
    //
    //                 // Variable name
    //                 'n': 'ن',
    //
    //                 // Meter
    //                 'm': 'م',
    //
    //                 // Initial charge
    //                 'q': 'ش',
    //
    //                 // Mixed use
    //                 'r': 'ر',
    //                 't': 'ت',
    //
    //                 // Variable names
    //                 'x': 'س',
    //                 'y': 'ص',
    //                 'z': 'ع'
    //             };
    //
    //             for (var enChar in enToArChars) {
    //                 if (enToArChars.hasOwnProperty(enChar)) {
    //                     var arChar = enToArChars[enChar];
    //                     var regex = new RegExp(enChar, 'g');
    //                     string = string.replace(regex, arChar);
    //                 }
    //             }
    //
    //             return string;
    //         };
    //
    //         var markRTL = function(node) {
    //             if (!node) return;
    //
    //             if ('mi' === node.type) {
    //                 // English Symbols
    //                 if ('chars' === node.data[0].type) {
    //                     var textContent = node.data[0].data[0];
    //                     var mapped = mapChars(textContent);
    //
    //                     // TODO: Handle entities like PI
    //                     if (mapped != textContent) {
    //                         node['class'] = ' mfliphchild marchild';
    //                         node.data[0].data[0] = mapped;
    //                     }
    //                 } else if ('entity' === node.data[0].type) {
    //                     node['class'] = ' mfliph';
    //                 }
    //             } else if ('mn' === node.type) {
    //                 // Numbers
    //                 var textContent = node.data[0].data[0];
    //
    //                 node['class'] = 'mfliphchild marchild';
    //
    //                 if ('0' === textContent) {
    //                     node.type = 'mi'; // TODO: Not sure if this is a good idea!
    //                 }
    //
    //                 node.data[0].data[0] = mapNumbers(textContent);
    //             }
    //         }
    //
    //         var traverseMML = function(node, func) {
    //             try {
    //                 if (!node) {
    //                     return;
    //                 }
    //
    //                 func(node);
    //
    //                 if (node.data) {
    //                     node.data.forEach(function (subNode) {
    //                         // Going on step down in the object tree!!
    //                         traverseMML(subNode, func);
    //                     });
    //                 }
    //             } catch (e) {
    //                 console.error(e);
    //             }
    //         }
    //
    //         data.math.root.class = 'mfliph'; // Flip the root element
    //         traverseMML(data.math.root, markRTL);
    //
    //         return data.math;
    //     });
    // });

}());
