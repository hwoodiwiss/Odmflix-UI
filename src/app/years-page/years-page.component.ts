import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ByYear } from "../models/by-year";
import { CountryCount } from "../models/country-count";
import { Type } from "../models/type";
import { ShowApiService } from "../services/show-api.service";
import { TypeApiService } from "../services/type-api.service";

@Component({
  selector: "ofui-years-page",
  templateUrl: "./years-page.component.html",
  styleUrls: ["./years-page.component.scss"],
})
export class YearsPageComponent implements OnInit {
  types: Type[] = [];
  currentTypeId?: string;
  mapYearsData: ByYear<CountryCount>;

  constructor(public showApi: ShowApiService, public typeApi: TypeApiService) {
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
}
