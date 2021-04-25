import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Chart } from "chart.js";
import { ColourToRgb, ColourToRgba, datasetColours } from "../colours";

@Component({
  selector: "ofui-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"],
})
export class PieChartComponent implements OnInit, AfterViewInit {
  @ViewChild("chartCanvas") chartElement: ElementRef<HTMLCanvasElement>;
  chart: Chart<"doughnut", number[], string>;
  @Input() dataGenerator: () => { label: string; data: number[] };
  @Input() labelGenerator: () => string[];
  @Output() elementClicked = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartElement.nativeElement, {
      type: "doughnut",
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

  handleClick(event: Event) {
    let interactionItems = this.chart.getElementsAtEventForMode(
      event,
      "nearest",
      { intersect: true },
      true
    );

    this.elementClicked.emit(interactionItems[0]?.index);
  }
}
