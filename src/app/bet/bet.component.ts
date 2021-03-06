import { Component, OnInit } from "@angular/core";
import { from } from "rxjs";
import { HttpClientService } from "../service/httpclient.service";
import { Match } from "../match/match.model";
import { NgForm } from "@angular/forms";
import { Bet } from "./bet.model";
import { find } from "rxjs/operators";
import Swal from "sweetalert2";
import { Location } from "@angular/common";

@Component({
  selector: "app-bet",
  templateUrl: "./bet.component.html",
  styleUrls: ["./bet.component.scss"],
})
export class BetComponent implements OnInit {
  matches: Match[];
  //inactiveMatches: Match[];
  upcommingMatches: Match[] = [];
  ongoingMatches: Match[] = [];
  finnishedMatches: Match[] = [];

  newBet = new Bet("", "", null, 0, 0, 0);

  // public id: string,
  // public user_id: string,
  // public match_id: string,
  // public homeTeamBet: number,
  // public awayTeamBet: number,
  // public obtainedpoints: number

  constructor(
    private httpClientService: HttpClientService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getAllMatchesForUser();
  }

  getAllMatchesForUser() {
    this.httpClientService
      .getMatchesAndBetsForUser(sessionStorage.getItem("username"))
      .subscribe((response) => {
        this.sortMatchesByStatus(response);
      });
  }
  sortMatchesByStatus(matches: Match[]) {
    matches.forEach((match) => {
      if (match.status == 1) {
        this.upcommingMatches.push(match);
      } else if (match.status == 2) {
        this.ongoingMatches.push(match);
      } else if (match.status == 3) {
        this.finnishedMatches.push(match);
      }
    });
  }

  //
  submitForm(betForm) {
    this.setValuesNewBet(betForm);
    this.httpClientService.createBet(this.newBet).subscribe(
      (response) => {
        this.handleSuccessfullResponse(response);
      },
      (error) => {
        this.handlerrorResponse(error);
      }
    );
  }
  handleSuccessfullResponse(response) {
    //alert("Bet Created: " + JSON.stringify(response, null, 2));
    //  temporary change to a match with bet
    var matchOfBet = this.upcommingMatches.find(
      (match) => match.id == response.match_id
    );
    matchOfBet.hasBet = true;
    matchOfBet.homeBet = response.homeTeamBet;
    matchOfBet.awayBet = response.awayTeamBet;
  }
  handlerrorResponse(error) {
    alert("iets ging fout, Bet not sent:\n" + error);
  }
  setValuesNewBet(betForm) {
    this.newBet.user_id = sessionStorage.getItem("username");
    this.newBet.match_id = betForm.value.match_id;
    this.newBet.homeTeamBet = +betForm.value.homeTeamBet;
    this.newBet.awayTeamBet = +betForm.value.awayTeamBet;
  }

  //message after submit bet
  confirmBox(betForm) {
    //console.log("BET: " + JSON.stringify(betForm, null, 2));

    Swal.fire({
      title: "Are you sure want to register this bet ?",
      text: "You will not be able to modify this bet!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, register bet!",
      cancelButtonText: "No, cancel please",
    }).then((result) => {
      if (result.value) {
        this.submitForm(betForm);
        Swal.fire("Done!", "Bet has been registred.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "this bet was not saved !", "error");
      }
    });
    // location.reload();
  }
}
