import { Injectable, HttpException } from '@nestjs/common';
import { ApiError } from './model/api-error';

@Injectable()
export class BaseException extends HttpException {
  constructor(public errors?: ApiError, public statusCode?: number) {
    super({ error: errors }, statusCode);
  }

  getErrorMessage(): ApiError {
    return this.errors;
  }

  getStatusCode(): number {
    return this.statusCode;
  }
}

