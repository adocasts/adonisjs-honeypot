declare module '@ioc:Jagr/Honeypot' {
  export type HoneypotConfig = {
    fields: string[]
    flashOnFailure: boolean
    flashMessage: string | null
    flashKey: string | null
    redirectOnFailure: boolean
    redirectTo: string | null
  }
}
