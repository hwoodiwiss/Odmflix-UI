import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

@Component({
  selector: "ofui-test-chart",
  templateUrl: "./test-chart.component.html",
  styleUrls: ["./test-chart.component.scss"],
})
export class TestChartComponent implements AfterViewInit {
  @ViewChild("chartCanvas") chartElement: ElementRef<HTMLCanvasElement>;

  constructor() {}
  ngAfterViewInit(): void {
    let canvas = this.chartElement.nativeElement as HTMLCanvasElement;
    let chart = new Chart(canvas, {
      type: "polarArea",
      data: {
        labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
        datasets: [
          {
            label: "My First Dataset",
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(201, 203, 207)",
              "rgb(54, 162, 235)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
    chart.bindEvents;
  }
}
