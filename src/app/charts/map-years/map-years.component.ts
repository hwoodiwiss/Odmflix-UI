import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { COUNTRIES_MAP } from "src/app/countries.map";
import { ByYear } from "src/app/models/by-year";
import { CountryCount } from "src/app/models/country-count";
import { MapSelection } from "../base/map-chart/map-chart.component";

export interface MapYearSelection {
  year: number;
  country: string;
  showIds: number[];
}

@Component({
  selector: "ofui-map-years",
  templateUrl: "./map-years.component.html",
  styleUrls: ["./map-years.component.scss"],
})
export class MapYearsComponent implements OnInit, OnChanges {
  faPlay = faPlay;
  faPause = faPause;

  @Input() data?: ByYear<CountryCount>;
  allYearsData?: CountryCount[];

  @Output() onFeatureClick = new EventEmitter<MapYearSelection>();

  @Input() filterYears: boolean = false;
  @Output() filterYearsChange = new EventEmitter<boolean>();

  years: number[];

  rangeMin = 0;
  rangeMax = 0;
  currYear = null;
  rangeModel = 0;
  rangeVal = 0;
  animating = false;
  initialized = false;

  constructor(@Inject(COUNTRIES_MAP) private namesMap: Map<string, string>) {
    this.data = null;
  }

  ngOnInit(): void {
    this.resetData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetData();
  }

  resetData() {
    this.initialized = false;
    if (this.data) {
      this.years = Object.keys(this.data)
        .map((year) => +year)
        .sort((a, b) => {
          return a - b;
        });
      this.allYearsData = this.getAllYearsData(this.data);
      this.setDefaults(this.years);
      this.initialized = true;
    }
  }

  getAllYearsData(byYearData: ByYear<CountryCount>) {
    const years = Object.keys(byYearData);
    let vals = years
      .map((year) => byYearData[+year])
      .reduce((acc, countryCounts) => [...acc, ...countryCounts])
      .map((countryCount) => {
        let renamedCount = countryCount;
        renamedCount.Country = this.getMappedCountryName(countryCount.Country);
        return renamedCount;
      })
      .reduce((acc, countryCount) => {
        let foundCount = acc.find((f) => f?.Country === countryCount.Country);
        if (!foundCount) {
          acc.push(countryCount);
        } else {
          let foundIndex = acc.findIndex(
            (f) => f?.Country === countryCount.Country
          );
          acc[foundIndex] = {
            Country: foundCount.Country,
            ShowIds: [...foundCount.ShowIds, ...countryCount.ShowIds],
            Count: +foundCount.Count + +countryCount.Count,
          };
        }
        return acc;
      }, new Array<CountryCount>());
    return vals;
  }

  setDefaults(years: number[]) {
    this.rangeMin = years[0];
    this.rangeMax = years[this.years.length - 1];
    this.rangeModel = this.rangeMin;
    this.rangeVal = this.rangeMin;
    this.currYear = this.rangeMin;
  }

  datumFrameValue(index?: number) {
    if (this.filterYears && index !== null) {
      return (datum: GeoJSON.Feature<GeoJSON.Geometry>) => {
        let yearVals = this.data[index];

        let countryVal = yearVals.find((countryCount) => {
          const datumName = datum.properties.name as string;
          const searchTerm = this.getMappedCountryName(countryCount.Country);
          return datumName.search(searchTerm) > -1;
        });
        datum.properties.ShowIds = countryVal?.ShowIds;
        return +(countryVal?.Count ?? 0);
      };
    } else {
      return (datum: GeoJSON.Feature<GeoJSON.Geometry>) => {
        let countryVal = this.allYearsData?.find((countryCount) => {
          const datumName = datum.properties.name as string;
          const searchTerm = this.getMappedCountryName(countryCount.Country);
          return datumName.search(searchTerm) > -1;
        });
        datum.properties.ShowIds = countryVal?.ShowIds;
        return +(countryVal?.Count ?? 0);
      };
    }
  }

  nextNearest(evt: any) {
    const diff = evt - this.rangeVal;
    const currIdx = this.years.findIndex((f) => f == this.rangeVal);

    if (diff > 0) {
      this.rangeVal = this.rangeModel = this.years[currIdx + 1];
    } else if (diff < 0) {
      this.rangeVal = this.rangeModel = this.years[currIdx - 1];
    } else {
      this.rangeVal = evt;
    }

    this.currYear = this.rangeVal;
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
      this.nextNearest(this.rangeVal + 1);
      setTimeout(() => {
        this.animateFrame();
      }, 500);
    } else {
      this.animating = false;
    }
  }

  bubbleEvent(clickedItems: MapSelection[]) {
    this.animating = false;
    this.onFeatureClick.emit({
      year: this.filterYears ? this.rangeVal : null,
      country: clickedItems[0].country,
      showIds: clickedItems[0].showIds,
    });
  }

  getMappedCountryName(countryName: string) {
    return this.namesMap.has(countryName)
      ? this.namesMap[countryName]
      : countryName;
  }

  updateFilterYears(evt: Event) {
    this.filterYears = (evt.target as HTMLInputElement).checked;
    this.filterYearsChange.emit(this.filterYears);
  }
}
