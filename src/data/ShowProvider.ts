import "../import-jquery";
import { Config } from "../environment";
import { Show } from "./Show";
import { Provider } from "./Provider";

export class ShowProvider extends Provider {
  private ApiUri: string;
  constructor(config: Config) {
    super();
    this.ApiUri = config.ApiUri;
  }

  public ById(id: number) {
    return this.fetchJson(`${this.ApiUri}/Show/ById?id=${id}`, "GET").then<Show>((data) => data);
  }

  public ByTypeName(typeName: string) {
    return this.fetchJson(`${this.ApiUri}/Show/ByTypeName?typeName=${typeName}`, "GET").then<
      Show[]
    >((data) => data);
  }
}
