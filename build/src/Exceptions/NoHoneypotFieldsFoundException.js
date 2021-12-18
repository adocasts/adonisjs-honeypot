"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoHoneypotFieldsFoundException = void 0;
const utils_1 = require("@poppinss/utils");
class NoHoneypotFieldsFoundException extends utils_1.Exception {
    static invoke() {
        return new this('All honeypot fields were missing from your form. Did you forget to add the honeypot component?', 403, 'E_NO_HONEYPOT_FIELDS_FOUND');
    }
}
exports.NoHoneypotFieldsFoundException = NoHoneypotFieldsFoundException;
