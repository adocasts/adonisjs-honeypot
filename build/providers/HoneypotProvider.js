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
        const fieldTemplate = honeypotConfig.fields.map(f => `<input type="text" class="ohbother" name="${f}" />`).join('');
        View.registerTemplate('honeypot', {
            template: `
        <style>
          .ohbother {
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            height: 0;
            width: 0;
            z-index: -1;
          }
        </style>
        ${fieldTemplate}
      `,
        });
    }
}
exports.default = HoneypotProvider;
HoneypotProvider.needsApplication = true;
