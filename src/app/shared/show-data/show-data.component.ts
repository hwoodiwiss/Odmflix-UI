import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Subject } from "rxjs";
import { ActorCount } from "src/app/models/actor-count";
import { RatingCount } from "src/app/models/rating-count";
import { Show } from "src/app/models/show";
import { ActorApiService } from "src/app/services/actors-api.service";

@Component({
  selector: "ofui-show-data",
  templateUrl: "./show-data.component.html",
  styleUrls: ["./show-data.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ShowDataComponent implements OnInit {
  @Input() showData: Show[];
  @Input() compareOverTime: boolean = false;
  @Input() compareTypes: boolean;
  @Input() actorCounts: ActorCount[] = null;
  @Input() typeCounts: { [rating: string]: number } = null;
  @Input() ratingCounts: RatingCount[] = null;

  totalShows: number;
  yearAddedCounts: { [year: string]: number };
  yearReleasedCounts: { [year: string]: number };

  selectedRating: RatingCount = null;

  initComplete: boolean = false;

  faClose = faTimes;

  showDataSubject = new Subject<Show[]>();
  $showData = this.showDataSubject.asObservable();

  selectedRatingShowsSubject = new Subject<Show[]>();
  $selectedRatingShows = this.selectedRatingShowsSubject.asObservable();

  constructor(private actorsApi: ActorApiService) {}

  ngOnInit(): void {
    this.totalShows = this.showData.length;
    this.setupRatingCounts();
    this.setupDateAddedCounts();
    this.setupDateReleasedCounts();
    this.setupActorCounts();
    this.setupTypeCounts();
    this.initComplete = true;
  }

  setupRatingCounts() {
    if (this.ratingCounts === null) {
      this.ratingCounts = this.showData
        .map((show) => show.Rating)
        .reduce(function (acc, rating) {
          let foundIndex = acc.findIndex((item) => item.Rating == rating);
          if (foundIndex >= 0) {
            acc[foundIndex].Count++;
          } else {
            acc.push({ Rating: rating, Count: 1 });
          }
          return acc;
        }, new Array<RatingCount>());
    }
  }

  setupTypeCounts() {
    if (this.typeCounts === null) {
      this.typeCounts = this.showData
        .map((show) => show.ShowType)
        .reduce(function (counts, type) {
          counts[type] = (counts[type] || 0) + 1;
          return counts;
        }, Object.create(null));
    }
  }

  setupDateAddedCounts() {
    this.yearAddedCounts = this.showData
      .map((show) => show.DateAdded)
      .reduce(function (acc, date) {
        if (date !== null) {
          let parsedDate = new Date(date);
          let year = parsedDate.getFullYear();
          acc[year] = (acc[year] || 0) + 1;
        }
        return acc;
      }, Object.create(null));
  }

  setupDateReleasedCounts() {
    this.yearReleasedCounts = this.showData
      .map((show) => show.ReleaseYear)
      .reduce(function (acc, year) {
        if (year !== null) {
          acc[year] = (acc[year] || 0) + 1;
        }
        return acc;
      }, Object.create(null));
  }

  setupActorCounts() {
    if (this.actorCounts === null) {
      this.actorsApi
        .topNForShows(
          10,
          this.showData.map((item) => item.Id)
        )
        .subscribe((data) => {
          this.actorCounts = data;
        });
    }
  }

  getRatings() {
    return {
      label: "Ratings",
      data: this.ratingCounts.map((item) => item.Count),
    };
  }

  getRatingLabels() {
    return this.ratingCounts.map((item) => item.Rating);
  }

  getTypes() {
    let out = [];
    for (const type of Object.keys(this.typeCounts)) {
      out.push(this.typeCounts[type]);
    }
    return {
      label: "Types",
      data: out,
    };
  }

  getTypeLabels() {
    return Object.keys(this.typeCounts);
  }

  getActorCounts() {
    return {
      label: "Actors",
      data: this.actorCounts.map((item) => item.Count),
    };
  }

  getActorLabels() {
    return this.actorCounts.map((item) => item.Actor);
  }

  getAddedYears() {
    const datasets = [];
    let addedData = {
      label: "Year Added",
      data: [],
    };
    datasets.push(addedData);

    addedData.data = this.getYearLabels().map((addedYear) => {
      return this.yearAddedCounts[addedYear] || 0;
    });
    for (const year of Object.keys(this.yearAddedCounts).reverse()) {
      addedData.data.push(this.yearAddedCounts[year]);
    }

    if (this.compareOverTime) {
      let releasedData = {
        label: "Year Released",
        data: [],
      };
      datasets.push(releasedData);
      releasedData.data = this.getYearLabels().map((addedYear) => {
        return this.yearReleasedCounts[addedYear] || 0;
      });
    }
    return datasets;
  }

  getYearLabels() {
    let labelsArr = [];
    if (this.compareOverTime) {
      const addedYears = Object.keys(this.yearAddedCounts).reverse();
      const releasedYears = Object.keys(this.yearReleasedCounts).reverse();
      const labelsArrDupes = [...addedYears, ...releasedYears];
      labelsArr = labelsArrDupes
        .reduce((acc, curr) => {
          if (!acc.find((f) => f === curr)) {
            acc.push(curr);
          }
          return acc;
        }, new Array<string>())
        .sort((a, b) => +b - +a);
    } else {
      labelsArr = Object.keys(this.yearAddedCounts).reverse();
    }
    return labelsArr;
  }

  ratingSelected(index?: number) {
    if (index !== undefined) {
      this.selectedRating = this.ratingCounts[index];
      this.selectedRatingShowsSubject.next(
        this.showData.filter(
          (item) => item.Rating === this.selectedRating.Rating
        )
      );
    }
  }

  ratingShowsShown() {
    this.selectedRatingShowsSubject.next(
      this.showData.filter((item) => item.Rating === this.selectedRating.Rating)
    );
  }

  allShowsShown() {
    this.showDataSubject.next(this.showData);
  }
}
