import {ApplicationContract} from '@ioc:Adonis/Core/Application'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {HoneypotFailureException} from '../Exceptions/HoneypotFailureException'

export class HoneypotMiddleware {
  private config = this.app.container.resolveBinding('Adonis/Core/Config').get('honeypot.honeypotConfig')

  constructor (private app: ApplicationContract) {}

  public async handle ({ request, response, session }: HttpContextContract, next: () => Promise<void>) {
    const honeyValues = request.only(this.config.fields)
    let wasFlagged = false

    for (let key in honeyValues) {
      if (honeyValues[key]) {
        wasFlagged = true
      }
    }

    if (wasFlagged) {
      if (this.config.flashOnFailure && this.config.flashMessage && this.config.flashKey) {
        session.flash(this.config.flashKey, this.config.flashMessage)
      }

      if (this.config.redirectOnFailure && this.config.redirectTo) {
        response.redirect(this.config.redirectTo)
      } else {
        throw HoneypotFailureException.invoke()
      }
    } else {
      await next()
    }
  }
}
