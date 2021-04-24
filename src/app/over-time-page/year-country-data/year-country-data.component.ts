import { Component, Input, OnInit } from "@angular/core";
import { Show } from "src/app/models/show";

@Component({
  selector: "ofui-year-country-data",
  templateUrl: "./year-country-data.component.html",
  styleUrls: ["./year-country-data.component.scss"],
})
export class YearCountryDataComponent implements OnInit {
  @Input() showData: Show[];
  @Input() compareRelease: boolean = false;
  totalShows: number;
  ratingCounts: { [rating: string]: number };
  yearAddedCounts: { [rating: string]: number };
  yearReleasedCounts: { [rating: string]: number };
  initComplete: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.totalShows = this.showData.length;
    this.setupRatingCounts();
    this.setupDateAddedCounts();
    this.setupDateReleasedCounts();
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

    if (this.compareRelease) {
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
    if (this.compareRelease) {
      const addedYears = Object.keys(this.yearAddedCounts).reverse();
      const releasedYears = Object.keys(this.yearReleasedCounts).reverse();
      console.log(this.yearReleasedCounts);

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
}
