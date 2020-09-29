import { Component, OnInit } from "@angular/core";
import { User } from "./user.model";
import { HttpClientService } from "../service/httpclient.service";
import { MatDialog } from "@angular/material/dialog";
import { AddUserComponent } from "../add-user/add-user.component";
import { MessageComponent } from "../shared/message/message.component";
import { Location } from "@angular/common";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  users: User[];

  constructor(
    private httpClientService: HttpClientService,
    public dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit() {
    this.httpClientService.getUsers().subscribe(
      (response) => {
        this.handleSuccessfullResponse(response);
        console.log("empl onit response: " + JSON.stringify(response, null, 2));
      },
      (error) => console.log(JSON.stringify(error))
    );
  }

  handleSuccessfullResponse(response) {
    this.users = response;
    console.log(
      "USERS set via handlesucces in empl:" +
        JSON.stringify(this.users, null, 2)
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      // this.dialog.open(MessageComponent, {
      //   data: {
      //     message: "thank you" + result,
      //   },
      // });
      location.reload();
    });
  }
  onDeleteUser(user: User): void {
    this.httpClientService.deleteUser(user.id).subscribe((data) => {
      (this.users = this.users.filter((u) => u !== user)),
        alert(user.username + " deleted succesfully"),
        (error) => {
          console.debug(
            "could not delete " + user.username + JSON.stringify(error, null, 2)
          );
        };
    });
  }
}
