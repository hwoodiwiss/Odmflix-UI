import { IChart } from "../charts";

export abstract class Content<T> {
  protected charts: IChart[] = [];
  protected asyncDataRequest: Promise<T>;
  public render(targetId: string) {
    let container = document.getElementById(targetId);
    this.asyncDataRequest.then((data) => {
      this.create_charts(data);
      this.render_charts(container);
    });
  }

  protected createRow(): HTMLDivElement {
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    return newRow;
  }

  protected createCol(rowCLass?: string): HTMLDivElement {
    const newCol = document.createElement("div");
    newCol.classList.add(rowCLass ? rowCLass : "col");
    return newCol;
  }

  protected abstract create_charts(data: T);
  protected abstract render_charts(container: HTMLElement);
}
