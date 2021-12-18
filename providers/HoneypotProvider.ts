import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class HoneypotProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Register your own bindings
  }

  public async boot () {
    // IoC container is ready
    const View = this.app.container.resolveBinding('Adonis/Core/View')
    const HoneypotConfig = this.app.container.resolveBinding('App/Core/Config').get('honeypot')

    View.registerTemplate('honeypot', {
      template: HoneypotConfig.fields.map(f => `<input type="text" class="ohbother" name="${f}" />`).join('')
    })
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
