import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HomePageComponent } from "./home-page/home-page.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { MapChartComponent } from "./charts/base/map-chart/map-chart.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MapYearsComponent } from "./charts/map-years/map-years.component";
import { CountriesPageComponent } from "./countries-page/countries-page.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { OverTimePageComponent } from "./over-time-page/over-time-page.component";
import { PieChartComponent } from "./charts/base/pie-chart/pie-chart.component";
import { BarChartComponent } from "./charts/base/bar-chart/bar-chart.component";
import { PolarAreaChartComponent } from "./charts/base/polar-area-chart/polar-area-chart.component";
import { YearCountryDataComponent } from "./over-time-page/year-country-data/year-country-data.component";
import { Chart, registerables } from "chart.js";
import { ShowsTableComponent } from "./shared/shows-table/shows-table.component";

Chart.register(...registerables);

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NotFoundPageComponent,
    MapChartComponent,
    MapYearsComponent,
    CountriesPageComponent,
    OverTimePageComponent,
    PieChartComponent,
    BarChartComponent,
    PolarAreaChartComponent,
    YearCountryDataComponent,
    ShowsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
