import { Exception } from '@poppinss/utils'

export class HoneypotFailureException extends Exception {
  public static invoke() {
    return new this('Honeypot Validation Failed', 403, 'E_HONEYPOT_FAILURE')
  }
}
