import {
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';

import { ApiError } from './interface/api-error.interface';
import { ValidationUtil } from '../util/validation.util';
import { GenericException } from '../exception/generic.exception';
import { Response } from 'express';
import { ValidationException } from '../exception/validation.exception';

@Catch()
export class GenericExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger(GenericExceptionFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let apiError: ApiError = {
      code: 500,
      internalCode: 'INTERNAL_SERVER_ERROR',
      key: null,
      message: null,
    };

    if (ValidationUtil.isErrorInstanceOf(exception, HttpException)) {
      this.logger.error(exception.name);
      this.logger.error(exception.message);

      apiError = this.parseHttpException(exception);
    } else if (
      ValidationUtil.isErrorInstanceOf(exception, GenericException) ||
      ValidationUtil.isErrorInstanceOf(exception, ValidationException)
    ) {
      apiError = this.parseAccountActivateException(exception);
      this.logger.error(apiError);
    }

    response.status(apiError.code).json(apiError);
  }

  private parseAccountActivateException(exception: GenericException): ApiError {
    const apiError: ApiError = {
      code: exception.code,
      internalCode: exception.statusCode,
      key: exception.key,
      message: exception.message,
      context: exception.context,
    };

    if (exception.context) {
      apiError.context = exception.context;
    }

    return apiError;
  }

  private parseHttpException(exception: HttpException): ApiError {
    const apiError: ApiError = {
      code: exception.getStatus(),
      key: exception.name,
      message: exception.message,
    };

    return apiError;
  }
}
