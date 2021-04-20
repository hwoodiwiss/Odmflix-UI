import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { APP_CONFIG, AppConfig } from "../app.config";
import { Show } from "../models/show";
import { Type, TypeCount } from "../models/type";

@Injectable({
  providedIn: "root",
})
export class TypeApiService {
  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private httpClient: HttpClient
  ) {}

  public all() {
    return this.httpClient.get<Type[]>(`${this.config.ApiUri}/Type/All`);
  }

  public counts() {
    return this.httpClient.get<TypeCount[]>(
      `${this.config.ApiUri}/Type/Counts`
    );
  }

  public getCount(id: number) {
    return this.httpClient.get<TypeCount>(
      `${this.config.ApiUri}/Type/Count?id=${id}`
    );
  }
}
