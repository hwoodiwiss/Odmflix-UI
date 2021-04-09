import "../import-jquery";
import { Config } from "../environment";
import { Show } from "../models";
import { Provider } from "./Provider";

export class ShowProvider extends Provider {
  private ApiUri: string;
  constructor(config: Config) {
    super();
    this.ApiUri = config.ApiUri;
  }

  public ById(id: number) {
    return this.fetchJson(`${this.ApiUri}/Show/ById?id=${id}`).then<Show>((data) => data);
  }

  public ByTypeName(typeName: string) {
    return this.fetchJson(`${this.ApiUri}/Show/ByTypeName?typeName=${typeName}`).then<Show[]>(
      (data) => data
    );
  }
}
