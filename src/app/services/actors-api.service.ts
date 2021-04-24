import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { AppConfig, APP_CONFIG } from "../app.config";
import { ActorCount } from "../models/actor-count";

@Injectable({
  providedIn: "root",
})
export class ActorsApiService {
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  public topNForShows(n: number, ids: number[]) {
    return this.httpClient.post<ActorCount[]>(
      `${this.config.ApiUri}/Actor/GetActorsForShowsWithLimit`,
      {
        Limit: n,
        IdList: ids,
      }
    );
  }
}
