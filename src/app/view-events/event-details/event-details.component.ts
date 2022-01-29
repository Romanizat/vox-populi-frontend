import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IEvent} from "../../../@types/Event";
import {EventServicesService} from "../../services/event-services.service";
import {IEventSuggestion} from "../../../@types/EventSuggestion";
import {EventSuggestionServicesServices} from "../../services/event-suggestion-services.services";
import {CreateEventSuggestionDialogComponent} from "./create-event-suggestion-dialog/create-event-suggestion-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {InviteUserToEventDialogComponent} from "./invite-user-to-event-dialog/invite-user-to-event-dialog.component";
import {IUser} from "../../../@types/User";
import {UserServicesService} from "../../services/user-services.service";
import {AuthenticationService} from "../../../utils/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EventParticipantServicesService} from "../../services/event-participant-services.service";
import {IEventParticipant} from "../../../@types/EventParticipant";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  iframe_start: string = '<iframe width="350" height="222" src="https://www.youtube.com/embed/'
  iframe_end: string = '" frameborder="0" allowfullscreen></iframe>'
  eventId: number;
  event: IEvent;
  eventSuggestionList: IEventSuggestion[] = [];
  user: IUser;
  eventParticipant: IEventParticipant;

  constructor(public dialog: MatDialog, private route: ActivatedRoute,
              private eventService: EventServicesService,
              private snackBar: MatSnackBar,
              private eventSuggestionService: EventSuggestionServicesServices,
              private userService: UserServicesService,
              private authenticationService: AuthenticationService,
              private eventParticipantService: EventParticipantServicesService) {
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];
    this.getEventById(this.eventId);
    this.getAllEventSuggestionsForEvent(this.eventId);
    this.getLoggedInUser(this.authenticationService.getUsernameFromToken());
  }

  getLoggedInUser(username: string) {
    this.userService.getUserByUsername(username).toPromise().then(data => {
      this.user = data;
      this.getUserParticipant();
    }, err => {
      this.openSnackBar(err.error.message, "Close");
    });
  }

  getUserParticipant() {
    this.eventParticipantService.getEventParticipantByEventIdAndUserId(this.eventId, this.user.id).toPromise().then(data => {
      this.eventParticipant = data;
    }, err => {
      this.openSnackBar(err.error.message, "Close");
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getEventById(eventId: number) {
    this.eventService.getEventByEventId(eventId).toPromise().then(data => {
      this.event = data;
    })
  }

  getAllEventSuggestionsForEvent(eventId: number) {
    this.eventSuggestionService.getAllEventSuggestionsForEvent(eventId).toPromise().then(data => {
      this.eventSuggestionList = data;
    })
  }

  openEventSuggestionDialog() {
    const dialogRef = this.dialog.open(CreateEventSuggestionDialogComponent, {
      width: "400px",
      backdropClass: "background",
      data: this.event
    });
    dialogRef.afterClosed().toPromise().then(() => {
      this.getAllEventSuggestionsForEvent(this.eventId);
    });
  }

  drop(event: CdkDragDrop<IEventSuggestion[]>) {
    //TODO: implement position saving for index change
    console.log(event)
    moveItemInArray(this.eventSuggestionList, event.previousIndex, event.currentIndex);
  }

  openInviteUserDialog() {
    this.dialog.open(InviteUserToEventDialogComponent, {
      width: "400px",
      backdropClass: "background",
      data: this.event
    });
  }

  deleteSuggestion(eventSuggestion: IEventSuggestion) {
    this.eventSuggestionService.deleteEventSuggestion(eventSuggestion.id).toPromise().then(() => {
      this.openSnackBar("You have deleted the suggestion", "Close");
      this.getAllEventSuggestionsForEvent(this.eventId);
    }, err => {
      this.openSnackBar(err.error.message, "Close");
    });
  }
}
