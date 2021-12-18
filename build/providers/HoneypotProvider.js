"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HoneypotProvider {
    constructor(app) {
        this.app = app;
    }
    register() {
        // Register your own bindings
        this.app.container.singleton('Jagr/Honeypot', () => {
            const { HoneypotMiddleware } = require('../src/Middleware/HoneypotMiddleware');
            return HoneypotMiddleware;
        });
    }
    async boot() {
        // IoC container is ready
        const View = this.app.container.resolveBinding('Adonis/Core/View');
        const honeypotConfig = this.app.container.resolveBinding('Adonis/Core/Config').get('honeypot.honeypotConfig');
        View.registerTemplate('honeypot', {
            template: honeypotConfig.fields.map(f => `<input type="text" class="ohbother" name="${f}" />`).join(''),
        });
    }
}
exports.default = HoneypotProvider;
HoneypotProvider.needsApplication = true;
