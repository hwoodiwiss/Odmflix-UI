import "../import-jquery";
import { Config } from "../environment";
import { Show } from "../models";
import { Provider } from "./Provider";

export class ShowProvider extends Provider {
  constructor(config: Config) {
    super(config.ApiUri, "Show");
  }

  public ById(id: number) {
    return this.fetchJson(`${this.ApiRoute}/ById?id=${id}`).then<Show>((data) => data);
  }

  public ByTypeId(id: number) {
    return this.fetchJson(`${this.ApiRoute}/ByType?id=${id}`).then<Show[]>((data) => data);
  }

  public ByTypeName(typeName: string) {
    return this.fetchJson(`${this.ApiRoute}/ByTypeName?typeName=${typeName}`).then<Show[]>(
      (data) => data
    );
  }
}
