import { Component, OnInit } from "@angular/core";
import { Match } from "../match.model";
import { Bet } from "../../bet/bet.model";
import { HttpClientService } from "../../service/httpclient.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-match-details",
  templateUrl: "./match-details.component.html",
  styleUrls: ["./match-details.component.scss"],
})
export class MatchDetailsComponent implements OnInit {
  match: Match;
  bets: Bet[];
  constructor(
    private httpClientService: HttpClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMatchById(this.route.snapshot.paramMap.get("id"));
    this.getBetsForMatch(this.route.snapshot.paramMap.get("id"));
  }
  getMatchById(id): void {
    this.httpClientService.getMatchById(id).subscribe(
      (response) => {
        this.match = response;
      },
      (error) => {
        console.log("something went wrong");
      }
    );
  }
  getBetsForMatch(matchid): void {
    this.httpClientService.getBetsForMatch(matchid).subscribe(
      (response) => {
        this.bets = response;
      },
      (error) => {
        alert("Something went wrong");
      }
    );
  }
}
