import { Component, OnInit } from "@angular/core";
import { User } from "../user.model";
import { HttpClientService } from "../../service/httpclient.service";

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.scss"],
})
export class LeaderboardComponent implements OnInit {
  userRanking: User[] = [];

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit() {
    this.getRankedUsers();
  }
  //sort by totalscore pipe
  usersSortBy(prop: string) {
    return this.userRanking.sort((a, b) =>
      a[prop] > b[prop] ? -1 : a[prop] === b[prop] ? 0 : 1
    );
  }

  getRankedUsers() {
    this.httpClientService.getRankedUsers().subscribe((response) => {
      this.userRanking = response;
    }),
      (error) => {
        console.log(
          "rankning user whent wrong: " + JSON.stringify(error, null, 2)
        );
      };
  }
}
