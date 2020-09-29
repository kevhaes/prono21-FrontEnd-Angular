import { Component, OnInit } from "@angular/core";
import { Bet } from "../../bet/bet.model";
import { HttpClientService } from "../../service/httpclient.service";

@Component({
  selector: "app-admin-bet",
  templateUrl: "./admin-bet.component.html",
  styleUrls: ["./admin-bet.component.scss"],
})
export class AdminBetComponent implements OnInit {
  bets: Bet[] = [];
  constructor(private httpClientService: HttpClientService) {}

  ngOnInit() {
    this.getAllBets();
  }
  getAllBets() {
    this.httpClientService.getAllBets().subscribe(
      (response) => {
        this.bets = response;
      },
      (error) => {}
    );
  }
}
