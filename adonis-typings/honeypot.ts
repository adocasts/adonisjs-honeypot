declare module '@ioc:Jagr/Honeypot' {
  import { ApplicationContract } from '@ioc:Adonis/Core/Application'
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

  export type HoneypotConfig = {
    fields: string[]
    flashOnFailure: boolean
    flashMessage: string | null
    flashKey: string | null
    redirectOnFailure: boolean
    redirectTo: string | null
  }

  export interface HoneypotMiddlewareContract {
    new (application: ApplicationContract): {
      handle(ctx: HttpContextContract, next: () => Promise<void>): any
    }
  }

  const HoneypotMiddleware: HoneypotMiddlewareContract
  export default HoneypotMiddleware
}
