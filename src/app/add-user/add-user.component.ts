import { Component, OnInit, Inject } from "@angular/core";
import { HttpClientService } from "../service/httpclient.service";
import { User } from "../user/user.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  // isActiveTrue = true;
  // isActiveFalse = false;
  user = new User(null, "", "", "", null, "", null, false, "", "");
  //--
  // public id: string,
  // public username: string,
  // public firstName: string,
  // public lastName: string,
  // public totalscore: number,
  // public password: string,
  // public role: string,
  // public isActive: boolean,
  // public description: string,
  // public imageurl: string

  constructor(
    private httpClientService: HttpClientService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: User
  ) {}

  ngOnInit() {
    //this.user.isActive = true;
  }

  // form buttons
  createUser(): void {
    //console.debug(this.user);
    this.httpClientService.createUser(this.user).subscribe(
      (data) => {
        alert("User created successfully." + JSON.stringify(data, null, 2));
        this.dialogRef.close(); //?
      },
      (error) => {
        console.debug(error);
      }
    );
    this.dialogRef.close(); //?
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
