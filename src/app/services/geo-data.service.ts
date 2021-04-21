import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GeoDataService {
  constructor(private client: HttpClient) {}

  getFeaturesJson(): Observable<any> {
    return this.client.get("/assets/countries-50m.json");
  }
}
