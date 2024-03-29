import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {IEventSuggestion} from "../../../../@types/EventSuggestion";
import {EventSuggestionServicesServices} from "../../../services/event-suggestion-services.services";
import {IEvent} from "../../../../@types/Event";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IUser} from "../../../../@types/User";
import {AuthenticationService} from "../../../../utils/authentication.service";

@Component({
  selector: 'app-create-event-suggestion-dialog',
  templateUrl: './create-event-suggestion-dialog.component.html',
  styleUrls: ['./create-event-suggestion-dialog.component.css']
})


export class CreateEventSuggestionDialogComponent implements OnInit {
  event: IEvent;
  form = new UntypedFormGroup({
    title: new UntypedFormControl(),
    url: new UntypedFormControl()
  });
  loggedInUser: IUser;

  constructor(private dialogRef: MatDialogRef<CreateEventSuggestionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IEvent,
              private snackBar: MatSnackBar,
              private eventSuggestionService: EventSuggestionServicesServices,
              private authenticationService: AuthenticationService) {
    this.event = data;
  }

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  getLoggedInUser(): void {
    this.authenticationService.getLoggedInUser().then(user => {
      this.loggedInUser = user;
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


  createEventSuggestion() {
    let title = this.form.get("title")?.value;
    let url = this.form.get("url")?.value;
    if (title != null && url != null) {
      const eventSuggestion: IEventSuggestion = {
        event: this.event,
        position: 0,
        title: title,
        url: url,
        votes: [],
        creatorUserId: this.loggedInUser.id
      }
      this.eventSuggestionService.createEventSuggestion(eventSuggestion).toPromise().then(() => {
        this.close()
        this.openSnackBar("You have successfully added a new song suggestion for this event", "Close");
      }, err => {
        this.openSnackBar(err.error.message, "Close");
      });
    } else {
      this.openSnackBar("Please enter all of the required fields", "Close");
    }
  }
}
