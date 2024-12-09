import { ValidationError } from '@nestjs/common';
import { Exception } from './exception';

export class ValidationException extends Exception {
  constructor(error: ValidationError | ValidationError[]) {
    super(
      400,
      400,
      'DTO_VALIDATION_ERROR',
      ValidationException.mapConstraints2Message(error).join('; '),
      error,
      ValidationException,
    );
  }

  private static mapConstraints2Message(
    error: ValidationError | ValidationError[],
  ): Array<string> {
    if (Array.isArray(error)) {
      return error.reduce(
        (acc, curr) => acc.concat(Object.values(curr.constraints)),
        [],
      );
    }

    return Object.values(error.constraints);
  }
}
