import { Component, Input, OnInit } from "@angular/core";
import { Show } from "src/app/models/show";

@Component({
  selector: "ofui-year-country-data",
  templateUrl: "./year-country-data.component.html",
  styleUrls: ["./year-country-data.component.scss"],
})
export class YearCountryDataComponent implements OnInit {
  @Input() showData: Show[];
  totalShows: number;
  ratingCounts: { [rating: string]: number };
  yearAddedCounts: { [rating: string]: number };
  initComplete: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.totalShows = this.showData.length;
    this.setupRatingCounts();
    this.setupDateAddedCounts();
    this.initComplete = true;
  }

  setupRatingCounts() {
    this.ratingCounts = this.showData
      .map((show) => show.Rating)
      .reduce(function (counts, rating) {
        counts[rating] = (counts[rating] || 0) + 1;
        return counts;
      }, Object.create(null));
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

  getRatings() {
    let out = [];
    for (const rating of Object.keys(this.ratingCounts)) {
      out.push(this.ratingCounts[rating]);
    }
    return {
      label: "Ratings",
      data: out,
    };
  }

  getRatingLabels() {
    return Object.keys(this.ratingCounts);
  }

  getAddedYears() {
    let outItem = {
      label: "Count",
      data: [],
    };
    for (const year of Object.keys(this.yearAddedCounts).reverse()) {
      outItem.data.push(this.yearAddedCounts[year]);
    }
    return [outItem];
  }

  getAddedYearLabels() {
    return Object.keys(this.yearAddedCounts).reverse();
  }
}
