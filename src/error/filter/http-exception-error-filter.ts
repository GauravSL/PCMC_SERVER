import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { BaseException } from "../base-exception";
import { BaseExceptionFilter } from "./base-exception-filter";

@Catch()
export class HttpExceptionErrorFilter extends BaseExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      status: status,
      error: {
        error: {
          code: status,
          message: exception.message,
          target: request.url,
        },
      },
    });
  }
}
