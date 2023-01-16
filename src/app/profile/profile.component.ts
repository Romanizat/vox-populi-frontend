import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../utils/authentication.service";
import {IUser} from "../../@types/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: IUser;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  getLoggedInUser(): void {
    this.authenticationService.getLoggedInUser().then(user => {
      this.user = user;
    });
  }

  // openEditDialog(user: IUser): void {
  //   const dialogRef = this.dialog.open(MyProfileDialogComponent, {
  //     width: "400px",
  //     backdropClass: "background",
  //     data: user
  //   });
  //   dialogRef.afterClosed().toPromise().then(result => {
  //     if (result) {
  //       this.user = result;
  //     }
  //   });
  // }

}
