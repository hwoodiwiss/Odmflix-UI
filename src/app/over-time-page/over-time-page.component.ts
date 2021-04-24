import { Component, Inject, OnInit } from "@angular/core";
import { MapYearSelection } from "../charts/map-years/map-years.component";
import { REVERSE_COUNTRIES_MAP } from "../countries.map";
import { ByYear } from "../models/by-year";
import { CountryCount } from "../models/country-count";
import { Show } from "../models/show";
import { Type } from "../models/type";
import { ShowApiService } from "../services/show-api.service";
import { TypeApiService } from "../services/type-api.service";

@Component({
  selector: "ofui-over-time-page",
  templateUrl: "./over-time-page.component.html",
  styleUrls: ["./over-time-page.component.scss"],
})
export class OverTimePageComponent implements OnInit {
  types: Type[] = [];
  currentTypeId?: string;
  mapYearsData: ByYear<CountryCount>;
  yearCountryData: Show[] = null;
  selectedCountry: string;
  selectedYear: number;
  filterYears: boolean = false;

  constructor(
    public showApi: ShowApiService,
    public typeApi: TypeApiService,
    @Inject(REVERSE_COUNTRIES_MAP) private namesMap: Map<string, string>
  ) {
    this.currentTypeId = null;
  }

  ngOnInit(): void {
    this.typeApi.all().subscribe((types) => {
      this.types = types;
    });

    this.showApi.byCountryByYearCount().subscribe((data) => {
      this.mapYearsData = data;
    });
  }

  changeType() {
    this.showApi
      .byCountryByYearCount(
        this.currentTypeId !== "null" ? +this.currentTypeId : null
      )
      .subscribe((data) => {
        this.mapYearsData = data;
      });
  }

  handleFeatureSelected(selection: MapYearSelection) {
    this.yearCountryData = null;
    this.selectedCountry = selection.country;
    this.selectedYear = selection.year;
    this.showApi.byIds(selection.showIds).subscribe((data) => {
      this.yearCountryData = data;
    });
  }
}
