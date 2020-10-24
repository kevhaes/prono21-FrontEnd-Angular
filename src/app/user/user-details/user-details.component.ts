import { Component, OnInit } from "@angular/core";
import { User } from "../user.model";
import { HttpClientService } from "../../service/httpclient.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"],
})
export class UserDetailsComponent implements OnInit {
  user: User;

  constructor(
    private httpClientService: HttpClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUser(+this.route.snapshot.paramMap.get("id"));
  }

  getUser(id: number): void {
    this.httpClientService.getUser(id).subscribe(
      (respons) => {
        this.user = respons;
      },
      (error) => {
        alert("something went wrong");
      }
    );
  }
}
