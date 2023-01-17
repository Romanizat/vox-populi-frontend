import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../utils/authentication.service";
import {IUser} from "../../@types/User";
import {MatDialog} from "@angular/material/dialog";
import {EditProfileDialogComponent} from "./edit-profile-dialog/edit-profile-dialog.component";
import {EventParticipantServicesService} from "../services/event-participant-services.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EventSuggestionServicesServices} from "../services/event-suggestion-services.services";
import {VoteServiceService} from "../services/vote-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: IUser;
  numberOfEventsOrganized: number;
  numberOfEventSuggestions: number;
  numberOfLikedSuggestions: number;
  numberOfDislikedSuggestions: number;

  constructor(private authenticationService: AuthenticationService,
              private eventParticipantServicesService: EventParticipantServicesService,
              private eventSuggestionServicesServices: EventSuggestionServicesServices,
              private voteServiceService: VoteServiceService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getLoggedInUserAndInfo();
  }

  getLoggedInUserAndInfo() {
    this.authenticationService.getLoggedInUser().then(user => {
      this.user = user;
      this.getNumberOfOrganizedEvents();
      this.getNumberOfSuggestions();
      this.getNumberOfLikedAndDislikedSuggestions();
    });
  }

  getNumberOfOrganizedEvents() {
    this.eventParticipantServicesService.getNumberOfEventsOrganizedByUserId(this.user?.id).toPromise().then(numberOfEvents => {
      this.numberOfEventsOrganized = numberOfEvents;
    }, error => {
      console.log(error);
      this.openSnackBar("Error while getting number of events organized", "Close");
    });
  }

  getNumberOfSuggestions() {
    this.eventSuggestionServicesServices.getNumberOfEventSuggestionsByUserId(this.user?.id).toPromise().then(numberOfEvents => {
      this.numberOfEventSuggestions = numberOfEvents;
    }, error => {
      console.log(error);
      this.openSnackBar("Error while getting number of event suggestions", "Close");
    });
  }

  getNumberOfLikedAndDislikedSuggestions() {
    this.voteServiceService.getAllVotesFromUser(this.user?.id).toPromise().then(votes => {
      this.numberOfLikedSuggestions = votes.filter(vote => vote.upvote).length;
      this.numberOfDislikedSuggestions = votes.filter(vote => !vote.upvote).length;
    }, error => {
      console.log(error);
      this.openSnackBar("Error while getting number of votes", "Close");
    });
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

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
