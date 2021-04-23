import { InjectionToken } from "@angular/core";

const namesMap = new Map<string, string>();
namesMap.set("Soviet Union", "Russia");
namesMap.set("United States of America", "United States");

export const COUNTRIES_MAP = new InjectionToken<Map<string, string>>(
  "countries.map",
  {
    providedIn: "root",
    factory: (): Map<string, string> => {
      return namesMap;
    },
  }
);

export const REVERSE_COUNTRIES_MAP = new InjectionToken<Map<string, string>>(
  "countries.map",
  {
    providedIn: "root",
    factory: (): Map<string, string> => {
      const reverseMap = new Map<string, string>();
      for (let entry of namesMap.entries()) {
        reverseMap.set(entry[1], entry[0]);
      }
      return reverseMap;
    },
  }
);
