import { ApiError } from "./ApiError";

export abstract class Provider {
  protected fetchJson(endpoint: string, method: string) {
    return fetch(endpoint, { method }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new ApiError(
        response.status,
        `Error getting data from the API. Response code: ${response.status}`
      );
    });
  }
}
