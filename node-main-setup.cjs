global.require = require;
const path = require("path");

if (!global.MathJax) global.MathJax = {};
global.MathJax.__dirname = __dirname;
