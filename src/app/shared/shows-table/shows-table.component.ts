import { ThrowStmt } from "@angular/compiler";
import { Component, Input, OnInit } from "@angular/core";
import { Show } from "src/app/models/show";

class ShowRow {
  Id: string;
  Title: string;
  Type: string;
  DateAdded: string;
  ReleaseYear: string;
  Description: string;
  constructor(show?: Show) {
    if (show) {
      this.Id = show.Id.toString();
      this.Title = show.Title;
      this.Type = show.ShowType?.toString();
      this.DateAdded = show.DateAdded;
      this.ReleaseYear = show.ReleaseYear.toString();
      this.Description = show.Description;
    }
  }
}

@Component({
  selector: "ofui-shows-table",
  templateUrl: "./shows-table.component.html",
  styleUrls: ["./shows-table.component.scss"],
})
export class ShowsTableComponent implements OnInit {
  @Input() data: Show[];

  pageData: ShowRow[];
  page = 1;
  pageSize = 20;
  collectionSize = 0;

  headers: string[] = [];
  constructor() {}

  ngOnInit(): void {
    this.collectionSize = this.data.length;
    this.refreshShows();
  }

  refreshShows() {
    this.pageData = this.data
      .sort((a, b) => a.Title.localeCompare(b.Title))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      )
      .map((item) => new ShowRow(item));
    this.headers = Object.keys(this.pageData[0]);
  }
}
