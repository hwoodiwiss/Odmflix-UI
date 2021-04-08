export enum ApiErrorType {
  Unknown = -1,
  NetworkError = 0,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
}

export class ApiError extends Error {
  public readonly ErrorType: ApiErrorType;
  constructor(statusCode: number, message?: string) {
    super(message);

    this.ErrorType = this.getErrorTypeForCode(statusCode);
  }

  private getErrorTypeForCode(statusCode: number): ApiErrorType {
    if (!Object.keys(ApiErrorType).find((val) => val === statusCode.toString())) {
      statusCode = -1;
    }
    return ApiErrorType[ApiErrorType[statusCode]];
  }
}
