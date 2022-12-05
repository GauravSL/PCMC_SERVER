import { Catch, ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { AxiosError } from "axios";
import { Response } from "express";
import { ApiError } from "../model/api-error";

@Catch(AxiosError)
export class AxiosExceptionilter implements ExceptionFilter {
  catch(exception: any = AxiosError, host: ArgumentsHost) {
    console.log("Filer error: " + JSON.stringify(exception));
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const detailObject = [
      {
        code: exception.response?.data?.errors[0]?.code,
        title: exception.response?.data?.errors[0]?.title,
        message: exception.response?.data?.errors[0]?.detail,
      },
    ];
    const errorObject = new ApiError(
      exception.response?.status,
      exception.response?.statusText,
      request.url,
      detailObject
    );

    response.status(exception.response?.status).json(errorObject);
  }
}
