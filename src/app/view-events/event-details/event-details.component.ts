import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IEvent} from "../../../@types/Event";
import {EventServicesService} from "../../services/event-services.service";
import {IEventSuggestion} from "../../../@types/EventSuggestion";
import {EventSuggestionServicesServices} from "../../services/event-suggestion-services.services";
import {CreateEventSuggestionDialogComponent} from "./create-event-suggestion-dialog/create-event-suggestion-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DomSanitizer, SafeResourceUrl, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  eventId: number;
  event: IEvent;
  eventSuggestionList: IEventSuggestion[] = [];

  constructor(public dialog: MatDialog, private route: ActivatedRoute,
              private eventService: EventServicesService,
              private eventSuggestionService: EventSuggestionServicesServices,
              public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];
    this.getEventById(this.eventId);
    this.getAllEventSuggestionsForEvent(this.eventId);
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

}
