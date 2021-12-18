"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoneypotMiddleware = void 0;
const HoneypotFailureException_1 = require("../Exceptions/HoneypotFailureException");
const NoHoneypotFieldsFoundException_1 = require("../Exceptions/NoHoneypotFieldsFoundException");
const standalone_1 = require("@adonisjs/core/build/standalone");
let HoneypotMiddleware = class HoneypotMiddleware {
    constructor(app) {
        this.app = app;
        this.config = this.app.container.resolveBinding('Adonis/Core/Config').get('honeypot.honeypotConfig');
        this.states = {
            VALID: 1,
            INVALID: 2,
            MISSING: 3, // no honeypot fields found
        };
    }
    validateFields(values) {
        let state = this.states.VALID;
        if (Object.keys(values).length === 0) {
            return this.states.MISSING;
        }
        for (let key in values) {
            if (values[key]) {
                state = this.states.INVALID;
            }
        }
        return state;
    }
    async handle({ request, response, session }, next) {
        const honeyValues = request.only(this.config.fields);
        const state = this.validateFields(honeyValues);
        // no honeypot fields found
        if (state === this.states.MISSING) {
            throw NoHoneypotFieldsFoundException_1.NoHoneypotFieldsFoundException.invoke();
        }
        // honeypot field contained value
        if (state === this.states.INVALID) {
            if (this.config.flashOnFailure && this.config.flashMessage && this.config.flashKey) {
                session.flash(this.config.flashKey, this.config.flashMessage);
            }
            if (!this.config.redirectOnFailure || !this.config.redirectTo) {
                throw HoneypotFailureException_1.HoneypotFailureException.invoke();
            }
            return response.redirect(this.config.redirectTo);
        }
        // all good, continue
        await next();
    }
};
HoneypotMiddleware = __decorate([
    (0, standalone_1.inject)(['Adonis/Core/Application']),
    __metadata("design:paramtypes", [Object])
], HoneypotMiddleware);
exports.HoneypotMiddleware = HoneypotMiddleware;
