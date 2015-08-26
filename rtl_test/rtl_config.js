MathJax.Hub.Config({
    tex2jax: {
        inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"]
        ],
        scale: 100
    }
});

MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready", function () {
    var REMAP = MathJax.OutputJax["HTML-CSS"].FONTDATA.REMAP;
    var ZERO = 0x660;     // use 0x660 for Arabic, 0x6F0 for Persian
    for (var i = 0; i < 10; i++) {
        REMAP[0x30 + i] = ZERO + i
    }
});

MathJax.Hub.Configured();
