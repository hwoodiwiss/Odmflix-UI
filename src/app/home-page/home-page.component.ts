import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ofui-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  constructor() {}
  thingIndex = 0;
  ngOnInit(): void {
    setInterval(() => {
      this.thingIndex++;
      console.log(this.thingIndex);
    }, 5000);
  }

  datumFrameValue(index: number) {
    return (datum: GeoJSON.Feature<GeoJSON.Geometry>) => {
      return ((datum.properties.name as string).length + index) % 10;
    };
  }

  datumValueMapper(datum: GeoJSON.Feature<GeoJSON.Geometry>) {
    return (datum.properties.name as string).length;
  }
}
