import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IEvent} from "../../../@types/Event";
import {EventServicesService} from "../../services/event-services.service";
import {IEventSuggestion} from "../../../@types/EventSuggestion";
import {EventSuggestionServicesServices} from "../../services/event-suggestion-services.services";
import {
  CreateEventSuggestionDialogComponent
} from "./create-event-suggestion-dialog/create-event-suggestion-dialog.component";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {IUser} from "../../../@types/User";
import {UserServicesService} from "../../services/user-services.service";
import {AuthenticationService} from "../../../utils/authentication.service";
import {EventParticipantServicesService} from "../../services/event-participant-services.service";
import {IEventParticipant} from "../../../@types/EventParticipant";
import {
  ViewEventParticipantsDialogComponent
} from "./view-event-participants-dialog/view-event-participants-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

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
              private eventParticipantService: EventParticipantServicesService,
              private router: Router) {
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
      minWidth: "25%",
      backdropClass: "background",
      data: this.event
    });
    dialogRef.afterClosed().toPromise().then(() => {
      this.getAllEventSuggestionsForEvent(this.eventId);
    });
  }

  drop(event: CdkDragDrop<IEventSuggestion[]>) {
    const oldPosition = event.previousIndex;
    const newPosition = event.currentIndex;
    moveItemInArray(this.eventSuggestionList, oldPosition, newPosition);
    if (oldPosition !== newPosition) {
      this.eventSuggestionService.updateSuggestionPosition(oldPosition, newPosition, this.eventId).toPromise().then(() => {
        this.openSnackBar("You have successfully changed the order of the song suggestion!", "Close");
      }, err => {
        this.openSnackBar(err.error.message, "Close");
      });
    }
  }

  openViewEventParticipantsDialog() {
    this.dialog.open(ViewEventParticipantsDialogComponent, {
      minWidth: "50%",
      minHeight: "50%",
      backdropClass: "background",
      data: this.event.id
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

  deleteEvent() {
    this.eventService.deleteEvent(this.eventId).toPromise().then(() => {
      this.openSnackBar("You have deleted the event", "Close");
      this.router.navigate(["events"]);
    }, err => {
      this.openSnackBar(err.error.message, "Close");
    });
  }

  getNumberOfLikes(eventSuggestion: IEventSuggestion) {
    return eventSuggestion.votes.filter(eventSuggestionVote => eventSuggestionVote.upvote).length;
  }

  getNumberOfDislikes(eventSuggestion: IEventSuggestion) {
    return eventSuggestion.votes.filter(eventSuggestionVote => !eventSuggestionVote.upvote).length;
  }

//  TODO: implement logic for voting on event suggestions (like/dislike)

}
