import { Component, OnInit } from "@angular/core";
import { HttpClientService } from "../service/httpclient.service";
import { Team } from "./team.model";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
})
export class TeamComponent implements OnInit {
  teams: Team[];

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit() {
    this.getAllTeams();
  }

  getAllTeams() {
    this.httpClientService.getTeams().subscribe((response) => {
      this.handleSuccessfullResponse(response),
        (error) => console.log(JSON.stringify(error));
    });
  }
  handleSuccessfullResponse(response) {
    this.teams = response;
    console.log(
      "TEAMS set via handlesucces in team: " + JSON.stringify(response, null, 2)
    );
  }
}
