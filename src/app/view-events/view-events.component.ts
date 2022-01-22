import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {IEvent} from "../../@types/Event";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserServicesService} from "../services/user-services.service";
import {EventServicesService} from "../services/event-services.service";
import {AuthenticationService} from "../../utils/authentication.service";
import {IUser} from "../../@types/User";
import {MatDialog} from "@angular/material/dialog";
import {CreateEventDialogComponent} from "./create-event-dialog/create-event-dialog.component";

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})
export class ViewEventsComponent implements OnInit {
  eventList: IEvent[] = [];
  dataSource = new MatTableDataSource<IEvent>([]);
  displayedColumns: string[] = ["name", "date", "location"];
  user: IUser;
  username: string;

  constructor(public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private userService: UserServicesService,
              private eventService: EventServicesService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.username = this.authenticationService.getUsernameFromToken();
    this.getLoggedInUser();
    console.log(this.eventList.length)
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getLoggedInUser() {
    this.userService.getUserByUsername(this.username).toPromise().then(data => {
      this.user = data;
      this.getAllEventsForUser(this.user.id);
    }, err => {
      this.openSnackBar(err.error.message, "Close");
    });
  }

  getAllEventsForUser(userId: number | undefined) {
    if (userId) {
      this.eventService.getAllEventsByUserId(userId).toPromise().then(data => {
        this.eventList = data;
        this.dataSource.data = this.eventList;
      }, err => {
        this.openSnackBar(err.error.message, "Close");
      });
    }
  }

  openCreateEventDialog() {
    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      width: "400px",
      backdropClass: "background"
    });
    dialogRef.afterClosed().toPromise().then(() => {
      this.getAllEventsForUser(this.user.id);
    });
  }
}
