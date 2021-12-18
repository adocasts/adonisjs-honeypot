import { Exception } from '@poppinss/utils'

export class NoHoneypotFieldsFoundException extends Exception {
  public static invoke () {
    return new this(
      'All honeypot fields were missing from your form. Did you forget to add the honeypot component?',
      403,
      'E_NO_HONEYPOT_FIELDS_FOUND'
    )
  }
}
