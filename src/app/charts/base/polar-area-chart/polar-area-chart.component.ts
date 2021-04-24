import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
import { ColourToRgb, datasetColours } from "../colours";

@Component({
  selector: "ofui-polar-area-chart",
  templateUrl: "./polar-area-chart.component.html",
  styleUrls: ["./polar-area-chart.component.scss"],
})
export class PolarAreaChartComponent implements OnInit {
  @ViewChild("chartCanvas") chartElement: ElementRef<HTMLCanvasElement>;

  @Input() dataGenerator: () => { label: string; data: number[] };
  @Input() labelGenerator: () => string[];
  chart: Chart<"polarArea", number[], string>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartElement.nativeElement, {
      type: "polarArea",
      data: {
        labels: this.labelGenerator(),
        datasets: [this.getDataSets()],
      },
    });
  }

  getDataSets() {
    const dataset = this.dataGenerator();
    const chartDatasetConfig = {
      backgroundColor: dataset.data.map((_, idx) =>
        ColourToRgb(datasetColours[idx % datasetColours.length])
      ),
      hoverOffset: 4,
    };

    return { ...chartDatasetConfig, ...dataset };
  }
}
