import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HoneypotFailureException } from '../Exceptions/HoneypotFailureException'
import { NoHoneypotFieldsFoundException } from '../Exceptions/NoHoneypotFieldsFoundException'
import { inject } from '@adonisjs/core/build/standalone'
import { env } from 'process'

@inject(['Adonis/Core/Application'])
export class HoneypotMiddleware {
  private config = this.app.container.resolveBinding('Adonis/Core/Config').get('honeypot.honeypotConfig')

  private states = {
    VALID: 1, // all good
    INVALID: 2, // honeypot field had a value
    MISSING: 3, // no honeypot fields found
  }

  private supportedMethods = ['POST', 'PUT', 'PATCH']

  constructor (private app: ApplicationContract) {}

  private validateFields (values: { [p: string]: any }) {
    let state = this.states.VALID

    if (Object.keys(values).length === 0) {
      return this.states.MISSING
    }

    for (let key in values) {
      if (values[key]) {
        state = this.states.INVALID
      }
    }

    return state
  }

  public async handle ({ request, response, session, logger }: HttpContextContract, next: () => Promise<void>) {
    // bypass honeypot during tests
    if (env['NODE_ENV']?.toLowerCase() === 'test') {
      await next()
      return
    }

    if (!this.supportedMethods.includes(request.method())) {
      logger.warn(`[adonisjs-honeypot] Provided Http Method "${request.method()}" is not supported.`)
      return
    }

    const honeyValues = request.only(this.config.fields)
    const state = this.validateFields(honeyValues)

    // no honeypot fields found
    if (state === this.states.MISSING) {
      throw NoHoneypotFieldsFoundException.invoke()
    }

    // honeypot field contained value
    if (state === this.states.INVALID) {
      if (this.config.flashOnFailure && this.config.flashMessage && this.config.flashKey) {
        session.flash(this.config.flashKey, this.config.flashMessage)
      }

      if (!this.config.redirectOnFailure || !this.config.redirectTo) {
        throw HoneypotFailureException.invoke()
      }

      return response.redirect(this.config.redirectTo)
    }

    // all good, continue
    await next()
  }
}
