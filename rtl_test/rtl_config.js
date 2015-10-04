;
(function() {
    var ArabicMathFont = 'Amiri'; // TODO: Make this configurable

    MathJax.Hub.Config({
        'HTML-CSS': {
            undefinedFamily: ArabicMathFont,
        },
        styles: {
            '.mfliph': {
                'display': 'inline-block !important',
                '-moz-transform': 'scaleX(-1)',
                '-webkit-transform': 'scaleX(-1)',
                '-o-transform': 'scaleX(-1)',
                'transform': 'scaleX(-1)',
                '-ms-filter': 'fliph',
                'filter': 'fliph'
            },
            '.mar': {
                'font-family': ArabicMathFont + ' !important',
                'font-style': 'normal !important',
            },
        },
        TeX: {
            // TODO: Review the dependecies!
            extensions: ['HTML.js'],
        }
    });

    MathJax.Hub.Register.StartupHook('TeX HTML Ready', function() {
        var TEX = MathJax.InputJax.TeX;
        var TEXDEF = TEX.Definitions;

        TEXDEF.Add({
            macros: {
                'ar': 'HandleArabic',
                'alwaysar': 'MarkAsArabic',
                'fliph': 'FlipHorizontal',

                'lspeed': 'LightSpeedAr',
                'scnd': 'SecondsAr',
                'Planck': 'PlancksAr',
                'Boltzmann': 'BoltzmannsAr',
                'zero': 'ZeroAr',
                'varepszero': 'EpsilonZeroAr',

                'AM': 'AirMassAr',
                'Mega': 'MegaAr',
                'nano': 'NanoAr',
                'Giga': 'GigaAr',
                'kilo': 'KiloAr',
                'volt': 'VoltAr',
                'Amp': 'AmpAr',
                'Klvn': 'KilvenAr',
                'ph': 'PHAr',
                'F': 'FaradAr',
                'ek': 'EKAr',
                'hole': 'HoleAr',
                'elctrn': 'ElectronAr',
                'hour': 'HourAr',
                'Watt': 'WattAr',
                'max': 'MaxAr',

                'micro': 'MicroAr',
                'cm': 'CentimeterAr',
                'day': 'DayAr',
                'year': 'YearAr',

                'er': 'EspsilonRAr',

                'J': 'CurrentAr',
                'FF': 'FillFactorAr',
                'Voc': 'VoltageOpenCircuitAr',
                'D': 'SpreadCoefficientAr',
                'rad': 'RadiationAr',
                'Tmpr': 'TemratureAr',
                'current': 'CurrentAr',
                'NA': 'ConcentrationReceiverAtomAr',
                'ND': 'ConcentrationDonorAtomAr',
                'nii': 'ConcentrationCarierPureAr',
                'Wd': 'DeplationAreaWidthAr',
                'Ld': 'DiffusionLengthAr',
                'sc': 'ShortCircuitAr',

                // Light power
                'P': 'PowerAr',
                'inn': 'INAr',
            }
        });

        var NUMBERS_MAP = [
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

        // TODO: Perhaps even this should be configurable!
        var SYMBOLS_MAP = {
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

        var ArabicTeX = function(english, arabic) {
            return function(name) {
                var tex;
                if ('ar' === this.stack.env.lang) {
                    tex = arabic;
                } else {
                    tex = english;
                }

                this.Push(TEX.Parse(tex).mml());
            };
        };

        var ArabicText = function(english, arabicText) {
            return ArabicTeX(english, '\\fliph{\\text{' + arabicText + '}}');
        };

        var ArabicSymbols = ArabicTeX;

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

                this.Push(arg.With({
                    'class': CLASS,
                    'lang': 'ar'
                }));
            },
            FlipHorizontal: function (name) {
                var arg = this.GetArgumentMML(name);
                this.Push(arg.With({
                    'fliph': true,
                }));
            },
            mapArabicNumbers: function(string) {
                NUMBERS_MAP.forEach(function (hindiNumber, arabicNumber) {
                    var regex = new RegExp('' + arabicNumber, 'g');
                    string = string.replace(regex, hindiNumber);
                });

                return string;
            },
            mapArabicChars: function(string) {
                // TODO: Move this function to the HTML-CSS OutputJax
                for (var enChar in SYMBOLS_MAP) {
                    if (SYMBOLS_MAP.hasOwnProperty(enChar)) {
                        var arChar = SYMBOLS_MAP[enChar];
                        var regex = new RegExp(enChar, 'g');
                        string = string.replace(regex, arChar);
                    }
                }

                return string;
            },
            arabicNumber: function (token) {
                var textContent = token.data[0].data[0];

                if ('0' === textContent) {
                    // Special case for the Arabic zero
                    token.data[0].data[0] = 'صفر';
                } else {
                    var arabicNumbers = this.mapArabicNumbers(textContent);
                    token.data[0].data[0] = arabicNumbers;
                }

                return token.With({
                    lang: 'ar',
                    fliph: true
                });
            },
            arabicIdentifier: function (token) {
                // English Symbols
                if ('chars' === token.data[0].type) {
                    var textContent = token.data[0].data[0];
                    var mapped = this.mapArabicChars(textContent);

                    if (mapped != textContent) {
                        token.data[0].data[0] = mapped;

                        token = token.With({
                            lang: 'ar',
                            fliph: true
                        });
                    }
                } else if ('entity' === token.data[0].type) {
                    token = token.With({
                        fliph: true
                    });
                }

                return token;
            },
            mmlToken: function (token) {
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
            PlancksAr: ArabicText('\\hbar', 'ثابت بلانك'),
            BoltzmannsAr: ArabicText('k', 'ثابت بولتزمان'),
            ZeroAr: ArabicText('0', '0'),
            SecondsAr: ArabicText('s', 'ث'),
            EpsilonZeroAr: ArabicTeX(
                '\\varepsilon_\\zero',
                '\\fliph{\\varepsilon_\\zero}'
            ),
            AirMassAr: ArabicText('AM', 'كتلة هواء'),
            MegaAr: ArabicText('M', 'ميجا'),
            NanoAr: ArabicText('n', 'نانو'),
            GigaAr: ArabicText('G', 'جيجا'),
            KiloAr: ArabicText('k', 'كيلو'),
            VoltAr: ArabicText('v', 'فولت'),
            AmpAr: ArabicText('A', 'امبير'),
            KilvenAr: ArabicText('K', 'كلفن'),
            PHAr: ArabicText('ph', 'ف'),
            FaradAr: ArabicText('F', 'فاراد'),
            EKAr: ArabicText('e', 'انتشار،ك'),
            HoleAr: ArabicText('p', 'ثقب'),
            ElectronAr: ArabicText('n', 'الكترون'),
            HourAr: ArabicText('h', 'ساعة'),
            WattAr: ArabicText('W', 'واط'),
            MaxAr: ArabicText('p', 'اقصى'),

            MicroAr: ArabicText('\\mu', 'مايكرو'),
            CentimeterAr: ArabicText('\\text{cm}', 'سم'),
            DayAr: ArabicText('\\text{day}', 'يوم'),
            YearAr: ArabicText('\\text{year}', 'سنة'),

            EspsilonRAr: ArabicTeX('ϵr', '\\fliph{ϵr}'),

            // TODO: Enter the actual Arabic letters before the mapping
            CurrentAr: ArabicSymbols('J', 'k.t'), // --> ك.ت
            FillFactorAr: ArabicSymbols('FF', 'z.t'), // z.t --> ع.ت
            VoltageOpenCircuitAr: ArabicSymbols('V_{oc}', 'c_m'), // c --> حـ, m --> م
            SpreadCoefficientAr: ArabicSymbols('D', 'm'), // m --> م
            RadiationAr: ArabicSymbols('l', 'z'), // z --> ع
            TemratureAr: ArabicSymbols('T', 'd'), // d --> د
            CurrentAr: ArabicSymbols('I', 't'), // t --> ت
            ConcentrationReceiverAtomAr: ArabicSymbols('NA', 'n_f'), // n --> ن, f --> ق
            ConcentrationDonorAtomAr: ArabicSymbols('ND', 'n_m'), // n --> ن, m --> م
            ConcentrationCarierPureAr: ArabicSymbols('ni', 'n_k'), // n --> ن, k --> ك
            DeplationAreaWidthAr: ArabicSymbols('W', 'l_n'), // l --> ل, n --> ن
            DiffusionLengthAr: ArabicSymbols('Ld', 'l_r'), // l --> ل, r --> ر
            ShortCircuitAr: ArabicSymbols('sc', 'f'), // f --> ق
            PowerAr: ArabicSymbols('P', 't'), // t --> ط
            INAr: ArabicSymbols('in', 'd') // d --> د
        });
    });

    // TODO: Move HTML-CSS specific stuff here instead of the TeX Jax
    MathJax.Hub.Register.StartupHook('mml Jax Ready', function() {
        MathJax.Hub.Register.StartupHook('HTML-CSS Jax Ready', function() {
            var MML = MathJax.ElementJax.mml;

            var mnToHTML = MML.mn.prototype.toHTML;

            var flipHElement = function (token, element) {
                if (token.Get('fliph')) {
                    var flipElement = document.createElement('span');
                    var className = 'mfliph';

                    if ('ar' === token.Get('lang')) {
                        className += ' ' + 'mar';
                    }

                    flipElement.className = className;

                    if (Node.TEXT_NODE === element.firstChild.nodeType) {
                        flipElement.textContent = element.textContent;
                        element.textContent = '';
                    } else {
                        while (element.childNodes.length) {
                            flipElement.appendChild(element.firstChild);
                        }
                    }

                    element.appendChild(flipElement);
                }
            };

            var miToHTML = MML.mi.prototype.toHTML;
            MML.mi.Augment({
                toHTML: function(span) {
                    var element = miToHTML.call(this, span);

                    if (Node.TEXT_NODE === element.firstChild.nodeType) {
                        flipHElement(this, element);
                    } else {
                        flipHElement(this, element.firstChild);
                    }

                    return element;
                }
            });

            ['mn', 'mtext', 'msubsup'].forEach(function (name) {
                var originalToHTML = MML[name].prototype.toHTML;

                MML[name].Augment({
                    toHTML: function(span) {
                        var element = originalToHTML.call(this, span);
                        flipHElement(this, element);
                        return element;
                    }
                });
            });
        });
    });
}());
