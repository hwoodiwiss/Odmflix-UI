import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
import { ColourToRgb, ColourToRgba, datasetColours } from "../colours";

@Component({
  selector: "ofui-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"],
})
export class BarChartComponent implements OnInit {
  @ViewChild("chartCanvas") chartElement: ElementRef<HTMLCanvasElement>;
  @Input() horizontal: boolean = false;
  @Input() dataGenerator: () => { label: string; data: number[] }[];
  @Input() labelGenerator: () => string[];
  chart: Chart;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartElement.nativeElement, {
      type: "bar",
      data: {
        labels: this.labelGenerator(),
        datasets: this.getDataSets(),
      },
      options: {
        scales: this.getScalesConfig(),
        indexAxis: this.getIndexAxis(),
      },
    });
  }

  getScalesConfig() {
    let scalesObj;
    if (this.horizontal) {
      scalesObj = {
        y: {
          beginAtZero: true,
        },
      };
    } else {
      scalesObj = {
        x: {
          beginAtZero: true,
        },
      };
    }

    return scalesObj;
  }

  getIndexAxis() {
    return this.horizontal ? "y" : "x";
  }

  getDataSets() {
    const datasets = this.dataGenerator();
    return datasets.map((dataset, index) => {
      const colour = datasetColours[index % datasetColours.length];
      const chartDatasetConfig = {
        backgroundColor: new Array(dataset.data.length).fill(
          ColourToRgba(colour, 0.2)
        ),
        borderColor: new Array(dataset.data.length).fill(ColourToRgb(colour)),
      };
      return { ...chartDatasetConfig, ...dataset };
    });
  }
}
