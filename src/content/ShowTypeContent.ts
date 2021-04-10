import { ShowProvider, TypeProvider } from "../data";
import { Config } from "../environment";
import { Show } from "../models";
import { Content } from "./Content";

type ShowTypeData = [string, number, Show[]];

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
              showsApi.ByTypeId(type.Id).then((shows) => [type.Name, result.Count, shows])
            )
        );
      }
      return await Promise.all(showInfoResolvers);
    });
  }

  protected render_data(data: ShowTypeData[]) {}
}
