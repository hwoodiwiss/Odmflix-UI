import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { AppConfig, APP_CONFIG } from "../app.config";
import { ByRating, RatingCount } from "../models/rating-count";
import { YearCount, YearTotal } from "../models/year-count";

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

  public countsByYear() {
    return this.httpClient.get<ByRating<YearCount>>(
      `${this.config.ApiUri}/Rating/CountsByYear`
    );
  }

  public totalsByYear() {
    return this.httpClient.get<YearTotal[]>(
      `${this.config.ApiUri}/Rating/TotalsByYear`
    );
  }

  public countsByYearForShows(showIds: number[]) {
    return this.httpClient.post<ByRating<YearCount>>(
      `${this.config.ApiUri}/Rating/CountsByYearForShows`,
      showIds
    );
  }

  public totalsByYearForShows(showIds: number[]) {
    return this.httpClient.post<YearTotal[]>(
      `${this.config.ApiUri}/Rating/TotalsByYearForShows`,
      showIds
    );
  }
}
