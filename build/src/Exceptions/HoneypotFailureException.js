"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoneypotFailureException = void 0;
const utils_1 = require("@poppinss/utils");
class HoneypotFailureException extends utils_1.Exception {
    static invoke() {
        return new this('Honeypot Validation Failed', 403, 'E_HONEYPOT_FAILURE');
    }
}
exports.HoneypotFailureException = HoneypotFailureException;
