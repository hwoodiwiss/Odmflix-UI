import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { DurationsApiService } from "../services/durations-api.service";

@Component({
  selector: "ofui-durations-page",
  templateUrl: "./durations-page.component.html",
  styleUrls: ["./durations-page.component.scss"],
})
export class DurationsPageComponent implements OnInit {
  totalSeasons = 0;
  averageSeasons = 0;
  totalMinutes = 0;
  averageMinutes = 0;
  constructor(private durationsApi: DurationsApiService) {}

  ngOnInit(): void {
    let tasks$ = [];
    tasks$.push(this.durationsApi.totalSeasons());
    tasks$.push(this.durationsApi.averageSeasons());
    tasks$.push(this.durationsApi.totalMovieMins());
    tasks$.push(this.durationsApi.averageMovieMins());
    forkJoin(tasks$).subscribe((res: number[]) => {
      [
        this.totalSeasons,
        this.averageSeasons,
        this.totalMinutes,
        this.averageMinutes,
      ] = res;
    });
  }

  totalDays = () => Math.round((this.totalMinutes / 60 / 24) * 100) / 100;
}
