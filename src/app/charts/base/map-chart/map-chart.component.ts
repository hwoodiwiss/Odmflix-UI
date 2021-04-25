import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { GeoDataService } from "src/app/services/geo-data.service";
import { Chart } from "chart.js";
import { GeoFeature, topojson } from "chartjs-chart-geo";
import { Observable } from "rxjs";

export interface MapSelection {
  country: string;
  showIds: number[];
}

@Component({
  selector: "ofui-map-chart",
  templateUrl: "./map-chart.component.html",
  styleUrls: ["./map-chart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapChartComponent implements AfterViewInit, OnInit {
  @ViewChild("chartCanvas") chartElement: ElementRef<HTMLCanvasElement>;
  @Input() valueMapper$: Observable<
    (datum: GeoJSON.Feature<GeoJSON.Geometry>) => number
  >;
  @Output() onFeatureClick = new EventEmitter<MapSelection[]>();
  @Output() onInitialised = new EventEmitter();

  countries: GeoJSON.Feature<GeoJSON.Geometry>[];
  chart: Chart<"choropleth", any, any>;
  constructor(private geoData: GeoDataService) {}

  private lastValueMapper: (datum: GeoJSON.Feature<GeoJSON.Geometry>) => number;
  ngOnInit(): void {
    this.valueMapper$.subscribe((valueMapper) => {
      this.lastValueMapper = valueMapper;
      if (this.chart) {
        this.chart.data.datasets[0].data = this.countries.map((d) => ({
          feature: d,
          value: valueMapper(d),
        }));

        this.chart.update();
      }
    });
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
                value: this.lastValueMapper ? this.lastValueMapper(d) : 0,
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
            color: {
              type: "colorLogarithmic",
              quantize: 10,
              interpolate: this.colourMappings,
              min: 0.1,
            },
          },
        },
      });
      this.onInitialised.emit();
    });
  }

  colourMappings(normalizedValue: number) {
    if (normalizedValue === 0) return "white";
    if (normalizedValue <= 0.1) return "rgb(216,235,255)";
    if (normalizedValue <= 0.2) return "rgb(192,219,246)";
    if (normalizedValue <= 0.3) return "rgb(168,203,238)";
    if (normalizedValue <= 0.4) return "rgb(144,186,229)";
    if (normalizedValue <= 0.5) return "rgb(120,170,220)";
    if (normalizedValue <= 0.6) return "rgb(96,154,212)";
    if (normalizedValue <= 0.7) return "rgb(72,138,203)";
    if (normalizedValue <= 0.8) return "rgb(48,121,194)";
    if (normalizedValue <= 0.9) return "rgb(24,105,186)";
    if (normalizedValue <= 1) return "rgb(0,89,177)";
    return "red";
  }

  handleMapClick(event: Event) {
    if (this.chart) {
      let interactionItems = this.chart.getElementsAtEventForMode(
        event,
        "nearest",
        { intersect: true },
        true
      );

      let clickedFeats = interactionItems.map((item) => {
        if (item?.element instanceof GeoFeature) {
          return {
            country: item.element.feature.properties.name as string,
            showIds: item.element.feature.properties.ShowIds as number[],
          };
        }
        return null;
      });

      this.onFeatureClick.emit(clickedFeats);
    }
  }
}
