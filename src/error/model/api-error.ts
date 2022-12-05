export class ApiError {
  // ApiError response body created
  code: string;

  message: string;

  target: string;

  details: Detail[];

  constructor(code: string, message: string, target: string, details?: Detail[]) {
    this.code = code;
    this.message = message;
    this.target = target;
    this.details = details
  }


}

class Detail {
  code?: string;
  target?: string
  title?: string
  message?: string;
}
  