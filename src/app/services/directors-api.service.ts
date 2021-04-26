import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { AppConfig, APP_CONFIG } from "../app.config";
import { Director } from "../models/directors";
import { Show } from "../models/show";

@Injectable({
  providedIn: "root",
})
export class DirectorsApiService {
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  all() {
    return this.httpClient.get<Director[]>(
      `${this.config.ApiUri}/Director/All`
    );
  }

  shows(id: number) {
    return this.httpClient.get<Show[]>(
      `${this.config.ApiUri}/Director/GetShows?id=${id}`
    );
  }
}
