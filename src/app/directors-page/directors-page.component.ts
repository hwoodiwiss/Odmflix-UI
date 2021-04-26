import { Component, OnInit } from "@angular/core";
import { OperatorFunction, Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from "rxjs/operators";
import { Director } from "../models/directors";
import { Show } from "../models/show";
import { DirectorsApiService } from "../services/directors-api.service";

@Component({
  selector: "ofui-directors-page",
  templateUrl: "./directors-page.component.html",
  styleUrls: ["./directors-page.component.scss"],
})
export class DirectorsPageComponent implements OnInit {
  constructor(private directorApi: DirectorsApiService) {}
  directors: Director[] = null;
  public model: Director;
  directorShows: Show[];
  ngOnInit(): void {
    this.directorApi.all().subscribe((directors) => {
      this.directors = directors;
    });
  }

  search: OperatorFunction<string, readonly Director[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) =>
        this.directors
          .filter((director) => new RegExp(term, "mi").test(director.Name))
          .slice(0, 20)
      )
    );

  directorFormatter = (director: Director) => director.Name;

  directorChanged() {
    if (this.model) {
      this.directorApi.shows(this.model.Id).subscribe((data) => {
        this.directorShows = data;
      });
    } else {
      this.directorShows = null;
    }
  }
}
