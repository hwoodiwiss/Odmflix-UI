export abstract class Chart<T, Opt> {
  protected element: HTMLDivElement;
  protected chartElement: HTMLDivElement;
  constructor(
    public readonly id: string,
    title: string,
    protected data: Array<T>,
    public readonly cardId = `card_container_${id}`,
    public readonly chartId = `card_chart_${id}`
  ) {
    ({ element: this.element, chartElement: this.chartElement } = this.createElement(title));
  }

  private createElement(title: string): { element: HTMLDivElement; chartElement: HTMLDivElement } {
    const element = document.createElement("div");
    const bodyElement = document.createElement("div");
    const chartElement = this.createChartElement();

    bodyElement.classList.add("card-body");
    bodyElement.appendChild(chartElement);

    element.id = this.cardId;
    element.classList.add("card");
    element.appendChild(this.createHeaderElement(title));
    element.appendChild(bodyElement);

    return { element, chartElement };
  }

  private createHeaderElement(title: string): HTMLDivElement {
    const element = document.createElement("div");
    element.classList.add("card-header");
    element.innerHTML = `<h5 class="card-title">${title}</h5>`;
    return element;
  }

  private createChartElement(): HTMLDivElement {
    const element = document.createElement("div");
    element.classList.add("card-image");
    element.id = this.chartId;
    return element;
  }

  public render(targetId: string, options: Opt) {
    google.charts.load("visualization", 1, {
      packages: ["corechart", "map"],
      callback: this.drawChart.bind(this, targetId, options),
    });
  }

  protected abstract drawChart(targetId: string, options: Opt);
}
