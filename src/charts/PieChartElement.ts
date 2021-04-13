import { Chart } from "./chart";

export class PieChartElement<T> extends Chart<T, google.visualization.PieChartOptions> {
  constructor(id: string, title: string, data: T[], options: google.visualization.PieChartOptions) {
    super(id, title, data, options);
  }
  protected drawChart(targetId: string) {
    if (!this.data || this.data.length === 0) {
      throw new Error("Data Error drawing chart");
    }
    let headers = Object.keys(this.data[0]);
    let dataTableData = this.data.map((value: T) => {
      const row = [];
      for (const key of headers) {
        row.push(value[key]);
      }
      return row;
    });
    document.getElementById(targetId).appendChild(this.element);
    let dataTable = google.visualization.arrayToDataTable([headers, ...dataTableData], false);
    let chart = new google.visualization.PieChart(this.chartElement);
    chart.draw(dataTable, this.options);
  }
}
