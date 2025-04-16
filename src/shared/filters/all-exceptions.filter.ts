import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest, FastifyReply } from 'fastify';

import { REQUEST_ID_TOKEN_HEADER } from '../constants';
import { BaseApiException } from '../exceptions/base-api.exception';
import { AppLogger } from '../logger/logger.service';
import { createRequestContext } from '../request-context/util';

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  constructor(
    private config: ConfigService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(AllExceptionsFilter.name);
  }

  catch(exception: T, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const req: FastifyRequest = ctx.getRequest<FastifyRequest>();
    const res: FastifyReply = ctx.getResponse<FastifyReply>();

    const path = req.url;
    const timestamp = new Date().toISOString();
    const requestId = req.headers[REQUEST_ID_TOKEN_HEADER] as string;
    const requestContext = createRequestContext(req);
    const acceptedLanguage = 'ja';

    // Initialize error properties with default values
    let errorProps = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorName: 'InternalException',
      message: 'Internal server error',
      details: undefined as string | Record<string, any> | undefined,
      localizedMessage: undefined as string | undefined,
      stack: undefined as any
    };

    // Extract error properties based on exception type
    switch (true) {
      case exception instanceof BaseApiException:
        const baseApiException = exception as BaseApiException;
        errorProps = {
          ...errorProps,
          statusCode: baseApiException.getStatus(),
          errorName: baseApiException.constructor.name,
          message: baseApiException.message,
          localizedMessage: baseApiException.localizedMessage
            ? baseApiException.localizedMessage[acceptedLanguage]
            : undefined,
          details: baseApiException.details || baseApiException.getResponse()
        };
        break;

      case exception instanceof HttpException:
        const httpException = exception as HttpException;
        errorProps = {
          ...errorProps,
          statusCode: httpException.getStatus(),
          errorName: httpException.constructor.name,
          message: httpException.message,
          details: httpException.getResponse()
        };
        break;

      case exception instanceof Error:
        const error = exception as Error;
        errorProps = {
          ...errorProps,
          errorName: error.constructor.name,
          message: error.message,
          stack: error.stack
        };
        break;
    }

    // Create the error response object
    const error = {
      statusCode: errorProps.statusCode,
      message: errorProps.message,
      localizedMessage: errorProps.localizedMessage,
      errorName: errorProps.errorName,
      details: errorProps.details,
      path,
      requestId,
      timestamp,
    };

    this.logger.warn(requestContext, error.message, {
      error,
      stack: errorProps.stack,
    });

    // Suppress original internal server error details in prod mode
    const isProMood = this.config.get<string>('env') !== 'development';
    if (isProMood && error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      error.message = 'Internal server error';
    }

    res.status(error.statusCode).send({ error });
  }
}