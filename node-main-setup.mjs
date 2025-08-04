import {createRequire} from 'module';
global.require = createRequire(import.meta.url);

const path = require("path");

if (!global.MathJax) global.MathJax = {};
global.MathJax.__dirname =  path.dirname(new URL(import.meta.url).pathname);
