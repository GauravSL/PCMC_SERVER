import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response, Request } from 'express';
import { BaseException } from '../base-exception';

/**
 * abnormal basic filter
 *
 * @export
 * @class BaseExceptionFilter
 * @implements {ExceptionFilter}
 */
export abstract class BaseExceptionFilter implements ExceptionFilter {
  /**
   * exception class capture
   *
   * @abstract
   * @param {BaseException} exception
   * @param {ArgumentsHost} host
   * @memberof BaseExceptionFilter
   */
  abstract catch(exception: BaseException, host: ArgumentsHost);

  /**
   * get HTTP request context parameters
   *
   * @protected
   * @param {ArgumentsHost} host
   * @return {*}
   * @memberof BaseExceptionFilter
   */
  protected getHttpContext(host: ArgumentsHost) {
    return host.switchToHttp();
  }

  /**
   * get HTTP response parameters
   *
   * @protected
   * @param {HttpArgumentsHost} httpContext
   * @return {*}
   * @memberof BaseExceptionFilter
   */
  protected getResponse(httpContext: HttpArgumentsHost): Response {
    return httpContext.getResponse();
  }

  /**
   * get HTTP request parameters
   *
   * @protected
   * @param {HttpArgumentsHost} httpContext
   * @return {*}
   * @memberof BaseExceptionFilter
   */
  protected getRequest(httpContext: HttpArgumentsHost): Request {
    return httpContext.getRequest();
  }

  /**
   * write exception information to the client
   *
   * @param {ArgumentsHost} host
   * @param {BaseException} exception
   * @memberof BaseExceptionFilter
   */
  protected writeToClient(host: ArgumentsHost, exception: BaseException) {
    const ctx = this.getHttpContext(host);
    if (exception instanceof BaseException) {
      this.getResponse(ctx)
        .status(exception.statusCode)
        .json({
          error: exception.getErrorMessage(),
          path: this.getRequest(ctx).url,
        });
    } else {
      const httpException = exception;
      this.getResponse(ctx)
        .status(500)
        .json({
          messerrorage: 'unhandled exception',
          path: this.getRequest(ctx).url,
        });
    }
  }
}
