import "../import-jquery";
import { Config } from "../environment";
import { Show } from "./Show";

export class ShowProvider {
  private ApiUri: string;
  constructor(config: Config) {
    this.ApiUri = config.ApiUri;
  }

  public ById(id: number) {
    return fetch(`${this.ApiUri}/Show/ById?id=${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          `Error getting data from the API. Response code: ${response.status}`
        );
      })
      .then<Show>((data) => data);
  }
}
