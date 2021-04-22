import { Component, OnInit } from "@angular/core";
import { ByYear } from "src/app/models/by-year";
import { CountryCount } from "src/app/models/country-count";
import { ShowApiService } from "src/app/services/show-api.service";

@Component({
  selector: "ofui-map-years",
  templateUrl: "./map-years.component.html",
  styleUrls: ["./map-years.component.scss"],
})
export class MapYearsComponent implements OnInit {
  data?: ByYear<CountryCount>;
  years: number[];
  rangeMin = 0;
  rangeMax = 0;
  thingIndex = 0;
  rangeModel = 0;
  rangeVal = 0;

  namesMap = new Map<string, string>();

  constructor(private showApi: ShowApiService) {
    this.data = null;
    this.namesMap.set("Soviet Union", "Russia");
  }
  ngOnInit(): void {
    this.showApi.byCountryByYearCount().subscribe((d) => {
      this.years = Object.keys(d)
        .map((year) => +year)
        .sort((a, b) => {
          return a - b;
        });
      this.setDefaults(this.years);
      this.data = d;
    });
  }

  setDefaults(years: number[]) {
    this.rangeMin = years[0];
    this.rangeMax = years[this.years.length - 1];
    this.rangeModel = this.rangeMin;
    this.rangeVal = this.rangeMin;
    this.thingIndex = this.rangeMin;
  }

  datumFrameValue(index: number) {
    return (datum: GeoJSON.Feature<GeoJSON.Geometry>) => {
      let yearVals = this.data[index];

      let countryVal = yearVals.find((f) => {
        const datumName = datum.properties.name as string;
        const searchTerm = this.namesMap.has(f.Country)
          ? this.namesMap[f.Country]
          : f.Country;
        return datumName.search(searchTerm) > -1;
      });

      return +(countryVal?.Count ?? 0);
    };
  }

  nextNearest(evt: any) {
    console.log(evt);
    const diff = evt - this.rangeVal;
    const currIdx = this.years.findIndex((f) => f == this.rangeVal);
    console.log(diff);

    if (diff > 0) {
      console.log("skipped", evt);
      this.rangeVal = this.rangeModel = this.years[currIdx + 1];
    } else if (diff < 0) {
      this.rangeVal = this.rangeModel = this.years[currIdx - 1];
    } else {
      this.rangeVal = evt;
    }

    this.thingIndex = this.rangeVal;
  }

  startAnimation() {
    this.rangeVal = this.rangeMin;
    this.animateFrame();
  }

  animateFrame() {
    if (this.rangeVal < this.rangeMax) {
      setTimeout(() => {
        this.nextNearest(this.rangeVal + 1);
        this.animateFrame();
      }, 500);
    }
  }
}
