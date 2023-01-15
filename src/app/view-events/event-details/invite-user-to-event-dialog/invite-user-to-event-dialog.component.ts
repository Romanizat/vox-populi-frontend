import {Component, Inject, OnInit} from '@angular/core';
import {IEvent} from "../../../../@types/Event";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {EventParticipantServicesService} from "../../../services/event-participant-services.service";
import {IUser} from "../../../../@types/User";
import {UserServicesService} from "../../../services/user-services.service";
import {IEventSuggestion} from "../../../../@types/EventSuggestion";
import {IEventParticipant} from "../../../../@types/EventParticipant";
import {EventServicesService} from "../../../services/event-services.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-invite-user-to-event-dialog',
  templateUrl: './invite-user-to-event-dialog.component.html',
  styleUrls: ['./invite-user-to-event-dialog.component.css']
})
export class InviteUserToEventDialogComponent implements OnInit {
  event: IEvent;
  usersList: IUser[] = [];
  eventId: number;
  form = new UntypedFormGroup({
    user: new UntypedFormControl(),
  });

  constructor(private dialogRef: MatDialogRef<InviteUserToEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private snackBar: MatSnackBar,
              private eventParticipantService: EventParticipantServicesService,
              private userService: UserServicesService,
              private eventService: EventServicesService) {
    this.eventId = data;
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getEventById();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().toPromise().then(data => {
      this.usersList = data;
    });
  }

  getEventById() {
    this.eventService.getEventsByEventId(this.eventId).toPromise().then(data => {
      this.event = data;
    })
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
