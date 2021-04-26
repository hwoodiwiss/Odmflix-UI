import { Component, OnInit } from "@angular/core";
import { ActorCount } from "../models/actor-count";
import { ByRating, RatingCount } from "../models/rating-count";
import { Show } from "../models/show";
import { Type } from "../models/type";
import { YearCount, YearTotal } from "../models/year-count";
import { ActorApiService } from "../services/actors-api.service";
import { RatingApiService } from "../services/ratings-api.service";
import { ShowApiService } from "../services/show-api.service";
import { TypeApiService } from "../services/type-api.service";

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
  currentTypeId: number | string = null;
  types: Type[];
  compareTypes = true;

  constructor(
    private showApi: ShowApiService,
    private actorsApi: ActorApiService,
    private ratingsApi: RatingApiService,
    private typeApi: TypeApiService
  ) {}
  ngOnInit(): void {
    this.typeApi.all().subscribe((types) => {
      this.types = types;
    });
    this.refreshAllData();
  }

  refreshAllData() {
    this.showData = null;
    this.actorCounts = null;
    this.ratingCounts = null;
    this.ratingCountsByYear = null;
    this.ratingTotalsByYear = null;
    this.compareTypes = true;

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

  refreshTypeData(typeId: number) {
    this.showData = null;
    this.actorCounts = null;
    this.ratingCounts = null;
    this.ratingCountsByYear = null;
    this.ratingTotalsByYear = null;
    this.compareTypes = false;

    this.showApi.byTypeId(typeId).subscribe((shows) => {
      this.showData = shows;
      let ids = shows.map((item) => item.Id);
      this.actorsApi.topNForShows(20, ids).subscribe((actors) => {
        this.actorCounts = actors;
      });

      this.ratingsApi.countsForShows(ids).subscribe((ratingCounts) => {
        this.ratingCounts = ratingCounts;
      });

      this.ratingsApi
        .countsByYearForShows(ids)
        .subscribe((ratingCountsByYear) => {
          this.ratingCountsByYear = ratingCountsByYear;
        });

      this.ratingsApi
        .totalsByYearForShows(ids)
        .subscribe((ratingTotalsByYear) => {
          this.ratingTotalsByYear = ratingTotalsByYear;
        });
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

  changeType() {
    if (this.currentTypeId === "null" || this.currentTypeId === null) {
      this.refreshAllData();
    } else {
      this.refreshTypeData(this.currentTypeId as number);
    }
  }
}
