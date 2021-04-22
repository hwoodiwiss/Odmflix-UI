import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CountriesPageComponent } from "./countries-page/countries-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { YearsPageComponent } from "./years-page/years-page.component";

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "Countries",
    component: CountriesPageComponent,
  },
  {
    path: "Years",
    component: YearsPageComponent,
  },
  {
    path: "**",
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
