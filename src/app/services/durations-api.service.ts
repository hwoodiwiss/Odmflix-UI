import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { APP_CONFIG, AppConfig } from "../app.config";

@Injectable({
  providedIn: "root",
})
export class DurationsApiService {
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  totalSeasons() {
    return this.httpClient.get<number>(
      `${this.config.ApiUri}/Duration/GetTvTotal`
    );
  }

  averageSeasons() {
    return this.httpClient.get<number>(
      `${this.config.ApiUri}/Duration/GetTvAverage`
    );
  }

  totalMovieMins() {
    return this.httpClient.get<number>(
      `${this.config.ApiUri}/Duration/GetMovieTotal`
    );
  }

  averageMovieMins() {
    return this.httpClient.get<number>(
      `${this.config.ApiUri}/Duration/GetMovieAverage`
    );
  }
}
