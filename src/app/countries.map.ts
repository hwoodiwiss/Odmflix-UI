import { InjectionToken } from "@angular/core";

export const COUNTRIES_MAP = new InjectionToken<Map<string, string>>(
  "countries.map",
  {
    providedIn: "root",
    factory: (): Map<string, string> => {
      const namesMap = new Map<string, string>();
      namesMap.set("Soviet Union", "Russia");
      namesMap.set("United States of America", "United States");
      return namesMap;
    },
  }
);
