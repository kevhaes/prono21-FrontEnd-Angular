import { Component, OnInit } from "@angular/core";
import { User } from "./user.model";
import { HttpClientService } from "../service/httpclient.service";
import { MatDialog } from "@angular/material/dialog";
import { AddUserComponent } from "../add-user/add-user.component";
import { MessageComponent } from "../shared/message/message.component";
import { Location } from "@angular/common";
import Swal from "sweetalert2";

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

  //  (click)="onDeleteUser(user)"
  deleteUser(user: User): boolean {
    var result;
    this.httpClientService.deleteUser(user.id).subscribe(
      (response) => {
        this.users = this.users.filter((u) => u !== user);
        result = true;
      },
      (error) => {
        result = false;
      }
    );
    return result;
  }

  confirmBox(user: User) {
    console.log("USER TO DELETE: "+JSON.stringify(user, null, 2));

    Swal.fire({
      title: "Are you sure want to remove" + user.username + " ?",
      text: "You will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete user!",
      cancelButtonText: "No, keep user",
    }).then((result) => {
      if (result.value) {
        this.deleteUser(user);
        // if (this.deleteUser(user)) {
        Swal.fire("Deleted!", "user has been deleted.", "success");
        // }
        // else {
        //   Swal.fire("something whent wrong");
        // }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", " " + user.username + " is safe !", "error");
      }
    });
  }
}
