import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DirectorsPageComponent } from "./directors-page/directors-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { OverTimePageComponent } from "./over-time-page/over-time-page.component";

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "Directors",
    component: DirectorsPageComponent,
  },
  {
    path: "OverTime",
    component: OverTimePageComponent,
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
