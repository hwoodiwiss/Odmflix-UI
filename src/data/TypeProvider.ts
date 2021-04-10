import "../import-jquery";
import { Config } from "../environment";
import { Type } from "../models";
import { Provider } from "./Provider";

export class TypeProvider extends Provider {
  constructor(config: Config) {
    super(config.ApiUri, "Type");
  }

  public GetAll() {
    return this.fetchJson(`${this.ApiRoute}/All`).then<Type[]>((data) => data);
  }

  public GetCounts() {
    return this.fetchJson(`${this.ApiRoute}/Counts`).then<{ Type: string; Count: number }[]>(
      (data) => data
    );
  }

  public GetCount(id: number) {
    return this.fetchJson(`${this.ApiRoute}/Count?id=${id}`).then<{ Type: string; Count: number }>(
      (data) => data
    );
  }
}
