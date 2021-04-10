import { ApiError, ApiErrorType } from "./ApiError";

export abstract class Provider {
  protected ApiRoute: string;
  constructor(ApiUri: string, ApiRoute: string) {
    this.ApiRoute = `${ApiUri}/${ApiRoute}`;
  }
  protected fetchJson(endpoint: string, init?: RequestInit) {
    return fetch(endpoint, init)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new ApiError(
          response.status,
          `Error getting data from the API. Response code: ${response.status}`
        );
      })
      .catch((reason) => {
        throw new ApiError(ApiErrorType.BadRequest, `Network Error getting data from the API.`);
      });
  }
}
