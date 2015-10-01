;
(function() {
    var ArabicMathFont = 'Amiri'; // TODO: Make this configurable

    var macros = {
        base: {},
        translatable: [],
        add: function(command, en, ar) {
            this.translatable.push({
                command: command,
                en: en,
                ar: ar
            });

            return this;
        },
        // Add Arabic text
        addat: function(command, en, arabicText) {
            var ar = '\\fliph{\\text{' + arabicText + '}}';
            return this.add(command, en, ar);
        },
        addas: function(command, en, arabicSymb) {
            // TODO: Implement Arabic symobls method
        },
        build: function() {
            var baseMacros = this.base;
            var macros = {};

            Object.keys(baseMacros).forEach(function(cmd) {
                macros[cmd] = baseMacros[cmd];
            });

            this.translatable.forEach(function(cmd) {
                macros[cmd.command] = cmd.en;
            });

            return macros;
        },
        buildArabic: function() {
            var commands = [];

            this.translatable.forEach(function(cmd) {
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

    // TODO: Convert to TeX commands using `ArabicText` and alike
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
            extensions: ['newcommand.js', 'HTML.js'],
            Macros: {
                'fliph': ['\\class{mfliph}{#1}', 1]
            }
        }
    });

    MathJax.Hub.Register.StartupHook('TeX HTML Ready', function() {
        var TEX = MathJax.InputJax.TeX;
        var TEXDEF = TEX.Definitions;

        TEXDEF.Add({
            macros: {
                'ar': 'HandleArabic',
                'alwaysar': 'MarkAsArabic',
                'lspeed': 'LightSpeedAr',
                'scnd': 'SecondsAr',
                'Planck': 'PlancksAr',
                'Boltzmann': 'BoltzmannsAr',
                'zero': 'ZeroAr',
            }
        });

        var ArabicText = function(english, arabicText) {
            return function(name) {
                var tex;
                if ('ar' === this.stack.env.lang) {
                    tex = '\\fliph{\\text{' + arabicText + '}}';
                } else {
                    tex = english;
                }

                this.Push(TEX.Parse(tex).mml());
            };
        };

        var texParseMMLToken = TEX.Parse.prototype.mmlToken;

        TEX.Parse.Augment({
            HandleArabic: function(name) {
                // TODO: Make the `documentElement.lang` check configurable
                var pageLang = document.documentElement.lang;
                if (pageLang === 'ar') {
                    this.MarkAsArabic(name);
                }
            },
            MarkAsArabic: function(name) {
                this.stack.env.lang = 'ar';

                var CLASS = 'mfliph';

                var arg = this.GetArgumentMML(name);

                if (arg['class'] != null) {
                    CLASS = arg['class'] + ' ' + CLASS
                }

                var arMML = arg.With({
                    'class': CLASS,
                    'lang': 'ar'
                });

                this.Push(arMML);
            },
            mapArabicNumbers: function(string) {
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

                numbers.forEach(function (hindiNumber, arabicNumber) {
                    var regex = new RegExp('' + arabicNumber, 'g');
                    string = string.replace(regex, hindiNumber);
                });

                return string;
            },
            mapArabicChars: function(string) {
                // TODO: Move this function to the HTML-CSS OutputJax

                // TODO: Perhaps even this should be configurable!
                var enToArChars = {
                    // Variable naem
                    'a': 'ا',

                    // Variable naem
                    // TODO: Use Arabic letter dotless beh 0x66e instead
                    'b': 'ب',

                    // Variable naem.
                    // Suffixed with Unicdoe Arabic tatweel 0x0640
                    'c': 'حـ',

                    // Mixed use (Function, variable and (dx))
                    'd': 'د',

                    // Mixed use. With Unicdoe Arabic tatweel 0x0640
                    'e': 'هـ',

                    // Energy
                    'E': 'ط',

                    // Function name
                    // TODO: Use dotless qaf (ٯ) instead
                    'f': 'ق',

                    // Function name
                    'g': 'د',

                    // Mixed use
                    'k': 'ك',

                    // Variable name
                    'n': 'ن',

                    // Meter
                    'm': 'م',

                    // Initial charge
                    'q': 'ش',

                    // Mixed use
                    'r': 'ر',
                    't': 'ت',

                    // Variable names
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
            },
            arabicNumber: function (token) {
                // TODO: Move this function to the HTML-CSS OutputJax

                token.class = token.class || '';
                token.class += ' ' + 'mfliph mar';

                var textContent = token.data[0].data[0];

                token['class'] = 'mfliph mar';

                if ('0' === textContent) {
                    // Special case for the Arabic zero
                    // TODO: Not sure if this is a good idea to
                    // convert the type!

                    token.type = 'mi';
                    token._originalType = 'mo';
                    token.data[0].data[0] = 'صفر';
                } else {
                    var arabicNumbers = this.mapArabicNumbers(textContent);
                    token.data[0].data[0] = arabicNumbers;
                }

                return token;
            },
            arabicIdentifier: function (token) {
                // TODO: Move this function to the HTML-CSS OutputJax

                // English Symbols
                if ('chars' === token.data[0].type) {
                    var textContent = token.data[0].data[0];
                    var mapped = this.mapArabicChars(textContent);

                    // TODO: Handle entities like PI
                    if (mapped != textContent) {
                        token['class'] = ' mfliphchild marchild';
                        token.data[0].data[0] = mapped;
                    }
                } else if ('entity' === token.data[0].type) {
                    token['class'] = ' mfliph';
                }

                return token;
            },
            mmlToken: function (token) {
                // TODO: Move some of this function to the HTML-CSS OutputJax
                // TODO: Check for possible incomability with boldsymbol
                // extension
                var token = texParseMMLToken.call(this, token);

                if ('ar' === this.stack.env.lang) {
                    if ('mn' === token.type) {
                        token = this.arabicNumber(token);
                    } else if ('mi' === token.type) {
                        token = this.arabicIdentifier(token);
                    }
                }

                return token;
            },
            LightSpeedAr: ArabicText('c', 'سرعة الضوء'),
            SecondsAr: ArabicText('s', 'ث'),
            PlancksAr: ArabicText('\\hbar', 'ثابت بلانك'),
            BoltzmannsAr: ArabicText('k', 'ثابت بولتزمان'),
            // EpsilonZeroAr: ArabicText('\\varepsilon\\zero', '\\varepsilon\\zero'),
        });
    });

    // MathJax.Hub.Register.StartupHook('mml Jax Ready', function() {
    //     MathJax.Hub.Register.StartupHook('HTML-CSS Jax Ready', function() {
    //         var MML = MathJax.ElementJax.mml;
    //
    //         var miToHTML = MML.mi.prototype.toHTML;
    //         MML.mi.Augment({
    //             toHTML: function(span) {
    //                 var element = miToHTML.call(this, span);
    //                 return element;
    //             }
    //         });
    //     });
    // });
}());
