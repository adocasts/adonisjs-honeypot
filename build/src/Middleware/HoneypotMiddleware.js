"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoneypotMiddleware = void 0;
const HoneypotFailureException_1 = require("../Exceptions/HoneypotFailureException");
class HoneypotMiddleware {
    constructor(app) {
        this.app = app;
        this.config = this.app.container.resolveBinding('Adonis/Core/Config').get('honeypot.honeypotConfig');
    }
    async handle({ request, response, session }, next) {
        const honeyValues = request.only(this.config.fields);
        let wasFlagged = false;
        for (let key in honeyValues) {
            if (honeyValues[key]) {
                wasFlagged = true;
            }
        }
        if (wasFlagged) {
            if (this.config.flashOnFailure && this.config.flashMessage && this.config.flashKey) {
                session.flash(this.config.flashKey, this.config.flashMessage);
            }
            if (this.config.redirectOnFailure && this.config.redirectTo) {
                response.redirect(this.config.redirectTo);
            }
            else {
                throw HoneypotFailureException_1.HoneypotFailureException.invoke();
            }
        }
        else {
            await next();
        }
    }
}
exports.HoneypotMiddleware = HoneypotMiddleware;
