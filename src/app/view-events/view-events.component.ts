import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {IEvent} from "../../@types/Event";
import {UserServicesService} from "../services/user-services.service";
import {EventServicesService} from "../services/event-services.service";
import {AuthenticationService} from "../../utils/authentication.service";
import {IUser} from "../../@types/User";
import {CreateEventDialogComponent} from "./create-event-dialog/create-event-dialog.component";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewEventsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  eventList: IEvent[] = [];
  dataSource = new MatTableDataSource<IEvent>([]);
  displayedColumns: string[] = ["name", "date", "location", "details"];
  user: IUser;
  username: string;

  constructor(public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private userService: UserServicesService,
              private eventService: EventServicesService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getLoggedInUser(): void {
    this.authenticationService.getLoggedInUser().then(user => {
      this.user = user;
      this.getAllEventsForUser(this.user.id);
    });
  }

  getAllEventsForUser(userId: number | undefined) {
    if (userId) {
      this.eventService.getAllEventsByUserId(userId).toPromise().then(data => {
        this.eventList = data;
        this.dataSource.data = this.eventList;
        this.dataSource.sort = this.sort;
      }, err => {
        this.openSnackBar(err.error.message, "Close");
      });
    }
  }

  openCreateEventDialog() {
    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      minWidth: "50%",
      backdropClass: "background"
    });
    dialogRef.afterClosed().toPromise().then(() => {
      this.getAllEventsForUser(this.user.id);
    });
  }

  viewEventDetails(eventId: number) {
    this.router.navigate(["/event/" + eventId])
  }
}
