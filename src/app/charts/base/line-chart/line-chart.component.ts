import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
import { ColourToRgb, ColourToRgba, datasetColours } from "../colours";

@Component({
  selector: "ofui-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"],
})
export class LineChartComponent implements OnInit {
  @ViewChild("chartCanvas") chartElement: ElementRef<HTMLCanvasElement>;
  @Input() dataGenerator: () => { label: string; data: number[] }[];
  @Input() labelGenerator: () => string[];
  chart: Chart;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartElement.nativeElement, {
      type: "line",
      data: {
        labels: this.labelGenerator(),
        datasets: this.getDataSets(),
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            min: 0,
            max: 100,
          },
        },
      },
    });
  }

  getDataSets() {
    const datasets = this.dataGenerator();
    return datasets.map((dataset, index) => {
      const colour = datasetColours[index % datasetColours.length];
      const chartDatasetConfig = {
        backgroundColor: ColourToRgb(colour),
        borderColor: ColourToRgb(colour),
        tension: 0.1,
        spanGaps: true,
      };
      return { ...chartDatasetConfig, ...dataset };
    });
  }
}
