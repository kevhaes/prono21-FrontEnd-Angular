import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  currentUser;
  constructor(private httpClient: HttpClient, private router: Router) {}
  // Provide username and password for authentication, and once authentication is successful,
  //store JWT token in session

  authenticate(username, password) {
    return this.httpClient
      .post<any>("http://localhost:8080/authenticate", { username, password })
      .pipe(
        map((userData) => {
          sessionStorage.setItem("username", username);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    //console.log(!(user === null));
    this.currentUser = user;
    return !(user === null);
  }
  getCurrentUser() {
    return sessionStorage.getItem("username");
  }

  logOut() {
    sessionStorage.removeItem("username");
    this.router.navigate(["login"]); //to check, not sure
  }
}
