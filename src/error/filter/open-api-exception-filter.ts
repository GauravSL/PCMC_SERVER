import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { error } from "express-openapi-validator";
import { ApiError } from "../model/api-error";

@Catch(...Object.values(error))
export class OpenApiExceptionFilter implements ExceptionFilter {
  catch(errors: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const data = this.transformError(errors);
    response.status(errors.status).header(errors.headers).json({
      error: data,
    });
  }

  // This transformError method will create a common structure for error response
  private transformError(errorObj: ValidationError) {
    //  Message string for error object
    const messageStr = errorObj.errors[0].path;
    let errorMessage = "";
    let errorTarget = "";
    const cause = messageStr.startsWith(".query", 0);
    if (cause) {
      errorMessage = "Query parameters are not valid";
      errorTarget = "Query";
    } else if (messageStr.startsWith(".schema", 0)) {
      errorMessage = "Schema structure is not valid";
      errorTarget = "Schema";
    } else {
      errorMessage = "Something went wrong";
      errorTarget = "";
    }

    const errRespObj = new ApiError("badargument", errorMessage, errorTarget);
    if (errorObj.errors && errorObj.errors.length > 0) {
      const allErros = errorObj.errors;
      errRespObj.details = allErros.map((item) => {
        let container = {};
        const code = "request" + item.path; // errorCode
        const target = item.path;
        const message = item.message;
        return (container = { ...container, code, target, message });
      });
    }
    return errRespObj;
  }
}

interface ValidationError {
  status: number;
  message: string;
  errors: Array<{
    path: string;
    message: string;
    error_code?: string;
  }>;
  path?: string;
  name: string;
  headers: {
    [header: string]: string;
  };
}
