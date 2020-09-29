import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpClientService } from "src/app/service/httpclient.service";
import { Match } from "../../match/match.model";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { Team } from "../../team/team.model";

@Component({
  selector: "app-add-match",
  templateUrl: "./add-match.component.html",
  styleUrls: ["./add-match.component.scss"],
})
export class AddMatchComponent implements OnInit {
  teams: Team[] = [];
  match = new Match(null, new Team(), new Team(), 0, 0, new Date(), 0);

  // public id: string,           --> null
  // public hometeam: Team,     --> ""
  // public awayteam: Team,     --> ""
  // public hometeamscore: number,--> 0
  // public awayteamscore: number,--> 0
  // public matchdate: Date,    --> ""
  // public status: number        --> 0

  constructor(
    private httpClientService: HttpClientService,
    public dialogRef: MatDialogRef<AddMatchComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Match
  ) {}

  ngOnInit() {
    this.getAllTeams();
  }

  getAllTeams() {
    this.httpClientService.getTeams().subscribe((response) => {
      this.teams = response;
    });
  }

  // form buttons
  createMatch(): void {
    console.log("start creating match: " + JSON.stringify(this.match, null, 2));
    this.httpClientService.createMatch(this.match).subscribe(
      (result) => {
        alert("Match created :" + JSON.stringify(result, null, 2));
        this.dialogRef.close();
      },
      (error) => {
        console.log(
          "start creating match: " + JSON.stringify(this.match, null, 2)
        );
        console.debug(
          "creating match did not work:" + JSON.stringify(error, null, 2)
        );
      }
    );
  }
  onCloseClick() {
    this.dialogRef.close();
  }
}
