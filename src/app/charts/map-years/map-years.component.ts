import { Component, Inject, Input, OnInit } from "@angular/core";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Observable } from "rxjs";
import { COUNTRIES_MAP } from "src/app/countries.map";
import { ByYear } from "src/app/models/by-year";
import { CountryCount } from "src/app/models/country-count";
import { ShowApiService } from "src/app/services/show-api.service";

@Component({
  selector: "ofui-map-years",
  templateUrl: "./map-years.component.html",
  styleUrls: ["./map-years.component.scss"],
})
export class MapYearsComponent implements OnInit {
  faPlay = faPlay;
  faPause = faPause;

  @Input() dataSource: Observable<ByYear<CountryCount>>;
  data?: ByYear<CountryCount>;
  years: number[];
  rangeMin = 0;
  rangeMax = 0;
  thingIndex = 0;
  rangeModel = 0;
  rangeVal = 0;
  animating = false;

  constructor(@Inject(COUNTRIES_MAP) private namesMap: Map<string, string>) {
    this.data = null;
  }

  ngOnInit(): void {
    console.log(this.dataSource);

    this.dataSource.subscribe((d) => {
      console.log(d);

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
    if (this.rangeVal == this.rangeMax) {
      this.rangeVal = this.rangeMin;
    }
    this.animating = true;
    this.animateFrame();
  }

  animateFrame() {
    if (this.rangeVal < this.rangeMax && this.animating) {
      setTimeout(() => {
        this.nextNearest(this.rangeVal + 1);
        this.animateFrame();
      }, 500);
    } else {
      this.animating = false;
    }
  }
}
