import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { AppConfig, APP_CONFIG } from "../app.config";
import { ActorCount } from "../models/actor-count";
import { RatingCount } from "../models/rating-count";

@Injectable({
  providedIn: "root",
})
export class RatingApiService {
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  public counts() {
    return this.httpClient.get<RatingCount[]>(
      `${this.config.ApiUri}/Rating/Counts`
    );
  }
}
