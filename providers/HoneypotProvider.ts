import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class HoneypotProvider {
  public static needsApplication = true

  constructor (protected app: ApplicationContract) {}

  public register () {
    // Register your own bindings
    this.app.container.singleton('Jagr/Honeypot', () => {
      const { HoneyptMiddleware } = require('../src/Middleware/HoneypotMiddleware')
      return HoneyptMiddleware
    })
  }

  public async boot () {
    // IoC container is ready
    const View = this.app.container.resolveBinding('Adonis/Core/View')
    const honeypotConfig = this.app.container.resolveBinding('Adonis/Core/Config').get('honeypot.honeypotConfig')

    View.registerTemplate('honeypot', {
      template: honeypotConfig.fields.map(f => `<input type="text" class="ohbother" name="${f}" />`).join(''),
    })
  }
}
