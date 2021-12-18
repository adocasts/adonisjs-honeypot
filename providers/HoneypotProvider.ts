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
    const HoneypotConfig = this.app.container.resolveBinding('App/Core/Config').get('honeypot')

    View.registerTemplate('honeypot', {
      template: HoneypotConfig.fields.map(f => `<input type="text" class="ohbother" name="${f}" />`).join(''),
    })
  }
}
