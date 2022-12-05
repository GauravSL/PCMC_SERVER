import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base-exception';
import { ApiError } from './model/api-error';

export class CustomException extends BaseException {
  constructor(public error: ApiError) {
    super(error, HttpStatus.BAD_REQUEST);
  }
}
