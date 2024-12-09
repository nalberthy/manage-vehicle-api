import { Exception } from './exception';

export class GenericException extends Exception {
  constructor(
    code: number,
    statusCode: number,
    key: string,
    message: string,
    context?: any,
  ) {
    super(code, statusCode, key, message, context, GenericException);
  }
}
