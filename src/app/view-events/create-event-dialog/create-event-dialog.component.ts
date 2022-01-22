import {Component, OnInit} from '@angular/core';
import {IUser} from "../../../@types/User";
import {UserServicesService} from "../../services/user-services.service";
import {AuthenticationService} from "../../../utils/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup} from "@angular/forms";
import {IEvent} from "../../../@types/Event";
import {EventServicesService} from "../../services/event-services.service";
import {MatDialogRef} from "@angular/material/dialog";
import {utcShift} from "../../../utils/dateUtil";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.css']
})
export class CreateEventDialogComponent implements OnInit {
  user: IUser;
  username: string;
  form = new FormGroup({
    name: new FormControl(),
    date: new FormControl(),
    location: new FormControl(),
  });

  constructor(private dialogRef: MatDialogRef<CreateEventDialogComponent>,
              private userService: UserServicesService,
              private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar,
              private eventService: EventServicesService) {
  }

  ngOnInit(): void {
    this.username = this.authenticationService.getUsernameFromToken();
    this.getLoggedInUser();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  getLoggedInUser() {
    this.userService.getUserByUsername(this.username).toPromise().then(data => {
      this.user = data;
    }, err => {
      this.openSnackBar(err.error.message, "Close");
    });
  }

  close() {
    this.dialogRef.close(true);
  }

  createEvent() {
    let eventName = this.form.get("name")?.value;
    let eventDate = new Date(utcShift(this.form.get("date")?.value));
    let eventLocation = this.form.get("location")?.value;
    if (eventName != null && eventDate != null && eventLocation != null) {
      const event: IEvent = {
        name: eventName,
        date: eventDate,
        location: eventLocation
      }
      this.eventService.createEventByUserId(event, this.user.id).toPromise().then(() => {
        this.close()
        this.openSnackBar("You have successfully created a new event", "Close");
      }, err => {
        this.openSnackBar(err.error.message, "Close");
      });
    } else {
      this.openSnackBar("Please enter all of the required fields", "Close");
    }

  }
}
