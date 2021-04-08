import { Chart } from "./chart";

export class PieChartElement<T> extends Chart<T, google.visualization.PieChartOptions> {
  constructor(id: string, title: string, data: T[]) {
    super(id, title, data);
  }
  protected drawChart(targetId: string, options: google.visualization.PieChartOptions) {
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
    console.log(targetId);
    document.getElementById(targetId).appendChild(this.element);
    let dataTable = google.visualization.arrayToDataTable([headers, ...dataTableData], false);
    let chart = new google.visualization.PieChart(this.chartElement);
    chart.draw(dataTable, options);
  }
}
