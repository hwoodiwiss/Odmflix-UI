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

export interface MapSelection {
  year: number;
  country: string;
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

  @Output() onFeatureClick = new EventEmitter<MapSelection>();

  years: number[];
  rangeMin = 0;
  rangeMax = 0;
  thingIndex = 0;
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
      this.setDefaults(this.years);
      this.initialized = true;
    }
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

      let countryVal = yearVals.find((countryCount) => {
        const datumName = datum.properties.name as string;
        const searchTerm = this.namesMap.has(countryCount.Country)
          ? this.namesMap[countryCount.Country]
          : countryCount.Country;
        return datumName.search(searchTerm) > -1;
      });

      return +(countryVal?.Count ?? 0);
    };
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

  bubbleEvent(clickedItems: string[]) {
    this.onFeatureClick.emit({ year: this.rangeVal, country: clickedItems[0] });
  }
}
