import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HomePageComponent } from "./home-page/home-page.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { TestChartComponent } from "./charts/test-chart/test-chart.component";
import { MapChartComponent } from "./charts/base/map-chart/map-chart.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MapYearsComponent } from "./charts/map-years/map-years.component";
import { CountriesPageComponent } from './countries-page/countries-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { YearsPageComponent } from './years-page/years-page.component';
import { PieChartComponent } from './charts/base/pie-chart/pie-chart.component';
import { BarChartComponent } from './charts/base/bar-chart/bar-chart.component';
import { PolarRadiusChartComponent } from './charts/base/polar-radius-chart/polar-radius-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NotFoundPageComponent,
    TestChartComponent,
    MapChartComponent,
    MapYearsComponent,
    CountriesPageComponent,
    YearsPageComponent,
    PieChartComponent,
    BarChartComponent,
    PolarRadiusChartComponent,
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
