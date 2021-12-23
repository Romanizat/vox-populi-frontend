import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {IEvent} from "../../@types/Event";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserServicesService} from "../services/user-services.service";
import {LoggedInUserServicesService} from "../services/logged-in-user-services.service";
import {EventServicesService} from "../services/event-services.service";

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})
export class ViewEventsComponent implements OnInit {
  eventList: IEvent[] = [];
  dataSource = new MatTableDataSource<IEvent>([]);
  displayedColumns: string[] = ["name", "date", "location"];
  userId: number | undefined;

  constructor(private snackBar: MatSnackBar,
              private userService: UserServicesService,
              private eventService: EventServicesService,
              private loggedInUserService: LoggedInUserServicesService) {
  }

  ngOnInit(): void {
    this.getLoggedInUser().then(user => {
      console.log(user);
      this.userId = user.id;
    });
    this.getAllEventsForUser();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  async getLoggedInUser() {
    return this.loggedInUserService.getLoggedInUser().toPromise();
  }

  getAllEventsForUser() {
    if (this.userId) {
      this.eventService.getAllEventsByUserId(this.userId).toPromise().then(data => {
        this.eventList = data;
        this.dataSource.data = this.eventList;
      });
    }

  }
}
