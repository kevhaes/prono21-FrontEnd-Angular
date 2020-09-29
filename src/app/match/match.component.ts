import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Match } from "./match.model";
import { AddMatchComponent } from "../admin/add-match/add-match.component";
import { HttpClientService } from "../service/httpclient.service";
import { MatDialog } from "@angular/material/dialog";
import { Sort } from "@angular/material/sort";

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.scss"],
})
export class MatchComponent implements OnInit {
  matches: Match[] = [];

  constructor(
    private httpClientService: HttpClientService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllMatches();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMatchComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      //alert("thank you for adding match: " + JSON.stringify(result, null, 2));
    });
  }

  getAllMatches() {
    this.httpClientService.getMatches().subscribe(
      (response) => {
        this.handleSuccessfullResponse(response);
      },
      (error) => console.log(JSON.stringify(error))
    );
  }
  handleSuccessfullResponse(response) {
    this.matches = response;
    this.sortedData = this.matches.slice();
    console.log(
      "MATCHES set via handlesucces in match: " +
        JSON.stringify(response, null, 2)
    );
  }
  //sort table
  sortedData: Match[];
  sortData(sort: Sort) {
    const data = this.matches.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "matchdate":
          return compare(a.matchdate, b.matchdate, isAsc);
        case "hometeam":
          return compare(a.hometeam.name, b.hometeam.name, isAsc);
        case "awayteam":
          return compare(a.awayteam.name, b.awayteam.name, isAsc);
        case "status":
          return compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });
  }
}
//part of sort table
function compare(
  a: number | string | Date,
  b: number | string | Date,
  isAsc: boolean
) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
