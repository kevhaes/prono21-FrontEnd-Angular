import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Match } from "../match/match.model";
import { Team } from "../team/team.model";
import { User } from "../user/user.model";
import { Bet } from "../bet/bet.model";

@Injectable({
  providedIn: "root",
})
export class HttpClientService {
  apiURL = "http://localhost:8080";
  constructor(private httpClient: HttpClient) {}

  //users
  getUsers() {
    return this.httpClient.get<User[]>(this.apiURL + "/api/users");
  }
  getRankedUsers() {
    return this.httpClient.get<User[]>(this.apiURL + "/api/usersranking");
  }
  deleteUser(userId) {
    return this.httpClient.delete<number>(this.apiURL + "/api/users/" + userId);
  }

  createUser(user) {
    return this.httpClient.post<User>(this.apiURL + "/register", user);
  }

  //matches
  getMatches() {
    return this.httpClient.get<Match[]>(this.apiURL + "/api/matches");
  }
  createMatch(match: Match) {
    return this.httpClient.post<Match>(this.apiURL + "/api/matches", match);
  }

  //teams
  getTeams() {
    return this.httpClient.get<Team[]>(this.apiURL + "/api/teams");
  }

  //bets

  createBet(bet: Bet) {
    return this.httpClient.post<Bet>(this.apiURL + "/api/bets", bet);
  }
  getAllBets() {
    return this.httpClient.get<Bet[]>(this.apiURL + "/api/bets");
  }

  getMatchesAndBetsForUser(username: string) {
    return this.httpClient.get<any[]>(
      this.apiURL + "/api/matches" + "/" + username
    );
  }
}
