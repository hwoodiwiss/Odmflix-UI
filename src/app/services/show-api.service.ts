import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Show } from "../models/show";
import { AppConfig, APP_CONFIG } from "../app.config";

@Injectable({
  providedIn: "root",
})
export class ShowApiService {
  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private httpClient: HttpClient
  ) {}

  public byId(id: number) {
    return this.httpClient.get<Show>(
      `${this.config.ApiUri}/Show/ById?id=${id}`
    );
  }
  public byTypeId(id: number) {
    return this.httpClient.get<Show[]>(
      `${this.config.ApiUri}/Show/ByType?id=${id}`
    );
  }
  public byTypeName(typeName: string) {
    return this.httpClient.get<Show[]>(
      `${this.config.ApiUri}/Show/ByTypeName?typeName=${typeName}`
    );
  }

  public all() {
    return this.httpClient.get<Show[]>(`${this.config.ApiUri}/Show/All`);
  }
}