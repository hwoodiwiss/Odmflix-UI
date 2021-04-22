import { Component, OnInit } from "@angular/core";
import { ShowApiService } from "../services/show-api.service";

@Component({
  selector: "ofui-years-page",
  templateUrl: "./years-page.component.html",
  styleUrls: ["./years-page.component.scss"],
})
export class YearsPageComponent implements OnInit {
  constructor(public showApi: ShowApiService) {}

  ngOnInit(): void {}
}
