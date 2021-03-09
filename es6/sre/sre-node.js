"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SRE = require("speech-rule-engine");
global.SRE = SRE;
global.sre = Object.create(SRE);
global.sre.Engine = {
    isReady() {
        return SRE.engineReady();
    }
};
//# sourceMappingURL=sre-node.js.map