import { Component, OnInit } from "@angular/core";
import { Match } from "./match.model";
import { AddMatchComponent } from "../admin/add-match/add-match.component";
import { HttpClientService } from "../service/httpclient.service";
import { MatDialog } from "@angular/material/dialog";
import { Sort } from "@angular/material/sort";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.scss"],
})
export class MatchComponent implements OnInit {
  scoreForm: FormGroup;
  //match: Observable<Match>;
  // new FormGroup({
  //   hometeamscore: new FormControl(),
  //   awayteamscore: new FormControl(),
  //   matchId: new FormControl(),
  // });
  matches: Match[] = [];
  modifiedMatch = new Match(
    "",
    null,
    null,
    null,
    null,
    new Date(),
    null,
    false //IsinModificationMode
  );
  modifymode = false;

  constructor(
    private httpClientService: HttpClientService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllMatches();
    // this.initForm();
  }
  //------------------------------------------------------------------------------

  //matches fetch
  getAllMatches() {
    this.httpClientService.getMatches().subscribe(
      (response) => {
        this.handleSuccessfullResponse(response);
      },
      (error) => console.log(JSON.stringify(error))
    );
  }
  //match mody
  modifyMatch(id: any, hometeamscore: any, awayteamscore: any) {
    this.httpClientService
      .modifyMatch(id, hometeamscore, awayteamscore)
      .subscribe(
        (response) => {
          this.modifiedMatch = this.matches.filter((x) => x.id == id)[0];
          this.modifiedMatch.hometeamscore = hometeamscore;
          this.modifiedMatch.awayteamscore = awayteamscore;
          this.modifiedMatch.isInModificationMode = false;
        },
        (error) => {
          alert("something whent wrong");
        }
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
  //------------------------------------------------------------------------------

  // form

  onToggleModifymode(matchId: string): void {
    console.log("match id = " + matchId);
    this.modifiedMatch = this.matches.filter((x) => x.id == matchId)[0];
    this.modifiedMatch.isInModificationMode = !this.modifiedMatch
      .isInModificationMode;
    this.initForm(matchId);
  }

  private initForm(id: any) {
    const match = this.matches.filter((x) => x.id == id)[0];

    this.scoreForm = this.formBuilder.group({
      hometeamscore: [match.hometeamscore, Validators.required],
      awayteamscore: [match.awayteamscore, Validators.required],
      matchId: [id, Validators.required],
    });
  }
  onSubmitScore(scoreForm: any) {
    let id = scoreForm.value["matchId"];
    let hometeamscore = scoreForm.value["hometeamscore"];
    let awayteamscore = scoreForm.value["awayteamscore"];
    this.modifyMatch(id, hometeamscore, awayteamscore);
  }
  onSubmitForm() {}
  //------------------------------------------------------------------------------

  //popup
  openDialog(): void {
    const dialogRef = this.dialog.open(AddMatchComponent, {});
    dialogRef.afterClosed().subscribe((result) => {});
  }
  //------------------------------------------------------------------------------
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
