import {Component, Inject, OnInit} from '@angular/core';
import {IEventParticipant} from "../../../../@types/EventParticipant";
import {EventParticipantServicesService} from "../../../services/event-participant-services.service";
import {InviteUserToEventDialogComponent} from "../invite-user-to-event-dialog/invite-user-to-event-dialog.component";
import {MatTableDataSource} from "@angular/material/table";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-view-event-participants',
  templateUrl: './view-event-participants-dialog.component.html',
  styleUrls: ['./view-event-participants-dialog.component.css']
})
export class ViewEventParticipantsDialogComponent implements OnInit {
  dataSource = new MatTableDataSource<IEventParticipant>([]);
  displayedColumns: string[] = ["name", "lastName", "username", "remove"];
  eventId: number;

  constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<ViewEventParticipantsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private eventParticipantService: EventParticipantServicesService,
              private snackBar: MatSnackBar) {
    this.eventId = data;
  }

  ngOnInit(): void {
    this.getAllParticipants();
  }

  getAllParticipants(): void {
    this.eventParticipantService.getAllEventParticipantByEventId(this.eventId).toPromise().then(data => {
      this.dataSource.data = data;
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }

  removeParticipant(id: number, username: string) {
    this.eventParticipantService.deleteEventParticipant(id).toPromise().then(() => {
      this.openSnackBar("You have removed the participant " + username, "Close");
      this.getAllParticipants();
    }, err => {
      this.openSnackBar(err.error.message, "Close");
    });
  }

  openInviteUserDialog() {
    this.dialog.open(InviteUserToEventDialogComponent, {
      width: "400px",
      backdropClass: "background",
      data: this.eventId
    });
  }
}
