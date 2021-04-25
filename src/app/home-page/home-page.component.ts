import { Component, OnInit } from "@angular/core";
import { ActorCount } from "../models/actor-count";
import { ByRating, RatingCount } from "../models/rating-count";
import { Show } from "../models/show";
import { YearCount, YearTotal } from "../models/year-count";
import { ActorApiService } from "../services/actors-api.service";
import { RatingApiService } from "../services/ratings-api.service";
import { ShowApiService } from "../services/show-api.service";

@Component({
  selector: "ofui-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  showData: Show[] = null;
  actorCounts: ActorCount[] = null;
  ratingCounts: RatingCount[] = null;
  ratingCountsByYear: ByRating<YearCount> = null;
  ratingTotalsByYear: YearTotal[] = null;
  constructor(
    private showApi: ShowApiService,
    private actorsApi: ActorApiService,
    private ratingsApi: RatingApiService
  ) {}
  ngOnInit(): void {
    this.showApi.all().subscribe((shows) => {
      this.showData = shows;
    });

    this.actorsApi.topN(20).subscribe((actors) => {
      this.actorCounts = actors;
    });

    this.ratingsApi.counts().subscribe((ratingCounts) => {
      this.ratingCounts = ratingCounts;
    });

    this.ratingsApi.countsByYear().subscribe((ratingCountsByYear) => {
      this.ratingCountsByYear = ratingCountsByYear;
    });

    this.ratingsApi.totalsByYear().subscribe((ratingTotalsByYear) => {
      this.ratingTotalsByYear = ratingTotalsByYear;
    });
  }

  dataReady() {
    return (
      this.showData !== null &&
      this.actorCounts != null &&
      this.ratingCounts !== null &&
      this.ratingCountsByYear !== null &&
      this.ratingTotalsByYear !== null
    );
  }
}
