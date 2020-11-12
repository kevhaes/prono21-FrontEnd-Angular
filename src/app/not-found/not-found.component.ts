import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.scss"],
})
export class NotFoundComponent implements OnInit {
  notFoundText: String = "PAGE NOT FOUND 404";

  constructor() {}

  ngOnInit() {}
}
