import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { GeoDataService } from "src/app/services/geo-data.service";
import { Chart } from "chart.js";
import { topojson } from "chartjs-chart-geo";

@Component({
  selector: "ofui-map-chart",
  templateUrl: "./map-chart.component.html",
  styleUrls: ["./map-chart.component.scss"],
})
export class MapChartComponent implements AfterViewInit, OnChanges {
  @ViewChild("chartCanvas") chartElement: ElementRef<HTMLCanvasElement>;
  @Input() valueMapper: (datum: GeoJSON.Feature<GeoJSON.Geometry>) => number;
  chart: Chart;
  countries: GeoJSON.Feature<GeoJSON.Geometry>[];
  constructor(private geoData: GeoDataService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.chart.data.datasets[0].data = this.countries.map((d) => ({
        feature: d,
        value: this.valueMapper(d),
      }));
      this.chart.update();
    }
  }
  ngAfterViewInit(): void {
    this.geoData.getFeaturesJson().subscribe((data) => {
      this.countries = (topojson.feature(
        data,
        data.objects.countries
      ) as any).features;
      this.chart = new Chart(this.chartElement.nativeElement, {
        type: "choropleth",
        data: {
          labels: this.countries.map((d) => d.properties.name),
          datasets: [
            {
              label: "Countries",
              data: this.countries.map((d) => ({
                feature: d,
                value: this.valueMapper(d),
              })),
            },
          ],
        },
        options: {
          showOutline: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            xy: {
              projection: "equalEarth",
            },
          },
        },
      });
    });
  }
}
