import { PieChartElement } from "../charts";
import { ShowProvider, TypeProvider } from "../data";
import { Config } from "../environment";
import { Show } from "../models";
import { Content } from "./Content";

interface ShowTypeData {
  Name: string;
  Count: number;
  Shows: Show[];
}

export class ShowTypeContent extends Content<ShowTypeData[]> {
  constructor(private config: Config) {
    super();
    const typesApi = new TypeProvider(this.config);
    this.asyncDataRequest = typesApi.GetAll().then(async (types) => {
      const showsApi = new ShowProvider(config);
      const showInfoResolvers = new Array<Promise<ShowTypeData>>();
      for (const type of types) {
        showInfoResolvers.push(
          typesApi
            .GetCount(type.Id)
            .then((result) =>
              showsApi.ByTypeId(type.Id).then((shows) => ({ Name: type.Name, Count: result.Count, Shows: shows }))
            )
        );
      }
      return await Promise.all(showInfoResolvers);
    });
  }

  protected create_charts(data: ShowTypeData[]) {
    this.charts.push(this.createCountsChart(data));
  }

  protected render_charts(container: HTMLElement) {
    const rowDiv = this.createRow();
    container.appendChild(rowDiv);

    for (const chart of this.charts) {
      const countChartColId = `chart_container_${chart.id}`;
      const newColDiv = this.createCol();
      newColDiv.id = countChartColId;
      container.appendChild(newColDiv);
      chart.render(countChartColId);
    }
  }

  private createCountsChart(data: ShowTypeData[]): PieChartElement<{ Type: string; Count: number }> {
    const pieData = new Array<{ Type: string; Count: number }>();

    for (const item of data) {
      pieData.push({ Type: item.Name, Count: item.Count });
    }

    return new PieChartElement<{ Type: string; Count: number }>("chart_count", "How Many Shows By Type?", pieData, {});
  }
}
