import validator from 'validator'
// Capturar a interface e implementá-la
import { EmailValidator } from '../presentation/protocols/email-validator'
export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email)
  }
}
