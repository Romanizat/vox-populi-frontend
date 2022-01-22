import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  eventId: number

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id']
  }

}
