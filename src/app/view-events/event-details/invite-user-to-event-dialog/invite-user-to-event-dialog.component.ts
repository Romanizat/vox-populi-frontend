import {Component, Inject, OnInit} from '@angular/core';
import {IEvent} from "../../../../@types/Event";
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EventParticipantServicesService} from "../../../services/event-participant-services.service";
import {IUser} from "../../../../@types/User";
import {UserServicesService} from "../../../services/user-services.service";
import {IEventSuggestion} from "../../../../@types/EventSuggestion";
import {IEventParticipant} from "../../../../@types/EventParticipant";

@Component({
  selector: 'app-invite-user-to-event-dialog',
  templateUrl: './invite-user-to-event-dialog.component.html',
  styleUrls: ['./invite-user-to-event-dialog.component.css']
})
export class InviteUserToEventDialogComponent implements OnInit {
  event: IEvent;
  usersList: IUser[] = [];
  form = new FormGroup({
    user: new FormControl(),
  });

  constructor(private dialogRef: MatDialogRef<InviteUserToEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IEvent,
              private snackBar: MatSnackBar,
              private eventParticipantService: EventParticipantServicesService,
              private userService: UserServicesService) {
    this.event = data;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().toPromise().then(data => {
      this.usersList = data;
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  close() {
    this.dialogRef.close(true);
  }

  addUserToEvent() {
    let user = this.form.get("user")?.value;
    if (user != null) {
      const eventParticipant: IEventParticipant = {
        user: user,
        event: this.event,
        organizer: false
      }
      this.eventParticipantService.addEventParticipant(eventParticipant).toPromise().then(() => {
        this.close()
        this.openSnackBar("You have successfully invited a new user to this event", "Close");
      }, err => {
        this.openSnackBar(err.error.message, "Close");
      });
    } else {
      this.openSnackBar("Please enter all of the required fields", "Close");
    }
  }
}
