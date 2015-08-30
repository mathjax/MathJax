MathJax.Hub.Config({
    tex2jax: {
        inlineMath: [
            ['$', '$'],
            ['\\(', '\\)']
        ]
    },
    'HTML-CSS': {
        undefinedFamily: 'Droid Arabic Naskh',
        scale: 200
    },
    styles: {
        '.mrtl, .mrtltext > span': {
            'display': 'inline-block !important',
            '-moz-transform': 'scaleX(-1)',
            '-webkit-transform': 'scaleX(-1)',
            '-o-transform': 'scaleX(-1)',
            'transform': 'scaleX(-1)',
            '-ms-filter': 'fliph',
            'filter': 'fliph'
        },
        '.mrtltext > span': { // Reduce the size big Arabic letter
            'font-size': '90% !important' // MathJax's default is 94%
        }
    },
    TeX: {
        Macros: {
            'rtlequation': ['\\class{mrtl}{#1}', 1],
            'م': ['\\class{mrtl}{#1}', 1], // Alias to rtlequation
            'rtl': ['\\class{mrtltext}{\\text{#1}}', 1],
            'ع': ['\\class{mrtltext}{\\text{#1}}', 1], // Alias to rtl
            'markrtl': ''
        }
    }
});

//MathJax.Hub.Register.StartupHook('HTML-CSS Jax Ready', function () {
//    var REMAP = MathJax.OutputJax['HTML-CSS'].FONTDATA.REMAP;
//    var ZERO = 0x660;     // use 0x660 for Arabic, 0x6F0 for Persian
//    for (var i = 0; i < 10; i++) {
//        REMAP[0x30 + i] = ZERO + i;
//    }
//});

MathJax.Hub.Configured();
