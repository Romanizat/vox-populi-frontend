import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../utils/authentication.service";
import {IUser} from "../../@types/User";
import {MatDialog} from "@angular/material/dialog";
import {EditProfileDialogComponent} from "./edit-profile-dialog/edit-profile-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: IUser;

  constructor(private authenticationService: AuthenticationService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  getLoggedInUser(): void {
    this.authenticationService.getLoggedInUser().then(user => {
      this.user = user;
    });
  }

  getNumberOfOrganizedEvents(): number {
    return 0;
  }

  getNumberOfSuggestions(): number {
    return 0;
  }

  getNumberOfLikedSuggestions(): number {
    return 0;
  }

  getNumberOfDislikedSuggestions(): number {
    return 0;
  }

  openEditDialog(user: IUser): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: "400px",
      backdropClass: "background",
      data: user
    });
    dialogRef.afterClosed().toPromise().then(result => {
      if (result) {
        this.user = result;
      }
    });
  }

}
